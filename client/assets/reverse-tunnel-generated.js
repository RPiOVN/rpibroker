var tunnel = require('reverse-tunnel-ssh');
tunnel({
  host: 'undefined',
  port: 6100,
  username: 'Lw9wxDOOGf',
  password: 'U8s9V9K86A',
  dstHost: '0.0.0.0',
  dstPort: 3008, 
  srcPort: 3100 
}, function(error, clientConnection) {
  if(error)
    console.error('Error! ', error);
});