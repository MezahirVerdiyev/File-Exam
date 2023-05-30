const BASE_URL2 = " http://localhost:5200/favdata";


let row = document.querySelector('.row')

async function getFavData() {
    row.innerHTML = ''
    const res = await axios(BASE_URL2)
    const data = await res.data
    data.forEach(element => {
        row.innerHTML += `
    <span class="col col-12 col-lg-4">
    <div class="about-card">
      <img src="${element.photo}" />
      <h5>${element.title}</h5>
      <p>${element.description}</p>
      <div class="buttons">
        <button class="btn btn-danger" onclick=removeData(${element.id},this)>Remove</button>
      </div>
    </div>
  </span> 
    `
    });
}

getFavData()

async function removeData(id) {
    await axios.delete(`${BASE_URL2}/${id}`)
    getFavData()
}


let menuBtn = document.querySelector(".menu-btn");
let burgerModal = document.querySelector(".burger-modal");
let faXmark = document.querySelector(".fa-xmark");

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

