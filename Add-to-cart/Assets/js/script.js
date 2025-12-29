const products = [
  {
    name: "Vintage cinch backpack",
    image: "./images/bag-1.webp",
    price: 560,
    colors: ["#b87333", "#6a8f5f"]
  },
  {
    name: "Combined strapped backpack",
    image: "./images/bag-2.webp",
    price: 54,
    colors: ["#6a8f5f", "#333", "#b87333"]
  },
  {
    name: "Vintage cinch backpack",
    image: "./images/bag-3.jpg",
    price: 447,
    colors: []
  },
  {
    name: "Jacquard ethnic backpack",
    image: "./images/bag-4.webp",
    price: 260,
    colors: ["#000", "#fff", "#b87333"]
  }
];

let productRow = document.getElementById("product-row")

products.forEach((pro, idx) => {
  productRow.innerHTML += `
    <div class="col-6 col-sm-4 col-md-3">
        <div class="product-grid-item">
            <div class="product-image">
                <img src="./Assets/images/bag-1.webp" class="img-fluid" alt="">
            </div>
            <div class="product-element">
                <p class="product-title fw-semibold">Vintage cinch backpack</p>
                <p>Price</p>
            </div>
        </div>
    </div>
  `
});