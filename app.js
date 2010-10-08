 var couchapp = require('couchapp')
  , path = require('path')
  ;

ddoc = { _id:'_design/app'
  , rewrites : [
        {from:"/", to:'index.html'}
      , {from:"/api/*", to:'../../*'}
      , {from:"/*", to:'*'}
    ]
  }

couchapp.loadAttachments(ddoc, path.join(__dirname, 'attachments'))

exports.app = ddoc