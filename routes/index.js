const express = require('express');
const router = express.Router();

const kullanici = require('../models(tablolar)/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: 'Express' });
});

router.post('/kayit', (req, res, next) =>{
    const {kadi,sifre} = req.body;

    bcrypt.hash(sifre,10).then( (hash) =>{
        const user = new kullanici({
            kadi,
            sifre:hash
        });

        user.save((err,data) =>{
            if(err)
                res.json(err);
            res.json(data);
        });
    });

});

router.post('/giris',(req,res) =>{
    const {kadi,sifre} = req.body;

    kullanici.findOne({kadi },(err,user) =>{
        if(err) {
            throw err;
        }
        if(!user) {
            res.json({
                status: false,
                message: 'Doğrulama başarısız,kullanıcı adı hatalı.'
            });
        }else{
            bcrypt.compare(sifre,user.sifre).then((result) =>{
                if(!result) {
                    res.json({
                        status: false,
                        message: 'Doğrulama başarısız,yanlış şifre.'
                    });
                }else{
                    const payload ={
                        kadi
                    };
                    const token = jwt.sign(payload,req.app.get('api_secret_key'),{ expiresIn: 720 });
                    res.json({
                        status:true,
                        token
                    });
                }
            });
        }

    });
});

module.exports = router;
