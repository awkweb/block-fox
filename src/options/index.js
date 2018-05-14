// CONSTANTS
const blockedSitesTextareaId = '#blocked-sites';
const enabledSwitchId = '#enabled-switch';
// CONSTANTS

// INIT
let sites = JSON.parse(localStorage.getItem(blockedSitesKey)) || [];
const blockedSitesTextareaElement = document.querySelector(blockedSitesTextareaId);
blockedSitesTextareaElement.value = sites;
const enabled = localStorage.getItem(enabledSwitchKey) !== null &&
                localStorage.getItem(enabledSwitchKey) === 'true';
updateSwitchForId(enabledSwitchId, enabled);
// INIT

// EVENT LISTENERS
const enabledSwitchElement = document.querySelector(enabledSwitchId);
enabledSwitchElement.addEventListener('change', () =>
    localStorage.setItem(enabledSwitchKey, enabledSwitchElement.checked));
// const siteSwitchElement = document.querySelector(siteSwitchId);
// siteSwitchElement.addEventListener('change', () => {
//     chrome.tabs.getSelected(null, (tab) => {
//         const url = getUrlForTab(tab);
//         if (siteSwitchElement.checked) {
//             sites.push(url)
//         } else {
//             sites = sites.filter(site => site !== url);
//         }
//         localStorage.setItem(blockedSitesKey, JSON.stringify(sites));
//     });
// });
// EVENT LISTENERS
