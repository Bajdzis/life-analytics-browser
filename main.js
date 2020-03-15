chrome.runtime.onMessage.addListener(function (request) { 
  chrome.storage.sync.get(['streamId'], function(result) {
    fetch(`https://auto-time-72f2c.firebaseio.com/streams/${result.streamId}/events.json`, {
      method:'POST',
      body: JSON.stringify({
          type: request.type, 
          timestamp: (new Date()).getTime(),
          payload: request
      })
    })
  });
});