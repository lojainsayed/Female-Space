document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    const searchInput = document.querySelector("#searchInput");
    const products = document.querySelectorAll(".product-card");

    if (searchInput) {
        searchInput.addEventListener("input", () => {

            const searchValue = searchInput.value.toLowerCase().trim();

            products.forEach(product => {

                const productName =
                    product.querySelector(".product-name")?.textContent.toLowerCase() || "";

                const productDescription =
                    product.querySelector(".product-description")?.textContent.toLowerCase() || "";

                if (
                    productName.includes(searchValue) ||
                    productDescription.includes(searchValue)
                ) {
                    product.style.display = "";
                } else {
                    product.style.display = "none";
                }
            });
        });
    }


    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const category = button.dataset.category;

            products.forEach(product => {

                const productCategory = product.dataset.category;

                if (category === "all" || productCategory === category) {
                    product.style.display = "";
                } else {
                    product.style.display = "none";
                }
            });
        });
    });


    const sortSelect = document.querySelector("#sortProducts");

    if (sortSelect) {

        const productContainer =
            document.querySelector(".products-grid");

        sortSelect.addEventListener("change", () => {

            const productArray = Array.from(products);

            const sortValue = sortSelect.value;

            productArray.sort((a, b) => {

                const priceA = parseFloat(
                    a.dataset.price || "0"
                );

                const priceB = parseFloat(
                    b.dataset.price || "0"
                );

                if (sortValue === "low-high") {
                    return priceA - priceB;
                }

                if (sortValue === "high-low") {
                    return priceB - priceA;
                }

                if (sortValue === "name") {
                    const nameA =
                        a.querySelector(".product-name")?.textContent || "";

                    const nameB =
                        b.querySelector(".product-name")?.textContent || "";

                    return nameA.localeCompare(nameB);
                }

                return 0;
            });

            productArray.forEach(product => {
                productContainer.appendChild(product);
            });
        });
    }

    const favoriteButtons =
        document.querySelectorAll(".favorite-btn");

    favoriteButtons.forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("favorite");

            if (button.classList.contains("favorite")) {
                button.textContent = "♥";
            } else {
                button.textContent = "♡";
            }
        });
    });

    const cartButtons =
        document.querySelectorAll(".add-cart");

    let cartCount = 0;

    const cartCounter =
        document.querySelector("#cartCount");

    cartButtons.forEach(button => {

        button.addEventListener("click", () => {

            cartCount++;

            if (cartCounter) {
                cartCounter.textContent = cartCount;
            }

            const originalText = button.textContent;

            button.textContent = "Added ✓";

            setTimeout(() => {
                button.textContent = originalText;
            }, 1200);
        });
    });

    const topButton =
        document.querySelector("#scrollTop");

    if (topButton) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {
                topButton.classList.add("show");
            } else {
                topButton.classList.remove("show");
            }
        });

        topButton.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    const links =
        document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

                if (navLinks) {
                    navLinks.classList.remove("active");
                }
            }
        });
    });

});
