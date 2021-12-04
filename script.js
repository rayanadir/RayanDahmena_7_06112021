import * as recipes from '/recipes.js';
import Service from '/public/js/Service.js';

var recipesArray = recipes.recipes;
let recipesList = document.getElementById('recipes');

//Ingredients DOM elements
let ingredientsFilter = document.getElementById('ingredients');
let ingredientsListDropdown = document.getElementById('ingredientsListDropdown');
let ingredients_button = document.getElementById('ingredients_button');
let inputIngredient = document.getElementById('inputIngredients')
var ingredientsArray = Service.getIngredients(recipesArray);
let chevron1 = document.getElementById('chevron1');

//Appareils DOM elements
let appareilsFilter = document.getElementById('appareils');
let appareilsListDropdown = document.getElementById('appareilsListDropdown');
let appareils_button = document.getElementById('appareils_button');
let inputAppareil = document.getElementById('inputAppareil');
var appreilsArray = Service.getAppliance(recipesArray);
let chevron2 = document.getElementById('chevron2');

//Ustensiles DOM elements
let ustensilesFilter = document.getElementById('ustensiles');
let ustensilesListDropdown = document.getElementById('ustensilesListDropdown');
let ustensiles_button = document.getElementById('ustensiles_button');
let inputUstensiles = document.getElementById('inputUstensiles');
var ustensilesArray = Service.getUstensils(recipesArray);
let chevron3 = document.getElementById('chevron3');

let filterOpen = false;
let filtersArray = [];

Service.loadRecipes(recipesArray, recipesList);
Service.getAppliance(recipesArray);
Service.getUstensils(recipesArray);

document.getElementById('search').addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    var length = value.length;
    var resultRecipes = [];
    if (length >= 3) {
        recipesArray.forEach((recipe) => {
            if (recipe.name.toLowerCase().includes(value) || recipe.description.toLowerCase().includes(value) || recipe.ingredients.toLowerCase().some(a => a.ingredient.includes(value))) {
                resultRecipes.push(recipe);
            }
        })
    } else {
        resultRecipes = recipesArray;
    }
    Service.loadRecipes(resultRecipes, recipesList);
})

// evenements ingredients
ingredientsFilter.addEventListener('click', (e) => {
    if (filterOpen == false) {
        filterOpen = true;
        ingredients_button.style.display = "none"
        ingredientsListDropdown.style.display = "block";
        document.getElementById('ingredientsList').innerHTML = ``;
        ingredientsArray.forEach((ingredient) => {
            var template = `
                <p class="filter__element_name" id="element_name" title="ingredient" data-id="${ingredient}">${ingredient}</p>
            `;
            document.getElementById('ingredientsList').innerHTML += template;
        })
    } else {
        filterOpen = false;
    }
})

chevron1.addEventListener('click', (e) => {
    ingredients_button.style.display = "flex";
    ingredientsListDropdown.style.display = "none";
    document.getElementById('ingredientsList').innerHTML = ``;
})

inputIngredient.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    const length = value.length;
    var resultIngredients = [];
    document.getElementById('ingredientsList').innerHTML = ``;
    if (length > 0) {
        ingredientsArray.forEach((ingredient) => {
            if (ingredient.toLowerCase().includes(value)) {
                resultIngredients.push(ingredient);
            }
        })
    } else {
        resultIngredients = ingredientsArray;
    }
    resultIngredients.forEach((ingredient) => {
        var template = `
        <p class="filter__element_name" id="element_name" title="ingredient" data-id="${ingredient}">${ingredient}</p>
        `;
        document.getElementById('ingredientsList').innerHTML += template;
    })
});

// evenements appareils
appareilsFilter.addEventListener('click', (e) => {
    if (filterOpen == false) {
        filterOpen = true;
        appareils_button.style.display = "none";
        appareilsListDropdown.style.display = "block";
        document.getElementById('appareilsList').innerHTML = ``;
        appreilsArray.forEach((appareil) => {
            var template = `
                <p class="filter__element_name" id="element_name" title="appareil" data-id="${appareil}">${appareil}</p>
            `;
            document.getElementById('appareilsList').innerHTML += template;
        })
    } else {
        filterOpen = false;
    }
})

chevron2.addEventListener('click', (e) => {
    appareils_button.style.display = "flex";
    appareilsListDropdown.style.display = "none";
    document.getElementById('appareilsList').innerHTML = ``;
})

inputAppareil.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    const length = value.length;
    var resultAppareils = [];
    document.getElementById('appareilsList').innerHTML = ``;
    if (length > 0) {
        appreilsArray.forEach((appareil) => {
            if (appareil.toLowerCase().includes(value)) {
                resultAppareils.push(appareil);
            }
        })
    } else {
        resultAppareils = appreilsArray;
    }
    resultAppareils.forEach((appareil) => {
        var template = `
        <p class="filter__element_name" id="element_name" title="ingredient" data-id="${appareil}">${appareil}</p>
        `;
        document.getElementById('appareilsList').innerHTML += template;
    })
})

// evenements ustensiles
ustensilesFilter.addEventListener('click', (e) => {
    if (filterOpen == false) {
        filterOpen = true;
        ustensiles_button.style.display = "none";
        ustensilesListDropdown.style.display = "block";
        document.getElementById('ustensilesList').innerHTML = ``;
        ustensilesArray.forEach((ustensiles) => {
            var template = `
                <p class="filter__element_name" id="element_name" title="ustensiles" data-id="${ustensiles}">${ustensiles}</p>
            `;
            document.getElementById('ustensilesList').innerHTML += template;
        })
    } else {
        filterOpen = false;
    }
})

chevron3.addEventListener('click', (e) => {
    ustensiles_button.style.display = "flex";
    ustensilesListDropdown.style.display = "none";
    document.getElementById('ustensilesList').innerHTML = ``;
})

inputUstensiles.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    const length = value.length;
    var resultUstensiles = [];
    document.getElementById('ustensilesList').innerHTML = ``;
    if (length > 0) {
        ustensilesArray.forEach((ustensil) => {
            if (ustensil.toLowerCase().includes(value)) {
                resultUstensiles.push(ustensil);
            }
        })
    } else {
        resultUstensiles = ustensilesArray;
    }
    resultUstensiles.forEach((ustensil) => {
        var template = `
            <p class="filter__element_name" id="element_name" title="ustensile" data-id="${ustensil}">${ustensil}</p>
            `;
        document.getElementById('ustensilesList').innerHTML += template;
    })
})