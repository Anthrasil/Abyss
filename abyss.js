let monitor = document.querySelector("#monitor");
let UIstats = {
    "open": true,
}
setInterval(function () {
    rutin(monitor, UIstats);
}, 1)
function rutin(monitor, UIstats) {
    handleUIEvents(monitor, UIstats);
}
function handleUIEvents(monitor, stats) {

    let /**@type {HTMLElement} */inventory = monitor.querySelector("#inventory");
    inventoryEvent(stats, inventory);
    refreshShop(inventory);
}
function refreshShop(inventory) {
    let refresh = inventory.querySelector("#Refresh");
    refresh.addEventListener("click", (event) => {

    })
}
function inventoryEvent(stats, inventory) {
    let openclose = inventory.querySelector("#open-close");
    openclose.addEventListener("click", (event) => {
        stats.open = !stats.open
    }, { once: true })
    if (stats.open && inventory.classList.contains("closed")) {
        inventory.classList.replace("closed", "opened")
    }
    if (!stats.open && inventory.classList.contains("opened")) {
        inventory.classList.replace("opened", "closed")
    }
}