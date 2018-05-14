// CONSTANTS
const enabledSwitchId = '#enabled-switch';
const siteRowId = '#site-row';
const siteSwitchId = '#site-switch';
const tabUrlId = '#tab-url';
// CONSTANTS

// INIT
let sites = JSON.parse(localStorage.getItem(blockedSitesKey)) || [];
chrome.tabs.getSelected(null, (tab) => {
    const root = getUrlForTab(tab);
    console.log(root);
    if (!root) {
        const el = document.querySelector(siteRowId);
        el.classList.add('hidden');
        return;
    }
    const tabUrlElement = document.querySelector(tabUrlId);
    tabUrlElement.innerHTML = root;

    const blocked = sites.includes(root)
    updateSwitchForId(siteSwitchId, blocked);
});
const enabled = localStorage.getItem(enabledSwitchKey) !== null &&
                localStorage.getItem(enabledSwitchKey) === 'true';
updateSwitchForId(enabledSwitchId, enabled);
// INIT

// EVENT LISTENERS
const enabledSwitchElement = document.querySelector(enabledSwitchId);
enabledSwitchElement.addEventListener('change', () =>
    localStorage.setItem(enabledSwitchKey, enabledSwitchElement.checked));
const siteSwitchElement = document.querySelector(siteSwitchId);
siteSwitchElement.addEventListener('change', () => {
    chrome.tabs.getSelected(null, (tab) => {
        const url = getUrlForTab(tab);
        if (siteSwitchElement.checked) {
            sites.push(url)
        } else {
            sites = sites.filter(site => site !== url);
        }
        localStorage.setItem(blockedSitesKey, JSON.stringify(sites));
    });
});
// EVENT LISTENERS
