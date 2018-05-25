// CONSTANTS
const siteDescriptionId = '#description';
// CONSTANTS

// INIT
const blockedSite = localStorage.getItem(blockedSiteKey);
const prettyUrl = getPrettyUrl(blockedSite);
const siteDescriptionElement = document.querySelector(siteDescriptionId);
siteDescriptionElement.innerHTML = `<b>nice try!</b><br><a href="${blockedSite}">${prettyUrl}</a> is blocked.`;
// INIT
