var keystone = require('keystone');

/**
 * ExamplePluginModel Model
 * ==================
 */

var DeviceModel = new keystone.List('DeviceModel');

DeviceModel.add({
	port: { type: String },
  username: { type: String },
  password: { type: String }
});

DeviceModel.register();
