// Import Route Models
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Adds Routes to Router Object
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Exports Router Object
module.exports = router;