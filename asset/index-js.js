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
				url:'./random.php',
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
		    series: [{
		        name: 'BTC',
		        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
		        tooltip: {
	                valueDecimals: 2
	            }
		    }, {
		        name: 'ETC',
		        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
		        tooltip: {
	                valueDecimals: 2
	            }
		    }, {
		        name: 'NEO',
		        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
		        tooltip: {
	                valueDecimals: 2
	            }
		    }, {
		        name: 'EOS',
		        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
		        tooltip: {
	                valueDecimals: 2
	            }
		    }, {
		        name: 'LTC',
		        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
		        tooltip: {
	                valueDecimals: 2
	            }
		    }],

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
})