/**
 * Seoulmandu Menu Data
 * Prepared with customizable placeholders and rich Korean culinary details
 */
window.SEOULMANDU_MENU = [
  {
    id: "sm-kimchi",
    name: "Seoulmandu Authentic Kimchi (서울만두 김치)",
    subname: "Traditional Fermented Napa Cabbage (500g Jar)",
    category: "sauces",
    price: "Rs. 450",
    priceRaw: 450,
    badge: "SIGNATURE",
    spice: 2,
    calories: "65 kcal",
    pieces: "500g Glass Jar",
    isVegetarian: true,
    image: "assets/images/seoulmandu_signature_kimchi.jpg",
    description: "Seoulmandu's flagship house recipe. Naturally fermented Napa cabbage infused with authentic Korean red pepper flakes (gochugaru), garlic, ginger, and scallions. Probiotic-packed, deeply savory, and perfectly tangy.",
    tags: ["House Brand", "500g Jar", "Probiotic Rich", "Vegetarian"],
    variants: [
      { id: "fresh", name: "Fresh & Crisp Ferment (갓 담근 맛)", desc: "Tangy, lively Napa cabbage with crisp texture & balanced spice", badge: "SIGNATURE" },
      { id: "mature", name: "Deep Mature Ferment (묵은지 스타일)", desc: "Aged probiotics, deeper savoriness, ideal for Kimchi Jjigae & Fried Rice" }
    ]
  },
  {
    id: "sm-01",
    name: "Bibigo Wang Mandu (비비고 왕만두)",
    subname: "Frozen Steamed & Pan-Fry Dumplings",
    category: "frozen",
    price: "Rs. 680",
    priceRaw: 680,
    badge: "BESTSELLER",
    spice: 0,
    calories: "380 kcal",
    pieces: "900g Pack",
    isVegetarian: false,
    image: "assets/images/frozen_bibigo_dumplings.jpg",
    description: "Korea's #1 frozen dumpling pouch. Generously filled with juicy minced filling, tender garlic chives, tofu, and glass noodles in thin hand-folded wrappers. Ready to pan-fry, steam, or air-fry.",
    tags: ["Frozen Pack", "Bibigo 900g", "Air Fryer Ready"],
    variants: [
      { id: "pan-fry", name: "Crispy Pan-Fry Style (군만두용)", desc: "Thin skin cooks to a golden lace crunch in 7 mins", badge: "POPULAR" },
      { id: "steamed", name: "Steamed Bamboo Basket (찐만두용)", desc: "Tender, juicy hand-folded wrapper with rich succulent filling" },
      { id: "air-fryer", name: "Air Fryer Quick Style (에어프라이어)", desc: "Crispy exterior with locked-in hot juicy juices in 8 mins" }
    ]
  },
  {
    id: "sm-02",
    name: "CJ Potato Mozzarella Corn Dog (감자 핫도그)",
    subname: "Frozen Crispy Potato Cheese Skewers",
    category: "snacks",
    price: "Rs. 720",
    priceRaw: 720,
    badge: "TRENDING",
    spice: 0,
    calories: "460 kcal",
    pieces: "4-Pack / 400g",
    isVegetarian: true,
    image: "assets/images/frozen_korean_corndogs.jpg",
    description: "Korea's viral street food in a retail freezer pack. Stretchy whole mozzarella cheese coated in golden diced potato cubes and sweet batter. Ready in 8 mins in an air fryer.",
    tags: ["Frozen 4-Pack", "Cheese Pull", "Viral Street Snack"],
    variants: [
      { id: "potato-mozz", name: "Diced Potato Mozzarella (감자 모짜)", desc: "Crunchy potato cube crust with whole stretchy mozzarella", badge: "TRENDING" },
      { id: "classic-cheese", name: "Classic Batter Mozzarella (치즈 핫도그)", desc: "Sweet Korean street-style golden batter coating" }
    ]
  },
  {
    id: "sm-03",
    name: "Yopokki Cheese Tteokbokki (요포키 치즈)",
    subname: "Instant Cheesy Korean Rice Cake Kit",
    category: "snacks",
    price: "Rs. 380",
    priceRaw: 380,
    badge: "CUSTOMER FAVORITE",
    spice: 1,
    calories: "340 kcal",
    pieces: "Pouch & Cup",
    isVegetarian: true,
    image: "assets/images/packaged_cheese_tteokbokki.jpg",
    description: "Korea's favorite packaged instant Tteokbokki. Chewy cylindrical rice cakes paired with rich savory cheddar-mozzarella seasoning powder. Cooks in 2 mins in microwave or stovetop.",
    tags: ["Instant Pack", "Cheese Lovers", "Quick 2-Min"],
    variants: [
      { id: "cheddar-mozz", name: "Cheddar & Mozzarella Cheese (치즈맛)", desc: "Creamy, savory melted cheese powder blend", badge: "FAVORITE" },
      { id: "sweet-spicy", name: "Sweet-Spicy Gochujang (오리지널 매콤)", desc: "Traditional Seoul street food red chili glaze" }
    ]
  },
  {
    id: "sm-04",
    name: "Samyang Buldak & Shin Ramyun Pack (라면 묶음)",
    subname: "Viral Spicy Korean Ramen Assortment",
    category: "ramen",
    price: "Rs. 320",
    priceRaw: 320,
    badge: "BESTSELLER",
    spice: 3,
    calories: "530 kcal",
    pieces: "Multipack 5s",
    isVegetarian: false,
    image: "assets/images/bestseller_ramen_collection.jpg",
    description: "The undisputed kings of Korean instant ramen. Imported 5-pack bundles of world-famous Samyang 2x Spicy Hot Chicken Buldak, Nongshim Shin Ramyun, and Ottogi Jin Ramen Spicy.",
    tags: ["Instant Ramen", "Spicy Buldak", "Multipack"],
    variants: [
      { id: "buldak-2x", name: "Samyang 2x Spicy Buldak (핵불닭볶음면)", desc: "World-famous legendary fiery chicken stir-fry ramen", badge: "HOT" },
      { id: "shin-ramyun", name: "Nongshim Shin Ramyun (신라면)", desc: "Rich gourmet spicy beef broth with shiitake & scallions", badge: "BESTSELLER" },
      { id: "jin-spicy", name: "Ottogi Jin Ramen Spicy (진라면)", desc: "Hearty umami broth with springy noodles" }
    ]
  },
  {
    id: "sm-05",
    name: "Bibigo Mandu & Frozen Street Snack Pack (냉동 스낵)",
    subname: "Dumplings, Chicken & Corn Dog Assortment",
    category: "frozen",
    price: "Rs. 850",
    priceRaw: 850,
    badge: "VALUE PACK",
    spice: 1,
    calories: "580 kcal",
    pieces: "Family Pack",
    isVegetarian: false,
    image: "assets/images/bestseller_frozen_foods.jpg",
    description: "The ultimate Korean freezer collection: Bibigo Wang Kyoza mandu, Korean sweet-spicy chicken bites, crispy seafood pancake (Haemul Pajeon), and golden corn dogs ready at home.",
    tags: ["Frozen Variety", "Family Pack", "Air Fryer Ready"],
    variants: [
      { id: "variety-combo", name: "Assorted Family Bundle (모둠 세트)", desc: "Bibigo dumplings, chicken bites & corn dogs combination", badge: "VALUE" }
    ]
  },
  {
    id: "sm-06",
    name: "Gwangcheon Premium Roasted Seaweed (광천김)",
    subname: "Crispy Roasted Laver Sheets & Rice Flakes",
    category: "snacks",
    price: "Rs. 240",
    priceRaw: 240,
    badge: "PANTRY STAPLE",
    spice: 0,
    calories: "35 kcal",
    pieces: "Multipack Box",
    isVegetarian: true,
    image: "assets/images/bestseller_roasted_seaweed.jpg",
    description: "Crispy roasted Korean seaweed seasoned with pure toasted sesame oil and fine sea salt. Includes individual snack sheets and seasoned Zaban flakes for topping rice bowls and noodles.",
    tags: ["Roasted Laver", "Sesame Oil", "Healthy Snack"],
    variants: [
      { id: "snack-sheets", name: "Roasted Snack Laver Sheets (조미김 도시락)", desc: "Toasted sesame oil & mineral sea salt individual snack packs", badge: "CRISPY" },
      { id: "rice-flakes", name: "Seasoned Seaweed Flakes (자반김)", desc: "Sweet-savory crunchy flakes for warm rice bowls & bibimbap" }
    ]
  },
  {
    id: "sm-07",
    name: "Authentic Korean Soju Collection (참이슬 & 좋은데이)",
    subname: "Chamisul Fresh, Jinro & Peach Soju",
    category: "drinks",
    price: "Rs. 520",
    priceRaw: 520,
    badge: "POPULAR",
    spice: 0,
    calories: "180 kcal",
    pieces: "360ml Bottle",
    isVegetarian: true,
    image: "assets/images/bestseller_korean_drinks.jpg",
    description: "Directly imported Korean bottles. Smooth distilled Chamisul Fresh, iconic Jinro Original, Chum-Churum, and sweet fruit-infused Good Day Peach Soju for Korean dining pairing.",
    tags: ["Imported Soju", "Chilled", "360ml Bottle"],
    variants: [
      { id: "chamisul", name: "Chamisul Fresh Soju (참이슬 후레쉬 360ml)", desc: "Clean bamboo charcoal filtered Korean distilled spirit (16.9% ABV)", badge: "BESTSELLER" },
      { id: "jinro", name: "Jinro Is Back (진로 이즈백 360ml)", desc: "Classic nostalgic clear bottle, extra smooth taste" },
      { id: "peach", name: "Good Day Peach Fruit Soju (좋은데이 복숭아)", desc: "Sweet fragrant natural Korean peach infusion", badge: "SWEET" }
    ]
  },
  {
    id: "sm-08",
    name: "Market O Real Brownie & Sweet Snacks (리얼 브라우니)",
    subname: "Imported Korean Confectionery & Treats",
    category: "sweets",
    price: "Rs. 420",
    priceRaw: 420,
    badge: "SWEET BITE",
    spice: 0,
    calories: "290 kcal",
    pieces: "Box of 4",
    isVegetarian: true,
    image: "assets/images/korean_unpacked_flatlay.jpg",
    description: "Korea's most coveted confectionery. Dense, fudgy brownies crafted with real chocolate chunks, packaged alongside Maxim Mocha Gold instant coffee sticks and sweet butter biscuits.",
    tags: ["Sweet Treats", "Market O", "Dessert Snack"],
    variants: [
      { id: "real-brownie", name: "Market O Real Brownie 4-Pack (리얼 브라우니)", desc: "Dense fudgy brownie with real chocolate chunks", badge: "SWEET" },
      { id: "maxim-coffee", name: "Maxim Mocha Gold Coffee Mix (맥심 모카골드)", desc: "Beloved Korean convenience instant coffee sticks" }
    ]
  },
  {
    id: "sm-09",
    name: "HBAF Honey Butter Almonds & Chips (허니버터아몬드)",
    subname: "Viral Butter Honey Nut Pouch & Snack Shelves",
    category: "snacks",
    price: "Rs. 490",
    priceRaw: 490,
    badge: "TRENDING",
    spice: 0,
    calories: "310 kcal",
    pieces: "210g Pouch",
    isVegetarian: true,
    image: "assets/images/all_things_korean_shelves.jpg",
    description: "The viral Korean snack craze. Premium roasted almonds coated in rich sweet cream butter and wild honey. Stocked alongside Orion turtle chips, sweet corn chips, and snack pouches.",
    tags: ["Viral Almonds", "HBAF 210g", "Snack Craze"],
    variants: [
      { id: "honey-butter", name: "HBAF Honey Butter Almond (허니버터아몬드 210g)", desc: "Sweet cream butter & wild acacia honey glaze", badge: "VIRAL" },
      { id: "turtle-chips", name: "Orion Turtle Chips Corn Soup (꼬북칩)", desc: "4-layer crispy corn soup crunchy chips" }
    ]
  },
  {
    id: "sm-10",
    name: "Korean Mart Pantry Starter Kit (한국 식료품 세트)",
    subname: "Gochujang, Pastes & Everyday Essentials",
    category: "sauces",
    price: "Rs. 950",
    priceRaw: 950,
    badge: "MUST HAVE",
    spice: 2,
    calories: "450 kcal",
    pieces: "Curated Bundle",
    isVegetarian: true,
    image: "assets/images/korean_cravings_tote.jpg",
    description: "A curated starter tote with all Korean cooking essentials: Sunchang Gochujang red chili paste, Doenjang soybean paste, toasted sesame oil, glass noodles, and dipping sauce.",
    tags: ["Cooking Staples", "Gochujang", "Pantry Kit"],
    variants: [
      { id: "cooking-kit", name: "Essential Pantry Starter Bundle (식료품 세트)", desc: "Gochujang paste, Doenjang, sesame oil & noodles", badge: "STARTER" }
    ]
  },
  {
    id: "sm-11",
    name: "Korean Instant Cup & Bowl Ramyun Wall (컵라면)",
    subname: "Grab-and-Go Hot Cup Noodles & Bowls",
    category: "ramen",
    price: "Rs. 220",
    priceRaw: 220,
    badge: "QUICK BITE",
    spice: 2,
    calories: "480 kcal",
    pieces: "Individual Cup",
    isVegetarian: false,
    image: "assets/images/discover_korea_ramen_wall.jpg",
    description: "Instant comfort on the go. An extensive wall of authentic imported cup ramen including Yukgaejang hot bowl, Buldak Carbonara cup, Shin Ramyun Big Bowl, and Neoguri udon.",
    tags: ["Cup Noodles", "Ready in 3 Mins", "Comfort"],
    variants: [
      { id: "buldak-carbonara", name: "Buldak Carbonara Cup (까르보 불닭 컵)", desc: "Creamy cheese and spicy hot chicken", badge: "POPULAR" },
      { id: "shin-bowl", name: "Shin Ramyun Big Bowl (신라면 큰사발)", desc: "Korea's #1 beef & vegetable cup noodle" },
      { id: "yukgaejang", name: "Yukgaejang Spicy Beef Cup (육개장 사발면)", desc: "Nostalgic thin curly noodles with savory broth" }
    ]
  },
  {
    id: "sm-12",
    name: "Korean Convenience Drinks & Juice (한국 캔음료)",
    subname: "Milkis Soda, Bong Bong Grape & Sac Sac Orange",
    category: "drinks",
    price: "Rs. 180",
    priceRaw: 180,
    badge: "REFRESHING",
    spice: 0,
    calories: "130 kcal",
    pieces: "240ml Can",
    isVegetarian: true,
    image: "assets/images/seoul_to_dharan_aisle.jpg",
    description: "Classic canned Korean convenience drinks: fizzy Milkis yogurt soda, Haitai Bong Bong white grape juice with real grape pulp, Sac Sac mandarin orange, and iced pouch teas.",
    tags: ["Chilled Cans", "Milkis", "Real Fruit Pulp"],
    variants: [
      { id: "milkis", name: "Milkis Yogurt Carbonated Soda (밀키스 240ml)", desc: "Creamy, fizzy Korean soda favorite", badge: "FAVORITE" },
      { id: "bong-bong", name: "Haitai Bong Bong White Grape (봉봉 240ml)", desc: "Real whole peeled grape pulp inside" },
      { id: "sac-sac", name: "Haitai Sac Sac Orange (쌕쌕 오렌지 240ml)", desc: "Tangy citrus juice with real mandarin pulp" }
    ]
  },
  {
    id: "sm-13",
    name: "Lotte Pepero Assorted Collection (롯데 빼빼로)",
    subname: "Original, Almond, Choco Cookie & White Cookie Sticks",
    category: "sweets",
    price: "Rs. 220",
    priceRaw: 220,
    badge: "POPULAR",
    spice: 0,
    calories: "250 kcal",
    pieces: "32g–47g Box",
    isVegetarian: true,
    image: "assets/images/lotte_pepero_collection.jpg",
    description: "Korea's iconic chocolate-dipped biscuit sticks. Available in crispy Almond, Cookies & Cream White Cookie, rich Choco Cookie, crunchy Crunky, and classic Milk Chocolate Original.",
    tags: ["Lotte", "Pepero", "Sweet Biscuit", "Imported Snack"],
    variants: [
      { id: "almond", name: "Almond Pepero (아몬드 빼빼로)", desc: "Crisp roasted almond pieces dipped in rich milk chocolate", badge: "POPULAR" },
      { id: "white-cookie", name: "White Cookie (화이트쿠키 빼빼로)", desc: "Cookies & cream white chocolate with dark cookie crumbles", badge: "BESTSELLER" },
      { id: "choco-cookie", name: "Choco Cookie (초코쿠키 빼빼로)", desc: "Dark chocolate cookie bits over luscious milk chocolate" },
      { id: "crunky", name: "Crunky Crunch (크런키 빼빼로)", desc: "Crispy malt puffs encased in sweet Korean chocolate" },
      { id: "original", name: "Original Milk Chocolate (오리지널 빼빼로)", desc: "Classic iconic red box milk chocolate biscuit sticks" }
    ]
  }
];

