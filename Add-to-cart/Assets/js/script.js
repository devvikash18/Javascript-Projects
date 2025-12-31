
const products = [
  {
    id: 1,
    name: "Vintage cinch backpack",
    image: "Assets/images/bag-1.webp",
    desc: "TEMPUS CONSECTETUR Ac dis vestibulum ut primis eleifend...",
    price: 560
  },
  {
    id: 2,
    name: "Nombined strapped backpack",
    image: "Assets/images/bag-2.webp",
    desc: "TEMPUS CONSECTETUR Ac dis vestibulum ut primis eleifend...",
    price: 154
  },
  {
    id: 3,
    name: "Lintage cinch backpack",
    image: "Assets/images/bag-3.jpg",
    desc: "PRODUCT DESCRIPTION Aenean enim nisl volutpat fusce...",
    price: 447
  },
  {
    id: 4,
    name: "Jacquard ethnic backpack",
    image: "Assets/images/bag-4.webp",
    desc: "PARTURIENT ADIPISCING Blandit parturient adipiscing...",
    price: 260
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const counter = document.getElementById("counter");

function updateCounter() {
  counter.innerHTML = cart.length; 
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const idx = cart.findIndex(item => item.id === productId);

  if (idx === -1) {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      desc: product.desc,
      quantity: 1
    });
  } else {
    cart[idx].quantity++; 
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCounter();
}

const productRow = document.getElementById("product-row");

products.forEach(product => {
  productRow.innerHTML += `
    <div class="col-xl-3 col-lg-4 col-md-6">
      <div class="card shadow">
        <img src="${product.image}" class="img-fluid">
        <div class="p-3">
          <p class="fw-semibold">${product.name}</p>
          <p><strong>$ ${product.price}.00</strong></p>
          <button class="btn btn-primary"
            onclick="addToCart(${product.id})">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
});

updateCounter();
