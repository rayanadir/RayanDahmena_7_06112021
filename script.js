import * as recipes from '../recipes.js';
import Service from './public/js/Service.js';

var recipesArray = recipes.recipes;
let recipesList = document.getElementById('recipes');
let ingredientsFilter = document.getElementById('ingredients');
let ingredientsListDropdown = document.getElementById('ingredientsListDropdown');
ingredientsListDropdown.style.display = "none"
let appareilsFilter = document.getElementById('appareils');
let ustensilesFilter = document.getElementById('ustensiles');
let chevron1 = document.getElementById('chevron1');
let chevron2 = document.getElementById('chevron2');
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
            if (recipe.name.toLowerCase().includes(value) || recipe.description.toLowerCase().includes(value) || recipe.ingredients.some(a => a.ingredient.includes(value))) {
                resultRecipes.push(recipe);
            }
        })
    } else {
        resultRecipes = recipesArray;
    }
    Service.loadRecipes(resultRecipes, recipesList);
})
ingredientsFilter.addEventListener('click', (e) => {
    let filtersList = document.getElementById('filtersList');
    let ingredients_button = document.getElementById('ingredients_button');
    let ingredientsListDropdown = document.getElementById('ingredientsListDropdown');
    if (filterOpen == false) {
        filterOpen = true;
        ingredients_button.style.display = "none";
        ingredientsListDropdown.style.display = "flex";


        /*const id_ingredients = document.getElementById('name_ingredients')
        id_ingredients.innerHTML = ``;
        let input = document.createElement('input');
        id_ingredients.appendChild(input);
        input.id = "input"
        input.classList.add('filter__input')
        input.placeholder = "Ingrédients";
        filterOpen = true;
        ingredientsFilter.setAttribute('open', true);
        chevron1.setAttribute('open', true);
        var ingredients = Service.getIngredients(recipesArray);
        ingredients.forEach((ingredient) => {
            var template = `
                <p class="filter__element_name" id="element_name" title="ingredient" data-id="${ingredient}">${ingredient}</p>
            `;
            filtersList.innerHTML += template;
        })
        const elementName = document.getElementsByClassName('filter__element_name')
        for (let element of elementName) {
            element.addEventListener('click', (e) => {
                const value = e.target.dataset.id;
                const type = e.target.title;
                let object = { "value": value, "type": type };
                if (filtersArray.indexOf(object) == -1) {
                    filtersArray.push(object);
                }
                ingredientsFilter.setAttribute('open', false);
                chevron1.setAttribute('open', false);
                let filtersList = document.getElementById('filtersList');
                filtersList.innerHTML = ``;
                console.log(filtersArray);
            })
        }*/



    } else {
        filterOpen = false
        ingredients_button.style.display = "block";
        ingredientsListDropdown.style.display = "none";


        /*
        filterOpen = false;
        ingredientsFilter.setAttribute('open', false);
        chevron1.setAttribute('open', false);
        filtersList.innerHTML = ``;*/
    }
})

/*
ingredientsFilter.addEventListener('blur', (e) => {
        ingredientsFilter.setAttribute('open', false);
        chevron1.setAttribute('open', false);
        let filtersList = document.getElementById('filtersList');
        filtersList.innerHTML = ``;
        const id_ingredients = document.getElementById('name_ingredients')
        id_ingredients.innerHTML = `Ingrédients`;
    })
chevron1.addEventListener('click', (e) => {
        ingredientsFilter.setAttribute('open', false);
        chevron1.setAttribute('open', false);
        let filtersList = document.getElementById('filtersList');
        filtersList.innerHTML = ``;
        const id_ingredients = document.getElementById('name_ingredients');
        id_ingredients.removeChild(document.getElementById('input'));
        id_ingredients.innerHTML = `Ingrédients`;
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
        });*/