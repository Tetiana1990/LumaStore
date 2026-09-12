let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");


function renderCart(){
	if(!cartItems || !cartTotal){
		return;

	}
	if(cart.length === 0){
		cartItems.innerHTML = `
		<p>Your cart is empty</p>`;
		cartTotal.textContent = `$0`;
		return;
	}
	const total = cart.reduce((sum, product) => {
		return sum + product.price * product.quantity;
	}, 0);
cartTotal.textContent = `$${total}`;

	const cartItemsHTML = cart.map((product) =>{
		return `
		<article class="cart-item">
		<img src="${product.image}" alt="${product.name}">
		<div class="cart-item__content">
		<h2>${product.name}</h2>
		<p>$${product.price}</p>
		<div class="cart-item__quantity">
		<button class="quantity-minus" data-id="${product.id}">-</button>
		<span>${product.quantity}</span>
		<button class="quantity-plus" data-id="${product.id}">+</button>
		<button class="cart-item__remove" data-id="${product.id}">Remove</button>
		</div>
		</div>
		</article>`;
	}).join("");
	cartItems.innerHTML = cartItemsHTML;

	addCartEventListeners();
}

function addCartEventListeners(){
	const plusButtons = document.querySelectorAll(".quantity-plus");
	const minusButtons = document.querySelectorAll(".quantity-minus");
	const removeButtons = document.querySelectorAll(".cart-item__remove");

	plusButtons.forEach((button) =>{
		button.addEventListener("click", () =>{
			const productId = Number(button.dataset.id);
			const product = cart.find((item) => {
				return item.id === productId;
			});
			product.quantity++;
		
			saveCart();
});
	});

	minusButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const productId = Number(button.dataset.id);

			const product = cart.find((item) =>{
				return item.id === productId;
			});
			if(product.quantity > 1){
				product.quantity--;
			}
			saveCart();
		});
	});

	removeButtons.forEach((button) =>{
		button.addEventListener("click", () =>{
			const productId = Number(button.dataset.id);

			cart = cart.filter((item) => {
				return item.id !== productId;
			});
			saveCart();
		});
	});
}
function saveCart(){
	localStorage.setItem("cart", JSON.stringify(cart));

	renderCart();
	
	if (typeof updateCartCount === "function") {
		updateCartCount();
	}
}
renderCart();





