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
            if (pl1.select(message.args) !== 0){
                webRTCCommandError("selected index out of range", conn);
            }
            break;
        case '||':
            pl1.pause();
            break;
        case '>':
            pl1.play();
            break;
        case 'loadConfig':
            conn.send({
                config: config
            });
            break;
        case 'saveConfig':
            if (message.args.mediaType) {
                Lockr.set('config', message.args);
                location.reload();
            } else {
                webRTCCommandError("invalid config", conn);
            }
            break;
        case 'resetConfig':
            Lockr.flush();
            location.reload();
            break;
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
    console.log("WebRTC command error: ", err);
    conn.send(message);
}
