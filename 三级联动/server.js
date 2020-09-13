const express = require('express');
const app = express();
const db = require('./db');
const provinceRouter = require('./router/province');
const cityRouter = require('./router/cities');
const countyRouter = require('./router/counties');


db(function(err){
    if(err){
        console.log('数据库连接失败！')
    }else{
        app.use(provinceRouter());
        app.use(cityRouter());
        app.use(countyRouter());
        app.listen(3000, err => {
            if(err){
                console.log('服务器连接失败！');
            }else{
                console.log('服务器启动成功！');
            }
        })
    }
})