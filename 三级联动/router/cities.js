/**
 * 
 * 此模块用于市级路由模块
 */

const {Router} = require('express');
const router = new Router();
const citiesModel = require('../model');

router.get('/get_all_cities_by_province', (req, res) => {
    const {province} = req.query;
    citiesModel.find({level: 2, province}, {name: 1, city: 1, _id: 0}, function(err, data){
        if(!err && data){
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send({status: 1, data});
        }else{
            res.send({status: 0, err});
        }
    });
    console.log('city发送了一次请求');
});

module.exports = function(){
    return router;
}