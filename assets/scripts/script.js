var topics = ["Post Malone", "Childish Gambino", "Frank Ocean", "Taylor Swift", "Lady Gaga", "Bradley Cooper", "Lana Del Rey", "Clairo", "Chance the Rapper", "Eminem", "Elton John", "Billy Joel", "Kanye West", "Lil Peep", "Travis Scott", "Beach Boys"];

var addGifs = function() {
    var artist = this.innerHTML;
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=aORSyh3OYX52nRTFnKFPMTC6ijlqSOee&q=" + artist + "&limit=10&offset=0&rating=R&lang=en";
     
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
     });
 };

for (let i = 0; i < topics.length; i++) {
    $("#buttons").append(`<button class="btn btn-danger artist-button">${topics[i]}</button>`);    
}

$('#add').on('click', function() {
    event.preventDefault();
    var newTopic = $('#add-artist').val().trim();
    topics.push(newTopic);
    $("#buttons").append(`<button class="btn btn-danger artist-button">${newTopic}</button>`);
    $('#add-artist').val("");
    $(".artist-button").on("click", addGifs);

});

$(".artist-button").on("click", addGifs);
