// Get the required elements from the DOM

const searchRecipe = document.getElementById("searchRecipe");
const searchButton = document.getElementById("searchButton");
const recipeSection = document.querySelector(".recipeSection");
const recipeDetailsContent = document.querySelector(".recipeDetailsContent");
const recipeCloseBtn = document.querySelector(".recipeCloseBtn");

// Function to fetch recipes

const fetchRecipes = async (query) =>{
    recipeSection.innerHTML = "<h2>Fetching Recipes...</h2>";

    try {

        // Make the API request and get the response data
   const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const responseData = await data.json();

    recipeSection.innerHTML = "";

    // Iterate through each meal in the response data and create a recipe element

    responseData.meals.forEach(element => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
        <img src="${element.strMealThumb}">
        <h3>${element.strMeal}</h3>
        <p><span>${element.strArea}</span> Dish</p>
        <p>Belong to <span>${element.strCategory}</span> Category</p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        // Add event listener to the button to open recipe details popup

        button.addEventListener('click', () => {
            openRecipePopup(element);
        });

       recipeSection.appendChild(recipeDiv);
    });

}
catch (error) {

     // Handle error during API request
    recipeSection.innerHTML ="<h2>Error in Fetching Recipes...</h2>"
}
}

// Function to fetch ingredients

const fetchIngredients = (element) => {
    let ingredientsList = "";

    for(let i = 1; i<=20; i++)
    {
        const ingredient = element[`strIngredient${i}`];
        if(ingredient){
            const measure = element[`strMeasure${i}`];
            ingredientsList +=`<li> ${measure} ${ingredient}</li>`
        }
        else
        {
            break;
        }
    }

    return ingredientsList;
}

// Function to open recipe details popup

const openRecipePopup = (element) => {
    recipeDetailsContent.innerHTML =  `
    <h2 class="recipeName">${element.strMeal}</h2>
    <div class="centerImage">
    <img class="recipeThumb" src="${element.strMealThumb}">
    <a class="watchVideo" target="_blank" href="${element.strYoutube}">Watch Video</a>
    </div>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(element)}</ul>

    <div class="recipeInstruction">
       <h3>Instruction:</h3>
       <p>${element.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}



// Event listener for closing the recipe details popup

recipeCloseBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display = "none";
});


// Event listener for the search button

searchButton.addEventListener('click', ()=> {
   const searchInput = searchRecipe.value.trim();
   if(!searchInput) {
    recipeSection.innerHTML ="<h2>Type the meal in the search box.</h2>"
    return;
   }
   fetchRecipes(searchInput);
   searchRecipe.value = "";
})
