let phoneData;
let count = 0;
let tax = 0;
let productPrice = 0;
let cart = [];
fetch("../data.json")
  .then(res => res.json())
  .then(data => {
    phoneData = data;
    displayPhone(data)
  });

const displayPhone = (data) => {
  const mainDiv = document.getElementById("main");
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

                <button onclick="handleBuyNow(${id})" class="btn btn-primary"><i class="fa-sharp fa-solid fa-bag-shopping mr-2"></i>Buy Now</button>
              </div>
            </div>
          </div>
        `
    mainDiv.appendChild(div);
  });
};
const handleModal = (id) => {
  const product = phoneData.find(item => item.id == id);
  const { name, price, img } = product
  const modalContainer = document.getElementById("modal");
  modalContainer.innerHTML = `
    <div class="modal-box relative">
            <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <img src="${img}" class="w-80 h-[320px] mx-auto font-bold" alt="">
            <div class="px-4 py-2 flex flex-col gap-3">
              <h1 class="text-xl"><span class="text-violet-600 font-bold">Product:</span> ${name}</h1>
              <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam non beatae
                pariatur, aut ab animi ad quos illo itaque labore ex fugit, unde voluptatibus fugiat optio harum. Aut
                accusantium, repellendus commodi laborum aliquid dolor nesciunt illum vel, deleniti nostrum ipsa?</p>
              <h1 class="text-xl text-violet-600 font-bold">Features:</h1>
              <h2 class="text-lg"><span class="text-violet-600">Ram: </span>6 GB, <span class="text-violet-600">Storage:
                </span>256 GB</h2>
              <h1 class="text-xl"><span class="text-violet-600 font-bold">Price: </span>$${price}</h1>

            </div>
          </div>
    
    `
}
const handleBuyNow = (id) => {
  count++
  const product = phoneData.find(item => item.id == id);
  const { id: productId, name, price, img } = product
  cart.push(product);
  productPrice = productPrice + price;
   tax = productPrice * 0.04;
  const localData = getLocalStorage("cart")
  setLocalStorage("cart", [...localData, product])
  const CartItems = document.getElementById("cart");
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="flex justify-between items-center px-6 py-3 rounded-lg bg-slate-200">
  <img src="${img}" class="w-10" alt="phone">
  <h1 class="font-semibold">${name}</h1>
  <h1 class="border-2 border-black rounded px-1">1</h1>
  <span onclick="handleRemove('${productId}')">
  <i  class="fa-solid fa-trash-can text-red-600 cursor-pointer"></i>
  </span>
</div>
  `
  CartItems.appendChild(div);
  document.getElementById("badge").innerText = count;
  document.getElementById("count").innerText = count;
  document.getElementById("itemPrice").innerText = productPrice;
  document.getElementById("tax").innerText = tax;
  document.getElementById("total-price").innerText = productPrice + tax;
};
const clearCart = () => {
  document.getElementById("cart").innerHTML = ``;
  document.getElementById("badge").innerText = 0;
  count = 0;
  document.getElementById("count").innerText = 0;
  document.getElementById("itemPrice").innerText = 0;
  document.getElementById("tax").innerText = 0;
  document.getElementById("total-price").innerText = 0;
};
const handleRemove = (id) => {
  const CartItem = document.getElementById("cart");
  CartItem.innerHTML = "";
  count--;
  const product = cart.filter(item => item.id != id);
  cart = product;
  setLocalStorage("cart", product);
  product.forEach((data) => {
    const { name, price, img, id } = data;
    productPrice = productPrice - price;
   document.getElementById("tax").innerText = tax;
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="flex justify-between items-center px-6 py-3 rounded-lg bg-slate-200">
    <img src="${img}" class="w-10" alt="phone">
    <h1 class="font-semibold">${name}</h1>
    <h1 class="border-2 border-black rounded px-1">1</h1>
    <i onclick="handleRemove('${id}')" class="fa-solid fa-trash-can text-red-600 cursor-pointer"></i>
  </div>
    `;
    CartItem.appendChild(div);
  });

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
function displayPreviousCart() {
  const localData = getLocalStorage("cart");
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