/**
 * Seoulmandu Special Offers & Promotional Deals
 * IMPORTANT: ONLY promotional offers, discounted mart items, and bundle deals
 * can be added here. Every item MUST provide offerPrice, originalPrice, discountLabel, and offer badge.
 */
window.SEOULMANDU_OFFERS = [
  {
    id: "offer-01",
    dishId: "sm-04",
    category: "🍜 Instant Noodles & Ramen",
    badge: "22% OFF • LIMITED DEAL",
    badgeType: "red",
    title: "Samyang Buldak & Shin Ramyun Pack",
    desc: "Special Mart Offer: Korea's champion instant ramyun pack bundled at an exclusive discount. 5-pack bundle featuring spicy Buldak and savory gourmet Shin Ramyun.",
    chips: ["🔥 Save Rs. 70 Today", "📦 5-Pack Multipack", "⚡ Ready in 3 mins"],
    offerPrice: 250,
    originalPrice: 320,
    discountLabel: "SAVE 22%",
    image: "assets/images/bestseller_ramen_collection.jpg",
    stockBadge: "🔥 22% OFF DEAL",
    tabLabel: "22% OFF Buldak"
  },
  {
    id: "offer-02",
    dishId: "sm-kimchi",
    category: "🥫 Sauces & Condiments",
    badge: "SAVE RS. 70 • HOUSE SPECIAL",
    badgeType: "gold",
    title: "Seoulmandu Authentic Kimchi (500g)",
    desc: "Promotional Mart Offer: Naturally fermented Napa cabbage infused with authentic Korean gochugaru, garlic, and ginger. Probiotic-rich house signature at special discount.",
    chips: ["🫙 500g Glass Jar", "🌱 Handcrafted Fresh", "🏷️ Save Rs. 70 Today"],
    offerPrice: 380,
    originalPrice: 450,
    discountLabel: "SAVE 16%",
    image: "assets/images/seoulmandu_signature_kimchi.jpg",
    stockBadge: "🏷️ SAVE RS. 70",
    tabLabel: "Kimchi Deal"
  },
  {
    id: "offer-03",
    dishId: "sm-01",
    category: "🥟 Frozen Foods & Dumplings",
    badge: "19% OFF • FAMILY DEAL",
    badgeType: "red",
    title: "Bibigo Wang Mandu (900g Family Pack)",
    desc: "Special Mart Offer: Korea's #1 frozen dumplings packed with juicy meat, garlic chives, and glass noodles. Pan-fry or steam to perfection at limited promotional value.",
    chips: ["🥟 900g Family Pack", "🍳 Crispy Pan-Fry / Steamed", "🏷️ Save Rs. 130"],
    offerPrice: 550,
    originalPrice: 680,
    discountLabel: "SAVE 19%",
    image: "assets/images/frozen_bibigo_dumplings.jpg",
    stockBadge: "⚡ SAVE RS. 130",
    tabLabel: "19% OFF Mandu"
  },
  {
    id: "offer-04",
    dishId: "sm-07",
    category: "🥤 Drinks & Beverages",
    badge: "COMBO OFFER • SAVE RS. 70",
    badgeType: "gold",
    title: "Authentic Korean Soju Collection",
    desc: "Special Drinks Bundle: Directly imported Korean bottles: smooth bamboo-filtered Chamisul Fresh (16.9% ABV), Jinro Original, and sweet Good Day Peach Soju on promotional discount.",
    chips: ["🍶 Chamisul & Jinro Original", "🍑 Peach Fruit Soju", "🏷️ Save Rs. 70 Bundle"],
    offerPrice: 450,
    originalPrice: 520,
    discountLabel: "SAVE 13%",
    image: "assets/images/bestseller_korean_drinks.jpg",
    stockBadge: "🎁 COMBO OFFER",
    tabLabel: "Soju Offer"
  }
];

