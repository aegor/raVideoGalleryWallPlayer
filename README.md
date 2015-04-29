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
        isWall: false,
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
