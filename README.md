# image-show

基于canvas实现图片上传/预览/裁剪的demo

上传图片后台测试时候基于`nodejs`的`express`框架

实现思路：

1. 利用原生的`input`标签的`file`类型调用本地图片上传；

2. 监听`input`的`change`事件，能实时知道用户是否选中图片；

3. 新建一个`formData`对象，以键值对的形式存放`file`对象，demo中以`image`作为键名；

4. 新建一个`fileReader`对象，将读取到的`file`对象转成`base64`编码的形式；

5. 监听`fileReader`的`onload`事件，同时新建一个`image`对象，在这个事件的回调函数中，将第四步中的编码后的图片地址作为图片引用路径；

6. 监听创建的`image`的`onload`事件，利用`canvas`的`drawImage`方法，将图片内容以`canvas`的形式展示在浏览器上；

7. 裁剪的思路 利用监听鼠标的`mousedown`和`mousemove`和`mouseup`事件，主要是在鼠标移动的事件中，一边清除画布内容的同时，利用`canvas`的`strokeRect`方法模拟做出一个矩形裁剪框，`getImageData`以及`putImageData`方法实时同步选中区域的x，y坐标以及选中区域宽高可以实现裁剪选区域与预览区域实时同步；

8. 抬起鼠标完成预览图片绘制；

9. 最终利用原生`ajax`实现`form-data`类型的上传;