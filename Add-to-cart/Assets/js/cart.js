
function updateUI() {
  cartContainer.innerHTML = "";

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;

    cartContainer.innerHTML += `
      <div class="row mb-4">
        <div class="col-4">
          <img src="${item.image}" class="img-fluid">
        </div>
        <div class="col-8">
          <h4>${item.name}</h4>
          <p>${item.desc}</p>

          <div class="d-flex align-items-center gap-2">
            <button class="minus" data-id="${item.id}">-</button>
            <span class="fw-bold">${item.quantity}</span>
            <button class="plus" data-id="${item.id}">+</button>
          </div>

          <p>$ ${item.price}.00</p>
          <p class="text-success">Subtotal: $ ${subtotal}.00</p>
        </div>
      </div>
    `;
  });

  counter.innerHTML = cart.length; // 👈 unique products
  localStorage.setItem("cart", JSON.stringify(cart));
}
