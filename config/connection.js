// Imports from Mongoose Library
const { connect, connection } = require('mongoose');

// Connection Established to MongoDB Database
connect('mongodb://localhost/Social-Network', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Export Connection
module.exports = connection;