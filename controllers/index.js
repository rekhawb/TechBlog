const router = require('express').Router();
const homeRoutes= require('./home-routes');
const blogRoutes= require('./blog-routes');


const apiRoutes = require('./api');
const userRoutes = require('./user-routes');



router.use('/', homeRoutes);
router.use('/blog', blogRoutes);
router.use('/api', apiRoutes);

//router.use('/events', eventsRoutes);
//router.use('/donation', donationRoutes);
//router.use('/calevent',caleventRoutes);

module.exports = router;