
function urls(){
    this.base_url = 'http://api.jirengu.com';
    this.baseUrl();
}

urls.prototype = {
    baseUrl: function(){
        this.getSong = this.base_url + '/fm/getSong.php';
        this.getChannel = this.base_url + '/fm/getChannels.php';
        this.getLyric = this.base_url + '/fm/getLyric.php';
    }
}

var Url = new urls();

