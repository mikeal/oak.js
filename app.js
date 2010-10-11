 var couchapp = require('couchapp')
  , path = require('path')
  ;

ddoc = { _id:'_design/app'
  , rewrites : [
        {from:"/", to:'index.html'}
      , {from:"/api", to:'../../'}
      , {from:"/api/*", to:'../../*'}
      , {from:"/*", to:'*'}
    ]
  }

ddoc.views = {rsvp: {map: function (doc) {
  emit(doc.eventDate, 1)
}}}

couchapp.loadAttachments(ddoc, path.join(__dirname, 'attachments'))

exports.app = ddoc