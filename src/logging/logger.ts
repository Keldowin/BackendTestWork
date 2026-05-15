const { appName } = require("../config/index.js");

const index = (message) => {
    console.log(`[${appName}] ${message}`);
};

module.exports = index;