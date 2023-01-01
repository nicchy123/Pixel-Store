let count = 0;
let tax = 0;
let productPrice = 0;
let cart = [];

const localData = getLocalStorage("cart");
const localOrder = getLocalStorage("cart");
const displayPhone = (data) => {
    const mainDiv = document.getElementById("main");
    const orderMessage = document.getElementById("order-msg");
    if(localOrder.length > 0){
        orderMessage.innerHTML = `
        <h1 class="text-xl text-center mb-6">THANK YOU! FOR YOUR ORDER</h1>
        `
    }else{
        orderMessage.innerHTML = `
        <h1 class="text-xl text-center mb-6">NO ORDER FOUND</h1>
        `
    }
    data.forEach(element => {
      const { id, price, img, name } = element;
      const div = document.createElement("div");
      div.innerHTML = `
          <div class="card card-compact bg-base-100 shadow-2xl">
              <div class="p-4">
                <figure><img class="rounded-lg  h-72" src="${img}" alt="Phones" /></figure>
              </div>
              <div class="card-body">
                <div class="flex justify-between">
                  <h2 class="card-title">${name}</h2>
                  <div>
                    <span><i class="fa-solid fa-heart text-slate-600 mr-2 text-2xl"></i></span>
                    <span><i class="fa-regular fa-square-minus text-red-600 text-2xl"></i></span>
                  </div>
                </div>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <h1 class="text-xl font-semibold"><span class="text-violet-600">Price</span>: $${price}</h1>
                <div class="card-actions justify-between">
                  <label onclick="handleModal(${id})" for="my-modal-3" class="btn btn-primary btn-outline"><i
                      class="fa-solid fa-circle-info mr-2"></i>See Details</button></label>
                </div>
              </div>
            </div>
          `
      mainDiv.appendChild(div);
    });
  };
  displayPhone(localData);


  function displayPreviousCart() {
    const cartItems = document.getElementById("cart");
    cartItems.innerHTML = "";
    count = localData.length || 0;
    cart = localData;
    localData.forEach(data => {
      const { name, price, img, id } = data;
      productPrice = productPrice + price;
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="flex justify-between items-center px-6 py-3 rounded-lg bg-slate-200">
      <img src="${img}" class="w-10" alt="phone">
      <h1 class="font-semibold">${name}</h1>
      <h1 class="border-2 border-black rounded px-1">1</h1>
      <i onclick="handleRemove('${id}')" class="fa-solid fa-trash-can text-red-600 cursor-pointer"></i>
    </div>
      `;
      cartItems.appendChild(div);
    })
    document.getElementById("badge").innerText = "";
    document.getElementById("badge").innerText = count;
  
    document.getElementById("count").innerText = "";
    document.getElementById("count").innerText = count;
  
    document.getElementById("itemPrice").innerText = "";
    document.getElementById("itemPrice").innerText = productPrice;
  
    document.getElementById("tax").innerText = "";
    document.getElementById("tax").innerText = tax;
  
    document.getElementById("total-price").innerText = "";
    document.getElementById("total-price").innerText = productPrice + tax;
  }
  displayPreviousCart();