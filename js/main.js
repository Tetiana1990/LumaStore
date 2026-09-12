
function updateCartCount(){
const cartCount = document.querySelector("#cart-count");

if(!cartCount){
	return;
}
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const count = cart.reduce((sum, product) => {
	return sum + product.quantity;
}, 0);
cartCount.textContent = count;

}
updateCartCount();

const featuredProducts = document.querySelector("#featured-products");

function renderFeaturedProducts() {
    if (!featuredProducts) {
        return;
    }
const featured = products.slice(0, 3);

    featuredProducts.innerHTML = featured.map((product) => {
        return `
            <article class="product-card">
            <div class="product-card__image">
            <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="product-card__content">
            <p class="product-card__category">
             ${product.category}
             </p>

             <h2 class="product-card__title">
            ${product.name}
             </h2>

             <div class="product-card__info">
             <span class="product-card__rating">
               ⭐  ${product.rating}
              </span>

             <span class="product-card__price">
             $${product.price}
             </span>
             </div>

             <a href="product.html?id=${product.id}" class="product-card__link">
            View Details
             </a>

             <button class="product-card__button" data-id="${product.id}">
               Add to Cart
            </button>
                </div>
            </article>`
        ;
    }).join("");
}

renderFeaturedProducts();

function addAddToCartListeners() {
    const addToCartButtons = document.querySelectorAll(".product-card__button");

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
          
            const productId = Number(button.dataset.id);
            
          const productData = products.find((item) => item.id === productId);
            
            if (!productData) return;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existingProduct = cart.find((item) => item.id === productId);

            if (existingProduct) {
              
                existingProduct.quantity++;
            } else {
             cart.push({
                    id: productData.id,
                    name: productData.name,
                    price: productData.price,
                    image: productData.image,
                    quantity: 1
                });
            }

         localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();
            
        });
    });
}
renderFeaturedProducts();
addAddToCartListeners(); 
