// require express router
const router = require('express').Router();

// Import all of the API routes from /api
const apiRoutes = require('./api');

// will not be using front end HTML routes yet.  Save for future enhancement
// const htmlRoutes = require('./html/html-routes');

// add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/api', apiRoutes);
// router.use('/', htmlRoutes);

// catch routing errors
router.use((req, res) => {
    res.status(404).send('<h1>😝 404 Error!</h1>');
});

// Export router
module.exports = router;
