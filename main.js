chrome.runtime.onMessage.addListener(function (event) { 
  chrome.storage.sync.get(['streamId'], function(result) {
    fetch(`https://auto-time-72f2c.firebaseio.com/streams/${result.streamId}/events.json`, {
      method:'POST',
      body: JSON.stringify(event)
    }).then(console.log).catch(console.error)
  });
});