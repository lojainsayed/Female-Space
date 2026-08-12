document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    const dropdownButtons = document.querySelectorAll(".dropdown-btn");

    dropdownButtons.forEach(button => {
        button.addEventListener("click", event => {
            event.stopPropagation();

            const dropdown = button.closest(".dropdown");

            document.querySelectorAll(".dropdown").forEach(item => {
                if (item !== dropdown) {
                    item.classList.remove("active");
                }
            });

            dropdown.classList.toggle("active");
        });
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".dropdown").forEach(dropdown => {
            dropdown.classList.remove("active");
        });
    });

    const searchInput = document.querySelector("#searchInput");
    const products = document.querySelectorAll(".product-card");

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const value = searchInput.value.toLowerCase().trim();

            products.forEach(product => {
                const name =
                    product.querySelector(".product-name")?.textContent.toLowerCase() || "";

                const description =
                    product.querySelector(".product-description")?.textContent.toLowerCase() || "";

                product.style.display =
                    name.includes(value) || description.includes(value)
                        ? ""
                        : "none";
            });
        });
    }

    const productSort = document.querySelector("#productSort");
    const productsGrid = document.querySelector("#productsGrid");

    if (productSort && productsGrid) {
        productSort.addEventListener("change", () => {
            const productArray = Array.from(productsGrid.children);

            productArray.sort((a, b) => {
                const priceA = Number(a.dataset.price || 0);
                const priceB = Number(b.dataset.price || 0);

                if (productSort.value === "low") {
                    return priceA - priceB;
                }

                if (productSort.value === "high") {
                    return priceB - priceA;
                }

                if (productSort.value === "name") {
                    const nameA =
                        a.querySelector(".product-name")?.textContent || "";

                    const nameB =
                        b.querySelector(".product-name")?.textContent || "";

                    return nameA.localeCompare(nameB);
                }

                return 0;
            });

            productArray.forEach(product => {
                productsGrid.appendChild(product);
            });
        });
    }

    const cartButtons = document.querySelectorAll(".add-cart");
    const cartCounter = document.querySelector("#cartCount");

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    function updateCartCount() {

        const totalQuantity = cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );

        if (cartCounter) {
            cartCounter.textContent = totalQuantity;
        }
    }


    function saveCart() {

        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        );

        updateCartCount();
    }


    cartButtons.forEach(button => {

        button.addEventListener("click", () => {

            const productCard = button.closest(".product-card");

            if (!productCard) return;


            const name =
                productCard
                    .querySelector(".product-name")
                    ?.textContent
                    .trim() || "";


            const priceText =
                productCard
                    .querySelector(".price")
                    ?.textContent || "0";


            const price =
                parseFloat(
                    priceText.replace(/[^0-9.]/g, "")
                ) || 0;


            const image =
                productCard
                    .querySelector("img")
                    ?.getAttribute("src") || "";


            const description =
                productCard
                    .querySelector(".product-description")
                    ?.textContent
                    .trim() || "";


            const existingProduct =
                cartItems.find(item => item.name === name);


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cartItems.push({
                    name: name,
                    price: price,
                    image: image,
                    description: description,
                    quantity: 1
                });

            }


            saveCart();


            const oldText = button.textContent;

            button.textContent = "Added";


            setTimeout(() => {
                button.textContent = oldText;
            }, 1200);

        });

    });


    updateCartCount();
    /* =========================
   DISPLAY CART PAGE
========================= */

    const cartItemsContainer = document.querySelector("#cartItems");
    const cartSubtotal = document.querySelector("#cartSubtotal");
    const cartTotal = document.querySelector("#cartTotal");

    function displayCart() {

        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = "";

        if (cartItems.length === 0) {

            cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart is Empty</h2>
                <p>You haven't added anything to your cart yet.</p>

                <a href="index.html" class="continue-shopping">
                    Start Shopping
                </a>
            </div>
        `;

            if (cartSubtotal) {
                cartSubtotal.textContent = "0 EGP";
            }

            if (cartTotal) {
                cartTotal.textContent = "0 EGP";
            }

            return;
        }


        let subtotal = 0;


        cartItems.forEach((item, index) => {

            const itemTotal = item.price * item.quantity;

            subtotal += itemTotal;


            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";


            cartItem.innerHTML = `
            
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>${item.description}</p>

                <span class="cart-item-price">
                    ${item.price.toFixed(2)} EGP
                </span>

            </div>


            <div class="cart-item-actions">

                <div class="quantity">

                    <button 
                        class="minus-btn"
                        data-index="${index}">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button 
                        class="plus-btn"
                        data-index="${index}">
                        +
                    </button>

                </div>


                <button 
                    class="remove-btn"
                    data-index="${index}">
                    Remove
                </button>

            </div>
        `;


            cartItemsContainer.appendChild(cartItem);

        });


        if (cartSubtotal) {
            cartSubtotal.textContent =
                `${subtotal.toFixed(2)} EGP`;
        }


        if (cartTotal) {
            cartTotal.textContent =
                `${subtotal.toFixed(2)} EGP`;
        }


        /* PLUS */

        document.querySelectorAll(".plus-btn").forEach(button => {

            button.addEventListener("click", () => {

                const index = Number(button.dataset.index);

                cartItems[index].quantity++;

                saveCart();

                displayCart();

            });

        });


        /* MINUS */

        document.querySelectorAll(".minus-btn").forEach(button => {

            button.addEventListener("click", () => {

                const index = Number(button.dataset.index);


                if (cartItems[index].quantity > 1) {

                    cartItems[index].quantity--;

                } else {

                    cartItems.splice(index, 1);

                }


                saveCart();

                displayCart();

            });

        });


        /* REMOVE */

        document.querySelectorAll(".remove-btn").forEach(button => {

            button.addEventListener("click", () => {

                const index = Number(button.dataset.index);

                cartItems.splice(index, 1);

                saveCart();

                displayCart();

            });

        });

    }


    displayCart();

    const signupForm = document.querySelector("#signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit", event => {
            event.preventDefault();

            const user = {
                firstName: document.querySelector("#firstName").value.trim(),
                lastName: document.querySelector("#lastName").value.trim(),
                email: document.querySelector("#email").value.trim(),
                phone: document.querySelector("#phone").value.trim(),
                password: document.querySelector("#password").value,
                governorate: document.querySelector("#governorate").value,
                city: document.querySelector("#city").value.trim(),
                area: document.querySelector("#area").value.trim(),
                address: document.querySelector("#address").value.trim()
            };

            localStorage.setItem("femaleSpaceUser", JSON.stringify(user));
            localStorage.setItem("isLoggedIn", "true");

            window.location.href = "index.html";
        });
    }

    const user = JSON.parse(localStorage.getItem("femaleSpaceUser"));

    if (user) {
        const userName = document.querySelector("#userName");

        if (userName) {
            userName.textContent = user.firstName;
        }
    }
});