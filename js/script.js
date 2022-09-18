let sortedCart = [];


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


//fetch Data
const fetchData = async () => {
  const res = await fetch('data/data.json');
  const data = await res.json();
  displayData(data);
}
fetchData();

const displayData = (data) => {
  const cartContainer = byId('phone-container');
  data.forEach(item => {
    const {name, img, price, id} = item;
    const newCartDiv = document.createElement('div');
    newCartDiv.classList.add("card", "bg-base-100", "shadow-xl");
    newCartDiv.innerHTML = `
    <div class="p-4">
            <figure><img src="${img}" class="w-full h-[300px]" alt="Shoes" /></figure>
        </div>
        <div class="card-body">
            <h2 class="card-title">${name}</h2>
            <p>$${price}</p>
            <div class="card-actions justify-between ">
                <label onclick="handleModal('${id}')" for="my-modal-3" class="modal-button btn btn-secondary btn-outline w-[45%]"><i class="fa-solid fa-circle-info mr-3"></i>Details</label>
                <button onclick="handleBuyNow('${name}', '${price}','${img}','${id}')" class="btn btn-primary btn-outline w-[45%]"><i class="fa-solid fa-bag-shopping mr-3"></i class=>Buy Now</button>
            </div>
        </div>`;
        cartContainer.appendChild(newCartDiv);
  })
}



const handleBuyNow = (name, price, img, id) => {
  let value = 1;
  const finalObj = {
    name,
    price,
    img,
    id,
    value: value
  }
  const index = sortedCart.findIndex(index => index.id === id);
  if(index === -1){
    sortedCart.push(finalObj);
  }else{
    sortedCart[index].value += 1;
  }

  byId('badge-count').innerText = '';
  const badge = badgeCount(sortedCart);
  byId('badge-count').innerText = badge;
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

byId('com-cart').addEventListener('click', function(){
  cartDisplay(sortedCart);
  const badge = badgeCount(sortedCart);
  byId('total-product').innerText = '';
  byId('total-product').innerText = badge;
  calculatePrice(sortedCart,'product-price', 'product-tax', 'total-price');
})


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
}

const handleClearAll = () => {
  sortedCart = [];
  cartDisplay(sortedCart);

  calculatePrice(sortedCart,'product-price', 'product-tax', 'total-price');
}

