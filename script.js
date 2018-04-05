
$(document).ready(function() {
  var table = [];
  $.ajax({
    url:'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=EUR&allData=true',
    type:'GET',
    dataType:'JSON',
    success:function(data) {
      console.log(data);
      for (var elt in data.Data){
        var point = [];
        var date = (data.Data[elt].time) * 1000;
        var prix = data.Data[elt].high;
        point.push(date);
        point.push(prix);
        table.push(point);
        $.ajax({
          url:'http://localhost:3000/setup',
          type:'POST',
          dataType:'JSON',
          data:"date=" + date + "&prix=" + prix,
          success:function(data) {
            console.log(data);
          },
          error:function(data) {
            console.log(data);
          }
        })
        //
        //   Highcharts.stockChart('container', {
        //     rangeSelector: {
        //       selected: 1
        //     },
        //
        //     title: {
        //       text: 'Bitcoin'
        //     },
        //
        //     series: [{
        //       name: 'Prix',
        //       data: table,
        //       tooltip: {
        //         valueDecimals: 1,
        //         valueSuffix: '€'
        //       }
        //     }]
        //   });
        // },
      }
    }
  })
});
