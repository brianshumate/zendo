#!/usr/bin/env node

// Dependencies
var nconf = require('nconf')
var chalk = require('chalk')
var path = require('path')
var program = require('commander')
var zendesk = require('node-zendesk')
var configFile = path.join(process.env.HOME, '.zendo-config.json')

nconf.argv().env()

nconf.file({
    file: configFile
})

// Configuration
var openTickets = 0
var pendingTickets = 0
var searchQuery = 'status<solved assignee:me'
var ticketHealth

// Zendesk API connection
var client = zendesk.createClient({
    username: nconf.get('zd_email'),
    token: nconf.get('zd_token'),
    remoteUri: nconf.get('zd_uri')
})

// Command line options
program
  .version(require('../package.json').version)
  .option('-o, --organization', 'show organization name instead of ID')
  .parse(process.argv)

client.search.query(searchQuery, function (err, req, result) {
  if (err) {
    console.log(err)
    return
  }

  // Check open/pending ratio and assign emoticon
  var healthCheck = function () {
    for (var i = 0, max = result.length; i < max; i += 1) {
      var status = result[i].status
      if (status === 'pending') {
        pendingTickets += 1
      } else {
        openTickets += 1
      }
      if (openTickets > pendingTickets) {
        ticketHealth = '😞'
      } else if (openTickets === pendingTickets) {
        ticketHealth = '😐'
      } else {
        ticketHealth = '😄'
      }
    }

    return ticketHealth
  }

  var currentHealth = healthCheck()

  console.log(chalk.white('## Ticket Status ' + currentHealth))
  console.log(chalk.white('## ' + nconf.get('zd_name') + ' has ' + result.length + ' unsolved tickets (' + openTickets + ' open' + ', ' + pendingTickets + ' pending):'))

  // Check ticket status and set output color
  var ticketStatus = function (currentStatus) {
  var statusColor = chalk.red

  if (currentStatus === 'pending') {
    statusColor = chalk.green
  } else if (currentStatus === 'open') {
    statusColor = chalk.yellow
  }
  return statusColor
}
  for (var i = 0, max = result.length; i < max; i += 1) {
    var org
    var id = result[i].id
    var orgId = result[i].organization_id
    var subject = result[i].subject.substring(0, 50)
    var status = result[i].status

    if (program.organization) {
      // TODO: this stub needs to be converted to actual org name
      //       and added as an option
      orgId = org.organization()
    }
    var statusColor = ticketStatus(status)
    console.log(statusColor(i + '. ' + id + ' | ' + orgId + ' | ' + subject))
  }
})
