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
var appreilsArray = Service.getAppliance();
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
let filterOpen = false;
var filtersArray = [];
var filtersTemplate = document.getElementById('results');
var resultRecipes = [];
var resultIngredients = [];
var resultAppareils = [];
var resultUstensiles = [];

var recipesArray = Service.loadRecipes();
var allAppliance = Service.getAppliance();
var allUstensils = Service.getUstensils();
var allIngredients = Service.getIngredients();




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

function displayAllIngredients() {
    document.getElementById('ingredientsList').innerHTML = ``
    allIngredients.forEach((ingredient) => {
        var template = `
        <p class="filter__element_name" id="element_name" title="ingredients" data-id="${ingredient}">${ingredient}</p>
    `;
        document.getElementById('ingredientsList').innerHTML += template;
    })
}

function displayAllAppliance() {
    document.getElementById('appareilsList').innerHTML = ``
    allAppliance.forEach((appliance) => {
        var template = `
        <p class="filter__element_name" id="element_name" title="appareils" data-id="${appliance}">${appliance}</p>
    `;
        document.getElementById('appareilsList').innerHTML += template;
    })
}

function displayAllUstensils() {
    document.getElementById('ustensilesList').innerHTML = ``
    allUstensils.forEach((ustensiles) => {
        var template = `
        <p class="filter__element_name" id="element_name" title="ustensiles" data-id="${ustensiles}">${ustensiles}</p>
    `;
        document.getElementById('ustensilesList').innerHTML += template;
    })
}


displayRecipes(recipesArray, filtersArray, input_main_value);
displayAllIngredients();
displayAllAppliance();
displayAllUstensils();



//recherche d'une recette au clavier
document.getElementById('search').addEventListener('input', (e) => {
    const value = e.target.value;
    input_main_value = value;
    inputLength = value.length;
    resultRecipes = [];
    if (inputLength >= 3) {
        recipesArray.forEach((recipe) => {
            if (recipe.name.includes(value) || recipe.description.includes(value) || recipe.ingredients.some(a => a.ingredient.includes(value))) {
                resultRecipes.push(recipe);
            }
        })
        ingredientsArray = getIngredientsFilters(resultRecipes);
        appreilsArray = getAppareilsFilters(resultRecipes);
        ustensilesArray = getUstensilsFilters(resultRecipes);
    } else {
        ingredientsArray = Service.getIngredients();
        appreilsArray = Service.getAppliance();
        ustensilesArray = Service.getUstensils();
        resultRecipes = recipesArray;
    }
    displayRecipes(resultRecipes, filtersArray, input_main_value)
})

function getIngredientsFilters(arr) {
    arr.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            if (resultIngredients.indexOf(ingredient.ingredient) == -1) {
                resultIngredients.push(ingredient.ingredient);
            }
        })
    })
    return resultIngredients;
}

function getAppareilsFilters(arr) {
    arr.forEach((recipe) => {
        if (resultAppareils.indexOf(recipe.appliance) == -1) {
            resultAppareils.push(recipe.appliance);
        }
    })
    return resultAppareils;
}

function getUstensilsFilters(arr) {
    arr.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            if (resultUstensiles.indexOf(ustensil) == -1) {
                resultUstensiles.push(ustensil);
            }
        })
    });
    return resultUstensiles;
}


// evenements ingredients
ingredientsFilter.addEventListener('click', () => {
    if (filterOpen == false) {
        filterOpen = true;
        ingredients_button.style.display = "none"
        ingredientsListDropdown.style.display = "block";
        var template;
        document.getElementById('ingredientsList').innerHTML = ``;
        //if(inputLength<3){
        //afficher les filtres à l'état initial
        if (inputIngredientsLength == undefined) {
            ingredientsArray.forEach((ingredient) => {
                template = `
                <p class="filter__element_name" id="element_name" title="ingredients" data-id="${ingredient}">${ingredient}</p>
            `;
                document.getElementById('ingredientsList').innerHTML += template;
            });
        } else {
            resultIngredients.forEach((ingredient) => {
                var template = `
                    <p class="filter__element_name" id="element_name" title="ingredients" data-id="${ingredient}">${ingredient}</p>
                    `;
                document.getElementById('ingredientsList').innerHTML += template;
            })
        }

        /*}else{
            //actualiser filtres en fonction de la recherche principale
            currentIngredientsFilters.forEach((ingredient)=>{
                template= `
                <p class="filter__element_name" id="element_name" title="ingredients" data-id="${ingredient}">${ingredient}</p>
            `;
            document.getElementById('ingredientsList').innerHTML += template;
            })
        }*/
    } else {
        filterOpen = false;
    }
})

