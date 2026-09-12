
const productDetails = document.querySelector("#product-details");

if(productDetails){
	const params = new URLSearchParams(window.location.search);
	const productId = Number(params.get("id"));

	let product = null;

	
if (typeof products === "undefined") {
        productDetails.innerHTML = `<p>Error loading product data.</p>`;
    } else {
         product = products.find((item) => item.id === productId);

};
if(!product){
	productDetails.innerHTML = `
	<p>Product not found.</p>
	<a href="products.html"> Back to Products</a>`;
}else{
productDetails.innerHTML = `
<div class="product-details__image">
<img src="${product.image}" alt="${product.name}"></div>
<div class="product-details__content">
<p class="product-details__category">${product.category}</p>
<h1 class="product-details__title">${product.name}</h1>
<p class="product-details__rating">${product.rating}</p>
<p class="product-details__price">$${product.price}</p>
<p class="product-details__description">${product.description}</p>
<button class="product-details__button" data-id="${product.id}">Add to Cart</button>
</div>
`;
const addButton = document.querySelector(".product-details__button");
if(addButton){
addButton.addEventListener("click", () =>{
	let cart = JSON.parse(localStorage.getItem("cart")) || [];

	const existingProduct = cart.find((item) => {
		return item.id === product.id;
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
	}
}
}




	
	




	






