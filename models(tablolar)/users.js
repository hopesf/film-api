const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    kadi: {
        type:String,
        required:true,
        unique:true
    },
    sifre: {
        type:String,
        minlenght:5
    }
});

module.exports = mongoose.model('users',userSchema);