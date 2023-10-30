const router = require('express').Router()
const ReflectionController = require('./ReflectionController')
const authentication = require("../../../../middleware/authentication");

router.post('/',authentication, ReflectionController.createReflection)
router.get('/',authentication, ReflectionController.getReflection)

module.exports = router