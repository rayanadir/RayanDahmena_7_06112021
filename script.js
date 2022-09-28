import Service from './public/js/Service.js';
//import { setInitialStateFilterList, refreshFilterListWidth, setFilterPosition, openFilter, displayFilters } from "./public/js/ControllerFilter.js";
import { displayFilters } from "./public/js/ControllerFilter.js"

//var recipesrecipies = recipes.recipes;
let recipesList = document.getElementById('recipes');

//Ingredients DOM elements
let inputIngredient = document.getElementById('inputIngredients')
var ingredientsArray = Service.getIngredients();
var inputIngredientsLength;
var resultIngredientsLength = 0;

//Appareils DOM elements
let inputAppareil = document.getElementById('inputAppareil');
var appareilsArray = Service.getAppliance();
var inputAppareilLength;

//Ustensiles DOM elements
let inputUstensiles = document.getElementById('inputUstensiles');
var ustensilesArray = Service.getUstensils();
var inputUstensilsLength;

var inputLength = 0;
var inputMainValue = '';
var filtersArray = [];
var filtersTemplate = document.getElementById('results');
var resultRecipes = [];
var resultIngredients = [];
var resultAppareils = [];
var resultUstensiles = [];
var recipesArray = Service.loadRecipesAndFilters().recipesArr;



var attribute;

function displayRecipes(recipes) {
    recipesList.innerHTML = ``;
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
                                <label style="margin:0" for="ingredient" class="recipes__ingredient">
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
    if (recipes.length == 0) {
        recipesList.style.display = "block";
        recipesList.innerHTML = `
        <p class="recipes__no_result">
            Aucune rectette ne correspond à votre critère ... vous pouvez chercher "tarte aux pommes","poisson", etc ...
        </p>
        `
    }
}

displayRecipes(Service.loadRecipesAndFilters().recipesArr);

//recherche d'une recette au clavier
document.getElementById('search').addEventListener('input', (e) => {
    const value = e.target.value;
    inputLength = value.length;
    inputMainValue = value;
    recipesArray = Service.loadRecipesAndFilters().recipesArr;
    if (inputLength >= 3 && filtersArray.length == 0) {
        resultRecipes = Service.mainInputSearch(recipesArray, inputMainValue);
        ingredientsArray = Service.loadRecipesAndFilters(resultRecipes).ingredients
        appareilsArray = Service.loadRecipesAndFilters(resultRecipes).appliances
        ustensilesArray = Service.loadRecipesAndFilters(resultRecipes).ustensils;
        displayRecipes(Service.loadRecipesAndFilters(resultRecipes).recipesArr);
    } else if (inputLength >= 3 && filtersArray.length > 0) {
        const result = Service.mainInputSearch(recipesArray,inputMainValue)
        const filtersSelected = Service.getFiltersSelected(filtersArray);
        resultRecipes = result.filter(recipe => Service.filterRecipes(recipe, filtersSelected));
        ingredientsArray = Service.getIngredients(null, resultRecipes);
        resultIngredients = Service.getIngredients(null, resultRecipes);
        appareilsArray = Service.getAppliance(null, resultRecipes);
        resultAppareils = Service.getAppliance(null, resultRecipes);
        ustensilesArray = Service.getUstensils(null, resultRecipes);
        resultUstensiles = Service.getUstensils(null, resultRecipes)
        displayRecipes(resultRecipes)
    }
    else if (inputLength < 3 && filtersArray.length > 0) {
        recipesArray = Service.loadRecipesAndFilters(recipesArray, filtersArray).resultRecipes;
        ingredientsArray = Service.loadRecipesAndFilters(recipesArray, filtersArray).ingredients;
        resultIngredients = Service.loadRecipesAndFilters(recipesArray, filtersArray).ingredients;
        appareilsArray = Service.loadRecipesAndFilters(recipesArray, filtersArray).appliances;
        resultAppareils = Service.loadRecipesAndFilters(recipesArray, filtersArray).appliances;
        ustensilesArray = Service.loadRecipesAndFilters(recipesArray, filtersArray).ustensils;
        resultUstensiles = Service.loadRecipesAndFilters(recipesArray, filtersArray).ustensils;
        displayRecipes(recipesArray);
    } else if (inputLength < 3 && filtersArray.length == 0) {
        ingredientsArray = Service.getIngredients();
        appareilsArray = Service.getAppliance();
        ustensilesArray = Service.getUstensils();
        resultRecipes = recipesArray;
        displayRecipes(Service.loadRecipesAndFilters().recipesArr);
    }
})

