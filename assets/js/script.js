// var movieArray = JSON.parse(localStorage.getItem("Last Search")) || [];
// var buttonArray = $("#buttonsArray");
// var API_KEY = "k_y05611tl";
// var API_KEY = "k_4uiv33vj"
var API_KEY = "k_3rwfrpt2";
var castsView = document.querySelector(".castsCard");
var awardView = document.querySelector(".awardsCard");
var trailerView = document.querySelector(".card-trailer");
var rowCards = $("#demo-carousel");

var last_Search = JSON.parse(localStorage.getItem("Last Search")) || [];

$(document).ready(function () {
  var movieTitle = last_Search.Title;
  $('.carousel.carousel-slider').carousel({
    fullWidth: true
    });
  // $('#demo-carousel').carousel({fullWidth: true});
  // movieCastSearch(movieTitle);
  // moviePoster(movieTitle);
  // movieAwards(movieTitle);
  // searchVideos(movieTitle);

  $("#last-search-button").on("click", function (event) {
    event.preventDefault();
    var movieTitle = last_Search.Title;
    console.log(movieTitle);
    movieCastSearch(movieTitle);
    moviePoster(movieTitle);
    // movieAwards(movieTitle);
    searchVideos(movieTitle);
  });

  $("#search-button").on("click", function (event) {
    event.preventDefault();
    if ($("#movie").val() === "") {
      return;
    } else {
      var userInput = $("#movie").val().trim().toLowerCase();
      movieTitleSearch(userInput);
      // storeData();
      movieCastSearch(userInput);
      moviePoster(userInput);
      movieAwards(userInput);
      searchVideos(userInput);
      $("#movie").val("");
    }
  });

  function movieTitleSearch(userInput) {
    let movieURL =
      "https://imdb-api.com/en/API/SearchMovie/" + API_KEY + "/" + userInput;
    // This is the API call from imdb Movie ID
    $.ajax({
      url: movieURL,
      method: "GET",
    }).then(function (res) {
      console.log(res);
      //   console.log(res.results[0]);
      // console.log("id " + res.results[0].id);
      var id = res.results[0].id;
      var expression = res.results[0].expression;
      // Save movie id and title in local storage
      var searchInfo = {
        Title: res.expression,
        MovieID: id,
      };
      localStorage.setItem("Last Search", JSON.stringify(searchInfo));
      localStorage.setItem("Movie", JSON.stringify(expression));
    });
  }
});

function movieCastSearch(userInput) {
  // event.preventDefault();
  let movieURL =
    "https://imdb-api.com/en/API/SearchMovie/" + API_KEY + "/" + userInput;
  // This is the API call from imdb Movie ID
  $.ajax({
    url: movieURL,
    method: "GET",
  }).then(function (res) {
    // console.log(res);
    // console.log(res.results[0]);
    // console.log("id " + res.results[0].id);
    var movieId = res.results[0].id;
    $(".castsCard").empty();
    let movieCastsURL =
      "https://imdb-api.com/en/API/FullCast/" + API_KEY + "/" + movieId;
    // console.log("ID" + movieId);
    // This is the API call to imdb cast
    $.ajax({
      url: movieCastsURL,
      method: "GET",
    }).then(function (res) {
      //   console.log(res.actors);
      for (var i = 0; i < 10; i++) {
        // console.log("actor" + i + ":" + res.actors[i].name);
        var listItem = document.createElement("li");
        var details = document.createTextNode(res.actors[i].name);
        listItem.appendChild(details);
        castsView.appendChild(listItem);
      }
    });
  });
}

