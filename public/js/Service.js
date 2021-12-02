export default class Service {
    static loadRecipes(array, list) {
            list.innerHTML = ``;
            if (array.length > 0) {
                list.style.display = "grid";
                for (var i = 0; i < array.length; i++) {
                    array[i].ingredients.map((a) => {
                        if (a.unit == undefined) {
                            a.unit = "";
                        }
                        if (a.quantity == undefined) {
                            a.quantity = "";
                        }
                    })
                    var template = `
        <article class="recipes__recipe">
        <img src="/images/img.png" alt="image" class="recipes__image">
        <div class="recipes__details">
            <div class="recipes__title_time">
                <div class="recipes__title">
                    ${array[i].name}
                </div>
                <div class="recipes__time">
                    <i class="far fa-clock recipes__icon"></i>
                    <div class="recipes__time_value">
                        ${array[i].time} min
                    </div>
                </div>
            </div>
            <div class="recipes__ingredients_description">
                <div class="recipes__ingredients">
                        ${array[i].ingredients.map((a) => `
                        <label for="ingredient" class="recipes__ingredient">
                            <p class="recipes__ingredient_name">
                            ${a.ingredient} : 
                        </p>
                        <p class="recipes__ingredient_value">
                            ${a.quantity} ${a.unit}
                        </p>
                        </label>
                        `).join('')}
                </div>
                <label class="recipes__description">
                    ${array[i].description}
                </label>
            </div>
        </div>
    </article>
        `
            list.innerHTML += template;
            }
        }else{
            list.style.display="block";
            list.innerHTML=`
            <p class="recipes__no_result">
                Aucune rectette ne correspond à votre critère ... vous pouvez chercher "tarte aux pommes","poisson", etc ...
            </p>
            `
        } 
    }
    static getIngredients(array){
        var ingredientsArray=[];
        array.forEach((recipe)=>{
            recipe.ingredients.forEach((ingredient)=>{
                if(ingredientsArray.indexOf(ingredient.ingredient.toLowerCase()) == -1){
                    ingredientsArray.push(ingredient.ingredient.toLowerCase())
                }
            })
        });
        return ingredientsArray;
    }
    static getAppliance(array){
        var applianceArray=[];
        array.forEach((recipe)=>{
            if(applianceArray.indexOf(recipe.appliance.toLowerCase()) == -1){
                applianceArray.push(recipe.appliance.toLowerCase());
            }
        })
        return applianceArray;
    }
    static getUstensils(array) {
        var ustensilsArray=[];
        array.forEach((recipe)=>{
            recipe.ustensils.forEach((ustensil)=>{
                if(ustensilsArray.indexOf(ustensil.toLowerCase())==-1){
                    ustensilsArray.push(ustensil.toLowerCase());
                }
            })
        })
        return ustensilsArray;
    }
}