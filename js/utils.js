/*var sudo = require('sudo');
var sudoOptions = {
    cachePassword: true,
    prompt: 'Password:',
    spawnOptions: { other options for spawn  }
};*/

/*var child = sudo([ 'ls', '-l', '/tmp' ], sudoOptions);
child.stdout.on('data', function (data) {
    console.log(data.toString());
});
*/

var config = {}

function initConfig() {
    if (Lockr.get('config')) {
        config = Lockr.get('config')
    } else {
        config = getConfig('config.json')
    }
}

function getConfig(config) {
    var request = new XMLHttpRequest();
    request.open('GET', config, false); // `false` makes the request synchronous
    request.send(null);
    if (request.status !== 200) {
        console.log("config pull error");
        return null
    }
    return JSON.parse(request.responseText);
};

function reboot() {
    console.log('reboot command received');
}

function restart() {
    console.log('restart command received');
}
