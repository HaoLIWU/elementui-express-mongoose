let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/bingli',{useNewUrlParser:true,useUnifiedTopology: true}); //连接数据库
mongoose.set('useFindAndModify', false);


let diarySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createTime: {
        type: String,
        required: true
    },
    fileName: {
        type: String
    }
});

let Diary = mongoose.model('Diary',diarySchema);

module.exports = Diary;