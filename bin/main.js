#!/usr/bin/env node

// Dependencies
var nconf = require('nconf');
var color = require('ansi-color').set;
var path = require('path');
var program = require('commander');
var zendesk = require('node-zendesk');
var configFile = path.join(process.env.HOME, '.zendo-config.json');

nconf.argv().env();

nconf.file({
    file: configFile
});

// Configuration
var openTickets = 0,
    pendingTickets = 0,
    searchQuery = "status<solved assignee:me",
    ticketHealth;

// Zendesk API connection
var client = zendesk.createClient({
    username: nconf.get('zd_email'),
    token: nconf.get('zd_token'),
    remoteUri: nconf.get('zd_uri')
});

// Command line options
program
  .version(require('../package.json').version)
  .option('-o, --organization', 'show organization name instead of ID')
  .parse(process.argv);

client.search.query(searchQuery, function (err, req, result) {

    if (err) {
        console.log(err);
        return;
    }

  // Check open/pending ratio and assign emoticon
    var healthCheck = function () {

        for (var i = 0, max = result.length; i < max; i += 1) {

            var status = result[i].status;

            if (status === 'pending') {
                pendingTickets += 1;
            } else {
                openTickets += 1;
            }

            if (openTickets > pendingTickets) {
                ticketHealth = '😞';
            } else if (openTickets === pendingTickets) {
                ticketHealth = '😐';
            } else {
                ticketHealth = '😄';
            }

        }

        return ticketHealth;
    };

    var currentHealth = healthCheck();

    console.log(color('## Ticket Status ' + currentHealth, 'white'));
    console.log(color('## ' + nconf.get('zd_name') + ' has ' + result.length + ' unsolved tickets (' + openTickets + ' open' + ', ' + pendingTickets + ' pending):', 'white'));

    // Check ticket status and set output color
    var ticketStatus = function (currentStatus) {
        var statusColor = 'red';

        if (currentStatus === 'pending') {
            statusColor = 'green';
        }
        else if (currentStatus === 'open') {
            statusColor = 'yellow';
        }
        return statusColor;
    };

    for (var i = 0, max = result.length; i < max; i += 1) {

        var org,
        id = result[i].id,
        orgId = result[i].organization_id,
        subject = result[i].subject.substring(0, 50),
        status = result[i].status;

        if (program.organization) {
          // TODO: this stub needs to be converted to actual org name
          //       and added as an option
            orgId = org.organization();
        }

        console.log(color(i + ". " + id + " | " + orgId + " | " + subject, ticketStatus(status)));
    }

});
