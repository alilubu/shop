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
    // let listToDisplay = [];

    // if (currentTab === 'latest') {

    //     listToDisplay = allProducts.slice(-6); 
    // } else if (currentTab === 'saleoff') {

    //     listToDisplay = allProducts.filter(p => p.price < 200);
    // } else if (currentTab === 'bestsale') {

    //     listToDisplay = [...allProducts]
    //         .sort((a, b) => b.saleCount - a.saleCount)
    //         .slice(0, 3);
    // } else {

    //     listToDisplay = allProducts;
    // }


    // const itemsToShow = listToDisplay.slice(0, visibleCount);

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
        </div>
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


const loadMoreBtn = document.getElementById('load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMore);
}

fetchProducts("latest");