// Featured Bestsellers for the Magazine Section
window.SEOULMANDU_FEATURED = [
  {
    id: "feat-01",
    tag: "BESTSELLER #01",
    badge: "ORIGINAL IMPORT",
    title: "Instant Noodles & Viral Korean Ramen",
    hangul: "한국 라면 (Korean Ramyun)",
    subtitle: "The soul of Korean convenience mart culture.",
    desc: "From world-famous spicy Shin Ramyun and fiery Samyang Buldak Hot Chicken to comforting Jin Ramen, packed with authentic Korean spices, savory broth, and bouncy noodles.",
    price: "Rs. 250",
    priceRaw: 250,
    prepTime: "3 mins",
    image: "assets/images/bestseller_ramen_collection.jpg",
    highlights: ["Fiery Buldak & Savory Shin", "Instant Hot Broth & Stir-Fry", "100% Authentic Korean Imports"]
  },
  {
    id: "feat-02",
    tag: "FROZEN FAVORITE",
    badge: "MUST TRY",
    title: "Bibigo Mandu & Frozen Delights",
    hangul: "비비고 만두 & 냉동식품",
    subtitle: "Authentic Wang Kyoza dumplings, chicken & corn dogs.",
    desc: "Authentic Wang Kyoza dumplings, Korean fried chicken, spicy tteokbokki, seafood pancakes, and crispy corn dogs ready to heat in an air fryer or pan.",
    price: "Rs. 650",
    priceRaw: 650,
    prepTime: "8 mins",
    image: "assets/images/bestseller_frozen_foods.jpg",
    highlights: ["Wang Kyoza dumplings", "Air-fryer ready chicken", "Crispy cheese corn dogs"]
  },
  {
    id: "feat-03",
    tag: "PANTRY STAPLE",
    badge: "CUSTOMER FAVORITE",
    title: "Premium Roasted Seaweed & Laver",
    hangul: "광천김 & 자반김",
    subtitle: "Pure roasted sesame oil crunch for snacking and rice bowls.",
    desc: "Gwangcheon roasted laver sheets, savory Bibigo seaweed snack packs, and seasoned seaweed flakes for warm rice bowls and noodles.",
    price: "Rs. 220",
    priceRaw: 220,
    prepTime: "Ready to eat",
    image: "assets/images/bestseller_roasted_seaweed.jpg",
    highlights: ["Toasted sesame oil", "Fine mineral sea salt", "Crispy snack sheets"]
  },
  {
    id: "feat-04",
    tag: "CHILLED DRINKS",
    badge: "POPULAR",
    title: "Authentic Korean Soju & Refreshers",
    hangul: "참이슬 & 좋은데이",
    subtitle: "Original Chamisul, Jinro & sweet peach fruit soju.",
    desc: "Directly imported Korean bottles: Chamisul Fresh, Chum-Churum, Jinro Original, and peach fruit soju to complement spicy noodles and snacks.",
    price: "Rs. 450",
    priceRaw: 450,
    prepTime: "Served cold",
    image: "assets/images/bestseller_korean_drinks.jpg",
    highlights: ["Chamisul & Jinro", "Peach fruit soju", "360ml imported bottles"]
  }
];

