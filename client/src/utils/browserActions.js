const browserActions = {
    getLocalStorage: (key) => {
        return window.localStorage.getItem(key);
    },
    setLocalStorage: (key, data) => {
        window.localStorage.setItem(key, data);
        return true;
    },
    removeLocalStorage: (key) => {
        window.localStorage.removeItem(key);
        return true;
    },
};

export default browserActions;

/**
 * Contains methods to handel all possible browser storage actions
 */
