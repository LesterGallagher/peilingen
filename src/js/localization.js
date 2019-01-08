
var _app_userLang = (navigator.language || navigator.userLanguage).slice(0, 2);
if (_app_userLang !== 'nl' && _app_userLang !== 'en') _app_userLang = 'en';

var _app_localization = {
    noConnection: {
        nl: 'Je bent niet verbonden met de server. Je kunt de app nog steeds gebruiken maar de feeds zijn mogelijk verouderd.',
        en: 'You are not connected to the server. You can still use the app but the feeds may be outdated.'
    },
    seats: {
        nl: 'zetels',
        en: 'seats'
    },
    'Dutch House of Representatives Polls': {
        nl: 'Tweede Kamer Peilingen',
        en: 'Dutch House of Representatives Polls'
    },
    'Last updated': {
        nl: 'Laatst geüpdate ',
        en: 'Last updated'
    },
    'ago': {
        nl: 'geleden',
        en: 'ago'
    },
    'latest polls': {
        nl: 'laatse gegevens',
        en: 'latest polls'
    },
    month: {
        nl: 'maand',
        en: 'month'
    },
    quarter: {
        nl: 'kwartaal',
        en: 'quarter'
    },
    year: {
        nl: 'year',
        en: 'jaar'
    },
    since: {
        nl: 'sinds',
        en: 'since'
    },
    about: {
        nl: 'over',
        en: 'about'
    }
};

var _app_feedrecommandations = {
    nl: [
        {
            title: 'P2000 Politie',
            url: 'https://alarmeringen.nl/feeds/discipline/politie.rss',
            site: 'https://alarmeringen.nl/webfeeds.html',
            type: 'rss',
            items: [],
        },
        {
            title: 'P2000 Brandweer',
            url: 'https://alarmeringen.nl/feeds/discipline/brandweer.rss',
            site: 'https://alarmeringen.nl/webfeeds.html',
            type: 'rss',
            items: [],
        },
        {
            title: 'P2000 Ambulance',
            url: 'https://alarmeringen.nl/feeds/discipline/ambulance.rss',
            site: 'https://alarmeringen.nl/webfeeds.html',
            type: 'rss',
            items: [],
        },
        {
            title: 'P2000 Traumaheli',
            url: 'https://alarmeringen.nl/feeds/discipline/trauma.rss',
            site: 'https://alarmeringen.nl/webfeeds.html',
            type: 'rss',
            items: [],
        },
        {
            title: 'Developer on Reddit',
            url: 'https://www.reddit.com/user/Afirus/.rss',
            site: 'https://www.reddit.com/user/Afirus',
            type: 'atom',
            items: [],
        },
        {
            title: 'nu.nl',
            url: 'https://www.nu.nl/rss',
            site: 'https://www.nu.nl',
            type: 'rss',
            items: [],
        },
        {
            title: 'NOS',
            url: 'http://feeds.feedburner.com/nos/zBPL?format=xml',
            site: 'https://nos.nl/',
            type: 'rss',
            default: true,
            items: [],
        },
        {
            title: 'weer.nl',
            url: 'http://www.weer.nl/rss.xml',
            site: 'http://www.weer.nl/',
            type: 'rss',
            default: true,
            items: [],
        },
        {
            title: 'AD',
            url: 'https://www.ad.nl/home/rss.xml',
            site: 'https://www.ad.nl',
            type: 'rss',
            items: [],
        },
        {
            title: 'NRC',
            url: 'https://www.nrc.nl/rss/',
            site: 'https://www.ad.nl',
            type: 'rss',
            items: [],
        },
        {
            title: 'Volkskrant',
            url: 'https://www.volkskrant.nl/voorpagina/rss.xml',
            site: 'https://www.volkskrant.nl',
            type: 'rss',
            items: [],
        },
        {
            title: 'Tweakers',
            url: 'http://feeds.feedburner.com/tweakers/mixed',
            site: 'https://tweakers.net/',
            type: 'rss',
            items: [],
        },
        {
            title: 'Developer Blog',
            url: 'https://esstudio.site/feed',
            site: 'https://esstudio.site',
            type: 'atom',
            items: [],
        }
    ],
    en: [
        {
            title: 'CNN',
            url: 'http://rss.cnn.com/rss/edition.rss',
            site: 'https://edition.cnn.com/',
            type: 'rss',
            items: [],
            default: true,
        },
        {
            title: 'BBC',
            url: 'http://feeds.bbci.co.uk/news/rss.xml?edition=int#',
            site: 'http://www.bbc.com/',
            type: 'rss',
            items: [],
            default: true,
        },
        {
            title: 'JRE',
            url: 'http://podcasts.joerogan.net/feed',
            site: 'http://podcasts.joerogan.net/',
            type: 'rss',
            items: [],
        },
        {
            title: 'Developer on Reddit',
            url: 'https://www.reddit.com/user/Afirus/.rss',
            site: 'https://www.reddit.com/user/Afirus',
            type: 'atom',
            items: [],
        },
        {
            title: 'Developer Blog',
            url: 'https://esstudio.site/feed',
            site: 'https://esstudio.site',
            type: 'atom',
            items: [],
        }
    ]
}

var _app_recommandedfeedsources = {
    nl: [
        {
            title: 'Alarmeringen (P2000)',
            url: 'https://alarmeringen.nl/webfeeds.html'
        },
        {
            title: 'Reddit Feeds Uitgelegd',
            url: 'https://www.reddit.com/wiki/rss',
        }
    ],
    en: [
        {
            title: 'All CNN RSS Feeds',
            url: 'http://edition.cnn.com/services/rss/',
        },
        {
            title: 'Reddit Feeds Explained',
            url: 'https://www.reddit.com/wiki/rss',
        }
    ]
}

for (var key in _app_feedrecommandations) {
    var recommandedFeeds = _app_feedrecommandations[key];
    for(var i = 0; i < recommandedFeeds.length; i++) {
        recommandedFeeds[i].url = removeTrailingSlash(recommandedFeeds[i].url);
        recommandedFeeds[i].site = removeTrailingSlash(recommandedFeeds[i].site);
    }
}

function _(input) {
    for (var key in _app_localization) {
        if (_app_localization.hasOwnProperty(key)) {
            var obj = _app_localization[key];
            if (input.toLowerCase().trim() === key.toLowerCase()) {
                var translation = obj[_app_userLang];
                if (!translation) continue;
                if (isCharUppercase(input[0])) {
                    translation = translation[0].toUpperCase() + translation.slice(1);
                }
                return translation;
            }
        }
    }
    return input;
}

function removeTrailingSlash(url) {
    return url.replace(/\/+$/, '');
}

function doLocalizationOnPageInit(event) {
    event.target.querySelectorAll('.localization').forEach(function(element) {
        element.innerText = _(element.innerText);
    });
    event.target.querySelectorAll('.ons-tabbar-localization').forEach(function(element) {
        element.querySelectorAll('.tabbar__label').forEach(function(tabbarLabel) {
            tabbarLabel.innerText = _(tabbarLabel.innerText);
        });
    });
}

function isCharUppercase(char) {
    return char.toUpperCase() === char;
}
