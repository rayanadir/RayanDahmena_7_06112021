import * as recipes from '../recipes.js';

//console.log(recipes.recipes);

var recipesArray = recipes.recipes;

let recipesList = document.getElementById('recipes');

for (var i = 0; i < recipesArray.length; i++) {
    var template = `
    <article class="recipes__recipe">
    <img src="/images/img.png" alt="image" class="recipes__image">
    <div class="recipes__details">
        <div class="recipes__title_time">
            <div class="recipes__title">
                ${recipesArray[i].name}
            </div>
            <div class="recipes__time">
                <i class="far fa-clock recipes__icon"></i>
                <div class="recipes__time_value">
                    ${recipesArray[i].time} min
                </div>
            </div>
        </div>
        <div class="recipes__ingredients_description">
            <div class="recipes__ingredients">
                    ${recipesArray[i].ingredients.map((a)=>`
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
                ${recipesArray[i].description}
            </label>
        </div>
    </div>
</article>
    `

    recipesList.innerHTML += template;
}