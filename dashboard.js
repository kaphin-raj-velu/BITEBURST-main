// Check admin login
if (sessionStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem("adminLoggedIn");
    window.location.href = "admin-login.html";
});

// Example restaurant & food data
const restaurants = [
    {
        name: "Biryani Blues",
        menu: [
            { item: "Hyderabadi Chicken Biryani", price: 280 },
            { item: "Mutton Biryani", price: 350 }
        ]
    },
    {
        name: "Faasos",
        menu: [
            { item: "Paneer Wrap", price: 150 },
            { item: "Chicken Rice Bowl", price: 180 }
        ]
    }
];

// Elements
const foodListEl = document.getElementById("foodList");
const lineCtx = document.getElementById("ordersLineChart").getContext("2d");
const barCtx = document.getElementById("ordersBarChart").getContext("2d");
const pieCtx = document.getElementById("ordersPieChart").getContext("2d");

let lineChart, barChart, pieChart;

// Display foods
function displayFoods() {
    foodListEl.innerHTML = "";
    restaurants.forEach(res => {
        res.menu.forEach(food => {
            const card = document.createElement("div");
            card.className = "col-md-3";
            card.innerHTML = `
                <div class="card shadow-sm">
                    <h6>${food.item}</h6>
                    <p>₹${food.price}</p>
                    <small>${res.name}</small>
                </div>
            `;
            foodListEl.appendChild(card);
        });
    });
}

// Get orders from localStorage
function getOrders() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Prepare chart data
function prepareChartData() {
    const orders = getOrders();
    const labels = [];
    const counts = [];

    restaurants.forEach(res => {
        res.menu.forEach(food => {
            labels.push(food.item);
            const count = orders.filter(o => o.item === food.item).reduce((sum, o) => sum + (o.quantity || 1), 0);
            counts.push(count);
        });
    });

    return { labels, counts };
}

// Render charts
function renderCharts() {
    const { labels, counts } = prepareChartData();

    if (lineChart) lineChart.destroy();
    lineChart = new Chart(lineCtx, {
        type: "line",
        data: { labels, datasets: [{ label: "Orders", data: counts, borderColor: "blue", fill: true }] },
    });

    if (barChart) barChart.destroy();
    barChart = new Chart(barCtx, {
        type: "bar",
        data: { labels, datasets: [{ label: "Orders Count", data: counts, backgroundColor: "orange" }] },
    });

    if (pieChart) pieChart.destroy();
    pieChart = new Chart(pieCtx, {
        type: "pie",
        data: {
            labels,
            datasets: [{ label: "Orders Distribution", data: counts, backgroundColor: labels.map(() => `hsl(${Math.random()*360},70%,60%)`) }]
        }
    });
}

// Initial render
displayFoods();
renderCharts();

// Real-time updates across tabs
window.addEventListener("storage", () => renderCharts());
