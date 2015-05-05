/*
As on https://github.com/peers/peerjs-server :

Connecting to the server from PeerJS:

<script>
    // No API key required when not using cloud server
    var peer = new Peer('someid', {host: 'localhost', port: 9000, path: '/myapp'});
</script>
*/

var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;
var options = {debug: true}

/*
app.get('/', function(req, res, next) { res.send('Hello world!'); });
var server = app.listen(9000);
app.use('/api', ExpressPeerServer(server, options));
*/

// OR

var server = require('http').createServer(app);

server.on('connection', function(id) {
	console.log('-------------------------------------------------------------------------------');
	console.log('connected with id: ', id);
	console.log('===============================================================================');
});
	

server.on('disconnect', function(id) {
	console.log('disconnected from id: '/*, id*/);
});

app.use('/rationale', ExpressPeerServer(server, options));

server.listen(9000);
