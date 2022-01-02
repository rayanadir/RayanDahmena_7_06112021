import recipes from '../../recipes.js'
export default class Service {
    static loadRecipesAndFilters(search, filtersArray, arg) {
        let recipesArr = recipes;
        // RECHERCHE PRINCIPALE ET SANS FILTRE
        if (search && !filtersArray) {
            if (arg == true) { console.log("1e condition") }
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
            if (arg == true) { console.log("2e condition") }

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
            let ingredients = this.getIngredients(null, resultRecipes)
            let appliances = this.getAppliance(null, resultRecipes)
            let ustensils = this.getUstensils(null, resultRecipes)
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
    static getIngredients(filter, resultArr) {
        let ingredients = [
            ...new Set(recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flat())
        ];
        if (filter) {
            ingredients = ingredients.filter(ingredient => ingredient.toLowerCase().indexOf(filter) > -1);
        }
        if (resultArr) {
            ingredients = [
                ...new Set(resultArr.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flat())
            ];
        }
        return ingredients;
    }
    static getAppliance(filter, resultArr) {
        let appliances = [
            ...new Set(recipes.map(recipe => recipe.appliance.toLowerCase()))
        ];
        if (filter) {
            appliances = appliances
                .filter(appliance => appliance.toLowerCase().indexOf(filter) > -1)
        }
        if (resultArr) {
            appliances = [
                ...new Set(resultArr.map(recipe => recipe.appliance.toLowerCase()))
            ];
        }
        return appliances;
    }
    static getUstensils(filter, resultArr) {
        let ustensils = [
            ...new Set(recipes.map(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase())).flat())
        ];
        if (filter) {
            ustensils = ustensils
                .filter(ustensil => ustensil.toLowerCase().indexOf(filter) > -1)
        }
        if (resultArr) {
            ustensils = [
                ...new Set(resultArr.map(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase())).flat())
            ];
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
    static mainInputSearch(recipesArray, resultRecipes, value) {
        resultRecipes = []
        recipesArray.forEach((recipe) => {
            if (recipe.name.toLowerCase().includes(value.toLowerCase()) || recipe.description.toLowerCase().includes(value.toLowerCase()) || recipe.ingredients.some(a => a.ingredient.toLowerCase().includes(value.toLowerCase()))) {
                resultRecipes.push(recipe);
            }
        });
        return resultRecipes;
    }
    static getFiltersSelected(filtersArray) {
        let ingredientsSelected = [];
        let applianceSelected = [];
        let ustensilesSelected = []
        for (let i = 0; i < filtersArray.length; i++) {
            if (filtersArray[i].type == "ingredients") { ingredientsSelected.push(filtersArray[i].value) } else if (filtersArray[i].type == "appareils") { applianceSelected.push(filtersArray[i].value) } else if (filtersArray[i].type == "ustensiles") { ustensilesSelected.push(filtersArray[i].value) }
        }
        const filters = { ingredientsSelected, applianceSelected, ustensilesSelected };
        return filters
    }
    static mainInputSearchAndFilters(inputMainValue, filtersArray) {
        let search = recipes.filter(recipe => {
            recipe.name.toLowerCase().includes(inputMainValue.toLowerCase()) || recipe.description.toLowerCase().includes(inputMainValue.toLowerCase()) || recipe.ingredients.some(a => a.ingredient.toLowerCase().includes(inputMainValue.toLowerCase()))
        })
        let filters = this.getFiltersSelected(filtersArray);
        let result = this.filterRecipes(search, filters)
        return result;
    }
}