function moviePoster(userInput) {
  $(".posterCard").empty();
  let movieURL =
    "https://imdb-api.com/en/API/SearchMovie/" + API_KEY + "/" + userInput;
  // This is the API call from imdb Movie ID
  $.ajax({
    url: movieURL,
    method: "GET",
  }).then(function (res) {
    // console.log(res);
    // console.log(res.results[0]);
    // console.log("id " + res.results[0].id);
    var movieId = res.results[0].id;
    let moviePosterURL =
      "https://imdb-api.com/en/API/Posters/" + API_KEY + "/" + movieId;
    // This is the API call to imdb posters
    $.ajax({
      url: moviePosterURL,
      method: "GET",
    }).then(function (res) {
      // console.log(res);
      $(".card-image").html("");
      for (var i = 0; i < 5; i++) {
        var newImg = $("<img>")
          .attr("class", "card-image")
          .attr("src", res.posters[i].link);
        $(".card-image").append(newImg);
        console.log("In images")
        $('<img />').attr({
          src:res.posters[i].link
        }).appendTo($('<a />').attr({
          href:'#'+ (i+1) +"!",
          class:'carousel-item'
        }).appendTo($('.carousel')));
      }
      $('.carousel').carousel();
      var carousel = $(".carousel");

// Initialize the carousel
M.Carousel.init(carousel);
M.Carousel.init()

      
    });
  });
}

function movieAwards(userInput) {
  $(".awardsCard").empty();
  let movieURL =
    "https://imdb-api.com/en/API/SearchMovie/" + API_KEY + "/" + userInput;
  // This is the API call from imdb Movie ID
  $.ajax({
    url: movieURL,
    method: "GET",
  }).then(function (res) {
    // console.log(res);
    // console.log(res.results[0]);
    // console.log("id " + res.results[0].id);
    var movieId = res.results[0].id;
    let movieCastsURL =
      "https://imdb-api.com/en/API/Awards/" + API_KEY + "/" + movieId;
    // This is the API call to imdb cast
    $.ajax({
      url: movieCastsURL,
      method: "GET",
    }).then(function (res) {
      // console.log(res);
      // console.log(res.description);
      // console.log(res.items);
      $(".awardsDesc").text(res.description);
      // $('.awardsDesc').html('<em>' + text(res.description) + '</em>')
      for (var i = 0; i < 2; i++) {
        // console.log("actor" + i + ":" + res.actors[i].name);
        var listItem = document.createElement("li");
        var details = document.createTextNode(res.items[i].eventTitle);
        listItem.appendChild(details);
        awardView.appendChild(listItem);
        
      }
      var elems2 = document.querySelectorAll('.carousel');
      var instances2 = M.Carousel.init(elems2);
    });
  });
}

function searchVideos(movieTitle) {
  $(".card-trailer").empty();
  var searchQuery = $("#movie").val();
  var apiKey = "AIzaSyCVhc2HYUCAa6IUoFoaGwbP7C72QinwRiY";
  var keyword = "trailer";
  var requestUrl;
  if (searchQuery) {
    requestUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&maxResults=20&q=${searchQuery}+${keyword}`;
  } else {
    requestUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&maxResults=20&q=${movieTitle}+${keyword}`;
  }

  $.ajax({
    url: requestUrl,
    method: "GET",
  }).then(function (data) {
    console.log(data);
    var videoItems = data.items.slice(0, 3);
    videoItems.forEach(function (video) {
      var videoTitle = video.snippet.title;
      var videoId = video.id.videoId;
      var videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      var thumbnailUrl = video.snippet.thumbnails.default.url;
      var listItem = document.createElement("li");
      var link = document.createElement("a");
      link.href = videoUrl;
      link.target = "_blank";
      var thumbnail = document.createElement("img");
      thumbnail.src = thumbnailUrl;
      thumbnail.alt = "Video Thumbnail";
      thumbnail.width = 200;
      link.appendChild(thumbnail);
      link.appendChild(document.createTextNode(videoTitle));
      listItem.appendChild(link);
      trailerView.appendChild(listItem);
    });
  });
  $("#clear-button").on("click", function () {
    $(".castsCard").empty();
    $(".awardsCard").empty();
    $(".posterCard").empty();
    $(".card-trailer").empty();
    location.reload();
  });
}
