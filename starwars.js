let audio = new Audio('starWars-mainTitle.mp3');
audio.play();


const romanNumeral = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const URL = "https://swapi.co/api/films/";
function addInfo(title, id){
  idRoman = romanNumeral[id - 1];
  let $li = $('<li></li>');
  $li.data('episode-url', URL + id);
  $li.html("Episode " + idRoman + ": " + title);
  $li.appendTo("#movies ul");
  $li.click(function(){
    $.ajax({
      url: $li.data('episode-url'),
      dataType: 'json',
      success: function(resposta){
        $(".reading-animation").html(
          "Episode " + romanNumeral[id - 1] + "\n" + title.toUpperCase() + "\n\n" +
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

