/**
 * 
 * 此模块用于省级路由模块
 */

const {Router} = require('express');
const router = new Router();
const citiesModel = require('../model');

router.get('/get_all_province', (req, res) => {
    citiesModel.find({level: 1}, {name: 1, province: 1, _id: 0}, function(err, data){
        if(!err && data){
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send({status: 1, data});
        }else{
            res.send({status: 0, err});
        }
    });
    console.log('province发送了一次请求');
});

module.exports = function(){
    return router;
}