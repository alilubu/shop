document.addEventListener("DOMContentLoaded", () => {

    const cartModal = document.querySelector("#cart-modal");
    const cartItems = document.querySelector("#cart-items");
    const cartTotal = document.querySelector("#cart-total");
    const checkoutBtn = document.querySelector("#checkout-btn");

    const fullCart = document.getElementById("full-cart-items");
    const clearBtn = document.getElementById("clear-cart");
    const orderBtn = document.getElementById("proceed-checkout");
    const updateBtn = document.getElementById("update-cart");

    const navIcons = document.querySelectorAll("nav span.cursor-pointer");

    // ================= CART ICON =================
    const searchIcon = navIcons[0];
    const cartIcon = navIcons[1];

    cartIcon?.addEventListener("click", () => {
        cartModal.classList.toggle("hidden");
        renderMiniCart();
    });

    searchIcon?.addEventListener("click", () => {
        cartModal.classList.add("hidden");
    });

    // ================= LOCAL STORAGE =================
    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // ================= MINI CART =================
    function renderMiniCart() {

        if (!cartItems) return;

        let cart = getCart();
        cartItems.innerHTML = "";

        let total = 0;

        cart.forEach(item => {
            total += item.itemPrice * item.itemCount;

            cartItems.innerHTML += `
                <div class="flex items-start gap-4 pb-4 border-b">
                    <img src="${item.itemImage}" class="w-20 h-20 object-cover border">

                    <div class="flex-grow pt-1">
                        <h3 class="text-sm">${item.itemTitle}</h3>
                        <p class="font-bold mt-2">$${item.itemPrice.toFixed(2)}</p>
                    </div>

                    <button class="remove-item text-xl" data-id="${item.id}">×</button>
                </div>
            `;
        });

        if (cartTotal) {
            cartTotal.textContent = `$${total.toFixed(2)}`;
        }

        document.querySelectorAll(".remove-item").forEach(btn => {
            btn.addEventListener("click", () => {
                removeItem(btn.dataset.id);
                renderMiniCart();
                renderFullCart();
            });
        });
    }

    // ================= FULL CART =================
    function renderFullCart() {

        if (!fullCart) return;

        let cart = getCart();
        fullCart.innerHTML = "";

        if (cart.length === 0) {
            fullCart.innerHTML = `<div class="p-8 text-center">Your Shopping Cart Is Empty</div>`;
            return;
        }

        cart.forEach(item => {
            fullCart.innerHTML += `
            <div class="grid grid-cols-[80px_1fr_140px_120px_140px_60px]
            items-center border-b text-sm">

    <!-- IMAGE -->
    <div class="p-3 flex justify-center">
        <div class="w-14 h-14 bg-gray-100 flex items-center justify-center border">
            <img src="${item.itemImage}" class="w-10 h-10 object-contain">
        </div>
    </div>

    <!-- NAME -->
    <div class="p-4 text-gray-700">
        ${item.itemTitle}
    </div>

    <!-- PRICE -->
    <div class="text-center text-gray-700">
        $${item.itemPrice.toFixed(2)}
    </div>

    <!-- QTY -->
    <div class="text-center">
        <input type="number"
            min="1"
            value="${item.itemCount}"
            data-id="${item.id}"
            class="qty-input w-14 border text-center py-1">
    </div>

    <!-- SUBTOTAL -->
    <div class="text-center font-medium">
        $${(item.itemPrice * item.itemCount).toFixed(2)}
    </div>

    <!-- REMOVE -->
    <div class="text-center">
        <button class="remove-item text-gray-400 hover:text-black text-xl"
            data-id="${item.id}">
            ×
        </button>
    </div>

</div>
`;
        });

        document.querySelectorAll(".remove-item").forEach(btn => {
            btn.addEventListener("click", () => {
                removeItem(btn.dataset.id);
                renderFullCart();
                renderMiniCart();
            });
        });
    }

    // ================= REMOVE =================
    function removeItem(id) {
        let cart = getCart();
        cart = cart.filter(i => i.id != id);
        saveCart(cart);
    }

    // ================= UPDATE CART =================
    updateBtn?.addEventListener("click", () => {

        let cart = getCart();

        document.querySelectorAll(".qty-input").forEach(input => {
            let item = cart.find(i => i.id == input.dataset.id);
            if (item) {
                item.itemCount = Math.max(1, parseInt(input.value) || 1);
            }
        });

        saveCart(cart);

        renderFullCart();
        renderMiniCart();

        alert("Cart updated!");
    });

    // ================= CLEAR CART (API READY) =================
    clearBtn?.addEventListener("click", async () => {

        // TODO: API CALL (mock)
        // await fetch("/api/clear-cart")

        saveCart([]);
        renderFullCart();
        renderMiniCart();

        alert("Cart cleared!");
    });

    // ================= CHECKOUT =================
    orderBtn?.addEventListener("click", () => {

        let cart = getCart();

        if (cart.length === 0) {
            alert("Cart is empty!");
            return;
        }

        // simulate order success
        saveCart([]);

        renderFullCart();
        renderMiniCart();

        alert("Order successful!");

        window.location.href = "../../index.html";
    });

    // ================= MINI CHECKOUT BUTTON =================
    checkoutBtn?.addEventListener("click", () => {
        window.location.href = "./cart.html";
    });

    // ================= WISHLIST (NEW) =================
    function toggleWishlist(product) {

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        const exists = wishlist.find(i => i.id === product.id);

        if (exists) {
            wishlist = wishlist.filter(i => i.id != product.id);
        } else {
            wishlist.push(product);
        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    // ================= INIT =================
    renderMiniCart();
    renderFullCart();
});