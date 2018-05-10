// top 250 
function Top250($node) {
    this.$target = $node;
    this.init();
    this.bindEvent();
    this.getData();
    new Gotop(this.$target);
}

Top250.prototype = {
    init: function () {
        this.$ct = this.$target.find('.ct');
        this.$ct.empty(); // 清空数据;
        this.$loadings = this.$target.find('.loadings');

        this.startNum = 0; // 开始数
        this.oneGetNum = 10; // 一次获取数量

        this.isEnd = false; //是否结束（没有）
    },
    bindEvent: function () {
        var _this = this;
        this.$target.on('scroll', function (e) {
            if (_this.clock) {
                clearTimeout(_this.clock);
            }
            _this.clock = setTimeout(function () {
                // 是否到底 且 是否结束
                if (!_this.inTheEnd() && !_this.isEnd) {
                    _this.getData();
                }
            }, 300);
        });
    },
    getData: function () {
        var _this = this;
        //判断是否结束
        if (this.isEnd) {
            this.$loadings.text('我是有底线的哦...');
            return;
        }
        this.$loadings.css({
            'display': 'block'
        });
        this.$loadings.text('正在获取数据..');

        $.ajax({
            url: 'https://api.douban.com/v2/movie/top250',
            method: 'get',
            dataType: 'jsonp',
            jsonp: 'callback',
            timeout: 3000,
            data: {
                start: _this.startNum,
                count: _this.oneGetNum
            },
            success: function (res) {
                if ( res && res.total !== 0) {
                    _this.startNum += _this.oneGetNum;
                    _this.assemblyHtml(res.subjects);
                }else {
                    _this.isEnd = true;
                }
            },
            error: function (err) {
                alert(err.statusText);
            },
            complete: function () {
                _this.$loadings.css({
                    'display': 'none'
                });
            }
        });
    },
    // 拼装html
    assemblyHtml: function (da) {
        var data = da;
        var _this = this;

        data.forEach(function (element, index, arr) {
            var html =
                '<div class="movie-item">\
                <a href="javascript" class="movie-item-wrap">\
                    <div class="movie-img">\
                        <img src="../img/white.png" alt="" data-img="">\
                    </div>\
                    <div class="movie-info">\
                        <h2 class="movie-info-title"></h2>\
                        <h3 class="movie-info-subtitle"></h3>\
                        <div class="movie-info-content"><span class="movie-info-grade"></span>/<span class="movie-info-collect"></span>收藏</div>\
                        <div class="movie-info-content"><span class="movie-info-time"></span><span class="movie-info-genres"></span></div>\
                        <div class="movie-info-content">导演:<span class="movie-info-direct"></span></div>\
                        <div class="movie-info-content">主演:<span class="movie-info-protagonist"></span></div>\
                    </div>\
                </a>\
            </div>';

            var $item = $(html);
            $item.find('a').attr({
                'href': element.alt,
                'data-id': element.id
            });
            $item.find('img').attr({
                'data-img': element.images.small,
                'alt': element.title + '图片',
                'title': element.title
            });
            $item.find('h2').attr('title', element.title);
            $item.find('h2').text(element.title);;

            $item.find('h3').attr('title', element.original_title);
            $item.find('h3').text(element.original_title);

            $item.find('.movie-info-grade').text(element.rating.average);

            $item.find('.movie-info-collect').attr('title', element.collect_count);

            $item.find('.movie-info-time').text(element.year);

            $item.find('.movie-info-genres').text(function () {
                return element.genres.join('/');
            });

            $item.find('.movie-info-direct').text(element.directors[0].name);
            $item.find('.movie-info-direct').attr({
                'alt': element.directors[0].alt,
                'data-id': element.directors[0].id
            });

            $item.find('.movie-info-protagonist').text(function () {
                var arr = [];
                $.each(element.casts, function (idx, ele) {
                    arr.push(element.casts[idx].name);
                });
                return arr.join('/');
            });

            _this.$ct.append($item);
        });

        setTimeout(function () {
            _this.imgLoad();
        }, 300);
    },
    inTheEnd: function () {
        if (this.$target.height() + this.$target.scrollTop() + 10 <= this.$ct.height()) {
            return true;
        }
        return false;
    },
    // 图片加载
    imgLoad: function () {
        Exposure_img.init(this.$target, function ($target) {
            if (!imgIsLoad($target)) {
                loadImg($target);
            }

            function imgIsLoad($ta) {
                // console.log($ta.attr('data-img'));
                return $ta.attr('src') === $ta.attr('data-img');
            }

            function loadImg($ta) {
                $ta.attr('src', $ta.attr('data-img'));
            }
        });
    }
}
// top 250


