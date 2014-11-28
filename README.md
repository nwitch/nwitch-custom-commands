# nwitch-custom-commands

[nwitch][] (and [slate-irc][]) plugin that allows you to define responses for
any command.

``` irc
05:34 <KenanY> !foo
05:34 <nwitch> KenanY: bar
05:35 <KenanY> !baz
05:35 <nwitch> KenanY: foobar
```

## Example

As a [nwitch][] plugin (using `config.toml`):

``` toml
[plugins.nwitch-custom-commands]
foo = "bar"
baz = "foobar"
```

Or through [nwitch][]'s API:

``` javascript
var Nwitch = require('nwitch');
var customCommands = require('nwitch-custom-commands');

var nwitch = new Nwitch({
  irc: {
    address: 'irc.freenode.org',
    port: 6667
  }
});

nwitch.use(customCommands({
  'foo': 'bar',
  'baz': 'foobar'
}));
```

Technically, all [nwitch][] plugins are just [slate-irc][] plugins, so you could
also use this as a [slate-irc][] plugin:

``` javascript
var net = require('net');
var irc = require('slate-irc');
var customCommands = require('nwitch-custom-commands');

var stream = net.connect({
  port: 6667,
  host: 'irc.freenode.org'
});

var client = irc(stream);
client.use(customCommands({
  'foo': 'bar',
  'baz': 'foobar'
}));
```

## Installation

``` bash
$ npm install nwitch-custom-commands
```

## API

``` javascript
var customCommands = require('nwitch-custom-commands');
```

### `customCommands(opts)`

Given an _Object_ `opts`, registers a new command for each key-value in `obj`.
The value of each key is the output for a command matching the key.


   [nwitch]: https://github.com/KenanY/nwitch
   [slate-irc]: https://github.com/slate/slate-irc