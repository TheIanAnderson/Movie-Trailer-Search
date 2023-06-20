var API_KEY = "k_3rwfrpt2";
var castsView = $(".castsCard");
var awardView = $(".awardsCard");
var awardDescView = $(".awardsDesc");
var movieRatingsView = $(".movieRatings");
var posterCardView = $(".posterCard");
var trailerView = $(".card-content-trailer");
var rowCards = $("#demo-carousel");
var lastSearchButtonEl = $("#last-search-button");
var searchButtonEl = $("#search-button");
var clearButtonEl = $("#clear-button");
var imdbApiURL = "https://imdb-api.com/en/API/";
var carouselContainer = $(".carousel"); 
var loadingIconEl = $("#loading-icon");
var movieInputEl = $("#movie");
var buttonList = $("#buttonsList");
var YOUTUBE_API_KEY = "AIzaSyBYN8k-tLB6UeGCFtP3Lh08rIZM8x5pSWc";
// var YOUTUBE_API_KEY = "AIzaSyBwFTI7Sa51Mo1ATzAgIH1hPXYIED0YUzg"
var submit = document.getElementById('search-button');
var last_Search = JSON.parse(localStorage.getItem("Last Search"));


$(document).ready(function () {
  // Calling clear results on clear-button click
  $("#clear-button").on("click",clearResults);

  $("#last-search-button").on("click", function (event) {
    event.preventDefault();
    var movieTitle = last_Search.Title;
    movieCastSearch(movieTitle);
    moviePoster(movieTitle);
    movieAwards(movieTitle);
    movieRatings(movieTitle);
    searchVideos(movieTitle);
  });

// serach button event, which calls all other functions
  searchButtonEl.on("click", function (event) {
    event.preventDefault();
    if (movieInputEl.val() === "") {
      return;
    } else {
      // All search button clear prevoius images
      carouselContainer.slick("removeSlide", null, null, true);
       // Clear the results from all card content
      castsView.empty();
      awardView.empty();
      movieRatingsView.empty();
      awardDescView.empty();
      posterCardView.empty();
      trailerView.empty();
      // search user input
      var userInput = movieInputEl.val().trim().toLowerCase();
      movieTitleSearch(userInput);
      moviePoster(userInput);
      movieCastSearch(userInput);
      movieAwards(userInput);
      movieRatings(userInput);
      searchVideos(userInput);
      // Refresh the carousel
      carouselContainer.slick("refresh");
      movieInputEl.val("");
    }
  });
// This functions get movie details and store in local storage for retrieving last seraches
  function movieTitleSearch(userInput) {
    let movieURL = imdbApiURL + "SearchMovie/" + API_KEY + "/" + userInput;
    // This is the API call from imdb Movie ID
    $.ajax({
      url: movieURL,
      method: "GET",
    }).then(function (res) {
      var id = res.results[0].id;
      var expression = res.results[0].expression;
      // Save movie id and title in local storage
      var searchInfo = {
        Title: res.expression,
        MovieID: id,
      };
      localStorage.setItem("Last Search", JSON.stringify(searchInfo));
      // Sending Movie title to storeData to avoid dupliocates
      storeData(res.expression);
    });
  }
});

// This function makes api call to IMDB database to get movie id and then one more AJAX call for cast details
function movieCastSearch(userInput) {
  let movieURL =
    "https://imdb-api.com/en/API/SearchMovie/" + API_KEY + "/" + userInput;
  // This is the API call from imdb Movie ID
  $.ajax({
    url: movieURL,
    method: "GET",
  }).then(function (res) {
    var movieId = res.results[0].id;
    $(".castsCard").empty();
    let movieCastsURL =
      "https://imdb-api.com/en/API/FullCast/" + API_KEY + "/" + movieId;
    // This is the API call to imdb cast
    $.ajax({
      url: movieCastsURL,
      method: "GET",
    }).then(function (res) {
        console.log(res.actors);
      for (var i = 0; i < 10; i++) {
        console.log("actor" + i + ":" + res.actors[i].name);
        var listItem = document.createElement("li");
        var details = document.createTextNode(res.actors[i].name);
        listItem.append(details);
        castsView.append(listItem);
      }
    });
  });
}

// This function makes api call to IMDB database to get movie id and then one more AJAX call for movie posters and create image caraousel
function moviePoster(userInput) {
  carouselContainer.empty();
  // Show loading icon
  loadingIconEl.css("background-color", "transparent").show();
  let movieURL = imdbApiURL + "SearchMovie/" + API_KEY + "/" + userInput;

  $.ajax({
    url: movieURL,
    method: "GET",
  }).then(function (res) {
    var movieId = res.results[0].id;
    let movieURL = imdbApiURL + "Posters/" + API_KEY + "/" + movieId;

    $.ajax({
      url: movieURL,
      headers: {
        Authorization: API_KEY,
      },
      beforeSend: function () {
        // Show loading icon
        loadingIconEl.css("background-color", "transparent").show();
      },
      success: function (data) {
        var posters = data.posters;

        carouselContainer.empty(); // Clear existing carousel content

        // Unslick the carousel if it's already initialized
        if (carouselContainer.hasClass("slick-initialized")) {
          carouselContainer.slick("unslick");
        }

        // Check if there are posters available
        if (posters.length > 0) {
          // Iterate through the posters and create carousel slides
          posters.slice(0, 20).forEach(function (poster) {
            var imageUrl = poster.link;
            // console.log(imageUrl);
            var imageElement = $("<img>").attr("src", imageUrl);
            carouselContainer.append(imageElement);
          });

          // Reinitialize the carousel
          carouselContainer.slick({
            autoplay: true,
            autoplaySpeed: 6000, // Set a higher value to increase the delay
            dots: true,
            infinite: true,
            speed: 1000, // Transition speed between slides (in milliseconds)
            slidesToShow: 1,
            slidesToScroll: 1,
          });

          // Previous button event handler
          $(".prev-button").on("click", function () {
            carouselContainer.slick("slickPrev");
          });

          // Next button event handler
          $(".next-button").on("click", function () {
            carouselContainer.slick("slickNext");
          });
        } else {
          // Clear previous results
          carouselContainer.empty();
        }
        // Hide loading icon
        loadingIconEl.hide();
      },

      error: function () {
        console.log("Error fetching movie posters.");
        // Hide loading icon in case of an error
        loadingIconEl.hide();
      },
    });
  });
}

