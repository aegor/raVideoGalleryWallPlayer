function raUnifiPlayer(vid, videos) {
    this.video = vid;
    this.currentVid = 0;
    this.nextVid = 0;
    
    this.video.addEventListener('ended', function() {
        this.nextVid = (this.currentVid + 1) % videos.length;
        this.play(this.nextVid);
    }.bind(this));

    this.select = function(index) {
        this.video.src = videos[index];
        this.currentVid = index;
        //console.log("played video: ", videos[index])
        this.video.pause();
        this.video.load();
        this.video.play();
    };

    this.forward = function(index){
        if(this.currentVid < videos.length){
            this.select(this.currentVid+1);
        }
    };

    this.backward = function(index){
        if (this.currentVid > 0){
            this.select(this.currentVid-1);
        }
    };

    this.pause = function(index){
        this.video.pause();
    };

    this.play = function(index){
        this.video.play();
    };

    return this;
}
