const express = require('express');
let userRouter = require('./router/user');
let uploadRouter = require('./router/upload');
let diaryRouter = require('./router/diary');
let illRouter = require('./router/ill')
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
// 配置允许跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  // res.header('Content-Type', 'application/json;charset=utf-8'); // 这个写上去会导致图片加载不出来
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname,'./upload'))); // 设置公共文件
app.use('/user', userRouter);
app.use('/upload', uploadRouter);
app.use('/diary', diaryRouter);
app.use('/ill', illRouter);

app.listen(3000, function () {
  console.log('app is running on 3000');
});