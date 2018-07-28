$( document ).ready( function() {
    
    // declaring variable to hold our gif topics
    
    
    var topics = ["chihuahuas", "otters", "ocelots", "axolotls", "tortoises", "mice", "guinea pigs", "owls", "bats", "rabbits"];

    // declaring function to populate page with buttons for each topic

    function btnPopulate() {
        $(".topicArray").empty();
        for (i = 0; i < topics.length; i++) {
            var topicBtn = $("<button>");
            $(topicBtn).attr("type", "button");
            $(topicBtn).attr("value", topics[i]);
            $(topicBtn).attr("class", "gifBtn");
            $(topicBtn).text(topics[i]);
            $(".topicArray").append(topicBtn);
        }
    }

    // populating page with initial buttons

    btnPopulate();

    // click function for the "add choice" button so user inputs can be added to the available buttons, if the user inputs nothing
    // the button will not be added

    $(".addChoice").on("click", function() {
        var userChoice = $(".userText").val().trim();
        if (userChoice === "") {
            return;
        }
        topics.push(userChoice);
        btnPopulate();
    })


    // click function for the main buttons, uses the ajax call for 10 gifs based on which button the user clicked and adds them to the page
    // in still form, as well as displaying the rating of the gif below them

    $(document).on("click", ".gifBtn", function() {
        var topic = $(this).val();
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=AcN1tGKKi7bbptq3UtIL3QTwWEFl0EPX&limit=10"
        $(".gifBox").empty();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            for (i = 0; i < response.data.length; i++) {
                var respIndex = response.data[i];
                var stillGif = respIndex.images.fixed_height_still.url;
                var activeGif = respIndex.images.fixed_height.url;
                var rating = respIndex.rating;
                var ratingBox = $("<h3>");
                var imgBox = $("<div>");
                $(imgBox).attr("class", "imgBox");
                $(ratingBox).append(rating);
                var imgElem = $("<img>");
                $(imgElem).attr("data-still", stillGif);
                $(imgElem).attr("data-active", activeGif);
                $(imgElem).attr("data-state", "still");
                $(imgElem).attr("class", "animalGif");
                $(imgElem).attr("src", stillGif);
                $(".gifBox").append(imgBox);
                $(imgBox).append(imgElem);
                $(imgBox).append(ratingBox);
            }

        })
    
    })

    // stop and start click function, when user clicks a still image the src attribute is changed to the active gif and vice versa

    $(document).on("click", ".animalGif", function() {
        var gifState = $(this).attr("data-state");
        if (gifState === "still") {
            $(this).attr("src", $(this).attr("data-active"));
            $(this).attr("data-state", "active");
        } else if (gifState === "active"){
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })

   


})



