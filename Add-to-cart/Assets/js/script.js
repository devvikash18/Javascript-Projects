const products = [
  {
    id: 1,
    name: "Vintage cinch backpack",
    image: "./Assets/images/bag-1.webp",
    desc: "TEMPUS CONSECTETUR Ac dis vestibulum ut primis eleifend at neque at ornare mus nostra non senectus magna natoque porta scelerisque molestie taciti lobortis torquent ullamcorper a ullamcorper. Hac suspendisse varius ut...",
    price: 560,
    colors: ["#b87333", "#6a8f5f"]
  },
  {
    id: 2,
    name: "Nombined strapped backpack",
    image: "./Assets/images/bag-2.webp",
    desc: "TEMPUS CONSECTETUR Ac dis vestibulum ut primis eleifend at neque at ornare mus nostra non senectus magna natoque porta scelerisque molestie taciti lobortis torquent ullamcorper a ullamcorper. Hac suspendisse varius ut...",
    price: 154,
    colors: ["#6a8f5f", "#333", "#b87333"]
  },
  {
    id: 3,
    name: "Lintage cinch backpack",
    image: "./Assets/images/bag-3.jpg",
    desc: "PRODUCT DESCRIPTION Aenean enim nisl volutpat fusce commodo dui hac in a vestibulum diam convallis dis parturient condimentum massa ac sagittis sed dapibus ullamcorper blandit parturient arcu urna cursus suscipit diam...",
    price: 447,
    colors: []
  },
  {
    id: 4,
    name: "Jacquard ethnic backpack",
    image: "./Assets/images/bag-4.webp",
    desc: "PARTURIENT ADIPISCING Blandit parturient adipiscing faucibus fringilla vestibulum ultrices integer dolor parturient parturient at porta platea inceptos. Habitant dui ut fringilla eleifend tincidunt scelerisque porta a tortor adipiscing ullamcorper etiam imperdiet...",
    price: 260,
    colors: ["#000", "#fff", "#b87333"]
  }
];

const cart = JSON.parse( localStorage.getItem("cart")) || []
let counter = document.getElementById("counter")

function updateCounter() {
  counter.innerHTML = cart.length;
}

function addToCart(productId){
  let product = products.find((pro) => {
    return pro.id === productId;
  })

  let idx = cart.findIndex( (pro) => {
    return pro.id == productId;
  })

  if(idx == -1){
    product.quantity = 1;
    cart.push(product)
  }else{
    cart[idx].quantity ++ ;
  }

  localStorage.setItem("cart", JSON.stringify (cart))
  updateCounter();
  
}

let productRow = document.getElementById("product-row")

products.forEach((product, idx) => {
  productRow.innerHTML += `
    <div class="col-xl-3 col-lg-4 col-md-6">
        <div class="product-grid-item card shadow">
          <div class="product-image">
            <img src="${product.image}" class="img-fluid" alt="">
          </div>
            <div class="product-element text-start mx-3">
              <p class="product-title fw-semibold"> ${product.name}</p>
                <p><strong>$ ${product.price}.00</strong> </p>
            <button class="btn btn-primary mb-3" onclick= "addToCart(${product.id})">
                Add to cart <i class="ri-shopping-cart-2-line"></i>
            </button>
          </div>
       </div>
     </div>
  `
});

updateCounter();