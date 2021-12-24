//Ingredients DOM elements
let ingredientsFilter = document.getElementById('ingredients');
let ingredientsListDropdown = document.getElementById('ingredientsListDropdown');
let ingredients_button = document.getElementById('ingredients_button');

//Appareils DOM elements
let appareilsFilter = document.getElementById('appareils');
let appareilsListDropdown = document.getElementById('appareilsListDropdown');
let appareils_button = document.getElementById('appareils_button');

//Ustensiles DOM elements
let ustensilesFilter = document.getElementById('ustensiles');
let ustensilesListDropdown = document.getElementById('ustensilesListDropdown');
let ustensiles_button = document.getElementById('ustensiles_button');

var attribute;

/**
 * afficher tous les boutons de filtres à l'état initial
 */
export function setInitialStateFilterList() {
    let dropDowns = document.getElementsByClassName('filter__dropdown')
    for (let drop of dropDowns) { drop.removeAttribute('open'); }
    let filterButton = document.getElementsByClassName('filter__button');
    for (let button of filterButton) { button.removeAttribute('hidden') };
    let filtersClass = document.getElementsByClassName('filter__filters_class');
    for (let filter of filtersClass) {
        filter.removeAttribute('filter_open'), filter.removeAttribute('ingredients_open_1');
        filter.removeAttribute('ingredients_open_2');
        filter.removeAttribute('ingredients_open_sup_3');
        filter.removeAttribute('absolute')
    }
    ustensilesFilter.removeAttribute('appareil_open_1');
    ustensilesFilter.removeAttribute('appareil_open_2');
    ustensilesFilter.removeAttribute('appareil_open_3');
}

/**
 * actualise la largeur de la liste des filtres en fonction du résultat
 */
export function refreshFilterListWidth(list, resultLength) {
    if (list == "ingredients") {
        if (resultLength == 1) {
            appareilsFilter.removeAttribute('ingredients_open_1');
            ingredientsListDropdown.removeAttribute('ingredients_open_1');
            appareilsFilter.removeAttribute('ingredients_open_3');
            ingredientsListDropdown.removeAttribute('ingredients_open_3');
            appareilsFilter.setAttribute('ingredients_open_1', true);
            ingredientsListDropdown.setAttribute('ingredients_open_1', true);
        } else if (resultLength == 2) {
            appareilsFilter.removeAttribute('ingredients_open_1');
            ingredientsListDropdown.removeAttribute('ingredients_open_1');
            appareilsFilter.removeAttribute('ingredients_open_3');
            ingredientsListDropdown.removeAttribute('ingredients_open_3');
            appareilsFilter.setAttribute('ingredients_open_2', true);
            ingredientsListDropdown.setAttribute('ingredients_open_2', true);
        } else if (resultLength >= 3) {
            appareilsFilter.removeAttribute('ingredients_open_1');
            ingredientsListDropdown.removeAttribute('ingredients_open_1')
            appareilsFilter.removeAttribute('ingredients_open_2');
            ingredientsListDropdown.removeAttribute('ingredients_open_2')
            appareilsFilter.setAttribute('ingredients_open_sup_3', true);
            ingredientsListDropdown.setAttribute('ingredients_open_3', true);
        }
    } else if (list == "appareils") {
        if (resultLength == 1) {
            ustensilesFilter.setAttribute('appareil_open_1', true);
            ustensilesFilter.removeAttribute('appareil_open_2')
            ustensilesFilter.removeAttribute('appareil_open_3')
        } else if (resultLength == 2) {
            ustensilesFilter.setAttribute('appareil_open_2', true);
            ustensilesFilter.removeAttribute('appareil_open_1');
            ustensilesFilter.removeAttribute('appareil_open_3')
        } else if (resultLength >= 3) {
            ustensilesFilter.setAttribute('appareil_open_3', true);
            ustensilesFilter.removeAttribute('appareil_open_2')
            ustensilesFilter.removeAttribute('appareil_open_1')
        }
    }
}

/**
 * attribue la position relative et absolue en fonction de la liste de filtre ouverte
 */
export function setFilterPosition(filter) {
    if (filter == "ingredients") {
        ingredientsFilter.setAttribute('absolute', true);
        appareilsFilter.setAttribute('relative', true);
        ustensilesFilter.setAttribute('relative', true);
    } else if (filter == "appareils") {
        ingredientsFilter.setAttribute('relative', true);
        appareilsFilter.setAttribute('absolute', true);
        ustensilesFilter.setAttribute('relative', true);
    } else if (filter == "ustensiles") {
        ingredientsFilter.setAttribute('relative', true);
        appareilsFilter.setAttribute('relative', true);
        ustensilesFilter.setAttribute('absolute', true);
    }
}

/**
 * masque le bouton de filtre et dévoile le dropdown
 */
