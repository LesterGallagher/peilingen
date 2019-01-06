
function initBarPage(event) {
    var visuallyHiddenStyles = 'margin-bottom: 20px; position: static; top: 100%; width: 100%; font-size: 11px; overflow-x: auto; background-color: rgba(0, 0, 0, 0.1); padding: 10px;'
     
    timespan = event.target.getAttribute('data-timespan');

    var trendColors = document.getElementById("legend-colors");

    summary.partylist.map(function (party, i) {
        var legendItem = document.createElement("div");
        legendItem.classList.add("legend-color-" + clean(party));
        legendItem.innerText = party;
        trendColors.appendChild(legendItem);
    });

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
                labels: seriesNames,
                series: [{
                    name: 'Percentages',
                    data: seriesNames.map(function (s) {
                        return {
                            data: parseFloat(percentage[s].split(';')[1]),
                            meta: parseFloat(percentage[s].split(';')[1]),
                            class: "line-color-" + clean(s),
                        };
                    })
                }]
            };

            var chart = new Chartist.Bar("#ct-chart", data, {
                min: 0,
                height: "600px",
                fullWidth: true,
                plugins: [
                    Chartist.plugins.tooltip({
                        class: "ct-tooltip"
                    }),
                    Chartist.plugins.ctAccessibility({
                        caption: 'Polls, ' + percentage.Date, // localization
                        seriesHeader: 'Rating', // localization
                        summary: 'A graphic that shows dutch polls at ' + percentage.Date, // localization
                        valueTransform: function (value) {
                            return value + '%';
                        },
                        class: 'legend-table',
                        // ONLY USE THIS IF YOU WANT TO MAKE YOUR ACCESSIBILITY TABLE ALSO VISIBLE!
                        visuallyHiddenStyles: visuallyHiddenStyles
                    })
                ]
            });

            chart.on('draw', function (data) {
                if (data.type === 'bar') {
                    var s = seriesNames[data.index]
                    data.element.addClass("bar-color-" + clean(s));
                }
            });

            return chart;
        });
    }
}


function initBarSeatsPage(event) {
    var visuallyHiddenStyles = 'margin-bottom: 20px; position: static; top: 100%; width: 100%; font-size: 11px; overflow-x: auto; background-color: rgba(0, 0, 0, 0.1); padding: 10px;'
     
    timespan = event.target.getAttribute('data-timespan');

    var trendColors = document.getElementById("bar-seats-legend-colors");
    console.log('t', trendColors);

    summary.partylist.map(function (party, i) {
        var legendItem = document.createElement("div");
        legendItem.classList.add("legend-color-" + clean(party));
        legendItem.innerText = party;
        trendColors.appendChild(legendItem);
    });

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

            var dataSeats = {
                labels: seriesNames,
                series: [{
                    name: 'Seats', // localization
                    data: seriesNames.map(function (s) {
                        return {
                            data: parseFloat(seats[s].split(';')[1]),
                            meta: parseFloat(seats[s].split(';')[1]),
                            class: "line-color-" + clean(s),
                        };
                    })
                }]
            };

            var chartSeats = new Chartist.Bar("#ct-chart-seats", dataSeats, {
                min: 0,
                height: "600px",
                fullWidth: true,
                plugins: [
                    Chartist.plugins.tooltip({
                        class: "ct-tooltip-2"
                    }),
                    Chartist.plugins.ctAccessibility({
                        caption: 'Polls, ' + seats.Date, // localization
                        seriesHeader: 'Rating', // localization
                        summary: 'A graphic that shows dutch polls at ' + seats.Date, // localization
                        valueTransform: function (value) {
                            return value + '%';
                        },
                        class: 'legend-table',
                        // ONLY USE THIS IF YOU WANT TO MAKE YOUR ACCESSIBILITY TABLE ALSO VISIBLE!
                        visuallyHiddenStyles: visuallyHiddenStyles
                    })
                ]
            });

            chartSeats.on('draw', function (data) {
                if (data.type === 'bar') {
                    var s = seriesNames[data.index]
                    data.element.addClass("bar-color-" + clean(s));
                }
            });

            return chartSeats;
        });
    }
}

