const getRoutes = require('express').Router();


const connectRoutes = require('./apiRoutes');
Router.use(connectRoutes, '/apiRoutes');

router.use((req, res)=> {
    return res.send('This is the wrong route');
});

module.exports = router;