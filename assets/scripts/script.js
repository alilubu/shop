/* <!-------------------------------------|NEGRESS|-------------------------------------> */

let allProducts = [];
let visibleCount = 6;
let currentTab = "latest";
let itemsCount = 6;
let allProductLength = 0;
async function fetchProducts(tab) {
  if (tab === "latest") {
    try {
      const response = await fetch(
        `http://localhost:3000/products?_sort=-createDate&_page=0&_per_page=${itemsCount}`,
      );
      // if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      allProducts = data?.data || [];
      allProductLength = data?.items;

      renderProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
      document.getElementById("products").innerHTML =
        '<p class="text-center text-red-500">خطا در بارگذاری محصولات.</p>';
    }
  } else if (tab === "saleoff") {
    try {
      const response = await fetch(
        `http://localhost:3000/products?onOff:eq=true&_page=0&_per_page=${itemsCount}`,
      );
      // if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      allProducts = data?.data || [];

      allProductLength = data?.items;

      renderProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
      document.getElementById("products").innerHTML =
        '<p class="text-center text-red-500">خطا در بارگذاری محصولات.</p>';
    }
  } else if (tab === "bestsale") {
    try {
      const response = await fetch(
        `http://localhost:3000/products?_sort=-saleCount&_page=0&_per_page=${itemsCount}`,
      );
      // if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      allProducts = data?.data || [];
      allProductLength = data?.items;

      renderProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
      document.getElementById("products").innerHTML =
        '<p class="text-center text-red-500">خطا در بارگذاری محصولات.</p>';
    }
  }
}

function changeTabRender(tab) {
  fetchProducts(tab);
}

function mapProduct(p) {
  return {
    name: p.title,
    price: p.price,
    img: p.image,
    old: null,
    badge: null,
  };
}

function renderProducts() {
  const container = document.getElementById("products");

  if (allProducts.length === 0) {
    container.innerHTML =
      '<p class="text-center text-gray-500">محصولی در این دسته‌بندی یافت نشد.</p>';
    return;
  }

  container.innerHTML = allProducts
    .map((p) => {
      const mappedData = mapProduct(p);

      let badgeHTML = "";
      if (currentTab === "saleoff")
        badgeHTML =
          '<span class="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-1 rounded z-10">SALE</span>';
      if (currentTab === "latest")
        badgeHTML =
          '<span class="absolute top-2 left-2 bg-blue-500 text-white text-[10px] px-1 rounded z-10">NEW</span>';

      return `
        <a href="./assets/pages/productdetail.html?id=${p.id}">
        <div class="relative group cursor-pointer">
          ${badgeHTML}
          <div class="bg-gray-50 rounded-lg overflow-hidden mb-2 flex items-center justify-center h-36">
            <img src="${mappedData.img}" alt="${mappedData.name}" class="object-contain h-full w-full p-2 group-hover:scale-105 transition-transform duration-300"/>
          </div>
          <p class="text-xs font-semibold text-gray-700">${mappedData.name}</p>
          <div class="flex gap-2 items-center mt-1">
            <span class="text-sm font-bold text-gray-900">$${mappedData.price}.00</span>
            ${mappedData.old ? `<span class="text-xs text-gray-400 line-through">$${mappedData.old}.00</span>` : ""}
          </div>
        </div></a>
      `;
    })
    .join("");

  const btn = document.getElementById("load-more-btn");
  btn.addEventListener("click", () => {
    itemsCount += 6;
    fetchProducts(currentTab);
  });
  if (itemsCount > allProductLength) {
    btn.style.display = "none";
  } else {
    btn.style.display = "inline-block";
  }
}

function switchTab(tab) {
  currentTab = tab;
  itemsCount = 6;

  ["latest", "saleoff", "bestsale"].forEach((t) => {
    const btn = document.getElementById("tab-" + t);
    if (btn) {
      btn.classList.toggle("border-orange-500", t === tab);
      btn.classList.toggle("text-orange-500", t === tab);
      btn.classList.toggle("border-transparent", t !== tab);
      btn.classList.toggle("text-gray-500", t !== tab);
    }
  });

  changeTabRender(tab);
}

function loadMore() {
  visibleCount += 6;
  renderProducts();
}

