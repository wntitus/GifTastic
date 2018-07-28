$( document ).ready( function() {
    
    // declaring variable to hold our gif topics
    
    
    var topics = ["chihuahuas", "otters", "ocelots", "axolotls", "tortoises", "mice", "guinea pigs", "owls", "bats", "rabbits"];

    // declaring function to populate page with buttons for each topic

    function btnPopulate() {
        for (i = 0; i < topics.length; i++) {
            var topicBtn = $("<button>");
            $(topicBtn).attr("type", "button");
            $(topicBtn).attr("value", topics[i]);
            $(topicBtn).attr("class", "gifBtn");
            $(topicBtn).text(topics[i]);
            $(".topicArray").append(topicBtn);
        }
    }

    btnPopulate();


    $(".gifBtn").on("click", function() {
        var topic = $(this).val();
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=AcN1tGKKi7bbptq3UtIL3QTwWEFl0EPX&limit=10"
        $(".gifBox").empty();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            for (i = 0; i < response.data.length; i++) {
                var respIndex = response.data[i];
                var stillGif = respIndex.images.fixed_height_still.url;
                var activeGif = respIndex.images.fixed_height.url;
                var imgElem = $("<img>");
                $(imgElem).attr("data-still", stillGif);
                $(imgElem).attr("data-active", activeGif);
                $(imgElem).attr("src", stillGif);
                $(".gifBox").append(imgElem);
            }
        })
    
    })
})



