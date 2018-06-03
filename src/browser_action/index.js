// CONSTANTS
const enabledSwitchId = '#enabled-switch';
const siteRowId = '#site-row';
const siteSwitchId = '#site-switch';
const tabUrlId = '#tab-url';
// CONSTANTS

// INIT
const settingsLink = `chrome-extension://${chrome.runtime.id}/src/options/index.html`;
const markup = `<a href="${settingsLink}" class="popup__row-link" target="_blank">Settings</a>`;
const footerElement = document.querySelector('footer');
footerElement.insertAdjacentHTML('afterend', markup);

let sites = JSON.parse(localStorage.getItem(blockedSitesKey)) || [];
chrome.tabs.getSelected(null, (tab) => {
    const root = getUrlForTab(tab);
    if (!root) {
        const el = document.querySelector(siteRowId);
        el.classList.add('hidden');
        return;
    }
    const tabUrlElement = document.querySelector(tabUrlId);
    const prettyUrl = getPrettyUrl(root);
    tabUrlElement.innerHTML = `Block <b>${prettyUrl}</b>?`;

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
            sites.push(url);
        } else {
            sites = sites.filter(site => site !== url);
        }
        localStorage.setItem(blockedSitesKey, JSON.stringify(sites));
    });
});
// EVENT LISTENERS
