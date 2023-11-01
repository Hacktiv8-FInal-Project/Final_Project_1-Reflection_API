const { findReflectionsById } = require('../app/API/v1/reflections/ReflectionController')

const authorization = async (req, res, next) => {
  try {
    const reflectionId = req.params.id
    const authenticatedUser = req.user
    const reflectionFindById = await findReflectionsById(reflectionId)
    console.log(reflectionFindById);

    if (reflectionFindById === undefined) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    if (reflectionFindById.userid === authenticatedUser.id) {
      return next()
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

  } catch (error) {
    console.log(error.message)
  }
}

module.exports = authorization