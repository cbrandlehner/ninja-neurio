var configMessages = require('./config-messages');

/**
 * Called from the driver's config method when a
 * user wants to see a menu to configure the driver
 * @param  {Function} cb Callback to send a response back to the user
 */
  exports.menu = function(opts_string,cb) {
    var returnMenu = configMessages.menu;
    returnMenu.contents[2].value = opts_string;
    cb(null,configMessages.menu);
  };

/**
 * Called when a user clicks the 'Echo back to me'
 * button we sent in the menu request
 * @param  {Object}   params Parameter object
 * @param  {Function} cb     Callback to send back to the user
 */
exports.echo = function(opts,params,cb) {

  var echoText = params.echoText;
  var payloadToSend = configMessages.echo;
  opts.poll_interval = params.poll_interval;
  this.save();

  if (payloadToSend.contents[1]) {
    payloadToSend.contents[1].text = "The Neurio monitor will update every " + params.poll_interval + " seconds.";
  } else {
    payloadToSend.contents.push({ "type": "paragraph", "text": "The Neurio monitor will update every " + params.poll_interval + " seconds."});
    payloadToSend.contents.push({ "type": "close"    , "name": "Close" });
  }

  cb(null,payloadToSend);
};
