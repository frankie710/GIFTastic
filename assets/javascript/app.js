$(document).ready(function () {



    $('#GIFsButtons').on('click', '#btn', function () {
        var getGIFS = $(this).attr('name')
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + getGIFS + "&api_key=ZGnYY3bsUAuW0GP0W5Rt5Djk9em7lHLX&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        })


            .then(function (response) {
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
                    GIFImages.addClass("gif");
                    GIFDivs.append(ratings);
                    GIFDivs.append(GIFImages);
                    $("#display").prepend(GIFDivs);
                }
            });
    });


    var topics = [];
    var savedGIFArray = [];
    var displayArray = [];
    $('.submitBtn').on('click', "#addBtn", function () {
        event.preventDefault();
        var btnToAdd = $('#newGIFs').val().trim();
        topics.push(btnToAdd);
        $('#addNewBtn').empty();
        for (i = 0; i < topics.length; i++) {
            var b = $('<button class = "btn-" + topic.i>')
            b.attr("id", "btn");
            b.attr("name", topics[i]);
            b.text(topics[i]);
            $("#addNewBtn").append(b);
        }
    });


    $('#display').on('click', ".gif", function () {
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


    $('#display').on('click', '#saveBtn', function () {
        event.preventDefault();
        var savedGIFs = $('#saveBtn').attr('href');
        savedGIFArray.push(savedGIFs);
        localStorage.setItem("savedGIFs", savedGIFArray);
    });
});