//这个回到顶部是 Jquery 的方法来写的。
// function GoTop(ct) {
//     this.ct = ct || $('body');
//     this.target = this.createNode();
//     this.target.css({
//         position: 'fixed',
//         right: '100px',
//         bottom: '10px',
//         width: '50px',
//         height: '50px',
//         'background-color': '#ccc',
//         'font-size': '16px',
//         'text-align': 'center',
//         'font-weight': 'bold',
//         'line-height': '50px',
//         border: 'none',
//         color: '#fff',
//         cursor: 'pointer'
//     });
//     this.bindEvent();
// };

// GoTop.prototype = {
//     bindEvent: function () {
//         var $target = this.target;
//         var timer;
//         $target.on('click', function () {
//             $(window).scrollTop(0);
//         });

//         $(window).on('scroll', function () {
//             if (timer) {
//                 clearTimeout(timer);
//             }

//             timer = setTimeout(function () {
//                 if ($(window).scrollTop() > 400) {
//                     $target.slideDown();
//                     console.log('1');
//                 } else {
//                     $target.slideUp();
//                 }

//             }, 300);

//             return false;

//         });

//         $target.on('mouseenter', function () {
//             $(this).css({
//                 color: '#999'
//             });
//         });

//         $target.on('mouseleave', function () {
//             $(this).css({
//                 color: '#fff'
//             });
//         });
//     },

//     createNode: function () {
//         var node = $('<div></div>');
//         node.text('Top');
//         this.ct.append(node);
//         node.hide();
//         return node;
//     }
// };

// var v = new GoTop();

// 原生的方法

function Gotop($target) {
    this.$target = $target;
    this.init();
    this.bindEvent();
}

Gotop.prototype = {
    init: function () {
        this.topNode = this.createNode();
    },
    bindEvent: function () {
        var _this = this;

        this.topNode.addEventListener('click', function (e) {
            _this.$target[0].scrollTop = 0;
        });

        this.$target[0].addEventListener('scroll', function (e) {
            if (_this.timer) {
                clearTimeout(_this.timer);
            }

            _this.timer = setTimeout(function () {
                if (_this.$target[0].scrollTop > 400) {
                    _this.showNode(_this.topNode);
                }else {
                    _this.hideNode(_this.topNode);
                }
            }, 300);
        });

        this.topNode.addEventListener('touchstart', function(e){
            _this.topNode.style.color = '#999';
        });

        this.topNode.addEventListener('touchend', function(e){
            _this.topNode.style.color = '#fff';
        });
    },
    createNode: function () {
        var topNode = document.createElement('div');
        topNode.innerText = 'Top';
        var arr = [
            'position: fixed',
            'right: 20px',
            'bottom: 70px',
            'width: 1.875rem',
            'height: 1.875rem',
            'background-color: #42d1be',
            'font-size: 0.75rem',
            'text-align: center',
            'font-weight: bold',
            'line-height: 1.875rem',
            'border: none',
            'color: #fff',
            'cursor: pointer',
            'border-radius : 3px'
        ]

        topNode.style.cssText = arr.join(';');
        this.$target[0].appendChild(topNode);
        this.hideNode(topNode);

        return topNode;
    },
    showNode: function (node) {
        var ele = node;
        ele.style.display = 'block';
    },
    hideNode: function (node) {
        var ele = node;
        ele.style.display = 'none';
    }

}

