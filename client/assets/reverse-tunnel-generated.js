var tunnel = require('reverse-tunnel-ssh');
tunnel({
  host: 'undefined',
  port: 6100,
  username: 'qvtYHm1p9z',
  password: '9a3QyVAyuc',
  dstHost: '0.0.0.0',
  dstPort: 3015, 
  srcPort: 3100 
}, function(error, clientConnection) {
  if(error)
    console.error('Error! ', error);
});