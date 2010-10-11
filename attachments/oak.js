var request = function (options, callback) {
  options.success = function (obj) {
    callback(null, obj);
  }
  options.error = function (err) {
    if (err) callback(err);
    else callback(true);
  }
  options.dataType = 'json';
  options.contentType = 'application/json'
  $.ajax(options)
}

var isaacsPicture = 'http://www.gravatar.com/avatar/73a2b24daecb976af81e010b7a3ce3c6?s=140';
var mikealPicture = 'http://www.gravatar.com/avatar/a6b7cf03b0631c6fe3b432fa1d015524?s=140';

var isaacsDescription = "Async Programming in node.js - Isaac Shlueter <br><br>";
isaacsDescription += 'Async isn\'t hard and you don\'t need promises. issacs, author of <a href="http://npmjs.org/">npm</a>, will explain.'

var meetup = {
    date: "Wednesday October 20th"
  , schedule: [
        ['6pm', 'require("social")']
      , ['7pm', isaacsDescription, isaacsPicture]
      , ['7:30pm', 'require("food")']
      , ['8pm', 'Another Person', mikealPicture]
    ]
}

var getAttendeeHtml = function (doc) {
  var text = '<div class="attendee">'+
    '<div class="attendee-name">'+doc.name+'</div>'+
    '<div class="attendee-pic">'+
      '<img class="attendee-pic" src="'+'http://www.gravatar.com/avatar/'+
        hex_md5(doc.email)+'?s=50'+'"></img></div>'+
  '</div>'
  return text;
}

var app = {};

app.index = function () {
  var text = '<div class="event-title">'+meetup.date+'</div>';
  for (var i=0;i<meetup.schedule.length;i++) {
    if (meetup.schedule[i].length === 2) {
      text += '<div class="event-item">'
      text +=   '<div class="event-time">'+meetup.schedule[i][0]+'</div>'
      text +=   '<div class="event-break-title">'+meetup.schedule[i][1]+'</div>'
      text += '</div>'
    } else {
      text += '<div class="event-item">'
      text +=   '<div class="event-time">'+meetup.schedule[i][0]+'</div>'
      text +=   '<div class="event-talk-title">'+meetup.schedule[i][1]+'</div>'
      text +=   '<div class="event-talk-pic"><img class="speaker" src="'+meetup.schedule[i][2]+'" /></div>'
      text += '</div>'
    }
  }
  $('div#upcoming-event').append($(text))
  $('img.speaker').corner();
  $('span#rsvp-button').corner()
  .click(function () {
    var data = {  email: $("input[name=email]").val()
                , name: $("input[name=name]").val()
                , type: 'rsvp'
                , eventDate: meetup.date
                }
    request({type:'POST', url:'/api', data: JSON.stringify(data)}, function (err, obj) {
      if (obj.id) {
        $("div#rsvp").remove();
        $("div#attendees").prepend($(getAttendeeHtml(data)));
        $("img.attendee-pic").corner();
      }
    })
  })
  .hover(
      function () {$(this).css("background-color", "#BABABA")}, 
      function () {$(this).css("background-color", "#AAAAAA")}
  )
  ;
  
  request({url:'/_view/rsvp?'+$.param({key: JSON.stringify(meetup.date), include_docs:'true'})}, function (err, resp) {
    resp.rows.forEach( function (row) {
      $("div#attendees").append($(
        getAttendeeHtml(row.doc)
      ));
    })
    $("img.attendee-pic").corner();
  })
}

var a = $.sammy(function () {
  // Index of all databases
  this.get('', app.index);
  this.get("#/", app.index);
  
})

$(function () {a.use('Mustache'); a.run(); });
