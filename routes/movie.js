const express = require('express');
const router = express.Router();
//
const movie = require('../models(tablolar)/Film');
//bütün filmleri çekiyorum.
router.get('/',(req,res) =>{
  movie.find((err,data)=>{
    if(err)
      res.json(err);
    res.json(data);
  });
});

//top 10 filmler
router.get('/top10',(req,res) =>{
    const promise = movie.find( {}).limit(10).sort({imdb_skor: -1});

    promise.then((data) =>{
       res.json(data);
    }).catch((err) =>{
        res.json(err);
    })
});


/*
  filmin id sine göre arama yapıcam
  http://localhost:3000/api/film/5646516516165165
  şeklinde
 */
router.get('/:film_id',(req,res) =>{
    movie.findById(req.params.film_id,(err,data)=>{
      if(err)
        res.json(err);
      res.json(data);
    });
});

// id ye göre verilerin update işlemleri
router.put('/:film_id',(req,res) =>{
    movie.findByIdAndUpdate( req.params.film_id,req.body, { new:true }, (err,data) =>{
        if(err)
            res.json(err);
        res.json(data);
    });

});


// İD ye göre film silmek.
router.delete('/:film_id',(req,res) =>{
    movie.findByIdAndRemove(req.params.film_id,(err,data)=>{
        if(err)
            res.json(err);
        res.json(data);
    });
});


//post işlemini postmande yaparak dbye kayıt ekliyorum.
router.post('/', (req, res, next) =>{
  const { yonetmen_id,ad,kategori,ulke,yil,imdb_skor } = req.body;

  const film= new movie({
      yonetmen_id: yonetmen_id,
      ad: ad,
      kategori: kategori,
      ulke: ulke,
      yil: yil,
      imdb_skor: imdb_skor

  });

  film.save((err,data) =>{
    if(err)
      res.json(err);
    res.json(data);
  });

});

// şu tarihler arası olan filmleri listelemek (between işlemi)
router.get('/between/:ilk_yil/:son_yil',(req,res) =>{
    const { ilk_yil,son_yil } = req.params;
    movie.find( { yil:{ "$gte": parseInt(ilk_yil), "$lte": parseInt(son_yil)}  } ,(err,data)=>{
        if(err)
            res.json(err);
        res.json(data);
    });
});


module.exports = router;
