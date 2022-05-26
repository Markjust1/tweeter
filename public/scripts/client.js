/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.

///////////////  DATABASE  //////////////////


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
        <div>${timeago.format(item.created_at)}</div>
        <ul class="icon-list">
          <li><i class="fa-solid fa-flag"></i></li> 
          <li><i class="fa-solid fa-retweet"></i></li> 
          <li><i class="fa-solid fa-heart"></i></li>
        </ul>
      </div>
    </article>`);
  $('.tweets').prepend($tweet);
}

//////////////   LOOPING THROUGH ITEMS IN DATABASE ///////////////////

const renderTweets = (data) => {
  for (let item of data) {
    createTweetElement(item);
  }
};


$(() => {
  $('#submit-form').on('submit', (event) => {
    event.preventDefault();
    const userMessage = $('#tweet-text').val();
    if (userMessage.length === 0 || userMessage === null) {
      alert('The input form is empty');
      return;
    } else if (userMessage.length > 140) {
      alert('You have exceeded 140 characters');
      return;
    }
    const str = $('#submit-form').serialize();
    $.ajax({
      url:'/tweets',
      method: 'POST',
      data: str,
      success: () => {
        loadTweets();
      }
    })
    console.log('post-submission message')
  })

  const loadTweets = () => {
    $.get('/tweets', )
      .then(posts => {
        renderTweets(posts);
      })
  };


  loadTweets();
});