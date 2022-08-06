const express = require('express')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const {
  checkId,
  checkRolesBody
} = require('../middlewares/validator.handle.js')
const {
  getAllEmplooyes,
  findEmplooye,
  createEmplooye,
  updateEmplooye,
  deleteEmplooye
} = require('../services/empleados.service.js')
const {
  addRolEmployee,
  updateRolEmployee,
  removeRolEmployee
} = require('../services/rolesEmpleados.service.js')

const employeeRoute = express.Router()

const msg = {
  notFound: 'Empleado no encontrado',
  delete: 'Empleado eliminado'
}

employeeRoute.get('/', async (req, res, next) => {
  try {
    const employe = await getAllEmplooyes()
    res.json(employe)
  } catch (error) {
    next(error)
  }
})

employeeRoute.get('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const employe = await findEmplooye(id)

    if (!employe) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(employe)
  } catch (error) {
    next(error)
  }
})

employeeRoute.post('/', checkRolesBody, async (req, res, next) => {
  try {
    const { body } = req
    const { roles, ...dataEmployee } = body

    const employe = await createEmplooye(dataEmployee)
    await addRolEmployee(employe.idEmp, roles)

    delete employe.dataValues.passwordEmp
    res.json(employe)
  } catch (error) {
    next(error)
  }
})

employeeRoute.put('/:id', checkId, checkRolesBody, async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const { roles, ...dataEmployee } = body

    const employe = await updateEmplooye(id, dataEmployee)

    if (!employe) return ERROR_RESPONSE.notFound(msg.notFound, res)

    await updateRolEmployee(employe.idEmp, roles)

    delete employe.dataValues.passwordEmp
    res.json(employe)
  } catch (error) {
    next(error)
  }
})

employeeRoute.delete('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params

    await removeRolEmployee(id)
    const employe = await deleteEmplooye(id)

    if (!employe) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
})

module.exports = employeeRoute
