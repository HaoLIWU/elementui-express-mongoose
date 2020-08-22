const express = require('express');
const Ill = require('../module/getIllData');
const User = require('../module/getUserData');
const fs = require('fs');
const path = require('path');
const router = express.Router();


/**
 *  获取全部病例接口
 *  GET /ill/getlist
 */
router.get('/getlist', (req, res) => {
  Ill.find((err, data) => {
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
})

/**
 *  用户信息分页接口
 */
router.get('/getlistByNum', (req, res) => {
  let currentPage = parseInt(req.query.currentPage);
  let pageSize = parseInt(req.query.pageSize);
  let skip = (currentPage - 1) * pageSize;
  let params = {};
  let illModel = Ill.find(params).skip(skip).limit(pageSize);
  illModel.exec((err, ill) => {
    if (err) {
      return res.status(500).json({
        code: -1,
        msg: '获取失败'
      });
    }
    res.status(200).json({
      code: 1,
      msg: '获取成功',
      data: ill
    });
  })
})

/**
 *  删除病例接口
 *  POST /ill/delete
 */
router.post('/delete', (req, res) => {
  let body = req.body;
  if (!body.id){
      return res.status(404).json({
          code: -2,
          msg: '没有参数id'
      });
  }
  Ill.findOneAndDelete({
    _id: body.id
  }, function (err, result) {
    if (err){
        console.log(err);
        return res.status(500).json({
            code: -1,
            msg: '删除失败'
        });
    }
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
})

/**
 *  更新病例接口
 *  POST /ill/update
 */
router.post('/update', (req, res) => {
  let body = req.body;
  if (!body.id){
      return res.status(404).json({
          code: -2,
          msg: 'id出错'
      });
  }
  Ill.findOneAndUpdate({
    _id: body.id
  },{
    name: body.name,
    createTime: body.createTime,
    remark: body.remark,
    diagnosis: body.diagnosis,
    doctorName: body.doctorName,
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
 *  添加病例接口
 *  POST /ill/add
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
    new Ill(body).save(function(err, ill) {
      if (err) {
        console.log(err)
        return res.status(500).json({
          code: -3,
          message: '参数不完整'
        })
      }
      return res.status(200).json({
        code: 1,
        message: '添加病例成功',
        data: ill
      });
    })
  })
})

module.exports = router;