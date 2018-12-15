// Build Topic Array 
//make buttons for base Array in HTML
//make form to take user input
//build AJAX query 
//build form button to take user input and add to the array 
var  topic = ["Sonic", "Mario", "Megaman"];

console.log( topic)

$( "button" ).on( "click", function(stillGif){

      var characters = $(this).attr( "data-character" );
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" 
    + characters + "&api_key=KNEF8r4vJQFJs9tBGSaM1VDZcIrJVyHi&limit=10"

    $.ajax({

        url: queryURL,
        method: "GET"
    }).then(function(response){
     var results = response.data;

     for ( var i = 0; i < results.length; i++){

        var charDiv = $("<div class = 'char'>");
      
        var rating = results[i].rating;

        var p = $( "<p>" ).text( "Rating:" + rating);

        var charImg = $("<img>");
        charImg.attr( "src", response.data[i].images.fixed_height_still.url);
        charImg.attr( "data-still", response.data[i].images.fixed_height_still.url);
        charImg.attr( "data-animate", response.data[i].images.original.url);
        charImg.attr( "data-state", "still");
        charImg.addClass("gif")

        charDiv.append(p);
        charDiv.append(charImg);
        
        $("#gifs-here").prepend(charImg)

}

});
$( "#addChar").on( "click", function( event){

    event.preventDefault();
    var character = $("#get-Character").val().trim();

    topic.push(character);

    makeButtons();

});
    



},$(document).on( "click", ".gif", function() {
        var state = $(this).attr( "data-state" );
    
        if( state === "still" ){
            $(this).attr( "src", $(this).attr( "data-animate" ));
            $(this).attr( "data-state", "animate");
        } else {
            $(this).attr( "src", $(this).attr( "data-still" ));
            $(this).attr( "data-state", "still");
        }
    
    })


,function makeButtons(){

    $( "#buttons-view" ).empty();

    for ( var i = 0; i < topic.length; i++ ){

        var but = $( "<button>" );

        but.addClass( " btn btn-default" );

        but.attr( "data-character",topic[i]);

        but.text(topic[i]);

        $( "buttons-view" ).append(but);

    }
    makeButtons();
})
