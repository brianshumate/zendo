#!/usr/bin/env node

// TODO: This is yet to be implmented

exports.organization = function () {
  var zendesk = require('node-zendesk')
  var nconf = require('nconf')
  var id
  var client = zendesk.createClient({
    username: nconf.get('zd_email'),
    token: nconf.get('zd_token'),
    remoteUri: nconf.get('zd_uri')
  })

  function orgLookup (id, callback) {
    var orgName
    var show = client.organizations.show(id, function (err, req, result) {
      if (err) {
        console.log(err)
        return
      }
      orgName = result.name
      callback(orgName)
    })
    console.info(show)
  }

  var getOrg = function () {
    orgLookup(id, function (orgName) {
      return orgName
    })
  }
  console.log(getOrg)
}
