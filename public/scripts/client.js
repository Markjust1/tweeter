/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.


///////////////  APPENDING FUNCTION  //////////////////

const createTweetElement = function(item) {
  const safeInput = $('<div class="user-text">').text(item.content.text);
  safeInput.addClass("tweet-text");
  const $tweet = $(`
    <article class="tweet-container">
      <div class="tweet-title">
        <div class="title">
          <img src="${item.user.avatars}" alt="">
          <p class="name">${item.user.name}</p>
        </div>
        <div class="handle">${item.user.handle}</div>
      </div>`);
  const footer = $(`
      <div class="tweet-footer">
      <div>${timeago.format(item.created_at)}</div>
      <ul class="icon-list">
        <li><i class="fa-solid fa-flag"></i></li> 
        <li><i class="fa-solid fa-retweet"></i></li> 
        <li><i class="fa-solid fa-heart"></i></li>
      </ul>
    </div>
    </article>
      `);

  $tweet.append(safeInput);
  $tweet.append(footer);
  $('.tweets').prepend($tweet);

};

//////////////   LOOPING THROUGH ITEMS IN DATABASE ///////////////////

const renderTweets = (data) => {
  for (let item of data) {
    createTweetElement(item);
  }
};

////////////   MESSAGE SUBMISSION //////////////

$(() => {
  $('#submit-form').on('submit', (event) => {
    event.preventDefault();
    let userMessage = $('#tweet-text').val();
    // form validation
    error();
    if (userMessage.length > 140) {
      error2();
      return;
    }
    const str = $('#submit-form').serialize();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: str,
      success: () => {
        loadTweets(true);
        // resetting form after submission, and keeping form text if over 140 characters
        if (userMessage.length < 140) {
          userMessage = $('#tweet-text').val("");
        }
        $('#tweet-text').val("");
        $('.counter').val('140');
      }
    });
  });

  //////   rendering tweets ///////

  const loadTweets = (getLast) => {
    $.get('/tweets')
      .then(posts => {
        if (getLast) {
          const lastTweet = posts[posts.length - 1];
          renderTweets([lastTweet]);
        } else {
          renderTweets(posts);
        }
      });
  };
  loadTweets();
});

////// FORM VALIDATION ERROR MESSAGES ///////

const error = () => {
  let userMessage = $('#tweet-text').val();
  if (userMessage.length === 0 || userMessage === null) {
    $('.error').val('The field is empty');
    $('.error').css("display", "inline-block");
    document.addEventListener('keydown', () => {
      $('.error').css("display", "none");
    });
    return;
  }
  return;
};

const error2 = () => {
  let userMessage = $('#tweet-text').val();
  if (userMessage.length > 140) {
    $('.error2').val('You have exceeded 140 characters');
    $('.error2').css("display", "inline-block");
    document.addEventListener('keydown', () => {
      $('.error2').css("display", "none");
    });
    return;
  }
};