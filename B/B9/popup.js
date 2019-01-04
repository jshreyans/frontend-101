chrome.tabs.onUpdated.addListener(function(){
    chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
        var url = tabs[0].url;
        if (url == "https://bits-apogee.org/" || url == "https://bits-oasis.org/" || url == "https://bits-bosm.org/") {
            // console.log("Hurray!");
            chrome.tabs.executeScript({
                code: 'console.log("Hurray!");'
            })
        }
    });
});

