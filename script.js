import * as recipes from '../recipes.js';
import Service from './public/js/Service.js';

var recipesArray = recipes.recipes;
let recipesList = document.getElementById('recipes');
let ingredientsFilter = document.getElementById('ingredients');
let appareilsFilter = document.getElementById('appareils');
let ustensilesFilter = document.getElementById('ustensiles');
let chevron1 = document.getElementById('chevron1');
let chevron2 = document.getElementById('chevron2');
let chevron3 = document.getElementById('chevron3');
let filterOpen = false;

Service.loadRecipes(recipesArray, recipesList);
Service.getIngredients(recipesArray);
Service.getAppliance(recipesArray);
Service.getUstensils(recipesArray);

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
    Service.loadRecipes(resultRecipes, recipesList);
})
ingredientsFilter.addEventListener('click', (e) => {
    if (filterOpen == false) {
        filterOpen = true;
        ingredientsFilter.setAttribute('open', true);
        chevron1.setAttribute('open', true);
    } else {
        filterOpen = false;
        ingredientsFilter.setAttribute('open', false);
        chevron1.setAttribute('open', false);
    }

})
ingredientsFilter.addEventListener('blur', (e) => {
    ingredientsFilter.setAttribute('open', false);
    chevron1.setAttribute('open', false);
})
appareilsFilter.addEventListener('click', (e) => {
    if (filterOpen == false) {
        filterOpen = true;
        appareilsFilter.setAttribute('open', true);
        chevron2.setAttribute('open', true);
    } else {
        filterOpen = false;
        appareilsFilter.setAttribute('open', false);
        chevron2.setAttribute('open', false);
    }
})
appareilsFilter.addEventListener('blur', (e) => {
    appareilsFilter.setAttribute('open', false);
    chevron2.setAttribute('open', false);
})
ustensilesFilter.addEventListener('click', (e) => {
    if (filterOpen == false) {
        filterOpen = true;
        ustensilesFilter.setAttribute('open', true);
        chevron3.setAttribute('open', true);
    } else {
        filterOpen = false;
        ustensilesFilter.setAttribute('open', false);
        chevron3.setAttribute('open', false);
    }
})
ustensilesFilter.addEventListener('blur', (e) => {
    ustensilesFilter.setAttribute('open', false);
    chevron3.setAttribute('open', false)
});