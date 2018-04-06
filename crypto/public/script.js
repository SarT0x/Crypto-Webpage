
$(document).ready(function() {
  $('#btdGraph').on('click', function(event) {
    $.ajax({
      url:'http://localhost:3000/api/currency/5ac78321a31d541d14b89e80',
      method:'GET',
      dataType:'JSON',
      success:function(data) {

        var table = [];
        console.log(data.data.Historique);
        var array = [];
        console.log(data.data.Historique[1].high);
        for (var i = 0; i < data.data.Historique.length; i++) {
          array[i] = data.data.Historique[i].high;

        }

        for (var elt in data.data.Historique){
        var point = [];
        var date = (data.data.Historique[elt].time) * 1000;
        var prix = data.data.Historique[elt].high;
        point.push(date);
        point.push(prix);
        table.push(point);
        }
        console.log(array);
        Highcharts.stockChart('container', {
          rangeSelector: {
            selected: 1
          },
          title: {
            text: 'Bitcoin'
          },
          series: [{
            name: 'Prix',
            data: table,
            tooltip: {
              valueDecimals: 1,
              valueSuffix: '€'
            }
          }]
        });
      }
    });
  });

  $('#btdPut').on('click' ,function() {
    $.ajax({
      url:'http://localhost:3000/api/wallet/',
      method:'PUT',
      data:{
        'priceCurrency':120,
        'nbCrypto':10,
        'nameCrypto': 'ETH',
        'priceTotal':1200
      },
      dataType:'JSON',
      success:function(data) {
        console.log(data);
      }
    });
  });
  $('#btdGetW').on('click' ,function() {
    $.ajax({
      url:'http://localhost:3000/api/wallet/',
      method:'GET',
      dataType:'JSON',
      success:function(data) {
        console.log(data);
      }
    });
  });
});
