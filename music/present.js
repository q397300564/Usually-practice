function Present(node) {
    this.$box = node;
    this.init();
    this._bind();
}

Present.prototype = {
    init: function () {
        
        this.$progressbar = this.$box.find('.progressbar'); // 进度条节点
        this.Audio = document.getElementById('audio'); // DOM 节点的 音频

        this.$startNode = $('.progressTime .startTime'); 
        this.$endNode = $('.progressTime .endTime');

        this._currentTime;
        this._duration;
    },
    _bind: function () {
        let _this = this;
    
        this.Audio.addEventListener('timeupdate', function(e){
            _this._self_currentTime();

            _this.getPresent(this.currentTime, this.duration);

            _this.startTime(this.currentTime);

            _this.endTime(this.duration - this.currentTime);

        }); // 当目前的播放位置已更改时触发。 获取到 currentTime
        
        this.Audio.addEventListener('canplay', function(e){
            _this._self_duration();
        }); // 监听当浏览器可以开始播放音频/视频时触发。 获取到 duration

        // 进度条的控制
        this.$box[0].addEventListener('mousedown', function (e) {
            
            let X = e.clientX; // 鼠标位置
            let targetLeft = $(this).offset().left; // 获取元素当前坐标
            // console.log(targetLeft);
            let percentage = (X - targetLeft) / _this.$box.width(); // 进度条的长度 按比例换算长度
            // console.log(percentage);
            //  audio位置设置
            _this.Audio.currentTime = _this.Audio.duration * percentage;
            // console.log( X );
            // console.log( targetLeft );
            // console.log( percentage );
            // console.log(_this.Audio.currentTime);
            // console.log(_this.Audio.duration);   
            _this.getPresent(_this.Audio.currentTime,_this.Audio.duration);
        });
    },
    _self_currentTime: function (e) {
        this._currentTime = parseInt(this.Audio.currentTime);
    },
    _self_duration: function (e) {
        this._duration = parseInt(this.Audio.duration);
    },
    getPresent: function (a,b) {
        let scalePresent = (a / b) || this.Audio.currentTime / this.Audio.duration; //比例    currentTime 是获取当前位置  duration 是返回音频长度
        let pregressbarWidth = parseInt(scalePresent * this.$box.width()); // 进度条的宽度
        // console.log(scalePresent);
        // console.log(this.$box.width());
        // console.log(pregressbarWidth);
        this.$progressbar.css({
            'width': pregressbarWidth + 'px'
        });
    },
    // 把秒转换成 00:00 的形式
    sec_to_time: function(data){
        let s = parseInt(data, 10);
        let t;
        if( s > -1){
            let min = Math.floor(s / 60);
            let sec = s % 60;

            if(min < 10){
                t = '0' + min + ':' ;
            } else {
                t = min + ':' ;
            }

            if( sec < 10 ){
                t += '0' + sec ;
            }else {
                t += sec ;
            }
        }
        return t;
    },
    //开始时间与结束时间
    startTime: function(s){
        
        let  start = this.sec_to_time(s);
        this.$startNode.text(start);
        // console.log(start);
    },
    endTime: function(s){
        
        let end = this.sec_to_time(s);
        // console.log(end);
        this.$endNode.text(end);
    }
}

 