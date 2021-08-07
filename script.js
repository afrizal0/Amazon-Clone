function getItem() {
    db.collection("items").get().then((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
            items.push({
               id: doc.id,
               image: doc.data().image,
               make: doc.data().make,
               name: doc.data().name,
               price: doc.data().price,
               rating: doc.data().rating
            })
        });
        generateItems(items);
    });
}


function addToCart(item){
    let cartItem = db.collection("cart-items").doc(item.id);
    cartItem.get()
    .then(function(doc){
        if(doc.exists){
            cartItem.update({
                quantity: doc.data().quantity + 1
            });
        } else {
            cartItem.set({
                image: item.image,
                make: item.make,
                name: item.name,
                price: item.price,
                rating: item.rating,
                quantity: 1
            });
        }
    });
}

function generateItems(items) {
    items.forEach((item) => {
        let doc = document.createElement("div");
        doc.classList.add('main-product', 'mr-5');

        doc.innerHTML += `
            <div class="product-image w-48 h-52 bg-white rounded-lg">
                <img class="w-full h-full object-contain" src="${item.image}" alt="">
            </div>
            <div class="product-name text-gray-700 font-bold mt-2 text-sm">
                ${item.name}
            </div>
            <div class="product-make text-green-700 font-bold">
                ${item.make}
            </div>
            <div class="product-rating text-yellow-300 font-bold my-1">
                ⭐⭐⭐⭐⭐ ${item.rating}
            </div>
            <div class="product-price font-bold text-gray-700 text-lg">
                $${item.price}
            </div>
        `;
        document.querySelector('.main-section-products').appendChild(doc);
        let addToCartBtn = document.createElement('div');
        addToCartBtn.classList.add('hover:bg-yellow-600', 'text-md', 'rounded', 'cursor-pointer', 'flex', 'items-center', 'justify-center', 'text-white', 'add-to-cart', 'h-8', 'w-28', 'bg-yellow-500');
        addToCartBtn.innerText = 'Add To Cart';
        
        doc.appendChild(addToCartBtn);

        addToCartBtn.addEventListener('click', function(){
            addToCart(item);
        })
    })
    
    document.querySelector('.main-section-products').innerHTML = doc;
    console.log(items.image);
}

getItem();
