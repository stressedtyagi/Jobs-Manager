const getLocalStorage = (key) => {
    return window.localStorage.getItem(key);
};

const setLocalStorage = (key, data) => {
    window.localStorage.setItem(key, data);
    return true;
};

const removeLocalStorage = (key) => {
    window.localStorage.removeItem(key);
    return true;
};

module.exports = {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage,
};
