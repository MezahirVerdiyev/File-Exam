let id = new URLSearchParams(window.location.search).get("id");
const BASE_URL = " http://localhost:5200/users";
let row = document.querySelector(".row");
console.log(id);
async function getAllData() {
    row.innerHTML = "";
    const res = await axios(`${BASE_URL}/${id}`);
    const element = await res.data;
    row.innerHTML = `
    <div class="col col-4"></div>
    <span class="col col-4">
    <div class="about-card">
      <img src="${element.photo}" />
      <h5>${element.title}</h5>
      <p>${element.description}</p>
    </div>
    </span> 
    <div class="col col-4"></div>
          `;
}

getAllData();

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