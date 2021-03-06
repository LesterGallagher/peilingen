function clean(str) {
    return str.toLowerCase().replace(/\W/g, "");
}

function initTrendPage(event) {
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
            trendSeatsPromiseArr
        ]).then(function (arr) {
            var percentages = arr[0];
            var percentagesArr = arr[1];
            var seats = arr[2];
            var steps = Math.floor(window.innerWidth / 80);
            var bounds = getSpanDate(timespan);

            console.log(percentages);
            var steppedPercentages = step(percentages.filter(function (time) {
                time = new Date(time.Date).getTime();
                return time >= bounds.d.getTime() && time <= bounds.f.getTime();
            }), steps);
            if (steppedPercentages.length < 2) {
                steppedPercentages = percentages.slice(-2);
            }
            console.log(steppedPercentages);

            var seriesNames = Object.keys(steppedPercentages[0]).filter(function (x) {
                return x !== "Date";
            });


            var data = {
                labels: steppedPercentages.map(function (x) {
                    return x.Date;
                }),
                series: seriesNames.map(function (s) {
                    return {
                        data: steppedPercentages
                            .map(function (item) {
                                return parseFloat(item[s].split(";")[1]);
                            })
                            .map(function (x) {
                                return { value: x, meta: s + ": " + x + "%" };
                            }),
                        className: "line-color-" + clean(s)
                    };
                })
            };

            var chart = new Chartist.Line("#ct-chart", data, {
                min: 0,
                height: "600px",
                fullWidth: true,
                plugins: [
                    Chartist.plugins.tooltip({
                        class: "ct-tooltip"
                    })
                ]
            });

            chart.on('draw', function (data) {
                // If the draw event was triggered from drawing a point on the line chart
                if (data.type === 'point') {
                    // We are creating a new path SVG element that draws a triangle around the point coordinates

                    var circle = new Chartist.Svg('line', {
                        x1: [data.x],
                        x2: [data.x],
                        y1: [data.y],
                        y2: [data.y],
                        'ct:value': data.value.y,
                        'ct:meta': data.meta,
                        class: 'ct-point ct-point-click-catcher',
                    }, 'ct-point');

                    // With data.element we get the Chartist SVG wrapper and we can replace 
                    // the original point drawn by Chartist with our newly created triangle
                    data.group.append(circle);
                }
            });

            return chart;

            function getSpanDate(timespan) {
                var latest = percentages.slice(-1)[0].Date;
                var d = new Date(latest);
                var f = new Date();
                switch (timespan) {
                    case 'today':
                        d.setDate(d.getDate() - 1);
                        break;
                    case 'yesterday':
                        d.setDate(d.getDate() - 2);
                        f.setDate(f.getDate() - 1);
                        break;
                    case 'quarter':
                        d.setMonth(d.getMonth() - 3);
                    case 'week':
                        d.setDate(d.getDate() - 7);
                        break;
                    case 'month':
                        d.setMonth(d.getMonth() - 1);
                        break;
                    case 'year':
                        d.setFullYear(d.getFullYear() - 1);;
                        break;
                    default:
                        d = new Date(0);
                        break;
                }
                return { d: d, f: f };
            }
        });
    }
}

