/**
 * 
 * 此模块用于暴露模型对象
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const citiesRule = new Schema();

module.exports = mongoose.model('cities', citiesRule);