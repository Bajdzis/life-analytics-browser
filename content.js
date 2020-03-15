window.addEventListener('load', function() {
    chrome.runtime.sendMessage({
        type: 'load',
        hostname: window.location.hostname,
        pathname: window.location.pathname,
    });
});

window.addEventListener('focus', function() {
    chrome.runtime.sendMessage({
        type: 'focus',
        hostname: window.location.hostname,
        pathname: window.location.pathname,
    });
});

window.addEventListener('beforeunload', function() {
    chrome.runtime.sendMessage({
        type: 'beforeunload',
        hostname: window.location.hostname,
        pathname: window.location.pathname,
    });
});


