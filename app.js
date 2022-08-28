/** @type {HTMLButtonElement} */
const searchBtn = document.querySelector("#search-btn");

/** @type {HTMLInputElement} */
const searchInput = document.querySelector("#user-inp");

/** @type {HTMLDivElement} */
const modal = document.querySelector("#recipe-modal");

/** @type {HTMLParagraphElement} */
const modalContent = modal.querySelector("p");

/** @type {HTMLHeadingElement} */
const modalTitle = modal.querySelector("h2");

/** @type {HTMLSpanElement} */
const closeBtn = modal.querySelector("button.accept");

let result = document.getElementById("result");


const theMealDbUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", searchIngredient);
searchInput.addEventListener("keydown", function (ev) {
    if (ev.key==='Enter'){
        searchIngredient();
    }
});

function searchIngredient() {
    let inputText = searchInput.value.trim();
    if (inputText.length == 0) {
        // TODO: Add alert
        result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
        return;
    }
    else {
        fetch(url + userInp)
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++){
                let myMeal = data.meals[i];
                console.log(myMeal);
                console.log(myMeal.strMealThumb);
                console.log(myMeal.strMeal);
                console.log(myMeal.strArea);
                console.log(myMeal.strInstructions);
                let count = 1;
                let ingredients = [];
                for (let i in myMeal) {
                let ingredient = "";
                let measure = "";
                if (i.startsWith("strIngredient") && myMeal[i]) {
                    ingredient = myMeal[i];
                    measure = myMeal[`strMeasure` + count];
                    count += 1;
                    ingredients.push(`${measure} ${ingredient}`);
                }
                }
                console.log(ingredients);

                result.innerHTML = `
            <img src=${myMeal.strMealThumb}>
            <div class="details">
                <h2>${myMeal.strMeal}</h2>
                <h4>${myMeal.strArea}</h4>
            </div>
            <div id="ingredient-con"></div>
            <div id="recipe">
                <button id="hide-recipe">X</button>
                <pre id="instructions">${myMeal.strInstructions}</pre>
            </div>
            <button id="show-recipe">View Recipe</button>
            `;
                let ingredientCon = document.getElementById("ingredient-con");
                let parent = document.createElement("ul");
                let recipe = document.getElementById("recipe");

                ingredients.forEach((i) => {
                let child = document.createElement("li");
                child.innerText = i;
                parent.appendChild(child);
                ingredientCon.appendChild(parent);
                });
            }
        

      })
      .catch(() => {
        result.innerHTML = `<h3>Invalid Input</h3>`;
      });
  }
}



function openModal() {
    modal.style.display = "block";
    modalContent.innerText = "Đổ nguyên liệu theo tổ tiên mách bảo";
    modalTitle.innerText = "Yê"
}

closeBtn.addEventListener("click", function(ev) {
    modal.style.display = "none";
})