// Customer reviews
window.SEOULMANDU_REVIEWS = [
  {
    name: "Aarav Shrestha",
    handle: "@aarav_eats_drn",
    role: "Food Blogger",
    rating: 5,
    text: "Seoulmandu completely redefined Korean food in Dharan! The lace-skirt Gun-Mandu is easily the best dumpling experience in Nepal, the crunch is unreal, and the dipping sauce hits all the right notes.",
    dish: "Crispy Lace-Skirt Gun-Mandu",
    avatar: "AS"
  },
  {
    name: "Pooja Gurung",
    handle: "@poojagurung",
    role: "Regular Customer",
    rating: 5,
    text: "Finally, authentic Tteokbokki that doesn't hold back on flavor! The cheese pull is legendary and the ambiance makes you feel like you stepped into a chic Hongdae gastropub right here in Dharan.",
    dish: "Melted Cheese Tteokbokki",
    avatar: "PG"
  },
  {
    name: "Rohan Manandhar",
    handle: "@rohan_manandhar",
    role: "Culinary Enthusiast",
    rating: 5,
    text: "The steamed bamboo mandu took me right back to the alleyways of Myeongdong. Delicate, juicy, and so fresh. Can't stop ordering for our weekend studio lunches!",
    dish: "Classic Steamed Mandu",
    avatar: "RM"
  },
  {
    name: "Sneha Thapa",
    handle: "@sneha.explores",
    role: "Gen Z Creator",
    rating: 5,
    text: "The Yangnyeom fried chicken and strawberry ade are an absolute 10/10. Aesthetic packaging, fiery flavors, and such a vibrant energy. Seoulmandu is officially our go-to hangout spot.",
    dish: "Yangnyeom Fried Chicken",
    avatar: "ST"
  }
];