// evenements ingredients
inputIngredient.addEventListener('input', (e) => {
    const value = e.target.value;
    inputIngredientsLength = value.length;
    resultIngredients = [];
    document.getElementById('ingredientsList').innerHTML = ``;
    ingredientsArray.forEach((ingredient) => {
        if (ingredient.toLowerCase().includes(value.toLowerCase())) {
            resultIngredients.push(ingredient);
            const found = filtersArray.some(element => element.value == ingredient && element.type == "ingredients")
            if (found) {
                attribute = "filter__hide_selected_filter";
            } else {
                attribute = ""
            }
            var template = `
        <p class="filter__element_name ${attribute}" id="element_name" title="ingredients" data-id="${ingredient}">${ingredient}</p>
        `;
            document.getElementById('ingredientsList').innerHTML += template;
        }
    });
    resultIngredientsLength=resultIngredients.length;
    //setFilterPosition('ingredients');
    //refreshFilterListWidth('ingredients', resultIngredients.length);
});

// evenements appareils
inputAppareil.addEventListener('input', (e) => {
    const value = e.target.value;
    inputAppareilLength = value.length;
    document.getElementById('appareilsList').innerHTML = ``;
    resultAppareils = [];
    appareilsArray.forEach((appareil) => {
        if (appareil.toLowerCase().includes(value.toLowerCase())) {
            resultAppareils.push(appareil);
            var attribute;
            const found = filtersArray.some(element => element.value == appareil && element.type == "appareils")
            if (found) {
                attribute = "filter__hide_selected_filter";
            } else {
                attribute = ""
            }
            var template = `
        <p class="filter__element_name ${attribute}" id="element_name" title="appareils" data-id="${appareil}">${appareil}</p>
        `;
            document.getElementById('appareilsList').innerHTML += template;
        }
    });
    //setFilterPosition('appareils');
    //refreshFilterListWidth('appareils', resultAppareils.length);
})

