// Establish Express Router and Import Routes
const router = require('express').Router();
const apiRoutes = require('./api-routes');

// Establish Routers
router.use('/api', apiRoutes);
router.use((req, res) => {
    return res.send('Invalid Route');
});

// Export Router
module.exports = router;