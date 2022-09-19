// get user input
var userInput = document.getElementById("mealInput");

var spoonApiBaseUrl = "https://api.spoonacular.com/recipes/complexSearch?query=";
var spoonApiKey = "ae4e48791531413a9caf17d0545a2cf9";
var chartBaseUrl = "https://quickchart.io/chart?width=200&height=200&chart={type:'bar',data:{labels:['Fat','Saturated Fat','Carbohydrates'], datasets:[{label:'Grams',";

var searchBtn = document.getElementById("searchBtn");
var clearBtn = document.getElementById("clearBtn");
var savedMealsEl = document.getElementById("savedMeals");
// select container of results
var mealsContainerEl = document.getElementById("mealsContainer");

// clears the previous results on page
function clearResults() {
    // remove contents of mealscontainer with html
    mealsContainerEl.innerHTML = "";
}

var storedMeals = localStorage.getItem("savedMeals")
if (storedMeals == null) {
    console.log("local is empty")

} else {
    var storedMealArray = JSON.parse(storedMeals)

    for (let i = 0; i < storedMealArray.length; i++) {
        const mealName = storedMealArray[i];

        var savedMealsBtn = document.createElement("button");
        savedMealsBtn.classList.add("btn", "waves-effect", "waves-light");
        savedMealsBtn.textContent = mealName;
        savedMealsEl.appendChild(savedMealsBtn);

        /// re Fetch for saved meals 
        savedMealsBtn.addEventListener("click", function (event) {

            clearResults();

            var spoonApiUrl = `${spoonApiBaseUrl}${mealName}&number=5&addRecipeNutrition=true&apiKey=${spoonApiKey}`;
            console.log(spoonApiUrl);

            fetch(spoonApiUrl).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data.results.length === 0) {
                    console.log("No results.");
                }
                else {
                    var results = data.results;
                    var foodName = results[0].title;
                    var foodImage = results[0].image;
                    var foodSummary = results[0].summary;
                    console.log(foodName);
                    console.log(foodImage);

                    var mealsContainerEl = document.getElementById("mealsContainer");

                    var mealContainerEl = document.createElement("section");
                    mealContainerEl.setAttribute('id', `meal`);
                    mealsContainerEl.appendChild(mealContainerEl)
        
                    var mealRowEl = document.createElement("section");
                    mealRowEl.setAttribute('class', 'col');
                    mealContainerEl.appendChild(mealRowEl);
        
                    var mealDescrEl = document.createElement("section");
                    mealDescrEl.classList.add('col', "s6");
                    mealDescrEl.setAttribute('id', 'mealDescription');
                    mealRowEl.appendChild(mealDescrEl);
        
                    var imageColEl = document.createElement("section");
                    imageColEl.classList.add('col', "s6");
                    imageColEl.setAttribute('id', 'imageColEl');
                    mealRowEl.appendChild(imageColEl);
        
                    var mealImageSecEl = document.createElement("section");
                    mealImageSecEl.setAttribute('id', 'mealImage');
                    imageColEl.appendChild(mealImageSecEl);
        
                    var mealChartSecEl = document.createElement("section");
                    mealChartSecEl.setAttribute('id', 'mealChart');
                    imageColEl.appendChild(mealChartSecEl);
        
                    // Appends html with name of dish
                    var searchNameContainer = document.getElementById("mealDescription");
                    var searchName = document.createElement("h4");
                    searchName.textContent = foodName;
                    searchNameContainer.appendChild(searchName);
        
                    // Appends html with image of dish
                    var searchImage = document.createElement("img");
                    var searchImageContainer = document.getElementById("mealImage");
                    searchImage.src = foodImage;
                    searchImageContainer.appendChild(searchImage);
        
                    // Appends html with description of dish
                    var searchSummary = document.createElement("p");
                    var searchSummaryContainer = document.getElementById("mealDescription");
                    searchSummary.innerHTML = foodSummary;
                    searchSummaryContainer.appendChild(searchSummary);
        
                    // Setting up nutrient data for chart
                    var nutrients = results[0].nutrition.nutrients;
                    var calories = nutrients[0].amount;
                    var fat = nutrients[1].amount;
                    var satFat = nutrients[2].amount;
                    var carbs = nutrients[3].amount;
        
                    // Appending chart image
                    var chartUrl = `${chartBaseUrl}data:[${fat},${satFat},${carbs}]}]}}`;
                    var chartImage = document.createElement("img");
                    var chartImageContainer = document.getElementById("mealChart");
                    chartImage.src = chartUrl;
                    var calorieCount = document.createElement("h5");
                    calorieCount.textContent = `Calories: ${calories}`;
                    chartImageContainer.appendChild(calorieCount);
                    chartImageContainer.appendChild(chartImage);
        
                    // Append meal description with save button //
                    var saveBtn = document.createElement("button");
                    saveBtn.classList.add("btn", "waves-effect", "waves-light");
        
                    saveBtn.textContent = "Save Dish";
                    searchSummaryContainer.appendChild(saveBtn);
                }
            })

        })

    }

}


