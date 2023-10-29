const router = require('express').Router()

const userRoutes = require('../app/API/v1/users/UserRoutes')

router.use('/api/v1/users', userRoutes)

module.exports = router;