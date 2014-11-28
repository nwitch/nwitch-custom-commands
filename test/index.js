var customCommands = require('../');
var test = require('tape');
var isFunction = require('lodash.isfunction');
var Stream = require('readable-stream').PassThrough;
var irc = require('slate-irc');

test('exports a function which returns a function when called', function(t) {
  t.plan(2);
  t.ok(isFunction(customCommands));
  t.ok(isFunction(customCommands()));
});

test('replies when commanded', function(t) {
  t.plan(4);
  var stream = new Stream();
  var client = irc(stream);
  client.use(customCommands({
    'foo': 'bar',
    'baz': 'foobar'
  }));

  var testCommand = ':KenanY!KenanY@irc.kenany.me PRIVMSG #nwitch :' +
                    '!foo\r\n';
  var testCommand2 = ':KenanY!KenanY@irc.kenany.me PRIVMSG #nwitch :' +
                    '!baz\r\n';

  var n = 0;
  stream.on('data', function(chunk) {
    switch (n++) {
      case 0:
        t.equal(chunk, testCommand);
        break;
      case 1:
        t.equal(chunk, 'PRIVMSG #nwitch :KenanY: ' +
                       'bar\r\n');
        stream.write(testCommand2);
        break;
      case 2:
        t.equal(chunk, testCommand2);
        break;
      case 3:
        t.equal(chunk, 'PRIVMSG #nwitch :KenanY: ' +
                       'foobar\r\n');
        break;
    }
  });

  stream.write(testCommand);
});