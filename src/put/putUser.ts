import { Router, Request, Response } from "express"
import User from '../interfaces/userInterface'
import readData from "../utils/readDataJson"
import saveDataJson from "../utils/saveDataJson"
const router = Router()
const Joi = require('joi')

const data = require("../../database/users.json")
const users: User[] = data

const schema = Joi.object({
   name: Joi.string(),
   lastName: Joi.string(),
   email: Joi.string().email()
})

router.put('/users/:id', (req:Request, res:Response) => {
    const param = req.params.id
    const body = req.body
    const data:User[] = readData('users')
    const indexJson = data.findIndex((obj) => obj.id === param)
    const { error, value } = schema.validate(body)

    if (indexJson === -1) {
        return res
          .status(404)
          .json(`Usuario correspondente ao id ${param} não existe`)
      }
    
      if (error) {
        return res.status(400).send(error.details[0].message)
      } else {
        const currentUser = users[indexJson]
        const userUpdate = { ...currentUser, ...body }
        users.splice(indexJson, 1, userUpdate)
    
        res
        .status(200)
        .json({ message: "Usuario atualizado com sucesso", userUpdate })
        saveDataJson(users, "users")
    }
})

export default router