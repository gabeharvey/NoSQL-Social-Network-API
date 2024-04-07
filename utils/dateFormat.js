// Imports Date Information from Moment Library
const moment = require('moment');

// Returns Date Information
const formatDate = (date) => {
    return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
};

// Exports Date Information
module.exports = formatDate;