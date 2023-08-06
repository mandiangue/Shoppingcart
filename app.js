//modules import
            import { products } from "./products.js";
            import { getLocalstorage, setLocalstorage } from "./localStorage.js";


//Dom variables initialization
                let productContainer = document.querySelector('.product-container')
                let panier = document.querySelector('.quantity')
                const cartItems = document.querySelector('.cart-items')
                const cartDom = document.querySelector('.my-cart')
                const cartQuantity = document.querySelector('.cart-quantity')
                const closeBtn = document.querySelector('.close-cart')
                const closeFooter = document.querySelector('.footer-cart')
                const totalItem = document.querySelector('.total-item')
                const checkoutBtn = document.querySelector('.checkout')
                const searchInput= document.querySelector('.search-input')
                let annee= document.querySelector('.year')


// create dynamic year on footer
annee.innerHTML= new Date().getFullYear()
//search form
searchInput.addEventListener('keypress',()=>{
    alert('For search i let your imagination do the remaining staff')
})


// Cart variable initialization || getting local storage
                let mycart = getLocalstorage('mycart')

// Display cart function call
            displayCart()

//Display product function call
            displayProducts()
//----------------------------------------------------------------------------------------------------------
//Function for displaying product on ui
            function displayProducts() {

                products.forEach((product) => {
            const { id, name, price, img, desc } = product

            productContainer.innerHTML += `<section class="product-cart" data-id="${id}">
                <h2 class="product-name">${name}</h2>
                <img class="product-img" src="${img}" alt="${name}">
                <p class="product-desc">${desc}</p>
                <p class="product-price">${price}€</p>
                <button class="product-add">Add to Cart</button>
                </section>`

                })


}
//--------------------------------------------------------------------------------------------------------------
//Function sum total price
            function displayTotal() {
                let totalprice = 0
                parseInt(totalprice)
                mycart.forEach(item => {
                    totalprice += item.price

                })
                return totalprice
}
//--------------------------------------------------------------------------------------------------------------------
//function of quantity total items
            function displayTotalItems() {
                let totalItem = 0
                mycart.forEach(item => {
                    totalItem += item.quantity

                })
                return totalItem
}
//--------------------------------------------------------------------------------------------------------------------------
//function for display cart
            function displayCart() {
                if (mycart.length > 0) {
                    let cartResult = mycart.map((item) => {
                        const { id, name, price, img } = item

            return `
            <div class="my-cart" data-id="${id}">
            <div><img class="cart-img" src="${img}" alt="${name}"></div>
            <div class="cart-name">${name}</div>
            <div class="cart-price">${price}€</div>
            
            <div class="minus" data-id="${id}">-</div>
            <div class="cart-quantity">${item.quantity}</div>
            <div class="plus" data-id="${id}">+</div>
            
            <div class="cart-remove" data-id="${id}"><i class="fa-solid fa-trash"></i></div></div>
                         
                 `
        }).join('')

        cartItems.innerHTML = cartResult
        cartItems.classList.remove('emptyCart')
        panier.style.visibility = 'visible'
        panier.innerHTML = displayTotalItems()
        totalItem.innerHTML = 'Total: ' + displayTotal()
    }
    else {
        cartItems.innerHTML = `<h3 class="empty-cart">Ton panier est vide</h3>`
        panier.style.visibility = 'hidden'
    }
    //set localstorage
    setLocalstorage('mycart', mycart)

}
//--------------------------------------------------------------------------------------------------------------
//Function for updating cart
        function updateMyCart(product) {
            for (let i = 0; i < mycart.length; i++) {
                if (mycart[i].id === product.id) {
                    mycart[i].quantity += 1
                    mycart[i].price = mycart[i].initialPrice * mycart[i].quantity
                    return
        }
    }

    mycart.push(product)

}
//-------------------------------------------------------------------------------------------------------------------
// Event listener for adding product in cart
                const productCart = document.querySelectorAll('.product-cart')

                productCart.forEach(item => {

                item.addEventListener('click', (e) => {
                    const productAdd = e.target.classList.contains('product-add')
                    if (productAdd) {

                const id = e.target.parentElement.dataset.id
                const name = item.querySelector('.product-name').innerHTML
                const price = item.querySelector('.product-price').innerHTML
                const img = item.querySelector('.product-img').src

                let itemProduct = {
                    id,
                    name,
                    price: parseInt(price),
                    img,
                    quantity: 1,
                    initialPrice: parseInt(price)

                }


                updateMyCart(itemProduct)

                displayCart()
                //Open cart box
                cartItems.style.transform = 'translateX(0.5rem)'
                closeFooter.style.transform = 'translateX(0.5rem)'

        }

    })
})
//------------------------------------------------------------------------------------------------------------------- 


//event listener for opening cart
             panier.addEventListener('click', () => {
             cartItems.style.transform = 'translateX(0.5rem)'
             closeFooter.style.transform = 'translateX(0.5rem)'

})
//-------------------------------------------------------------------------------------------------------------
//event listener for closing All cart
            closeBtn.addEventListener('click', () => {
            cartItems.style.transform = 'translateX(30rem)'
            closeFooter.style.transform = 'translateX(30rem)'
})
//-------------------------------------------------------------------------------------------------------------

//Event listener for plus button and minus button for increasing quantity and price
            cartItems.addEventListener('click', (e) => {

            const minusBtn = e.target.classList.contains('minus')
            const plusBtn = e.target.classList.contains('plus')
           if (minusBtn || plusBtn) {
           for (let i = 0; i < mycart.length; i++) {
            if (mycart[i].id === e.target.dataset.id) {

                if (plusBtn) {
                    mycart[i].quantity += 1

                } else if (minusBtn) {
                    mycart[i].quantity -= 1

                }
                mycart[i].price = mycart[i].initialPrice * mycart[i].quantity

            }
            if (mycart[i].quantity <= 0) {
                mycart.splice(i, 1)

            }

        }
                totalItem.innerHTML = 'Total: ' + displayTotal()
                panier.innerHTML = displayTotalItems()
                displayCart()
    }

})
//-----------------------------------------------------------------------------------------------------------
//Function for deleting product in cart 
                function deleteCart() {
                cartItems.addEventListener('click', (e) => {

                const deleteBtn = e.target.classList.contains('fa-trash')
                if (deleteBtn) {

                for (let i = 0; i < mycart.length; i++) {
                    if (mycart[i].id === e.target.parentElement.dataset.id) {
                        mycart.splice(i, 1)
                    }
                }

        }
                totalItem.innerHTML = 'Total: ' + displayTotal()
                panier.innerHTML = displayTotalItems()
                displayCart()
    })


}

//---------------------------------------------------------------------------------------------------------------

//Function call of deleting
deleteCart()




