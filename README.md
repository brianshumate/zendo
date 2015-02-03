# Zendo

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

Create a `~/.zendo-config.json` configuration file containing the following:

    {
      "zd_email": "stephie@example.com",
      "zd_token": "XXXxxXXxXXXXxXxXxxxXXXxxXXXXxXXXX",
      "zd_uri": "https://example.zendesk.com/api/v2",
    }

* *zd_email* : Set to your Zendesk account email address
* *zd_token* : Set to your Zendesk API token
* *zd_uri*   : Set to your Zendesk API v2 URI


Execute the `zendo` binary:

```
zendo
```

## Setup (GitHub)

If you cloned the GitHub project, then setup is done with the following
steps instead.

Change into the `zendo` repository directory and install its dependencies:

```
cd zendo
npm install
```

Copy `zendo-config.json-dist` to `zendo-config.json` and edit the
values within it:

```
cp etc/zendo-config.json-dist ~/.zendo-config.json
$EDITOR zendo-config.json
```

Modify the values within it to match your setup:

    {
      "zd_email": "stephie@example.com",
      "zd_token": "XXXxxXXxXXXXxXxXxxxXXXxxXXXXxXXXX",
      "zd_uri": "https://example.zendesk.com/api/v2",
    }

* *zd_email* : Set to your Zendesk account email address
* *zd_token* : Set to your Zendesk API token
* *zd_uri*   : Set to your Zendesk API v2 URI

## Usage

Quickly get up and running with `zendo` in a rather temporary manner:

```
export PATH="$PATH:$(pwd)/bin"
zendo
```

By default, `zendo` emits the customer's ID and not the organization name,
with the reasoning that this is both safer and that the agent will likely
recall the customer based on the ticket number or subject information.

## TODO

* Better configuration handling
