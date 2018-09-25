// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.co/
// para carregar:
//  - A lista de filmes
//  - A introdução de cada filme, quando ele for clicado

const URL = "https://swapi.co/api/films/";
function addInfo(title, id){
  // html = "<li data-episode-url=" + URL + ">" + "Episode " + id + "</li>";
  let $li = $('<li></li>');
  $li.data('episode-url', URL + id);
  $li.html("Episode " + id + ": " + title);
  $li.appendTo("#movies ul");
  $li.click(function(){
    $.ajax({
      url: $li.data('episode-url'),
      dataType: 'json',
      success: function(resposta){
        $(".reading-animation").html(
          "Episode " + id + "\n" + title.toUpperCase() + "\n\n" +
          resposta.opening_crawl
        );
      }
    })
  })
}

function sortById(a, b){
  return a.episode_id < b.episode_id;
}

$.ajax({
  url: 'https://swapi.co/api/films/',
  dataType: 'json',
  success: function(resposta) {
    console.log(resposta);
    for (movie of resposta.results.sort(sortById())){
      console.log(movie.title);
      console.log(movie.episode_id);
      addInfo(movie.title, movie.episode_id);
    }
  }
});
