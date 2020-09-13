/**
 * 
 * 此模块用于连接数据库
 */

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

module.exports = function(callback){
    mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.on('open', function(err){
        if(err){
            callback(err);
        }else{
            console.log('数据库连接成功！');
            callback();
        }
    })
}