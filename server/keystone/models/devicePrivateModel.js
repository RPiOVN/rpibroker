var keystone = require('keystone');

/**
 * Device Private Model
 * ==================
 */

var DevicePrivateModel = new keystone.List('DevicePrivateModel');

DevicePrivateModel.add({
	ownerUser: { type: Types.Relationship, ref: 'User' },
  renterUser: { type: Types.Relationship, ref: 'User' },
  serverSSHPort: { type: String },
  deviceUser: { type: String },
  devicePassword: { type: String }
});

DevicePrivateModel.register();
