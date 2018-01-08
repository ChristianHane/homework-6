$("#header").css({"height": "325px", "margin": "0 0 5% 0", "background-image": "url('./assets/header-image4.png')", "font-weight": "900"});

$("h1").css({"padding": "60px 0px 30px 0px", "text-align": "center", "font-size": "50px", "color": "ghostwhite", "text-shadow": "4px 2px black"});

$("#search-field").css({"margin": "10px 0", "text-align": "center", "font-size": "20px", "color": "white"});

$("#search[type=text]").css({"width": "400px", "box-sizing": "border-box", "border-top": "2px solid #ccc", "border-bottom": "2px solid #ccc", "border-left": "2px solid #ccc", 
"font-size": "15px", "background-color": "white", "background-image": "url('./assets/searchicon.png')", "background-position": "10px 10px", 
"background-repeat": "no-repeat", "padding": "12px 20px 12px 40px", "border-right": "0"});

$("#buttons-view").css({"text-align": "center", "margin-top": "30px"});

$("#add-gif").css({"background-color": "rgb(122, 165, 10)", "border": "none", "color": "white", "padding": "13px 25px",
"text-align": "center", "text-decoration": "none", "display": "inline-block", "font-size": "15px",
"margin": "-5px", "border-top": "2px solid green", "border-bottom": "2px solid green", "border-right": "2px solid green", "cursor": "pointer"});

$("body").css({"background-color": "rgb(7, 111, 94)"});

var gifs = ["The Office", "The Walking Dead", "Game of Thrones", "Black Mirror"];

function displayGifs() {
    $("#gifs-view").empty();
    var apiKey = "&api_key=Cxt32PB28aa0bXcpbws5Z3mzzADbUUW4"
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gif + "&limit=10" + apiKey;

    $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {
        var results = response.data;
        console.log(response);

        for(i = 0; i < results.length; i++){
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p class='rating'>").text("Rating: " + rating);

            var imageStill = results[i].images["480w_still"].url;
            var imageAnimate = results[i].images.downsized_medium.url; 

            var tvShowImage = $("<img class='tvImage' title='Play'>");
            tvShowImage.attr("src", imageStill); 
            tvShowImage.attr("data-still", imageStill);
            tvShowImage.attr("data-animate", imageAnimate);
            tvShowImage.attr("data-state", "still");
            gifDiv.append(tvShowImage);
            gifDiv.append(p);
            $("#gifs-view").append(gifDiv);
        };
        $(".item").css({"width": "40%", "float": "left", "height": "350px", "margin": " 20px 0 20px 7%", "background-color": "rgb(0, 68, 57)", "text-align": "center", "padding": "40px 0 20px 0", "border": "2px  solid rgb(38, 147, 9)"});
        $(".rating").css({"color": "white", "margin-top": "15px", "font-weight": "550"});
    });
};

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < gifs.length; i++) {
        var a = $("<button>");
        a.addClass("gif");
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#buttons-view").append(a);
    };
    $(".gif").css({"background-color": "rgb(122, 165, 10)", "border": "none", "color": "white", "padding": "10px 25px",
    "text-align": "center", "text-decoration": "none", "display": "inline-block", "font-size": "15px",
    "margin": "5px", "border": "2px solid green", "cursor": "pointer"});
};

$("#add-gif").on("click", function(event) {
    event.preventDefault(); 
    var checkSearch = $("#search").val().trim();
    var repeat = false;
    for(i = 0; i < gifs.length; i++){
        if(checkSearch === gifs[i]){
            repeat = true;
            $("#search").val("");
        };
    };
    if(checkSearch.length !== 0 && repeat === false){
        var gif = $("#search").val().trim();
        console.log(gif);
        gifs.push(gif);
        renderButtons();
        $("#search").val("");
    };
});

$(document).on("click", ".gif", displayGifs);

$(document).on("click", ".tvImage", changeImage);

function changeImage(){
    var state = $(this).attr("data-state");
    var animate = $(this).attr("data-animate");
    var still = $(this).attr("data-still");

    if(state === "still") {
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");;
    } else{
        $(this).attr("src", still);
        $(this).attr("data-state", "still")
    };
};

renderButtons();



