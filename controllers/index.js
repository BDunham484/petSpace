//import express router
const router = require('express').Router();
//set routes 
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes');
//tell router what routes to take depending on which path is present
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
//if no route present call 404 status
router.use((req, res) => {
    res.status(404).end();
});
//export router
module.exports = router;