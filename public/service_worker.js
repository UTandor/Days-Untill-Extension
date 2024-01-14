export function setBadge(days) {
  if (days !== null) {
    chrome.action.setBadgeText({ text: days.toString() });
    chrome.action.setBadgeBackgroundColor({ color: "#0000FF" });
  }
}