// const print = () => {
//   console.log('This is printed inside the text-form');
//   console.log(this);
// }

$(document).ready(function() {
  console.log('document is loaded');
  let numberOfCharactersLeft = $('.counter'); // targeting number of characters left

  $('#tweet-text').on('keyup', function() {
    let characterCount = 140 - (this.value.length); // number of input characters 
    // console.log(numberOfCharactersLeft.html());
    numberOfCharactersLeft.html(characterCount);
    if (numberOfCharactersLeft.html() < 0) {
      $('.counter').css( "color", "red" )
    } else {
      $('.counter').css( "color", "#545149" )
    }
  })
});
