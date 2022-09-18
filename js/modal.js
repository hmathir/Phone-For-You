const handleModal = (id) => {
    const phone = dataSet.find(item => item.id === id);
    const {id:productID, img, price, name} = phone;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <div>
        <img src="${img}" alt="">
    </div>
    <h1 class="text-2xl">Name: ${name}</h1>
    <p>Price: ${price}</p>
    <p>Product ID: ${productID}</p>`;
}