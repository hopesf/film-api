const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    const token = req.headers['x-acces-token'] || req.body.token || req.query.token;
    if(token){
    jwt.verify(token,req.app.get('api_secret_key'),(err,decoded) =>{
       if(err)
           res.json({
              status:false,
              message:'token doğrulama hatası'
           });
       else{
           req.decode= decoded;
           next();
       }
    });
    }else{
        res.json({
            status:false,
            message:'token bulamadım'
        });
    }
};