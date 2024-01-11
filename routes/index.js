const router = require('express').Router();

const apiRoutes = require('./apiRoutes');

router.use('/apiRoutes', apiRoutes);

router.use((req, res) => res.send('Wrong route'));

module.exports = router;