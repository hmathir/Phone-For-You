

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
  setLocalStorage('cart', sortedCart);

  byId('badge-count').innerText = '';
  const badge = badgeCount(sortedCart);
  byId('badge-count').innerText = badge;
}


cartClick(sortedCart);


byId('badge-count').innerText = '';
const badge = badgeCount(sortedCart);
byId('badge-count').innerText = badge;

