    Config format:
    
```
{
        mediaAssets: 'assets',

        width: 1280,
        height: 720,
        /*
        * mode.mediaType is one of [video, slides],
        * mode.effect depend on plugins
        * for example:
        * {mediaType: 'video', effect: 'wall'}
        * {mediaType: 'slides', effect: 'kenburn'}
        */
        mode: {mediaType: 'video', effect: 'wall'}, 
        //mode: {mediaType: 'video', effect: 'single'},
        //mode: {mediaType: 'slides', effect: 'kenburn'}, 
        wallNumOfPlayers: 4,
        wallStats: true,
        wallSplitBy: 2
};
```
    Webrtc config format:
```
{
        id: 'rationale-pl7',
        controllerId: 'rationale-pl7-controller',
        server: 'localhost',
        serverPort: 9000,
        serverPath: '/rationale'
}
```
webRTC Message format:

```
var message = {
    credentials: {
        user: "egor",
        password: "1234"
    },
    /*
     * Command semantic:
     * 
     * reboot - reboot player
     * restart - restart rationale service
     * reload - reload page
     * >> - one item forward
     * << - one item backward
     * select - select item in playlist args = {item: 1}
     * pause
     * play
     * load - load new config args = config
     * save - save config in local storage
     * 
     */
    command: "",
    args: {}
}
```
Full list of available RPC commands:
```
    
    Example commands:
    
    webRTCSendCommand('reboot', '', rtc.GetConnection())              // reboot player
    
    webRTCSendCommand('restart', '', rtc.GetConnection())             // restart 'rationale' service on player
    
    webRTCSendCommand('reload', '', rtc.GetConnection())              // reload page on player
    
    webRTCSendCommand('>>', '', rtc.GetConnection())                  // find forward in playlist
    
    webRTCSendCommand('<<', '', rtc.GetConnection())                  // find backward in playlist
    
    webRTCSendCommand('||', '', rtc.GetConnection())                  // pause
    
    webRTCSendCommand('>', '', rtc.GetConnection())                   // play
    
    webRTCSendCommand('select', 3, rtc.GetConnection())               // select item in playlist
    
    webRTCSendCommand('loadConfig', '', rtc.GetConnection())          // load config from player
    
    webRTCSendCommand('resetConfig', '', rtc.GetConnection())         // reset localstorage config on player and restart 
    (player is configured from default local config.json file)
    
    webRTCSendCommand('saveConfig', localconfig, rtc.GetConnection()) // Save local preconfigured config data to player and restart
```