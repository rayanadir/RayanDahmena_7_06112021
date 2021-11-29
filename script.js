import * as recipes from '../recipes.js';

//console.log(recipes.recipes);

var recipesArray = recipes.recipes;
let recipesList = document.getElementById('recipes');


function loadRecipes(array) {
    recipesList.innerHTML = ``;
    for (var i = 0; i < array.length; i++) {
        var template = `
    <article class="recipes__recipe">
    <img src="/images/img.png" alt="image" class="recipes__image">
    <div class="recipes__details">
        <div class="recipes__title_time">
            <div class="recipes__title">
                ${array[i].name}
            </div>
            <div class="recipes__time">
                <i class="far fa-clock recipes__icon"></i>
                <div class="recipes__time_value">
                    ${array[i].time} min
                </div>
            </div>
        </div>
        <div class="recipes__ingredients_description">
            <div class="recipes__ingredients">
                    ${array[i].ingredients.map((a) => `
                    <label for="ingredient" class="recipes__ingredient">
                        <p class="recipes__ingredient_name">
                        ${a.ingredient} : 
                    </p>
                    <p class="recipes__ingredient_value">
                        ${a.quantity} ${a.unit}
                    </p>
                    </label>
                    `).join('')}
            </div>
            <label class="recipes__description">
                ${array[i].description}
            </label>
        </div>
    </div>
</article>
    `
        recipesList.innerHTML += template;
    }
}

loadRecipes(recipesArray);

document.getElementById('search').addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    var length = value.length;
    var resultRecipes = [];
    if (length >= 3) {
        recipesArray.forEach((recipe) => {
            if (recipe.name.toLowerCase().includes(value) || recipe.description.toLowerCase().includes(value) || recipes.ingredients.some(a => a.ingredient.includes(value))) {
                resultRecipes.push(recipe);
            }
        })
        console.log(resultRecipes);
    }
})