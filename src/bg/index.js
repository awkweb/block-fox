// EVENT LISTENERS
chrome.tabs.onUpdated
  .addListener((tabId, changeInfo, tab) => {
    const enabled =
      localStorage.getItem(enabledSwitchKey) !== null &&
      localStorage.getItem(enabledSwitchKey) === 'true';
    const nuclearEnabled =
      localStorage.getItem(nuclearSwitchKey) !== null &&
      localStorage.getItem(nuclearSwitchKey) === 'true';
    const nuclearTime = Date.parse(localStorage.getItem(nuclearTimeKey));
    const chromeSettingsPageUrl = getSettingsUrl();
    if (enabled && nuclearEnabled && chromeSettingsPageUrl === tab.url) {
      if (nuclearTime > new Date().getTime()) {
        localStorage.setItem(blockedSiteRawKey, null);
        localStorage.setItem(blockedSiteKey, null);
        chrome.tabs.update(tabId, { url: '/src/blocked/index.html' });
      } else if (nuclearTime < new Date().getTime()) {
        localStorage.setItem(nuclearTimeKey, null);
        localStorage.setItem(nuclearSwitchKey, false);
        chrome.tabs.update(tabId, { url: chromeSettingsPageUrl });
      }
    }

    const sites = JSON.parse(localStorage.getItem(blockedSitesKey)) || [];
    const root = getUrlForTab(tab);
    if (!root) {
      return;
    }
    const blocked = sites.includes(root);
    if (enabled && blocked) {
      console.log(tab.url);
      localStorage.setItem(blockedSiteRawKey, tab.url);
      localStorage.setItem(blockedSiteKey, root);
      chrome.tabs.update(tabId, { url: '/src/blocked/index.html' });
    }
  });
// EVENT LISTENERS
