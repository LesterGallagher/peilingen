
var isOnline = function () {

}, isOffline = function () {
    window.ons.notification.alert({
        message: _app_localization.noConnection[_app_userLang],
    });
};

if (window.addEventListener) {
    window.addEventListener("online", isOnline, false);
    window.addEventListener("offline", isOffline, false);
}
else {
    document.body.ononline = isOnline;
    document.body.onoffline = isOffline;
}

document.addEventListener("resume", function () {
    if (navigator.onLine === false) {
        window.ons.notification.alert({
            message: _app_localization.noConnection[_app_userLang],
        });
    }
}, false);

document.addEventListener('init', function (event) {
    var page = event.target;
    if (page.id === 'trend-page') {
        initTrendPage(event);
    } if (page.id === 'bar-chart-page') {
        initBarPage(event);
    } if (page.id === 'bar-chart-seats-page') {
        initBarSeatsPage(event);
    } else if (page.id === 'trend-options-time') {
        initTrendPageTimeOptions(event);
    } else if (page.id === 'trend-options-time-custom') {
        initTrendPageTimeOptionsCustom(event);
    } else if (page.id === 'trend-options-page') {
        initTrendOptionsPage(event);
    } else if (page.id === 'splitter') {
        splitterInit(event);
    } else if (page.id === 'donut-chart-page') {
        initDonutPage(event);
    } else if (page.id === 'donut-chart-seats-page') {
        initDonutPageSeats(event);
    }

    doLocalizationOnPageInit(event);

    trendPercentagePromise.then(function(percentages) {
        document.querySelectorAll('.timeago').forEach(function(elem){
            elem.textContent = timeago(percentages.slice(-1)[0].Date, _app_userLang);
        });
    });
});

function ready() {
    if (cordova.platformId === 'browser') {
        // document.body.appendChild(document.createElement('script')).src = './js/browser.js';
        browserInit();
    } else {
        // document.body.appendChild(document.createElement('script')).src = './js/admob.js';
        initApp();
    }
    if (navigator.onLine === false) {
        window.ons.notification.alert({
            message: _app_localization.noConnection[_app_userLang],
        });
    }
}

document.addEventListener("deviceready", ready, false);
if (typeof window.cordova === 'undefined') ready();

window.ons.platform.select('android');
window.ons.disableAutoStatusBarFill();

window.fn = {};

window.fn.open = function () {
    var menu = document.getElementById('menu');
    menu.open();
};

window.fn.load = function (page) {
    var content = document.getElementById('content');
    var menu = document.getElementById('menu');
    content.load(page).then(menu.close.bind(menu));
};

window.fn.navigator = document.getElementById('navigator');

function step(data, maxPoints) {
    if (data.length <= maxPoints) return data;
    var newArr = new Array(maxPoints);
    for (var i = 0; i < maxPoints; i++) {
        newArr[i] = data[Math.floor((i * data.length) / maxPoints)];
    }
    return newArr;
};

var style = document.createElement("style");
summary.partylist.map(function (party, i) {
    style.textContent += ".legend-color-" + clean(party) + " { border-color: " + summary.colours[i] + "}";
    style.textContent += ".line-color-" + clean(party) + " { stroke: " + summary.colours[i] + "}";
    style.textContent += ".ct-bar.bar-color-" + clean(party) + " { stroke: " + summary.colours[i] + "}";
});
document.head.appendChild(style);


