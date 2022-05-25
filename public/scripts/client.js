/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.

///////////////  DATABASE  //////////////////

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


///////////////  APPENDING FUNCTION  //////////////////

const createTweetElement = function(item) {
  const $tweet = $(`
    <article class="tweet-container">
      <div class="tweet-title">
        <div class="title">
          <img src="${item.user.avatars}" alt="">
          <p class="name">${item.user.name}</p>
        </div>
        <div class="handle">${item.user.handle}</div>
      </div>
        <p class="tweet-text">${item.content.text}</p>
      <div class="tweet-footer">
        <div>${item.created_at}</div>
        <ul class="icon-list">
          <li><i class="fa-solid fa-flag"></i></li> 
          <li><i class="fa-solid fa-retweet"></i></li> 
          <li><i class="fa-solid fa-heart"></i></li>
        </ul>
      </div>
    </article>`);
  $('.tweets').append($tweet);
}

//////////////   LOOPING THROUGH ITEMS IN DATABASE ///////////////////

const renderTweets = () => {
  //$('.tweets').empty();
  for (let item of data) {
    console.log('looping')
    createTweetElement(item);
  }
}


$(() => {
  renderTweets();
  $('#submit-button').on('submit', (event) => {
    const str = $('#submit-button').serialize()
    event.preventDefault();
   // const userInput = $('#tweet-text').val();
    console.log(str);
    insertData(data)
    function insertData(data){
      $.post("/tweets", str)         
  }
    console.log('submitted')
  })
})

