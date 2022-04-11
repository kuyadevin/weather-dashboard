var button = document.getElementById("button")
var form = document.querySelector(form)
var city= JSON.stringify(document.getElementById("input").value)
var key="a7e97ca14eb00aee24f5e5ef8502534a"

function showInput(event){
    var city= document.getElementById("input").value;
    event.preventDefault();
    localStorage.setItem("location", city);

    var cityButton= $("<button>").addClass("form-control", "cityButton");
    $(".col-3").append(cityButton);
    $(cityButton).text(city);
    
    
}

function getAPI(){
    var city= document.getElementById("input").value;
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a7e97ca14eb00aee24f5e5ef8502534a"
    fetch(apiURL,{
        method:'Get',
        credentials: 'same-origin',
        redirect:'follow',
    })
        .then(function(response){
            console.log(response);
            return response.json();
        })
        .then(function(data){
            console.log(data);
        })
}
button.addEventListener("click", showInput)
button.addEventListener("click", getAPI)