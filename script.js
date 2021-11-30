import * as recipes from '../recipes.js';

var recipesArray = recipes.recipes;
let recipesList = document.getElementById('recipes');
let ingredientsFilter = document.getElementById('ingredients');
let appareilsFilter = document.getElementById('appareils');
let ustensilesFilter = document.getElementById('ustensiles');
let chevron1 = document.getElementById('chevron1');
let chevron2 = document.getElementById('chevron2');
let chevron3 = document.getElementById('chevron3');

function loadRecipes(array) {
    recipesList.innerHTML = ``;
    //console.log(array.length)
    if (array.length > 0) {
        recipesList.style.display = "grid";
        for (var i = 0; i < array.length; i++) {
            array[i].ingredients.map((a) => {
                if (a.unit == undefined) {
                    a.unit = "";
                }
                if (a.quantity == undefined) {
                    a.quantity = "";
                }
            })
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
    }else{
        recipesList.style.display="block";
        recipesList.innerHTML=`
        <p class="recipes__no_result">
            Aucune rectette ne correspond à votre critère ... vous pouvez chercher "tarte aux pommes","poisson", etc ...
        </p>
        `
    }
    
}

loadRecipes(recipesArray);

document.getElementById('search').addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    var length = value.length;
    var resultRecipes = [];
    if (length >= 3) {
        recipesArray.forEach((recipe) => {
            if (recipe.name.toLowerCase().includes(value) || recipe.description.toLowerCase().includes(value)) {
                resultRecipes.push(recipe);
            }
        })
    } else {
        resultRecipes = recipesArray;
    }
    //console.log(resultRecipes);
    loadRecipes(resultRecipes);
})

function getAllIngredients(array){
    var ingredientsArray=[];
    array.forEach((recipe)=>{
        recipe.ingredients.forEach((ingredient)=>{
            if(ingredientsArray.indexOf(ingredient.ingredient) == -1){
                ingredientsArray.push(ingredient.ingredient)
            }
        })
    });
    //console.log(ingredientsArray);
    return ingredientsArray;
}

getAllIngredients(recipesArray);

ingredientsFilter.addEventListener('click', (e)=>{
    ingredientsFilter.style.width="30rem";
    chevron1.style.transform="rotate(180deg)";
})

chevron1.addEventListener('click', (e)=>{
    ingredientsFilter.style.width="auto";
    chevron1.style.transform="rotate(0deg)";
})