// var buttonArray = $("#buttonsArray");
// var API_KEY = "k_y05611tl";
// var API_KEY = "k_4uiv33vj"
var API_KEY = "k_3rwfrpt2";
var castsView = document.querySelector(".castsCard");
var awardView = document.querySelector(".awardsCard");
var trailerView = document.querySelector(".card-trailer");
var rowCards = $("#demo-carousel");
var YOUTUBE_API_KEY = "AIzaSyBYN8k-tLB6UeGCFtP3Lh08rIZM8x5pSWc"

var loadingIcon = $("<div class='loader' id='loader'></div>");

var submit = document.getElementById('search-button');
var last_Search = JSON.parse(localStorage.getItem("Last Search"));

$(document).ready(function () {

  $("#last-search-button").on("click", function (event) {
    event.preventDefault();
    var movieTitle = last_Search.Title;
    movieCastSearch(movieTitle);
    moviePoster(movieTitle);
    movieAwards(movieTitle);
    movieRatings(movieTitle);
    searchVideos(movieTitle);
  });

  $("#search-button").on("click", function (event) {
    event.preventDefault();
    if ($("#movie").val() === "") {
      return;
    } else {
      var userInput = $("#movie").val().trim().toLowerCase();
      movieTitleSearch(userInput);
      movieCastSearch(userInput);
      moviePoster(userInput);
      movieAwards(userInput);
      movieRatings(userInput);
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
  let movieURL =
    "https://imdb-api.com/en/API/SearchMovie/" + API_KEY + "/" + userInput;
  // This is the API call from imdb Movie ID
  $.ajax({
    url: movieURL,
    method: "GET",
    beforeSend: function() {
      loadingIcon.appendTo('.castsCard');
    },
    success: function() {
      loadingIcon.remove();
    },
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
      beforeSend: function() {
        loadingIcon.appendTo('.castsCard');
      },
      success: function() {
        loadingIcon.remove();
      },
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
    beforeSend: function() {
      loadingIcon.appendTo('.posterCard');
    },
    success: function() {
      loadingIcon.remove();
    },
  }).then(function (res) {
    // console.log("id " + res.results[0].id);
    var movieId = res.results[0].id;
    let moviePosterURL =
      "https://imdb-api.com/en/API/Posters/" + API_KEY + "/" + movieId;
    // This is the API call to imdb posters
    $.ajax({
      url: moviePosterURL,
      method: "GET",
      beforeSend: function() {
        loadingIcon.appendTo('.posterCard');
      },
      success: function() {
        loadingIcon.remove();
      },
    }).then(function (res) {
      // console.log(res);
      $(".card-image").html("");
      var numOfPosters = Math.min(5, res.posters.length);
      if(res.posters){
      for (var i = 0; i < numOfPosters; i++) {
        var newImg = $("<img>")
          .attr("class", "card-image")
          .attr("src", res.posters[i].link);
        $(".card-image").append(newImg);
      }
      }
      $('.card-image').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        dots: true,
        infinite: true,
      });
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
    beforeSend: function() {
      loadingIcon.appendTo('.awardsDesc');
    },
    success: function() {
      loadingIcon.remove();
    },
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
      beforeSend: function() {
        loadingIcon.appendTo('.awardsDesc');
      },
      success: function() {
        loadingIcon.remove();
      },
     }).then(function (res) {
      console.log(res);
      console.log(res.description);
      console.log(res.items);
      $(".awardsDesc").text("Awards: " + res.description).css("font-weight","Bold").css("fontSize", "20px");
      if(res.items){
      for (var i = 0; i < 5; i++) {
        var listItem = document.createElement("li");
        var details = document.createTextNode(res.items[i].eventTitle);
        listItem.appendChild(details);
        awardView.appendChild(listItem);  
      }
    }
    });
  });
}

function movieRatings(userInput) {
  $(".awardsCard").empty();
  let movieURL =
    "https://imdb-api.com/en/API/SearchMovie/" + API_KEY + "/" + userInput;
  // This is the API call from imdb Movie ID
  $.ajax({
    url: movieURL,
    method: "GET",
    beforeSend: function() {
      loadingIcon.appendTo('.movieRatings');
    },
    success: function() {
      loadingIcon.remove();
    },
    }).then(function (res) {
    console.log(res);
    var movieId = res.results[0].id;
    let movieRatingsURL =
      "https://imdb-api.com/en/API/Ratings/" + API_KEY + "/" + movieId;
    // This is the API call to imdb cast
    $.ajax({
      url: movieRatingsURL,
      method: "GET",
      beforeSend: function() {
      loadingIcon.appendTo('.movieRatings');
      },
      success: function() {
      loadingIcon.remove();
      },
      }).then(function (res) {
      console.log(res);
      console.log(res.imDb);
      // $(".movieRatings").text("Ratings");
      $(".movieRatings").text("Ratings: " + res.imDb).css("font-weight","Bold").css("fontSize", "20px");
    });
  });
}


function searchVideos(movieTitle) {
  
  var $carousel = $(".card-content-trailer");
// Clears carousel on function run
  $carousel.empty();

  // Pulls data from the user input field
  var searchQuery = $("#movie").val();
  //Inserts a key word to the searchQuery to make consistent results
  var keyword = "movie";
  
  var requestUrl;

  if (searchQuery) {
    requestUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&part=snippet&maxResults=20&q=${searchQuery}+${keyword}`;
  } else {
    requestUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&part=snippet&maxResults=20&q=${movieTitle}+${keyword}`;
  }

  // JQ fetch of the api
  $.ajax({
    url: requestUrl,
    method: "GET",
    beforeSend: function() {
      loadingIcon.appendTo('.card-content-trailer');
    },
    success: function() {
      loadingIcon.remove();
    },
    }).then(function (data) {
    // Limit youtube API pull by 10 searches to be appended as an iframe
    var videoItems = data.items.slice(0, 10);

    // Create a new carousel clone
    var $newCarousel = $carousel.clone();

    videoItems.forEach(function (video) {
      var videoId = video.id.videoId;
      var videoUrl = `https://www.youtube.com/embed/${videoId}`;
      var iframe = $("<iframe>")
        .attr("width", "315")
        .attr("height", "200")
        .attr("src", videoUrl)
        .attr("frameborder", "0")
        .attr("allowfullscreen", true);
      var listItem = $("<a>").append(iframe);
      $newCarousel.append(listItem);
    });

    // Replace the original carousel with the new clone
    $carousel.replaceWith($newCarousel);

    // Initializes the carousel to the iframes
    $newCarousel.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      infinite: true,
    });
  });


  //  Adds functionality to clear search button
  $("#clear-button").on("click", function () {
    $('.castsCard').empty();
    $('.awardsCard').empty();
    $('.posterCard').empty();
    $carousel.empty();
    location.reload();
  });
}

