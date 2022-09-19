const orders = getLocalStorage('confirm');

const displayOrderData = (data) => {
  const cartContainer = byId('order-container');
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
            </div>
        </div>`;
        cartContainer.appendChild(newCartDiv);
  })
}
displayOrderData(orders);


const cartItem = getLocalStorage('cart');
cartClick(cartItem);

byId('badge-count').innerText = '';
const badge = badgeCount(cartItem);
byId('badge-count').innerText = badge;

  