chevron1.addEventListener('click', () => {
    ingredients_button.style.display = "flex";
    ingredientsListDropdown.style.display = "none";
    inputIngredient.value = "";
    document.getElementById('ingredientsList').innerHTML = ``;
})

inputIngredient.addEventListener('input', (e) => {
    const value = e.target.value;
    //const length = value.length;
    resultIngredients = [];
    document.getElementById('ingredientsList').innerHTML = ``;
    /*if (length > 0) {
        ingredientsArray.forEach((ingredient) => {
            if (ingredient.includes(value)) {
                resultIngredients.push(ingredient);
            }
        })
    } else {
        resultIngredients = ingredientsArray;
    }*/
    resultIngredients = Service.getIngredients(value);

    resultIngredients.forEach((ingredient) => {
        var template = `
        <p class="filter__element_name" id="element_name" title="ingredients" data-id="${ingredient}">${ingredient}</p>
        `;
        document.getElementById('ingredientsList').innerHTML += template;
    })
    if (resultIngredients.length == 1) {
        ingredientsListDropdown.style.width = "14rem";
        inputIngredient.style.width = "130px";
    } else if (resultIngredients.length == 2) {
        ingredientsListDropdown.style.width = "23rem";
        inputIngredient.style.width = "auto";
    } else if (resultIngredients.length >= 3) {
        ingredientsListDropdown.style.width = "30rem";
        inputIngredient.style.width = "auto";
    }
});

// evenements appareils
appareilsFilter.addEventListener('click', () => {
    if (filterOpen == false) {
        filterOpen = true;
        appareils_button.style.display = "none";
        appareilsListDropdown.style.display = "block";
        var template
        document.getElementById('appareilsList').innerHTML = ``;
        //if(inputLength<3){
        //afficher les filtres à l'état initial
        if (inputAppareilLength == undefined || inputAppareil.value=="") {
            appreilsArray.forEach((appareil) => {
                template = `
                <p class="filter__element_name" id="element_name" title="appareils" data-id="${appareil}">${appareil}</p>
            `;
                document.getElementById('appareilsList').innerHTML += template;
            })
            if (appreilsArray.length == 1) {
                appareilsListDropdown.style.width = "14rem";
                inputAppareil.style.width = "130px";
            } else if (appreilsArray.length == 2) {
                appareilsListDropdown.style.width = "23rem";
                inputAppareil.style.width = "auto";
            } else if (appreilsArray.length >= 3) {
                appareilsListDropdown.style.width = "30rem";
                inputAppareil.style.width = "auto";
            }
        } else {
            resultAppareils.forEach((appareil) => {
                var template = `
                    <p class="filter__element_name" id="element_name" title="appareils" data-id="${appareil}">${appareil}</p>
                    `;
                document.getElementById('appareilsList').innerHTML += template;
            });
            if (resultAppareils.length == 1) {
                appareilsListDropdown.style.width = "14rem";
                inputAppareil.style.width = "130px";
            } else if (resultAppareils.length == 2) {
                appareilsListDropdown.style.width = "23rem";
                inputAppareil.style.width = "auto";
            } else if (resultAppareils.length >= 3) {
                appareilsListDropdown.style.width = "30rem";
                inputAppareil.style.width = "auto";
            }
        }

        /*}else{
            //actualiser filtres en fonction de la recherche principale
            currentAppareilsFilters.forEach((appareil)=>{
                template= `
                <p class="filter__element_name" id="element_name" title="ingredients" data-id="${appareil}">${appareil}</p>
            `;
            document.getElementById('ingredientsList').innerHTML += template;
            })
        }*/
    } else {
        filterOpen = false;
    }
})

chevron2.addEventListener('click', () => {
    appareilsListDropdown.style.display = "none";
    appareils_button.style.display = "flex";
    inputAppareil.value = "";
    document.getElementById('appareilsList').innerHTML = ``;
})

