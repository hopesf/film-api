const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    ad: String,
    soyad: String,
    bio: String,
    olusturma_tarihi:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('yonetmen',DirectorSchema);