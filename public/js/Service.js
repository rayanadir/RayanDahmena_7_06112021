import recipes from '../../recipes.js'
export default class Service {
    static loadRecipesAndFilters(search, filtersArray) {
        let recipesArr = recipes;
        if (search) {
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
        if (filtersArray) {
            const resultRecipes = [];
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
            console.log(resultRecipes)
            if (resultRecipes.length == 0) {
                return recipesArr;
            }
            return resultRecipes;
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