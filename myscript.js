const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)


function getmovie(){
  // Getting the movie param
  var movie_name = document.getElementById("search-movie").value;
  movie_name = movie_name.replace(/\s/g, "+");

  var apiurl = 'http://www.omdbapi.com/?apikey=6f1d90d9&s='+movie_name;
  var request = new XMLHttpRequest()

  // Establishing connection through XMLHttpRequest
  request.open('GET', apiurl, true)

  request.onload = function() {
    var data = JSON.parse(this.response)
    // console.log(data);

    var movie_list = data['Search'];
    len = movie_list.length;
    for(var i=0; i<len; i++){
      // console.log(movie_list[i]);

      // Create a div with a card class
        const card = document.createElement('div')
        card.setAttribute('class', 'card')

        // Create an h1 and set the text content to the film's title
        const h1 = document.createElement('h4')
        h1.textContent = movie_list[i]['Title']

        const img = document.createElement('img')
        img.src = movie_list[i]['Poster']
        // Append the cards to the container element
        container.appendChild(card)

        // Each card will contain an h1 and a p
        card.appendChild(img)
        card.appendChild(h1)

    }
    DOMload(movie_name);
  }

  // Send request
  request.send()
}

function DOMload(movie_name) {

    var menu = document.querySelector(".container");
    menu.addEventListener("click", function(e){
        s_movie_name = e.target.innerHTML;
        localStorage.setItem("movie_key",s_movie_name);
        window.location.href = "movieDetails.html";
    });

}
