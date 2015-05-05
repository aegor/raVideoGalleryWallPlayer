PolymerExpressions.prototype.debug = function(input, arg) {
	var s = "color: blue; font-size: 12px;";
	console.log("%cPOLYMER DEBUG FILTER. Input: " + input + " Argument: " + arg, s)
	return input;
};
Polymer('ra-unifi-player-controller', {
	playlistSelected: 0,
	hybinarTranscoderHelp: 'help',
	config: {},
	rtc: {},
	assets: [],
	baseName: function(str)
		{
			var base = new String(str).substring(str.lastIndexOf('/') + 1);
			if(base.lastIndexOf(".") != -1)
				base = base.substring(0, base.lastIndexOf("."));
			return base;
		},
	runLoop: function(data, conn) {
		var instance = document.querySelector('body /deep/ ra-unifi-player-controller');
		if (data.error) {
			console.log("WEBRTC received error: ", data.error);
		} else if (data.config) {
			console.log("WEBRTC received config: ", data.config);
			instance.config = data.config;
			var assetsPath = data.config.mediaType[data.config.mediaTypeSelected].assets;
			instance.assets = getConfig("../" + assetsPath);
			for (var i in instance.assets){
				instance.assets[i] = instance.baseName(instance.assets[i])
			};
		} else {
			console.log("WEBRTC received unknown data: ", data);
		}
	},
	ready: function() {
		this.rtc = new webRTCInitiator(this.runLoop);
		setTimeout(function() {
				var instance = document.querySelector('body /deep/ ra-unifi-player-controller');
				webRTCSendCommand('loadConfig', '', instance.rtc.GetConnection());
			},
			700
		);
	},
	onHelp: function() {
		var dialog = document.querySelector('body /deep/ #help');
		dialog.open();
	},
	onReboot: function() {
		webRTCSendCommand('reboot', '', this.rtc.GetConnection())
	},
	onRestart: function() {
		webRTCSendCommand('restart', '', this.rtc.GetConnection())
	},
	onReload: function() {
		webRTCSendCommand('reload', '', this.rtc.GetConnection())
	},
	onPlay: function() {
		webRTCSendCommand('>', '', this.rtc.GetConnection())
	},
	onPause: function() {
		webRTCSendCommand('||', '', this.rtc.GetConnection())
	},
	onBackward: function() {
		webRTCSendCommand('<<', '', this.rtc.GetConnection())
	},
	onForward: function() {
		webRTCSendCommand('>>', '', this.rtc.GetConnection())
	},
	onPlaylistSelected: function() {
		webRTCSendCommand('select', this.playlistSelected, this.rtc.GetConnection())
	},
	onConfigSave: function(){
		console.log("saved config: ", this.config);
		webRTCSendCommand('saveConfig', this.config, this.rtc.GetConnection())
	},
	onConfigReset: function(){
		webRTCSendCommand('resetConfig', '', this.rtc.GetConnection())
	}
});

/*
 * Example commands:
 * webRTCSendCommand('reboot', '', rtc.GetConnection())              // reboot player
 * webRTCSendCommand('restart', '', rtc.GetConnection())             // restart 'rationale' service on player
 * webRTCSendCommand('reload', '', rtc.GetConnection())              // reload page on player
 * webRTCSendCommand('>>', '', rtc.GetConnection())                  // find forward in playlist
 * webRTCSendCommand('<<', '', rtc.GetConnection())                  // find backward in playlist
 * webRTCSendCommand('||', '', rtc.GetConnection())                  // pause
 * webRTCSendCommand('>', '', rtc.GetConnection())                   // play
 * webRTCSendCommand('select', 3, rtc.GetConnection())               // select item in playlist
 * webRTCSendCommand('loadConfig', '', rtc.GetConnection())          // load config from player
 * webRTCSendCommand('resetConfig', '', rtc.GetConnection())         // reset localstorage config on player and restart
 *                                                                   // (player is configured from default local config.json file)
 * webRTCSendCommand('saveConfig', localconfig, rtc.GetConnection()) // Save local preconfigured config data to player and restart
 *
 */
