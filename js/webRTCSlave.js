var webRTCConfig;

function webRTCSlave(runLoop) {
	// get basic webRTCConfig
	webRTCConfig = getConfig('webRTCConfig.json');
	/*
	 * Establish new webRTC server connection
	 */
	var webRTCPeer = new Peer('rationale-' + webRTCConfig.name, {
		host: webRTCConfig.server,
		port: webRTCConfig.serverPort,
		path: webRTCConfig.serverPath,
		debug: webRTCConfig.debug
	});
	webRTCPeer.on('open', function (id) {
		console.log('My peer ID is: ' + id);
	});

	webRTCPeer.on('disconnected', function () {
		webRTCPeer.reconnect();
	});

	webRTCPeer.on('error', function (err) {
		console.log('WEBRTC Peer error: ', err);
	});

	webRTCPeer.on('connection', function (conn) {
		conn.on('open', function () {
			console.log('WEBRTC opened');
			// Receive messages
			conn.on('data', function (data) {
				runLoop(data, conn);
			});
			conn.on('connection', function (data) {
				console.log('WEBRTC Connection established: ', data);
			});
			conn.on('error', function (err) {
				console.log('WEBRTC connection error: ', err);
			});
			conn.on('disconnected', function () {
				console.log('WEBRTC connection disconnected');
			});
			conn.on('close', function () {
				console.log('WEBRTC connection is closed');
			});
		});
	});
}
