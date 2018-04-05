
$(document).ready(function() {
  $.ajax({
    url:'http://localhost:3000/api/currency/',
    method:'GET',
    dataType:'JSON',
    success:function(data) {
      console.log(data);
    }
  });
  $.ajax({
    url:'http://localhost:3000/api/currency/5ac5e14d543bca1cd8bb37c1',
    method:'GET',
    dataType:'JSON',
    success:function(data) {
      console.log(data);
    }
  });
  Highcharts.stockChart('container', {
    rangeSelector: {
      selected: 1
    },

    title: {
      text: 'Bitcoin'
    },

    series: [{
      name: 'Prix',
      data: [12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 3],
      tooltip: {
        valueDecimals: 1,
        valueSuffix: '€'
      }
    }]
  });
  $('#btd').on('click' ,function() {
    $.ajax({
      url:'http://localhost:3000/api/wallet/',
      method:'PUT',
      dataType:'JSON',
      success:function(data) {
        console.log(data);
      }
    });
  })
});