// Instagram Posts
window.SEOULMANDU_IG_POSTS = [
  {
    image: "assets/images/hero_mandu_steamer.jpg",
    caption: "Steam rising, appetites roaring. Fresh bamboo mandu baskets prepped for lunch rush. 🥟✨ #Seoulmandu #DharanFoodie",
    likes: "1,428",
    comments: "84",
    link: "https://www.instagram.com/seoulmandu.store"
  },
  {
    image: "assets/images/crispy_fried_mandu.jpg",
    caption: "The sound of that lace skirt crunch is music to our ears. Hear the snap? 🔥 #GunMandu #SeoulmanduDRN",
    likes: "2,190",
    comments: "132",
    link: "https://www.instagram.com/seoulmandu.store"
  },
  {
    image: "assets/images/cheese_tteokbokki.jpg",
    caption: "Pull it, twist it, savor it. When cheese meets fiery gochujang bliss. 🧀🌶️ #TteokbokkiCraving",
    likes: "3,042",
    comments: "215",
    link: "https://www.instagram.com/seoulmandu.store"
  },
  {
    image: "assets/images/korean_fried_chicken.jpg",
    caption: "Double crunch, sweet heat glaze. Perfect pairing with our ice cold Korean fruit ades. 🍗🥤 #KoreanFriedChicken",
    likes: "1,876",
    comments: "98",
    link: "https://www.instagram.com/seoulmandu.store"
  },
  {
    image: "assets/images/seoul_night.jpg",
    caption: "Seoul midnight energy, Dharan foothills soul. Bridging two food cultures one bite at a time. 🇰🇷🇳🇵",
    likes: "2,410",
    comments: "110",
    link: "https://www.instagram.com/seoulmandu.store"
  },
  {
    image: "assets/images/table_gathering.jpg",
    caption: "Korean food is meant to be shared. Bring the crew, order the spread, make memories. 🥢💛 #SeoulmanduFamily",
    likes: "1,650",
    comments: "72",
    link: "https://www.instagram.com/seoulmandu.store"
  }
];
