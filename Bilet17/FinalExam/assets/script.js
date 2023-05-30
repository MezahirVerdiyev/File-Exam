const BASE_URL = "http://localhost:5200/users";
const BASE_URL2 = "http://localhost:5200/favdata";

let row = document.querySelector(".about-section-div");
let search = document.querySelector(".search-input");
let sort = document.querySelector(".sort-btn");
let load = document.querySelector(".load-btn");

let menuBtn = document.querySelector(".menu-btn");
let burgerModal = document.querySelector(".headernav");
let faXmark = document.querySelector(".fa-xmark");
let yuxariOx = document.querySelector(".yuxari-ox");

let allData = [];
let filtered = [];
let defaultArr = [];
let favData;

let bool = true;
let num = 3;

async function getAllData() {
    row.innerHTML = "";
    const res = await axios(BASE_URL);
    const data = await res.data;
    allData = data;
    filtered =
        filtered.length || search.value
            ? filtered.slice(0, num)
            : data.slice(0, num);
    filtered.forEach((element) => {
        row.innerHTML += `
    <span class="col col-12 col-lg-4">
    <div class="about-card">
      <img src="${element.photo}" />
      <h5>${element.title}</h5>
      <p>${element.description}</p>
      <div class="buttons">
      <div class="about-btn-div">
      <a href="add.html?id=${element.id}" class="btn btn-success">Edit</a>
      <a href="details.html?id=${element.id}" class="btn btn-warning">Details</a>
      </div>
      <div class="about-btn-div">
      <button class="btn btn-danger" onclick=deleteCard(${element.id},this)>Delete</button>
      <button class="btn btn-info" onclick= addFav(${element.id})>Add Fav</button>
      </div>
      </div>
    </div>
  </span> 
        `;
    });
}

async function deleteCard(id, btn) {
    await axios.delete(`${BASE_URL}/${id}`);
    await axios.delete(`${BASE_URL2}/${id}`);
    btn.closest("span").remove();
}

async function addFav(id) {
    favData = allData.find((item) => item.id == id);
    const res2 = await axios(BASE_URL2);
    const data2 = await res2.data;
    let check = data2.find((item) => item.id == id);
    if (!check) {
        await axios.post(BASE_URL2, favData);
    } else {
        alert("Isdifadəçi Favorilərdə artıq var.Digər isdifadəçi seçməyiniz məsləhət olunur!");
    }
}

sort.addEventListener("click", (e) => {
    if (sort.innerHTML == "Ascending") {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        sort.innerHTML = "Descending";
    } else if (sort.innerHTML == "Descending") {
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        sort.innerHTML = "Default";
    } else {
        sort.innerHTML = "Ascending";
        filtered = defaultArr;
    }
    getAllData();
});

search.addEventListener("input", (e) => {
    e.preventDefault();
    filtered = allData.slice(0, num).filter((item) => {
        return item.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    defaultArr = filtered;
    getAllData();
});

load.addEventListener("click", (e) => {
    e.preventDefault();
    num += 3;
    filtered = allData.slice(0, num).filter((item) => {
        return item.title
            .toLocaleLowerCase()
            .includes(search.value.toLocaleLowerCase());
    });
    defaultArr = filtered;
    getAllData();
    if (allData.length <= num) {
        load.disabled = true;
        load.style.opacity = 0.5;
    }
});

getAllData();

menuBtn.addEventListener("click", () => {
    burgerModal.style.display = "flex";
    faXmark.style.display = "block";
    menuBtn.style.display = "none";
});

faXmark.addEventListener("click", () => {
    burgerModal.style.display = "none";
    faXmark.style.display = "none";
    menuBtn.style.display = "block";
});

function scrollFunction() {
    if (
        document.body.scrollTop > 400 ||
        document.documentElement.scrollTop > 400
    ) {
        yuxariOx.style.display = "inline-block";
    } else {
        yuxariOx.style.display = "none";
    }
}

window.addEventListener("scroll", () => {
    scrollFunction();
});