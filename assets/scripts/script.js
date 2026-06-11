/* <!-------------------------------------|NEGRESS|-------------------------------------> */


let allProducts = [];
let visibleCount = 6;
let currentTab = 'latest';
let itemsCount = 6
let allProductLength = 0
async function fetchProducts(tab) {
    if (tab === "latest") {
        try {

     const response = await fetch(`http://localhost:3000/products?_sort=-createDate&_page=0&_per_page=${itemsCount}`)
            // if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();


            allProducts = data?.data || [];
            allProductLength = data?.items


            renderProducts();
        } catch (error) {
            console.error('Error fetching products:', error);
            document.getElementById('products').innerHTML = '<p class="text-center text-red-500">خطا در بارگذاری محصولات.</p>';
        }
    } else if (tab === "saleoff") {
        try {

     const response = await fetch(`http://localhost:3000/products?onOff:eq=true&_page=0&_per_page=${itemsCount}`)
            // if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();


            allProducts = data?.data || [];

            allProductLength = data?.items

            renderProducts();
        } catch (error) {
            console.error('Error fetching products:', error);
            document.getElementById('products').innerHTML = '<p class="text-center text-red-500">خطا در بارگذاری محصولات.</p>';
        }

    } else if (tab === "bestsale") {
        try {

    const response = await fetch(`http://localhost:3000/products?_sort=-saleCount&_page=0&_per_page=${itemsCount}`)
            // if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();


            allProducts = data?.data || [];
            allProductLength = data?.items


            renderProducts();
        } catch (error) {
            console.error('Error fetching products:', error);
            document.getElementById('products').innerHTML = '<p class="text-center text-red-500">خطا در بارگذاری محصولات.</p>';
        }
    }
}

function changeTabRender(tab) {

    fetchProducts(tab)
}

function mapProduct(p) {
    return {
        name: p.title,
        price: p.price,
        img: p.image,
        old: null,
        badge: null
    };
}


function renderProducts() {

    const container = document.getElementById('products');


    if (allProducts.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">محصولی در این دسته‌بندی یافت نشد.</p>';
        return;
    }

    container.innerHTML = allProducts.map(p => {
        const mappedData = mapProduct(p);


        let badgeHTML = '';
        if (currentTab === 'saleoff') badgeHTML = '<span class="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-1 rounded z-10">SALE</span>';
        if (currentTab === 'latest') badgeHTML = '<span class="absolute top-2 left-2 bg-blue-500 text-white text-[10px] px-1 rounded z-10">NEW</span>';

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
            ${mappedData.old ? `<span class="text-xs text-gray-400 line-through">$${mappedData.old}.00</span>` : ''}
          </div>
        </div></a>
      `;
    }).join('');


    const btn = document.getElementById('load-more-btn');
    btn.addEventListener("click", () => {
        itemsCount += 6
        fetchProducts(currentTab)
    })
    if (itemsCount > allProductLength) {
        btn.style.display = 'none';
    } else {
        btn.style.display = 'inline-block';
    }

}

function switchTab(tab) {
    currentTab = tab;
    itemsCount = 6;


    ['latest', 'saleoff', 'bestsale'].forEach(t => {
        const btn = document.getElementById('tab-' + t);
        if (btn) {
            btn.classList.toggle('border-orange-500', t === tab);
            btn.classList.toggle('text-orange-500', t === tab);
            btn.classList.toggle('border-transparent', t !== tab);
            btn.classList.toggle('text-gray-500', t !== tab);
        }
    });

    changeTabRender(tab);

}


function loadMore() {
    visibleCount += 6;
    renderProducts();
}

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

        cart.forEach(item => {
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
        document.querySelectorAll(".remove-item").forEach(btn => {
            btn.addEventListener("click", (e) => removeItem(e.currentTarget.dataset.id));
        });
    }

const loadMoreBtn = document.getElementById('load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMore);
}

fetchProducts("latest");

    function removeItem(id) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart = cart.filter(item => item.id != id);

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

