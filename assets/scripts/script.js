var topics = ["Post Malone", "Childish Gambino", "Frank Ocean", "Taylor Swift", "Lady Gaga", "Bradley Cooper", "Lana Del Rey", "Clairo", "Chance the Rapper", "Eminem", "Elton John", "Billy Joel", "Kanye West", "Lil Peep", "Travis Scott", "Beach Boys"];

for (let i = 0; i < topics.length; i++) {
    $("#buttons").append(`<button class="btn btn-danger artist-button">${topics[i]}</button>`);    
}
$('#add').on('click', function() {
    event.preventDefault();
    var newTopic = $('#add-artist').val().trim();
    topics.push(newTopic);
    $("#buttons").append(`<button class="btn btn-danger artist-button">${newTopic}</button>`);

    // console.log($('#add-artist').val().trim());
});

function addGifs() {

   var artist = this.innerHTML;
   var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=aORSyh3OYX52nRTFnKFPMTC6ijlqSOee&q=" + artist + "&limit=10&offset=0&rating=R&lang=en";
    console.log(artist);
    $.get(queryURL).then(function(response) {
        response.data.forEach((gif) => {
            $("#giphy-zone").append(`<img class="gif" src="${gif.images.original_still.url}" data-still="${gif.images.original_still.url}" data-animate="${gif.images.original.url}" data-state="still"><h3>Rating: ${gif.rating}</h3>`);
        })
        
        $('.gif').on('click', function() {
            var animate = $(this.attributes[3]);
            var still = $(this.attributes[2]);
            var state = $(this).attr('data-state');
            if (state === 'still') {
                $(this).attr({
                    src: $(animate).val().trim(),
                    'data-state': 'animate'
                });
            }
            // console.log($(animate).val());
            if (state === 'animate') {
                $(this).attr({
                  src: $(still).val().trim(),
                  'data-state': 'still'
                });
            }

        });
        
    }
    );
}

$(".artist-button").on("click", addGifs());


// 6. Add a form to your page that takes a value from a user input box and adds it to your `topics` array. Then make a function call that takes each topic in the array and remakes the buttons on the page.

