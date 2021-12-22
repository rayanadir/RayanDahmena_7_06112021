import Service from './public/js/Service.js';

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
    })
    ingredientsFilter.style.position = "absolute";
    appareilsFilter.style.position = "relative";
    ustensilesFilter.style.position = "relative";
    if (resultIngredients.length == 1) {
        //ingredientsListDropdown.style.width = "14rem";
        //inputIngredient.style.width = "130px";
        //appareilsFilter.style.marginLeft = "15rem";
    } else if (resultIngredients.length == 2) {
        //ingredientsListDropdown.style.width = "23rem";
        //inputIngredient.style.width = "auto";
        //appareilsFilter.style.marginLeft = "24rem";
    } else if (resultIngredients.length >= 3) {
        //ingredientsListDropdown.style.width = "30rem";
        //inputIngredient.style.width = "auto";
        //appareilsFilter.style.marginLeft = "31rem";
    }
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
    ingredientsFilter.style.position = "relative";
    appareilsFilter.style.position = "absolute";
    ustensilesFilter.style.position = "relative";
    if (resultAppareils.length == 1) {
        //appareilsListDropdown.style.width = "14rem";
        //inputAppareil.style.width = "130px";
        //ustensilesFilter.style.marginLeft = "16rem";
    } else if (resultAppareils.length == 2) {
        //appareilsListDropdown.style.width = "23rem";
        //inputAppareil.style.width = "auto";
        //ustensilesFilter.style.marginLeft = "20rem";
    } else if (resultAppareils.length >= 3) {
        //appareilsListDropdown.style.width = "30rem";
        //inputAppareil.style.width = "auto";
        //ustensilesFilter.style.marginLeft = "23rem";
    }
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
    if (resultUstensiles.length == 1) {
        //ustensilesListDropdown.style.width = "14rem";
        //inputUstensiles.style.width = "130px";
    } else if (resultUstensiles.length == 2) {
        //ustensilesListDropdown.style.width = "23rem";
        //inputUstensiles.style.width = "auto";
    } else if (resultUstensiles.length >= 3) {
        //ustensilesListDropdown.style.width = "30rem";
        //inputUstensiles.style.width = "auto";
    }
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
            var template;
            document.getElementById('ingredientsList').innerHTML = ``;
            ingredients_button.setAttribute('hidden',true);
            ingredientsListDropdown.setAttribute('open',true);
            ingredientsFilter.setAttribute('filter_open',true);
            appareils_button.removeAttribute('hidden');
            appareilsListDropdown.removeAttribute('open');
            appareilsFilter.removeAttribute('filter_open');
            ustensiles_button.removeAttribute('hidden');
            ustensilesListDropdown.removeAttribute('open');
            ustensilesFilter.removeAttribute('filter_open');
            /*ingredients_button.style.display = "none"
            ingredientsListDropdown.style.display = "block";
            ingredientsFilter.style.position = "absolute";
            appareilsFilter.style.position = "relative";
            appareils_button.style.display = "flex";
            appareilsListDropdown.style.display = "none";
            appareilsFilter.style.position = "relative";
            appareilsFilter.style.marginLeft="0";
            ustensiles_button.style.display = "flex";
            ustensilesListDropdown.style.display = "none";
            ustensilesFilter.style.position = "relative";
            ustensilesFilter.style.marginLeft="0"*/
            //afficher les filtres et empêcher le redéclenchement de l'événement
            if (inputIngredientsLength == undefined || inputIngredient.value == "") {
                ingredientsArray.forEach((ingredient) => {
                    template = `
                    <p class="filter__element_name" id="element_name" title="ingredients" data-id="${ingredient}">${ingredient}</p>
                `;
                    document.getElementById('ingredientsList').innerHTML += template;
                });
                if (ingredientsArray.length == 1) {
                    //ingredientsListDropdown.style.width = "14rem";
                    //inputIngredient.style.width = "130px";
                    //appareilsFilter.style.marginLeft = "15rem";
                } else if (ingredientsArray.length == 2) {
                    //ingredientsListDropdown.style.width = "23rem";
                    //inputIngredient.style.width = "auto";
                    //appareilsFilter.style.marginLeft = "24rem";
                } else if (ingredientsArray.length >= 3) {
                    //ingredientsListDropdown.style.width = "30rem";
                    //inputIngredient.style.width = "auto";
                    //appareilsFilter.style.marginLeft = "31rem";
                }
            } else {
                ingredientsArray.forEach((ingredient) => {
                    var template = `
                        <p class="filter__element_name" id="element_name" title="ingredients" data-id="${ingredient}">${ingredient}</p>
                        `;
                    document.getElementById('ingredientsList').innerHTML += template;
                });
                if (resultIngredients.length == 1) {
                    //ingredientsListDropdown.style.width = "14rem";
                    //inputIngredient.style.width = "130px";
                    //appareilsFilter.style.marginLeft = "15rem";
                } else if (resultIngredients.length == 2) {
                    //ingredientsListDropdown.style.width = "23rem";
                    //inputIngredient.style.width = "auto";
                    //appareilsFilter.style.marginLeft = "24rem";
                } else if (resultIngredients.length >= 3) {
                    //ingredientsListDropdown.style.width = "30rem";
                    //inputIngredient.style.width = "auto";
                    //appareilsFilter.style.marginLeft = "31rem";
                }
            }
    }else if(id=="appareils_button" || id=="name_appareil" || id=="inputAppareil"){
        document.getElementById('appareilsList').innerHTML = ``;
        var template;
        ingredients_button.removeAttribute('hidden');
        ingredientsListDropdown.removeAttribute('open');
        ingredientsFilter.removeAttribute('filter_open');
        appareils_button.setAttribute('hidden',true);
        appareilsListDropdown.setAttribute('open',true);
        appareilsFilter.setAttribute('filter_open',true);
        ustensiles_button.removeAttribute('hidden');
        ustensilesListDropdown.removeAttribute('open');
        ustensilesFilter.removeAttribute('filter_open');
        /*appareils_button.style.display = "none";
            appareilsListDropdown.style.display = "block";
            appareilsFilter.style.position = "absolute";
            ingredients_button.style.display="flex";
            ingredientsListDropdown.style.display="none";
            ingredientsFilter.style.position = "relative";
            ingredientsFilter.style.marginLeft="0";
            ustensiles_button.style.display = "flex";
            ustensilesListDropdown.style.display = "none";
            ustensilesFilter.style.position = "relative";
            ustensilesFilter.style.marginLeft="0"
            appareilsFilter.style.marginLeft = "9rem";*/
            //afficher les filtres et empêcher le redéclenchement de l'événement
            if (inputAppareilLength == undefined || inputAppareil.value == "") {
                appareilsArray.forEach((appareil) => {
                    template = `
                    <p class="filter__element_name" id="element_name" title="appareils" data-id="${appareil}">${appareil}</p>
                `;
                    document.getElementById('appareilsList').innerHTML += template;
                })
                if (appareilsArray.length == 1) {
                    //appareilsListDropdown.style.width = "14rem";
                    //inputAppareil.style.width = "130px";
                    //ustensilesFilter.style.marginLeft = "16rem";
                } else if (appareilsArray.length == 2) {
                    //appareilsListDropdown.style.width = "23rem";
                    //inputAppareil.style.width = "auto";
                    //ustensilesFilter.style.marginLeft = "20rem";
                } else if (appareilsArray.length >= 3) {
                    //appareilsListDropdown.style.width = "30rem";
                    //inputAppareil.style.width = "auto";
                    //ustensilesFilter.style.marginLeft = "23rem";
                }
            } else {
                resultAppareils.forEach((appareil) => {
                    var template = `
                        <p class="filter__element_name" id="element_name" title="appareils" data-id="${appareil}">${appareil}</p>
                        `;
                    document.getElementById('appareilsList').innerHTML += template;
                });
                if (resultAppareils.length == 1) {
                    //appareilsListDropdown.style.width = "14rem";
                    //inputAppareil.style.width = "130px";
                    //ustensilesFilter.style.marginLeft = "16rem";
                } else if (resultAppareils.length == 2) {
                    //appareilsListDropdown.style.width = "23rem";
                    //inputAppareil.style.width = "auto";
                    //ustensilesFilter.style.marginLeft = "20rem";
                } else if (resultAppareils.length >= 3) {
                    //appareilsListDropdown.style.width = "30rem";
                    //inputAppareil.style.width = "auto";
                    //ustensilesFilter.style.marginLeft = "23rem";
                }
            }
    
    }else if(id=="ustensiles_button" || id=="name_ustensiles" || id=="inputUstensiles"){
        document.getElementById('ustensilesList').innerHTML = ``;
        var template;
        ingredients_button.removeAttribute('hidden');
        ingredientsListDropdown.removeAttribute('open');
        ingredientsFilter.removeAttribute('filter_open');
        appareils_button.removeAttribute('hidden');
        appareilsListDropdown.removeAttribute('open');
        appareilsFilter.removeAttribute('filter_open');
        ustensiles_button.setAttribute('hidden',true);
        ustensilesListDropdown.setAttribute('open',true);
        ustensilesFilter.setAttribute('filter_open',true);
            //afficher les filtres et empêcher le redéclenchement de l'événement
            if (inputUstensilsLength == undefined || inputUstensiles.value == "") {
                ustensilesArray.forEach((ustensil) => {
                    template = `
                    <p class="filter__element_name" id="element_name" title="ustensiles" data-id="${ustensil}">${ustensil}</p>
                `;
                    document.getElementById('ustensilesList').innerHTML += template;
                })
                if (ustensilesArray.length == 1) {
                    //ustensilesListDropdown.style.width = "14rem";
                    //inputUstensiles.style.width = "130px";
                } else if (ustensilesArray.length == 2) {
                    //ustensilesListDropdown.style.width = "23rem";
                    //inputUstensiles.style.width = "auto";
                } else if (ustensilesArray.length >= 3) {
                    //ustensilesListDropdown.style.width = "30rem";
                    //inputUstensiles.style.width = "auto";
                }
            } else {
                resultUstensiles.forEach((ustensil) => {
                    var template = `
                            <p class="filter__element_name" id="element_name" title="ustensiles" data-id="${ustensil}">${ustensil}</p>
                            `;
                    document.getElementById('ustensilesList').innerHTML += template;
                });
                if (resultUstensiles.length == 1) {
                    //ustensilesListDropdown.style.width = "14rem";
                    //inputUstensiles.style.width = "130px";
                } else if (resultUstensiles.length == 2) {
                    //ustensilesListDropdown.style.width = "23rem";
                    //inputUstensiles.style.width = "auto";
                } else if (resultUstensiles.length >= 3) {
                    //ustensilesListDropdown.style.width = "30rem";
                    //inputUstensiles.style.width = "auto";
                }
            }
    
    }else{
        let dropDowns=document.getElementsByClassName('filter__dropdown')
        for(let drop of dropDowns){drop.removeAttribute('open');}
        let filterButton=document.getElementsByClassName('filter__button');
        for(let button of filterButton){button.removeAttribute('hidden')};
        let filtersClass=document.getElementsByClassName('filter__filters_class');
        for(let filter of filtersClass){filter.removeAttribute('filter_open',true)}
    }
})