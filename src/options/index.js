// CONSTANTS
const blockedSitesListId = '#blocked-sites';
const enabledSwitchId = '#enabled-switch';
const nuclearSwitchId = '#nuclear-switch';
const addContainerClass = '.options__sites-add'
// CONSTANTS

// METHODS
const addOptionsSiteElement = (site, index) => {
    const prettyUrl = getPrettyUrl(site);
    const markup = `
        <div id="site-${index}" class="options__site">
            <button id="delete-${index}" class="options__site-delete" data-site="${site}"></button>
            <a href="${site}">${site}</a>
        </div>
    `;
    blockedSitesListElement.insertAdjacentHTML('afterend', markup);
    const deleteElement = document.querySelector(`#delete-${index}`);
    deleteElement.addEventListener('click', () => {
        sites = sites.filter(site => site !== deleteElement.dataset.site);
        localStorage.setItem(blockedSitesKey, JSON.stringify(sites));
        const siteElement = document.querySelector(`#site-${index}`);
        siteElement.parentNode.removeChild(siteElement);
    });
};
// METHODS

// INIT
chrome.tabs.getSelected(null, (tab) => {
    if (`chrome-extension://${chrome.runtime.id}/src/options/index.html` === tab.url) {
        console.log('options page');
    }
});

let sites = JSON.parse(localStorage.getItem(blockedSitesKey)) || [];
const blockedSitesListElement = document.querySelector(blockedSitesListId);
sites.forEach((site, index) => addOptionsSiteElement(site, index));

const enabled = localStorage.getItem(enabledSwitchKey) !== null &&
                localStorage.getItem(enabledSwitchKey) === 'true';
updateSwitchForId(enabledSwitchId, enabled);

const nuclearEnabled = localStorage.getItem(nuclearSwitchKey) !== null &&
    localStorage.getItem(nuclearSwitchKey) === 'true';
updateSwitchForId(nuclearSwitchId, nuclearEnabled);
// INIT

// EVENT LISTENERS
const enabledSwitchElement = document.querySelector(enabledSwitchId);
enabledSwitchElement.addEventListener('change', () =>
    localStorage.setItem(enabledSwitchKey, enabledSwitchElement.checked));

const nuclearSwitchElement = document.querySelector(nuclearSwitchId);
nuclearSwitchElement.addEventListener('change', () =>
    localStorage.setItem(nuclearSwitchKey, nuclearSwitchElement.checked));

const addContainerElement = document.querySelector(addContainerClass);
const inputElements = addContainerElement.getElementsByTagName('input');
const addInputElement = inputElements[0];
const addButtonElement = inputElements[1];
addContainerElement.addEventListener('submit', () => {
    if (addInputElement.value && addInputElement.value.length && !sites.includes(addInputElement.value)) {
        addOptionsSiteElement(addInputElement.value, sites.length);
        sites.push(addInputElement.value);
        localStorage.setItem(blockedSitesKey, JSON.stringify(sites));
        addInputElement.value = '';
    }
});
// EVENT LISTENERS
