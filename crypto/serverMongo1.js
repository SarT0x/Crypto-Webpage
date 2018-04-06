var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

MongoClient.connect('mongodb://localhost:27017',function(err,base){
  if(err){
    console.log(err);
  }else{
    var db = base.db('crypto');

    var currencyCollection = db.collection('currency');
    var walletCollection = db.collection('wallet');

    app.route('/setup')
    .get(function(req,res,next){
      var resHTML = res;


      db.collection('currency').drop();
      db.collection('wallet').drop();




      var bch = require('./public/json/bch.json');
      var btc = require('./public/json/btc.json');
      var eos = require('./public/json/eos.json');
      var etc = require('./public/json/etc.json');
      var eth = require('./public/json/eth.json');
      var ltc = require('./public/json/ltc.json');
      var neo = require('./public/json/neo.json');
      var trx = require('./public/json/trx.json');
      var xrp = require('./public/json/xrp.json');
      var xvg = require('./public/json/xvg.json');

      var myobj = [
        bch,
        btc,
        eos,
        etc,
        eth,
        ltc,
        neo,
        trx,
        xrp,
        xvg
      ];
      currencyCollection.insertMany(myobj, function(err, res) {
        if (err) throw err;
        resHTML.end("Nombre de monnaies ajoute : " + res.insertedCount);
      });

      var wallet = require('./public/json/wallet.json')
      walletCollection.insert({wallet},function(err,result){
        if(err){
          res.send(err)
        }else{
          res.json({
            status:"200",
            data:result
          })
        }
      })

    });
    var routes = require('./urls2.js');
    routes(app,db);
  }});



  app.listen(port,hostname,function(){
    console.log('serveur tourne sur http://' + hostname + ':' + port);
  })
