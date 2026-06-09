/* <!-------------------------------------|NARGESS|-------------------------------------> */
 // 1. product list
    const products = {
      latest: [
        { name: "Modular Modern", price: 540, old: 599, img: "https://fama.ir/wp-content/uploads/2021/12/Chair-Numa-Back-Textile-1.webp", badge: "new" },
        { name: "Modular Modern", price: 540, img: "https://fama.ir/wp-content/uploads/2024/10/IMG_2116-600x720.webp", badge: "sale" },
        { name: "Modular Modern", price: 540, img: "https://fama.ir/wp-content/uploads/2024/10/IMG_2110-600x721.webp" },
        { name: "Modular Modern", price: 540, img: "https://fama.ir/wp-content/uploads/2021/12/Linda-5-600x721.webp" },
        { name: "Modular Modern", price: 540, img: "https://fama.ir/wp-content/uploads/2024/11/mirror.webp" },
        { name: "Modular Modern", price: 540, old: 599, img: "https://fama.ir/wp-content/uploads/2025/05/armada-console.webp" },
        { name: "Modular Modern", price: 540, img: "https://fama.ir/wp-content/uploads/2024/10/IMG_2103.webp", badge: "new" },
        { name: "Modular Modern", price: 540, img: "https://fama.ir/wp-content/uploads/2023/01/Bench-1.webp" },
        { name: "Modular Modern", price: 540, img: "https://fama.ir/wp-content/uploads/2024/10/IMG_6923-1.webp" },
        { name: "Modular Modern", price: 540, img: "https://fama.ir/wp-content/uploads/2021/12/Bench-Pooneh-1.webp" },
      ],
      saleoff: [
        { name: "Sale Item", price: 399, old: 599, img: "https://fama.ir/wp-content/uploads/2024/01/roza-counter-1.webp", badge: "sale" },
        { name: "Sale Chair", price: 199, old: 350, img: "https://fama.ir/wp-content/uploads/2021/12/Bench-Orkideh-Back-Wood-1.webp", badge: "sale" },
        { name: "Sale Sofa", price: 499, old: 700, img: "https://fama.ir/wp-content/uploads/2021/12/orkideh-21-11-300x361.webp", badge: "sale" },
      ],
      bestsale: [
        { name: "Best Seller", price: 620, img: "https://fama.ir/wp-content/uploads/2021/12/Chair-Orkideh-1.webp" },
        { name: "Top Pick", price: 480, img: "https://fama.ir/wp-content/uploads/2021/12/Elena-10-1-1.webp" },
        { name: "Popular", price: 390, img: "https://fama.ir/wp-content/uploads/2023/01/01-7-1.webp" },
      ]
    };

    // تعداد نمایش فعلی (پیش‌فرض ۶)
  
    let visibleCount = 6;
    let currentTab = 'latest';

//function of showing product
    function renderProducts() {
      const list = products[currentTab];

      // “We only take the specified amount from the list.”
      const itemsToShow = list.slice(0, visibleCount);

      const container = document.getElementById('products');
      container.innerHTML = itemsToShow.map(p => `
        <div class="relative group cursor-pointer">
          ${p.badge === 'new' ? '<span class="absolute top-2 left-2 bg-blue-500 text-white text-[10px] px-1 rounded z-10">NEW</span>' : ''}
          ${p.badge === 'sale' ? '<span class="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-1 rounded z-10">SALE</span>' : ''}
          <div class="bg-gray-50 rounded-lg overflow-hidden mb-2 flex items-center justify-center h-36">
            <img src="${p.img}" alt="${p.name}" class="object-contain h-full w-full p-2 group-hover:scale-105 transition-transform duration-300"/>
          </div>
          <p class="text-xs font-semibold text-gray-700">${p.name}</p>
          <div class="flex gap-2 items-center mt-1">
            <span class="text-sm font-bold text-gray-900">$${p.price}.00</span>
            ${p.old ? `<span class="text-xs text-gray-400 line-through">$${p.old}.00</span>` : ''}
          </div>
        </div>
      `).join('');

//“Hide the button if all items are displayed.”      
      const btn = document.getElementById('load-more-btn');
      if (visibleCount >= list.length) {
        btn.style.display = 'none';
      } else {
        btn.style.display = 'inline-block';
      }
    }

    // “Function to change tabs”
    function switchTab(tab) {
      currentTab = tab;
      visibleCount = 6; // ریست کردن تعداد نمایش برای تب جدید  “Reset display count for the new tab.”
      
      ['latest', 'saleoff', 'bestsale'].forEach(t => {
        const btn = document.getElementById('tab-' + t);
        btn.classList.toggle('border-orange-500', t === tab);
        btn.classList.toggle('text-orange-500', t === tab);
        btn.classList.toggle('border-transparent', t !== tab);
        btn.classList.toggle('text-gray-500', t !== tab);
      });
      renderProducts();
    }

    // load More nfunction
    function loadMore() {
      visibleCount += 6;
      renderProducts();
    }

    // اتصال رویداد به دکمه (دقیقاً با ID)  Bind the event to the button by ID.”
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMore);
    }

    //Run setup
    renderProducts();

/* <!-------------------------------------|AMIR HOSIAN|------------------------------------->*/

/* <!-------------------------------------|ALI REZA|-------------------------------------> */

/* <!-------------------------------------|FARZANE|-------------------------------------> */

/* <!-------------------------------------|PARSA|-------------------------------------> */



