let monitor = document.querySelector("#monitor");
let UIstats = {
    "open": false,
    "shop": [false, false, false, false],
    "row": {
        1: [false, false, false, false, false, false, false, false, false, false],
        2: [false, false, false, false, false, false, false, false, false, false],
        3: [false, false, false, false, false, false, false, false, false, false],
        4: [false, false, false, false, false, false, false, false, false, false],
    }
}
document.addEventListener("DOMContentLoaded", () => {
    handleUIEvents(monitor, UIstats, items);
})
function handleUIEvents(monitor, stats, items) {
    let /**@type {HTMLElement} */inventory = monitor.querySelector("#inventory");
    inventoryEvents(stats, inventory, items);
}
function refreshShop(stats, inventory, items) {
    let refresh = inventory.querySelector("#Refresh");
    let keys = []
    Object.keys(items).forEach(key => {
        keys.push(key)
    })
    stats.shop.forEach((el, index) => {
        stats.shop[index] = items[keys[Math.floor(Math.random() * keys.length)]]
    })
    refresh.addEventListener("click", (event) => {
        stats.shop.forEach((el, index) => {
            stats.shop[index] = items[keys[Math.floor(Math.random() * keys.length)]]
        })
        updateShopUI(stats, inventory, items);
    })
    updateShopUI(stats, inventory, items);
}
function inventoryEvents(stats, inventory, items) {
    openClose(stats, inventory);
    refreshShop(stats, inventory, items);
    updateInventoryUI(stats, inventory, items);
}
function updateInventoryUI(stats, inventory) {
    Object.keys(stats.row).forEach((key) => {
        let obj = stats.row[key];
        let line = inventory.querySelector(`#_${key - 1}`);
        obj.forEach((el, index) => {
            if (el) {
                if (`i${line.children[index].src.split("i")[1]}` != `images/${el.img}`) {
                    line.children[index].src = `images/${el.img}`
                }
            }
        })
    })
}
function updateShopUI(stats, inventory, items) {
    let shop = inventory.querySelector("#shop");
    stats.shop.forEach((el, index) => {
        if (el) {
            if (`i${shop.children[index].src.split("i")[1]}` != `images/${el.img}`) {
                shop.children[index].src = `images/${el.img}`
            }
        }
    })
}
function openClose(stats, inventory) {
    let openclose = inventory.querySelector("#open-close");
    if (stats.open && inventory.classList.contains("closed")) {
        inventory.classList.replace("closed", "opened")
    } else if (!stats.open && inventory.classList.contains("opened")) {
        inventory.classList.replace("opened", "closed")
    }
    openclose.addEventListener("click", (event) => {
        stats.open = !stats.open
        if (stats.open && inventory.classList.contains("closed")) {
            inventory.classList.replace("closed", "opened")
        } else if (!stats.open && inventory.classList.contains("opened")) {
            inventory.classList.replace("opened", "closed")
        }
    })
}