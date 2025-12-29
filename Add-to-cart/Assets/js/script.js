const products = [
  {
    id: 1,
    name: "Vintage cinch backpack",
    image: "./images/bag-1.webp",
    price: 560.00,
    colors: ["#b87333", "#6a8f5f"]
  },
  {
    id: 2,
    name: "Nombined strapped backpack",
    image: "./images/bag-2.webp",
    price: 54.00,
    colors: ["#6a8f5f", "#333", "#b87333"]
  },
  {
    id: 3,
    name: "Lintage cinch backpack",
    image: "./images/bag-3.jpg",
    price: 447.00,
    colors: []
  },
  {
    id: 4,
    name: "Jacquard ethnic backpack",
    image: "./images/bag-4.webp",
    price: 260.00,
    colors: ["#000", "#fff", "#b87333"]
  }
];

let productRow = document.getElementById("product-row")

products.forEach((pro, idx) => {
  productRow.innerHTML += `
    <div class="col-6 col-sm-4 col-md-3">
        <div class="product-grid-item">
            <div class="product-image">
                <img src="./Assets/images/bag-2.webp" class="img-fluid" alt="">
            </div>
            <div class="product-element">
                <h5 class="product-title fw-semibold">${pro.name}</h5>
                <p>$ ${pro.price}</p>
                <button class="btn btn-primary">
                      add to cart <i class="ri-shopping-cart-2-line"></i>
                </button>
            </div>
        </div>
    </div>
  `
});