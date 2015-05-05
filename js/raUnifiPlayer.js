function RaUnifiPlayer(vid, videos) {
    this.video = vid;
    this.currentVid = 0;
    this.nextVid = 0;

    this.video.addEventListener('ended', function() {
        this.nextVid = (this.currentVid + 1) % videos.length;
        this.play(this.nextVid);
    }.bind(this));

    this.select = function(index) {
        if (index < videos.length && index >= 0) {
            this.video.src = videos[index];
            this.currentVid = index;
            console.log("played video: ", videos[index])
            this.video.pause();
            this.video.load();
            this.video.play();
            return 0
        }
        else {
            return -1
        }
    };

    this.forward = function(index) {
        if (this.currentVid < videos.length - 1) {
            this.select(this.currentVid + 1);
        } else {
            this.select(0);
        }
    };

    this.backward = function(index) {
        if (this.currentVid > 0) {
            this.select(this.currentVid - 1);
        } else {
            this.select(videos.length - 1);
        }
    };

    this.pause = function(index) {
        this.video.pause();
    };

    this.play = function(index) {
        this.video.play();
    };

    return this;
}
