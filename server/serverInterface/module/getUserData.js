let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/bingli',{useNewUrlParser:true,useUnifiedTopology: true}); //连接数据库
mongoose.set('useFindAndModify', false);


let userSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    createTime: {
      type: String,
      required: true
    },
    phoneNum: {
      type: String,
      required: true
    },
    sex: {
      type: String
    },
    birth: {
      type: String
    },
    username: { // 用户名
      type: String
    }
});

let User = mongoose.model('User',userSchema);

module.exports = User;
