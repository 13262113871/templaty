var mongoose = require('./connect') //引入mongoose模块
// 定义数据类型Schema
const Schema = mongoose.Schema;

let myData = new Schema({
  name:{type:String,required:true},
  Measurements:{type:Number,required:true},
  Years:{type:Number,required:true},
  Trait:String,
  Birthday:String
})

// Model将Schema映射到集合 （创建集合）
var myCollection = mongoose.model('myFriend',myData);
// 集合据暴露出去
module.exports = myCollection;