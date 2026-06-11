const detailsPage = document.querySelector("#details--page");

// rating stars coloring
async function displayRatingStars(clickedCartId) {
    const filledColor = 'gold';
    const emptyColor = '#ccc';
    const response = await fetch(`http://localhost:3000/products/${clickedCartId}`);
    const productData = await response.json();
    const rate = productData.rate;
    for (let i = 1; i <= 5; i++) {
        const starElement = document.getElementById(`star${i}`);
        if (starElement) {
            if (i <= rate) {
                starElement.style.fill = filledColor;
            } else {
                starElement.style.fill = emptyColor;
            }
        }
    }
}


// local storage cart
function updateCart(productData, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let index = cart.findIndex(item => item.id === productData.id);
    if (index !== -1) {
        let newCount = cart[index].itemCount + change;
        if (newCount >= 1 && newCount <= 10) {
            cart[index].itemCount = newCount;
        }
    } else if (change > 0) {
        cart.push({
            id: productData.id,
            itemTitle: productData.title,
            itemPrice: productData.price,
            itemImage: productData.image,
            itemCount: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
}
function minusButton(productData) {
    return updateCart(productData, -1);
}

function plusButton(productData) {
    return updateCart(productData, 1);
}

// render page 
async function renderDetailsPage(clickedCartId) {
    detailsPage.innerHTML = "";
    const response = await fetch(`http://localhost:3000/products/${clickedCartId}`);
    const productData = await response.json();
    detailsPage.innerHTML += `
        <div>
            <!-- page address -->
            <div class="mt-4 ml-4">
                <p class="flex flex-row items-center self-start">
                    <a href="../../index.html"><svg id="homeIcon" class="hover:fill-[#f97316] hover:bg-[#f9731665]" xmlns="http://www.w3.org/2000/svg" height="14px"
                            viewBox="0 -960 960 960" width="14px" fill="#1f1f1f">
                            <path
                                d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                        </svg></a> / <span id="product--name--top" class="text-sm hover:underline"> ${productData.title}</span>
                </p>
            </div>

            <!-- product details -->
            <div class="flex flex-col p-4 gap-2  md:grid md:grid-cols-2 md:grid-rows-2 md:grid-rows-[auto_auto] md:gap-4 lg:grid-cols-3">
                <!-- left part in lg -->
                <div class="flex flex-col justify-center items-center gap-2  md:col-span-1 md:row-span-1 lg:col-span-1">
                    <img class="w-full h-auto border-2 border-[#e5e7eb] "
                        src="${productData.image}"
                        alt="product image">
                </div>

                <!-- right part in lg -->
                <div class="flex flex-col gap-2 md:col-span-1 md:row-span-1 lg:col-span-2">
                    <!-- name , price , stock , stars -->
                    <div class="flex flex-col gap-2">
                        <p id="product__title" class="text-2xl text-[#6a635a]">${productData.title}</p>
                        <p class="text-xl font-extrabold">$ <span id="product__price">540.00</span></p>
                        <p>Availability : <span id="product__inStock">${productData.inStock}</span></p>
                        <div class="flex flex-row flex-wrap gap-2">
                            <div>
                                <span class="flex flex-row">
                                    <svg id="star1" xmlns="http://www.w3.org/2000/svg" height="24px"
                                        viewBox="0 -960 960 960" width="24px" >
                                        <path
                                            d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
                                    </svg>
                                    <svg id="star2" xmlns="http://www.w3.org/2000/svg" height="24px"
                                        viewBox="0 -960 960 960" width="24px" >
                                        <path
                                            d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
                                    </svg>
                                    <svg id="star3" xmlns="http://www.w3.org/2000/svg" height="24px"
                                        viewBox="0 -960 960 960" width="24px" >
                                        <path
                                            d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
                                    </svg>
                                    <svg id="star4" xmlns="http://www.w3.org/2000/svg" height="24px"
                                        viewBox="0 -960 960 960" width="24px" >
                                        <path
                                            d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
                                    </svg>
                                    <svg id="star5" xmlns="http://www.w3.org/2000/svg" height="24px"
                                        viewBox="0 -960 960 960" width="24px" >
                                        <path
                                            d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
                                    </svg>
                                </span>
                            </div>
                            <p>(<span>${productData.reviewCount}</span> Reviews ) | <span>Add your review</span></p>
                        </div>
                    </div>
                    <hr>
                    <!-- overview text -->
                    <div>
                        <p class="text-l font-bold">QUICK OVERVIEW</p>
                        <p class="text-justify">${productData.overView}</p>
                    </div>
                    <hr>
                    <!-- choose options -->
                    <div class="flex flex-col gap-2 pb-2">
                        <div class="flex flex-col">
                            <label class="text-l font-bold" for="size"> SIZE <span
                                    class="text-[#ff0000]">*</span></label>
                            <select  id="size--select" class="w-3/4 py-2 border-2  border-[#e5e7eb] md:w-1/2" name="size" >
                                <option value="small">S</option>
                                <option value="medium">M</option>
                                <option value="large">L</option>
                            </select>
                        </div>
                        <div class="flex flex-col">
                            <label class="text-l font-bold" for="color">COLOR <span
                                    class="text-[#ff0000]">*</span></label>
                            <select id="color--select" class="w-3/4 py-2 border-2  border-[#e5e7eb] md:w-1/2" name="color" >
                                <option value="${productData.color[0]}">${productData.color[0]}</option>
                                <option value="${productData.color[1]}">${productData.color[1]}</option>
                                <option value="${productData.color[2]}">${productData.color[2]}</option>
                            </select>
                        </div>
                    </div>

                    <hr>
                    <!-- add to card section -->
                    <div class="flex flex-row gap-4 p-2 items-center flex-wrap lg:justify-between ">
                        <div class="flex flex-row gap-2 flex-wrap md:gap-4">
                            <div class="flex flex-row gap-2 items-center md:gap-4">
                                <p class="text-l font-bold">QTY: </p>
                                <div class="flex gap-0">
                                    <span id="minus-btn"
                                        class="border-2 border-[#e5e7eb] px-3 py-1 font-semibold text-2xl  hover:bg-[#000000] hover:border-[#000000] hover:text-[#fefefe]">-</span>
                                    <span id="count--inCart"
                                        class="border-y-2 border-[#e5e7eb] px-3 py-1 text-2xl font-bold"></span>
                                    <span id="plus-btn"
                                        class="border-2 border-[#e5e7eb] px-3 py-1 font-semibold text-2xl  hover:bg-[#000000] hover:border-[#000000] hover:text-[#fefefe]">+</span>
                                </div>
                            </div>
                            <button
                                class=" min-w-min border-2 border-[#e5e7eb] px-5 py-2 text-l font-bold hover:bg-[#000000] hover:border-[#000000] hover:text-[#fefefe]">ADD
                                TO CART</button>
                        </div>
                        <div class="flex flex-row items-center">
                            <span
                                class="border-2 border-[#e5e7eb] px-3 py-2 hover:bg-[#000000] hover:border-[#000000] ">
                                <svg class="bg-[#fefefe] rounded-full" xmlns="http://www.w3.org/2000/svg" height="24px"
                                    viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                                    <path
                                        d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                                </svg></span>
                            <span
                                class="border-y-2 border-[#e5e7eb] px-3 py-2 hover:bg-[#000000] hover:border-[#000000]"><svg
                                    class="bg-[#fefefe] rounded-full" xmlns="http://www.w3.org/2000/svg" height="24px"
                                    viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                                    <path
                                        d="M314-115q-104-48-169-145T80-479q0-26 2.5-51t8.5-49l-46 27-40-69 191-110 110 190-70 40-54-94q-11 27-16.5 56t-5.5 60q0 97 53 176.5T354-185l-40 70Zm306-485v-80h109q-46-57-111-88.5T480-800q-55 0-104 17t-90 48l-40-70q50-35 109-55t125-20q79 0 151 29.5T760-765v-55h80v220H620ZM594 0 403-110l110-190 69 40-57 98q118-17 196.5-107T800-480q0-11-.5-20.5T797-520h81q1 10 1.5 19.5t.5 20.5q0 135-80.5 241.5T590-95l44 26-40 69Z" />
                                </svg></span>
                            <span
                                class="border-2 border-[#e5e7eb] px-3 py-2 hover:bg-[#000000] hover:border-[#000000]"><svg
                                    class="bg-[#fefefe] rounded-full" xmlns="http://www.w3.org/2000/svg" height="24px"
                                    viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                                    <path
                                        d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z" />
                                </svg></span>
                        </div>
                    </div>
                    <hr>
                </div>
                <!-- text table -->
                <div
                    class="h-fit border-2 border-[#e5e7eb] flex flex-col gap-0  md:col-span-2 md:row-span-1 lg:col-span-3 hover:border-[#000000]">
                    <!-- titles row -->
                    <div class="flex flex-row gap-0 border-b-2 ">
                        <button id="table-product-desc"
                            class="p-1 text-l text-[#6a635a] font-bold md:px-6 md:py-4 hover:bg-[#000000] hover:border-[#000000] hover:text-[#fefefe]">PRODUCT
                            DESCRIPTION</button>
                        <button id="table-reviews"
                            class="p-1 border-l-2 text-l text-[#6a635a] font-bold md:px-6 md:py-4 hover:bg-[#000000] hover:border-[#000000] hover:text-[#fefefe]">REVIEWS</button>
                        <button id="table-tags"
                            class="p-1 border-x-2 text-l text-[#6a635a] font-bold md:px-6 md:py-4 hover:bg-[#000000] hover:border-[#000000] hover:text-[#fefefe]">PRODUCT
                            TAGS</button>
                    </div>
                    <!-- text box -->
                    <div class="flex flex-col gap-4 p-2">
                        <p id="table-product-desc-text" class="text-justify flex p-4">${productData.description}</p>
                        <div id="table-reviews-text" class="text-justify hidden"><div id="reviews-container"></div> </div>
                        <div id="table-tags-text" class="text-justify hidden"><div id="tags-container"></div></div>
                    </div>
                    <div class="hidden"></div>
                    <div class="hidden"></div>

                </div>



            </div>
        </div>
        `
    // stars function
    displayRatingStars(clickedCartId);

    // handel local storage cart
    const countInCart = document.querySelector("#count--inCart");
    const minusBtn = document.querySelector("#minus-btn");
    const plusBtn = document.querySelector("#plus-btn");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(i => i.id === productData.id);
    countInCart.innerHTML = item ? item.itemCount : 0;

    minusBtn.addEventListener("click", () => {
        const cart = minusButton(productData);
        const item = cart.find(i => i.id === productData.id);
        countInCart.innerHTML = item.itemCount;
    });
    plusBtn.addEventListener("click", () => {
        const cart = plusButton(productData);
        const item = cart.find(i => i.id === productData.id);
        countInCart.innerHTML = item.itemCount;
    });

    // handel table text
    //reviews
    async function displayReviews(productData) {
        await productData;
        const reviews = productData.reviews;
        const reviewsContainer = document.getElementById("reviews-container");
        reviewsContainer.classList.add("flex", "flex-row", "flex-wrap", "gap-4",);
        reviewsContainer.innerHTML = "";
        reviews.forEach(review => {
            const reviewDiv = document.createElement("div");
            reviewDiv.classList.add("flex", "flex-col", "gap-2", "p-4", "border", "rounded-lg", "mb-4","bg-[#f7f7f6]");

            const nameElement = document.createElement("p");
            nameElement.classList.add("font-semibold");
            nameElement.innerHTML = review.name;
            reviewDiv.appendChild(nameElement);

            const commentElement = document.createElement("p");
            commentElement.innerHTML = review.comment;
            reviewDiv.appendChild(commentElement);

            const dateElement = document.createElement("small");
            dateElement.classList.add("text-gray-500");
            dateElement.innerHTML = review.date;
            reviewDiv.appendChild(dateElement);

            reviewsContainer.appendChild(reviewDiv);

        });
    }
    //tags 
    async function displayTags(productData) {
        await productData;
        const tags = productData.tags;
        const tagsContainer = document.getElementById("tags-container");
        tagsContainer.classList.add("flex", "flex-row", "flex-wrap", "gap-4",);
        tagsContainer.innerHTML = "";
        tags.forEach(tag => {
            const tagDiv = document.createElement("div");
            tagDiv.classList.add("p-2", "border", "rounded-lg", "mb-4","bg-[#f7f7f6]");
            tagDiv.innerHTML = tag;
            tagsContainer.appendChild(tagDiv);
        });
    }
    // handel table display
    const tableDescription = document.querySelector("#table-product-desc");
    const tableReviews = document.querySelector("#table-reviews");
    const tableTags = document.querySelector("#table-tags");

    const tableDescriptionText = document.querySelector("#table-product-desc-text");
    const tableReviewsText = document.querySelector("#table-reviews-text");
    const tableTagsText = document.querySelector("#table-tags-text");

    tableDescription.addEventListener("click", () => {
        tableDescriptionText.classList.add("flex");
        tableDescriptionText.classList.remove("hidden");
        tableReviewsText.classList.remove("flex");
        tableReviewsText.classList.add("hidden");
        tableTagsText.classList.remove("flex");
        tableTagsText.classList.add("hidden");
    })
    tableReviews.addEventListener("click", () => {
        tableReviewsText.classList.remove("hidden");
        tableReviewsText.classList.add("flex");
        tableDescriptionText.classList.remove("flex");
        tableDescriptionText.classList.add("hidden");
        tableTagsText.classList.remove("flex");
        tableTagsText.classList.add("hidden");
        displayReviews(productData);
    })
    tableTags.addEventListener("click", () => {
        tableTagsText.classList.remove("hidden");
        tableTagsText.classList.add("flex");
        tableDescriptionText.classList.add("hidden");
        tableDescriptionText.classList.remove("flex");
        tableReviewsText.classList.remove("flex");
        tableReviewsText.classList.add("hidden");
        displayTags(productData);

    })

}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
renderDetailsPage(id);
