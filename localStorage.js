
const getLocalstorage=(item)=>{
    
     let cart = localStorage.getItem(item)
    if (cart){
        cart = JSON.parse(localStorage.getItem(item))
}else{
        cart = []
}
    return cart
}

const setLocalstorage = (name,item) => {
localStorage.setItem(name,JSON.stringify(item))

}

export {getLocalstorage,setLocalstorage}