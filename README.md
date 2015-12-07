# Zendo

[![npm version](https://badge.fury.io/js/zendo.svg)](http://badge.fury.io/js/zendo)

Zendo is a minimal command line utility that displays some basic ticket status
information in the terminal for [Zendesk](http://www.zendesk.com/) agents.

When properly configured, the default mode of operation uses the Zendesk API
to fetch and display the following information in colorized Markdown format:

* Ticket mood: Emoji indicating your current *ticket mood* based on the
  ratio of open vs. pending status tickets: 😞 😐 😄
* Total number of tickets
* Total number of tickets in open status
* Total number of tickets in pending status
* Ticket number, customer ID, and ticket subject

## Setup (npm)

Install the zendo module with `npm` like so:

```
npm install zendo -g
```

### Example Configuration File

Create a `~/.zendo-config.json` configuration file containing the following:

    {
      "zd_name": "Stephie Andretti"
      "zd_email": "stephie@example.com",
      "zd_token": "XXXxxXXxXXXXxXxXxxxXXXxxXXXXxXXXX",
      "zd_uri": "https://example.zendesk.com/api/v2",
    }

* *zd_name*  : Set to your full name
* *zd_email* : Set to your Zendesk account email address
* *zd_token* : Set to your Zendesk API token
* *zd_uri*   : Set to your Zendesk API v2 URI

## Setup (GitHub)

To run with a git clone, perform these steps instead:

```
git clone https://github.com/brianshumate/zendo.git
cd zendo
npm install
npm link
```

Copy `zendo-config.json-dist` to `zendo-config.json` and edit the
values within it to match your setup based on the example and
information in the **Example Configuration File** above:

```
cp etc/zendo-config.json-dist ~/.zendo-config.json
$EDITOR zendo-config.json
```

## Usage

Run the executable:

```
zendo
```

By default, `zendo` emits the customer's ID and not the organization name,
with the reasoning that this is both safer and that the agent will likely
recall the customer based on the ticket number or subject information.

## TODO

* Better configuration handling
