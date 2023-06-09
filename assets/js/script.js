

var movieArray = JSON.parse(localStorage.getItem("Saved Movie")) || [];
var buttonArray = $("#buttonsArray");
// var API_KEY = "k_y05611tl";
// var API_KEY = "k_4uiv33vj"
var API_KEY = "k_3rwfrpt2"
var castsView = document.querySelector(".castsCard");
var awardView = document.querySelector(".awardsCard");

$(document).ready(function (){
    var userInput = movieArray[movieArray.length - 1];
    // $window.sessionStorage.clear();
    // $('.castsCard1').empty();
    // currentWeather(userInput);
    // forecast(userInput);
    // lastSearch ();



function storeData (userInput) {
    var userInput = $("#movie").val().trim().toLowerCase();
    var containsCity = false;

    if (movieArray != null) {

		$(movieArray).each(function(x) {
			if (movieArray[x] === userInput) {
				containsCity = true;
			}
		});
	}

	if (containsCity === false) {
        movieArray.push(userInput);
	}

	sessionStorage.setItem("Saved Movie", JSON.stringify(movieArray));

}

function lastSearch () {
    buttonArray.empty()
    // for (var i = 0; i < movieArray.length; i ++) {
        var newButton = $("<button>").attr("type", "button").attr("class","savedBtn btn btn-secondary btn-lg btn-block");
        newButton.attr("data-name",movieArray[movieArray.length - 1])
        newButton.text(movieArray[movieArray.length - 1]);
        buttonArray.prepend(newButton);
    // }
    $(".savedBtn").on("click", function(event){
        event.preventDefault();
        var userInput = $(this).data("name");
        console.log(userInput)
        // currentWeather(userInput);
        // forecast(userInput);
    })

}

$("#search-button").on("click", function (event){
    event.preventDefault();
    if ($("#movie").val() === "") {
        // alert("Eneter movie name")
    return
    } else
    {
        $('.castsCard').empty();
        $('.awardsCard').empty();
        $('.posterCard').empty();
    var userInput = $("#movie").val().trim().toLowerCase();
    movieTitleSearch(userInput);
    // storeData();
    movieCastSearch(userInput)
    moviePoster(userInput);
    movieAwards(userInput);
    // storeData();
    // lastSearch();
    $("#movie").val("");}

})

function movieTitleSearch(userInput) {
  let movieURL = 'https://imdb-api.com/en/API/SearchMovie/' + API_KEY+ '/' + userInput
  // This is the API call from imdb Movie ID
  $.ajax({
    url: movieURL,
    method: "GET",
  }).then(function (res) {
    console.log(res);
    console.log(res.results[0]); 
    // console.log("id " + res.results[0].id);  
    var id = res.results[0].id
    // Save movie id in session storage
    sessionStorage.setItem("MovieId", JSON.stringify(id));
});  
}

function movieCastSearch(userInput) {
    event.preventDefault();
    let movieURL = 'https://imdb-api.com/en/API/SearchMovie/' + API_KEY+ '/' + userInput
  // This is the API call from imdb Movie ID
  $.ajax({
    url: movieURL,
    method: "GET"
  }).then(function (res) {
    console.log(res);
    console.log(res.results[0]); 
    // console.log("id " + res.results[0].id);  
    var movieId = res.results[0].id
   $('.castsCard').empty();
    let movieCastsURL = 'https://imdb-api.com/en/API/FullCast/'+ API_KEY+ '/' + movieId
    console.log("ID" + movieId );
    // This is the API call to imdb cast
        $.ajax({
        url: movieCastsURL,
        method: "GET"
        }).then(function (res) {
            
        //   console.log(res.actors); 
        for (var i = 0; i < 10; i++) {
            // console.log("actor" + i + ":" + res.actors[i].name);
            var listItem = document.createElement("li"); 
            var details = document.createTextNode(res.actors[i].name)
            listItem.appendChild(details);
            castsView.appendChild(listItem);
        }
        });  
    });  
    }

function moviePoster(userInput){
    $('.posterCard').empty();
    event.preventDefault();
    let movieURL = 'https://imdb-api.com/en/API/SearchMovie/' + API_KEY+ '/' + userInput
  // This is the API call from imdb Movie ID
  $.ajax({
    url: movieURL,
    method: "GET"
  }).then(function (res) {
    console.log(res);
    console.log(res.results[0]); 
    // console.log("id " + res.results[0].id);  
    var movieId = res.results[0].id
    // $('.posterCard').empty();
    // $('.posterCard').empty();
    let moviePosterURL = 'https://imdb-api.com/en/API/Posters/' + API_KEY+ '/' + movieId
    // This is the API call to imdb posters
        $.ajax({
        url: moviePosterURL,
        method: "GET"
        }).then(function (res) {
        console.log(res); 
        $('.card-image').html("");
        for (var i = 0; i < 2; i++) {
            // console.log("Posters" + i + ":" + res.posters[i].link);
            var newImg = $("<img>").attr("class", "card-image").attr("src", res.posters[i].link);
        $('.card-image').append(newImg);
        }
        });    
    });  
}

function movieAwards(userInput) {
    $('.awardsCard').empty();
    event.preventDefault();
    let movieURL = 'https://imdb-api.com/en/API/SearchMovie/' + API_KEY+ '/' + userInput
  // This is the API call from imdb Movie ID
  $.ajax({
    url: movieURL,
    method: "GET"
  }).then(function (res) {
    console.log(res);
    console.log(res.results[0]); 
    // console.log("id " + res.results[0].id);  
    var movieId = res.results[0].id
    let movieCastsURL = 'https://imdb-api.com/en/API/Awards/'+ API_KEY+ '/' + movieId
    // This is the API call to imdb cast
        $.ajax({
        url: movieCastsURL,
        method: "GET"
        }).then(function (res) {
        console.log(res); 
        console.log(res.description); 
        console.log(res.items); 
        //   $('.awardsDesc').textcontent = res.description;
        for (var i = 0; i < 5; i++) {
            // console.log("actor" + i + ":" + res.actors[i].name);
            var listItem = document.createElement("li"); 
            var details = document.createTextNode(res.items[i].eventTitle)
            listItem.appendChild(details);
            awardView.appendChild(listItem);
        }
        });  
    });  
    }

$("#clear-button").on("click", function(){
    $('.castsCard').empty();
    $('.awardsCard').empty();
    $('.posterCard').empty();
    location.reload();
    })
      

});
var YOUTUBE_API_KEY = "AIzaSyCVhc2HYUCAa6IUoFoaGwbP7C72QinwRiY";
var search_terms = "Jack Welch";
var submit = document.getElementById('submit')
var userContainer = document.getElementById('users');

