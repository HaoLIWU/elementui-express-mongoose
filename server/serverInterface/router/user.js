let express = require('express');
let User = require('../module/getUserData');
// let path = require('path');
let router = express.Router();
// let fs = require('fs');

/**
 *  获取全部用户信息
 *  GET /user/getlist
 */
router.get('/getlist', (req, res) => {
  //console.log(req);
  User.find((err, data) => {
    if (err){
      // console.log(err);
      return res.status(500).json({
          code: -1,
          msg: '获取失败'
      });
    }
    return res.status(200).json({
        code: 1,
        msg: '获取成功',
        data: data
    });
  })
});

/**
 *  获取单个用户信息
 *  POST /user/getlistByName
 */
router.post('/getlistByName', (req, res) => {
  let body = req.body;
    User.find({
      name: body.name
    }, (err, data) => {
        if (err){
            // console.log(err);
            return res.status(500).json({
                code: -1,
                msg: '获取失败'
            });
        }
        return res.status(200).json({
            code: 1,
            msg: '获取成功',
            data: data
        });
    })
})

/**
 *  用户信息分页接口
 */
router.get('/getlistByNum', (req, res) => {
  let currentPage = parseInt(req.query.currentPage);
  let pageSize = parseInt(req.query.pageSize);
  let skip = (currentPage - 1) * pageSize;
  let params = {};
  let userModel = User.find(params).skip(skip).limit(pageSize);
  userModel.exec((err, user) => {
    if (err) {
      console.log(err)
      return res.status(500).json({
        code: -1,
        msg: '获取失败'
      });
    }
    res.status(200).json({
      code: 1,
      msg: '获取成功',
      data: user
    });
  })
})

/**
 *  修改用户信息
 *  POST /user/update
 */
router.post('/update', (req, res) => {
  let body = req.body;
  if (!body.id){
      console.log(body.id);
      return res.status(404).json({
          code: -2,
          msg: 'id出错'
      });
  }
  User.findOneAndUpdate({
    _id: body.id
  },{
    name: body.name,
    password: body.password,
    createTime: body.createTime,
    sex: body.sex,
    birth: body.birth,
    phoneNum: body.phoneNum,
    username: body.username
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
});

/**
 * 删除用户信息
 * POST /user/delete
 */
router.post('/delete', (req, res) => {
  let body = req.body;
  if (!body.id){
      return res.status(404).json({
          code: -2,
          msg: '没有参数id'
      });
  }
  User.findOneAndDelete({
    _id: body.id
  }, function (err) {
    if (err){
        console.log(err);
        return res.status(500).json({
            code: -1,
            msg: '删除失败'
        });
    }
    res.status(200).json({
        code: 1,
        msg: '删除成功'
    });
  });
});

/**
 * 添加用户信息,注册
 * POST /user/add
 */
router.post('/add', (req, res) => {
  let body = req.body;
  User.findOne({
      name: body.name,
      password: body.password,
      phoneNum: body.phoneNum
  }, function(err, user) {
    if(err) {
      throw err;
    }
    if (user) {
      return res.status(200).json({
        code: 2,
        msg: '用户名已存在，请登录',
        data: user
      });
    }
    new User(body).save(function(err, user) {
      if (err) {
        return res.status(500).json({
          code: -3,
          message: '参数不完整'
        })
      }
      return res.status(200).json({
        code: 1,
        message: '注册成功',
        data: user
      });
    });
  });
});

/**
 *  用户登录接口
 * */
router.post('/login', (req, res) => {
  let body = req.body;
  if (!body.name || !body.password){
    return res.status(404).json({
        code: -2,
        msg: '参数出错'
    })
  }
  User.findOne({
      name: body.name,
      password: body.password
  }, function(err, user) {
      if (err) {
         throw err;
      }
      if (!user) {
          return res.status(200).json({
              code: -3,
              msg: '未找到该用户'
          });
      }
      return res.status(200).json({
          code: 1,
          msg: '登录成功'
      });
  });
})
module.exports = router;
