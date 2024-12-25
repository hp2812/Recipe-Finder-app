document.addEventListener('DOMContentLoaded', function(){
const searchBtn = document.querySelector(".searchBtn");
const searchBox = document.querySelector(".searchBox");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector('.recipe-close-btn')
const fetchrecipe= async (query)=>{
    recipeContainer.innerHTML="<h2>Fetching Recipe.......</h2>";
    try{
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    recipeContainer.innerHTML="";
    response.meals.forEach(meals=>{
       const recipeDiv = document.createElement('div');
       recipeDiv.classList.add('recipe');
       recipeDiv.innerHTML=`
       <img src="${meals.strMealThumb}">
       <h3>${meals.strMeal}</h3>
       <p><span>${meals.strArea}</span> Dish</p>
       <p>Belongs to <span>${meals.strCategory}</span> Category</p>`;
       const button = document.createElement('button');
       button.textContent= "View Recipe";
        /*Adding Event Listner on button */
        button.addEventListener('click',function(){
            openRecipePopup(meals);

        });


        recipeDiv.appendChild(button);
       recipeContainer.appendChild(recipeDiv);
       

    });
}catch(error){
    recipeContainer.innerHTML="<h2>Error in fetching Recipes......</h2>";

}

};
const fetchIngredients = (meals)=>{
    let ingredientList ="";
    for(let i=1;1<=20;i++){
        const ingredient = meals[`strIngredient${i}`];
        if(ingredient){
            const measure = meals[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`;


        }else{
            break;
        }



    }
    return ingredientList;

}
const openRecipePopup = (meals)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meals.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientList">
    ${fetchIngredients(meals)}
    </ul>
    <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p >${meals.strInstructions}</p>
    </div>


    `;
    console.log(meals);
    recipeDetailsContent.parentElement.style.display="block";

}



searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h3> Type the Meal in the Search box.</h3>`;
        return ;
    }
    fetchrecipe(searchInput);

   
});
recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";



});


});

