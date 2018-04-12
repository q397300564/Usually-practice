function voice(node){
    this.$box = node;
    this.init();
    this._bind();
    this.getvoice();
}

voice.prototype = {
    init: function(){
        this.$Audio = $('audio'); // 音频
        this.Audio = this.$Audio[0]; // DOM 节点的 音频    
        this.$dot = this.$box.find('.dot'); // 圆点
        this.$basebar = this.$box.find('.basebar-wrap'); // 声音的容积
        this.$progressbar = this.$box.find('.progressbar-wrap'); // 声音的大小

        this.duration = 1; // 音频总长度
        this.Audio.volume = 0.5 // 默认音频大小
    },
    _bind: function(){
        let _this = this;
        this.$basebar.on('mousedown', function(e){
            let X = e.clientX; // 鼠标位置 x轴
            let targetLeft = $(this).offset().left; // 获取当前元素距离左边的位置

            let percentage = (X - targetLeft) / 80; //音量调大的长度
            
            _this.Audio.volume = _this.duration * percentage;
            _this.getvoice();
            
        });
    },
    getvoice: function(){
        let _this = this;
        let a = this.Audio.volume;
        let voiceWidth = a * this.$basebar.width() / this.duration ;
        let scale = voiceWidth / this.$basebar.width() * 100;
        console.log(voiceWidth);
        
        this.$progressbar.css({
            'width': scale + '%'
        });
    }
}



