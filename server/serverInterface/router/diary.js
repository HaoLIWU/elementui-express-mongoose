const express = require('express');
const Diary = require('../module/getDiaryData');
const User = require('../module/getUserData');
const path = require('path');
const fs = require('fs');
const router = express.Router();

/**
 *  获取全部日记接口
 *  GET /diary/getlist
 */
router.get('/getlist', (req, res) => {
  Diary.find((err, data) => {
    if (err){
      console.log(err);
      return res.status(500).json({
          code: -1,
          msg: '获取失败'
      });
    }
    res.status(200).json({
        code: 1,
        msg: '获取成功',
        data: data
    });
  });  
});

/**
 *  用户信息分页接口
 */
router.get('/getlistByNum', (req, res) => {
  let currentPage = parseInt(req.query.currentPage);
  let pageSize = parseInt(req.query.pageSize);
  //console.log(req.query)
  //console.log('diary',currentPage, pageSize)
  let skip = (currentPage - 1) * pageSize;
  let params = {};
  let diaryModel = Diary.find(params).skip(skip).limit(pageSize);
  diaryModel.exec((err, diary) => {
    if (err) {
      return res.status(500).json({
        code: -1,
        msg: '获取失败'
      });
    }
    res.status(200).json({
      code: 1,
      msg: '获取成功',
      data: diary
    });
  })
})

/**
 *  删除日记接口
 *  POST /diary/delete
 */
router.post('/delete', (req, res) => {
  let body = req.body;
  if (!body.id){
      return res.status(404).json({
          code: -2,
          msg: '没有参数id'
      });
  }
  Diary.findOneAndDelete({
    _id: body.id
  }, function (err, result) {
    if (err){
        console.log(err);
        return res.status(500).json({
            code: -1,
            msg: '删除失败'
        });
    }
    console.log(result);
    if (result.fileName) {
      const uploadDir = path.join(__dirname,'../upload/');
      const filePath = uploadDir + result.fileName;
      fs.unlink(filePath, (err) => {
        if (err) throw err;
        console.log('已成功地删除文件');
      })
    }
    return res.status(200).json({
        code: 1,
        msg: '删除成功'
    });
  });
});

/**
 *  更新日记接口
 *  POST /diary/update
 */
router.post('/update', (req, res) => {
  let body = req.body;
  if (!body.id){
    //  console.log(body.id);
      return res.status(404).json({
          code: -2,
          msg: 'id出错'
      });
  }
  Diary.findOneAndUpdate({
    _id: body.id
  },{
    title: body.title,
    content: body.content,
    name: body.name,
    createTime: body.createTime,
    fileName: body.fileName
  }, function (err,data) {
    if (err){
        console.log(err);
        return res.status(500).json({
            code: -1,
            msg: '更新失败'
        });
    }
    if (!data){
        return res.status(200).json({
            code: -3,
            msg: '更新失败,没有该用户'
        });
    }
    return res.status(200).json({
        code: 1,
        msg: '更新成功',
        data: data
    });
  });
})

/**
 *  添加日记接口
 *  POST /diary/add
 */
router.post('/add', (req, res) => {
  let body = req.body;
  User.findOne({ name: body.name }, function(err, user) {
    if(err) {
      throw err;
    }
    if (!user) {
      return res.status(200).json({
        code: -2,
        msg: '用户名不存在，请注册'
      });
    }
    new Diary(body).save(function(err, diary) {
      if (err) {
        console.log(err)
        return res.status(500).json({
          code: -3,
          message: '参数不完整'
        })
      }
      return res.status(200).json({
        code: 1,
        message: '添加日记成功',
        data: diary
      });
    });
  });
})
module.exports = router;