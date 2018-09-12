const mongoose = require('mongoose');

module.exports = () =>{
    mongoose.connect('mongodb://hopesf:selimb053348@ds141872.mlab.com:41872/movie',{ useNewUrlParser: true });
    mongoose.connection.on('open',() =>{
       console.log('uzak db bağlandı.') ;
    });

    mongoose.connection.on('error',(err)=>{
        console.log('uzak db bağlanamadı',err) ;
    });
};