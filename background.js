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
      function: (state) => {
        function cancelOnClick(event) {
          event.stopPropagation();
          event.preventDefault();
        }

        if (state) {
          document.body.contentEditable = true;
          document.body.addEventListener("click", cancelOnClick, true);
        } else {
          document.body.contentEditable = false;
          document.body.removeEventListener("click", cancelOnClick, true);
        }
      },
      args: [isActive],
    });
  });
});
