
function getTrendOptionsPageIndex() {
    return document.getElementById('trend-options-page-tabbar').getActiveTabIndex();
}

function initTrendPageTimeOptionsCustom(e) {
    console.log(e);
}

function initTrendPageTimeOptions(e) {
    console.log(e);
}

function clean(str) {
    return str.toLowerCase().replace(/\W/g, "");
}

function initTrendOptionsPage(e) {
    var i = localStorage.getItem('trendTimeIndex') || 0;
    var tabbar = document.getElementById('trend-options-page-tabbar');
    var saveBtn = document.getElementById('trend-options-page-save');
    setTimeout(function() {
        tabbar.setActiveTab(i);
    }, 0);
    saveBtn.addEventListener('click', function() {
        localStorage.setItem('trendTimeIndex', tabbar.getActiveTabIndex());
        window.fn.navigator.popPage();
    });
}