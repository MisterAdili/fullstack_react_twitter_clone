import $, { param } from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

export function createUser(username, password, email, successCB) {
  var newRequest = {
    type: 'POST',
    url: '/users',
    data: {
      user: {
          'username': username,
          'email': email,
          'password': password
      }
    },
    success: (response)=>{successCB();console.log(response);},
    error: function(response, errorMsg){
      console.log('user create error:');
      console.log(response, errorMsg);
      return;
    }};

  $.ajax(newRequest);
};

export function signInUser(username, password, successCB) {
  var newRequest = {
      type: 'POST',
      url: '/sessions',
      data: {
        user: {
          'username': username,
          'password': password
        }
      },
      success: (response)=>{successCB();console.log(response);},
      error: (error)=>{
        console.log('error break');
        console.log(error);
      }};
  $.ajax(newRequest);
};

export function authenticateUser(successCB){
  var newRequest = {
    type: 'GET',
    url: '/authenticated',
    success: (response)=>{successCB(response);},
    error: (error)=>{
      console.log('error break');
      console.log(error);
    }};

    $.ajax(newRequest);
};

export function signOutUser(successCB) {
  var newRequest = {
  type: 'DELETE',
  url: '/sessions',
  success: ()=>{successCB();},
  error: (error)=>{
    console.log('error break');
    console.log(error);
  }};

  $.ajax(newRequest);
};
