function webRTCInitiator(runLoop) {
	var webRTCConfig = getConfig('../webRTCConfig.json');

	var webRTCPeer = new Peer('rationale-' + webRTCConfig.name + '-controller', {
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
		//location.reload();
	});

	var webRTCConn = {};

	this.GetConnection = function () {
		return webRTCConn
	}

	function openChannel() {
		webRTCConn = webRTCPeer.connect('rationale-' + webRTCConfig.name);

		webRTCConn.on('open', function () {
			console.log('WEBRTC opened');
			// Receive messages
			webRTCConn.on('data', function (data) {
				runLoop(data, webRTCConn);
			});
			webRTCConn.on('close', function () {
				console.log('WEBRTC Connection closed, reopen');
				webRTCConn = null;
				openChannel();
			});
			webRTCConn.on('error', function (err) {
				console.log('WEBRTC Connection error: ', err);
			});

			// Send messages
			// webRTCConn.send('Hello!');
		});
	}

	openChannel();
}
