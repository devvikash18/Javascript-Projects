const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-container");
const counter = document.getElementById("counter");
const cartTotalEl = document.getElementById("cart-total");

document.addEventListener("DOMContentLoaded", () => {
  function updateUI() {
    cartContainer.innerHTML = "";

    let totalQty = 0;
    let cartTotal = 0;

    cart.forEach(item => {
      const subtotal = item.price * item.quantity;
      totalQty += item.quantity;
      cartTotal += subtotal;

      cartContainer.innerHTML += `
        <div class="row mb-4 align-items-center">
          <div class="col-4">
            <img src="${item.image}" class="img-fluid" height = "459px" width = "360px" >
          </div>
          <div class="col-8">
            <h4 class ="fw-bold fs-2">${item.name}</h4>
            <p>${item.desc}</p>

            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-sm btn-outline-secondary minus" data-id="${item.id}">-</button>
              <span class="fw-bold">${item.quantity}</span>
              <button class="btn btn-sm btn-outline-secondary plus" data-id="${item.id}">+</button>
            </div>

            <p class="mt-2 fw-semibold text-danger">Price: $ ${item.price}.00</p>
            <p class="text-success fw-bold">
              Subtotal: $ ${subtotal}.00
            </p>
          </div>
        </div>
      `;
    });

    counter.innerHTML = totalQty;
    cartTotalEl.innerHTML = `$ ${cartTotal}.00`;

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // ================= BUTTON EVENTS =================
  document.addEventListener("click", e => {
    if (e.target.classList.contains("plus")) {
      const id = Number(e.target.dataset.id);
      const item = cart.find(p => p.id === id);
      item.quantity++;
      updateUI();
    }

    if (e.target.classList.contains("minus")) {
      const id = Number(e.target.dataset.id);
      const itemIndex = cart.findIndex(p => p.id === id);

      cart[itemIndex].quantity--;

      if (cart[itemIndex].quantity === 0) {
        cart.splice(itemIndex, 1); // remove product
      }

      updateUI();
    }
  });

  updateUI();
});