searchBtn.addEventListener("click", function (event) {
    clearResults();
    var search = userInput.value.trim();

    var spoonApiUrl = `${spoonApiBaseUrl}${search}&number=5&addRecipeNutrition=true&apiKey=${spoonApiKey}`;
    console.log(spoonApiUrl);

    fetch(spoonApiUrl).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data.results.length === 0) {
            console.log("No results.");
        }
        else {
            var results = data.results;
            var foodName = results[0].title;
            var foodImage = results[0].image;
            var foodSummary = results[0].summary;
            console.log(foodName);
            console.log(foodImage);

            var mealsContainerEl = document.getElementById("mealsContainer");

            var mealContainerEl = document.createElement("section");
            mealContainerEl.setAttribute('id', `meal`);
            mealsContainerEl.appendChild(mealContainerEl)

            var mealRowEl = document.createElement("section");
            mealRowEl.setAttribute('class', 'col');
            mealContainerEl.appendChild(mealRowEl);

            var mealDescrEl = document.createElement("section");
            mealDescrEl.classList.add('col', "s6");
            mealDescrEl.setAttribute('id', 'mealDescription');
            mealRowEl.appendChild(mealDescrEl);

            var imageColEl = document.createElement("section");
            imageColEl.classList.add('col', "s6");
            imageColEl.setAttribute('id', 'imageColEl');
            mealRowEl.appendChild(imageColEl);

            var mealImageSecEl = document.createElement("section");
            mealImageSecEl.setAttribute('id', 'mealImage');
            imageColEl.appendChild(mealImageSecEl);

            var mealChartSecEl = document.createElement("section");
            mealChartSecEl.setAttribute('id', 'mealChart');
            imageColEl.appendChild(mealChartSecEl);

            // Appends html with name of dish
            var searchNameContainer = document.getElementById("mealDescription");
            var searchName = document.createElement("h4");
            searchName.textContent = foodName;
            searchNameContainer.appendChild(searchName);

            // Appends html with image of dish
            var searchImage = document.createElement("img");
            var searchImageContainer = document.getElementById("mealImage");
            searchImage.src = foodImage;
            searchImageContainer.appendChild(searchImage);

            // Appends html with description of dish
            var searchSummary = document.createElement("p");
            var searchSummaryContainer = document.getElementById("mealDescription");
            searchSummary.innerHTML = foodSummary;
            searchSummaryContainer.appendChild(searchSummary);

            // Setting up nutrient data for chart
            var nutrients = results[0].nutrition.nutrients;
            var calories = nutrients[0].amount;
            var fat = nutrients[1].amount;
            var satFat = nutrients[2].amount;
            var carbs = nutrients[3].amount;

            // Appending chart image
            var chartUrl = `${chartBaseUrl}data:[${fat},${satFat},${carbs}]}]}}`;
            var chartImage = document.createElement("img");
            var chartImageContainer = document.getElementById("mealChart");
            chartImage.src = chartUrl;
            var calorieCount = document.createElement("h5");
            calorieCount.textContent = `Calories: ${calories}`;
            chartImageContainer.appendChild(calorieCount);
            chartImageContainer.appendChild(chartImage);

            // Append meal description with save button //
            var saveBtn = document.createElement("button");
            saveBtn.classList.add("btn", "waves-effect", "waves-light");

            saveBtn.textContent = "Save Dish";
            searchSummaryContainer.appendChild(saveBtn);

            saveBtn.addEventListener("click", function (event) {

                var mealName = foodName;

                var savedMeals = JSON.parse(localStorage.getItem("savedMeals")) || [];
                savedMeals.push(mealName)
                localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
                console.log(savedMeals)

                var savedMealsBtn = document.createElement("button");
                savedMealsBtn.classList.add("btn", "waves-effect", "waves-light");
                savedMealsBtn.textContent = mealName;
                savedMealsEl.appendChild(savedMealsBtn);

                /// re Fetch for saved meals 

                savedMealsBtn.addEventListener("click", function (event) {
                    clearResults();
                    var spoonApiUrl = `${spoonApiBaseUrl}${mealName}&number=5&addRecipeNutrition=true&apiKey=${spoonApiKey}`;
                    console.log(spoonApiUrl);

                    fetch(spoonApiUrl).then(function (response) {
                        return response.json();
                    }).then(function (data) {

                        if (data.results.length === 0) {
                            console.log("No results.");
                        } else {
                            var foodName = results[0].title;
                            var foodImage = results[0].image;
                            var foodSummary = results[0].summary;

                            // creatiing base html 12.pm 
                            var mealContainerEl = document.createElement("section");
                            mealContainerEl.setAttribute('id', `meal`);
                            mealsContainerEl.appendChild(mealContainerEl)

                            var mealRowEl = document.createElement("section");
                            mealRowEl.setAttribute('class', 'col');
                            mealContainerEl.appendChild(mealRowEl);

                            var mealDescrEl = document.createElement("section");
                            mealDescrEl.classList.add('col', "s6");
                            mealDescrEl.setAttribute('id', 'mealDescription');
                            mealRowEl.appendChild(mealDescrEl);

                            var imageColEl = document.createElement("section");
                            imageColEl.classList.add('col', "s6");
                            imageColEl.setAttribute('id', 'imageColEl');
                            mealRowEl.appendChild(imageColEl);

                            var mealImageSecEl = document.createElement("section");
                            mealImageSecEl.setAttribute('id', 'mealImage');
                            mealRowEl.appendChild(mealImageSecEl);

                            var mealChartSecEl = document.createElement("section");
                            mealChartSecEl.setAttribute('id', 'mealChart');
                            mealRowEl.appendChild(mealChartSecEl);

                            // Appends html with name of dish
                            var searchName = document.createElement("h4");
                            searchName.textContent = foodName;
                            mealDescrEl.appendChild(searchName);

                            // Appends html with image of dish
                            var searchImage = document.createElement("img");
                            var searchImageContainer = document.getElementById("mealImage");
                            searchImage.src = foodImage;
                            mealImageSecEl.appendChild(searchImage);

                            // Appends html with description of dish
                            var searchSummary = document.createElement("p");
                            searchSummary.innerHTML = foodSummary;
                            mealDescrEl.appendChild(searchSummary);

                            // Setting up nutrient data for chart
                            var nutrients = results[0].nutrition.nutrients;
                            var calories = nutrients[0].amount;
                            var fat = nutrients[1].amount;
                            var satFat = nutrients[2].amount;
                            var carbs = nutrients[3].amount;

                            var chartUrl = `${chartBaseUrl}data:[${fat},${satFat},${carbs}]}]}}`;
                            var chartImage = document.createElement("img");
                            chartImage.src = chartUrl;
                            var calorieCount = document.createElement("h5");
                            calorieCount.textContent = `Calories: ${calories}`;
                            mealChartSecEl.appendChild(calorieCount);
                            mealChartSecEl.appendChild(chartImage);

                        }
                    })
                })
            })
        }
    })

})

clearBtn.addEventListener("click", function (event) {
    localStorage.clear();
    savedMealsEl.innerHTML = "";
});