// 将获取id封装成一个函数
function $(id){
	return typeof id === 'string'?document.getElementById(id):id;
}

window.onload = function(){
	var tit = $('title').getElementsByTagName('a');
	var con = $('content').getElementsByTagName('div');
	//判断内容与标题长度是否一致
	if(tit.length!=con.length){
		return;
	}

	//遍历所有要点击的标题 并给它们添加索引及绑定事件
	for(var i=0;i<tit.length;i++){
		// 给li添加索引
		tit[i].index = i;

		// 给 li 添加点击事件
		tit[i].onclick = function(){
		//清除 原本 样式
		for(var j=0;j<tit.length;j++){
			tit[j].className = '';
			con[j].style.display = 'none';
		}
		//添加新样式
		this.className = 'select';//鼠标事件触发了哪个事件,就可以用 this 来代表这个对象
		con[this.index].style.display='block';
		}
	}
}