export function openFilter(filter) {
    if (filter == "ingredients") {
        ingredientsFilter.removeAttribute('relative')
        ingredients_button.setAttribute('hidden', true);
        ingredientsListDropdown.setAttribute('open', true);
        ingredientsFilter.setAttribute('filter_open', true);
        appareils_button.removeAttribute('hidden');
        appareilsListDropdown.removeAttribute('open');
        appareilsFilter.removeAttribute('filter_open');
        ustensiles_button.removeAttribute('hidden');
        ustensilesListDropdown.removeAttribute('open');
        ustensilesFilter.removeAttribute('filter_open');
        appareilsFilter.setAttribute('ingredients_open_sup_3', true);
        ustensilesFilter.removeAttribute('appareil_open_3');
        ustensilesFilter.removeAttribute('appareil_open_2');
        ustensilesFilter.removeAttribute('appareil_open_1');
    } else if (filter == "appareils") {
        appareilsFilter.removeAttribute('relative')
        ingredients_button.removeAttribute('hidden');
        ingredientsListDropdown.removeAttribute('open');
        ingredientsFilter.removeAttribute('filter_open');
        appareils_button.setAttribute('hidden', true);
        appareilsListDropdown.setAttribute('open', true);
        appareilsFilter.setAttribute('filter_open', true);
        ustensiles_button.removeAttribute('hidden');
        ustensilesListDropdown.removeAttribute('open');
        ustensilesFilter.removeAttribute('filter_open');
        ingredientsFilter.setAttribute('relative', true);
        appareilsFilter.setAttribute('absolute', true);
        ustensilesFilter.setAttribute('relative', true);
    } else if (filter == "ustensiles") {
        ustensilesFilter.removeAttribute('relative')
        ingredients_button.removeAttribute('hidden');
        ingredientsListDropdown.removeAttribute('open');
        ingredientsFilter.removeAttribute('filter_open');
        appareils_button.removeAttribute('hidden');
        appareilsListDropdown.removeAttribute('open');
        appareilsFilter.removeAttribute('filter_open');
        ustensiles_button.setAttribute('hidden', true);
        ustensilesListDropdown.setAttribute('open', true);
        ustensilesFilter.setAttribute('filter_open', true);
        ustensilesFilter.removeAttribute('appareil_open_3');
        ustensilesFilter.removeAttribute('appareil_open_2');
        ustensilesFilter.removeAttribute('appareil_open_1');
    }
}

/**
 * affiche la liste des filtres et empêche le redéclenchement de l'événement, les filtres ne seront pas à nouveau ajoutés
 */
export function displayFilters(list, input_length, input_value, array, result, filtersArray) {
    var template;
    if (list == "ingredients") {
        if (input_length == undefined || input_value == "") {
            array.forEach((ingredient) => {
                const found = filtersArray.some(element => element.value == ingredient && element.type == "ingredients")
                if (found) {
                    attribute = "filter__hide_selected_filter";
                } else {
                    attribute = ""
                }
                template = `
                <p class="filter__element_name ${attribute}" id="element_name" title="ingredients" data-id="${ingredient}">${ingredient}</p>
            `;
                document.getElementById('ingredientsList').innerHTML += template;
            });
            if (array.length == 1) {
                appareilsFilter.setAttribute('ingredients_open_1', true);
            } else if (array.length == 2) {
                appareilsFilter.setAttribute('ingredients_open_2', true);
            } else if (array.length >= 3) {
                appareilsFilter.setAttribute('ingredients_open_sup_3', true);
            }
        } else {
            result.forEach((ingredient) => {
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
            });
        }
    } else if (list == "appareils") {
        if (input_length == undefined || input_value == "") {
            array.forEach((appareil) => {
                const found = filtersArray.some(element => element.value == appareil && element.type == "appareils")
                if (found) {
                    attribute = "filter__hide_selected_filter";
                } else {
                    attribute = ""
                }
                template = `
                <p class="filter__element_name ${attribute}" id="element_name" title="appareils" data-id="${appareil}">${appareil}</p>
            `;
                document.getElementById('appareilsList').innerHTML += template;
            })
            if (array.length == 1) {
                ustensilesFilter.setAttribute('appareil_open_1', true);
            } else if (array.length == 2) {
                ustensilesFilter.setAttribute('appareil_open_2', true);
            } else if (array.length >= 3) {
                ustensilesFilter.setAttribute('appareil_open_3', true);
            }
        } else {
            result.forEach((appareil) => {
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
            });
            if (result.length == 1) {
                ustensilesFilter.setAttribute('appareil_open_1', true);
            } else if (result.length == 2) {
                ustensilesFilter.setAttribute('appareil_open_2', true);
            } else if (result.length >= 3) {
                ustensilesFilter.setAttribute('appareil_open_3', true);
            }
        }
    } else if (list == "ustensiles") {
        if (input_length == undefined || input_value == "") {
            array.forEach((ustensil) => {
                const found = filtersArray.some(element => element.value == ustensil && element.type == "ustensiles")
                if (found) {
                    attribute = "filter__hide_selected_filter";
                } else {
                    attribute = ""
                }
                template = `
                <p class="filter__element_name ${attribute}" id="element_name" title="ustensiles" data-id="${ustensil}">${ustensil}</p>
            `;
                document.getElementById('ustensilesList').innerHTML += template;
            })
        } else {
            result.forEach((ustensil) => {
                const found = filtersArray.some(element => element.value == ustensil && element.type == "ustensiles")
                if (found) {
                    attribute = "filter__hide_selected_filter";
                } else {
                    attribute = ""
                }
                template = `
                        <p class="filter__element_name ${attribute}" id="element_name" title="ustensiles" data-id="${ustensil}">${ustensil}</p>
                        `;
                document.getElementById('ustensilesList').innerHTML += template;
            });
        }
    }
}