// 北美排行榜
function Beimei($target) {
    this.$target = $target;
    this.init();
    this.bindEvent();
    this.getData();
    // new Gotop();
}

Beimei.prototype = {
    // 公共节点
    init: function () {
        this.$headH3 = this.$target.find('.beimei-header>h3');
        this.$headH4 = this.$target.find('.beimei-header>h4');
        this.$ct = this.$target.find('.ct');
        this.$headH3.empty(); // 清空数据;
        this.$headH4.empty(); // 清空数据;
        this.$ct.empty(); // 清空数据;
        this.$loadings = this.$target.find('.loadings');

        this.isEnd = false; //是否结束（没有）
    },
    // 事件
    bindEvent: function () {
        // var _this = this;
        // // 在北美这个节点上绑定一个滑动事件
        // this.$target.on('scroll', function (e) {
        //     if (_this.clock) {
        //         clearTimeout(_this.clock);
        //     }
        //     _this.clock = setTimeout(function () {
        //         // 是否到底 且 是否结束
        //         if (!_this.inTheEnd() && !_this.isEnd) {
        //             _this.getData();
        //         }
        //     }, 300);
        // });
    },
    // 获取数据
    getData: function () {
        var _this = this;
        // 判断是否还有数据
        if (this.isEnd) {
            this.$loadings.text('我是有底线的哦...');
            return;
        }
        // 如果有数据
        this.$loadings.css({
            'display': 'block'
        });
        this.$loadings.text('正在获取数据..');

        $.ajax({
            url: 'https://api.douban.com/v2/movie/us_box',
            method: 'get',
            dataType: 'jsonp',
            jsonp: 'callback',
            timeout: 3000,
            success: function (res) {
                if (res) {
                    _this.$headH3.text(res.title);
                    _this.$headH4.text(res.date);

                    _this.assemblyHtml(res.subjects);
                }
                if (res.total <= _this.startNum) {
                    _this.isEnd = true;
                }
            },
            error: function (err) {
                alert(err.statusText);
            },
            complete: function () {
                _this.$loadings.css({
                    'display': 'none'
                });
            }
        });
    },
    // 拼装html
    assemblyHtml: function (da) {
        var data = da;
        var _this = this;

        data.forEach(function (ele, index, arr) {
            var element = ele.subject;
            var html =
                '<div class="movie-item">\
                <a href="javascript" class="movie-item-wrap">\
                    <div class="movie-img">\
                        <img src="../img/white.png" alt="" data-img="">\
                    </div>\
                    <div class="movie-info">\
                        <h2 class="movie-info-title"></h2>\
                        <h3 class="movie-info-subtitle"></h3>\
                        <div class="movie-info-content"><span class="movie-info-grade"></span>/<span class="movie-info-collect"></span>收藏</div>\
                        <div class="movie-info-content"><span class="movie-info-time"></span><span class="movie-info-genres"></span></div>\
                        <div class="movie-info-content">导演:<span class="movie-info-direct"></span></div>\
                        <div class="movie-info-content">主演:<span class="movie-info-protagonist"></span></div>\
                    </div>\
                </a>\
            </div>';

            var $item = $(html);
            $item.find('a').attr({
                'href': element.alt,
                'data-id': element.id
            });
            $item.find('img').attr({
                'data-img': element.images.small,
                'alt': element.title + '图片',
                'title': element.title
            });
            $item.find('h2').attr('title', element.title);
            $item.find('h2').text(element.title);;

            $item.find('h3').attr('title', element.original_title);
            $item.find('h3').text(element.original_title);

            $item.find('.movie-info-grade').text(element.rating.average);

            $item.find('.movie-info-collect').attr('title', element.collect_count);

            $item.find('.movie-info-time').text(element.year);

            $item.find('.movie-info-genres').text(function () {
                return element.genres.join('/');
            });

            $item.find('.movie-info-direct').text(element.directors[0].name);
            $item.find('.movie-info-direct').attr({
                'alt': element.directors[0].alt,
                'data-id': element.directors[0].id
            });

            $item.find('.movie-info-protagonist').text(function () {
                var arr = [];
                $.each(element.casts, function (idx, ele) {
                    arr.push(element.casts[idx].name);
                });
                return arr.join('/');
            });

            _this.$ct.append($item);
        });

        setTimeout(function () {
            _this.imgLoad();
        }, 300);
    },
    // 图片加载
    imgLoad: function () {
        Exposure_img.init(this.$target, function ($target) {
            if (!imgIsLoad($target)) {
                loadImg($target);
            }

            function imgIsLoad($ta) {
                // console.log($ta.attr('data-img'));
                return $ta.attr('src') === $ta.attr('data-img');
            }

            function loadImg($ta) {
                $ta.attr('src', $ta.attr('data-img'));
            }
        });
    }
}
// 北美排行榜

