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
// displat all categories
const displayCatry = (categories) => {
  // console.log(categories);
  let btnCatery = document.getElementById("loadcategory");
  btnCatery.innerHTML = "";
  categories.forEach((category) => {
    let button = document.createElement("div");
    // console.log(category);
    button.innerHTML = `
        <button class="btn" id="loadbutton">${category.category_name}<button>
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
            <img src="${tree.image}" id="imageBox" />
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
