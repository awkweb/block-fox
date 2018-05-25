// CONSTANTS
const blockedSitesListId = '#blocked-sites';
const enabledSwitchId = '#enabled-switch';
// CONSTANTS

// INIT
let sites = JSON.parse(localStorage.getItem(blockedSitesKey)) || [];
const blockedSitesListElement = document.querySelector(blockedSitesListId);
sites.forEach((site) => {
    const prettyUrl = getPrettyUrl(site);
    const markup = `
        <div id="${site}" class="options__site">
            <a href="${site}">${prettyUrl}</a>
        </div>
    `;
    blockedSitesListElement.insertAdjacentHTML('afterend', markup);
});

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
