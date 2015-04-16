var stream = require('stream')
  , util = require('util')
  , os = require('os')
  , exec = require('child_process').exec
  , child;
var auth = require('./auth')
var client = require('./client')

/* common code */
var debug = false; // set true for more debugging info
// Give our device a stream interface
util.inherits(Device,stream);

// Export it
module.exports=Device;

/**
 * Creates a new Device Object
 *
 * @property {Boolean} readable Whether the device emits data
 * @property {Boolean} writable Whether the data can be actuated
 *
 * @property {Number} G - the channel of this device
 * @property {Number} V - the vendor ID of this device
 * @property {Number} D - the device ID of this device
 *
 * @property {Function} write Called when data is received from the Ninja Platform
 *
 * @fires data - Emit this when you wish to send data to the Ninja Platform
 */
 function Device(app, opts) {

  var self = this;
  this._app = app;

  // This device will emit data
  this.readable = true;
  // This device cannot be actuated
  this.writeable = false;
  // http://shop.ninjablocks.com/pages/device-ids
  this.G = "0"; // G is a string a represents the channel
  this.V = 3; // 0 is Ninja Blocks' device VID
  this.D = 2; // VID 3 with DID2 is a device of type "power usage"
  this.name = 'powerusage';
  var powerusage = 0.0;
  var real_poll_interval = opts.poll_interval * 10000;
  var clientId = opts.ClientID
  var clientSecret = opts.ClientSecret

  process.nextTick(function() {

    setInterval(function() {
    
    // This should read data from the Neurio API
      auth.simple(clientId, clientSecret).then(function (client) {
        client.defaultSensorId().then(function (sensorId) {
          client.liveSamples(sensorId).then(function (samples) {
            console.log(samples)
          })
        })
      })  
      powerusage = samples;
      if (debug) {console.log('data: ', powerusage);};
    
      self.emit('data',powerusage);
      }, real_poll_interval);
    });
  };

function setState(id, val)
{
//socket.emit("setState", [id,val]);
}
function setObject(id, obj)
{
metaObjects[id] = obj;
if (obj.Value)
{
metaIndex.Address[obj.Name] = obj.Value;
}
//socket.emit("setObject", id, obj);
}
	
	
/**
 * Called whenever there is data from the Ninja Platform
 * This is required if Device.writable = true
 *
 * @param  {String} data The data received
 */
Device.prototype.write = function(data) {

  // I'm being actuated with data!
  self._app.log.error('[ninja-neurio] was actuated but should not have been');
};
    
