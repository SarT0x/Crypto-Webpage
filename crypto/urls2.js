

module.exports = function (app,db){

  var currencyCollection = db.collection('currency');
  var walletCollection = db.collection('wallet');

  //Récupére l'ObjectId
  var ObjectId = require('mongodb').ObjectId;


  app.route('/api/currency/')
  .get(function(req,res,next){
    currencyCollection.find({}).toArray(function(err,result){
      if(err){
        res.send(err);
      }else{
        res.json({
          status:"200",
          data:result
        })
      }
    });
  })

  app.route('/api/currency/:currencyId')
  .get(function(req,res,next){
    currencyCollection.findOne({
      _id : new ObjectId(req.params.currencyId)
    },function(err,result){
      if(err){
        res.send(err);
      }else{
        console.log(result);
        res.json({
          status:"200",
          data:result
        });
      }
    });
  })
  app.route('/api/wallet/')
  .get(function(req,res,next){
    walletCollection.find({}).toArray(function(err,result){
      if(err){
        res.send(err);
      }else{
        console.log(result);
        res.json({
          status:"200",
          data:result
        })
      }
    });
  })
  .put(function(req,res,next){
    walletCollection.find({}).toArray(function(err,result){
      var money = result[0].wallet.money
      var id = result[0]._id

      

      var moneyNow = req.params.priceCurrency
      var nbCrypto = req.params.nbCrypto

      var prix = (moneyNow * nbCrypto);

      if(prix > money){
        res.json({
          status:"200",
          data: "tu es pauvre"
        })
      }else{
        var nameCrypto = req.params.nameCrypto

        var toUpdate = {};

        if(req.params.btc != null) {
          toUpdate.btc = req.params.btc
        }


        walletCollection.update({
          _id: new ObjectId(id)
        },{
          $set:{
            wallet:[{
              'money':req.params.money,
              'BTC':req.params.btc,
              'BCH':req.params.bch,
              'EOS':req.params.eoc,
              'ETC':req.params.etc,
              'LTC':req.params.ltc,
              'NEO':req.params.neo,
              'TRX':req.params.trx,
              'XRP':req.params.xrp,
              'XVG':req.params.xvg
            }]
          },
          $push:{
            wallet:[{
              Historique:[
                {
                  "nom" : req.params.name,
                  "nombre" :req.params.number,
                  "gain" : req.params.gain,
                  "date" : req.params.date
                }
              ]
            }]
          }

        }, function( err, result) {
          res.json({
            status:"200",
            data:result
          });
        })
      }
    });

  })
}
