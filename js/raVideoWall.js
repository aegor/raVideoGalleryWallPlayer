function raVideoWall(video, config) {

	var players = {};
	var mt = config.mediaType[config.mediaTypeSelected];
	var effect = mt.effect[mt.effectSelected];

	var params = effect.split('-');
	var ep1 = parseInt(params[1]);
	var ep2 = parseInt(params[2]);
	delete params;

	var resolution = config.resolutions[config.resolutionSelected];
	players.width = parseInt(resolution.width) ? parseInt(resolution.width) : 640;
	players.height = parseInt(resolution.height) ? parseInt(resolution.height) : 480;
	delete resolution;

	players.count = ep1 * ep2 ? ep1 * ep2 :1;
	players.splitBy = ep2 ? players.count / ep2 : 0;
	var statsEnable = config.wallStats ? config.wallStats : false;

	var isCanvas = false;
/*
	players.count = config.wallNumOfPlayers ? config.wallNumOfPlayers : 1;
	players.width = config.width ? config.width : 640;
	players.height = config.height ? config.height : 480;
	players.splitBy = config.wallSplitBy ? config.wallSplitBy : 1;  // split vertically by nunber of rows, "0" - if don't need to split
*/

	players.screenx = players.count * players.width;
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

		document.body.appendChild(stats.domElement);
	}

	// create an new instance of a pixi stage
	var stage = new PIXI.Container(0); // 0 - black background

	// create a renderer instance
	var renderer = new PIXI.WebGLRenderer(players.screenx /*window.innerWidth */, players.screeny /*window.innerHeight*/);

	// add the renderer's view element to the DOM

	document.body.appendChild(renderer.view);

	requestAnimationFrame(animate);

	// create a video texture from a path
	if (video.nodeName === "VIDEO") {
		video.width = players.width;
		video.height = players.height;
		var texture = PIXI.Texture.fromVideo(video, PIXI.LINEAR /* scaleMode */);
	}
	else if (video.nodeName === "CANVAS") {
		isCanvas = true;
		//var baseTexture = new PIXI.BaseTexture(video);
		var texture = PIXI.Texture.fromCanvas(video /*baseTexture*/);
		texture.requiresUpdate = false;
	}
	else {
		console.log("raVideoWall: unsupported node name for rendering: ", video.nodeName)
	}
	var sprites = [];

	for (var i = 0; i < players.count; i++) {
		sprites[i] = new PIXI.Sprite(texture); // create a new Sprites using the video texture (yes it's that easy)
		sprites[i].anchor.x = 0; // center the sprites anchor point
		sprites[i].anchor.y = 0;
		sprites[i].width = players.width;
		sprites[i].height = players.height;
		if (players.splitBy === 0) {
			sprites[i].position.x = players.width * i;
			sprites[i].position.y = 0;
		}
		else {
			if (i < players.splitBy) {
				sprites[i].position.x = players.width * i;
				sprites[i].position.y = 0;
			}
			else {
				sprites[i].position.x = players.width * (i - players.splitBy);
				sprites[i].position.y = players.height;
			}
		}
		stage.addChild(sprites[i]);
	}
	// console.log(sprites);

	function animate() {
		requestAnimationFrame(animate);
		statsEnable && stats.begin();
		if (isCanvas) {
			for (var i in sprites) {
				//debugger;
				sprites[i].texture.update()
			}
		}
		renderer.render(stage);
		statsEnable && stats.end();
	}
}