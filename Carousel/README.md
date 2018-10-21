## 轮播图插件

该插件基于原生 JavaScript 实现，能够支持较低级的浏览器，简单易使用，代码量小。


### 示例
[Demo](https://zhongdeming428.github.io/LUNZIs/Carousel/demo/demo.html)

### 如何使用

两种方式使用：

（1）script 标签引入插件

首先在这个 repo 下载 dist 文件夹下的 `Carousel.min.js` 文件。

然后使用 script 标签引入到你的网页中，然后在你的 JavaScript 程序中，就可以使用全局变量 Carousel 来构造对象了。

	<script src="../dist/Carousel.min.js"></script>
	<script>
		carousel = new Carousel('#carousel', {
			imgs: [...],
			urls: [...],
			draggable: true,
			showBtn: true,
			autoSwipe: true,
			hideBtn: true,
			timeDuration: 2000
		});
	</script>

（2）使用 npm 安装插件

在终端打开你的项目文件夹，然后通过以下命令安装插件：

	$ npm i quick-carousel --save

然后在你的 JavaScript 代码中引入插件：

	import Carousel from 'quick-carousel';

使用插件：

	new Carousel(selector, options);

### 配置项含义

	imgs: [],
	urls: [],
	draggable: true,
	showBtn: true,
	autoSwipe: true,
	hideBtn: true,
	timeDuration: 2000

其中：

*	imgs 是一个数组。里面包含的是你所要显示的图片的 url 地址。
*	urls 时一个数组。里面包含的是点击图片时要跳转的 url 地址。请注意 urls 长度必须和 imgs 长度一致，并且 imgs 和 urls 元素一一对应。
*	draggable 是一个布尔值，代表是否可以拖动滑动。默认为 false，不可滑动。
* showBtn 是一个布尔值，代表是否显示左右滑动按钮，默认为 true，显示按钮。
* autoSwipe 是一个布尔值，代表是否自动轮播，默认为 false。
* hideBtn 是一个布尔值，代表鼠标移出组件时是否自动隐藏按钮，默认为 false。
* timeDuration 是一个数字，代表每张图片展示的时长，单位为毫秒。

另外，`Carousel` 构造函数会返回一个 Carousel 对象，该对象包含一个可用的方法：

*	setOptions，重新配置 Carousel，改变当前轮播图的属性，只需传入 options 配置参数即可。