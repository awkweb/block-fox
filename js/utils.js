const urlMatch = (url) => {
    const re = /([a-z]{1,2}tps?):\/\/((?:(?!(?:\/|#|\?|&)).)+)(?:(\/(?:(?:(?:(?!(?:#|\?|&)).)+\/))?))?(?:((?:(?!(?:\.|$|\?|#)).)+))?(?:(\.(?:(?!(?:\?|$|#)).)+))?(?:(\?(?:(?!(?:$|#)).)+))?(?:(#.+))?/i;
    return url.match(re);
};

const getPrettyUrl = (url) => {
    const found = urlMatch(url);
    if (!found) {
        return;
    }
    return found[2];
};

const getUrlForTab = (tab) => {
    const url = tab.url;
    const found = urlMatch(url);
    if (!found) {
        return;
    }
    return `${found[1]}://${found[2]}`;
};

const updateSwitchForId = (id, value) => {
    const el = document.querySelector(id);
    el.checked = value;
};
