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
  console.log(categories);
  let btnCatery = document.getElementById("loadcategory");
  btnCatery.innerHTML = "";
  categories.forEach((category) => {
    let button = document.createElement("div");
    console.log(category);
    button.innerHTML = `
        <button class="btn" id="loadbutton">${category.category_name}<button>
    `;
    btnCatery.append(button);
  });
};
