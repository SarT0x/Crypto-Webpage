$(document).ready(function() {
  $('#buyCrypto').on('click', function(e) {
    e.preventDefault();

    if($('#nameCrypto').val() != 0 && $('#nbCrypto') != null) {
      var buy = {
        'buy':true,
        'nameCrypto': $('#nameCrypto').val(),
        'nbCrypto': $('#nbCrypto').val(),
        'priceCurrency': $('#priceCurrency').val(),
        'priceTotal': $('#priceTotal').val()
      };
      $.ajax({
        url:'http://localhost:3000/api/wallet/',
        type:'PUT',
        data:buy,
        success:function(data) {
          //console.log(data);

        },
        error:function(e) {

        }
      });
    }
    else {
      console.log('champs non conforme !');
    }
  })
  $.ajax({
    url:'http://localhost:3000/api/currency/',
    type:'GET',
    success:function(data){
      console.log(data);
      var historique_last_element = data.data[0].Historique;
      console.log(historique_last_element[1].high);
      var last_elementBTC = historique_last_element[historique_last_element.length - 1];
      console.log(last_elementBTC);
      var money = {
        'name' : 'BTC',
        'price' : last_elementBTC.high
      }
      console.log(money);
    }
  });
  $.ajax({
    url:'http://localhost:3000/api/wallet/',
    type:'GET',
    success:function(data) {
      var historique = data.data[0].wallet.Historique;
      $('#moneySpan').html(data.data[0].wallet.money);
      $('#listMoney').html(
        '<li class="nav-item"><a class="nav-link" href="#">' + data.data[0].wallet.BCH  + ' BCH </a></li>' +
        '<li class="nav-item"><a class="nav-link" href="#">' + data.data[0].wallet.BTC  + ' BTC </a></li>' +
        '<li class="nav-item"><a class="nav-link" href="#">' + data.data[0].wallet.EOS  + ' EOS </a></li>' +
        '<li class="nav-item"><a class="nav-link" href="#">' + data.data[0].wallet.ETC  + ' ETC </a></li>' +
        '<li class="nav-item"><a class="nav-link" href="#">' + data.data[0].wallet.LTC  + ' LTC </a></li>' +
        '<li class="nav-item"><a class="nav-link" href="#">' + data.data[0].wallet.NEO  + ' NEO </a></li>' +
        '<li class="nav-item"><a class="nav-link" href="#">' + data.data[0].wallet.TRX  + ' TRX </a></li>' +
        '<li class="nav-item"><a class="nav-link" href="#">' + data.data[0].wallet.XRP  + ' XRP </a></li>' +
        '<li class="nav-item"><a class="nav-link" href="#">' + data.data[0].wallet.XVG  + ' XVG </a></li>');
        for (var histo in historique ) {

          if(historique[histo].gain >= 0){
            var htmlGreen = '<tr class="alert-success">'
          }else{
            var htmlGreen = '<tr class="alert-danger">'
          }
          var html = htmlGreen+
          '<th scope="row">' + histo + '</th>' +
          '<td>'+historique[histo].nom+'</td>'+
          '<td>'+historique[histo].nombre+'</td>'+
          '<td>'+historique[histo].gain+'</td>'+
          '<td>'+historique[histo].date+'</td>'+
          '</tr>'
          $('#tbodyWallet').append(html);
        }
    },
    error:function(e) {

    }
  });
});
