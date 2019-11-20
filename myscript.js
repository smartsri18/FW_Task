const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

// const moreResBtn = document.createElement('div');
// moreResBtn.setAttribute('class','moreResBtn');
// app.appendChild(moreResBtn);


function getmovie(){
  // Search bug
  document.getElementsByClassName("container")[0].innerHTML="";
  // document.getElementsByClassName("more-Res-btn")[0].innerHTML="";


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
        if(i > 7){
          card.setAttribute('class', 'card moreRes content-hide');
        }
        else{
          card.setAttribute('class', 'card')
        }
        // Create an h1 and set the text content to the film's title
        const h1 = document.createElement('h4')
        h1.textContent = movie_list[i]['Title']

        const img = document.createElement('img')
        img.src = movie_list[i]['Poster']
        img.alt = movie_list[i]['Title']
        // Append the cards to the container element
        container.appendChild(card)

        // Each card will contain an h1 and a p
        card.appendChild(img)
        card.appendChild(h1)

        if(i == len-1){
          // const div1 = document.createElement('div');
          const btn = document.createElement('button');
          btn.innerHTML = "More Results";
          btn.setAttribute('id', 'moreResbtn')
          btn.setAttribute('onclick','moreResults()')
          btn.setAttribute('class', 'more-Res-btn')
          // div1.appendChild(btn);
          container.appendChild(btn);
        }

    }
    DOMload(movie_name);
  }

  // Send request
  request.send()
}


// Success Fuction
function DOMload(movie_name) {

    // var menu = document.querySelector(".container");
    var menu = document.querySelectorAll(".container > div.card");

    for(var i=0; i<menu.length; i++){
      menu[i].addEventListener("click", function(e){
        // handling for img and h4 tag for grabing the title
          if(e.target.tagName == 'IMG'){
            s_movie_name = e.target.alt;
          }else{
            s_movie_name = e.target.innerHTML;
          }
          localStorage.setItem("movie_key",s_movie_name);
          window.location.href = "movieDetails.html";
      });

    }

    localStorage.setItem("previous_content",document.getElementsByClassName('container')[0].innerHTML)

}


// More Results
function moreResults(){
    var hide_content = document.querySelectorAll(".moreRes");
    for(var i=0; i<hide_content.length; i++){
      hide_content[i].classList.toggle('content-hide');
    }
    var btn = document.getElementById('moreResbtn');
    if(btn.innerHTML === "More Results"){
      btn.innerHTML = "Less Results";
    }else{
      btn.innerHTML = "More Results";
    }
}

// Storing the previous state
var previous_content = localStorage['previous_content']
if(previous_content){
  document.getElementsByClassName('container')[0].innerHTML = previous_content;
  DOMload(localStorage['movie_key']);
}
