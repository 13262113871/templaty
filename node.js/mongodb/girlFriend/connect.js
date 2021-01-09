var mongoose = require('mongoose') //引入mongoose模块
// 链接数据库
mongoose.connect("mongodb://127.0.0.1:27017/hcy2",{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 连接状态检测
let db = mongoose.connection;
db.on('error',(err)=>{
  if(err){console.log('Connection Failed')}
});
db.on('open',()=>{
  console.log('Connection Success')
});
db.on('disconnected',()=>{
  console.log('Connection OFF')
});
module.exports = mongoose

