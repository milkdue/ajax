# ajax

## ajax简介

- ajax全称Asynchronous javascript And XML 就是异步的js和xml
- 通过ajax可以在浏览器中向服务器发送异步请求，最大的优势：无刷新获取数据
- ajax不是新的编程语言，不是新的一门独立的技术，而是一种使用现有标准的新方法

## xml简介

- xml可扩展标记语言
- xml被设计用来传输和存储数据
- xml和html类似，不同的是html都是预定义标签，而xml中没有预定义标签

```xml
name="孙悟空";age=18
用xml表示

<student>
    <name>孙悟空</name>
    <age>18</age>
</student>
```

- json以可取代xml

## ajax的工作原理

- ajax的工作原理相当于在用户和服务器之间加了一个中间层(ajax引擎)，使得用户操作与服务器响应异步化

## ajax的特点

### ajax的优点

- 可以无需刷新页面而与服务器进行通信
- 允许根据用户事件来更新部分页面内容

### ajax的缺点

- 没有浏览历史，不可回退
- 存在跨越问题
- seo不友好

## ajax的使用

### 使用原生js发送ajax的get请求

- 实例化XMLHttpRequest的对象 ------------------> 找来一个帮你发请求的人
- 绑定一个名为onreadystatechange事件监听 -------> 和发请求的人约定好，成功失败干什么
- 调用open方法 --------------------------------> 发请求，用什么方法，带什么方法发
- 调用send方法 --------------------------------> 发送请求

```js
let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
    // xhr对象本身有五种状态：0， 1， 2， 3， 4
    if(xhr.state == 4 && xhr.status == 200){
        console.log(xhr.response);
    }
}
xhr.open('get', 'http://localhost:3000/ajax/?name=zhangsan&age=18');
xhr.send();
```

### 使用原生js发送ajax的post请求

```js
let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
    // xhr对象本身有五种状态：0， 1， 2， 3， 4
    if(xhr.state == 4 && xhr.status == 200){
        console.log(xhr.response);
    }
}
xhr.open('post', 'http://localhost:3000/ajax');
// Content-Type: application/x-www-form-urlencoded
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send('name=zhangsan&age=18');
```

### xhr.state的五种状态

- 0
  - xhr对象在实例化出来的那一刻，就是0状态，代表xhr是初始化状态，几乎不会在0状态实现逻辑，进入不了回调
- 1
  - send方法还没有被调用，请求还没有发出去，此时依然可以修改请求头
- 2
  - send方法被调用，请求已经发出去了，此时不可以修改请求头
- 3
  - 已经回来一部分数据了，如果是比较小的数据，会在此阶段一次性接收完毕，较大数据有待进一步接收
- 4
  - 数据完美的回来了

### get/post

#### get请求

- 参数放在哪？ ---------------> 请求地址里
- 以什么方式携带？ -----------> 查询字符串参数
- 参数什么编码形式？-----------> urlencoded编码

#### post

- 参数放在哪？ -----------------> 请求体
- 以什么方式携带 ---------------> 请求体参数
- 参数是什么编码形式 ------------> urlencoded
- form-post --------------------> urlencoded form自动完成
- ajax-post -------------------->  1. urlencoded 加请求头 2. json

### 解决ie默认强缓存问题

- 利用时间戳
- 发送urlencoded加入时间

```js
xhr.open('get', 'http://localhost:3000/?name=zhangsan&age=18&t=' + Date.now());
```

### xhr.abort

#### 关于xhr.abort

1. 如果来的及，半路取消，请求未到达服务器
2. 如果来不及，拒之门外，请求已经到达服务器
3. 也存在不起作用的情况

### 使用jquery封装的ajax

```js
<script src="./js/jquery-1.10.1.js"></script>
    <button id="btn1">发送get请求</button>
    <button id="btn2">发送post请求</button>
    <script>
        let btn1 = $('#btn1');
        let btn2 = $('#btn2');

        btn1.click(function(){
            $.ajax('http://localhost:3000/ajax_jquery', {
                method: 'get',
                data: {name: '张三', age: 18},
                success: function(data, stateText, xhr){
                    console.log(data);
                    console.log(stateText);
                    console.log(xhr);
                },
                error: err => {
                    if(err){
                        console.log(err);
                    }
                }
            });
            // $.ajax({
            //     url: 'http://localhost:3000/ajax_jquery',
            //     method: 'get',
            //     data: {name: '李四', age: 18},
            //     success: (data) => {
            //         if(data){
            //             console.log(data);
            //         }
            //     },
            //     error: err => {
            //         if(err){
            //             console.log(err);
            //         }
            //     }
            // })

            // $.get('http://localhost:3000/ajax_jquery', {name: '张三', age: 18}, data => {
            //     if(data){
            //         console.log(data);
            //     }
            // });
        });
        btn2.click(function(){
            $.post('http://localhost:3000/ajax_jquery', {name: '李四', age: 18}, (data, stateText, xhr) => {
                if(data){
                    console.log(data);
                    console.log(stateText);
                    console.log(xhr);
                }
            })
        });
    </script>
```

### ajax的跨域问题

- ajax跨域不会影响服务器但会影响浏览器，服务器照常接收请求，但浏览器无法获取数据

#### 域

- 域 <=> 源
- 跨域 - 同域
- 跨源 - 同源
- 同源

#### 为什么有跨域问题

1. 浏览器为了安全，而采用的同源策略(same origin policy)

#### 什么是同源策略

1. 同源策略是由netscape(网景)提出的一个著名的安全策略，现在所有支持javascript的浏览器都会使用这个策略
2. web是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现
3. 所谓同源，也称为同域，是指：协议，域名(IP)，端口必须要完全相同，即：协议、域名(IP)、端口都相同，才能算是一个域

#### 跨域受到哪些限制

1. cookie不能读取
2. DOM无法获得(iframe)
3. ajax请求不能获取数据

#### form为什么跨域不拦截

- ajax发的请求，走的ajax引擎，遵守同源策略的规定
- form发的请求，走的浏览器的其他模块，不受同源策略的限制
- form发完的请求，跳转到新的页面

### jsonp解决跨域问题

#### jsonp的流程

1. 在window下挂载一个函数
2. 创建一个script标签，并为script标签添加属性src,同时指定好回调函数的名字
3. 将script放入body下

#### jsonp的原理

1. 利用script标签发请求不受同源策略的限制
2. jsonp利用src传递参数

#### jsonp的弊端

1. 只能解决get请求跨域问题
2. 后端必须配合前端

#### 前端定义函数后端'调用'

1. 后端返回的数据，前端以js的格式解析，并调用

### jquery使用jsonp

```js
$.ajax({
    url: 'http://localhost:3000/jsonp',
    method: 'get',
    dataType: 'jsonp',
    data: {name: '张三', age: 18},
    success: function(data){
        console.log(data);
    },
    error: function(err){
        console.log(err);
    }
});

// 另一种写法

$.getJSON('http://localhost:3000/jsonp?callback=?', {name: '张三', age: 18}, function(data){
    console.log(data);
})
```

### cors解决跨域

```js
app.get('/jsonp_cors', (req, res) => {
    // Access-Control-Allow-Origin
    // *表示全部
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500/');
    res.send([{name: '张三', age: 18}, {name: '李四', age: 19}]);
})
```
