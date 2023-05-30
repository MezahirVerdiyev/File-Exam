let id = new URLSearchParams(window.location.search).get("id");
const BASE_URL = "  http://localhost:5200/users";
const BASE_URL2 = "http://localhost:5200/favdata";

let title = document.querySelector("#title");
let description = document.querySelector("#description");
let photo = document.querySelector("#photo");
let form = document.querySelector("form");
let button = document.querySelector("#form-btn");
let favData = [];

if (id) {
    async function getData() {
        const res = await axios(`${BASE_URL}/${id}`);
        const data = await res.data;
        favData = data;
        title.value = data.title;
        description.value = `${data.description.slice(0, 35)}...`;
    }
    description.addEventListener("focus", () => {
        description.value = favData.description;
    });
    button.innerHTML = "Edit Card";
    getData();
}

async function editCard() {
    let obj = {
        title: title.value,
        description: description.value,
        photo: photo.value ? `./assets/img/${photo.value.split("\\")[2]}` : "./assets/img/o2.png",
    };
    await axios.patch(`${BASE_URL}/${id}`, obj);
    await axios.patch(`${BASE_URL2}/${id}`, obj);
}

async function addCard() {
    let obj = {
        title: title.value,
        description: description.value,
        photo: photo.value
            ? `./assets/img/${photo.value.split("\\")[2]}`
            : "./assets/img/o2.png",
    };
    await axios.post(BASE_URL, obj);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (id) {
        editCard();
    } else {
        addCard();
    }
    window.location = "index.html";
});


let menuBtn = document.querySelector(".menu-btn");
let headernav = document.querySelector(".headernav");
let faXmark = document.querySelector(".fa-xmark");

menuBtn.addEventListener("click", () => {
    headernav.style.display = "flex";
    faXmark.style.display = "block";
    menuBtn.style.display = "none";
});

faXmark.addEventListener("click", () => {
    headernav.style.display = "none";
    faXmark.style.display = "none";
    menuBtn.style.display = "block";
});