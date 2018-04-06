

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



      var moneyNow = req.params.priceCurrency;
      var nbCrypto = req.params.nbCrypto;
      var priceTotal = req.params.priceTotal;

      var prix = (moneyNow * nbCrypto);

      if(prix > money){
        res.json({
          status:"200",
          data: "tu es pauvre"
        })
      }else{
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        today = mm + '/' + dd + '/' + yyyy;



        var nameCrypto = req.params.nameCrypto

        var toUpdate = {};

        req.params.btc != null ? toUpdate.btc = req.params.btc : toUpdate.btc = null;
        req.params.bch != null ? toUpdate.bch = req.params.bch : toUpdate.bch = null;
        req.params.eos != null ? toUpdate.eos = req.params.eos : toUpdate.eos = null;
        req.params.etc != null ? toUpdate.etc = req.params.etc : toUpdate.etc = null;
        req.params.ltc != null ? toUpdate.ltc = req.params.ltc : toUpdate.ltc = null;
        req.params.neo != null ? toUpdate.neo = req.params.neo : toUpdate.neo = null;
        req.params.trx != null ? toUpdate.trx = req.params.trx : toUpdate.trx = null;
        req.params.xrp != null ? toUpdate.xrp = req.params.xrp : toUpdate.xrp = null;
        req.params.xvg != null ? toUpdate.xvg = req.params.xvg : toUpdate.xvg = null;
        req.params.eth != null ? toUpdate.eth = req.params.eth : toUpdate.eth = null;


        walletCollection.update({
          _id: new ObjectId(id)
        },{
          $set:{
            wallet:[{
              'money':req.params.money,
              'BTC':req.params.btc,
              'BCH':req.params.bch,
              'EOS':req.params.eos,
              'ETC':req.params.etc,
              'ETH':req.params.ltc,
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
                  "date" : today
                }
              ]
            }]
          }

        }, function( err, result) {
          res.json({
            status:"200",
            data: "start"
          });
        })
      }
    });

  })
}
