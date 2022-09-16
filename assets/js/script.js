// get user input



var userInput = document.getElementById("mealInput");
// console.log(userInput);

var spoonApiBaseUrl = "https://api.spoonacular.com/recipes/complexSearch?query=";
var spoonApiKey = "ae4e48791531413a9caf17d0545a2cf9";

var chartBaseUrl = "https://quickchart.io/chart?width=200&height=200&chart={type:'bar',data:{labels:['Calories','Fat','Saturated Fat','Carbohydrates'], datasets:[{label:'Nutrients',";
// https://quickchart.io/chart?c={type:'bar',data:{labels:
// ['Q1','Q2','Q3','Q4'], datasets:[{label:'Users',data:[50,60,70,180]},
// {label:'Revenue',data:[100,200,300,400]}]}}

var searchBtn = document.getElementById("searchBtn");
var clearBtn = document.getElementById("clearBtn");
var savedMealsEl = document.getElementById("savedMeals");
// select container of results
var mealsContainerEl = document.getElementById("mealsContainer");

// clears the previous results on page
function clearResults(){
    // remove contents of mealscontainer with html
    mealsContainerEl.innerHTML="";
}


var storedMeals = localStorage.getItem("savedMeals")
if ( storedMeals == null){
    console.log("local is empty")
    
} else{ 
    var storedMealArray = JSON.parse(storedMeals)

    for (let i = 0; i < storedMealArray.length; i++) {
        const mealName = storedMealArray[i];
        
        var savedMealsBtn = document.createElement("button");
        savedMealsBtn.classList.add("btn", "waves-effect", "waves-light");
        savedMealsBtn.textContent = mealName;
        savedMealsEl.appendChild(savedMealsBtn);
    
        /// re Fetch for saved meals 
    
        savedMealsBtn.addEventListener("click", function (event) {
    
            var spoonApiUrl = `${spoonApiBaseUrl}${mealName}&number=5&addRecipeNutrition=true&apiKey=${spoonApiKey}`;
            console.log(spoonApiUrl);
    
            fetch(spoonApiUrl).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data.results.length === 0) {
                    console.log("No results.");
                } else {
                    var foodName = data.results[0].title;
                    var foodImage = data.results[0].image;
                    var foodSummary = data.results[0].summary;
                    // var foodNutrients = data.results[0].nutrition.nutrients[0].amount;
                    console.log(foodName);
                    console.log(foodImage);
    
                    // displays nutrients
                    // for (let i = 0; i < 4; i++) {
                    //     console.log(data.results[0].nutrition.nutrients[i].amount, data.results[0].nutrition.nutrients[i].name);
                    // }
    
                    // Appends html with name of dish
                    var searchName = document.createElement("h4");
                    var searchNameContainer = document.getElementById("mealDescription");
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
                    var nutrients = data.results[0].nutrition.nutrients;
                    var calories = nutrients[0].amount;
                    var fat = nutrients[1].amount;
                    var satFat = nutrients[2].amount;
                    var carbs = nutrients[3].amount;
    
                    var chartUrl = `${chartBaseUrl}data:[${calories},${fat},${satFat},${carbs}]}]}}`;
                    var chartImage = document.createElement("img");
                    var chartImageContainer = document.getElementById("chart");
                    chartImage.src = chartUrl;
                    chartImageContainer.appendChild(chartImage);
    
    
                }
            })
    
    
    
        })//////
    
    
    }



}


