function ajax(opts){
    var settings = {
        url: '',
        type: 'get',
        data: {},
        dataType: 'json',
        success: function(){},
        error: function(){}
    }

    // 覆盖默认设置
    for(var attr in opts){
        settings[attr] = opts[attr];
    }

    // 拼接参数
    var arr = [];
    for(var attr in settings.data){
        // encodeURIComponent　　　可把字符串作为URI 组件进行编码。
        arr.push(encodeURIComponent(attr) + '=' + encodeURIComponent(settings.data[attr]));
    }

    // arr.join('&');

    // 创建ajax对象，　兼容低版本IE
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActionXObject('Microsoft.XMLHTTP');

    // 设置请求完成回调
    if( typeof xhr.onload === 'undefined'){ 
        xhr.onreadystatechange = ready;
    }else{
        xhr.onload = ready;
    }

    function ready(){
        if(xhr.readyState == 4 ){
            if(xhr.status == 200 || xhr.status == 304){
                switch(settings.dataType.toLowerCase()){
                    case "text": 
                        settings.success(xhr.responseText);
                        break;
                    case "json":
                        settings.success(JSON.parse(xhr.responseText));
                        break;
                    case "xml":
                        settings.success(xhr.responseXML);
                }
            }else if(xhr.status == 404){
                settings.fail(xhr.status);
            }
        }
    }

    //　判断请求放方式
    if( settings[type].toLowerCase() === 'get'){
        xhr.open('get', settings.url+"?" + settings.data, true);
        xhr.send();
    } else {
        xhr.open(settings[type], settings.url, true);
        xhr.setRequestHandr('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(arr.join('&'));
    }

}