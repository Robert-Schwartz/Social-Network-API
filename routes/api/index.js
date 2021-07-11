// Require express router
const router = require('express').Router();

// Import API routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// USE Routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Export API routes
module.exports = router;