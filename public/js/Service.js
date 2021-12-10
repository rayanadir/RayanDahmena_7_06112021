import recipes from '../../recipes.js'
export default class Service {
    static loadRecipes() {
        return recipes;
    }
    static getIngredients() {
        var ingredientsArray = [];
        recipes.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
                if (ingredientsArray.indexOf(ingredient.ingredient.toLowerCase()) == -1) {
                    ingredientsArray.push(ingredient.ingredient.toLowerCase())
                }
            })
        });
        return ingredientsArray;
    }
    static getAppliance() {
        var applianceArray = [];
        recipes.forEach((recipe) => {
            if (applianceArray.indexOf(recipe.appliance.toLowerCase()) == -1) {
                applianceArray.push(recipe.appliance.toLowerCase());
            }
        })
        return applianceArray;
    }
    static getUstensils() {
        var ustensilsArray = [];
        recipes.forEach((recipe) => {
            recipe.ustensils.forEach((ustensil) => {
                if (ustensilsArray.indexOf(ustensil.toLowerCase()) == -1) {
                    ustensilsArray.push(ustensil.toLowerCase());
                }
            })
        });
        return ustensilsArray;
    }
}