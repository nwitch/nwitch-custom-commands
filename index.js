var behest = require('behest');

function customCommands(opts) {
  return function(irc) {
    irc.on('message', function(evt) {
      var from = evt.from;
      var to = evt.to;
      var message = evt.message;

      if (!behest.isValid(message)) {
        return;
      }

      var command = behest(message);
      if (opts[command.command]) {
        var destination = to.charAt(0) === '#' ? to : from;
        irc.send(destination, from + ': ' + opts[command.command]);
      }
    });
  };
}

module.exports = customCommands;