// This function makes api call to IMDB database to get movie id and then one more AJAX call for Award 
function movieAwards(userInput) {
  awardView.empty();
  let movieURL = imdbApiURL + "SearchMovie/" + API_KEY + "/" + userInput;
  // This is the API call from imdb Movie ID
  $.ajax({
    url: movieURL,
    method: "GET",
  }).then(function (res) {
    var movieId = res.results[0].id;
    let movieCastsURL = imdbApiURL + "Awards/" + API_KEY + "/" + movieId;
    // This is the API call to imdb cast
    $.ajax({
      url: movieCastsURL,
      method: "GET",
    }).then(function (res) {
      awardDescView.text("Awards: " + res.description);
      if (res.items) {
        for (var i = 0; i < 5; i++) {
          var listItem = document.createElement("li");
          var details = document.createTextNode(res.items[i].eventTitle);
          listItem.appendChild(details);
          awardView.append(listItem);
        }
      }
    });
  });
}

// This function makes api call to IMDB database to get movie id and then one more AJAX call for Ratings
function movieRatings(userInput) {
  awardView.empty();
  let movieURL = imdbApiURL + "SearchMovie/" + API_KEY + "/" + userInput;
  // This is the API call from imdb Movie ID
  $.ajax({
    url: movieURL,
    method: "GET",
  }).then(function (res) {
    // console.log(res);
    var movieId = res.results[0].id;
    let movieRatingsURL = imdbApiURL + "Ratings/" + API_KEY + "/" + movieId;
    // This is the API call to imdb cast
    $.ajax({
      url: movieRatingsURL,
      method: "GET",
    }).then(function (res) {
      // Display movie ratings if true
      if (res.imDb) {
        movieRatingsView.text("Ratings: " + res.imDb);
      }
    });
  });
}

// This function makes api call to google api to get movie videos
function searchVideos(movieTitle) {
  var $carousel = $(".card-content-trailer");
  // Unslick the carousel if it's already initialized
  if ($carousel.hasClass("slick-initialized")) {
    $carousel.slick("unslick");
  }
  // Clear the carousel contents
  $carousel.empty();
  // Pulls data from the user input field
  var searchQuery = $("#movie").val();
  //Inserts a key word to the searchQuery to make consistent results
  var keyword = "movie";
  
  if (searchQuery) {
    requestUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&part=snippet&maxResults=20&q=${searchQuery}+${keyword}`;
  } else {
    requestUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&part=snippet&maxResults=20&q=${movieTitle}+${keyword}`;
  }

  // JQ fetch of the api
  $.ajax({
    url: requestUrl,
    method: "GET",
  }).then(function (data) {
    // Limit youtube API pull by 10 searches to be appended as an iframe
    var videoItems = data.items.slice(0, 10);

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
      $carousel.append(listItem);
    });


    // Initializes the carousel to the iframes
    $carousel.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 6000,
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
// Clears carousel before each search
function clearCarousel() {
  var $carousel = $(".card-content-trailer");
  $carousel.empty();
}

function clearResults() {
  console.log("Clearing results...");

  // Clear the results from all card content
  castsView.empty();
  awardView.empty();
  movieRatingsView.empty();
  awardDescView.empty();
  posterCardView.empty();
  trailerView.empty();

  // Unslick the carousel if it's already initialized
  if (carouselContainer.hasClass("slick-initialized")) {
    console.log("Unslicking carousel...");
    carouselContainer.slick("unslick");
  }

  // Remove all slides from the carousel
  console.log("Removing carousel slides...");
  carouselContainer.slick("removeSlide", null, null, true);

  // Reload the page to reset the carousel
  console.log("Reloading page...");
  location.reload();
}
// Declare the carousel container
var carouselContainer = $("#carousel");
// Initialize the carousel
carouselContainer.slick({
  dots: true,
  infinite: true,
  speed: 100,
  slidesToShow: 1,
  slidesToScroll: 1,
});

function showLoadingIcon() {
  $("#loading-icon").show();
}

function hideLoadingIcon() {
  $("#loading-icon").hide();
}

function performMovieSearch(userInput) {
  showLoadingIcon();

  movieTitleSearch(userInput);
  moviePoster(userInput);
  movieCastSearch(userInput);
  movieAwards(userInput);
  movieRatings(userInput);

  // Hide the loading icon once all functions are completed
  hideLoadingIcon();
}

