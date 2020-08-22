const express = require('express');
const formidable = require('express-formidable');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.use(formidable({
  encoding: 'utf-8',
  uploadDir: path.join(__dirname,'../upload/')
}));

router.post('/', (req, res) => {
  //console.log(req.files);
  const uploadDir = path.join(__dirname,'../upload/');
  let oldP = req.files.file.path;
  let [ , type] = req.files.file.name.split('.');
  let nowTime = +new Date();
  let newFileName = nowTime.toString() + '.' + type;
  let newP = uploadDir +  newFileName;
  fs.rename(oldP, newP, (err) => {
    if (err) {
      return '改名失败';
    }
  // console.log('上传了新的文件为：' + newP); 
  });
  return res.status(200).json({
      code: 1,
      msg: '上传成功',
      path: newFileName
  })
});

module.exports = router;