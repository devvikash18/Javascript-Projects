const cart = JSON.parse( localStorage.getItem("cart")) || []
let counter = document.getElementById("counter")

document.addEventListener("DOMContentLoaded", function (){
    counter.innerHTML = cart.length;

})