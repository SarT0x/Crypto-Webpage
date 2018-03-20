


Highcharts.chart('container', {

    title: {
        text: 'Courbe des cryptomonnaies'
    },

    subtitle: {
        text: 'Source: CrytoCompare.com'
    },

    yAxis: {
        title: {
            text: 'Prix en €'
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
        name: 'Bitcoin',
        data: [8537, 9300, 9278, 7809, 8216, 7563, 8632, 8543]
    }, {
        name: 'Ethereum',
        data: [623, 590, 610, 600, 500, 392, 396, 431]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
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
