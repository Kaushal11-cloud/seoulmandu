/**
 * SEOULMANDU - Main Application Logic
 * Modern, high-performance interactions, menu filtering, and ordering cart
 */

// =============================================================================
// 📱 SELLER WHATSAPP CONFIGURATION
// Replace phoneNumber with your shop's actual WhatsApp phone number.
// Format: Country Code + Mobile Number (NO plus sign '+', NO dashes, NO spaces).
// Examples:
//   - Nepal:     "9779825388189" (where 977 is country code)
//   - India:     "919876543210"  (where 91 is country code)
//   - US/Canada: "15551234567"   (where 1 is country code)
// =============================================================================
const SELLER_WHATSAPP_CONFIG = {
  phoneNumber: "9779825388189", // <-- REPLACE WITH YOUR SELLER'S WHATSAPP NUMBER
  shopName: "Seoulmandu Korean Mart (서울만두)",
  location: "Dharan, Nepal",
  coordinates: "26°48'44.1\"N 87°16'42.4\"E",
  mapsUrl: "https://www.google.com/maps?q=26%C2%B048'44.1%22N+87%C2%B016'42.4%22E",
  currency: "Rs.",
  deliveryCharge: 100, // Delivery charge for Dharan town delivery
  confirmPrompt: "Please confirm item availability and estimated delivery/pickup time. Thank you!"
};

