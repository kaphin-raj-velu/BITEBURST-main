// Load cart from localStorage or start empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const restaurants = [
    {
        name: "Biryani Blues",
        cuisine: "Hyderabadi Biryani, North Indian",
        image: "img/blue1.png",
        menu: [
            { item: "Hyderabadi Chicken Biryani", price: "₹280", image: "img/cb.jpg" },
            { item: "Mutton Biryani", price: "₹350", image: "img/mb.jpg" },
            { item: "Paneer Butter Masala", price: "₹220", image: "img/paneer.jpg" },
            { item: "Garlic Naan", price: "₹40", image: "img/naan.jpg" },
            { item: "Chicken 65", price: "₹200", image: "img/65.jpg" }
        ]
    },
    {
        name: "Behrouz Biryani",
        cuisine: "Mughlai, Biryani, Kebabs",
        image: "img/logo.png",
        menu: [
            { item: "Royal Chicken Biryani", price: "₹320", image: "img/bir.jpg" },
            { item: "Mutton Galouti Kebab", price: "₹250", image: "img/kebab.jpg" },
            { item: "Paneer Tikka Masala", price: "₹210", image: "img/tikka.jpg" },
            { item: "Dal Makhani", price: "₹180", image: "img/dal.jpg" },
            { item: "Butter Naan", price: "₹35", image: "img/naan.jpg" }
        ]
    },
    {
        name: "Faasos",
        cuisine: "Wraps, Rolls, Quick Bites",
        image: "img/fas.png",
        menu: [
            { item: "Paneer Wrap", price: "₹150", image: "img/wrap.jpg" },
            { item: "Chicken Seekh Roll", price: "₹180", image: "img/roll.jpg" },
            { item: "Veggie Rice Bowl", price: "₹130", image: "img/veg.jpg" },
            { item: "Chicken Rice Bowl", price: "₹180", image: "img/chicken.jpg" },
            { item: "Classic French Fries", price: "₹90", image: "img/french fries.jpg" }
        ]
    },
    {
        name: "Wow! Momo",
        cuisine: "Momos, Indian-Chinese",
        image: "img/momo.jpg",
        menu: [
            { item: "Steamed Chicken Momos", price: "₹150", image: "img/steam.jpg" },
            { item: "Veg Momos", price: "₹120", image: "img/vegmo.jpg" },
            { item: "Fried Paneer Momos", price: "₹140", image: "img/fried.jpg" },
            { item: "Schezwan Chicken Momos", price: "₹160", image: "img/chickmo.jpg" },
            { item: "Chili Garlic Noodles", price: "₹180", image: "img/noodles.jpg" }
        ]
    },
    {
        name: "Rajdhani Thali",
        cuisine: "Rajasthani & Gujarati Thalis, Vegetarian",
        image: "img/thali.png",
        menu: [
            { item: "Rajdhani Veg Thali", price: "₹250", image: "img/rajdhanivegthali.jpg" },
            { item: "Gujarati Sweet Thali", price: "₹280", image: "img/gujaratisweetthali.jpg" },
            { item: "Dal, Kadhi, Subzi (varieties)", price: "₹220", image: "img/dalkadhisubzi.jpg" },
            { item: "Roti/Chapati", price: "₹15 each", image: "img/rotichapati.jpg" },
            { item: "Rice", price: "₹30 per plate", image: "img/rice.jpg" }
        ]
    },
    {
        name: "Haldiram’s",
        cuisine: "Indian Snacks, Sweets, Street Food",
        image: "img/haldirams.png",
        menu: [
            { item: "Aloo Tikki Chaat", price: "₹80", image: "img/alootikkichaat.jpg" },
            { item: "Samosa", price: "₹30", image: "img/samosa.jpg" },
            { item: "Rajma Chawal", price: "₹150", image: "img/rajmachawal.jpg" },
            { item: "Rasgulla", price: "₹50 per piece", image: "img/rasgulla.jpg" },
            { item: "Kaju Katli", price: "₹120 per 100g", image: "img/kajukatli.jpg" }
        ]
    },
    {
        name: "The Belgian Waffle Co.",
        cuisine: "Desserts, Indian Fusion Desserts",
        image: "img/wAFFLE.jpg",
        menu: [
            { item: "Classic Belgian Waffle", price: "₹180", image: "img/classicbelgianwaffle.jpg" },
            { item: "Chocolate Overload Waffle", price: "₹220", image: "img/chocolateoverloadwaffle.jpg" },
            { item: "Red Velvet Waffle", price: "₹200", image: "img/redvelvetwaffle.jpg" },
            { item: "Strawberry & Cream Waffle", price: "₹190", image: "img/strawberrycreamwaffle.jpg" },
            { item: "Cold Coffee", price: "₹150", image: "img/coldcoffee.jpg" }
        ]
    },
    {
        name: "KFC India",
        cuisine: "Fried Chicken, Wraps, Fries",
        image: "img/kfc.png",
        menu: [
            { item: "Hot & Crispy Chicken", price: "₹250 (2 pcs)", image: "img/hotcrispychicken.jpg" },
            { item: "Zinger Burger", price: "₹150", image: "img/zingerburger.jpg" },
            { item: "Veg Strips", price: "₹120", image: "img/vegstrips.jpg" },
            { item: "Masala Fries", price: "₹90", image: "img/masalafries.jpg" },
            { item: "Chicken Popcorn", price: "₹180", image: "img/chickenpopcorn.jpg" }
        ]
    }
];

const restaurantContainer = document.getElementById("restaurant-container");
const menuSection = document.getElementById("menu-section");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cart-count");

// Update Cart Count
function updateCartCount() {
    cartCount.innerText = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

// Display Restaurants
function displayRestaurants(restaurantsList) {
    restaurantContainer.innerHTML = "";
    restaurantsList.forEach(res => {
        const card = document.createElement("div");
        card.className = "col-md-3";
        card.innerHTML = `
          <div class="card restaurant-card p-3 shadow-sm">
            <img src="${res.image}" alt="${res.name}">
            <h5 class="card-title mt-2">${res.name}</h5>
            <p class="card-text">${res.cuisine}</p>
          </div>
        `;
        card.onclick = () => displayMenu(res);
        restaurantContainer.appendChild(card);
    });
}

// Display Menu
function displayMenu(restaurant) {
    let menuHTML = `<h3 class="mt-4">${restaurant.name} Menu</h3><div class="list-group">`;
    restaurant.menu.forEach(item => {
        menuHTML += `
          <div class="list-group-item d-flex justify-content-between align-items-center menu-item">
            <div class="d-flex align-items-center">
              <img src="${item.image}" alt="${item.item}" style="height:60px;width:60px;border-radius:8px;margin-right:10px;">
              <span class="menu-item-name">${item.item}</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span>${item.price}</span>
              <button class="btn btn-add-cart btn-sm">Add to Cart</button>
            </div>
          </div>
        `;
    });
    menuHTML += "</div>";
    menuSection.innerHTML = menuHTML;
    menuSection.scrollIntoView({ behavior: "smooth" });

    // Add to Cart functionality
    const buttons = menuSection.querySelectorAll(".btn-add-cart");
    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const menuItem = restaurant.menu[index];
            const existing = cart.find(i => i.restaurant === restaurant.name && i.item === menuItem.item);
            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
            } else {
                cart.push({ restaurant: restaurant.name, ...menuItem, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            alert(`${menuItem.item} added to cart from ${restaurant.name}`);
        });
    });
}

// Search
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = restaurants.filter(res => res.name.toLowerCase().includes(query));
    displayRestaurants(filtered);
});

// Initial display
displayRestaurants(restaurants);
updateCartCount();


