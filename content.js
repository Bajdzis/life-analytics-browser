(function() {
    const FIVE_MINUTES = 300;
    var themeColor = null;
    var unActiveSeconds = 0;
    var isActive = false;
    var isFocus = false;

    function getPayload() {
        return {
            host: window.location.host,
            path: window.location.pathname,
        }
    }

    function getTime() {
        return Math.round((new Date()).getTime() / 1000);
    }

    function createEvent(type) {
        const event = {
            type,
            time: getTime(),
            payload: getPayload()
        };

        if(typeof themeColor === 'string' && themeColor.indexOf("#") === 0) {
            event.color = themeColor;
        }
        console.log(event);
        return event;
    }

    setTimeout(() => {
        if (isActive) {
            unActiveSeconds+=10;
            if(unActiveSeconds > FIVE_MINUTES) {
                isActive = false;
                chrome.runtime.sendMessage(createEvent('stop.inactivity'));
            }
        }
    }, 10000);

    function activity() {
        unActiveSeconds = 0;
        if(isActive === false && isFocus === true) {
            isActive = true;
            chrome.runtime.sendMessage(createEvent('start.active'));
        }
    }
 
    var activityEvents = [
        'mousedown', 'mousemove', 'keydown', 
        'scroll', 'touchstart', 'click'
    ];
 
    activityEvents.forEach(function(eventName) {
        document.addEventListener(eventName, activity, true);
    });

    let unregisterAllVideoPlayer = function() {};

    function registerVideoPlayerActivities () {
        unregisterAllVideoPlayer();

        const videos = document.querySelectorAll('video');
        videos.forEach((video) => {
            video.addEventListener('timeupdate', activity, true);
        })

        unregisterAllVideoPlayer = function() {
            videos.forEach((video) => {
                video.removeEventListener('timeupdate', activity);
            });
        }

    };

    window.addEventListener('click', registerVideoPlayerActivities);

    window.addEventListener('load', function() {
        const meta = document.head.querySelector('meta[name="theme-color"]');
        if (meta) {
            themeColor = meta.content;
        }
        isActive = true;
        chrome.runtime.sendMessage(createEvent('start.load'));
    });

    window.addEventListener('focus', function() {
        isActive = true;
        isFocus = true;
        chrome.runtime.sendMessage(createEvent('start.focus'));
    });

    window.addEventListener('blur', function() {
        isFocus = false;
        if (isActive === true) {
            isActive = false;
            chrome.runtime.sendMessage(createEvent('stop.blur'));
        }
    });

    window.addEventListener('beforeunload', function() {
        if (isActive === true) {
            isActive = false;
            chrome.runtime.sendMessage(createEvent('stop.unload'));
        }
    });

})();
