var tunnel = require('reverse-tunnel-ssh');
tunnel({
  host: 'undefined',
  port: 6100,
  username: '5svGuX2Bik',
  password: '4vo34CMXwU',
  dstHost: '0.0.0.0',
  dstPort: 3017, 
  srcPort: 3100 
}, function(error, clientConnection) {
  if(error)
    console.error('Error! ', error);
});