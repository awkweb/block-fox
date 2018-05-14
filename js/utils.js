const getUrlForTab = (tab) => {
    const url = tab.url;
    const re = /([a-z]{1,2}tps?):\/\/((?:(?!(?:\/|#|\?|&)).)+)(?:(\/(?:(?:(?:(?!(?:#|\?|&)).)+\/))?))?(?:((?:(?!(?:\.|$|\?|#)).)+))?(?:(\.(?:(?!(?:\?|$|#)).)+))?(?:(\?(?:(?!(?:$|#)).)+))?(?:(#.+))?/i;
    const found = url.match(re);
    if (!found) {
        return;
    }
    return `${found[1]}://${found[2]}`;
};

const updateSwitchForId = (id, value) => {
    const el = document.querySelector(id);
    el.checked = value;
};
