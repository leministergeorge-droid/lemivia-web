const bakeryDetails = {
  phoneDisplay: "0703230037",
  whatsappNumber: "255703230037",
  instagramHandle: "lemivia_bakery",
  address: "Kakola-Kahama",
};

const products = [
  {
    name: "Luxury Bites Box",
    image: "images/bites-box.jpg",
    text: "A jewel-like selection of mini treats, arranged for gifting, meetings, and elegant dessert tables.",
  },
  {
    name: "Golden Loaf Bread",
    image: "images/bread.jpg",
    text: "Soft, fragrant, and comforting, baked with a classic finish for breakfast, tea time, and family sharing.",
  },
  {
    name: "Celebration Cake",
    image: "images/cake.jpg",
    text: "A polished centerpiece with tender layers, graceful decoration, and a memorable celebratory taste.",
  },
  {
    name: "Chocolate Cake",
    image: "images/chocolate-cake.jpg",
    text: "Rich cocoa flavor with a refined finish, made for guests who love deep, luxurious sweetness.",
  },
  {
    name: "Signature Cookies",
    image: "images/cookies.jpg",
    text: "Golden, crisp-edged cookies with a soft bakery heart, perfect for thoughtful treats and daily indulgence.",
  },
  {
    name: "Premium Cupcakes",
    image: "images/cupcakes.jpg",
    text: "Pretty boxed cupcakes with smooth frosting and a party-ready look for birthdays, gifts, and events.",
  },
];

const productGrid = document.querySelector("[data-products]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector(".nav-links");

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card reveal">
          <img src="${product.image}" alt="${product.name}" />
          <div>
            <h3>${product.name}</h3>
            <p>${product.text}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function hydrateContactDetails() {
  const whatsappUrl = `https://wa.me/${bakeryDetails.whatsappNumber}?text=${encodeURIComponent(
    "Hello Lemivia Bakery, I would like to place an order."
  )}`;
  const instagramUrl = `https://www.instagram.com/${bakeryDetails.instagramHandle}/`;

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
  });

  document.querySelector("[data-instagram-link]").href = instagramUrl;
  document.querySelector("[data-contact-phone]").textContent = bakeryDetails.phoneDisplay;
  document.querySelector("[data-contact-instagram]").textContent = `@${bakeryDetails.instagramHandle}`;
  document.querySelector("[data-contact-address]").textContent = bakeryDetails.address;
  document.querySelector("[data-year]").textContent = new Date().getFullYear();
}

function setupMenu() {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("is-open"));
  });
}

function setupRevealAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
}

renderProducts();
hydrateContactDetails();
setupMenu();
setupRevealAnimation();
