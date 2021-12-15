import recipes from '../../recipes.js'
export default class Service {
    static loadRecipes() {
        return recipes;
    }
    static getIngredients(filter) {
        let ingredients = [
            ...new Set(recipes.map(recipe => recipe.ingredients).flat())
        ];
        if (filter) {
            ingredients = ingredients.filter(ingredient => ingredient.toLowerCase().indexOf(filter.toLowerCase()) > -1);
        }
        return ingredients;
        /*var ingredientsArray = [];
        recipes.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
                if (ingredientsArray.indexOf(ingredient.ingredient.toLowerCase()) == -1) {
                    ingredientsArray.push(ingredient.ingredient.toLowerCase())
                }
            })
        });
        return ingredientsArray;*/
    }
    static getAppliance(filter) {
        let appliances = [
            ...new Set(recipes.map(recipe => recipe.appliance))
        ];
        if (filter) {
            appliances = appliances
                .filter(appliance => appliance.toLowerCase().indexOf(filter.toLowerCase()) > -1)
        }
        return appliances;
        /*var applianceArray = [];
        recipes.forEach((recipe) => {
            if (applianceArray.indexOf(recipe.appliance.toLowerCase()) == -1) {
                applianceArray.push(recipe.appliance.toLowerCase());
            }
        })
        return applianceArray;*/
    }
    static getUstensils(filter) {
        let ustensils = [
            ...new Set(recipes.map(recipe => recipe.ustensils).flat())
        ];
        if (filter) {
            ustensils = ustensils
                .filter(ustensil => ustensil.toLowerCase().indexOf(filter.toLowerCase()) > -1)
        }
        return ustensils
            /*var ustensilsArray = [];
            recipes.forEach((recipe) => {
                recipe.ustensils.forEach((ustensil) => {
                    if (ustensilsArray.indexOf(ustensil.toLowerCase()) == -1) {
                        ustensilsArray.push(ustensil.toLowerCase());
                    }
                })
            });
            return ustensilsArray;*/
    }
}