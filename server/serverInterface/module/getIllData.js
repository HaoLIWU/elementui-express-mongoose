let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/bingli',{useNewUrlParser:true,useUnifiedTopology: true}); //连接数据库
mongoose.set('useFindAndModify', false);


let illSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createTime: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    remark: {
        type: String
    },
    fileName: {
        type: String
    }
});

let Ill = mongoose.model('Ill',illSchema);

module.exports = Ill;