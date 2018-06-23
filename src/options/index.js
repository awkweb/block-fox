// CONSTANTS
const blockedSitesListId = '#blocked-sites';
const enabledSwitchId = '#enabled-switch';
const nuclearSwitchId = '#nuclear-switch';
const focusDescriptionId = '#focus-description';
const addContainerClass = '.options__sites-add'
const focusOptionsContainerClass = '.options__popup-focus';
const popUpClass = '.options__popup';
const popUpButtonCancelClass = '.options__popup-button.cancel';
const popUpButtonCloseClass = '.options__popup-close';
const popUpButtonConfirmClass = '.options__popup-button.confirm';
// CONSTANTS

// METHODS
const addOptionsSiteElement = (site, index) => {
    const prettyUrl = getPrettyUrl(site);
    const markup = `
        <div id="site-${index}" class="options__site">
            <button id="delete-${index}" class="options__site-delete" data-site="${site}"></button>
            <a href="${site}">${site}</a>
            ${ site in visitedCounts ? `<div class="options__site-count"><span>${visitedCounts[site]}</span></div>` : ''}
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
const visitedCounts = JSON.parse(localStorage.getItem(visitedCountsKey)) || {};
let sites = JSON.parse(localStorage.getItem(blockedSitesKey)) || [];
const blockedSitesListElement = document.querySelector(blockedSitesListId);
sites.forEach((site, index) => addOptionsSiteElement(site, index));

const enabled =
    localStorage.getItem(enabledSwitchKey) !== null &&
    localStorage.getItem(enabledSwitchKey) === 'true';
updateSwitchForId(enabledSwitchId, enabled);
const nuclearEnabled =
    localStorage.getItem(nuclearSwitchKey) !== null &&
    localStorage.getItem(nuclearSwitchKey) === 'true';
updateSwitchForId(nuclearSwitchId, nuclearEnabled);
// INIT

// EVENT LISTENERS
const enabledSwitchElement = document.querySelector(enabledSwitchId);
enabledSwitchElement.addEventListener('change', () =>
    localStorage.setItem(enabledSwitchKey, enabledSwitchElement.checked));

const popUpElement = document.querySelector(popUpClass);
const nuclearSwitchElement = document.querySelector(nuclearSwitchId);
nuclearSwitchElement.addEventListener('change', () => {
    nuclearSwitchElement.checked = false;
    popUpElement.classList.remove('hidden');
});

const popUpButtonCloseElement = document.querySelector(popUpButtonCloseClass);
popUpButtonCloseElement.addEventListener('click', () => popUpElement.classList.add('hidden'));
const popUpButtonCancelElement = document.querySelector(popUpButtonCancelClass);
popUpButtonCancelElement.addEventListener('click', () => popUpElement.classList.add('hidden'));

const popUpButtonConfirmElement = document.querySelector(popUpButtonConfirmClass);
popUpButtonConfirmElement.addEventListener('click', () => {
    if (!enabledSwitchElement.checked) {
        enabledSwitchElement.checked = true;
        localStorage.setItem(enabledSwitchKey, enabledSwitchElement.checked);
    }
    
    nuclearSwitchElement.checked = true;
    let nuclearTime = new Date();
    nuclearTime.setMinutes(nuclearTime.getMinutes() + focusTime);
    localStorage.setItem(nuclearTimeKey, nuclearTime);
    localStorage.setItem(nuclearSwitchKey, true);
    popUpElement.classList.add('hidden');
    location.reload();
});

let focusTime = 30;
const focusOptionsContainerElement = document.querySelector(focusOptionsContainerClass);
const focusButtons = focusOptionsContainerElement.getElementsByTagName('button');
const focusDescriptionElement = document.querySelector(focusDescriptionId);
Array.prototype.forEach.call(focusButtons, button =>
    button.addEventListener('click', () => {
        Array.prototype.forEach.call(focusButtons, button => button.classList.remove('selected'))
        button.classList.add('selected');
        focusTime = parseInt(button.dataset.time);
        focusDescriptionElement.innerHTML = focusTime;
    })
);

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
