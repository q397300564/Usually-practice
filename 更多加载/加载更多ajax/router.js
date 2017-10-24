app.get('/loadMore' , function(req, res){
    var curIndex= req.query.index;
    var len = req.query.len;
    var Obj = {
        status: 1,
        data: []
    };
    
    for(var i = 0; i < len; i++) {
       Obj.data.push('新闻'+ (parseInt(curIndex) + i));
    }
    res.send(Obj);

});