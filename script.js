import Service from './public/js/Service.js';
import { setInitialStateFilterList, refreshFilterListWidth, setFilterPosition, openFilter, displayFilters } from "./public/js/ControllerFilter.js";

//var recipesrecipies = recipes.recipes;
let recipesList = document.getElementById('recipes');

//Ingredients DOM elements
let ingredientsFilter = document.getElementById('ingredients');
let ingredientsListDropdown = document.getElementById('ingredientsListDropdown');
let ingredients_button = document.getElementById('ingredients_button');
let inputIngredient = document.getElementById('inputIngredients')
var ingredientsArray = Service.getIngredients();
let chevron1 = document.getElementById('chevron1');
var inputIngredientsLength;

//Appareils DOM elements
let appareilsFilter = document.getElementById('appareils');
let appareilsListDropdown = document.getElementById('appareilsListDropdown');
let appareils_button = document.getElementById('appareils_button');
let inputAppareil = document.getElementById('inputAppareil');
var appareilsArray = Service.getAppliance();
let chevron2 = document.getElementById('chevron2');
var inputAppareilLength;

//Ustensiles DOM elements
let ustensilesFilter = document.getElementById('ustensiles');
let ustensilesListDropdown = document.getElementById('ustensilesListDropdown');
let ustensiles_button = document.getElementById('ustensiles_button');
let inputUstensiles = document.getElementById('inputUstensiles');
var ustensilesArray = Service.getUstensils();
let chevron3 = document.getElementById('chevron3');
var inputUstensilsLength;

var inputLength = 0;
var input_main_value;
//let filterOpen = false;
var filtersArray = [];
var filtersTemplate = document.getElementById('results');
var resultRecipes = [];
var resultIngredients = [];
var resultAppareils = [];
var resultUstensiles = [];

var recipesArray = Service.loadRecipesAndFilters();


