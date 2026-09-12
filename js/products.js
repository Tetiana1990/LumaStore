const productsGrid = document.querySelector("#products-grid")
const searchInput = document.querySelector("#search-input");
const categoryButtons = document.querySelectorAll(".category-filter");
const sortSelect = document.querySelector("#sort-select")

let selectedCategory = "All";
let searchQuery = "";
let selectedSort = "default";

function renderProducts(productsToRender){
	if(!productsGrid){
		return;
	}
	if(!productsToRender || productsToRender.length === 0){
		productsGrid.innerHTML = `
		<p class="no-products">No products found.</p>`;
		return;
	}
	const productCards = productsToRender.map((product) => {
		return `
		<article class="product-card">
		<div class="product-card__image">
		<img src="${product.image}" alt="${product.name}"></div>
		<div class="product-card__content">
		<p class="product-card__category">${product.category}</p>
		<h2 class="product-card__title">${product.name}</h2>
		<div class="product-card__info">
		<span class="product-card__rating">${product.rating}</span>
		<span class="product-card__price">$${product.price}</span></div>
		<a href="product.html?id=${product.id}"class="product-card__link">View Details</a>
		<button class="product-card__button" data-id="${product.id}">Add to Cart</button>
		</div>
		</article>`;
	}).join("");
	productsGrid.innerHTML = productCards;

	addCartButtonsListeners();
}

function addCartButtonsListeners(){
	const cartButtons = document.querySelectorAll(".product-card__button");

	cartButtons.forEach((button) => {
		button.addEventListener("click", (event) => {
			event.preventDefault();
const productId = Number(button.dataset.id);

if (typeof products === "undefined") {
                console.error("Ошибка: Массив 'products' не найден!");
                return;
            }

const product = products.find((item) => item.id === productId); 
	if(!product) return;
;
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const existingProduct = cart.find((item) => {
	return item.id === productId
});
if(existingProduct){
	existingProduct.quantity++;
}else{
	cart.push({
		 id: product.id,
		 name: product.name,
		 price: product.price,
		 image: product.image,
		quantity: 1
	});
	
}
localStorage.setItem("cart", JSON.stringify(cart));
 if (typeof updateCartCount === "function") {
                updateCartCount();
            }

     });
  });
}
function getFilteredProducts(){
	  if (typeof products === "undefined") return [];
	let filteredProducts = [...products];

	if(selectedCategory !== "All"){

		filteredProducts = filteredProducts.filter((product) =>{
return product.category === selectedCategory;
		});
		
	}
if(searchQuery !== ""){
	filteredProducts = filteredProducts.filter((product) => {
		return product.name
		      .toLowerCase()
				.includes(searchQuery);
	});
}
if(selectedSort === "price-low"){
	filteredProducts.sort((a, b) => {
		return a.price - b.price;
	});
}

if(selectedSort === "price-high"){
	filteredProducts.sort((a, b) => {
		return b.price - a.price;
	});
}
if(selectedSort === "name"){
	filteredProducts.sort((a, b) => {
		return a.name.localeCompare(b.name);
	});
}

return filteredProducts;
}

if(categoryButtons.length > 0){
	categoryButtons.forEach((button) => {
		button.addEventListener("click", () => {
			selectedCategory = button.dataset.category;
			categoryButtons.forEach((btn) => {
				btn.classList.remove("active");
			});
			button.classList.add("active");

			renderProducts(getFilteredProducts());
		});
	});
}
if(searchInput){
	searchInput.addEventListener("input", () => {
		searchQuery = searchInput.value
		       .toLowerCase()
				 .trim();

 renderProducts(getFilteredProducts());				 
	});
}
if(sortSelect){
	sortSelect.addEventListener("change", () =>{
		selectedSort = sortSelect.value;

		renderProducts(getFilteredProducts());
	});
}

window.addEventListener("DOMContentLoaded", () => {
	if (typeof products !== "undefined") {
		 const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get('category');

		   if (categoryFromUrl) {
				 selectedCategory = categoryFromUrl;

				  if (categoryButtons.length > 0) {
                categoryButtons.forEach((btn) => {
                    if (btn.dataset.category === selectedCategory) {
                        btn.classList.add("active");
                    } else {
                        btn.classList.remove("active");
                    }
                });
            }
			}
		renderProducts(getFilteredProducts());
	}
	});



