searchBtn.addEventListener("click", function (event) {
    clearResults();
    var search = userInput.value.trim();
    // console.log(search);

    var spoonApiUrl = `${spoonApiBaseUrl}${search}&number=5&addRecipeNutrition=true&apiKey=${spoonApiKey}`;
    console.log(spoonApiUrl);

    fetch(spoonApiUrl).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data.results.length === 0) {
            console.log("No results.");
        } else {
            var foodName = data.results[0].title;
            var foodImage = data.results[0].image;
            var foodSummary = data.results[0].summary;
            // var foodNutrients = data.results[0].nutrition.nutrients[0].amount;
            console.log(foodName);
            console.log(foodImage);

            // displays nutrients
            // for (let i = 0; i < 4; i++) {
            //     console.log(data.results[0].nutrition.nutrients[i].amount, data.results[0].nutrition.nutrients[i].name);
            // }
            var mealContainerEl = document.createElement("section");
            mealContainerEl.setAttribute('id','meal1');
            mealsContainerEl.appendChild(mealContainerEl)

            var mealRowEl = document.createElement("section");
            mealRowEl.setAttribute('class','col');
            mealsContainerEl.appendChild(mealRowEl);

            var mealDescrEl = document.createElement("section");
            mealDescrEl.classList.add('col',"s6");
            mealDescrEl.setAttribute('id','mealDescription');
            mealsContainerEl.appendChild(mealDescrEl);
            

            var imageColEl = document.createElement("section");
            imageColEl.classList.add('col',"s6");
           imageColEl.setAttribute('id','imageColEl');
            mealsContainerEl.appendChild(imageColEl);

            var mealImageSecEl = document.createElement("section");
            mealImageSecEl.setAttribute('id','mealImage');
            mealsContainerEl.appendChild(mealImageSecEl);

            var mealChartSecEl = document.createElement("section");
            mealChartSecEl.setAttribute('id','mealChart');
            mealsContainerEl.appendChild(mealChartSecEl);

            
           


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
            var nutrients = data.results[0].nutrition.nutrients;
            var calories = nutrients[0].amount;
            var fat = nutrients[1].amount;
            var satFat = nutrients[2].amount;
            var carbs = nutrients[3].amount;

            // console.log(calories, fat, satFat, carbs);

            // https://quickchart.io/chart?c={type:'bar',data:{labels:
            // ['Q1','Q2','Q3','Q4'], datasets:[{label:'Users',data:[50,60,70,180]},
            // {label:'Revenue',data:[100,200,300,400]}]}}
            // {type:'bar',data:{labels:['Calories','Fat','Saturated Fat','Carbohydrates'], datasets:[{label:'Nutrients'data:[440.735.160.8657.98]}]}}


            // Appending chart image
            var chartUrl = `${chartBaseUrl}data:[${calories},${fat},${satFat},${carbs}]}]}}`;
            var chartImage = document.createElement("img");
            var chartImageContainer = document.getElementById("mealChart");
            chartImage.src = chartUrl;
            chartImageContainer.appendChild(chartImage);

            // Append meal description with save button //
            var saveBtn = document.createElement("button");
            saveBtn.classList.add("btn", "waves-effect", "waves-light");
            saveBtn.textContent = "Save Dish";
            searchSummaryContainer.appendChild(saveBtn);


            saveBtn.addEventListener("click", function (event) {
                //clear 
                
               
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
                            var foodName = data.results[0].title;
                            var foodImage = data.results[0].image;
                            var foodSummary = data.results[0].summary;
                            // var foodNutrients = data.results[0].nutrition.nutrients[0].amount;
                            console.log(foodName);
                            console.log(foodImage);

                            // displays nutrients
                            // for (let i = 0; i < 4; i++) {
                            //     console.log(data.results[0].nutrition.nutrients[i].amount, data.results[0].nutrition.nutrients[i].name);
                            // }

                            // creatiing base html 12.pm 
                            var mealContainerEl = document.createElement("section");
                            mealContainerEl.setAttribute('id','meal1');
                            mealsContainerEl.appendChild(mealContainerEl)
                
                            var mealRowEl = document.createElement("section");
                            mealRowEl.setAttribute('class','col');
                            mealsContainerEl.appendChild(mealRowEl);
                
                            var mealDescrEl = document.createElement("section");
                            mealDescrEl.classList.add('col',"s6");
                            mealDescrEl.setAttribute('id','mealDescription');
                            mealsContainerEl.appendChild(mealDescrEl);
                            
                
                            var imageColEl = document.createElement("section");
                            imageColEl.classList.add('col',"s6");
                           imageColEl.setAttribute('id','imageColEl');
                            mealsContainerEl.appendChild(imageColEl);
                
                            var mealImageSecEl = document.createElement("section");
                            mealImageSecEl.setAttribute('id','mealImage');
                            mealsContainerEl.appendChild(mealImageSecEl);
                
                            var mealChartSecEl = document.createElement("section");
                            mealChartSecEl.setAttribute('id','mealChart');
                            mealsContainerEl.appendChild(mealChartSecEl);



                            // Appends html with name of dish
                            var searchName = document.createElement("h4");
                            var searchNameContainer = document.getElementById("mealDescription");
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
                            var nutrients = data.results[0].nutrition.nutrients;
                            var calories = nutrients[0].amount;
                            var fat = nutrients[1].amount;
                            var satFat = nutrients[2].amount;
                            var carbs = nutrients[3].amount;

                            var chartUrl = `${chartBaseUrl}data:[${calories},${fat},${satFat},${carbs}]}]}}`;
                            var chartImage = document.createElement("img");
                            var chartImageContainer = document.getElementById("mealChart");
                            chartImage.src = chartUrl;
                            chartImageContainer.appendChild(chartImage);


                        }
                    })



                })//////
            })

        }

    })

})

clearBtn.addEventListener("click", function (event) {
    localStorage.clear();
    savedMealsEl.innerHTML = "";
   
});



// title
// food description = summary
// image
// nutrition -> nutrients -> calories
// ingredients
//

// get info from spoonacular api

// use spoonacular api data to search meal info

// use spoonacular api data to call charts api

// populate rsponsefor charts and spoonacular on html

// populate recent search

// save recent searches to local storage
