//load all categories
const categoryLoad = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((catry) => {
      displayCatry(catry.categories);
    });
};
// {
//     "id": 6,
//     "category_name": "Evergreen Tree",
//     "small_description": "Trees that remain green throughout the year."
// }
categoryLoad();
// {
//     "id": 1,
//     "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//     "name": "Mango Tree",
//     "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
//     "category": "Fruit Tree",
//     "price": 500
// }
const addActive = (id) => {
  if (id === "all") {
    // প্রথম বাটনের জন্য
    removeActive();
    let allCategoriesBtn = document.getElementById("allcat");
    allCategoriesBtn.classList.add("active");
    // চাইলে এখানে API কল এড়িয়ে যেতে পারো
    return;
  }
};
const removeActive = () => {
  let allBtn = document.querySelectorAll(".all-btn");
  // console.log(allBtn);
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
      // console.log(loadBtn);
      // addActive();
      loadbyCat(data.plants);
    });
};
const loadbyCat = (plants) => {
  // console.log(plants);
  let chooseAll = document.getElementById("chooseSec"); // load trees
  chooseAll.innerHTML = "";
  plants.forEach((plant) => {
    // console.log(plant);
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="card">
            <img src="${plant.image}" id="imageBox" />
            <h3 class="subtitle">${plant.name}</h3>
            <p class="description">
              ${plant.description}
            </p>
            <div class="fruit">
              <h3 class="fruitTree">${plant.category}</h3>
              <button class="btn" id="price">৳${plant.price}</button>
            </div>
            <button class="btn" id="cart">Add to Cart</button>
          </div>
    `;
    chooseAll.appendChild(card);
  });
};

// displat all categories
const displayCatry = (categories) => {
  // console.log(categories);
  let btnCatery = document.getElementById("loadcategory");
  btnCatery.innerHTML = "";
  categories.forEach((category) => {
    let button = document.createElement("div");
    // console.log(category);
    button.innerHTML = `
        <button class="btn all-btn loadbutton" id="load-btn-${category.id}" onclick="loadtrees(${category.id})">${category.category_name}<button>
    `;
    btnCatery.append(button);
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
chooseTrees();
// {
//     "id": 24,
//     "image": "https://i.ibb.co.com/FL3c30KJ/giant-bamboo-min.jpg",
//     "name": "Giant Bamboo",
//     "description": "The tallest bamboo species, producing strong, thick stems. Useful for building materials and garden landscaping.",
//     "category": "Bamboo",
//     "price": 1200
// }
const loadAll = (trees) => {
  // console.log(trees);
  let chooseAll = document.getElementById("chooseSec");
  chooseAll.innerHTML = "";
  // load single
  trees.forEach((tree) => {
    // console.log(tree);
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="card">
            <img src="${tree.image}" id="imageBox" class="mx-auto" />
            <h3 class="subtitle">${tree.name}</h3>
            <p class="description">
              ${tree.description}
            </p>
            <div class="fruit">
              <h3 class="fruitTree">${tree.category}</h3>
              <button class="btn" id="price">৳${tree.price}</button>
            </div>
            <button class="btn" id="cart">Add to Cart</button>
          </div>
    `;
    chooseAll.appendChild(card);
  });
};
