var _app_maxListItems = 200;
var _app_maxLazyListItems = 700;

var instance = timeago();
timeago = instance.format.bind(instance);
var hasfocus = true;

function setFocus() { hasfocus = true; }
function setBlurred() { hasfocus = false; }

window.addEventListener('focus', setFocus);
window.addEventListener('blur', setBlurred);
document.addEventListener('resume', setFocus);
document.addEventListener('pause', setBlurred);

function handleerroriconnotfound() { this.src = 'images/iconnotfound.png'; }

var html2text = (function () {
	var div = document.createElement('div');
	return function (html) {
		div.innerHTML = html || '';
		return div.innerText;
	}
})();

function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this, args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function excerpt(str, maxlen) {
	if (str.length > maxlen) return str.slice(0, maxlen).trimRight() + '...';
	else return str;
}

function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function getText(url, cb) {
	return new Promise(function (resolve, reject) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				localStorage.setItem('data-cache-' + url, this.responseText);
				console.log('cached response', url);
				resolve(this.responseText);
			}
		};
		xmlhttp.onerror = reject;
		xmlhttp.open('GET', url, true);
		xmlhttp.send();
	}).catch(function(err) {
		console.log('used cached response', url);
		var text = localStorage.getItem('data-cache-' + url);
		if (text) return Promise.resolve(text);
		else Promise.reject(err);
	});
}


