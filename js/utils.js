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

function getConfig(config) {
    var request = new XMLHttpRequest();
    request.open('GET', config, false); // `false` makes the request synchronous
    request.send(null);
    if (request.status !== 200) {
        console.log("config pull error")
    }
    return JSON.parse(request.responseText);
};

function reboot(){
	console.log('reboot coomand received');
}

function restart(){
	console.log('restart command received');
}
