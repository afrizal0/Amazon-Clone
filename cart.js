function getCartItems(){
	db.collection("cart-items").onSnapshot((snapshot) => {
		let cartItems = [];
		snapshot.docs.forEach((doc) => {
			cartItems.push({
				id: doc.id,
				...doc.data()
			});
		});
		generateCartItems(cartItems);
	});
}


function decreaseCount(itemId) {
	let cartItem = db.collection("cart-items").doc(itemId);
	cartItem.get().then(function(doc){
		if(doc.exists) {
			if(doc.data().quantity > 1) {
				cartItem.update({
					quantity: doc.data().quantity - 1;
				})
			}
		}
	})

}

function generateCartItems(cartItems) {
	let itemsHTML = "";
	cartItems.forEach((item) => {
		itemsHTML += `
					<div class="cart-item flex items-center pb-4 border-b border-gray-100">
						<div class="cart-item-image w-40 h-24 bg-white p-4 rounded-lg">
							<img class="image-product w-full h-full object-contain" src="${item.image}" alt="">
						</div>
						<div class="cart-item-details flex-grow">
							<div class="cart-item-title font-bold text-sm text-gray-600">
								${item.name}
							</div>
							<div class="cart-item-brand text-sm text-gray-400">
								${item.make}
							</div>
						</div>
						<div class="cart-item-counter flex text-gray-400 w-48">
							<div data-id="${item.id}" class="card-item-decrease cursor-pointer bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 mr-2">
								<i class="fas fa-chevron-left fa-xs"></i>
							</div>
							<h4 class="totalQuantity text-gray-400">x${item.quantity}</h4>
							<div data-id="${item.id}" class="card-item-increase cursor-pointer bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 ml-2">
								<i class="fas fa-chevron-right fa-xs"></i>
							</div>
						</div>
						<div class="cart-item-total-count w-48 font-bold text-gray-400">
							$${item.price * item.quantity}
						</div>
						<div class="cart-item-delete w-10 font-bold text-gray-200 cursor-pointer hover:text-gray-400">
							<i class="fas fa-times"></i>
						</div>
					</div>
		`
		
	})
	document.querySelector('.cart-items').innerHTML = itemsHTML;
	createEventListeners();
}

function createEventListeners(){
	let increseBtn = document.querySelectorAll('.card-item-increase');
	let decreaseBtn = document.querySelectorAll('.card-item-decrease');

	decreaseBtn.forEach((button) => {
		button.addEventListener('click', function(){
			decreaseCount(button.dataset.id);
		})
	})
}

getCartItems();