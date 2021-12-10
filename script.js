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

//Appareils DOM elements
let appareilsFilter = document.getElementById('appareils');
let appareilsListDropdown = document.getElementById('appareilsListDropdown');
let appareils_button = document.getElementById('appareils_button');
let inputAppareil = document.getElementById('inputAppareil');
var appreilsArray = Service.getAppliance();
let chevron2 = document.getElementById('chevron2');

//Ustensiles DOM elements
let ustensilesFilter = document.getElementById('ustensiles');
let ustensilesListDropdown = document.getElementById('ustensilesListDropdown');
let ustensiles_button = document.getElementById('ustensiles_button');
let inputUstensiles = document.getElementById('inputUstensiles');
var ustensilesArray = Service.getUstensils();
let chevron3 = document.getElementById('chevron3');

let filterOpen = false;
var filtersArray = [];
var filtersTemplate = document.getElementById('results')

var recipesArray = Service.loadRecipes();
var allAppliance = Service.getAppliance();
var allUstensils = Service.getUstensils();
var allIngredients = Service.getIngredients();



function displayRecipies(recipes) {
    recipesList.innerHTML = ``;
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
            var template = `
            <article class="recipes__recipe">
            <img src="/public/images/img.png" alt="image" class="recipes__image">
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
    } else {
        recipesList.style.display = "block";
        recipesList.innerHTML = `
    <p class="recipes__no_result">
        Aucune rectette ne correspond à votre critère ... vous pouvez chercher "tarte aux pommes","poisson", etc ...
    </p>
    `
    }
}

displayRecipies(recipesArray);


allIngredients.forEach((ingredient) => {
    var template = `
        <p class="filter__element_name" id="element_name" title="ingredients" data-id="${ingredient}">${ingredient}</p>
    `;
    document.getElementById('ingredientsList').innerHTML += template;
})

allAppliance.forEach((appliance) => {
    var template = `
        <p class="filter__element_name" id="element_name" title="appareils" data-id="${appliance}">${appliance}</p>
    `;
    document.getElementById('appareilsList').innerHTML += template;
})

allUstensils.forEach((ustensiles) => {
    var template = `
        <p class="filter__element_name" id="element_name" title="ustensiles" data-id="${ustensiles}">${ustensiles}</p>
    `;
    document.getElementById('ustensilesList').innerHTML += template;
})

document.getElementById('search').addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    var length = value.length;
    var resultRecipes = [];
    if (length >= 3) {
        recipesArray.forEach((recipe) => {
            if (recipe.name.toLowerCase().includes(value) || recipe.description.toLowerCase().includes(value) || recipe.ingredients.some(a => a.ingredient.includes(value))) {
                resultRecipes.push(recipe);
            }
        })
    } else {
        resultRecipes = recipesArray;
    }
    displayRecipies(resultRecipes)
})

// evenements ingredients
ingredientsFilter.addEventListener('click', () => {
    if (filterOpen == false) {
        filterOpen = true;
        ingredients_button.style.display = "none"
        ingredientsListDropdown.style.display = "block";
        document.getElementById('ingredientsList').innerHTML = ``;
        ingredientsArray.forEach((ingredient) => {
            var template = `
                <p class="filter__element_name" id="element_name" title="ingredients" data-id="${ingredient}">${ingredient}</p>
            `;
            document.getElementById('ingredientsList').innerHTML += template;
        })
    } else {
        filterOpen = false;
    }
})

chevron1.addEventListener('click', () => {
    ingredients_button.style.display = "flex";
    ingredientsListDropdown.style.display = "none";
    inputIngredient.value="";
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
        <p class="filter__element_name" id="element_name" title="ingredients" data-id="${ingredient}">${ingredient}</p>
        `;
        document.getElementById('ingredientsList').innerHTML += template;
    })
});

// evenements appareils
appareilsFilter.addEventListener('click', () => {
    if (filterOpen == false) {
        filterOpen = true;
        appareils_button.style.display = "none";
        appareilsListDropdown.style.display = "block";
        document.getElementById('appareilsList').innerHTML = ``;
        appreilsArray.forEach((appareil) => {
            var template = `
                <p class="filter__element_name" id="element_name" title="appareils" data-id="${appareil}">${appareil}</p>
            `;
            document.getElementById('appareilsList').innerHTML += template;
        })
    } else {
        filterOpen = false;
    }
})

chevron2.addEventListener('click', () => {
    appareils_button.style.display = "flex";
    appareilsListDropdown.style.display = "none";
    inputAppareil.value="";
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
        <p class="filter__element_name" id="element_name" title="appareils" data-id="${appareil}">${appareil}</p>
        `;
        document.getElementById('appareilsList').innerHTML += template;
    })
})

// evenements ustensiles
ustensilesFilter.addEventListener('click', () => {
    if (filterOpen == false) {
        filterOpen = true;
        ustensiles_button.style.display = "none";
        ustensilesListDropdown.style.display = "block";
        document.getElementById('ustensilesList').innerHTML = ``;
        ustensilesArray.forEach((ustensil)=>{
            var template = `
                <p class="filter__element_name" id="element_name" title="ustensiles" data-id="${ustensil}">${ustensil}</p>
            `;
            document.getElementById('ustensilesList').innerHTML += template;
        })
    } else {
        filterOpen = false;
    }
})

chevron3.addEventListener('click', () => {
    ustensiles_button.style.display = "flex";
    ustensilesListDropdown.style.display = "none";
    inputUstensiles.value="";
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
            <p class="filter__element_name" id="element_name" title="ustensiles" data-id="${ustensil}">${ustensil}</p>
            `;
        document.getElementById('ustensilesList').innerHTML += template;
    })
});

//vérifie si un objet est contenu dans un tableau
function containsObject(obj, list) {
    return list.some(elem => elem.value === obj.value && elem.type==obj.type)
}

//evenement récuperation filtre et son affichage
document.addEventListener('click',(e)=>{
    const value = e.target.dataset.id;
    const type = e.target.title;
    let object={"value" : value, "type" : type}
    if(value!==undefined && type!==''){
        if(containsObject(object,filtersArray)==false){
            filtersArray.push(object);
            var className;
            if(type=="ingredients"){
                className="filter__1"
            }else if(type=="appareils"){
                className="filter__2"
            }else if(type=="ustensiles"){
                className="filter__3"
            }
            var template =`
            <button class="filter__result ${className}">
                ${value}
                <i class="far fa-times-circle filter__close" data-value="${object.value}" data-type="${object.type}"></i>
            </button>
            `
            filtersTemplate.innerHTML+=template;
        }
    }
    
    const data_value=e.target.dataset.value;
    const data_type=e.target.dataset.type;
    if(data_value!==undefined && data_type!==undefined){
        //console.log(e.target.dataset);
        for(var i=0;i<filtersArray.length;i++){
            if(filtersArray[i].value==data_value && filtersArray[i].type==data_type){
                console.log("suppression de l'objet : " + filtersArray[i].value + " : " + filtersArray[i].type);
                filtersArray.splice(i);
                console.log(filtersArray);
            }
        }
    }
})