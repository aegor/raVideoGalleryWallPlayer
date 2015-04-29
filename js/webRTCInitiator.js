function webRTCInitiator(runLoop) {
    var webRTCConfig = getConfig('../webRTCConfig.json');

    var webRTCPeer = new Peer(webRTCConfig.controllerId, {
        host: webRTCConfig.server,
        port: webRTCConfig.serverPort,
        path: webRTCConfig.serverPath,
        debug: 3
    });
    webRTCPeer.on('open', function(id) {
        console.log('My peer ID is: ' + id);
    });

    webRTCPeer.on('disconnected', function() {
        webRTCPeer.reconnect();
    });

    webRTCPeer.on('error', function(err) {
        console.log('WEBRTC Peer error: ', err);
    });

    var webRTCConn = webRTCPeer.connect(webRTCConfig.id);

    webRTCConn.on('open', function() {
        // Receive messages
        webRTCConn.on('data', function(data) {
            runLoop(data, webRTCConn);
        });
        webRTCConn.on('connection', function(data) {
            console.log('WEBRTC Connection established: ', data);
        });
        webRTCConn.on('error', function(err) {
            console.log('WEBRTC Connection error: ', err);
        });
        webRTCConn.on('disconnected', function() {
            console.log('WEBRTC disconnected');
        });
        // Send messages
        // webRTCConn.send('Hello!');
    });
    return webRTCConn
}
