$(document).ready(function() {
	var table = [];
	var tabValue = []
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
				success:function(s) {

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
		method:'GET',
		dataType:'JSON',
		success:function(data) {
			console.log(data);
			for (var val in data.data) {
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
					'tooltip': {valueDecimals: 2}
				}
				tabValue.push(value);
			}
			console.log(tabValue);
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
					yAxis: {
						title: {
							text: 'Valeur (en EUR)'
						}
					},
					legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'middle'
					},
					plotOptions: {
						series: {
							label: {
								connectorAllowed: false
							},
							pointStart: 2010
						}
					},
					series: [table],

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
