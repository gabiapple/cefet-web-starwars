
const romanNumeral = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const URL = "https://swapi.co/api/films/";
function addInfo(title, id){
  id = romanNumeral[id - 1];
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


$.ajax({
  url: 'https://swapi.co/api/films/',
  dataType: 'json',
  success: function(resposta) {
    console.log(resposta);
    for (movie of resposta.results.sort(
      function (a, b){
        return a.episode_id > b.episode_id;
      }
    )){
      console.log(movie.title);
      console.log(movie.episode_id);
      addInfo(movie.title, movie.episode_id);
    }
  }
});