// evenements ustensiles
inputUstensiles.addEventListener('input', (e) => {
    const value = e.target.value;
    inputUstensilsLength = value.length;
    resultUstensiles = [];
    document.getElementById('ustensilesList').innerHTML = ``;
    ustensilesArray.forEach((ustensil) => {
        if (ustensil.toLowerCase().includes(value.toLowerCase())) {
            resultUstensiles.push(ustensil);
            var attribute;
            const found = filtersArray.some(element => element.value == ustensil && element.type == "ustensiles")
            if (found) {
                attribute = "filter__hide_selected_filter";
            } else {
                attribute = ""
            }
            var template = `
            <p class="filter__element_name ${attribute}" id="element_name" title="ustensiles" data-id="${ustensil}">${ustensil}</p>
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
            var element = document.querySelector(`[data-id="${value}"]`);
            element.classList.add('filter__hide_selected_filter');
            var className;
            if (type == "ingredients") {
                className = "filter__1";
                inputIngredient.value = "";
            } else if (type == "appareils") {
                className = "filter__2";
                inputAppareil.value = "";
            } else if (type == "ustensiles") {
                className = "filter__3";
                inputUstensiles.value = "";
            }
            var template = `
            <button class="filter__result ${className}" id="button_${object.value}_${object.type}">
                ${value}
                <i class="far fa-times-circle filter__close" data-value="${object.value}" data-type="${object.type}"></i>
            </button>
            `
            filtersTemplate.innerHTML += template;
            if (inputLength >= 3) {
                const result = Service.loadRecipesAndFilters().recipesArr.filter(recipe => {
                    return recipe.name.toLowerCase().includes(inputMainValue.toLowerCase()) || recipe.description.toLowerCase().includes(inputMainValue.toLowerCase()) || recipe.ingredients.some(a => a.ingredient.toLowerCase().includes(inputMainValue.toLowerCase()))
                })
                const filtersSelected = Service.getFiltersSelected(filtersArray);
                resultRecipes = result.filter(recipe => Service.filterRecipes(recipe, filtersSelected));
                ingredientsArray = Service.getIngredients(null, resultRecipes);
                resultIngredients = Service.getIngredients(null, resultRecipes)
                appareilsArray = Service.getAppliance(null, resultRecipes)
                resultAppareils = Service.getAppliance(null, resultRecipes)
                ustensilesArray = Service.getUstensils(null, resultRecipes)
                resultUstensiles = Service.getUstensils(null, resultRecipes);
                displayRecipes(resultRecipes);
            } else {
                resultRecipes = resultRecipes !== undefined ? resultRecipes : recipesArray;
                recipesArray = Service.loadRecipesAndFilters(resultRecipes, filtersArray).resultRecipes;
                ingredientsArray = Service.loadRecipesAndFilters(resultRecipes, filtersArray).ingredients;
                resultIngredients = Service.loadRecipesAndFilters(resultRecipes, filtersArray).ingredients;
                appareilsArray = Service.loadRecipesAndFilters(resultRecipes, filtersArray).appliances;
                resultAppareils = Service.loadRecipesAndFilters(resultRecipes, filtersArray).appliances;
                ustensilesArray = Service.loadRecipesAndFilters(resultRecipes, filtersArray).ustensils;
                resultUstensiles = Service.loadRecipesAndFilters(resultRecipes, filtersArray).ustensils;
                displayRecipes(recipesArray);
            }
        }
    }

    //supprimer filtre sélectionné
    const data_value = e.target.dataset.value;
    const data_type = e.target.dataset.type;
    if (data_value !== undefined && data_type !== undefined) {
        for (var i = 0; i < filtersArray.length; i++) {
            if (filtersArray[i].value == data_value && filtersArray[i].type == data_type) {
                var button = document.getElementById('button_' + data_value + '_' + data_type);
                button.remove();
                var element = document.querySelector(`[data-id="${data_value}"]`);
                element.classList.remove('filter__hide_selected_filter');
                filtersArray.splice(i, 1);
                if (inputLength >= 3) {
                    if (filtersArray.length == 0) {
                        recipesArray = Service.loadRecipesAndFilters().recipesArr.filter(recipe => {
                            return recipe.name.toLowerCase().includes(inputMainValue.toLowerCase()) || recipe.description.toLowerCase().includes(inputMainValue.toLowerCase()) || recipe.ingredients.some(a => a.ingredient.toLowerCase().includes(inputMainValue.toLowerCase()))
                        })
                        ingredientsArray = Service.getIngredients(null, recipesArray);
                        resultIngredients = Service.getIngredients(null, recipesArray)
                        appareilsArray = Service.getAppliance(null, recipesArray)
                        resultAppareils = Service.getAppliance(null, recipesArray)
                        ustensilesArray = Service.getUstensils(null, recipesArray)
                        resultUstensiles = Service.getUstensils(null, recipesArray);
                        displayRecipes(recipesArray);
                    } else if (filtersArray.length > 0) {
                        const result = Service.loadRecipesAndFilters().recipesArr.filter(recipe => {
                            return recipe.name.toLowerCase().includes(inputMainValue.toLowerCase()) || recipe.description.toLowerCase().includes(inputMainValue.toLowerCase()) || recipe.ingredients.some(a => a.ingredient.toLowerCase().includes(inputMainValue.toLowerCase()))
                        })
                        const filtersSelected = Service.getFiltersSelected(filtersArray);
                        resultRecipes = result.filter(recipe => Service.filterRecipes(recipe, filtersSelected));
                        ingredientsArray = Service.getIngredients(null, resultRecipes);
                        resultIngredients = Service.getIngredients(null, resultRecipes)
                        appareilsArray = Service.getAppliance(null, resultRecipes)
                        resultAppareils = Service.getAppliance(null, resultRecipes)
                        ustensilesArray = Service.getUstensils(null, resultRecipes)
                        resultUstensiles = Service.getUstensils(null, resultRecipes);
                        displayRecipes(resultRecipes);
                    }
                } else if (inputLength < 3) {
                    resultRecipes = Service.loadRecipesAndFilters(resultRecipes, filtersArray).resultRecipes
                    ingredientsArray = Service.loadRecipesAndFilters(resultRecipes, filtersArray).ingredients;
                    resultIngredients = Service.loadRecipesAndFilters(resultRecipes, filtersArray).ingredients;
                    appareilsArray = Service.loadRecipesAndFilters(resultRecipes, filtersArray).appliances;
                    resultAppareils = Service.loadRecipesAndFilters(resultRecipes, filtersArray).appliances;
                    ustensilesArray = Service.loadRecipesAndFilters(resultRecipes, filtersArray).ustensils;
                    resultUstensiles = Service.loadRecipesAndFilters(resultRecipes, filtersArray).ustensils;
                    displayRecipes(resultRecipes);
                }
            }
        }
    }

    //ouvrir et fermer liste des filtres
    var id = e.target.id;
    if (id == "ingredients_button" || id == "name_ingredients" || id == "inputIngredients" || id == "chevron1") {
        document.getElementById('ingredientsList').innerHTML = ``;
        //setInitialStateFilterList();
        //openFilter('ingredients',resultIngredientsLength);
        displayFilters('ingredients', inputIngredientsLength, inputIngredient.value, ingredientsArray, resultIngredients, filtersArray);
    } else if (id == "appareils_button" || id == "name_appareil" || id == "inputAppareil" || id == "chevron2") {
        document.getElementById('appareilsList').innerHTML = ``;
        //setInitialStateFilterList()
        //openFilter('appareils');
        displayFilters('appareils', inputAppareilLength, inputAppareil.value, appareilsArray, resultAppareils, filtersArray)
    } else if (id == "ustensiles_button" || id == "name_ustensiles" || id == "inputUstensiles" || id == "chevron3") {
        document.getElementById('ustensilesList').innerHTML = ``;
        //setInitialStateFilterList()
        //openFilter('ustensiles')
        displayFilters('ustensiles', inputUstensilsLength, inputUstensiles.value, ustensilesArray, resultUstensiles, filtersArray)
    } else {
        //setInitialStateFilterList()
    }
})