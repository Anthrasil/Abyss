let monitor = document.querySelector("#monitor");
let UIstats = {
    "open": true,
}
rutin(monitor, UIstats);
function rutin(monitor, UIstats) {
    handleUIEvents(monitor, UIstats);
}
function handleUIEvents(monitor, stats) {
    let /**@type {HTMLElement} */inventory = monitor.querySelector("#inventory");
    inventoryEvent(stats, inventory);
    console.log(document.event);
}
function refreshShop(inventory) {
    let refresh = inventory.querySelector("#Refresh");
    refresh.addEventListener("click", (event) => {

    })
}
function inventoryEvent(stats, inventory) {
    openClose(stats, inventory);
}
function openClose(stats, inventory) {
    let openclose = inventory.querySelector("#open-close");
    openclose.addEventListener("click", (event) => {
        stats.open = !stats.open
        if (stats.open && inventory.classList.contains("closed")) {
            inventory.classList.replace("closed", "opened")
        } else if (!stats.open && inventory.classList.contains("opened")) {
            inventory.classList.replace("opened", "closed")
        }
    })
}