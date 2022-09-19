
const setLocalStorage = (key,value) => {
    const convertedItem = JSON.stringify(value);
    localStorage.setItem(key, convertedItem);
  }
  
  const getLocalStorage = (key) => {
    const item = localStorage.getItem(key);
    if(!item) return []
    return JSON.parse(item);
  }

  const oldData = getLocalStorage('cart');
  let sortedCart = [...oldData];

  
  //Get element by id
  const byId = (id) => {
    const byId = document.getElementById(id);
    return byId;
  }
  
  const badgeCount = (array) => {
    const value = array.reduce((p,c) => p+c.value,0)
    return value;
  }
  
  const calculatePrice = (array, price, totalTax, totalPrice) => {
    let sum = 0;
    array.forEach(item => {
      const prices = item.price * item.value;
      sum = sum + prices;
    })
    let tax = sum * 0.1;
    let total = sum + tax;
  
    byId(price).innerText = '';
    byId(price).innerText = sum.toFixed(2);
    byId(totalTax).innerText = '';
    byId(totalTax).innerText = tax.toFixed(2);
    byId(totalPrice).innerText = '';
    byId(totalPrice).innerText = total.toFixed(2);
    return true;
  }


  const cartDisplay = (array) => {
    const cartItemContainer = byId("cart-item");
    cartItemContainer.textContent = '';
    array.forEach(data => {
      const {img,name, id: productID, value} = data;
      const newCartItem = document.createElement("div");
      newCartItem.classList.add(
        "flex",
        "justify-between",
        "items-center",
        "bg-slate-400",
        "p-4",
        "rounded-md",
        "mt-4"
      );
  
      newCartItem.innerHTML = `
          <div>
              <img src="${img}" class="w-10" alt="">
          </div>
          <p class="text-white">${name}</p>
          <input class="special-class border-2 border-red-100 w-10 text-center rounded-md" type="text" value="${value}"
              readonly>
          <i onclick="handleRemove('${productID}')" class="fa-solid fa-trash text-red-700"></i>
          `;
      cartItemContainer.appendChild(newCartItem);
    })
  }

  const handleRemove = (id) => {
  const removed = sortedCart.filter(data => data.id !== id);
  sortedCart = removed;
  cartDisplay(removed);
  
  const badge = badgeCount(sortedCart);
  byId('badge-count').innerText = '';
  byId('badge-count').innerText = badge;
  byId('total-product').innerText = '';
  byId('total-product').innerText = badge;

  calculatePrice(sortedCart,'product-price', 'product-tax', 'total-price');
  setLocalStorage('cart',sortedCart);
}


  const handleClearAll = () => {
    sortedCart = [];
    cartDisplay(sortedCart);
  
    const badge = badgeCount(sortedCart);
    byId('badge-count').innerText = '';
    byId('badge-count').innerText = badge;
    byId('total-product').innerText = '';
    byId('total-product').innerText = badge;
    calculatePrice(sortedCart,'product-price', 'product-tax', 'total-price');
    localStorage.removeItem('cart');
  }
  
  byId('confirm').addEventListener('click', function(){
    let oldOrderData = getLocalStorage('confirm');
    let newOrder = [...oldOrderData,...sortedCart];
    setLocalStorage('confirm', newOrder);
    sortedCart = [];
    setLocalStorage('cart', sortedCart);
    cartDisplay(sortedCart);
    displayOrderData(cartItem);
    byId('total-product').innerText = 0;
    calculatePrice(sortedCart,'product-price', 'product-tax', 'total-price');
    byId('badge-count').innerText = 0;
  })


  const cartClick = (array) => {
    byId('com-cart').addEventListener('click', function(){
      cartDisplay(array);
      const badge = badgeCount(cartItem);
      byId('total-product').innerText = '';
      byId('total-product').innerText = badge;
      calculatePrice(cartItem,'product-price', 'product-tax', 'total-price');
    })
  }