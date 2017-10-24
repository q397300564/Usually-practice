
app.get('/loadMore' , function(req, res){
   var curIndex= req.query.index;
   var len = req.query.length;
   var data = [];
     for(var i = 0; i < len; i++) {
       data.push('新闻'+ (parseInt(curIndex) + i));
   }
     res.header("Access-Control-Allow-Origin", "*");
     res.send(data);

});