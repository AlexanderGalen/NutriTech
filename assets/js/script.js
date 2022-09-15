//get user input

var userInput = document.getElementById("mealInput");
// console.log(userInput);

var spoonApiBaseUrl = "https://api.spoonacular.com/recipes/complexSearch?query=";
var spoonApiKey = "ae4e48791531413a9caf17d0545a2cf9";

var searchBtn = document.getElementById("searchBtn");
var clearBtn = document.getElementById("clearBtn");

searchBtn.addEventListener("click", function(event){
    event.preventDefault();

    var search = userInput.value.trim();
    // console.log(search);

    var spoonApiUrl = `${spoonApiBaseUrl}${search}&number=5&addRecipeNutrition=true&apiKey=${spoonApiKey}`;
    console.log(spoonApiUrl);

    fetch(spoonApiUrl).then(function(response){
        return response.json();
    }).then(function(data){
        if (data.results.length === 0) {
            console.log("No results.");
        }
        else {
            var foodName = data.results[0].title;
            var foodImage = data.results[0].image;
            var foodSummary = data.results[0].summary;
            // var foodNutrients = data.results[0].nutrition.nutrients[0].amount;
            console.log(foodName);
            console.log(foodImage);
            // console.log(foodSummary);
            // console.log(foodNutrients);
            // console.log(data);
            for (let i = 0; i < 5; i++) {
                console.log(data.results[0].nutrition.nutrients[i].amount, data.results[0].nutrition.nutrients[i].name);
            }
            var searchName = document.createElement("h4");
            var searchNameContainer = document.getElementById("mealDescription");
            searchName.textContent = foodName;
            searchNameContainer.appendChild(searchName);
            
            var searchImage = document.createElement("img");
            var searchImageContainer = document.getElementById("mealImage");
            searchImage.src = foodImage;
            searchImageContainer.appendChild(searchImage);
            
            var searchSummary = document.createElement("p");
            var searchSummaryContainer = document.getElementById("mealDescription");
            searchSummary.innerHTML = foodSummary;
            searchSummaryContainer.appendChild(searchSummary);
        }
    })

})

// title
// food description = summary
// image
// nutrition -> nutrients -> calories
// ingredients
// 

//get info from spoonacular api

//use spoonacular api data to search meal info

//use spoonacular api data to call charts api

//populate rsponsefor charts and spoonacular on html

// populate recent search

//save recent searches to local storage

