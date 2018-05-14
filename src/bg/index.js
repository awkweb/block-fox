// EVENT LISTENERS
chrome.tabs.onUpdated
  .addListener((tabId, changeInfo, tab) => {
    const enabled = localStorage.getItem(enabledSwitchKey) !== null &&
      localStorage.getItem(enabledSwitchKey) === 'true';
    const sites = JSON.parse(localStorage.getItem(blockedSitesKey)) || [];
    const root = getUrlForTab(tab);
    if (!root) {
      return;
    }
    const blocked = sites.includes(root)
    if (enabled && blocked) {
      localStorage.setItem(blockedSiteKey, root);
      chrome.tabs.update(tabId, { url: '/src/blocked/index.html' });
    }
  });
// EVENT LISTENERS
