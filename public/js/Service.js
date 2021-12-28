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
            let tempArr = [];
            let resultRecipes = []
                //obtenir recettes à partir des filtres choisis
            recipesArr.forEach((recipe) => {
                    recipe.ingredients.map((ingredient) => {
                        const ingredientFound = filtersArray.some(filter => filter.value == ingredient.ingredient.toLowerCase() && filter.type == "ingredients");
                        if (ingredientFound) {
                            tempArr.push(recipe);
                        }
                    });
                    const applianceFound = filtersArray.some(filter => filter.value == recipe.appliance.toLowerCase() && filter.type == "appareils");
                    if (applianceFound) {
                        tempArr.push(recipe);
                    }
                    recipe.ustensils.map((ustensil) => {
                        const ustensilFound = filtersArray.some(filter => filter.value == ustensil.toLowerCase() && filter.type == "ustensiles");
                        if (ustensilFound) {
                            tempArr.push(recipe);
                        }
                    })
                })
                // effectuer l'intersection des recettes à partir des filtres 
            tempArr.forEach((recipe) => {
                    const applianceFound = filtersArray.every((filter) => recipe.appliance.toLowerCase() == filter.value)
                    const ingredientFound = filtersArray.every((filter) => {
                        //recipe.ingredients.includes(filter.value)
                        recipe.ingredients.map((ingredient) => {
                            ingredient.ingredient.toLowerCase().includes(filter.value)
                        })
                    })
                    const ustensilFound = filtersArray.every((filter) => {
                        //recipe.ustensils.includes(filter.value);
                        recipe.ustensils.map((ustensil) => {
                            ustensil.toLowerCase().includes(filter.value)
                        })
                    })
                    if (arg == true) {
                        console.log(ingredientFound + ' ' + applianceFound + ' ' + +ustensilFound)
                    }
                    if (ingredientFound || applianceFound || ustensilFound) {
                        resultRecipes.push(recipe)
                    }
                })
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
            if (arg == true) { console.log(result) }
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
}