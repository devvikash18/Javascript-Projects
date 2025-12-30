const cart = JSON.parse( localStorage.getItem("cart")) || []
let counter = document.getElementById("counter")

const cartContainer = document.getElementById("cart-container")

document.addEventListener("DOMContentLoaded", function (){
    counter.innerHTML = cart.length;

    cart.forEach ((prdct, idx) => {
        cartContainer.innerHTML += `
        <div class="row ">
                <div class="col-4">
                    <div>
                        <img src="${prdct.image}" alt="" class = "image-fluid">
                    </div>
                </div>
                <div class="col-8">
                    <div>
                        <h2 class="product-name fs-1 text-dark">${prdct.name}</h2>
                        <p class="price fs-4 text-success fw-semibold">$154.00</p>
                        <p class="subtitle">TEMPUS CONSECTETUR Ac dis vestibulum ut primis eleifend at neque at ornare mus<br> nostra non senectus magna natoque porta scelerisque molestie taciti lobortis <br> torquent ullamcorper a ullamcorper. Hac suspendisse varius ut...</p>
                        <div class="quantity">
                            <input type="button" value="-" class="minus">
                            <input type="number" step="1" min="1" max="999" name="quantity" value="1" size="4" class="text-center fw-bold mb-0">
                            <input type="button" value="+" class="minus">
                        </div>

                    </div>
                </div>
            </div>
        `

    })

})