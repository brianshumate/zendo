#!/usr/bin/env node

// TODO: This is yet to be implmented

exports.organization = function() {

var zendesk = require('node-zendesk'),
    nconf = require('nconf');

var client = zendesk.createClient({
    username:  nconf.get('zd_email'),
    token:     nconf.get('zd_token'),
    remoteUri: nconf.get('zd_uri')
});

// testing
// var id = XXXXXXXX

function orgLookup(id, callback) {
  var orgName;
  var show = client.organizations.show(id, function (err, req, result){

    if (err) {
      console.log(err);
      return;
    }

    orgName = result.name;
    callback(orgName);

  });

}

var getOrg = function() {
  orgLookup(id, function(orgName){
    return orgName;
  });
  };
};
