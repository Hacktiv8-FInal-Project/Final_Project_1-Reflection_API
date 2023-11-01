const router = require('express').Router()
const ReflectionController = require('./ReflectionController')
const authentication = require("../../../../middleware/authentication");
const authorization = require("../../../../middleware/authorization")

router.post('/',authentication, ReflectionController.createReflection)
router.get('/',authentication, ReflectionController.getReflection)
router.put('/:id',authentication, authorization, ReflectionController.updateReflection)
router.delete('/:id',authentication, authorization, ReflectionController.deleteReflections)

module.exports = router