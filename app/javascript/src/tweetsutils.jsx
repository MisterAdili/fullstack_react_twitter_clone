import $, { param } from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

export function postTweet(username, tweetContent, successCB) {
  var newRequest = {
    type: 'POST',
    url: '/tweets',
    data: {
      tweet: {
          user_id: username,
          message: tweetContent
      }
    },
    success: (response)=>{
      successCB(response);
    },
    error: (response, errorMsg)=>{
      console.log('tweet post error:');
      console.log(response, errorMsg);
      return;
    }};

  $.ajax(newRequest);
};

export function listTweets(successCB) {
  var newRequest = {
      type: 'GET',
      url: '/tweets',
      success: (result)=>{successCB(result);},
      error: (error)=>{
        console.log('tweets list error');
        console.log(error);
      }};
  $.ajax(newRequest);
};

export function deleteTweetCall(id,successCB){
  var newRequest = {
    type: 'DELETE',
    url: '/tweets/' + id,
    success: (result)=>{successCB(result);},
    error: (error)=>{
      console.log('tweet delete error');
      console.log(error);
    }};

    $.ajax(newRequest);
};

export function listUserTweets(username,successCB) {
  var newRequest = {
  type: 'GET',
  url: '/users/:' + username + '/tweets',
  success: ()=>{successCB();},
  error: (error)=>{
    console.log('list user tweets error');
    console.log(error);
  }};

  $.ajax(newRequest);
};
  