// Make accessible globally if needed
window.SELLER_WHATSAPP_CONFIG = SELLER_WHATSAPP_CONFIG;

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Global State & Cart System ---
  const state = {
    cart: JSON.parse(localStorage.getItem('seoulmandu_cart') || '[]'),
    activeCategory: 'all',
    searchQuery: '',
    onlyVegetarian: false,
    orderType: 'delivery', // 'delivery' | 'pickup'
    activeModalItem: null
  };

  // --- 2. Element Selectors ---
  const header = document.querySelector('.site-header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  const cartTriggerBtns = document.querySelectorAll('.btn-cart-trigger');
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartBackdrop = document.querySelector('.cart-drawer-backdrop');
  const closeCartBtn = document.querySelector('.btn-close-drawer');
  const cartBadgeCount = document.querySelectorAll('.cart-count');
  const cartItemsList = document.querySelector('.cart-items-list');
  const cartEmptyState = document.querySelector('.cart-empty-state');
  const cartSubtotalEl = document.querySelector('.cart-subtotal-val');
  const cartDeliveryValEl = document.querySelector('#cartDeliveryVal');
  const cartDeliveryLabelEl = document.querySelector('#cartDeliveryLabel');
  const cartTotalEl = document.querySelector('.cart-total-val');
  const whatsappCheckoutBtn = document.querySelector('.btn-whatsapp-checkout');
  const orderTypeBtns = document.querySelectorAll('.order-type-btn');

  const cartCheckoutForm = document.querySelector('#cartCheckoutForm');
  const custNameInput = document.querySelector('#custName');
  const custPhoneInput = document.querySelector('#custPhone');
  const custAddressInput = document.querySelector('#custAddress');
  const custNotesInput = document.querySelector('#custNotes');
  const checkoutFormHeading = document.querySelector('#checkoutFormHeading');
  const checkoutTypeBadge = document.querySelector('#checkoutTypeBadge');
  const custAddressLabel = document.querySelector('#custAddressLabel');
  const custAddressTip = document.querySelector('#custAddressTip');

  const menuGrid = document.querySelector('.menu-cards-grid');
  const categoryFilterBtns = document.querySelectorAll('.filter-btn');
  const menuSearchInput = document.querySelector('.menu-search-input');
  const vegToggleBtn = document.querySelector('.toggle-chip-veg');

  const foodModalBackdrop = document.querySelector('.food-modal-backdrop');
  const closeFoodModalBtn = document.querySelector('.btn-close-modal');
  const foodModalContent = document.querySelector('.food-modal-card');

  const newsletterForm = document.querySelector('.newsletter-form');
  const toastContainer = document.querySelector('.toast-container');

  // --- 3. Scroll Interactions & Sticky Header ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section Tracking
    highlightActiveNav();
  }, { passive: true });

  function highlightActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navItem) navItem.classList.add('active');
      } else {
        if (navItem) navItem.classList.remove('active');
      }
    });
  }

  // --- 4. Mobile Navigation Drawer ---
  function toggleMobileMenu(isOpen) {
    if (isOpen) {
      mobileNavDrawer.classList.add('open');
      mobileOverlay.classList.add('active');
      mobileMenuBtn.classList.add('active');
      document.body.classList.add('modal-open');
    } else {
      mobileNavDrawer.classList.remove('open');
      mobileOverlay.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNavDrawer.classList.contains('open');
      toggleMobileMenu(!isOpen);
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => toggleMobileMenu(false));
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // --- 5. Toast Notifications ---
  function showToast(message, type = 'success') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast-pill ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </span>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // --- 6. Render Menu Cards & Filtering ---
  function getSafeImageUrl(url) {
    if (!url) return 'assets/images/seoulmandu_logo.jpg';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    return url.replace(/^\.?\//, '');
  }

  function renderMenu() {
    if (!menuGrid || !window.SEOULMANDU_MENU) return;

    let items = window.SEOULMANDU_MENU;

    // Filter by category
    if (state.activeCategory !== 'all') {
      items = items.filter(item => item.category === state.activeCategory);
    }

    // Filter by search query
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(q) ||
        item.subname.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }

    // Filter by vegetarian
    if (state.onlyVegetarian) {
      items = items.filter(item => item.isVegetarian);
    }

    if (items.length === 0) {
      menuGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--color-text-gray-muted);">
          <svg style="margin: 0 auto 16px; opacity: 0.6;" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h4 style="color: #FFFFFF; font-size: 1.2rem; margin-bottom: 6px;">No products found</h4>
          <p style="font-size: 0.9rem;">Try adjusting your search terms or category filters.</p>
        </div>
      `;
      return;
    }

    menuGrid.innerHTML = items.map(dish => {
      const spiceIcons = Array.from({ length: dish.spice })
        .map(() => `<span title="Spicy">🌶️</span>`)
        .join('');

      return `
        <article class="food-card" data-id="${dish.id}">
          <div class="food-card-img-wrap">
            <img src="${getSafeImageUrl(dish.image)}" alt="${dish.name}" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='assets/images/seoulmandu_logo.jpg';">
            <div class="food-card-floating-badge">
              <span class="badge-pill ${dish.badge.includes('BEST') ? 'red' : 'gold'}">${dish.badge}</span>
            </div>
            <div class="food-card-quick-view">
              <button class="btn btn-cream btn-sm btn-quick-view" data-id="${dish.id}">
                Quick View
              </button>
            </div>
          </div>
          <div class="food-card-body">
            <div class="food-card-top-row">
              <h3 class="food-card-name">${dish.name}</h3>
              <span class="food-card-price">${dish.price}</span>
            </div>
            <div class="food-card-subname">${dish.subname}</div>
            <div class="food-card-tags">
              ${dish.tags.map(t => `<span class="food-tag-pill">${t}</span>`).join('')}
              ${dish.isVegetarian ? `<span class="food-tag-pill" style="color: var(--color-accent-sage);">🌱 Vegetarian</span>` : ''}
            </div>
            <div class="food-card-footer">
              <div class="food-card-meta-indicators">
                ${spiceIcons ? `<span class="spice-rating">${spiceIcons}</span>` : '<span style="font-size:0.75rem;">Mild</span>'}
                <span>${dish.pieces}</span>
              </div>
              <button class="btn-card-add" data-id="${dish.id}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach click listeners to "Add" buttons
    menuGrid.querySelectorAll('.btn-card-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        addToCart(id);
      });
    });

    // Attach click listeners to "Quick View"
    menuGrid.querySelectorAll('.btn-quick-view').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        openFoodModal(id);
      });
    });

    // Allow clicking card to open quick view
    menuGrid.querySelectorAll('.food-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.btn-card-add')) {
          const id = card.getAttribute('data-id');
          openFoodModal(id);
        }
      });
    });
  }

  // Category Filtering
  categoryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.getAttribute('data-category');
      renderMenu();
    });
  });

  // Search input
  if (menuSearchInput) {
    menuSearchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderMenu();
    });
  }

  // Veg toggle
  if (vegToggleBtn) {
    vegToggleBtn.addEventListener('click', () => {
      state.onlyVegetarian = !state.onlyVegetarian;
      vegToggleBtn.classList.toggle('active', state.onlyVegetarian);
      renderMenu();
    });
  }

  // --- 7. Cart & Ordering System ---
  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotalRaw = state.cart.reduce((sum, item) => sum + (item.priceRaw * item.qty), 0);
    const deliveryFee = (state.cart.length > 0 && state.orderType === 'delivery') ? SELLER_WHATSAPP_CONFIG.deliveryCharge : 0;
    const finalTotal = state.cart.length > 0 ? (subtotalRaw + deliveryFee) : 0;

    // Update Badges across the interface
    cartBadgeCount.forEach(el => {
      el.textContent = totalCount;
      el.classList.add('bump');
      setTimeout(() => el.classList.remove('bump'), 400);
    });

    // Update Subtotal, Delivery Charge, and Total displays
    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = `${SELLER_WHATSAPP_CONFIG.currency} ${subtotalRaw.toLocaleString()}`;
    }
    if (cartDeliveryValEl) {
      if (state.orderType === 'delivery') {
        cartDeliveryValEl.textContent = `${SELLER_WHATSAPP_CONFIG.currency} ${SELLER_WHATSAPP_CONFIG.deliveryCharge}`;
        cartDeliveryValEl.classList.remove('free');
        if (cartDeliveryLabelEl) cartDeliveryLabelEl.textContent = 'Delivery Charge (Dharan)';
      } else {
        cartDeliveryValEl.textContent = 'Rs. 0 (Free Pickup)';
        cartDeliveryValEl.classList.add('free');
        if (cartDeliveryLabelEl) cartDeliveryLabelEl.textContent = 'Store Pickup';
      }
    }
    if (cartTotalEl) {
      cartTotalEl.textContent = `${SELLER_WHATSAPP_CONFIG.currency} ${finalTotal.toLocaleString()}`;
    }

    // Toggle Empty State vs Items
    if (!cartItemsList || !cartEmptyState) return;

    if (state.cart.length === 0) {
      cartEmptyState.style.display = 'flex';
      cartItemsList.innerHTML = '';
      if (cartCheckoutForm) cartCheckoutForm.style.display = 'none';
      if (whatsappCheckoutBtn) {
        whatsappCheckoutBtn.disabled = true;
        whatsappCheckoutBtn.setAttribute('aria-disabled', 'true');
      }
    } else {
      cartEmptyState.style.display = 'none';
      if (cartCheckoutForm) cartCheckoutForm.style.display = 'flex';
      if (whatsappCheckoutBtn) {
        whatsappCheckoutBtn.disabled = false;
        whatsappCheckoutBtn.removeAttribute('aria-disabled');
      }

      // Render cart items with individual price, quantity stepper, and remove button
      cartItemsList.innerHTML = state.cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img class="cart-item-img" src="${getSafeImageUrl(item.image)}" alt="${item.name}" loading="lazy" onerror="this.onerror=null; this.src='assets/images/seoulmandu_logo.jpg';">
          <div class="cart-item-info">
            <h5>${item.name}</h5>
            <div class="cart-item-price-calc">
              <span class="unit-price">${SELLER_WHATSAPP_CONFIG.currency} ${item.priceRaw.toLocaleString()} each</span>
              <span class="line-total">• Total: ${SELLER_WHATSAPP_CONFIG.currency} ${(item.priceRaw * item.qty).toLocaleString()}</span>
            </div>
          </div>
          <div class="cart-item-actions">
            <div class="qty-stepper">
              <button class="qty-btn btn-qty-minus" data-id="${item.id}" aria-label="Decrease quantity" title="Decrease quantity">-</button>
              <span class="qty-display">${item.qty}</span>
              <button class="qty-btn btn-qty-plus" data-id="${item.id}" aria-label="Increase quantity" title="Increase quantity">+</button>
            </div>
            <button class="btn-remove-item" data-id="${item.id}" aria-label="Remove item" title="Remove item from cart">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      `).join('');

      // Attach Qty Stepper and Remove Listeners
      cartItemsList.querySelectorAll('.btn-qty-minus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          decrementCartItem(id);
        });
      });

      cartItemsList.querySelectorAll('.btn-qty-plus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          incrementCartItem(id);
        });
      });

      cartItemsList.querySelectorAll('.btn-remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          removeCartItem(id);
        });
      });
    }

    // Persist cart state in localStorage
    localStorage.setItem('seoulmandu_cart', JSON.stringify(state.cart));
  }

  function addToCart(dishId, quantity = 1) {
    const dish = (window.SEOULMANDU_MENU || []).find(d => d.id === dishId);
    if (!dish) return;

    const existingIndex = state.cart.findIndex(i => i.id === dishId);
    if (existingIndex > -1) {
      state.cart[existingIndex].qty += quantity;
    } else {
      state.cart.push({
        id: dish.id,
        name: dish.name,
        subname: dish.subname || '',
        priceRaw: dish.priceRaw,
        image: dish.image,
        qty: quantity
      });
    }

    updateCartUI();
    showToast(`Added ${dish.name} to cart!`);
    toggleCartDrawer(true);
  }

  function incrementCartItem(id) {
    const item = state.cart.find(i => i.id === id);
    if (item) {
      item.qty += 1;
      updateCartUI();
    }
  }

  function decrementCartItem(id) {
    const itemIndex = state.cart.findIndex(i => i.id === id);
    if (itemIndex > -1) {
      if (state.cart[itemIndex].qty > 1) {
        state.cart[itemIndex].qty -= 1;
        updateCartUI();
      } else {
        removeCartItem(id);
      }
    }
  }

  function removeCartItem(id) {
    const itemIndex = state.cart.findIndex(i => i.id === id);
    if (itemIndex > -1) {
      const removedName = state.cart[itemIndex].name;
      state.cart.splice(itemIndex, 1);
      updateCartUI();
      showToast(`Removed ${removedName} from cart`);
    }
  }

  function toggleCartDrawer(open) {
    if (open) {
      cartDrawer.classList.add('open');
      cartBackdrop.classList.add('active');
      document.body.classList.add('cart-open');
    } else {
      cartDrawer.classList.remove('open');
      cartBackdrop.classList.remove('active');
      document.body.classList.remove('cart-open');
    }
  }

  cartTriggerBtns.forEach(btn => {
    btn.addEventListener('click', () => toggleCartDrawer(true));
  });

  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => toggleCartDrawer(false));
  }

  if (cartBackdrop) {
    cartBackdrop.addEventListener('click', () => toggleCartDrawer(false));
  }

  // --- Customer Checkout Form Handling & Persistence ---
  function updateCheckoutFormMode(type) {
    if (!checkoutFormHeading || !checkoutTypeBadge || !custAddressLabel || !custAddressInput) return;

    if (type === 'delivery') {
      checkoutFormHeading.textContent = 'Delivery & Contact Details';
      checkoutTypeBadge.textContent = 'Dharan Delivery';
      custAddressLabel.innerHTML = 'Delivery Address in Dharan <span class="required">*</span>';
      custAddressInput.placeholder = 'Ward / Street / Landmark (e.g. Ward 8, Clock Tower area)';
      if (custAddressTip) {
        custAddressTip.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>Delivery charge Rs. 100 across all wards in Dharan.</span>
        `;
      }
      custAddressInput.setAttribute('required', 'true');
    } else { // pickup
      checkoutFormHeading.textContent = 'Store Pickup & Contact Details';
      checkoutTypeBadge.textContent = 'Free Pickup';
      custAddressLabel.innerHTML = 'Pickup Time / Note <span class="optional">(Optional)</span>';
      custAddressInput.placeholder = 'e.g. Will pick up around 5:30 PM';
      if (custAddressTip) {
        custAddressTip.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>Free pickup at Seoulmandu Mart in Dharan.</span>
        `;
      }
      custAddressInput.removeAttribute('required');
    }

    updateCartUI();
  }

  function loadSavedCustomerInfo() {
    try {
      const saved = JSON.parse(localStorage.getItem('seoulmandu_customer_info') || '{}');
      if (saved.name && custNameInput) custNameInput.value = saved.name;
      if (saved.phone && custPhoneInput) custPhoneInput.value = saved.phone;
      if (saved.address && custAddressInput) custAddressInput.value = saved.address;
      if (saved.notes && custNotesInput) custNotesInput.value = saved.notes;
    } catch (e) {
      console.warn('Customer info parse warning', e);
    }
  }

  function saveCustomerInfo() {
    const info = {
      name: custNameInput ? custNameInput.value.trim() : '',
      phone: custPhoneInput ? custPhoneInput.value.trim() : '',
      address: custAddressInput ? custAddressInput.value.trim() : '',
      notes: custNotesInput ? custNotesInput.value.trim() : ''
    };
    localStorage.setItem('seoulmandu_customer_info', JSON.stringify(info));
  }

  [custNameInput, custPhoneInput, custAddressInput, custNotesInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => {
        inp.classList.remove('input-invalid');
        saveCustomerInfo();
      });
    }
  });

  // Initialize customer info & mode
  loadSavedCustomerInfo();
  updateCheckoutFormMode(state.orderType);

  // Order type switcher (Delivery / Pickup)
  orderTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      orderTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.orderType = btn.getAttribute('data-type');
      updateCheckoutFormMode(state.orderType);
    });
  });

  // --- Automatic WhatsApp Order Generator ---
  function handleWhatsAppOrder() {
    if (state.cart.length === 0) {
      showToast('Your cart is empty! Please add items before ordering.', 'error');
      return;
    }

    const name = custNameInput ? custNameInput.value.trim() : '';
    const phone = custPhoneInput ? custPhoneInput.value.trim() : '';
    const address = custAddressInput ? custAddressInput.value.trim() : '';
    const notes = custNotesInput ? custNotesInput.value.trim() : '';

    // Validate customer details
    if (!name) {
      if (custNameInput) {
        custNameInput.classList.add('input-invalid');
        custNameInput.focus();
        custNameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      showToast('Please enter your name to proceed with the order.', 'error');
      return;
    }

    if (!phone) {
      if (custPhoneInput) {
        custPhoneInput.classList.add('input-invalid');
        custPhoneInput.focus();
        custPhoneInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      showToast('Please provide your contact phone number.', 'error');
      return;
    }

    if (state.orderType === 'delivery' && !address) {
      if (custAddressInput) {
        custAddressInput.classList.add('input-invalid');
        custAddressInput.focus();
        custAddressInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      showToast('Please enter your Dharan delivery address & landmark.', 'error');
      return;
    }

    // Persist validated customer info
    saveCustomerInfo();

    const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotalRaw = state.cart.reduce((sum, item) => sum + (item.priceRaw * item.qty), 0);
    const deliveryFee = state.orderType === 'delivery' ? SELLER_WHATSAPP_CONFIG.deliveryCharge : 0;
    const finalTotal = subtotalRaw + deliveryFee;
    const orderDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    // Clean, universal text format without emojis for zero font/glyph issues
    let message = `*NEW ORDER - ${SELLER_WHATSAPP_CONFIG.shopName}*\n`;
    message += `Mart: ${SELLER_WHATSAPP_CONFIG.location}\n`;
    message += `Date: ${orderDate}\n`;
    message += `Order Type: *${state.orderType.toUpperCase()}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*CUSTOMER & CONTACT DETAILS:*\n`;
    message += `• Name: ${name}\n`;
    message += `• Phone: ${phone}\n`;
    if (state.orderType === 'delivery') {
      message += `• Delivery Address: ${address}\n`;
    } else if (address) {
      message += `• Pickup Note: ${address}\n`;
    }
    if (notes) {
      message += `• Special Note: ${notes}\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*ORDERED ITEMS:*\n\n`;

    state.cart.forEach((item, index) => {
      const lineTotal = item.priceRaw * item.qty;
      message += `${index + 1}. *${item.name}*\n`;
      message += `   - Qty: ${item.qty} × ${SELLER_WHATSAPP_CONFIG.currency} ${item.priceRaw.toLocaleString()} = *${SELLER_WHATSAPP_CONFIG.currency} ${lineTotal.toLocaleString()}*\n`;
    });

    message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Items Count: *${totalCount}*\n`;
    message += `Subtotal: ${SELLER_WHATSAPP_CONFIG.currency} ${subtotalRaw.toLocaleString()}\n`;
    if (state.orderType === 'delivery') {
      message += `Delivery Charge: ${SELLER_WHATSAPP_CONFIG.currency} ${deliveryFee.toLocaleString()}\n`;
    } else {
      message += `Delivery Charge: Rs. 0 (Store Pickup)\n`;
    }
    message += `*TOTAL ORDER AMOUNT: ${SELLER_WHATSAPP_CONFIG.currency} ${finalTotal.toLocaleString()}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `*Note / Confirmation:*\n`;
    message += `${SELLER_WHATSAPP_CONFIG.confirmPrompt}\n`;

    // Construct click-to-chat URL with pre-filled message
    const whatsappUrl = `https://wa.me/${SELLER_WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp directly in new tab/app
    window.open(whatsappUrl, '_blank');
    showToast('Opening WhatsApp with your order & address details...', 'success');
  }

  if (whatsappCheckoutBtn) {
    whatsappCheckoutBtn.addEventListener('click', handleWhatsAppOrder);
  }

  // --- 8. Food Detail Modal (Quick View) ---
  function openFoodModal(dishId) {
    const dish = window.SEOULMANDU_MENU.find(d => d.id === dishId);
    if (!dish || !foodModalContent || !foodModalBackdrop) return;

    state.activeModalItem = dish;

    const spiceText = dish.spice === 0 ? 'Mild & Savory' : dish.spice === 1 ? 'Medium Spice 🌶️' : 'Spicy Fire 🌶️🌶️';

    foodModalContent.innerHTML = `
      <div class="food-modal-img-wrap">
        <img src="${getSafeImageUrl(dish.image)}" alt="${dish.name}" onerror="this.onerror=null; this.src='assets/images/seoulmandu_logo.jpg';">
        <div style="position: absolute; top: 18px; left: 18px;">
          <span class="badge-pill red">${dish.badge}</span>
        </div>
      </div>
      <div class="food-modal-content">
        <button class="btn-close-modal" id="modalCloseAction">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <span class="korean-sub" style="color: var(--color-accent-sage); font-size: 0.88rem; margin-bottom: 6px;">
          ${dish.subname}
        </span>
        <h2 style="font-family: var(--font-display); font-size: 1.85rem; font-weight: 800; color: #FFFFFF; line-height: 1.15; margin-bottom: 12px;">
          ${dish.name}
        </h2>
        <div style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: var(--color-primary); margin-bottom: 16px;">
          ${dish.price}
        </div>
        
        <p style="font-size: 0.92rem; line-height: 1.65; color: var(--color-text-gray-light); margin-bottom: 22px;">
          ${dish.description}
        </p>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; padding: 14px; background: rgba(255,255,255,0.04); border-radius: 12px;">
          <div>
            <span style="font-size: 0.7rem; color: var(--color-text-gray-muted); display: block; text-transform: uppercase;">Portion</span>
            <strong style="font-size: 0.85rem; color: #FFFFFF;">${dish.pieces}</strong>
          </div>
          <div>
            <span style="font-size: 0.7rem; color: var(--color-text-gray-muted); display: block; text-transform: uppercase;">Spice Gauge</span>
            <strong style="font-size: 0.85rem; color: var(--color-spice-red, #D94F45);">${spiceText}</strong>
          </div>
          <div>
            <span style="font-size: 0.7rem; color: var(--color-text-gray-muted); display: block; text-transform: uppercase;">Calories</span>
            <strong style="font-size: 0.85rem; color: #FFFFFF;">${dish.calories}</strong>
          </div>
        </div>

        <div style="display: flex; gap: 12px; margin-top: auto;">
          <button class="btn btn-primary" id="modalAddBtn" style="flex: 1;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add to Order
          </button>
        </div>
      </div>
    `;

    foodModalBackdrop.classList.add('active');
    document.body.classList.add('modal-open');

    // Attach internal listeners
    const modalClose = foodModalContent.querySelector('#modalCloseAction');
    if (modalClose) {
      modalClose.addEventListener('click', closeFoodModal);
    }

    const modalAdd = foodModalContent.querySelector('#modalAddBtn');
    if (modalAdd) {
      modalAdd.addEventListener('click', () => {
        addToCart(dish.id);
        closeFoodModal();
      });
    }
  }

  function closeFoodModal() {
    if (foodModalBackdrop) {
      foodModalBackdrop.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  }

  if (foodModalBackdrop) {
    foodModalBackdrop.addEventListener('click', (e) => {
      if (e.target === foodModalBackdrop) {
        closeFoodModal();
      }
    });
  }

  // --- 9. Featured Dishes Add Buttons ---
  document.querySelectorAll('.btn-featured-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      addToCart(id);
    });
  });

  // --- 10. Newsletter Form Simulation ---
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('Welcome to Seoulmandu Club! 10% coupon sent to your inbox.');
        input.value = '';
      }
    });
  }

  // --- 11. Initial Render ---
  renderMenu();
  updateCartUI();
});
