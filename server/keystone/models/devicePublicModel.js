var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Device Public Model
 * ==================
 */

var DevicePublicModel = new keystone.List('DevicePublicModel');

DeviceModel.add({
	rentStartDate: { type: String },
  rentStopDate: { type: String },
  rentHourlyRate: { type: String },
  subdomain: { type: String },
  httpPort: { type: String },
  sshPort: { type: String },
  memory: { type: String },
  diskSpace:  { type: String },
  processor:  { type: String },
  speedTestResults:  { type: String }
});

DevicePublicModel.register();
