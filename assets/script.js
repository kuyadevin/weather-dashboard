var button = document.getElementById("button")
var form = document.querySelector(form)
var city= JSON.stringify(document.getElementById("input").value)



function showInput(event){
    var city= (document.getElementById("input").value)
    event.preventDefault();
    localStorage.setItem("location", city);
    var cityButton= $("<button>").addClass(oldCity,"form-control", "cityButton");
    var oldCity = cityButton.textContent=city;
    $(".col-3").append(cityButton)
    
}
button.addEventListener("click", showInput)
