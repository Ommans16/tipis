(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const productGrid = document.querySelector("[data-product-grid]");
  const categoryButtons = [...document.querySelectorAll("[data-category]")];
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navLinks = document.querySelector("#nav-links");
  const cartDrawer = document.querySelector("[data-cart-drawer]");
  const cartOverlay = document.querySelector("[data-cart-overlay]");
  const cartItems = document.querySelector("[data-cart-items]");
  const cartEmpty = document.querySelector("[data-cart-empty]");
  const cartFooter = document.querySelector("[data-cart-footer]");
  const orderPopup = document.querySelector("[data-order-popup]");
  const cartCount = document.querySelector("[data-cart-count]");
  const cartTotal = document.querySelector("[data-cart-total]");
  const toast = document.querySelector("[data-toast]");

  const img = file => `images/${file}.jpeg`;

  const info = {
    totebag: { price: 80000, id: "Totebag preloved, kondisi masih bagus dan siap dipakai harian.", en: "Preloved tote bag in good condition, ready for everyday use." },
    polo: { price: 180000, id: "Polo preloved, bahan nyaman dan kondisi masih mulus.", en: "Preloved polo shirt, comfy fabric in great condition." },
    flanel: { price: 150000, id: "Kemeja flanel preloved, hangat dan gampang dipadu padan.", en: "Preloved flannel shirt, warm and easy to style." },
    denimBiru: { price: 250000, id: "Jaket denim biru preloved, kondisi masih bagus.", en: "Preloved blue denim jacket in good condition." },
    denimHitam: { price: 250000, id: "Jaket denim hitam preloved, kondisi masih bagus.", en: "Preloved black denim jacket in good condition." }
  };

  const item = (id, category, infoKey, nameId, nameEn, files) => ({
    id, category,
    name: { id: nameId, en: nameEn },
    description: { id: info[infoKey].id, en: info[infoKey].en },
    price: info[infoKey].price,
    badge: null,
    images: files.map(img)
  });

  // Satu objek = satu produk. Foto pertama jadi cover, sisanya bisa digeser lewat titik di kartu.
  const products = [
    item(1, "totebag", "totebag", "Totebag 1", "Tote Bag 1", ["totebag1"]),
    item(2, "totebag", "totebag", "Totebag 2", "Tote Bag 2", ["totebag2", "totebag22"]),
    item(3, "totebag", "totebag", "Totebag 3", "Tote Bag 3", ["totebag3", "totebag33"]),
    item(4, "totebag", "totebag", "Totebag 4", "Tote Bag 4", ["totebag4"]),
    item(5, "polo", "polo", "Polo 1", "Polo 1", ["polo1", "polo11", "polo111"]),
    item(6, "polo", "polo", "Polo 2", "Polo 2", ["polo2"]),
    item(7, "polo", "polo", "Polo 3", "Polo 3", ["polo3"]),
    item(8, "flanel", "flanel", "Kemeja Flanel", "Flannel Shirt", ["flanel1", "flanel11"]),
    item(9, "denim", "denimBiru", "Jaket Denim Biru 1", "Blue Denim Jacket 1", ["denimblue1"]),
    item(10, "denim", "denimBiru", "Jaket Denim Biru 2", "Blue Denim Jacket 2", ["denimblue2"]),
    item(11, "denim", "denimBiru", "Jaket Denim Biru 3", "Blue Denim Jacket 3", ["denimblue3"]),
    item(12, "denim", "denimBiru", "Jaket Denim Biru 4", "Blue Denim Jacket 4", ["denimblue4"]),
    item(13, "denim", "denimHitam", "Jaket Denim Hitam 1", "Black Denim Jacket 1", ["denimhitam1"]),
    item(14, "denim", "denimHitam", "Jaket Denim Hitam 2", "Black Denim Jacket 2", ["denimhitam2"])
  ];

  const translations = {
    id: {
      skip: "Lewati ke konten utama", navHome: "Beranda", navMenu: "Koleksi", navAbout: "Tentang Kami", navContact: "Kontak",
      heroEyebrow: "Barang Second, rasa butik dompet aman OOTD tetap ganteng/cantik maksimal", heroTitle: 'Kalau Rejeki<br><span>Gak Kemana</span>',
      heroDescription: "Kenapa harus beli barang baru harga mahal kalau yang preloved kondisinya masih 95% mulus gini",
      exploreMenu: "Lihat Koleksi", ourStory: "Cerita Kami", reviewText: "Disukai pecinta thrifting", noteTopTitle: "Preloved pilihan", noteTopText: "Dikurasi satu per satu", noteBottomTitle: "Mulai dari", noteBottomText: "Totebag preloved", heroCaption: "Bukan sekadar baju bekas. Ini gayamu.", scrollHint: "Gulir untuk menemukan favoritmu",
      menuKicker: "PRELOVED PILIHAN", menuTitle: 'Temukan<br><span>harta karunmu.</span>', menuIntro: "Bukan sekedar baju bekas ini namanya treasure hunting (berburu harta karun), edisi hemat.",
      catAll: "Semua", catTotebag: "Totebag", catPolo: "Polo", catFlanel: "Flanel", catDenim: "Jaket Denim", menuNote: "Preloved, stok terbatas. Harga dalam Rupiah.", visitUs: "Kunjungi kami",
      aboutKicker: "SEDIKIT TENTANG KAMI", aboutTitle: 'Gaya bebas,<br>dompet <span>tetap aman.</span>', aboutParagraphOne: "Setiap helai pakaian punya cerita dan karakternya sendiri. Temukan signature stylemu disini.", aboutParagraphTwo: "Pelan - Pelan tapi pasti kurangi limbah tekstil sambil tetap kece dengan fashion berkelanjutan", craftedWithCare: "Dipilih dengan teliti", since: "Preloved pilihan · Satu per satu", statCondition: "Kondisi mulus", customerRating: "Rating pelanggan", statCurated: "Dikurasi", findOurSpace: "Temukan toko kami",
      contactKicker: "MAMPIR KAPAN SAJA", contactTitle: 'Mampir dulu,<br><span>siapa tau cocok.</span>', contactIntro: "Punya pertanyaan soal stok, ukuran, atau ingin mampir? Kami siap bantu.", addressLabel: "ALAMAT", addressTitle: "Jalan Bengawan", openMaps: "Buka peta", sayHello: "SAPA KAMI", contactTitleCard: "Tanya stok & ukuran", sendEmail: "Chat WhatsApp", demoNote: "Kunjungi Gangtembus.inc di Banyuwangi atau hubungi kami melalui WhatsApp.",
      footerDescription: "Thrift pilihan dengan harga bersahabat. Tampil kece tanpa bikin dompet menjerit.", quickLinks: "Tautan", followUs: "Ikuti kami", newsletterTitle: "A little note from us.", newsletterText: "Update koleksi dan cerita kecil dari Gangtembus.inc.", emailLabel: "Alamat email", emailPlaceholder: "Email kamu", joinButton: "Gabung ↗", newsletterDemo: "Demo front-end — tidak menyimpan email.", rights: "Hak cipta dilindungi.", backTop: "Kembali ke atas",
      yourOrder: "PESANANMU", cartTitle: "Your bag", emptyCartTitle: "Keranjang masih kosong", emptyCartText: "Pilih item favoritmu dan mulai pesanan pertama.", browseMenu: "Lihat koleksi", subtotal: "Subtotal", cartDisclaimer: "Periksa pesananmu, lalu tekan Pesan Sekarang.", checkoutDemo: "Pesan Sekarang",
      added: "ditambahkan ke keranjang", removed: "Produk dihapus dari keranjang.", emptyNotice: "Keranjang masih kosong.", checkoutNotice: "Pesanan akan dilanjutkan melalui WhatsApp Gangtembus.inc.", newsletterNotice: "Terima kasih! Form ini hanya demo dan tidak menyimpan email.", category: { totebag: "Totebag", polo: "Polo", flanel: "Flanel", denim: "Jaket Denim" }, addLabel: "Tambah", decrease: "Kurangi jumlah", increase: "Tambah jumlah", remove: "Hapus item", photoLabel: "Lihat foto"
    },
    en: {
      skip: "Skip to main content", navHome: "Home", navMenu: "Collection", navAbout: "About", navContact: "Contact",
      heroEyebrow: "Secondhand finds, boutique feel, wallet-friendly", heroTitle: "If Fortune <br><span>Doesn't Go Anywhere</span>",
      heroDescription: "Why pay full price for brand new when preloved pieces are still 95% flawless?",
      exploreMenu: "Browse Collection", ourStory: "Our Story", reviewText: "Loved by thrift fans", noteTopTitle: "Curated preloved", noteTopText: "Picked one by one", noteBottomTitle: "Starting at", noteBottomText: "Preloved tote bag", heroCaption: "Not just used clothes. It's your style.", scrollHint: "Scroll to find your new favorite",
      menuKicker: "CURATED PRELOVED", menuTitle: 'Find your<br><span>hidden gem.</span>', menuIntro: "It's not just secondhand clothing. It's treasure hunting, budget edition.",
      catAll: "All Items", catTotebag: "Tote Bag", catPolo: "Polo", catFlanel: "Flannel", catDenim: "Denim Jacket", menuNote: "Preloved, limited stock. Prices in Indonesian Rupiah.", visitUs: "Visit us",
      aboutKicker: "A LITTLE ABOUT US", aboutTitle: 'Free style,<br>wallet <span>still safe.</span>', aboutParagraphOne: "Every piece of clothing has its own story and character. Find your signature style here.", aboutParagraphTwo: "Slowly but surely, we help cut textile waste while staying stylish with sustainable fashion.", craftedWithCare: "Carefully selected", since: "Curated preloved · One by one", statCondition: "Great condition", customerRating: "Customer rating", statCurated: "Curated", findOurSpace: "Find our store",
      contactKicker: "DROP BY ANYTIME", contactTitle: 'Come by,<br><span>you might find a match.</span>', contactIntro: "Questions about stock or sizes, or planning a visit? We're happy to help.", addressLabel: "OUR ADDRESS", addressTitle: "Jalan Bengawan", openMaps: "Open map", sayHello: "SAY HELLO", contactTitleCard: "Ask about stock & sizes", sendEmail: "Chat on WhatsApp", demoNote: "Visit Gangtembus.inc in Banyuwangi or reach us on WhatsApp.",
      footerDescription: "Curated thrift at friendly prices. Look great without breaking the bank.", quickLinks: "Quick links", followUs: "Follow us", newsletterTitle: "A little note from us.", newsletterText: "Collection updates and little stories from Gangtembus.inc.", emailLabel: "Email address", emailPlaceholder: "Your email", joinButton: "Join ↗", newsletterDemo: "Front-end demo — email is not stored.", rights: "All rights reserved.", backTop: "Back to top",
      yourOrder: "YOUR ORDER", cartTitle: "Your bag", emptyCartTitle: "Your bag is empty", emptyCartText: "Pick a favorite piece to start your first order.", browseMenu: "Browse collection", subtotal: "Subtotal", cartDisclaimer: "Review your items, then select Order Now.", checkoutDemo: "Order Now",
      added: "added to your bag", removed: "Item removed from your bag.", emptyNotice: "Your bag is empty.", checkoutNotice: "Your order will continue on Gangtembus.inc's WhatsApp.", newsletterNotice: "Thank you! This demo form does not store your email.", category: { totebag: "Tote Bag", polo: "Polo", flanel: "Flannel", denim: "Denim Jacket" }, addLabel: "Add", decrease: "Decrease quantity", increase: "Increase quantity", remove: "Remove item", photoLabel: "View photo"
    }
  };

  let language = root.dataset.language === "en" ? "en" : "id";
  let activeCategory = "all";
  let cart = new Map();
  let toastTimer;

  const money = value => new Intl.NumberFormat(language === "id" ? "id-ID" : "en-US", {
    style: "currency", currency: "IDR", maximumFractionDigits: 0
  }).format(value).replace(/\s/g, "");

  const t = key => translations[language][key] ?? key;
  const productName = product => product.name[language];
  const productDescription = product => product.description[language];
  const categoryName = category => translations[language].category[category] || category;

  function renderProducts() {
    const filtered = activeCategory === "all" ? products : products.filter(p => p.category === activeCategory);
    productGrid.innerHTML = filtered.map(product => `
      <article class="product-card">
        <div class="product-image-wrap">
          <img class="product-image" src="${product.images[0]}" alt="${productName(product)}" loading="lazy">
          ${product.badge ? `<span class="product-badge">${product.badge[language]}</span>` : ""}
          ${product.images.length > 1 ? `<div class="product-dots">${product.images.map((_, i) => `<button class="product-dot${i === 0 ? " is-active" : ""}" type="button" data-photo="${i}" data-photo-product="${product.id}" aria-label="${t("photoLabel")} ${i + 1}"></button>`).join("")}</div>` : ""}
        </div>
        <div class="product-info">
          <span class="product-category">${categoryName(product.category)}</span>
          <h3 class="product-name">${productName(product)}</h3>
          <p class="product-description">${productDescription(product)}</p>
          <div class="product-bottom">
            <strong class="product-price">${money(product.price)}</strong>
            <button class="add-button" type="button" data-add-product="${product.id}" aria-label="${t("addLabel")} ${productName(product)}" title="${t("addLabel")}">+</button>
          </div>
        </div>
      </article>`).join("");
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const value = t(el.dataset.i18n);
      if (value !== undefined) el.textContent = value;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      const value = t(el.dataset.i18nHtml);
      if (value !== undefined) el.innerHTML = value;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-language-label]").forEach(el => el.textContent = language.toUpperCase());
    document.querySelector("[data-language-toggle]")?.setAttribute("aria-label", language === "id" ? "Switch language to English" : "Ganti bahasa ke Indonesia");
    document.querySelectorAll("[data-category]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.category === activeCategory));
      button.classList.toggle("is-selected", button.dataset.category === activeCategory);
    });
    root.dataset.language = language;
    document.documentElement.lang = language;
    renderProducts();
    renderCart();
  }

  function setLanguage(next) {
    language = next;
    try { localStorage.setItem("gangtembus-language", language); } catch (_) {}
    applyTranslations();
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    document.querySelectorAll("[data-theme-toggle]").forEach(button => button.setAttribute("aria-pressed", String(theme === "dark")));
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#101010" : "#fbfaf2");
    try { localStorage.setItem("gangtembus-theme", theme); } catch (_) {}
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  function renderCart() {
    const entries = [...cart.entries()];
    const count = entries.reduce((sum, [, qty]) => sum + qty, 0);
    const total = entries.reduce((sum, [id, qty]) => sum + products.find(p => p.id === id).price * qty, 0);
    cartCount.textContent = count;
    cartCount.setAttribute("aria-label", `${count} items`);
    cartTotal.textContent = money(total);
    cartEmpty.hidden = count > 0;
    cartFooter.hidden = count === 0;
    if (orderPopup) orderPopup.hidden = count === 0;
    cartItems.innerHTML = entries.map(([id, qty]) => {
      const product = products.find(p => p.id === id);
      return `<article class="cart-item">
        <img src="${product.images[0]}" alt="" loading="lazy">
        <div>
          <h3>${productName(product)}</h3>
          <p class="cart-item-price">${money(product.price)}</p>
          <div class="quantity-control">
            <button type="button" data-quantity="${id}" data-change="-1" aria-label="${t("decrease")} ${productName(product)}">−</button>
            <span>${qty}</span>
            <button type="button" data-quantity="${id}" data-change="1" aria-label="${t("increase")} ${productName(product)}">+</button>
          </div>
        </div>
        <strong class="cart-item-total">${money(product.price * qty)}</strong>
      </article>`;
    }).join("");
  }

  function addToCart(id) {
    cart.set(id, (cart.get(id) || 0) + 1);
    renderCart();
    const product = products.find(p => p.id === id);
    showToast(`${productName(product)} ${t("added")}`);
  }

  function changeQuantity(id, change) {
    const next = (cart.get(id) || 0) + change;
    if (next <= 0) {
      cart.delete(id);
      showToast(t("removed"));
    } else {
      cart.set(id, next);
    }
    renderCart();
  }

  function openCart() {
    cartDrawer.classList.add("is-open");
    cartDrawer.setAttribute("aria-hidden", "false");
    cartOverlay.hidden = false;
    body.classList.add("cart-open");
    document.querySelector("[data-cart-close]").focus();
  }

  function closeCart() {
    cartDrawer.classList.remove("is-open");
    cartDrawer.setAttribute("aria-hidden", "true");
    cartOverlay.hidden = true;
    body.classList.remove("cart-open");
  }

  function closeMobileMenu() {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", language === "id" ? "Buka menu navigasi" : "Open navigation menu");
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(button => {
    button.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));
  });
  document.querySelectorAll("[data-language-toggle]").forEach(button => {
    button.addEventListener("click", () => setLanguage(language === "id" ? "en" : "id"));
  });

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? (language === "id" ? "Tutup menu navigasi" : "Close navigation menu") : (language === "id" ? "Buka menu navigasi" : "Open navigation menu"));
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMobileMenu));
  window.addEventListener("resize", () => { if (window.innerWidth > 900) closeMobileMenu(); });

  categoryButtons.forEach(button => button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    categoryButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    renderProducts();
  }));

  productGrid.addEventListener("click", event => {
    const dot = event.target.closest("[data-photo]");
    if (dot) {
      const product = products.find(p => p.id === Number(dot.dataset.photoProduct));
      const wrap = dot.closest(".product-image-wrap");
      wrap.querySelector(".product-image").src = product.images[Number(dot.dataset.photo)];
      wrap.querySelectorAll(".product-dot").forEach(d => d.classList.toggle("is-active", d === dot));
      return;
    }
    const button = event.target.closest("[data-add-product]");
    if (button) addToCart(Number(button.dataset.addProduct));
  });
  cartItems.addEventListener("click", event => {
    const button = event.target.closest("[data-quantity]");
    if (button) changeQuantity(Number(button.dataset.quantity), Number(button.dataset.change));
  });
  document.querySelectorAll("[data-cart-open]").forEach(button => button.addEventListener("click", openCart));
  document.querySelectorAll("[data-cart-close]").forEach(button => button.addEventListener("click", closeCart));
  cartOverlay.addEventListener("click", closeCart);
  document.querySelector("[data-cart-browse]").addEventListener("click", () => {
    closeCart();
    document.querySelector("#menu").scrollIntoView({ behavior: "smooth" });
  });
  document.querySelector("[data-checkout]").addEventListener("click", () => {
    const entries = [...cart.entries()];
    if (!entries.length) {
      renderCart();
      showToast(language === "id" ? "Keranjang masih kosong." : "Your cart is empty.");
      return;
    }
    const lines = entries.map(([id, qty]) => {
      const product = products.find(item => item.id === id);
      return `- ${productName(product)} x${qty} = ${money(product.price * qty)}`;
    });
    const total = entries.reduce((sum, [id, qty]) => sum + products.find(item => item.id === id).price * qty, 0);
    const message = [
      language === "id" ? "Halo Gangtembus.inc, saya mau pesan:" : "Hello Gangtembus.inc, I'd like to order:",
      "",
      ...lines,
      "",
      `${language === "id" ? "Total" : "Total"}: ${money(total)}`,
      "",
      "Kalau Rejeki Gak Kemana 🛍️"
    ].join("\n");
    const whatsappUrl = `https://wa.me/6285156407091?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
  document.addEventListener("keydown", event => { if (event.key === "Escape") { closeCart(); closeMobileMenu(); } });

  document.querySelector("[data-newsletter-form]").addEventListener("submit", event => {
    event.preventDefault();
    event.currentTarget.reset();
    showToast(t("newsletterNotice"));
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (link.getAttribute("href") === "#menu") closeMobileMenu();
    });
  });

  const sections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".nav-link").forEach(link => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => observer.observe(section));
  }


  // Slideshow foto fashion di hero (ganti tiap 4 detik)
  const heroSlides = [...document.querySelectorAll("[data-hero-slide]")];
  const heroCounter = document.querySelector("[data-hero-counter]");
  const HERO_INTERVAL = 5000;
  let heroIndex = 0;

  function showHeroSlide(index) {
    heroIndex = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, i) => slide.classList.toggle("is-active", i === heroIndex));
    if (heroCounter) heroCounter.textContent = `${String(heroIndex + 1).padStart(2, "0")} / ${String(heroSlides.length).padStart(2, "0")}`;
  }

  if (heroSlides.length > 1) {
    let heroTimer = setInterval(() => showHeroSlide(heroIndex + 1), HERO_INTERVAL);
    document.addEventListener("visibilitychange", () => {
      clearInterval(heroTimer);
      if (!document.hidden) heroTimer = setInterval(() => showHeroSlide(heroIndex + 1), HERO_INTERVAL);
    });
  }

  document.querySelector("[data-current-year]").textContent = new Date().getFullYear();
  setTheme(root.dataset.theme === "light" ? "light" : "dark");
  applyTranslations();
})();