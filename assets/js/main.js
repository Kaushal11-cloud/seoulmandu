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
  websiteUrl: "https://kaushal11-cloud.github.io/seoulmandu/",
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
    cart: (JSON.parse(localStorage.getItem('seoulmandu_cart') || '[]')).map(item => ({
      ...item,
      cartItemId: item.cartItemId || item.id
    })),
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
  const headerSearchInput = document.querySelector('#headerSearchInput');
  const headerSearchClear = document.querySelector('#headerSearchClear');
  const mobileDrawerSearchInput = document.querySelector('#mobileDrawerSearchInput');
  const categoryCards = document.querySelectorAll('.category-card');
  const categoryResetTopBtn = document.querySelector('#categoryResetTopBtn');
  const activeFilterBanner = document.querySelector('#activeFilterBanner');
  const activeFilterText = document.querySelector('#activeFilterText');
  const btnClearCategoryFilter = document.querySelector('#btnClearCategoryFilter');
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

  // --- 4. Mobile Navigation Drawer (react-burger-menu behavior) ---
  const burgerOpenBtn = document.querySelector('#react-burger-menu-btn') || document.querySelector('.bm-burger-button') || document.querySelector('.mobile-menu-btn');
  const burgerCloseBtn = document.querySelector('#react-burger-cross-btn') || document.querySelector('.bm-cross-button');

  function toggleMobileMenu(isOpen) {
    if (isOpen) {
      if (mobileNavDrawer) {
        mobileNavDrawer.scrollTop = 0;
        mobileNavDrawer.classList.add('open');
        mobileNavDrawer.setAttribute('aria-hidden', 'false');
      }
      if (mobileOverlay) mobileOverlay.classList.add('active');
      if (mobileMenuBtn) mobileMenuBtn.classList.add('active');
      document.body.classList.add('modal-open');

      // Autofocus first item (react-burger-menu accessibility)
      const firstItem = mobileNavDrawer ? mobileNavDrawer.querySelector('.bm-item, .mobile-nav-link') : null;
      if (firstItem) {
        setTimeout(() => firstItem.focus(), 50);
      }
    } else {
      if (mobileNavDrawer) {
        mobileNavDrawer.classList.remove('open');
        mobileNavDrawer.setAttribute('aria-hidden', 'true');
      }
      if (mobileOverlay) mobileOverlay.classList.remove('active');
      if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
      document.body.classList.remove('modal-open');

      // Return focus to menu button (react-burger-menu accessibility)
      if (burgerOpenBtn) {
        burgerOpenBtn.focus();
      }
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = mobileNavDrawer && (mobileNavDrawer.classList.contains('open') || mobileNavDrawer.getAttribute('aria-hidden') === 'false');
      toggleMobileMenu(!isOpen);
    });
  }

  if (burgerCloseBtn) {
    burgerCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMobileMenu(false);
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => toggleMobileMenu(false));
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // react-burger-menu keyboard navigation (Escape, ArrowUp, ArrowDown, Home, End)
  window.addEventListener('keydown', (e) => {
    const isMenuOpen = mobileNavDrawer && mobileNavDrawer.classList.contains('open');
    if (!isMenuOpen) return;

    if (e.key === 'Escape') {
      toggleMobileMenu(false);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const items = Array.from(mobileNavDrawer.querySelectorAll('.bm-item, .mobile-nav-link'));
      if (!items.length) return;
      const curIdx = items.indexOf(document.activeElement);
      e.preventDefault();
      if (e.key === 'ArrowDown') {
        const nextIdx = (curIdx + 1) % items.length;
        items[nextIdx]?.focus();
      } else {
        const prevIdx = (curIdx - 1 + items.length) % items.length;
        items[prevIdx]?.focus();
      }
    } else if (e.key === 'Home') {
      const first = mobileNavDrawer.querySelector('.bm-item, .mobile-nav-link');
      if (first) {
        e.preventDefault();
        first.focus();
      }
    } else if (e.key === 'End') {
      const items = mobileNavDrawer.querySelectorAll('.bm-item, .mobile-nav-link');
      if (items.length) {
        e.preventDefault();
        items[items.length - 1].focus();
      }
    }
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

  // Category Definitions & Filtering
  const CATEGORY_DISPLAY_NAMES = {
    all: 'All Products',
    ramen: 'Instant Noodles & Ramen',
    snacks: 'Snacks & Chips',
    sweets: 'Candies & Chocolates',
    drinks: 'Drinks & Beverages',
    sauces: 'Sauces & Condiments',
    frozen: 'Frozen Foods & Dumplings'
  };

  function setCategory(catKey, shouldScroll = false) {
    state.activeCategory = catKey || 'all';

    // Update filter pills in #menu
    categoryFilterBtns.forEach(btn => {
      const isActive = btn.getAttribute('data-category') === state.activeCategory;
      btn.classList.toggle('active', isActive);
      if (isActive) {
        const bar = document.querySelector('#menuFilterBar') || document.querySelector('.menu-filter-bar');
        if (bar) {
          btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    });

    // Update active filter banner
    if (activeFilterBanner && activeFilterText) {
      if (state.activeCategory !== 'all') {
        const catName = CATEGORY_DISPLAY_NAMES[state.activeCategory] || state.activeCategory;
        activeFilterText.textContent = `Showing: ${catName}`;
        activeFilterBanner.style.display = 'flex';
      } else {
        activeFilterBanner.style.display = 'none';
      }
    }

    renderMenu();

    if (shouldScroll) {
      const menuSection = document.querySelector('#menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  // Category filter pills click
  categoryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setCategory(btn.getAttribute('data-category'), false);
    });
  });

  // Category showcase cards click (Section C)
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.getAttribute('data-category');
      setCategory(cat, true);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Reset category buttons (top & banner)
  if (categoryResetTopBtn) {
    categoryResetTopBtn.addEventListener('click', () => {
      setCategory('all', true);
    });
  }

  if (btnClearCategoryFilter) {
    btnClearCategoryFilter.addEventListener('click', () => {
      setCategory('all', false);
    });
  }

  // --- Horizontal Category Scrolling (Wheel, Drag & Arrow Buttons) ---
  const menuFilterBar = document.querySelector('#menuFilterBar') || document.querySelector('.menu-filter-bar');
  const filterScrollPrev = document.querySelector('#filterScrollPrev');
  const filterScrollNext = document.querySelector('#filterScrollNext');

  if (menuFilterBar) {
    function updateScrollArrows() {
      if (!filterScrollPrev || !filterScrollNext) return;
      const atStart = menuFilterBar.scrollLeft <= 4;
      const atEnd = menuFilterBar.scrollLeft + menuFilterBar.clientWidth >= menuFilterBar.scrollWidth - 6;
      filterScrollPrev.classList.toggle('is-disabled', atStart);
      filterScrollNext.classList.toggle('is-disabled', atEnd);
    }

    // 1. Mouse wheel horizontal scrolling
    menuFilterBar.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        menuFilterBar.scrollLeft += e.deltaY;
        updateScrollArrows();
      }
    }, { passive: false });

    // 2. Click & drag to scroll (mouse swipe)
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let hasDragged = false;

    menuFilterBar.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      isDown = true;
      hasDragged = false;
      menuFilterBar.classList.add('is-dragging');
      startX = e.pageX - menuFilterBar.offsetLeft;
      scrollLeft = menuFilterBar.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        menuFilterBar.classList.remove('is-dragging');
      }
    });

    menuFilterBar.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const x = e.pageX - menuFilterBar.offsetLeft;
      const walk = (x - startX) * 1.5;
      if (Math.abs(walk) > 5) {
        hasDragged = true;
      }
      menuFilterBar.scrollLeft = scrollLeft - walk;
      updateScrollArrows();
    });

    // Suppress filter button click if the user was dragging
    menuFilterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (hasDragged) {
          e.stopImmediatePropagation();
          e.preventDefault();
          hasDragged = false;
        }
      }, true);
    });

    // 3. Arrow buttons scroll
    if (filterScrollPrev) {
      filterScrollPrev.addEventListener('click', () => {
        menuFilterBar.scrollBy({ left: -260, behavior: 'smooth' });
        setTimeout(updateScrollArrows, 350);
      });
    }

    if (filterScrollNext) {
      filterScrollNext.addEventListener('click', () => {
        menuFilterBar.scrollBy({ left: 260, behavior: 'smooth' });
        setTimeout(updateScrollArrows, 350);
      });
    }

    menuFilterBar.addEventListener('scroll', updateScrollArrows, { passive: true });
    window.addEventListener('resize', updateScrollArrows);
    setTimeout(updateScrollArrows, 200);
  }

  // Synchronized Search Handling (Header, Drawer, Menu)
  function handleSearchInput(query, sourceInput) {
    state.searchQuery = query;

    // Sync input values across all search fields
    if (headerSearchInput && headerSearchInput !== sourceInput) {
      headerSearchInput.value = query;
    }
    if (mobileDrawerSearchInput && mobileDrawerSearchInput !== sourceInput) {
      mobileDrawerSearchInput.value = query;
    }
    if (menuSearchInput && menuSearchInput !== sourceInput) {
      menuSearchInput.value = query;
    }

    if (headerSearchClear) {
      headerSearchClear.style.display = query.trim() ? 'block' : 'none';
    }

    renderMenu();
  }

  if (headerSearchInput) {
    headerSearchInput.addEventListener('input', (e) => {
      handleSearchInput(e.target.value, headerSearchInput);
    });

    headerSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const menuSection = document.querySelector('#menu');
        if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (headerSearchClear) {
    headerSearchClear.addEventListener('click', () => {
      handleSearchInput('', null);
      if (headerSearchInput) headerSearchInput.focus();
    });
  }

  if (mobileDrawerSearchInput) {
    mobileDrawerSearchInput.addEventListener('input', (e) => {
      handleSearchInput(e.target.value, mobileDrawerSearchInput);
    });

    mobileDrawerSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        toggleMobileMenu(false);
        const menuSection = document.querySelector('#menu');
        if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (menuSearchInput) {
    menuSearchInput.addEventListener('input', (e) => {
      handleSearchInput(e.target.value, menuSearchInput);
    });
  }

  // Handle URL Search Query Parameter (e.g. from mobile drawer search on legal pages)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam && searchParam.trim()) {
      handleSearchInput(searchParam.trim(), null);
      setTimeout(() => {
        const menuSection = document.querySelector('#menu');
        if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    }
  } catch (err) {
    // Graceful fallback
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
      cartItemsList.innerHTML = state.cart.map(item => {
        const itemKey = item.cartItemId || item.id;
        return `
        <div class="cart-item" data-id="${itemKey}">
          <img class="cart-item-img" src="${getSafeImageUrl(item.image)}" alt="${item.name}" loading="lazy" onerror="this.onerror=null; this.src='assets/images/seoulmandu_logo.jpg';">
          <div class="cart-item-info">
            <h5>${item.name}</h5>
            ${item.variant ? `<div class="cart-item-variant"><span>Flavor:</span> <strong>${item.variant}</strong></div>` : ''}
            ${item.notes ? `<div class="cart-item-note">Note: "${item.notes}"</div>` : ''}
            <div class="cart-item-price-calc">
              <span class="unit-price">${SELLER_WHATSAPP_CONFIG.currency} ${item.priceRaw.toLocaleString()} each</span>
              <span class="line-total">• Total: ${SELLER_WHATSAPP_CONFIG.currency} ${(item.priceRaw * item.qty).toLocaleString()}</span>
            </div>
          </div>
          <div class="cart-item-actions">
            <div class="qty-stepper">
              <button class="qty-btn btn-qty-minus" data-id="${itemKey}" aria-label="Decrease quantity" title="Decrease quantity">-</button>
              <span class="qty-display">${item.qty}</span>
              <button class="qty-btn btn-qty-plus" data-id="${itemKey}" aria-label="Increase quantity" title="Increase quantity">+</button>
            </div>
            <button class="btn-remove-item" data-id="${itemKey}" aria-label="Remove item" title="Remove item from cart">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
      }).join('');

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

  function addToCart(dishId, quantity = 1, options = {}) {
    const dish = (window.SEOULMANDU_MENU || []).find(d => d.id === dishId);
    if (!dish) return;

    const variantName = options.variant || '';
    const customNote = (options.notes || '').trim();
    const isOffer = !!options.isOffer;
    const itemPriceRaw = (options.priceRaw !== undefined && options.priceRaw !== null) ? Number(options.priceRaw) : dish.priceRaw;
    const cartItemId = options.cartItemId || (variantName ? `${dish.id}__${variantName.replace(/[^a-zA-Z0-9]/g, '_')}` : (isOffer ? `${dish.id}__offer` : dish.id));

    const existingIndex = state.cart.findIndex(i => (i.cartItemId || i.id) === cartItemId && (i.notes || '') === customNote);
    if (existingIndex > -1) {
      state.cart[existingIndex].qty += quantity;
    } else {
      state.cart.push({
        cartItemId: cartItemId,
        id: dish.id,
        name: isOffer ? `${dish.name.split('(')[0].trim()} [Offer]` : dish.name,
        subname: dish.subname || '',
        priceRaw: itemPriceRaw,
        image: dish.image,
        qty: quantity,
        variant: variantName,
        notes: customNote,
        isOffer: isOffer
      });
    }

    updateCartUI();
    const itemLabel = isOffer ? `${dish.name.split('(')[0].trim()} (Offer)` : (variantName ? `${dish.name.split('(')[0].trim()} (${variantName})` : dish.name);
    showToast(`Added ${quantity > 1 ? quantity + '× ' : ''}${itemLabel} to cart!`);
    toggleCartDrawer(true);
  }

  function incrementCartItem(cartItemId) {
    const item = state.cart.find(i => (i.cartItemId || i.id) === cartItemId);
    if (item) {
      item.qty += 1;
      updateCartUI();
    }
  }

  function decrementCartItem(cartItemId) {
    const itemIndex = state.cart.findIndex(i => (i.cartItemId || i.id) === cartItemId);
    if (itemIndex > -1) {
      if (state.cart[itemIndex].qty > 1) {
        state.cart[itemIndex].qty -= 1;
        updateCartUI();
      } else {
        removeCartItem(cartItemId);
      }
    }
  }

  function removeCartItem(cartItemId) {
    const itemIndex = state.cart.findIndex(i => (i.cartItemId || i.id) === cartItemId);
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
      if (item.variant) {
        message += `   - Variant / Flavor: *${item.variant}*\n`;
      }
      if (item.notes) {
        message += `   - Customer Note: _"${item.notes}"_\n`;
      }
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

  // --- 8. Fullscreen Product Customizer & Detail View ---
  function openFoodModal(dishId, offerOptions = null) {
    const dish = window.SEOULMANDU_MENU.find(d => d.id === dishId);
    if (!dish || !foodModalContent || !foodModalBackdrop) return;

    state.activeModalItem = dish;

    // Check if dish has an active offer from SEOULMANDU_OFFERS or passed options
    const activeOffer = offerOptions || (window.SEOULMANDU_OFFERS || []).find(o => o.dishId === dishId);
    const effectivePriceRaw = activeOffer ? activeOffer.offerPrice : dish.priceRaw;

    const variants = dish.variants || [];
    let selectedVariant = variants.length > 0 ? variants[0] : null;
    let currentQty = 1;

    const spiceText = dish.spice === 0 ? 'Mild & Savory' : dish.spice === 1 ? 'Medium Spice 🌶️' : 'Spicy Fire 🌶️🌶️';
    const categoryName = dish.category === 'ramen' ? 'Instant Noodles & Ramen' :
                         dish.category === 'snacks' ? 'Snacks & Chips' :
                         dish.category === 'sweets' ? 'Candies & Chocolates' :
                         dish.category === 'drinks' ? 'Drinks & Beverages' :
                         dish.category === 'sauces' ? 'Sauces & Condiments' :
                         dish.category === 'frozen' ? 'Frozen Foods & Dumplings' : 'Korean Grocery';

    function getSubtotal() {
      return effectivePriceRaw * currentQty;
    }

    function renderModalUI() {
      const subtotal = getSubtotal();

      foodModalContent.innerHTML = `
        <!-- Fullscreen Top Header -->
        <header class="fsc-header">
          <div class="fsc-header-left">
            <button type="button" class="fsc-back-btn" id="fscBackBtn" aria-label="Back to store">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to Store</span>
              <span class="fsc-back-kr">쇼핑 계속하기</span>
            </button>
            <div class="fsc-breadcrumb">
              <span>Seoulmandu</span>
              <span class="sep">/</span>
              <span>${categoryName.split(' ')[0]}</span>
              <span class="sep">/</span>
              <span class="active">${dish.name.split('(')[0].trim()}</span>
            </div>
          </div>
          <div class="fsc-header-right">
            <button type="button" class="fsc-cart-btn" id="fscCartShortcut" aria-label="View Order Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>Cart</span>
              <span class="fsc-cart-badge">${state.cart.reduce((s, i) => s + i.qty, 0)}</span>
            </button>
            <button type="button" class="fsc-close-btn" id="modalCloseAction" aria-label="Close customizer">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </header>

        <!-- Fullscreen Scrollable Body -->
        <div class="fsc-body">
          <div class="fsc-container">
            <!-- Left: Visual Column (Compact & Anchored) -->
            <div class="fsc-visual-col">
              <div class="fsc-thumb-card">
                <img src="${getSafeImageUrl(dish.image)}" alt="${dish.name}" onerror="this.onerror=null; this.src='assets/images/seoulmandu_logo.jpg';">
              </div>

              <div class="fsc-compact-specs">
                <div class="fsc-spec-line">
                  <span class="fsc-spec-k">Portion Size</span>
                  <span class="fsc-spec-v">${dish.pieces || 'Standard pack'}</span>
                </div>
                <div class="fsc-spec-line">
                  <span class="fsc-spec-k">Spice Gauge</span>
                  <span class="fsc-spec-v ${dish.spice > 0 ? 'text-spice' : ''}">${spiceText}</span>
                </div>
                <div class="fsc-spec-line">
                  <span class="fsc-spec-k">Calories</span>
                  <span class="fsc-spec-v">${dish.calories || '—'}</span>
                </div>
                <div class="fsc-spec-line">
                  <span class="fsc-spec-k">Dietary</span>
                  <span class="fsc-spec-v ${dish.isVegetarian ? 'text-veg' : ''}">${dish.isVegetarian ? 'Vegetarian' : 'Standard'}</span>
                </div>
              </div>
            </div>

            <!-- Right: Hero Customizable Section -->
            <div class="fsc-hero-col">
              <div class="fsc-product-header">
                <h1 class="fsc-title">${dish.name}</h1>
                <div class="fsc-price-row">
                  <span class="fsc-price">Rs. ${effectivePriceRaw}</span>
                  ${activeOffer ? `<del style="color: var(--color-text-gray-muted); text-decoration: line-through; margin-left: 8px; font-size: 1.05rem;">${dish.price}</del><span style="margin-left: 8px; background: rgba(255, 90, 95, 0.16); border: 1px solid rgba(255, 90, 95, 0.4); color: #FF5A5F; font-weight: 800; font-size: 0.74rem; padding: 2px 8px; border-radius: var(--radius-full);">${activeOffer.discountLabel || 'SPECIAL OFFER'}</span>` : ''}
                  <span class="fsc-price-unit">/ ${dish.pieces || 'unit'}</span>
                  <span class="fsc-stock-badge"><span class="fsc-pulse-dot"></span> In Stock in Dharan</span>
                </div>
                ${(dish.tags && dish.tags.length > 0) ? `
                  <div class="fsc-tags-row">
                    ${dish.tags.map(t => `<span class="food-tag-pill">${t}</span>`).join('')}
                  </div>
                ` : ''}
              </div>

              <!-- Customizable Hero Controls -->
              <div class="fsc-customizer-hero">
                ${variants.length > 0 ? `
                  <div class="fsc-section-block">
                    <div class="fsc-block-header">
                      <label class="fsc-label">
                        <span>Select Flavor / Variety</span>
                        <span class="fsc-req-pill">Required</span>
                      </label>
                      <span class="fsc-current-selection">${selectedVariant ? selectedVariant.name.split('(')[0].trim() : ''}</span>
                    </div>

                    <div class="fsc-variants-grid" role="radiogroup" aria-label="Product Flavors">
                      ${variants.map(v => {
                        const isSelected = selectedVariant && selectedVariant.id === v.id;
                        return `
                          <div class="fsc-variant-chip ${isSelected ? 'active' : ''}" data-variant-id="${v.id}" role="radio" aria-checked="${isSelected}" tabindex="0">
                            <div class="fsc-radio-indicator">
                              <div class="fsc-radio-dot"></div>
                            </div>
                            <div class="fsc-variant-body">
                              <div class="fsc-variant-top">
                                <span class="fsc-variant-name">${v.name}</span>
                                ${v.badge ? `<span class="fsc-v-badge ${v.badge.includes('POP') ? 'gold' : 'red'}">${v.badge}</span>` : ''}
                              </div>
                              <span class="fsc-variant-detail">${v.desc}</span>
                            </div>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- Quantity Stepper -->
                <div class="fsc-section-block">
                  <div class="fsc-block-header">
                    <label class="fsc-label">Quantity</label>
                  </div>
                  <div class="fsc-config-row">
                    <div class="fsc-stepper-box">
                      <button type="button" class="fsc-step-btn" id="fscQtyMinus" aria-label="Decrease quantity" ${currentQty <= 1 ? 'disabled' : ''}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                      <span class="fsc-step-num" id="fscQtyDisplay">${currentQty}</span>
                      <button type="button" class="fsc-step-btn" id="fscQtyPlus" aria-label="Increase quantity">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                    </div>
                    <div class="fsc-subtotal-box">
                      <div class="fsc-opt-hint">Estimated Subtotal</div>
                      <span class="fsc-total-val" id="fscSubtotalVal">${SELLER_WHATSAPP_CONFIG.currency} ${subtotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <!-- Special Requests / Notes -->
                <div class="fsc-section-block">
                  <div class="fsc-block-header">
                    <label for="fscSpecialNotes" class="fsc-label">
                      <span>Special Instructions / Notes</span>
                      <span class="fsc-opt-hint">(Optional)</span>
                    </label>
                  </div>
                  <textarea id="fscSpecialNotes" class="fsc-notes-field" rows="2" placeholder="e.g. Please mix 2 Almond & 1 White Cookie, pack well-chilled, or add packaging note..."></textarea>
                </div>

                <!-- Action Buttons (Desktop) -->
                <div class="fsc-actions-row">
                  <button type="button" class="btn btn-primary fsc-main-add-btn" id="fscSubmitAddBtn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span id="fscBtnText">Add ${currentQty > 1 ? currentQty + '× ' : ''}to Order • ${SELLER_WHATSAPP_CONFIG.currency} ${subtotal.toLocaleString()}</span>
                  </button>
                  <button type="button" class="btn btn-outline fsc-close-alt-btn" id="fscSecondaryBack">
                    Back to Menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sticky Bottom Bar for Mobile Devices -->
        <div class="fsc-mobile-bottom-bar">
          <div class="fsc-mobile-price-block">
            <span class="fsc-mobile-price-label">Total for ${currentQty} pack${currentQty > 1 ? 's' : ''}:</span>
            <span class="fsc-mobile-price-val" id="fscMobileTotalVal">${SELLER_WHATSAPP_CONFIG.currency} ${subtotal.toLocaleString()}</span>
          </div>
          <button type="button" class="btn btn-primary fsc-mobile-add-btn" id="fscMobileAddBtn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add to Order</span>
          </button>
        </div>
      `;

      // Attach internal listeners
      attachModalEvents();
    }

    function attachModalEvents() {
      // Close actions
      const closeBtn = foodModalContent.querySelector('#modalCloseAction');
      if (closeBtn) closeBtn.addEventListener('click', closeFoodModal);

      const backBtn = foodModalContent.querySelector('#fscBackBtn');
      if (backBtn) backBtn.addEventListener('click', closeFoodModal);

      const secBackBtn = foodModalContent.querySelector('#fscSecondaryBack');
      if (secBackBtn) secBackBtn.addEventListener('click', closeFoodModal);

      // Cart shortcut
      const cartShortcut = foodModalContent.querySelector('#fscCartShortcut');
      if (cartShortcut) {
        cartShortcut.addEventListener('click', () => {
          closeFoodModal();
          toggleCartDrawer(true);
        });
      }

      // Variant selection
      foodModalContent.querySelectorAll('.fsc-variant-chip, .fsc-variant-item').forEach(item => {
        item.addEventListener('click', () => {
          const varId = item.getAttribute('data-variant-id');
          const found = variants.find(v => v.id === varId);
          if (found) {
            selectedVariant = found;
            const existingNotes = foodModalContent.querySelector('#fscSpecialNotes')?.value || '';
            renderModalUI();
            const notesEl = foodModalContent.querySelector('#fscSpecialNotes');
            if (notesEl) notesEl.value = existingNotes;
          }
        });

        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
          }
        });
      });

      // Stepper
      const qtyMinus = foodModalContent.querySelector('#fscQtyMinus');
      const qtyPlus = foodModalContent.querySelector('#fscQtyPlus');
      const qtyDisplay = foodModalContent.querySelector('#fscQtyDisplay');
      const subtotalVal = foodModalContent.querySelector('#fscSubtotalVal');
      const btnText = foodModalContent.querySelector('#fscBtnText');
      const mobileTotalVal = foodModalContent.querySelector('#fscMobileTotalVal');

      function updateQtyUI() {
        if (qtyDisplay) qtyDisplay.textContent = currentQty;
        if (qtyMinus) qtyMinus.disabled = currentQty <= 1;
        const total = getSubtotal();
        const totalStr = `${SELLER_WHATSAPP_CONFIG.currency} ${total.toLocaleString()}`;
        if (subtotalVal) subtotalVal.textContent = totalStr;
        if (btnText) btnText.textContent = `Add ${currentQty > 1 ? currentQty + '× ' : ''}to Order • ${totalStr}`;
        if (mobileTotalVal) mobileTotalVal.textContent = totalStr;
      }

      if (qtyMinus) {
        qtyMinus.addEventListener('click', () => {
          if (currentQty > 1) {
            currentQty -= 1;
            updateQtyUI();
          }
        });
      }

      if (qtyPlus) {
        qtyPlus.addEventListener('click', () => {
          if (currentQty < 99) {
            currentQty += 1;
            updateQtyUI();
          }
        });
      }

      // Add to Order handlers
      function handleOrderAdd() {
        const notes = (foodModalContent.querySelector('#fscSpecialNotes')?.value || '').trim();
        const chosenVariantName = selectedVariant ? selectedVariant.name : '';
        addToCart(dish.id, currentQty, {
          variant: chosenVariantName,
          notes: notes,
          priceRaw: effectivePriceRaw,
          isOffer: !!activeOffer
        });
        closeFoodModal();
      }

      const submitAddBtn = foodModalContent.querySelector('#fscSubmitAddBtn');
      if (submitAddBtn) submitAddBtn.addEventListener('click', handleOrderAdd);

      const mobileAddBtn = foodModalContent.querySelector('#fscMobileAddBtn');
      if (mobileAddBtn) mobileAddBtn.addEventListener('click', handleOrderAdd);
    }

    renderModalUI();

    foodModalBackdrop.classList.add('active');
    document.body.classList.add('modal-open');
    foodModalContent.scrollTop = 0;
  }

  function closeFoodModal() {
    if (foodModalBackdrop) {
      foodModalBackdrop.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  }

  // Keyboard Escape listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (foodModalBackdrop && foodModalBackdrop.classList.contains('active')) {
        closeFoodModal();
      } else if (cartDrawer && cartDrawer.classList.contains('open')) {
        toggleCartDrawer(false);
      }
    }
  });

  if (foodModalBackdrop) {
    foodModalBackdrop.addEventListener('click', (e) => {
      if (e.target === foodModalBackdrop) {
        closeFoodModal();
      }
    });
  }

  // --- 8.5. Hero Product Spotlight Carousel ---
  const heroCarousel = document.querySelector('#heroCarousel');
  if (heroCarousel) {
    const slides = heroCarousel.querySelectorAll('.hero-carousel-slide');
    const tabs = heroCarousel.querySelectorAll('.carousel-tab');
    const prevBtn = heroCarousel.querySelector('#carouselPrevBtn');
    const nextBtn = heroCarousel.querySelector('#carouselNextBtn');
    const autoplayToggleBtn = heroCarousel.querySelector('#carouselAutoplayToggle');
    const autoplayIcon = heroCarousel.querySelector('#carouselAutoplayIcon');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoplayTimer = null;
    let isPausedManually = false;
    let isHovered = false;
    const AUTOPLAY_DELAY = 3600; // Snappy 3.6s auto-play interval

    function goToSlide(index) {
      if (!totalSlides) return;
      currentSlide = (index + totalSlides) % totalSlides;

      slides.forEach((slide, i) => {
        const isActive = i === currentSlide;
        slide.classList.toggle('active', isActive);
        slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });

      tabs.forEach((tab, i) => {
        const isActive = i === currentSlide;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');

        // Smooth progress animation on active tab
        const progress = tab.querySelector('.tab-progress');
        if (progress) {
          if (isActive && !isPausedManually && !isHovered) {
            progress.style.transition = 'none';
            progress.style.width = '0%';
            void progress.offsetWidth; // Force reflow
            progress.style.transition = `width ${AUTOPLAY_DELAY}ms linear`;
            progress.style.width = '100%';
          } else {
            progress.style.transition = 'none';
            progress.style.width = '0%';
          }
        }
      });
    }

    function startAutoplay() {
      stopAutoplay();
      if (!isPausedManually && !isHovered) {
        autoplayTimer = setInterval(() => {
          goToSlide(currentSlide + 1);
        }, AUTOPLAY_DELAY);
      }
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        startAutoplay();
      });
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = parseInt(tab.getAttribute('data-slide-target'), 10);
        if (!isNaN(target)) {
          goToSlide(target);
          startAutoplay();
        }
      });
    });

    if (autoplayToggleBtn && autoplayIcon) {
      autoplayToggleBtn.addEventListener('click', () => {
        isPausedManually = !isPausedManually;
        if (isPausedManually) {
          stopAutoplay();
          autoplayIcon.textContent = '▶';
          autoplayToggleBtn.setAttribute('aria-label', 'Resume slideshow auto play');
          autoplayToggleBtn.setAttribute('title', 'Resume Slideshow');
        } else {
          autoplayIcon.textContent = '⏸';
          autoplayToggleBtn.setAttribute('aria-label', 'Pause slideshow auto play');
          autoplayToggleBtn.setAttribute('title', 'Pause Slideshow');
          startAutoplay();
        }
      });
    }

    heroCarousel.addEventListener('mouseenter', () => {
      isHovered = true;
      stopAutoplay();
    });

    heroCarousel.addEventListener('mouseleave', () => {
      isHovered = false;
      startAutoplay();
    });

    // Touch Swipe Support (Precise horizontal detection)
    let touchStartX = 0;
    let touchStartY = 0;
    heroCarousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    heroCarousel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
          goToSlide(currentSlide + 1);
        } else {
          goToSlide(currentSlide - 1);
        }
        startAutoplay();
      }
    }, { passive: true });

    // Keyboard Arrow Navigation
    heroCarousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
        startAutoplay();
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentSlide + 1);
        startAutoplay();
      }
    });

    // Hero Slide Action Buttons (Add to Cart & Quick View)
    heroCarousel.querySelectorAll('.btn-hero-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const offerPriceAttr = btn.getAttribute('data-offer-price');
        const offerPrice = offerPriceAttr ? parseInt(offerPriceAttr, 10) : null;
        if (id) {
          addToCart(id, 1, offerPrice ? { priceRaw: offerPrice, isOffer: true } : {});
          const span = btn.querySelector('span');
          if (span && !btn.dataset.adding) {
            btn.dataset.adding = 'true';
            const oldText = span.textContent;
            span.textContent = '✓ Added to Cart';
            setTimeout(() => {
              span.textContent = oldText;
              delete btn.dataset.adding;
            }, 1200);
          }
        }
      });
    });

    heroCarousel.querySelectorAll('.btn-hero-quickview').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const offerPriceAttr = btn.getAttribute('data-offer-price');
        const offerPrice = offerPriceAttr ? parseInt(offerPriceAttr, 10) : null;
        if (id) {
          openFoodModal(id, offerPrice ? { offerPrice: offerPrice, isOffer: true } : null);
        }
      });
    });

    // Initialize initial slide & timer
    goToSlide(0);
    startAutoplay();
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
