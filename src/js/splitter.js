

function splitterInit(event) {
    var trendAll = event.target.querySelector('#splitterTrendAll');
    trendPercentagePromise.then(function(percentages) {
        var date = percentages[percentages.length - 1].Date;
        trendAll.innerText = date;
    });
}
