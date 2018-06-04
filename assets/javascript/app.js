$(document).ready(function () {


    $('button').on('click',function(){
        var getGIFS = $(this).attr('name')
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + getGIFS + "&api_key=ZGnYY3bsUAuW0GP0W5Rt5Djk9em7lHLX&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        })


            .then(function(response) {
                var results = response.data;
                for (i = 0; i < results.length; i++) {
                    var GIFDivs = $("<div>");
                    var ratings = $("<p>").text("Rating: " + results[i].rating);
                    var GIFImages = $("<img>");
                    var pause = results[i].images.fixed_height_still.url;
                    var move = results[i].images.fixed_height.url;


                    GIFImages.attr("src", pause);
                    GIFImages.attr("data-still", pause);
                    GIFImages.attr("data-animate", move);
                    GIFImages.attr("data-state", "still");
                    GIFImages.addClass("gif")
                    GIFDivs.append(ratings);
                    GIFDivs.append(GIFImages);
                    $("#display").prepend(GIFDivs);
                    console.log(move);
                    console.log(pause);
                }
            });
    });


    $('.gif').on('click',function(){
        var state = $(this).attr("data-state");
        


        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } 
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});