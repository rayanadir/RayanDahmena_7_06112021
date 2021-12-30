import recipes from '../../recipes.js'
export default class Service {
    static loadRecipesAndFilters(search, filtersArray) {
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
            let recipes = [];
            //obtenir recettes à partir des filtres choisis
            recipesArr.forEach((recipe) => {
                    recipe.ingredients.map((ingredient) => {
                        const ingredientFound = filtersArray.some(filter => filter.value == ingredient.ingredient.toLowerCase() && filter.type == "ingredients");
                        if (ingredientFound) {
                            recipes.push(recipe);
                        }
                    });
                    const applianceFound = filtersArray.some(filter => filter.value == recipe.appliance.toLowerCase() && filter.type == "appareils");
                    if (applianceFound) {
                        recipes.push(recipe);
                    }
                    recipe.ustensils.map((ustensil) => {
                        const ustensilFound = filtersArray.some(filter => filter.value == ustensil.toLowerCase() && filter.type == "ustensiles");
                        if (ustensilFound) {
                            recipes.push(recipe);
                        }
                    })
                })
                // obtention des filtres séléctionnés
            let ingredientsSelected = [];
            let applianceSelected = [];
            let ustensilesSelected = []
            for (let i = 0; i < filtersArray.length; i++) {
                if (filtersArray[i].type == "ingredients") { ingredientsSelected.push(filtersArray[i].value) } else if (filtersArray[i].type == "appareils") { applianceSelected.push(filtersArray[i].value) } else if (filtersArray[i].type == "ustensiles") { ustensilesSelected.push(filtersArray[i].value) }
            }
            const filters = { ingredientsSelected, applianceSelected, ustensilesSelected };

            let resultRecipes = recipes.filter(recipe => this.filterRecipes(recipe, filters));
            resultRecipes = [...new Set(resultRecipes)];

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

    static filterRecipes(recipe, filters) {
        let filterIngredient = true,
            filterAppliance = true,
            filterUstensil = true;
        for (let i = 0; i < filters.ingredientsSelected.length; i++) {
            const mappedIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
            if (mappedIngredients.indexOf(filters.ingredientsSelected[i]) === -1) {
                filterIngredient = false;
                break;
            }
        }

        for (let i = 0; i < filters.applianceSelected.length; i++) {
            if (recipe.appliance.toLowerCase() !== filters.applianceSelected[i]) {
                filterAppliance = false;
                break;
            }
        }

        for (let i = 0; i < filters.ustensilesSelected.length; i++) {
            if (recipe.ustensils.map(ustensil => ustensil.toLowerCase()).indexOf(filters.ustensilesSelected[i]) === -1) {
                filterUstensil = false;
                break;
            }
        }
        return filterIngredient && filterAppliance && filterUstensil;
    }
}