import recipes from '../../recipes.js'
export default class Service {
    static loadRecipesAndFilters(search, filtersArray, arg) {
        let recipesArr = recipes;
        // RECHERCHE PRINCIPALE ET SANS FILTRE
        if (search && !filtersArray) {
            recipesArr = search;
            let ingredients = [
                ...new Set(recipesArr.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flat())
            ];
            let appliances = [
                ...new Set(recipesArr.map(recipe => recipe.appliance.toLowerCase()))
            ];
            let ustensils = [
                ...new Set(recipesArr.map(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase())).flat())
            ];
            const result = {
                ingredients,
                appliances,
                ustensils,
                recipesArr,
            }
            return result;
        }
        // RECHERCHE AVEC FILTRE
        else if (filtersArray && search !== undefined) {
            let resultRecipes = []
                //obtenir recettes à partir des filtres choisis
            recipesArr.forEach((recipe) => {
                recipe.ingredients.map((ingredient) => {
                    const ingredientFound = filtersArray.some(filter => filter.value == ingredient.ingredient.toLowerCase() && filter.type == "ingredients");
                    if (ingredientFound) {
                        resultRecipes.push(recipe);
                    }
                });
                const applianceFound = filtersArray.some(filter => filter.value == recipe.appliance.toLowerCase() && filter.type == "appareils");
                if (applianceFound) {
                    resultRecipes.push(recipe);
                }
                recipe.ustensils.map((ustensil) => {
                    const ustensilFound = filtersArray.some(filter => filter.value == ustensil.toLowerCase() && filter.type == "ustensiles");
                    if (ustensilFound) {
                        resultRecipes.push(recipe);
                    }
                })
            })
            if (arg == true) {
                //resultRecipes = resultRecipes.filter(recipe => this.filterRecipes(recipe, filtersArray))
                //console.log(resultRecipes)
                let ingredients = [];
                let appliance = [];
                let ustensiles = []
                for (let i = 0; i < filtersArray.length; i++) {
                    if (filtersArray[i].type == "ingredients") { ingredients.push(filtersArray[i].value) } else if (filtersArray[i].type == "appareils") { appliance.push(filtersArray[i].value) } else if (filtersArray[i].type == "ustensiles") { ustensiles.push(filtersArray[i].value) }
                }
                const filters = { ingredients, appliance, ustensiles }
                console.log(filters)
            }
            //actualiser les filtres à partir des nouvelles recettes obtenues
            let ingredients = [
                ...new Set(resultRecipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flat())
            ];
            let appliances = [
                ...new Set(resultRecipes.map(recipe => recipe.appliance.toLowerCase()))
            ];
            let ustensils = [
                ...new Set(resultRecipes.map(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase())).flat())
            ];
            if (filtersArray.length == 0) {
                resultRecipes = recipesArr;
                ingredients = this.getIngredients();
                appliances = this.getAppliance();
                ustensils = this.getUstensils()
            }
            const result = {
                ingredients,
                appliances,
                ustensils,
                resultRecipes
            }
            return result;
        }
        const initArr = {
            ingredients: this.getIngredients(),
            appliances: this.getAppliance(),
            ustensils: this.getUstensils(),
            recipesArr,
        }
        return initArr;
    }
    static getIngredients(filter) {
        let ingredients = [
            ...new Set(recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flat())
        ];
        if (filter) {
            ingredients = ingredients.filter(ingredient => ingredient.toLowerCase().indexOf(filter) > -1);
        }
        return ingredients;
    }
    static getAppliance(filter) {
        let appliances = [
            ...new Set(recipes.map(recipe => recipe.appliance.toLowerCase()))
        ];
        if (filter) {
            appliances = appliances
                .filter(appliance => appliance.toLowerCase().indexOf(filter) > -1)
        }
        return appliances;
    }
    static getUstensils(filter) {
        let ustensils = [
            ...new Set(recipes.map(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase())).flat())
        ];
        if (filter) {
            ustensils = ustensils
                .filter(ustensil => ustensil.toLowerCase().indexOf(filter) > -1)
        }
        return ustensils
    }

    static filterRecipes(recipesArr, filtersArr) {
        let filterIngredient = true,
            filterAppliance = true,
            filterUstensil = true;
        for (let i = 0; i < filtersArr.length; i++) {
            const mappedIngredients = recipesArr.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
            if (mappedIngredients.indexOf(filtersArr[i].value) == -1 && filtersArr[i].type == "ingredients") {
                filterIngredient = false;
                break;
            }
            if (recipesArr.appliance.toLowerCase() !== filtersArr[i].appliance && filtersArr[i].type == "appareils") {
                filterAppliance = false;
                break;
            }
            if (recipesArr.ustensils.map(ustensil => ustensil.toLowerCase().indexOf(filtersArr[i].value) == -1 && filtersArr[i].type == "ustensiles")) {
                filterUstensil = false;
                break;
            }
        }
        return filterIngredient && filterAppliance && filterUstensil;
    }
}