var API_KEY = "k_4uiv33vj"
var fetchButton = document.getElementById('search-button');
$("#search-button").on('click', function () {
  event.preventDefault();
  var movie = $('#movie').val().trim().toLowerCase();
  // https://imdb-api.com/en/API/SearchMovie/k_4uiv33vj/inception 2010
  let movieURL = 'https://imdb-api.com/en/API/SearchMovie/' + API_KEY+ '/' + movie
    // This is the API call from imdb 
  $.ajax({
    url: movieURL,
    method: "GET"
  }).then(function (res) {
    console.log(res.results[0]);   
    });   
});


