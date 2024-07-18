let isActive = false;

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