//  Basket
document.addEventListener("DOMContentLoaded", () => {
  const cartModal = document.querySelector("#cart-modal");
  const cartItems = document.querySelector("#cart-items");
  const cartTotal = document.querySelector("#cart-total");
  const checkoutBtn = document.querySelector("#checkout-btn");

  const navIcons = document.querySelectorAll("nav span.cursor-pointer");
  const cartIcon = navIcons[1];
  const searchIcon = navIcons[0];

  cartIcon?.addEventListener("click", () => {
    cartModal.classList.toggle("hidden");
    renderCart();
  });

  searchIcon?.addEventListener("click", () => {
    cartModal.classList.add("hidden");
  });

  function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      total += item.itemPrice * item.itemCount;

      cartItems.innerHTML += `
                <div class="flex items-start gap-4 pb-4 border-b border-gray-100">
                    <img src="${item.itemImage}" class="w-20 h-20 object-cover border border-gray-100">
                    
                    <div class="flex-grow pt-1">
                        <h3 class="text-gray-700 text-sm leading-tight">${item.itemTitle}</h3>
                        <p class="font-bold text-gray-900 mt-2">$ ${item.itemPrice.toFixed(2)}</p>
                    </div>

                    <button class="remove-item text-gray-400 hover:text-black text-lg" data-id="${item.id}">
                        ×
                    </button>
                </div>
            `;
    });

    cartTotal.textContent = `$ ${total.toFixed(2)}`;

    // اتصال مجدد ایونت حذف
    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        removeItem(e.currentTarget.dataset.id),
      );
    });
  }

  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", loadMore);
  }

  function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter((item) => item.id != id);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
  }

  const closeCartBtn = document.querySelector("#close-cart");

  closeCartBtn?.addEventListener("click", () => {
    cartModal.classList.add("hidden");
  });

  checkoutBtn?.addEventListener("click", () => {
    window.location.href = "./assets/pages/cart.html";
  });

  renderCart();
});

// Amir hossein
const productListAdvertising = document.getElementById("SUGGEST-VIEWED");

async function getApiProductForAdvertising(filterName = "all") {
  if (filterName === "all") {
    const response = await fetch(
      `http://localhost:3000/products?_page=0&_per_page=10`,
    );
    const result = await response.json();
    let filteredProducts = result?.data;
    advertisingRenderCart(filteredProducts);
  } else {
    const response = await fetch(
      `http://localhost:3000/products?category=${filterName}&_page=0&_per_page=10`,
    );
    const result = await response.json();
    let filteredProducts = result?.data;
    advertisingRenderCart(filteredProducts);
  }
}

function advertisingRenderCart(data) {
  let finalHtml = "";

  // ۱. ریست کردن موقعیت اسلایدر با هر بار رندر جدید
  pos = 0;
  productListAdvertising.style.left = "0%";

  data.forEach((p) => {
    const saleLabel = p.onOff
      ? `
<div class="absolute top-0 right-0 overflow-hidden w-16 h-16 z-10">
<div class="bg-red-500 text-white text-[10px] font-bold uppercase text-center py-1 absolute top-2 -right-6 w-24 rotate-45">
Sale
</div>
</div>
`
      : "";

    finalHtml += `
<a href="./assets/pages/productdetail.html?id=${p.id}" class="block group w-[92%] sm:w-1/3 lg:w-1/5 flex-shrink-0 px-2">
<div class="relative flex flex-col items-center cursor-pointer w-full">
<div class="relative w-full aspect-square border border-gray-100 flex justify-center items-center overflow-hidden bg-white">
${saleLabel}
<img src="${p.image}" class="w-4/5 h-4/5 object-contain transition-transform duration-300 group-hover:scale-105">
</div>
<div class="text-center mt-4">
<h3 class="text-sm text-gray-700 line-clamp-1">${p.title}</h3>
<p class="font-bold text-black mt-1"><span>$</span> ${p.price}</p>
</div>
</div>
</a>
`;
  });

  productListAdvertising.innerHTML = finalHtml;
}

function changeFilter(category) {
  getApiProductForAdvertising(category);
}

document.addEventListener("DOMContentLoaded", () => {
  getApiProductForAdvertising();
});

const left = document.getElementById("advertising-slider-left");
const right = document.getElementById("advertising-slider-right");

// این متغیر باید بیرون باشد تا وضعیت حفظ شود
let pos = 0;

right.onclick = function () {
  // پیدا کردن تعداد کل کارت‌های رندر شده در لحظه
  const totalItems = productListAdvertising.children.length;

  // در دسکتاپ ما ۵ تا ۵ تا رد می‌کنیم.
  // اگر ۱۰ محصول داشته باشیم، فقط ۱ بار اجازه حرکت به راست داریم (limit = -100)
  // فرمول: (تعداد کل تقسیم بر ۵) منهای ۱، ضربدر ۱۰۰
  const limit = -(Math.ceil(totalItems / 5) - 1) * 100;

  if (pos > limit) {
    pos = pos - 100; // جابه‌جایی به اندازه یک صفحه کامل (۵ کارت)
    productListAdvertising.style.left = pos + "%";
  } else {
    // اختیاری: اگر به انتها رسید دوباره به اول برگردد
    pos = 0;
    productListAdvertising.style.left = pos + "%";
  }
};

left.onclick = function () {
  if (pos < 0) {
    pos = pos + 100; // برگشت به صفحه قبلی
    productListAdvertising.style.left = pos + "%";
  }
};

fetchProducts("latest");