inputAppareil.addEventListener('input', (e) => {
    const value = e.target.value;
    inputAppareilLength = value.length;
    //const length = value.length;
    //resultAppareils=[];
    document.getElementById('appareilsList').innerHTML = ``;
    /*if (length > 0) {
        appreilsArray.forEach((appareil) => {
            if (appareil.includes(value)) {
                resultAppareils.push(appareil);
            }
        })
    } else {
        resultAppareils = appreilsArray;
    }*/
    resultAppareils = Service.getAppliance(value);
    resultAppareils.forEach((appareil) => {
        var template = `
        <p class="filter__element_name" id="element_name" title="appareils" data-id="${appareil}">${appareil}</p>
        `;
        document.getElementById('appareilsList').innerHTML += template;
    });
    if (resultAppareils.length == 1) {
        appareilsListDropdown.style.width = "14rem";
        inputAppareil.style.width = "130px";
    } else if (resultAppareils.length == 2) {
        appareilsListDropdown.style.width = "23rem";
        inputAppareil.style.width = "auto";
    } else if (resultAppareils.length >= 3) {
        appareilsListDropdown.style.width = "30rem";
        inputAppareil.style.width = "auto";
    }
})






// evenements ustensiles
ustensilesFilter.addEventListener('click', () => {
    if (filterOpen == false) {
        filterOpen = true;
        ustensiles_button.style.display = "none";
        ustensilesListDropdown.style.display = "block";
        var template;
        document.getElementById('ustensilesList').innerHTML = ``;
        //if(inputLength<3){
        //afficher les filtres à l'état initial
        if (inputUstensilsLength == undefined) {
            ustensilesArray.forEach((ustensil) => {
                template = `
                <p class="filter__element_name" id="element_name" title="ustensiles" data-id="${ustensil}">${ustensil}</p>
            `;
                document.getElementById('ustensilesList').innerHTML += template;
            })
        } else {
            resultUstensiles.forEach((ustensil) => {
                var template = `
                        <p class="filter__element_name" id="element_name" title="ustensiles" data-id="${ustensil}">${ustensil}</p>
                        `;
                document.getElementById('ustensilesList').innerHTML += template;
            })
        }

        /*}else{
            //actualiser filtres en fonction de la recherche principale
            currentUstensilesFilters.forEach((ustensil)=>{
                template= `
                <p class="filter__element_name" id="element_name" title="ingredients" data-id="${ustensil}">${ustensil}</p>
            `;
            document.getElementById('ingredientsList').innerHTML += template;
            })
        }*/
    } else {
        filterOpen = false;
    }
})

chevron3.addEventListener('click', () => {
    ustensiles_button.style.display = "flex";
    ustensilesListDropdown.style.display = "none";
    inputUstensiles.value = "";
    document.getElementById('ustensilesList').innerHTML = ``;
})

inputUstensiles.addEventListener('input', (e) => {
    const value = e.target.value;
    //const length = value.length;
    resultUstensiles = [];
    document.getElementById('ustensilesList').innerHTML = ``;
    /*if (length > 0) {
        ustensilesArray.forEach((ustensil) => {
            if (ustensil.includes(value)) {
                resultUstensiles.push(ustensil);
            }
        })
    } else if(length==0) {
        resultUstensiles = ustensilesArray;
    }*/
    resultUstensiles = Service.getUstensils(value);
    resultUstensiles.forEach((ustensil) => {
        var template = `
            <p class="filter__element_name" id="element_name" title="ustensiles" data-id="${ustensil}">${ustensil}</p>
            `;
        document.getElementById('ustensilesList').innerHTML += template;
    })
    if (resultUstensiles.length == 1) {
        ustensilesListDropdown.style.width = "14rem";
        inputUstensiles.style.width = "130px";
    } else if (resultUstensiles.length == 2) {
        ustensilesListDropdown.style.width = "23rem";
        inputUstensiles.style.width = "auto";
    } else if (resultUstensiles.length >= 3) {
        ustensilesListDropdown.style.width = "30rem";
        inputUstensiles.style.width = "auto";
    }
});


//vérifie si un objet est contenu dans un tableau
function containsObject(obj, list) {
    return list.some(elem => elem.value === obj.value && elem.type == obj.type)
}

//evenement récuperation filtre et son affichage
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
})