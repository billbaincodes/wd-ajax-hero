(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE

  let searchButton = document.querySelector('button')
  let textInput = document.querySelector('input')
  let searchString = []
  let url = 'https://omdb-api.now.sh/?s='

  console.log(searchButton, textInput)


  searchButton.addEventListener('click', function(event){
    event.preventDefault()
    if (textInput.value.length === 0) {
      alert('need text to search')
    }
    else {
      movies.splice(0,movies.length)
      searchString = textInput.value.split(' ')
      searchString = searchString.join('%20')
      textInput.value = ''

      fetch(url + searchString)
      .then((response) => response.json())
      .then((data)=> {
        for (var i = 0; i < data.Search.length; i++) {
        console.log(data.Search[i])

        var movieObject = new Object
        movieObject['id'] = data.Search[i].imdbID
        movieObject['poster'] = data.Search[i].Poster
        movieObject['title'] = data.Search[i].Title
        movieObject['year'] = data.Search[i].Year  

        console.log(movieObject)
        movies.push(movieObject)
        renderMovies()
        }
      })
    }
  })
})();
