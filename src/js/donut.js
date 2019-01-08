

function initDonutPage(event) {
    var visuallyHiddenStyles = 'margin-bottom: 20px; position: static; top: 100%; width: 100%; font-size: 11px; overflow-x: auto; background-color: rgba(0, 0, 0, 0.1); padding: 10px;'

    timespan = event.target.getAttribute('data-timespan');

    createChart();

    function createChart() {
        console.log('timespan', timespan);
        return Promise.all([
            trendPercentagePromise,
            trendPercentagePromiseArr,
            trendSeatsPromise,
            trendSeatsPromiseArr
        ]).then(function (arr) {
            var percentage = arr[0].slice(-1)[0];
            var lastUpdate = document.querySelector('.date-of-latest-update');
            if (lastUpdate) lastUpdate.innerText = percentage.Date;
            var seriesNames = Object.keys(percentage).filter(function (x) {
                return x !== "Date";
            });

            var seats = arr[2].slice(-1)[0];

            var data = {
                labels: seriesNames.map(function (s) {
                    return s + ': ' + parseFloat(Math.round(percentage[s].split(';')[1])) + '%'
                }),
                series: seriesNames.map(function (s) {
                    return {
                        name: 'test',
                        data: {
                            data: parseFloat(percentage[s].split(';')[1]),
                            meta: s,
                            class: "line-color-" + clean(s),
                        }
                    };
                })
            };

            var chart = new Chartist.Pie('#donut-chart', data, {
                donut: true,
                donutWidth: 100,
                height: 'calc(100vh - 140px)',
                fullWidth: true,
                showLabel: true,
                plugins: [
                    Chartist.plugins.fillDonut({
                        items: [{
                            content: '<h2>Percentages</h2>' // localization
                        }]
                    })
                ]
            });

            return chart;
        });
    }
}


function initDonutPageSeats(event) {
    var visuallyHiddenStyles = 'margin-bottom: 20px; position: static; top: 100%; width: 100%; font-size: 11px; overflow-x: auto; background-color: rgba(0, 0, 0, 0.1); padding: 10px;'

    timespan = event.target.getAttribute('data-timespan');

    createChart();

    function createChart() {
        console.log('timespan', timespan);
        return Promise.all([
            trendPercentagePromise,
            trendPercentagePromiseArr,
            trendSeatsPromise,
            trendSeatsPromiseArr
        ]).then(function (arr) {
            var percentage = arr[0].slice(-1)[0];
            var lastUpdate = document.querySelector('.date-of-latest-update');
            if (lastUpdate) lastUpdate.innerText = percentage.Date;
            var seriesNames = Object.keys(percentage).filter(function (x) {
                return x !== "Date";
            });

            var seats = arr[2].slice(-1)[0];

            var data = {
                labels: seriesNames.map(function (s) {
                    return s + ': ' + parseFloat(seats[s].split(';')[1]) + ''
                }),
                series: seriesNames.map(function (s) {
                    return {
                        name: 'test',
                        data: {
                            data: parseFloat(seats[s].split(';')[1]),
                            meta: s,
                            class: "line-color-" + clean(s),
                        }
                    };
                })
            };

            var chart = new Chartist.Pie('#donut-chart-seats', data, {
                donut: true,
                donutWidth: 100,
                height: 'calc(100vh - 140px)',
                fullWidth: true,
                showLabel: true,
                plugins: [
                    Chartist.plugins.fillDonut({
                        items: [{
                            content: '<h2>' + _('Seats') + '</h2>' // localization
                        }]
                    })
                ]
            });

            return chart;
        });
    }
}

