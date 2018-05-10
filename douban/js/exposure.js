function exposure($target, callback, $wrap) {
    this.$target = $target;
    this.callback = callback;
    this.$wrap = $wrap;
    // console.log(this.$wrap);
    this.bindEvent();
    this.check();
}

exposure.prototype = {
    // init: function () {

    // },
    bindEvent: function () {
        var _this = this;
        this.$wrap.on('scroll', function () {
            if (_this.clock) {
                clearTimeout(_this.clock);
            }
            _this.clock = setTimeout(function () {
                _this.check();
            }, 300);
        });
    },
    check: function () {
        if (this.isShow(this.$target)) {
            this.callback(this.$target);
        }
        return false;
    },
    isShow: function ($node) {
        var wrapHeigth = this.$wrap.height(); // 可是区域高度
        var wrapScrollTop = this.$wrap.scrollTop(); // 滑动高度
        var $targetOffset = $node[0].offsetTop; //节点位置
        var $targetHeight = $node.height(); // 节点高度
        // console.log(wrapHeigth + '/' + wrapScrollTop +'/'+ $targetOffset+'/' +$targetHeight)
        if ( $targetOffset < wrapScrollTop + wrapHeigth && wrapScrollTop < $targetOffset + $targetHeight) {
            // console.log($node);
            return true;
        }
        return false;
    }
}

var Exposure_img = {
    init: function ($target, callback) {
        
        var node = $target.find('.ct img');
        $.each(node , function (index, element) {
            new exposure($(element), callback, $target);
        });
    }
}