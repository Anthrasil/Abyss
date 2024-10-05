let monitor = document.querySelector("#monitor");
let UIstats = {
    "open": false,
    "shop": [false, false, false, false],
    "row": {
        1: [items["normalSword"], false, false, false, false, false, false, false, false, false],
        2: [false, false, false, false, false, false, false, false, false, false],
        3: [false, false, false, false, false, false, false, false, false, false],
        4: [false, false, false, false, false, false, false, false, false, false],
    },
    "handitem": false,
    "coins": 100,
    "types": [["damage", "sword.webp"]],
}
document.addEventListener("DOMContentLoaded", () => {
    handleUIEvents(monitor, UIstats, items);
})
document.addEventListener("click", () => {
    let description = monitor.querySelector("#description");
    updatedescription({ x: 0, y: 0 }, description);
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
        if (stats.coins < 1) return;
        stats.coins--
        stats.shop.forEach((el, index) => {
            stats.shop[index] = items[keys[Math.floor(Math.random() * keys.length)]]
        })
        updateShopUI(stats, inventory, items);
        updateCoinUI(stats, inventory)
    })
    updateShopUI(stats, inventory, items);
}
function inventoryEvents(stats, inventory, items) {
    updateCoinUI(stats, inventory)
    openClose(stats, inventory);
    refreshShop(stats, inventory, items);
    ShopUIclicked(stats, inventory, items);
    inventoryUIclicked(stats, inventory, items);
    eventHanditemUI(inventory)
    updateInventoryUI(stats, inventory, items);
    eventdescription(stats, inventory)
}
function inventoryUIclicked(stats, inventory, items) {
    Object.keys(stats.row).forEach((key) => {
        let obj = stats.row[key];
        let line = inventory.querySelector(`#line${key - 1}`);
        obj.forEach((el, index) => {
            line.children[index].addEventListener("click", (event) => {
                changeHanditemInventory(key, index, stats, inventory)
                updateInventoryUI(stats, inventory, items);
            })
        })
    })
}
function changeHanditemInventory(row, place, stats, inventory) {
    let newHanditem = stats.row[row][place];
    stats.row[row][place] = stats.handitem;
    stats.handitem = newHanditem;
    updateHanditemUI(stats, inventory)
}
function eventHanditemUI(inventory) {
    let handitem = inventory.querySelector("#handitem");
    document.addEventListener("mousemove", (event) => {
        handitem.style.left = `${event.clientX - handitem.width / 2}px`;
        handitem.style.top = `${event.clientY - handitem.height / 2}px`;
    })
}
function ShopUIclicked(stats, inventory, items) {
    stats.shop.forEach((el, index) => {
        let obj = inventory.querySelector("#shop").children[index];
        obj.addEventListener("click", (event) => {
            if (!stats.handitem) {
                let item = stats.shop[index];
                if (item) {
                    changeHanditemShop(index, stats, inventory, item);
                    updateShopUI(stats, inventory, items);
                }
            }
        })
    })

}
function changeHanditemShop(place, stats, inventory, item) {
    if (stats.coins < item.price) return;
    stats.coins -= item.price;
    updateCoinUI(stats, inventory);
    let newHanditem = stats.shop[place];
    stats.shop[place] = stats.handitem;
    stats.handitem = newHanditem;
    updateHanditemUI(stats, inventory);
}
function updateCoinUI(stats, inventory) {
    let Coins = inventory.querySelector("#Coins");
    if (`${stats.coins}` !== Coins.innerText) {
        Coins.innerText = `${stats.coins}`;
    }
}
function updateHanditemUI(stats, inventory) {
    let handitem = inventory.querySelector("#handitem");
    if (stats.handitem) {
        if (handitem.src !== `images/${stats.handitem.img}`) {
            handitem.src = `images/${stats.handitem.img}`;
        }
    } else {
        handitem.src = "";
    }
}
function updateInventoryUI(stats, inventory) {
    Object.keys(stats.row).forEach((key) => {
        let obj = stats.row[key];
        let line = inventory.querySelector(`#line${key - 1}`);
        obj.forEach((el, index) => {
            if (el) {
                if (line.children[index].src !== `images/${el.img}`) {
                    line.children[index].src = `images/${el.img}`;
                }
            } else {
                line.children[index].src = ""
            }
        })
    })
}
function eventdescription(stats, /**@type {HTMLElement} */inventory) {
    let description = inventory.querySelector("#description");
    let show = {
        x: 0,
        y: 0,
        text: "",
        headline: "",
        type: "",
        value: "",
    }
    Object.keys(stats.row).forEach((key) => {
        let obj = stats.row[key]
        let line = inventory.querySelector(`#line${key - 1}`);
        obj.forEach((el, index) => {
            line.children[index].addEventListener("contextmenu", (event) => {
                event.preventDefault();
                if (!stats.row[key][index].stats) {
                    updatedescription(show, description, stats.types);
                    return;
                }
                show.x = line.children[index].getBoundingClientRect().x;
                show.y = line.children[index].getBoundingClientRect().y;
                show.text = stats.row[key][index].description;
                show.headline = stats.row[key][index].name;
                show.type = stats.row[key][index].type;
                show.value = stats.row[key][index].stats[show.type];
                updatedescription(show, description, stats.types);
            })
        })
    })
    stats.shop.forEach((el, index) => {
        let obj = inventory.querySelector("#shop").children[index];
        obj.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            if (!stats.shop[index].stats) {
                updatedescription(show, description, stats.types);
                return;
            }
            show.x = obj.getBoundingClientRect().x;
            show.y = obj.getBoundingClientRect().y;
            show.text = stats.shop[index].description;
            show.headline = stats.shop[index].name;
            show.type = stats.shop[index].type;
            show.value = stats.shop[index].stats[show.type];
            updatedescription(show, description, stats.types);
        })
    })
    updatedescription(show, description);
}
function updatedescription(show, /**@type {HTMLElement} */description, types) {
    let stats = description.querySelector("#descriptionstat");
    let image = stats.querySelector("#descriptionimage");
    if (show.x == 0 && show.y == 0) {
        description.style.display = "none"
        image.src = "";
    } else {
        Object.keys(show).forEach((key) => {
            if (!show[key]) return
        })
        description.style.display = "block"
        description.style.left = `${show.x}px`
        description.style.top = `${show.y + description.getBoundingClientRect().height / 2}px`
        let headline = description.querySelector("#descriptionheadline")
        headline.innerText = show.headline
        let text = description.querySelector("#descriptiontext")
        text.innerText = show.text;
        let value = stats.querySelector("#descriptionvalue");
        if (!show.value) {
            value.innerText = "";
        }
        if (!show.type) {
            image.src = "";
        }
        types.forEach(type => {
            if (type[0] = show.type) {
                image.src = `images/sword.webp`;
                value.innerText = show.value
            }
        })
    }
}
function updateShopUI(stats, /**@type{HTMLElement} */inventory, items) {
    let shop = inventory.querySelector("#shop");
    let coinLine = inventory.querySelector(".Coinline");
    stats.shop.forEach((el, index) => {
        if (el) {
            if (shop.children[index].src !== `images/${el.img}`) {
                shop.children[index].src = `images/${el.img}`
            }
            if (coinLine.children[index].querySelector("p").innerText !== `${el.price}`) {
                coinLine.children[index].querySelector("p").innerText = `${el.price}`
            }
        } else {
            shop.children[index].src = ""
            coinLine.children[index].querySelector("p").innerText = "0"
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