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

    let cartCount = Number(localStorage.getItem("cartCount")) || 0;

    if (cartCounter) {
        cartCounter.textContent = cartCount;
    }

    cartButtons.forEach(button => {
        button.addEventListener("click", () => {
            cartCount++;

            localStorage.setItem("cartCount", cartCount);

            if (cartCounter) {
                cartCounter.textContent = cartCount;
            }

            const oldText = button.textContent;
            button.textContent = "Added";

            setTimeout(() => {
                button.textContent = oldText;
            }, 1200);
        });
    });

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