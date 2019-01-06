
var percentagesUrl = 'https://d1bjgq97if6urz.cloudfront.net/Public/Peilingwijzer/Last/Results_DyGraphs.csv';
var seatsUrl = 'https://d1bjgq97if6urz.cloudfront.net/Public/Peilingwijzer/Last/Results_DyGraphs_Seats.csv'

function csv2obj(csv, opt) {
    var delimeter = ',';
    var i, row, rownum, collumNum, lines = csv.split(/\s*\n\s*/);
    var headers = lines[0].split(delimeter);
    for (i = 0; i < headers.length; i++) {
        headers[i] = headers[i].replace(/(^[\s"]+|[\s"]+$)/g, '');
    }
    var ret = [];
    for (rownum = 1; rownum < lines.length; rownum++) {
        if (lines[rownum].trim() === '') continue;
        row = lines[rownum].split(delimeter);
        ret[rownum - 1] = {};
        for (collumNum = 0; collumNum < headers.length; collumNum++) {
            if (row[collumNum].length > 0 && (!isNaN(row[collumNum]) || row[collumNum] === 'true'
                || row[collumNum] === 'false' || row[collumNum] === 'null'))
                ret[rownum - 1][headers[collumNum]] = JSON.parse(row[collumNum]);
            else
                ret[rownum - 1][headers[collumNum]] = row[collumNum].replace(/(^\s*"*|"*\s*$)/g, '');
        }
    }
    return ret;
}

function pcsv(csv) {
    return csv.trim().split('\n').map(function(line) { return line.split(','); });
}

var trendPercentagePromiseRaw = getText(percentagesUrl);
var trendSeatsPromiseRaw = getText(seatsUrl)

var trendPercentagePromise = trendPercentagePromiseRaw.then(csv2obj);
var trendSeatsPromise = trendSeatsPromiseRaw.then(csv2obj);

var trendPercentagePromiseArr = trendPercentagePromiseRaw.then(pcsv);
var trendSeatsPromiseArr = trendSeatsPromiseRaw.then(pcsv);

