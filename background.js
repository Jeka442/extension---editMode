let isActive = false;


chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "elementToRemove",
    title: "remove element",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "elementToRemove") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: ()=>{
        window.capturedElement.remove();
      }
    });
  }
});



chrome.action.onClicked.addListener((tab) => {
  isActive = !isActive;

  if (isActive) {
    chrome.action.setBadgeText({ text: "active" });
    chrome.action.setBadgeBackgroundColor({ color: "#64b2f5" });
  } else {
    chrome.action.setBadgeText({ text: "" });
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: toggleEditMode,
      args: [isActive],
    });
  });
});

function toggleEditMode(state) {
  if (state) {
    document.body.contentEditable = true;
  } else {
    document.body.contentEditable = false;
  }
}