// 搜索
function Search($target) {
    this.$target = $target;
    this.init();
    this.bindEvent();
    new Gotop(this.$target);
}

Search.prototype = {
    init: function () {
        this.$ct = this.$target.find('.ct');
        this.$ct.empty();// 清空里面信息
        this.$searchWrap = this.$target.find('.search-header');
        this.$goods = this.$target.find('.input-wrap .goods');
        this.$goods.val('');
        this.$listdata = this.$target.find('.input-wrap .listData');
        this.$loadings = this.$target.find('.loadings');

        // datalist 是模拟数据
        this.datalist = ['男裤', '男鞋', '男士外套', '男士内衣', '男袜', '男士洗面奶', '男士皮带']
        this.base = '<a href="javascript">*</a>';

        this.searchVal = ''; // 搜索值
        this.pageNum = 0; //页数
        this.pageCount = 20;//每一页条数
        this.isEnd = false; // 默认没有结束
    },
    bindEvent: function () {
        var _this = this;
        // 输入搜索数据，出发input事件
        this.$goods.on('input', function (e) {
            // 有值时
            _this.$ct.empty();
            if (_this.$goods.val()) {
                // 有值的时候查询
                _this.updata($(this).val());
            } else {
                _this.$listdata.css({
                    'display': 'none'
                });
            }
        });
        this.$goods.on('change', function (e) {
            if (_this.$goods.val()) {
                _this.getData(_this.$goods.val());
                
                _this.$listdata.css({
                    'display': 'none'
                });
            }
            
        });
        // 触摸开始时
        this.$listdata.on('touchstart', 'a', function (e) {
            e.preventDefault();
            $(this).addClass('hover');
            var data = $(e.target).text();
            _this.$goods.val(data);
        });
        // 触摸结束时
        this.$listdata.on('touchend', 'a', function (e) {
            e.preventDefault();
            $(this).removeClass('hover');
            _this.$listdata.css({
                'display': 'none'
            });
        });

        this.$target.on('scroll', function (e) {
            if (_this.clock) {
                clearTimeout(_this.clock);
            }
            _this.clock = setTimeout(function () {
                // 是否到底 且 是否结束
                if (!_this.inTheEnd() && !_this.isEnd) {
                    _this.getData(_this.searchVal);
                }
            }, 300);

            if (_this.$target.scrollTop() > 0) {
                
                _this.$searchWrap.css({
                    'position': 'fixed',
                    'top': '10px',
                    'left': '0',
                    'z-index': '99',
                    'width': '100%'
                });
            } else {
                _this.$searchWrap.css({
                    'position': 'relative',
                    'top': '0',
                    'left': '0',
                });
            }
        });


    },
    // 查询输入数据
    updata: function (data) {
        var _this = this;
        var arr = []; // 放查询到的数据的
        // 这里是模拟的数据循环
        $.each(this.datalist, function (idx, item) {
            if (item.indexOf(data) !== -1) {
                arr.push(item);
            }
        });

        // 拿到数据后放到页面上
        if (arr.length !== 0) {
            var len = arr.length;
            var htmlStr = '';

            for (var i = 0; i < len; i++) {
                var temp = _this.base;
                temp = temp.replace(/\*/, arr[i]);
                htmlStr += temp;
            }

            _this.$listdata.html(htmlStr);

            _this.$listdata.css({
                'display': 'block'
            });

        } else {
            _this.$listdata.css({
                'display': 'none'
            });
        }
    },
    getData: function (data) {
        var _this = this;
        this.searchVal = data;
        // 判断是否还有数据
        if (this.isEnd) {
            this.$loadings.text('我是有底线的哦...');
            return;
        }
        // 如果有数据
        this.$loadings.css({
            'display': 'block'
        });
        this.$loadings.text('正在获取电影数据...');

        $.ajax({
            url: 'https://api.douban.com/v2/movie/search',
            method: 'get',
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {
                q: _this.searchVal,
                start: _this.pageNum,
                count: _this.pageCount
            },
            success: function (res) {
                _this.pageNum++; // 成功自增一页
                if (res && res.total !== 0) {
                    console.log('aaa');
                    _this.assemblyHtml(res.subjects);
                } else {
                    _this.isEnd = true;
                    return false;
                }
            },
            error: function (err) {
                alert(err.statusText);
            },
            complete: function () {
                _this.$loadings.css({
                    'display': 'none'
                });
            }

        });
    },
    assemblyHtml: function (da) {
        var data = da;
        var _this = this;

        data.forEach(function (element, index, arr) {
            var html =
                '<div class="movie-item">\
                <a href="javascript" class="movie-item-wrap">\
                    <div class="movie-img">\
                        <img src="../img/white.png" alt="" data-img="">\
                    </div>\
                    <div class="movie-info">\
                        <h2 class="movie-info-title"></h2>\
                        <h3 class="movie-info-subtitle"></h3>\
                        <div class="movie-info-content"><span class="movie-info-grade"></span>/<span class="movie-info-collect"></span>收藏</div>\
                        <div class="movie-info-content"><span class="movie-info-time"></span><span class="movie-info-genres"></span></div>\
                        <div class="movie-info-content">导演:<span class="movie-info-direct"></span></div>\
                        <div class="movie-info-content">主演:<span class="movie-info-protagonist"></span></div>\
                    </div>\
                </a>\
            </div>';

            var $item = $(html);
            $item.find('a').attr({
                'href': element.alt,
                'data-id': element.id
            });
            $item.find('img').attr({
                'data-img': element.images.small,
                'alt': element.title + '图片',
                'title': element.title
            });
            $item.find('h2').attr('title', element.title);
            $item.find('h2').text(element.title);;

            $item.find('h3').attr('title', element.original_title);
            $item.find('h3').text(element.original_title);

            $item.find('.movie-info-grade').text(element.rating.average);

            $item.find('.movie-info-collect').attr('title', element.collect_count);

            $item.find('.movie-info-time').text(element.year);

            $item.find('.movie-info-genres').text(function () {
                return element.genres.join('/');
            });

            $item.find('.movie-info-direct').text(element.directors.name);
            $item.find('.movie-info-direct').attr({
                'alt': element.directors.alt,
                'data-id': element.directors.id
            });

            $item.find('.movie-info-protagonist').text(function () {
                var arr = [];
                $.each(element.casts, function (idx, ele) {
                    arr.push(element.casts[idx].name);
                });
                return arr.join('/');
            });

            _this.$ct.append($item);
        });

        setTimeout(function () {
            _this.imgLoad();
        }, 300);
    },
    // 图片加载
    imgLoad: function () {
        Exposure_img.init(this.$target, function ($target) {
            if (!imgIsLoad($target)) {
                loadImg($target);
            }

            function imgIsLoad($ta) {
                // console.log($ta.attr('data-img'));
                return $ta.attr('src') === $ta.attr('data-img');
            }

            function loadImg($ta) {
                $ta.attr('src', $ta.attr('data-img'));
            }
        });
    },
    // 是不是到底 
    inTheEnd: function () {
        if (this.$target.height() + this.$target.scrollTop() + 10 <= this.$ct.height()) {
            return true;
        }
        return false;
    }
}
// 搜索





// tab切换
function movieApp() {
    this.init();
    this.bindEvent();
    new Top250($('.wrap-250Top'));
}

movieApp.prototype = {
    init: function () {
        this.$tabWrap = $('#footer'); // footer节点
        this.$tab = $('#footer > div'); // tab节点
        this.$content = $('#main > section'); // 内容节点 
    },
    bindEvent: function () {
        var _this = this;
        this.$tabWrap.on('click', 'div.tab-btns', function (e) {
            _this.tabToggle($(this));
            if ($(this).index() === 0) {
                new Top250($('.wrap-250Top'));
            } else if ($(this).index() === 1) {
                new Beimei($('.wrap-beimei'));
            } else if ($(this).index() === 2) {
                new Search($('.wrap-search'));
            }
        });
    },
    // tab切换
    tabToggle: function ($node) {
        var $target = $node; // 节点
        var $index = $target.index(); // 索引

        this.$tab.removeClass('active');
        $target.addClass('active');

        this.$content.removeClass('active');
        this.$content.eq($index).addClass('active');
    }
}

var app = new movieApp();