// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartList = document.getElementById("cart-list");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");
const backBtn = document.getElementById("back-to-menu");

// Display cart
function displayCart() {
    cartList.innerHTML = "";
    let total = 0;

    if(cart.length === 0){
        const emptyMsg = document.createElement("li");
        emptyMsg.className = "list-group-item text-center";
        emptyMsg.innerText = "Your cart is empty!";
        cartList.appendChild(emptyMsg);
        totalPriceEl.innerText = 0;
        checkoutBtn.disabled = true;
        return;
    }

    checkoutBtn.disabled = false;

    cart.forEach((item, index) => {
        // Extract only the numeric part of price
        const match = item.price.match(/\d+/);
        const priceNum = match ? parseInt(match[0]) : 0;

        const quantity = item.quantity || 1;
        total += priceNum * quantity;

        const cartItem = document.createElement("li");
        cartItem.className = "list-group-item d-flex justify-content-between align-items-center flex-wrap";

        cartItem.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <img src="${item.image}" alt="${item.item}" style="width:60px;height:60px;border-radius:8px;">
                <div>
                    <div><strong>${item.item}</strong></div>
                    <small class="text-muted">From: ${item.restaurant}</small>
                </div>
            </div>
            <div class="d-flex align-items-center gap-2 mt-2 mt-md-0">
                <button class="btn btn-sm btn-secondary btn-decrease">-</button>
                <span>${quantity}</span>
                <button class="btn btn-sm btn-secondary btn-increase">+</button>
                <span class="ms-3">₹${priceNum * quantity}</span>
                <button class="btn btn-sm btn-danger ms-2 btn-remove">Remove</button>
            </div>
        `;

        // Increase quantity
        cartItem.querySelector(".btn-increase").addEventListener("click", () => {
            item.quantity = (item.quantity || 1) + 1;
            saveCart();
        });

        // Decrease quantity
        cartItem.querySelector(".btn-decrease").addEventListener("click", () => {
            if((item.quantity || 1) > 1){
                item.quantity -= 1;
            } else {
                cart.splice(index, 1); // remove if quantity is 1
            }
            saveCart();
        });

        // Remove item
        cartItem.querySelector(".btn-remove").addEventListener("click", () => {
            cart.splice(index, 1);
            saveCart();
        });

        cartList.appendChild(cartItem);
    });

    totalPriceEl.innerText = total;
}

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Checkout button
checkoutBtn.addEventListener("click", () => {
    if(cart.length === 0){
        alert("Your cart is empty!");
        return;
    }
    window.location.href = "checkout.html";
});

// Back to menu
backBtn.addEventListener("click", () => {
    window.location.href = "menu.html";
});

// Initial render
displayCart();
