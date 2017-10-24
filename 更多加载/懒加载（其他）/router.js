app.get('/getNews', function(req, res){
    var News = [
        {
            infoImg: '//upload.jianshu.io/users/upload_avatars/5974473/9b092636-66da-4023-8882-d696babb8ebc.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
            infoName: '娟娟新月' ,
            infoTime: '08.12 23:12',
            contentTitle: '落陌共此殇，清风伴花凉『简书对话创作大赛』',
            contentP: '陌上人如玉，公子世无双。机关算尽，半生癫狂。独对江上烟波，明月共此殇。红尘花如梦，佳人倾世香。痴心耗尽，命断魂伤。长眠澜兮山下，清风伴花凉。 ﻿多年以后，阡陌泛舟在幻晶石的江...',
            commentType: '短篇小说',
            commentLookup: 2342,
            commentLike: 242 ,
            commentMoney: 3,
            commentComments: 321,
            textImg: '//upload-images.jianshu.io/upload_images/5974473-585321620a07e5c6.JPG?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300'
        },
        {
            infoImg: '//upload.jianshu.io/users/upload_avatars/6126137/e83c6b36-be36-4308-8ff4-41c32fc26705?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
            infoName: '槽值' ,
            infoTime: '前天 14:52',
            contentTitle: '千万不要试探人性，人的恶连佛都度不了',
            contentP: '好友是幼师，带着一群四五岁的小孩子。班上有个姑娘长得乖，表现力也棒，表演节目她很爱选那个小姑娘。 前几天她发现，小姑娘被孤立了。 下课她送孩子出教室，听到前面一个女孩警告旁边...',
            commentType: '社会热点',
            commentLookup: 23454,
            commentLike: 332 ,
            commentMoney: 32,
            commentComments: 223,
            textImg: '//upload-images.jianshu.io/upload_images/6126137-e7cc851b550dddf2.png?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300'
        },
        {
            infoImg: '//upload.jianshu.io/users/upload_avatars/7016727/0089ad1d-debb-4344-b6ca-f1829a8ff764.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
            infoName: '属马摩羯女' ,
            infoTime: '前天 14:50',
            contentTitle: '来简书是为了钱，挣不到也不想走',
            contentP: '文 属马摩羯女 图片来自网络 ﻿ 1） 我来简书的原因跟大家可能不一样，并不是多热爱写作。只是因为跟老公吵架，赌气之下花99块大洋买了个写作课程。 可能99块钱对于大部分人来...',
            commentType: '成长励志',
            commentLookup: 5842,
            commentLike: 625 ,
            commentMoney: 52,
            commentComments: 851,
            textImg: '//upload-images.jianshu.io/upload_images/7016727-08346f30f3a9a028.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300'
        },
        {
            infoImg: '//upload.jianshu.io/users/upload_avatars/5974473/9b092636-66da-4023-8882-d696babb8ebc.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
            infoName: '娟娟新月' ,
            infoTime: '08.12 23:12',
            contentTitle: '落陌共此殇，清风伴花凉『简书对话创作大赛』',
            contentP: '陌上人如玉，公子世无双。机关算尽，半生癫狂。独对江上烟波，明月共此殇。红尘花如梦，佳人倾世香。痴心耗尽，命断魂伤。长眠澜兮山下，清风伴花凉。 ﻿多年以后，阡陌泛舟在幻晶石的江...',
            commentType: '短篇小说',
            commentLookup: 2342,
            commentLike: 242 ,
            commentMoney: 3,
            commentComments: 321,
            textImg: '//upload-images.jianshu.io/upload_images/5974473-585321620a07e5c6.JPG?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300'
        },
        {
            infoImg: '//upload.jianshu.io/users/upload_avatars/6126137/e83c6b36-be36-4308-8ff4-41c32fc26705?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
            infoName: '槽值' ,
            infoTime: '前天 14:52',
            contentTitle: '千万不要试探人性，人的恶连佛都度不了',
            contentP: '好友是幼师，带着一群四五岁的小孩子。班上有个姑娘长得乖，表现力也棒，表演节目她很爱选那个小姑娘。 前几天她发现，小姑娘被孤立了。 下课她送孩子出教室，听到前面一个女孩警告旁边...',
            commentType: '社会热点',
            commentLookup: 23454,
            commentLike: 332 ,
            commentMoney: 32,
            commentComments: 223,
            textImg: '//upload-images.jianshu.io/upload_images/6126137-e7cc851b550dddf2.png?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300'
        },
        {
            infoImg: '//upload.jianshu.io/users/upload_avatars/7016727/0089ad1d-debb-4344-b6ca-f1829a8ff764.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
            infoName: '属马摩羯女' ,
            infoTime: '前天 14:50',
            contentTitle: '来简书是为了钱，挣不到也不想走',
            contentP: '文 属马摩羯女 图片来自网络 ﻿ 1） 我来简书的原因跟大家可能不一样，并不是多热爱写作。只是因为跟老公吵架，赌气之下花99块大洋买了个写作课程。 可能99块钱对于大部分人来...',
            commentType: '成长励志',
            commentLookup: 5842,
            commentLike: 625 ,
            commentMoney: 52,
            commentComments: 851,
            textImg: '//upload-images.jianshu.io/upload_images/7016727-08346f30f3a9a028.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300'
        },
        {
            infoImg: '//upload.jianshu.io/users/upload_avatars/5974473/9b092636-66da-4023-8882-d696babb8ebc.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
            infoName: '娟娟新月' ,
            infoTime: '08.12 23:12',
            contentTitle: '落陌共此殇，清风伴花凉『简书对话创作大赛』',
            contentP: '陌上人如玉，公子世无双。机关算尽，半生癫狂。独对江上烟波，明月共此殇。红尘花如梦，佳人倾世香。痴心耗尽，命断魂伤。长眠澜兮山下，清风伴花凉。 ﻿多年以后，阡陌泛舟在幻晶石的江...',
            commentType: '短篇小说',
            commentLookup: 2342,
            commentLike: 242 ,
            commentMoney: 3,
            commentComments: 321,
            textImg: '//upload-images.jianshu.io/upload_images/5974473-585321620a07e5c6.JPG?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300'
        },
        {
            infoImg: '//upload.jianshu.io/users/upload_avatars/6126137/e83c6b36-be36-4308-8ff4-41c32fc26705?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
            infoName: '槽值' ,
            infoTime: '前天 14:52',
            contentTitle: '千万不要试探人性，人的恶连佛都度不了',
            contentP: '好友是幼师，带着一群四五岁的小孩子。班上有个姑娘长得乖，表现力也棒，表演节目她很爱选那个小姑娘。 前几天她发现，小姑娘被孤立了。 下课她送孩子出教室，听到前面一个女孩警告旁边...',
            commentType: '社会热点',
            commentLookup: 23454,
            commentLike: 332 ,
            commentMoney: 32,
            commentComments: 223,
            textImg: '//upload-images.jianshu.io/upload_images/6126137-e7cc851b550dddf2.png?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300'
        },
        {
            infoImg: '//upload.jianshu.io/users/upload_avatars/7016727/0089ad1d-debb-4344-b6ca-f1829a8ff764.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
            infoName: '属马摩羯女' ,
            infoTime: '前天 14:50',
            contentTitle: '来简书是为了钱，挣不到也不想走',
            contentP: '文 属马摩羯女 图片来自网络 ﻿ 1） 我来简书的原因跟大家可能不一样，并不是多热爱写作。只是因为跟老公吵架，赌气之下花99块大洋买了个写作课程。 可能99块钱对于大部分人来...',
            commentType: '成长励志',
            commentLookup: 5842,
            commentLike: 625 ,
            commentMoney: 52,
            commentComments: 851,
            textImg: '//upload-images.jianshu.io/upload_images/7016727-08346f30f3a9a028.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300'
        },
        {
            infoImg: '//upload.jianshu.io/users/upload_avatars/5974473/9b092636-66da-4023-8882-d696babb8ebc.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
            infoName: '娟娟新月' ,
            infoTime: '08.12 23:12',
            contentTitle: '落陌共此殇，清风伴花凉『简书对话创作大赛』',
            contentP: '陌上人如玉，公子世无双。机关算尽，半生癫狂。独对江上烟波，明月共此殇。红尘花如梦，佳人倾世香。痴心耗尽，命断魂伤。长眠澜兮山下，清风伴花凉。 ﻿多年以后，阡陌泛舟在幻晶石的江...',
            commentType: '短篇小说',
            commentLookup: 2342,
            commentLike: 242 ,
            commentMoney: 3,
            commentComments: 321,
            textImg: '//upload-images.jianshu.io/upload_images/5974473-585321620a07e5c6.JPG?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300'
        },
        {
            infoImg: '//upload.jianshu.io/users/upload_avatars/6126137/e83c6b36-be36-4308-8ff4-41c32fc26705?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
            infoName: '槽值' ,
            infoTime: '前天 14:52',
            contentTitle: '千万不要试探人性，人的恶连佛都度不了',
            contentP: '好友是幼师，带着一群四五岁的小孩子。班上有个姑娘长得乖，表现力也棒，表演节目她很爱选那个小姑娘。 前几天她发现，小姑娘被孤立了。 下课她送孩子出教室，听到前面一个女孩警告旁边...',
            commentType: '社会热点',
            commentLookup: 23454,
            commentLike: 332 ,
            commentMoney: 32,
            commentComments: 223,
            textImg: '//upload-images.jianshu.io/upload_images/6126137-e7cc851b550dddf2.png?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300'
        },
        {
            infoImg: '//upload.jianshu.io/users/upload_avatars/7016727/0089ad1d-debb-4344-b6ca-f1829a8ff764.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
            infoName: '属马摩羯女' ,
            infoTime: '前天 14:50',
            contentTitle: '来简书是为了钱，挣不到也不想走',
            contentP: '文 属马摩羯女 图片来自网络 ﻿ 1） 我来简书的原因跟大家可能不一样，并不是多热爱写作。只是因为跟老公吵架，赌气之下花99块大洋买了个写作课程。 可能99块钱对于大部分人来...',
            commentType: '成长励志',
            commentLookup: 5842,
            commentLike: 625 ,
            commentMoney: 52,
            commentComments: 851,
            textImg: '//upload-images.jianshu.io/upload_images/7016727-08346f30f3a9a028.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300'
        },
        {
            infoImg: '//upload.jianshu.io/users/upload_avatars/5974473/9b092636-66da-4023-8882-d696babb8ebc.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
            infoName: '娟娟新月' ,
            infoTime: '08.12 23:12',
            contentTitle: '落陌共此殇，清风伴花凉『简书对话创作大赛』',
            contentP: '陌上人如玉，公子世无双。机关算尽，半生癫狂。独对江上烟波，明月共此殇。红尘花如梦，佳人倾世香。痴心耗尽，命断魂伤。长眠澜兮山下，清风伴花凉。 ﻿多年以后，阡陌泛舟在幻晶石的江...',
            commentType: '短篇小说',
            commentLookup: 2342,
            commentLike: 242 ,
            commentMoney: 3,
            commentComments: 321,
            textImg: '//upload-images.jianshu.io/upload_images/5974473-585321620a07e5c6.JPG?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300'
        },
        {
            infoImg: '//upload.jianshu.io/users/upload_avatars/6126137/e83c6b36-be36-4308-8ff4-41c32fc26705?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
            infoName: '槽值' ,
            infoTime: '前天 14:52',
            contentTitle: '千万不要试探人性，人的恶连佛都度不了',
            contentP: '好友是幼师，带着一群四五岁的小孩子。班上有个姑娘长得乖，表现力也棒，表演节目她很爱选那个小姑娘。 前几天她发现，小姑娘被孤立了。 下课她送孩子出教室，听到前面一个女孩警告旁边...',
            commentType: '社会热点',
            commentLookup: 23454,
            commentLike: 332 ,
            commentMoney: 32,
            commentComments: 223,
            textImg: '//upload-images.jianshu.io/upload_images/6126137-e7cc851b550dddf2.png?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300'
        },
        {
            infoImg: '//upload.jianshu.io/users/upload_avatars/7016727/0089ad1d-debb-4344-b6ca-f1829a8ff764.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96',
            infoName: '属马摩羯女' ,
            infoTime: '前天 14:50',
            contentTitle: '来简书是为了钱，挣不到也不想走',
            contentP: '文 属马摩羯女 图片来自网络 ﻿ 1） 我来简书的原因跟大家可能不一样，并不是多热爱写作。只是因为跟老公吵架，赌气之下花99块大洋买了个写作课程。 可能99块钱对于大部分人来...',
            commentType: '成长励志',
            commentLookup: 5842,
            commentLike: 625 ,
            commentMoney: 52,
            commentComments: 851,
            textImg: '//upload-images.jianshu.io/upload_images/7016727-08346f30f3a9a028.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300'
        }
        
    ];

    var pagaIndex = req.query.index;
    var a = 3;

    var retNews = News.slice( pagaIndex*a , (pagaIndex*a) + a);// 01 12 23 34 45 56 67

    res.send({
        status: 1,
        data: retNews
    });

}); 
