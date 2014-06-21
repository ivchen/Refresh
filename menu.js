// Create menu items
chrome.contextMenus.create({"title": "Refresh all", "contexts":["page"],
                                     "onclick": refreshAll});
chrome.contextMenus.create({"title": "Refresh right", "contexts":["page"],
                                     "onclick": refreshRight});

//Refresh all tabs in current window
function refreshAll(info, tab) {
  //log info
  //console.log("item " + info.menuItemId + " was clicked");
  //console.log("info: " + JSON.stringify(info));
  //console.log("tab: " + JSON.stringify(tab));

  //var tabsList = new Array();

  chrome.tabs.query({lastFocusedWindow: true}, function (tabsList){
    //NOTE: if you have extensions page open, will stop reloading pages up to the ext page.
    //also, will not print out to console if ext page is reloaded
    for(var i = 0; i < tabsList.length; i++){
        chrome.tabs.reload(tabsList[i].id);
    }
  });
}

//Refresh all tabs to the right in current window 
function refreshRight(info, tab) {
    //get current tab's index
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        //index is tabs position in current window
        var curr = tabs[0].index;
        //reload all tabs to right of current index
        chrome.tabs.query({lastFocusedWindow: true}, function (tabsList){
          for(var i = curr + 1; i < tabsList.length; i++){
            chrome.tabs.reload(tabsList[i].id);
          }
        });
    });
}