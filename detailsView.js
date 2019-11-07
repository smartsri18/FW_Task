
// Accessing Local Storage for movie_key
  var ls_data = localStorage['movie_key'];
  var apiurl = 'http://www.omdbapi.com/?apikey=6f1d90d9&t='+ls_data+'&plot=full';
  var request = new XMLHttpRequest()

  // Establishing connection through XMLHttpRequest
  request.open('GET', apiurl, true)

  request.onload = function() {

    var data = JSON.parse(this.response)
    // console.log(data);

    // Appending the value to movieDetails page
    document.getElementById('m_title').innerHTML = data['Title'];
    document.getElementById('m_year').innerHTML = data['Released'];
    document.getElementById('m_plot').innerHTML = data['Plot'];
    document.getElementById('m_act').innerHTML = data['Actors'];
    document.getElementById('m_dir').innerHTML = data['Director'];
    document.getElementById('m_genre').innerHTML = data['Genre'];
    document.getElementById('m_writer').innerHTML = data['Writer'];
    document.getElementById('m_ratings').innerHTML = data['imdbRating'];
    document.getElementById('m_bf').innerHTML = data['BoxOffice'];
  }

  // Send request
  request.send()