document.addEventListener('DOMContentLoaded', function() {
    submit.addEventListener('click', searchVideos);
function searchVideos(event) {
  event.preventDefault()
  var searchQuery = document.getElementById('searchInput').value;
  var apiKey = "AIzaSyCVhc2HYUCAa6IUoFoaGwbP7C72QinwRiY";
  var keyword = 'movie'
  var requestUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&maxResults=20&q=${searchQuery}+${keyword}`;
  


  fetch(requestUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      var resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = "";
      var videoItems = data.items.slice(0, 3)

      videoItems.forEach(function(video) {
        
        var videoTitle = video.snippet.title;
        var videoId = video.id.videoId
        var videoUrl =  `https://www.youtube.com/watch?v=${videoId}`
        var thumbnailUrl = video.snippet.thumbnails.default.url
        var listItem = document.createElement('li');
        var link = document.createElement('a')


        link.href = videoUrl
        link.target = '_blank'
        

        var thumbnail = document.createElement('img')
        thumbnail.src = thumbnailUrl
        thumbnail.alt = "Video Thumbnail"
        thumbnail.width = 200


        link.appendChild(thumbnail)
        link.appendChild(document.createTextNode(videoTitle));
        listItem.appendChild(link)


        // var title = document.createElement('p')
        // title.textContent = videoTitle
        // listItem.appendChild(title)
        resultsContainer.appendChild(listItem);
        // console.log(video)


      });
    })
    .catch(function(error) {
      console.error(error);
    });
}
})


