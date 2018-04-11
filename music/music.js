function app(node) {
    this.$box = node;
    this.init();
    this._bind();
    this.getChannel();
}

app.prototype = {
    init: function () {
        let _this = this;
        this.$play = this.$box.find('#play_btn'); // 开始节点
        this.$rotating = this.$box.find('#rotating_btn'); // 换频节点
        this.$next = this.$box.find('#next_btn'); // 下一曲节点

        this.$myAudio = this.$box.find('audio'); // audio 节点 jquery对象
        this.Audio = this.$myAudio[0]; // 把jquery对象转换成DOM对象。
        this.$musicName = this.$box.find('.content .content-b .music-name'); // 音乐名
        this.$musicer = this.$box.find('.content .content-b .musicer'); // 作者名
        this.$record = this.$box.find('.content .record'); // 唱片节点
        this.$background = this.$box.find('.background'); // 背景图节点

        this.$lyricWrap = this.$box.find('.background .lyric-box');
        this.$musicLyric = this.$box.find('.background .music-lyric');// 歌词框节点

        this.$basebar = this.$box.find('.basebar'); // 进度条节点

        // icon 节点
        this.$icon_fx = this.$box.find('.music-icon .icon-fenxiang'); // 分享
        this.$icon_xx = this.$box.find('.music-icon .icon-star-copy'); //星星
        this.$icon_xi = this.$box.find('.music-icon .icon-xihuan'); // 喜欢

        this.$icon_xh = this.$box.find('.lyric-music .icon-xunhuan101'); // 循环
        this.$icon_lyric = this.$box.find('.lyric-music .icon-caidan'); // 歌词

        this.$channels; //频道数据
        this.$channelName; // 频道名字
        this.$channelId; // 频道id
        this.$lyricArr; // 歌词数组

    },
    _bind: function () {
        let _this = this;
        // 播放、暂停

        this.$play.on('click', function (e) {
            if (_this.Audio.paused) {
                _this._play();

            } else {
                _this._pause();

            }
        });
        // 频道切换
        this.$rotating.on('click', function (e) {
            _this.getChannel();
        });
        // 下一曲
        this.$next.on('click', function (e) {
            _this.getmusic();
        });
        // 进度条的控制
        this.$basebar.on('mousedown', function(e){
            let X = e.clientX; // 鼠标位置
            let targetLeft = $(this).offset().left; // 获取元素当前坐标
            console.log(targetLeft);
            let percentage = ( X - targetLeft ) / 400; // 进度条的长度 按比例换算长度
            console.log(percentage);
            //  audio位置设置
            _this.Audio.currentTime = _this.Audio.duration * percentage;

        }); 
        // icon 点击 动作
            // 星星
        this.$icon_xx.on('click', function(e){
            $(this).toggleClass('hover');
        });
            // 喜欢
        this.$icon_xi.on('click', function(e){
            $(this).toggleClass('hover');
        });
            // 歌词
        this.$icon_lyric.on('click', function(e){
            _this.$lyricWrap.toggle(0.1);
        });
            // 单曲循环
        this.$icon_xh.on('click', function(e){
            $(this).toggleClass('hover');
    
            _this.Audio.onended = function(){
                _this.Audio.load();
                _this.Audio.play();
            }
            
        });
    },
    _play: function () {
        let _this = this;
        this.Audio.play();
        this.$play.removeClass('icon-iconfontplay2').addClass('icon-iconfontstop');
    },
    _pause: function () {
        var _this = this;
        this.Audio.pause();
        this.$play.removeClass('icon-iconfontstop').addClass('icon-iconfontplay2');
    },
    // 获取频道信息
    getChannel: function () {
        let _this = this;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getChannels.php',
            dataType: 'json',
            Method: 'get',
            success: function (res) {
                _this.channelHTML(res);
            },
            error: function (err) {
                console.log('获取信息失败');
            }
        });
    },
    // 频道信息拼装
    channelHTML: function (data) {
        let channels = data.channels;
        let mun = Math.floor(Math.random() * channels.length); // 在一个数组中随机选一个数
        this.$channels = channels;
        this.$channelName = channels[mun].name;
        this.$channelId = channels[mun].channel_id;

        this.$record.text(this.$channelName);
        this.$record.attr('title', this.$channelName);
        this.$record.attr('data-id', this.$channelId);

        // 获取歌曲
        this.getmusic();
    },
    // 获取音乐
    getmusic: function (id) {
        let _this = this;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getSong.php',
            dataType: 'json',
            Method: 'get',
            data: {
                'channel': this.$channelId
            },
            success: function (res) {
                _this.musicHTML(res);
            },
            error: function (err) {
                console.log('获取音乐失败');
            }
        });
    },
    // 拼装歌曲
    musicHTML: function (data) {
        let _this = this;
        let _song = data.song[0];
        let _sid = _song.sid;
        let _title = _song.title;
        let _picture = _song.picture;
        let _artist = _song.artist;
        let _url = _song.url;
        let _lrc = _song.lrc;

        this.$myAudio.attr('src', _url);
        this.$myAudio.attr('sid', _sid);

        this.$musicName.text(_title);
        this.$musicName.attr('title', _title);

        this.$musicer.text(_artist);
        this.$musicer.attr('title', _artist);

        this.$background.css({
            'background-image': 'url("' + _picture + '")',
            'background-repeat': 'no-repeat',
            'background-size': 'cover'
        });

        this._play(); // 播放
        this.getlyric(); // 获取歌词
    },
    // 获取歌词
    getlyric: function () {
        let _this = this;
        let _sid = this.$myAudio.attr('sid'); // 获取audio节点上的id
        let _name = this.$musicName.text(); // 获取歌名
        $.ajax({
            url: 'http://api.jirengu.com/fm/getLyric.php',
            dataType: 'json',
            Method: 'POST',
            data: {
                "sid": _sid,
                'name': _name
            },
            success: function (res) {
                _this.lyricHTML(res);

            },
            error: function (err) {
                console.log('获取歌词失败');
                setInterval(_this.present, 500); // 进度条
            }

        });
    },
    // 拼装歌词
    lyricHTML: function (data) {
        let _this = this;
        let lyr = data.lyric;
        let result = []; // 歌词存放处
        if (!!lyr) {
            this.$musicLyric.find('ul').empty(); // 清空歌词信息
            let line = lyr.split('\n'); // 歌词以空格为界分割成一个数组
            let timeReg = /\[\d{2}:\d{2}.\d{2}\]/g; // 时间的正则
            if (line.length !== 0) {
                for (let i in line) {
                    let time = line[i].match(timeReg); // 每组匹配时间 得到时间数组
                    // console.log(time);
                    if (!time) { continue }; // 如果没有时间就跳过这次循环 继续下一次
                    let value = line[i].replace(timeReg, ''); // 纯歌词
                    // console.log(value);
                    for (let j in time) { // 便利时间数组
                        let t = time[j].slice(1, -1).split(':'); //分解时间 时间格式为[00:00.00] 分钟和毫秒是 t[0], t[1]

                        let timeArr = parseInt(t[0], 10) * 60 + parseInt(t[1], 10); // 得到一个以秒为单位的时间

                        result.push([timeArr, value]);
                    }
                }
            }
        }
        // 时间排序
        result.sort(function (a, b) {
            return a[0] - b[0];
        });

        this.$lyricArr = result;
        // 渲染歌词
        this.renderLyric(result);
    },
    // 渲染歌词
    renderLyric: function (data) {
        let lyric = '';
        for (let i = 0; i < data.length; i++) {
            lyric += "<li data-time='" + data[i][0] + "'>" + data[i][1] + "</li>";
        }
        this.$musicLyric.find('ul').append(lyric);
        setInterval(this.showLyric, 300); // 如何展示歌词
        setInterval(this.present, 500); // 进度条
    },
    // 展示歌词
    showLyric: function () {
        let $lyricbox = $('.music-lyric ul');
        let $lyricNode = $('.music-lyric li'); // 获取li的节点 // 在 setInterval 中 作用域是全局的，要重新获取节点
        let _Audio = $('#app .content audio')[0]; // jquery节点要转换成 DOM 节点

        let pH = $lyricNode.eq(5).outerHeight() - 3; // 每行高度

        for (let i = 0; i < $lyricNode.length; i++) { //循环遍历歌词所有的li
            let curT = $lyricNode.eq(i).attr('data-time'); // 获取当前li存入的当前一排歌词的时间
            let nextT = $lyricNode.eq(i + 1).attr('data-time'); // 获取下一秒的时间
            let curTime = _Audio.currentTime; // 歌曲播放的位置（一秒记）

            if ((curTime > curT) && (curT < nextT)) {//当前时间在下一句时间和歌曲当前时间之间的时候 就渲染 并滚动
                $lyricNode.removeClass('active');
                $lyricNode.eq(i).addClass('active');
                $lyricbox.css('top', -pH * (i - 4));
            }
        }
    },
    // 进度条
    present: function () {
        let $progress = $('.progressbar');
        let _Audio = $('#app .content audio')[0]; // jquery节点要转换成 DOM 节点
        let len = _Audio.currentTime / _Audio.duration * 100; //进行了多长    currentTime 是获取当前位置  duration 是返回音频长度
        // console.log(len);
        $progress.css({
            width: len + '%'
        });
        //自动下一曲
        if (_Audio.currentTime == _Audio.duration) {
            // 清空进度条
            $progress.css({
                width: 0
            });
            // 获取歌曲
            app.getmusic();
        }
    }

};

var app = new app($('#app'));