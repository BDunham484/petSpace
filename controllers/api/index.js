//import express router
const router = require('express').Router();
//set routes
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes')
const commentRoutes = require('./comment-routes');
//tell router what routes to take depending on which path is present
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
//export router
module.exports = router;