function displayRecipes(recipes, filterArr, input_value) {
    recipesList.innerHTML = ``;
    if (filterArr.length == 0) {
        if (recipes.length > 0) {
            recipesList.style.display = "grid";
            for (var i = 0; i < recipes.length; i++) {
                recipes[i].ingredients.map((a) => {
                        if (a.unit == undefined) {
                            a.unit = "";
                        }
                        if (a.quantity == undefined) {
                            a.quantity = "";
                        }
                    })
                    //affichage des recettes en fonction de la valeur de recherche
                if (input_value == '' || input_value == undefined || input_value == null) {
                    var template = `
            <article class="recipes__recipe">
            <img src="public/images/img.png" alt="image" class="recipes__image">
            <div class="recipes__details">
                <div class="recipes__title_time">
                    <div class="recipes__title">
                        ${recipes[i].name}
                    </div>
                    <div class="recipes__time">
                        <i class="far fa-clock recipes__icon"></i>
                        <div class="recipes__time_value">
                            ${recipes[i].time} min
                        </div>
                    </div>
                </div>
                <div class="recipes__ingredients_description">
                    <div class="recipes__ingredients">
                            ${recipes[i].ingredients.map((a) => `
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
                        ${recipes[i].description}
                    </label>
                </div>
            </div>
            </article>
            `
                    recipesList.innerHTML += template;
                } else if (recipes[i].name.includes(input_value) || recipes[i].description.includes(input_value) || recipes[i].ingredients.some(a => a.ingredient.includes(input_value))) {
                    var template = `
            <article class="recipes__recipe">
            <img src="public/images/img.png" alt="image" class="recipes__image">
            <div class="recipes__details">
                <div class="recipes__title_time">
                    <div class="recipes__title">
                        ${recipes[i].name}
                    </div>
                    <div class="recipes__time">
                        <i class="far fa-clock recipes__icon"></i>
                        <div class="recipes__time_value">
                            ${recipes[i].time} min
                        </div>
                    </div>
                </div>
                <div class="recipes__ingredients_description">
                    <div class="recipes__ingredients">
                            ${recipes[i].ingredients.map((a) => `
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
                        ${recipes[i].description}
                    </label>
                </div>
            </div>
            </article>
            `
                    recipesList.innerHTML += template;
                }
            }
        } else {
            recipesList.style.display = "block";
            recipesList.innerHTML = `
    <p class="recipes__no_result">
        Aucune rectette ne correspond à votre critère ... vous pouvez chercher "tarte aux pommes","poisson", etc ...
    </p>
    `
        }
    } else if (filterArr.length > 0) {
        for (var i = 0; i < recipes.length; i++) {
            recipes[i].ingredients.map((a) => {
                if (a.unit == undefined) {
                    a.unit = "";
                }
                if (a.quantity == undefined) {
                    a.quantity = "";
                }
            })
            for (var j = 0; j < filterArr.length; j++) {
                if (recipes[i].appliance.includes(filterArr[j].value) || recipes[i].ingredients.some(a => a.ingredient.includes(filterArr[j].value)) || recipes[i].ustensils.some(us => us.includes(filterArr[j].value))) {
                    var template = `
            <article class="recipes__recipe">
            <img src="public/images/img.png" alt="image" class="recipes__image">
            <div class="recipes__details">
                <div class="recipes__title_time">
                    <div class="recipes__title">
                        ${recipes[i].name}
                    </div>
                    <div class="recipes__time">
                        <i class="far fa-clock recipes__icon"></i>
                        <div class="recipes__time_value">
                            ${recipes[i].time} min
                        </div>
                    </div>
                </div>
                <div class="recipes__ingredients_description">
                    <div class="recipes__ingredients">
                            ${recipes[i].ingredients.map((a) => `
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
                        ${recipes[i].description}
                    </label>
                </div>
            </div>
            </article>
            `
                    recipesList.innerHTML += template;
                }
            }
        }
    }
}

displayRecipes(Service.loadRecipesAndFilters().recipesArr, filtersArray, input_main_value);



//recherche d'une recette au clavier
document.getElementById('search').addEventListener('input', (e) => {
    const value = e.target.value;
    input_main_value = value;
    inputLength = value.length;
    resultRecipes = [];
    if (inputLength >= 3) {
        recipesArray.recipesArr.forEach((recipe) => {
            if (recipe.name.toLowerCase().includes(value.toLowerCase()) || recipe.description.toLowerCase().includes(value.toLowerCase()) || recipe.ingredients.some(a => a.ingredient.toLowerCase().includes(value.toLowerCase()))) {
                resultRecipes.push(recipe);
            }
        })
        ingredientsArray=Service.loadRecipesAndFilters(resultRecipes).ingredients
        appareilsArray = Service.loadRecipesAndFilters(resultRecipes).appliances
        ustensilesArray =Service.loadRecipesAndFilters(resultRecipes).ustensils;
        displayRecipes(Service.loadRecipesAndFilters(resultRecipes).recipesArr, filtersArray, input_main_value);
    } else {
        ingredientsArray = Service.getIngredients();
        appareilsArray = Service.getAppliance();
        ustensilesArray = Service.getUstensils();
        resultRecipes = recipesArray;
        displayRecipes(Service.loadRecipesAndFilters().recipesArr, filtersArray, input_main_value);
    }
})


// evenements ingredients
inputIngredient.addEventListener('input', (e) => {
    const value = e.target.value;
    inputIngredientsLength = value.length;
    resultIngredients = [];
    document.getElementById('ingredientsList').innerHTML = ``;
    ingredientsArray.forEach((ingredient) => {
        if(ingredient.toLowerCase().includes(value.toLowerCase())){
            resultIngredients.push(ingredient)
            var template = `
        <p class="filter__element_name" id="element_name" title="ingredients" data-id="${ingredient}">${ingredient}</p>
        `;
        document.getElementById('ingredientsList').innerHTML += template;
        }
    });
    setFilterPosition('ingredients');
    refreshFilterListWidth('ingredients',resultIngredients.length);
});

// evenements appareils
inputAppareil.addEventListener('input', (e) => {
    const value = e.target.value;
    inputAppareilLength = value.length;
    document.getElementById('appareilsList').innerHTML = ``;
    resultAppareils=[];
    appareilsArray.forEach((appareil) => {
        if(appareil.toLowerCase().includes(value.toLowerCase())){
            resultAppareils.push(appareil);
            var template = `
        <p class="filter__element_name" id="element_name" title="appareils" data-id="${appareil}">${appareil}</p>
        `;
        document.getElementById('appareilsList').innerHTML += template;
        }
    });
    setFilterPosition('appareils');
    refreshFilterListWidth('appareils',resultAppareils.length);
})

// evenements ustensiles
inputUstensiles.addEventListener('input', (e) => {
    const value = e.target.value;
    inputUstensilsLength = value.length;
    resultUstensiles = [];
    document.getElementById('ustensilesList').innerHTML = ``;
    ustensilesArray.forEach((ustensil) => {
        if(ustensil.toLowerCase().includes(value.toLowerCase())){
            resultUstensiles.push(ustensil);
        var template = `
            <p class="filter__element_name" id="element_name" title="ustensiles" data-id="${ustensil}">${ustensil}</p>
            `;
        document.getElementById('ustensilesList').innerHTML += template;
        }
    })
});

//vérifie si un objet est contenu dans un tableau
function containsObject(obj, list) {
    return list.some(elem => elem.value === obj.value && elem.type == obj.type)
}

//evenements au clic 
document.addEventListener('click', (e) => {
    //sélectionner filtre + l'ajouter
    const value = e.target.dataset.id;
    const type = e.target.title;
    let object = { "value": value, "type": type }
    if (value !== undefined && type !== '') {
        if (containsObject(object, filtersArray) == false) {
            filtersArray.push(object);
            var className;
            if (type == "ingredients") {
                className = "filter__1"
            } else if (type == "appareils") {
                className = "filter__2"
            } else if (type == "ustensiles") {
                className = "filter__3"
            }
            var template = `
            <button class="filter__result ${className}" id="button_${object.value}_${object.type}">
                ${value}
                <i class="far fa-times-circle filter__close" data-value="${object.value}" data-type="${object.type}"></i>
            </button>
            `
            filtersTemplate.innerHTML += template;
            displayRecipes(recipesArray, filtersArray, input_main_value);
        }
    }

    //supprimer filtre sélectionné
    const data_value = e.target.dataset.value;
    const data_type = e.target.dataset.type;
    if (data_value !== undefined && data_type !== undefined) {
        for (var i = 0; i < filtersArray.length; i++) {
            if (filtersArray[i].value == data_value && filtersArray[i].type == data_type) {
                document.getElementById('button_' + data_value + '_' + data_type).remove();
                filtersArray.splice(i);
                displayRecipes(recipesArray, filtersArray, input_main_value);
            }
        }
    }

    //ouvrir et fermer liste des filtres
    var id=e.target.id;
    if(id=="ingredients_button" || id=="name_ingredients" || id=="inputIngredients"){
        document.getElementById('ingredientsList').innerHTML = ``;
        setInitialStateFilterList();
        openFilter('ingredients');
        displayFilters('ingredients',inputIngredientsLength,inputIngredient.value,ingredientsArray,resultIngredients);
    }else if(id=="appareils_button" || id=="name_appareil" || id=="inputAppareil"){
        document.getElementById('appareilsList').innerHTML = ``;
        setInitialStateFilterList()
        openFilter('appareils');
        displayFilters('appareils',inputUstensilsLength,inputUstensiles.value,appareilsArray,resultAppareils)   
    }else if(id=="ustensiles_button" || id=="name_ustensiles" || id=="inputUstensiles"){
        document.getElementById('ustensilesList').innerHTML = ``;
        setInitialStateFilterList()
        openFilter('ustensiles')
        displayFilters('ustensiles',inputUstensilsLength,inputUstensiles.value,ustensilesArray,resultUstensiles)
    }else{
        setInitialStateFilterList()
    }
})