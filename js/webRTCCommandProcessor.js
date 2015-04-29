var login = "";
var password = "";
function webRTCCommandProcessor(message, conn) {
    switch (message.command) {
        case 'reboot':
            reboot();
            break;
        case 'restart':
            restart();
            break;
        case 'reload':
            location.reload();
            break;
        case '>>':
            pl1.forward();
            break;
        case '<<':
            pl1.backward();
            break;
        case 'select':
            pl1.select(message.args);
            break;
        case 'pause':
            pl1.pause();
            break;
        case 'play':
            pl1.play();
            break;
        case 'loadConfig':
            conn.send({config: config});
            break;
        case 'saveConfig':
            Lockr.set('config', message.args);
            config = message.args;
            break;
        case 'resetConfig':
            Lockr.flush();
            location.reload();
        default:
            webRTCCommandError("command not found", conn);
    }
}

function webRTCSendCommand(command, args, conn) {
	var message = {};
	message.credentials = {};
    message.credentials.user = login;
	message.credentials.password = password;
	message.command = command;
	message.args = args;
	conn.send(message)
}

function webRTCCommandError(err, conn) {
	var message = {};
	message.error = err;
	console.log("WebRTC command error", err);
	conn.send(mesage);
}


