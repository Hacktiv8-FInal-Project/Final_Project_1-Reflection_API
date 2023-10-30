const router = require('express').Router()

const userRoutes = require('../app/API/v1/users/UserRoutes')
const reflectionRoutes = require('../app/API/v1/reflections/ReflectionRoutes')

router.use('/api/v1/users', userRoutes)
router.use('/api/v1/reflections', reflectionRoutes)

module.exports = router;