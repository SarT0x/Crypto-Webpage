$(document).ready(function() {
	var table = [];
	var tab = [];
	$.ajax({
		url:'http://localhost:3000/api/wallet/',
		type:'GET',
		success:function(data) {
			console.log(data);
			console.log(data.data[0].wallet.Historique);
			var historique = data.data[0].wallet.Historique;
			$('#moneySpan').html(data.data[0].wallet.money);
			$('#moneyul').html(
				'<li>' + data.data[0].wallet.BCH  + ' BCH </li>' +
				'<li>' + data.data[0].wallet.BTC  + ' BTC </li>' +
				'<li>' + data.data[0].wallet.EOS  + ' EOS </li>' +
				'<li>' + data.data[0].wallet.ETC  + ' ETC </li>' +
				'<li>' + data.data[0].wallet.LTC  + ' LTC </li>' +
				'<li>' + data.data[0].wallet.NEO  + ' NEO </li>' +
				'<li>' + data.data[0].wallet.TRX  + ' TRX </li>' +
				'<li>' + data.data[0].wallet.XRP  + ' XRP </li>' +
				'<li>' + data.data[0].wallet.XVG  + ' XVG </li>');
				for (var histo in historique ) {
					$('#scrollable-list').append(
						'<li class="list-group-item">' + historique[histo].nombre + " " + historique[histo].nom + " -  " + historique[histo].gain  + "€ - " + historique[histo].date + '</li>'
					);
				}
		},
		error:function(e) {

		}
	});
	$.ajax({
		url:'http://localhost:3000/api/currency/',
		method:'GET',
		dataType:'JSON',
		success:function(data) {
			//var i = 0;
			for (var val in data.data) {
				var table = [];
				var name = data.data[val].Nom;
				for (var elt in data.data[val].Historique){
					var point = [];
					var date = (data.data[val].Historique[elt].time) * 1000;
					var prix = data.data[val].Historique[elt].high;
					point.push(date);
					point.push(prix);
					table.push(point);
				}
				var value = {
					'name' : name,
					'data' : table,
					'tooltip' : {
						valueDecimals: 1,
						valueSuffix: '€'
					},
				}
				tab.push(value);

			}
			//console.log(tab[0]);
			if($('#graph').length > 0) {

				Highcharts.chart('graph', {
					title: {
						text: 'Courbes de comparaison de cryptomonnaies'
					},
					rangeSelector: {
						selected: 1
					},
					subtitle: {
						text: 'Source: cryptocompare.com'
					},
					plotOptions: {
						series: {
							label: {
								connectorAllowed: false
							},
							pointStart: 1970
						}
					},

					yAxis: {
						title: {
							text: 'Valeur (en EUR)'
						}
					},
					xAxis: {
						type: 'datetime'
					},
					legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'middle'
					},
					series: tab,

					responsive: {
						rules: [{
							condition: {
								maxWidth: 800
							},
							chartOptions: {
								legend: {
									layout: 'horizontal',
									align: 'center',
									verticalAlign: 'bottom'
								}
							}
						}]
					}
				});
			}
		}
	});
});
