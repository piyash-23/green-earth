let loadedTrees = [];
let cartItems = [];
const loadProducts = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();

  loadedTrees = data.plants;
};
// add to cart funtion
const addToCart = (id) => {
  const item = loadedTrees.find((tree) => tree.id === id);
  if (item) {
    const cart = cartItems.find((el) => el.id === id);
    if (cart) {
      cart.quantities += 1;
    } else {
      cartItems.push({ ...item, quantities: 1 });
    }

    showCart();
  }
};

const showCart = () => {
  let addCart = document.querySelector(".addcart");
  addCart.innerHTML = "";
  let total = 0;
  let sumBox = document.querySelector(".sum");
  sumBox.innerHTML = "";
  cartItems.forEach((element) => {
    let toCart = document.createElement("div");
    toCart.innerHTML = `
    <div class="showcart">
              <div class="quantity">
                <h1 class="font-semibold text-sm">${element.name}</h1>
                <p class="text-xs my-1">৳${element.price} x ${element.quantities}</p>
              </div>
              <button class="cursor-pointer" id="btn-cart" onclick="deletearr(${element.id})">X</button>
            </div>`;
    addCart.appendChild(toCart);
    total += element.price * element.quantities;
    sumBox.innerHTML = `৳${total}`;
  });
};
const deletearr = (id) => {
  cartItems = cartItems.filter((item) => item.id !== id);
  showCart();
};

//load all categories
const categoryLoad = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((catry) => {
      displayCatry(catry.categories);
    });
};

categoryLoad();

const addActive = (id) => {
  if (id === "all") {
    removeActive();
    let allCategoriesBtn = document.getElementById("allcat");
    allCategoriesBtn.classList.add("active");
    return;
  }
};
const removeActive = () => {
  let allBtn = document.querySelectorAll(".all-btn");
  allBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
};
const loadtrees = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let loadBtn = document.getElementById(`load-btn-${id}`);
      removeActive();
      loadBtn.classList.add("active");
      loadbyCat(data.plants);
    });
};
// load choose trees
const chooseTrees = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      loadAll(data.plants);
    });
};

// modal box

const loadMyModal = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const response = await fetch(url);
  const detail = await response.json();
  displayModal(detail.plants);
};
const displayModal = (tree) => {
  // console.log(tree);
  const modalBOx = document.getElementById("modalBOx");
  // modalBOx.innerHTML = "hehe js theika aisi";
  modalBOx.innerHTML = `
  <div ><img class="aspect-3/2 object-cover rounded-lg" src ="${tree.image}"/></div>
          <div>
            <p class="font-bold text-3xl my-5">${tree.name}</p>
          </div>
          <div>
            <p>${tree.description}</p>
          </div>
          <div>
            <p class="font-semibold text-lg my-5">${tree.category}</p>
          </div>`;
  document.getElementById("tree_modal").showModal();
};
addToCart();
// for using all card
const allCard = (tree) => {
  const loadCard = `
    <div class="card">
            <img src="${tree.image}" id="imageBox" />
            <h3 class="subtitle">${tree.name}</h3>
            <p class="description">
              ${tree.description}
            </p>
            <div class="fruit">
              <h3 class="fruitTree cursor-pointer" onclick="loadMyModal(${tree.id})">${tree.category}</h3>
              <button class="btn" id="price">৳${tree.price}</button>
            </div>
            <button class="btn" id="cart" onclick="addToCart(${tree.id})">Add to Cart</button>
          </div>
    `;
  return loadCard;
};
const loadbyCat = (plants) => {
  let chooseAll = document.getElementById("chooseSec"); // load trees
  chooseAll.innerHTML = "";
  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.innerHTML = allCard(plant);
    chooseAll.appendChild(card);
  });
};

// displat all categories
const displayCatry = (categories) => {
  let btnCatery = document.getElementById("loadcategory");
  btnCatery.innerHTML = "";
  categories.forEach((category) => {
    let button = document.createElement("div");
    button.innerHTML = `
        <button class="btn all-btn loadbutton" id="load-btn-${category.id}" onclick="loadtrees(${category.id})">${category.category_name}<button>
    `;
    btnCatery.append(button);
  });
};

chooseTrees();
const loadAll = (trees) => {
  // console.log(trees);
  let chooseAll = document.getElementById("chooseSec");
  chooseAll.innerHTML = "";

  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.innerHTML = allCard(tree);

    chooseAll.appendChild(card);
  });
};

loadProducts();
addToCart();
