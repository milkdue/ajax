/**
 * 
 * 此模块用于区县级路由模块
 */

const {Router} = require('express');
const router = new Router();
const citiesModel = require('../model');

router.get('/get_all_counties_by_province_and_city', (req, res) => {
    const {province, city} = req.query;
    citiesModel.find({level: 3, province, city}, {name: 1, county: 1, _id: 0}, function(err, data){
        if(!err && data){
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send({status: 1, data});
        }else{
            res.send({status: 0, err});
        }
    });
    console.log('county发送了一次请求');
});

module.exports = function(){
    return router;
}