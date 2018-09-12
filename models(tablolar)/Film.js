const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    yonetmen_id: Schema.Types.ObjectId,
    ad : {
        type:String,
        required:true
    },
    kategori:String,
    ulke:String,
    yil:Number,
    imdb_skor:Number,
    olusma_tarihi:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('film',MovieSchema);