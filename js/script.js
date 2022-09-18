let dataSet = [];
let cartArray = [];
const fetchPhones = async () => {
    const res = await fetch('data/data.json');
    const data = await res.json();
    displayPhones(data);
    dataSet = data;
   // console.log(dataSet);
}
fetchPhones();

const displayPhones = (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    phones.forEach(phone => {
        const {id, price,img,name} = phone;
        const newPhoneCard = document.createElement('div');
        newPhoneCard.classList.add("card", "bg-base-100", "shadow-xl");
        newPhoneCard.innerHTML = `
        <div class="p-4">
            <figure><img src="${img}" class="w-full h-[300px]" alt="Shoes" /></figure>
        </div>
        <div class="card-body">
            <h2 class="card-title">${name}</h2>
            <p>$${price}</p>
            <div class="card-actions justify-between ">

                <label onclick="handleModal('${id}')" for="my-modal-3" class="modal-button btn btn-secondary btn-outline w-[45%]"><i class="fa-solid fa-circle-info mr-3"></i>Details</label>
                <button onclick="handleBuyNow('${id}')" class="btn btn-primary btn-outline w-[45%]"><iclass="fa-solid fa-bag-shopping mr-3"></i class=>Buy Now</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(newPhoneCard);
    })
}


const handleModal = (id) => {
    const phone = dataSet.find(item => item.id === id);
    const {id:phoneID, img, price, name} = phone;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <div>
        <img src="${img}" alt="">
    </div>
    <h1 class="text-2xl">Name: ${name}</h1>
    <p>Price: ${price}</p>
    <p>Product ID: ${phoneID}</p>`;
}


const handleBuyNow = (id) => {
    const cartItemContainer = document.getElementById('cart-item');
    const phone = dataSet.find(item=> item.id === id);
    const { img, name } = phone;
    if(cartArray.indexOf(phone) === -1){
        cartArray.push(phone);

        const newCartItem = document.createElement('div');
        newCartItem.classList.add("flex", "justify-between", "items-center", "bg-slate-400","p-4","rounded-md","mt-4")
    
        newCartItem.innerHTML = 
        `
        <div>
            <img src="${img}" class="w-10" alt="">
        </div>
        <p class="text-white">${name}</p>
        <input class="border-2 border-red-100 w-10 text-center rounded-md" type="text" value="1"
            readonly>
        <i class="fa-solid fa-trash text-red-700"></i>
        `;
        cartItemContainer.appendChild(newCartItem);
    } else{
        alert('Item Already Added');
        
    }

 
}