// var API_KEY = "k_4uiv33vj"
var API_KEY = "k_y05611tl"
var fetchButton = document.getElementById('search-button');
var castsView = document.querySelector(".castsCard");
var cardImage = document.querySelector(".card-image");
$("#search-button").on('click', function () {
  event.preventDefault();
  var movie = $('#movie').val().trim().toLowerCase();
  // https://imdb-api.com/en/API/SearchMovie/k_4uiv33vj/inception 2010
  let movieURL = 'https://imdb-api.com/en/API/SearchMovie/' + API_KEY+ '/' + movie
    // This is the API call from imdb Movie ID
  $.ajax({
    url: movieURL,
    method: "GET"
  }).then(function (res) {
    // console.log(res.results[0]); 
    // console.log("id " + res.results[0].id);  
    var id = res.results[0].id
    // Save movie id in session storage
    sessionStorage.setItem("MovieId", JSON.stringify(id));
     
    });   


    //  Getting movie casts and other details
    // var movieId = JSON.parse(sessionStorage.getItem("MovieId"))
    // let movieCastsURL = 'https://imdb-api.com/en/API/FullCast/'+ API_KEY+ '/' + movieId
    // // This is the API call to imdb actors
    // $.ajax({
    //   url: movieCastsURL,
    //   method: "GET"
    // }).then(function (res) {
    //   console.log(res.actors); 

    //   for (var i = 0; i < 10; i++) {
    //     // console.log("actor" + i + ":" + res.actors[i].name);
    //     var listItem = document.createElement("li"); 
    //     var details = document.createTextNode(res.actors[i].name)
    //     listItem.appendChild(details);
    //     castsView.appendChild(listItem);
    //   }
    //   });   

       //  Getting movie posters
    var movieId = JSON.parse(sessionStorage.getItem("MovieId"))
    let moviePosterURL = 'https://imdb-api.com/en/API/Posters/' + API_KEY+ '/' + movieId
    // This is the API call to imdb actors
    $.ajax({
      url: moviePosterURL,
      method: "GET"
    }).then(function (res) {
      console.log(res.posters); 
      // for (var i = 0; i < 2; i++) {
      //   console.log("Posters" + i + ":" + res.posters[i].link);
      // }
      // });   
      var newImg = $("<img>").attr("class", "card-image").attr("src", res.posters[0].link);
       $('.card-image').append(newImg);

          });   
      //  Getting movie Rating:

      var movieId = JSON.parse(sessionStorage.getItem("MovieId"))
      // https://imdb-api.com/en/API/UserRatings/k_4uiv33vj/tt1375666
      
    // let movieRatingsURL = 'https://imdb-api.com/en/API/UserRatings/' + API_KEY+ '/' + movieId
    // // let movieRatingsURL = 'https://imdb-api.com/en/API/UserRatings/' + API_KEY+ '/tt0499549'
    // // This is the API call to imdb actors
    // $.ajax({
    //   url: movieRatingsURL,
    //   method: "GET"
    // }).then(function (res) {
    //   console.log(res.totalRating); 
    //   // for (var i = 0; i < 2; i++) {
    //   //   console.log("Posters" + i + ":" + res.posters[i].link);
    //   // }
    //   });   
    
});


