import recipes from '../../recipes.js'
export default class Service {
    static loadRecipesAndFilters(search, filtersArray) {
        let recipesArr = recipes;
        //console.log(search)
        if (search !== undefined && !filtersArray) {
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
        } else if (filtersArray && !search) {
            let resultRecipes = [];
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
        } else if (search !== undefined && filtersArray) {
            //console.log(filtersArray)
            let resultRecipes = [];
            search.forEach((recipe) => {
                let ingredients = [
                    ...new Set(recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()))
                ];
                let appliance = recipe.appliance.toLowerCase();
                let ustensils = [
                        ...new Set(recipe.ustensils.map(ustensil => ustensil.toLowerCase()))
                    ]
                    //let applianceFound = filtersArray.every(filter => filter.value == appliance && filter.type == "appareils");
                    //let ingredientsFound = filtersArray.every(filter => filter.value == ingredients && filter.type == "ingredients");
                    //let ustensilsFound = filtersArray.every(filter => filter.value == ustensils && filter.type == "ustensiles");
                let found = filtersArray.every(filter => recipe.ingredients.includes(filter.value) || recipe.ustensils.includes(filter.value) || recipe.appliance == filter.value)
                if (found) {
                    resultRecipes.push(recipe)
                }
            })
            console.log(resultRecipes)
            const result = {
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
}