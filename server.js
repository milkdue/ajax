const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/ajax_get', (req, res) => {
    res.send('ajax_get响应');
});
app.post('/ajax_post', (req, res) => {
    res.send(req.body);
});
app.get('/authcode', (req, res) => {
    // 100000 999999
    setTimeout(() => {
        res.send(Math.floor(Math.random() * 899999 + 100000).toString());
    }, 3000);
});
app.get('/ajax_jquery', (req, res) => {
    res.send(req.query);
});
app.post('/ajax_jquery', (req, res) => {
    res.send(req.body);
});
app.get('/jsonp', (req, res) => {
    const {callback} = req.query;
    console.log(callback);
    res.send(`${callback}(${JSON.stringify([{name: '张三', age: 18}, {name: '李四', age: 19}])})`);
});
app.get('/jsonp_cors', (req, res) => {
    // Access-Control-Allow-Origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send([{name: '张三', age: 18}, {name: '李四', age: 19}]);
})
app.listen(3000, err => {
    if(!err){
        console.log('服务器启动成功！');
    }else{
        console.log('服务器启动失败！');
    }
});