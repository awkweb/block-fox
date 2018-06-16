// CONSTANTS
const siteDescriptionId = '#description';
// CONSTANTS

// INIT
const siteDescriptionElement = document.querySelector(siteDescriptionId);
const blockedSite = localStorage.getItem(blockedSiteKey);
let innerHTML;
if (blockedSite !== 'null') {
    const prettyUrl = getPrettyUrl(blockedSite);
    innerHTML = `
        <b>nice try!</b>
        <br>
        <a href="${blockedSite}">${prettyUrl}</a> is blocked.
    `;
} else {
    const nuclearTime = new Date(localStorage.getItem(nuclearTimeKey));
    innerHTML = `
        <b>focus mode enabled</b>
        <br>
        turns off at ${nuclearTime.getHours()}:${nuclearTime.getMinutes()}
    `;
}
siteDescriptionElement.innerHTML = innerHTML;
// INIT
