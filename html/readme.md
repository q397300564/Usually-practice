## html 概述

语法
* doctype
* 标签
* 属性
* 注释
* 空白
* 实体

### doctype

目前最推荐的　html5　的文档声明
    <!DOCTYPE html>

* doctype 之前，只有空白和注释不能有其它东西（最好什么都不要写）
* 大小写不敏感，下面的写法也没有问题(但是不推荐)
    <!dOcTYPE html>

doctype 的作用？

* 告诉浏览器用什么语法解析。
* 可能会影响到JS的功能。

### 标签

#### 有内容的标签

如 ``` <script> / <body> / <span> / <button>```


#### 无内容标签

如 ``` <input> / <img> / <meta> / <link> ```

#### 可深略的标签

* 如果你能看懂 HTML Specs，那么你知道 在某些条件下 <head> / <body> / </p> 是可以省略的；
* 如果你看不懂，那你就都别省略吧……

### 属性

四种写法

* <input disabled>
* <input value=yes>
* <input type='checkbox'>
* <input name="be evil">

属性名不区分大小写，**属性值区分大小写**。

#### 全局属性

**所有标签(包括html)都有的属性**
* accesskey： 这个属性提供了一种使用快捷键访问当前元素的途径。
* class：这个属性是一个element 的class的独立规范列表。
* contenteditable: (html5):这个可枚举的属性表示这个element可以被编辑。这个属性必须要拥有一下值的其中一个：
	* ture 或者空字符串，表明这个element可以被编辑
	* false 表明这个element一定不能被编辑
* data-*: (html5): 这类属性，被称为自定义属性，允许HTML与和它对应的DOM表现形式之间的专有信息家欢。
这样被设置了这个属性的element就可以通过的HTMLElement的接口访问所有的自定义数据。
	* 但是命名有以下限制:
	>>名字不能以xml开头，除此之外其他情况下时可以使用这３个字母的。
	>>名字不能有分好。
	>>名字不能含有大写字母 
* dir: (html5):这个可枚举属性表明element的文本方向。
	* ltr, left to right, 适合于从左向右的语言。
	* rtl, right to left, 适合于从右向左的语言。
	* auto, 有代理决定。用一个最基础的算法来解析element中的字符。
* draggable: (html5):这个可枚举的属性决定一个element是否被拖动。
	* ture , 表示这个element可以被拖动。
	* false, 表示这个值不能拖动。
* dropzone: (html5):这个可枚举的属性决定丢到一个element上的内容类型。
	* copy, 表示丢放时会创建一个可被拖拽element的副本。
	* move, 表示被拖拽的element被移动到这个新位置。
	* link, 将会黑拖拽的数据(dragged data)创建一个新的链接。
* hidden: (html5): 这个布尔属性element还没有或者不在存在，当然是相对的。
	* 这个属性不能够使用在适时显示又被隐藏的内容了。
	* 隐藏的element不应该链接非隐藏的element。
	* 隐藏element的子element仍然时有效果的，这意味这脚本element仍然可以执行，表单element仍然可以提交。
* id: 这个属性是唯一的标识，它在整个document里面该应该时唯一的。
	* 命名不能还有空白字符。
	* 不能使用ASCLL字符以及数字、"_"、"-"和".", 这些可能会引起兼容性问题，在html5中已经解决。
* lang: 这个属性用于定义element的语言。
* spellcheck:(html5):这个可枚举的属性定义element是否检查拼写错误。
	* ture, 表示如果可能的话，element应该被检查拼写错误。
	* false, 表示element不应该检查拼写错误。
* style: 这个属性包含css样式声明，被应用到元素上。
* tabindex: 这个整数类型的属性决定element是否可以获得焦点，如果它参与到排序的键盘导航，就可以定位它。
	* 负数意味这element不可以获得焦点，也不可以通过排序的键盘导航到达；
	* 0意味着element可以通过排序的键盘导航到达，但是相对顺序取决于平台惯例；
	* 一个正数意味着可以通过排序的键盘导航获得焦点并到达。相对顺序去决议该属性的值，按照tabindex的增值排序。如果几个element有相同的tabindex,他们的相对顺序取决于他们在document中的位置。
* title: 这个属性包含文本信息，这信息代表element自己包含的内容公告。这个属性的用法：
	* link: 关于被链接文档的一个标题或者一个描述。
	* 和图片类似的媒体element:一段描述或相关的可信度。
	* Paragraph: 脚注活评论。
	* Quotation: 关于作者等一些信息。
* translate: 这个属性用于确定当页面进行本地化时，元素的属性值以及元素的文本子节点的内容是否要翻译。

### 注释

#### 普通注释
	```<!-- 注释 -->```


#### 奇葩的IE注释
	```
	<!-- [if IE 8]>
		<p>welcome to internet explorer 8.</p>
	<![endif] -->
	```

### 空白
* "tab" (U+0009), "LF" (U+000A), "FF" (U+000C), and "CR" (U+000D) 都是空白。
* 所有空白都会缩成一个空格。

如何在html代码中保留空白： 
* 使用html实体，如 &nbsp;
* 使用```<pre>``` 标签包起来
* 在父元素上使用css white-space:pre

### 实体

> 问题：如果要想在页面上展示```<html>```这六个字符，应该如何写？
显然不能写```<html>```,于是THML想了一个转义的方案，用&xxxx; 表示特殊字符
* 有名字的HTML实体，用 &名字; 表示
* 没有名字的 HTML 实体，用 &#十进制; 表示
* 没有名字的 HTML 实体，还可以用 &#x十六进制; 表示


