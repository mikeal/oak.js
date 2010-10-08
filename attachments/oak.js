var request = function (options, callback) {
  options.success = function (obj) {
    callback(null, obj);
  }
  options.error = function (err) {
    if (err) callback(err);
    else callback(true);
  }
  options.dataType = 'json';
  $.ajax(options)
}

var isaacsPicture = 'http://www.gravatar.com/avatar/73a2b24daecb976af81e010b7a3ce3c6?s=140&d=http://github.com/images/gravatars/gravatar-140.png'

var event = {
    date: "Wednesday October 20th"
  , schedule: [
        ['6pm', 'require("social")']
      , ['7pm', 'Issac Schlueter', isaacPicture]
      , ['7:30pm', '\<script scr="food.js"\>']
      , ['8pm', 'Another Person']
    ]
}

var app = {};

app.index = function () {
  $('div#upcoming-event')
}

var a = $.sammy(function () {
  // Index of all databases
  this.get('', app.index);
  this.get("#/", app.index);
  
})

$(function () {a.use('Mustache'); a.run(); });
