const express = require('express');
const router = express.Router();

//
const director = require('../models(tablolar)/yonetmen');

//bütün yonetmenleri çekiyorum.
router.get('/',(req,res) =>{
  const promise = director.aggregate([
      {
          $lookup: {
              from: 'films',
              localField: '_id',
              foreignField: 'yonetmen_id',
              as:'film'
          }
      },
      {
          $unwind: {
              path: '$film',
              preserveNullAndEmptyArrays:true
          }
      },
      {
          $group: {
              _id: {
                  _id: '$_id',
                  ad: '$ad',
                  soyad: '$soyad',
                  bio: '$bio'
              },
              film: {
                  $push: '$film'
              }
          }
      },
      {
          $project: {
              _id: '$_id._id',
              ad:'$_id.ad',
              soyad: '$_id.soyad',
              film: '$film'
          }
      }
  ]);
  promise.then((data) =>{
      res.json(data);
  }).catch((err) =>{
      res.json(err);
  })
});

//top 10 filmler
router.get('/top10',(req,res) =>{
    const promise = director.find( {}).limit(10).sort({imdb_skor: -1});

    promise.then((data) =>{
       res.json(data);
    }).catch((err) =>{
        res.json(err);
    })
});


/*
  yonetmen id sine göre arama yapıcam
  http://localhost:3000/api/film/5646516516165165
  şeklinde
 */
router.get('/:yonetmen_id',(req,res) =>{
    director.findById(req.params.yonetmen_id,(err,data)=>{
      if(err)
        res.json(err);
      res.json(data);
    });
});

// id ye göre verilerin update işlemleri
router.put('/:yonetmen_id',(req,res) =>{
    director.findByIdAndUpdate( req.params.yonetmen_id,req.body, { new:true }, (err,data) =>{
        if(err)
            res.json(err);
        res.json(data);
    });

});


// İD ye göre yonetmen silmek.
router.delete('/:yonetmen_id',(req,res) =>{
    director.findByIdAndRemove(req.params.yonetmen_id,(err,data)=>{
        if(err)
            res.json(err);
        res.json(data);
    });
});


//post işlemini postmande yaparak dbye yonetmen ekliyorum.
router.post('/', (req, res, next) =>{
	const yonetmen = new director(req.body);
	const promise = yonetmen.save();
	
	promise.then((data) =>{
		res.json(data);
	}).catch((err) =>{
		res.json(err);
	})
	
});

module.exports = router;
