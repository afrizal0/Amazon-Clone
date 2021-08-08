function getCartItems(){
	db.collection("cart-items").onSnapshot((snapshot) => {
		let image, name, make, quantity, price;
		let arr = [];
		arr.push(snapshot);
		arr.forEach((res) => {
			console.log(res);
		})
		// snapshot.forEach((doc) => {
		// 	image = doc.data().image;
		// 	name = doc.data().name;
		// 	make = doc.data().make;
		// 	quantity = doc.data().quantity;
		// 	price = doc.data().price;
		// })
		// setCartItems(image, name, make, quantity, price);
	})
}


// function setCartItems(image, name, make, quantity, price) {
// 	document.querySelector(".image-product").src = image;
// 	document.querySelector(".cart-item-title").innerText = name;
// 	document.querySelector(".cart-item-brand").innerText = make;
// 	document.querySelector(".totalQuantity").innerText = `x${quantity}`;
// 	document.querySelector(".cart-item-total-count").innerText = `$${price * quantity}`;
// }
getCartItems();