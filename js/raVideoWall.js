function raVideoWall(video, config){

    // stats.js init
    var statsEnable = config.wallStats ? config.wallStats : false;
    var players ={};
    players.count = config.wallNumOfPlayers ? config.wallNumOfPlayers : 1;
    players.width = config.width ? config.width : 640;
    players.height = config.height ? config.height :480;
    players.splitBy = config.wallSplitBy ? config.wallSplitBy : 1;  // split vertically by nunber of rows, "0" - if don't need to split 

    players.screenx = players.count*players.width;
    players.screeny = players.height;
    if (players.splitBy !== 0) {
      players.screenx = players.screenx / 2;
      players.screeny = players.screeny * 2;
    }

    if (statsEnable) {
            var stats = new Stats();
            stats.setMode(0); // 0: fps, 1: ms

            // align top-left
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';

            document.body.appendChild( stats.domElement );
    }

    // create an new instance of a pixi stage
    var stage = new PIXI.Stage(0); // 0 - black background

    // create a renderer instance
    var renderer = PIXI.autoDetectRenderer(players.screenx /*window.innerWidth */, players.screeny /*window.innerHeight*/);

    // add the renderer's view element to the DOM
    document.body.appendChild(renderer.view);

    requestAnimFrame(animate);
    // create a video texture from a path
    video.width = players.width;
    video.height = players.height;
    var texture = PIXI.VideoTexture.textureFromVideo( video, PIXI.scaleModes.LINEAR /* scaleMode */);

    var sprites = [];
    
    for (var i=0; i < players.count; i++){
    sprites[i] = new PIXI.Sprite(texture); // create a new Sprites using the video texture (yes it's that easy)
    sprites[i].anchor.x = 0; // center the sprites anchor point
    sprites[i].anchor.y = 0;
    sprites[i].width = players.width;
    sprites[i].height = players.height;
    if (players.splitBy === 0) { 
        sprites[i].position.x = players.width*i;
        sprites[i].position.y = 0;
    }
    else {
        if (i < players.splitBy) {
            sprites[i].position.x = players.width*i;
        sprites[i].position.y = 0;
            }
            else {
            sprites[i].position.x = players.width*(i-players.splitBy) ;
            sprites[i].position.y = players.height;
            }
        }
        stage.addChild(sprites[i]);
    } 
    // console.log(sprites);

    function animate() {
        requestAnimFrame(animate);
                statsEnable && stats.begin();
        renderer.render(stage);
        statsEnable && stats.end();
    }
}