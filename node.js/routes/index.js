const {
  log
} = require('debug');
var express = require('express');
var router = express.Router();


// 引入myCollection集合
let myCollection = require('../mongodb/girlFriend/myData.js')


/* 添加数据*/
router.get('/add', function (req, res, next) {
  // 添加数据
  let {
    name,
    Measurements,
    Years,
    Trait,
    Birthday
  } = req.query;
  myCollection.create({
    name,
    Measurements,
    Years,
    Trait,
    Birthday
  }, err => {
    if (err) console.log(err)
    res.send(true)
  });
});

/* 修改数据*/
router.get('/change', function (req, res, next) {
  // oldName查询  newName修改
  let {
    _id,
    newName,
    newMeasurements,
    newYears,
    newTrait,
    newBirthday
  } = req.query
  myCollection.updateOne({_id}, {
    $set:{
      name:newName,
      Measurements:newMeasurements,
      Years:newYears,
      Trait:newTrait,
      Birthday:newBirthday
    }
    }, (err, data) => {
      if (err) console.log(err)
      console.log(data);
      res.send(true)
    }); 
/* let {oldName,newName,oldM,newM} = req.query;
myCollection.updateMany(
  {name:oldName, Measurements:oldM},
  {$set:{name:newName,Measurements:newM}},

  err=>{
  if(err) console.log(err)
});
res.send('Update Success') */
})

/* 查询数据*/
router.get('/find', function (req, res, next) {
  let {name} = req.query;
  console.log(name);
  myCollection.find({
    name:name,
  }, {'__v': 0},(err, data) => {
      if (err) throw err
      // console.log(JSON.stringify(data));
      console.log(data);
      res.send(data)
    })
    .sort({
    'Years': 1
  });
})



/* 加载数据数据库数据*/
router.get('/getData', function (req, res, next) {
  myCollection.find((err, data) => {
    console.log(data);
    res.send(data)
  })
})

/* 删除单个数据*/
router.get('/remove', function (req, res, next) {
  myCollection.deleteOne(req.query, (err, data) => {
    if (data.deletedCount == 1) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

/* 删除所有数据*/
router.get('/removeAll', function (req, res, next) {
  myCollection.deleteMany(req.query, (err, data) => {
    console.log(data);
    if (data.ok == 1) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

module.exports = router;