window.addEventListener('load', function () {

    const streamButton = document.getElementById("streamButton");
    const linkButton = document.getElementById("linkButton");
    const elem = document.getElementById("streamId");

    streamButton.addEventListener('click', function(){
        chrome.storage.sync.set({streamId: elem.value}, function() {
            console.log('Value is set to ' + elem.value);
        });
    });
    
    linkButton.addEventListener('click', function(){
        chrome.tabs.create({ url: "https://life-analytics.web.app/" });
    });

    chrome.storage.sync.get(['streamId'], function(result) {
        console.log(result);
        elem.value = result.streamId;
    });
});

