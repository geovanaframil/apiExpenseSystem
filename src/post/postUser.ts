import { Router, Request, Response } from "express"
import User from '../interfaces/userInterface'
import readData from "../utils/readDataJson"
import saveDataJson from "../utils/saveDataJson"
import createIdByUser from "../utils/createIdUsers"
import BodyUser from '../interfaces/userInterface'
import Joi from 'joi'

const router = Router()

export const schemaUser: Joi.ObjectSchema<BodyUser> = Joi.object({
   name: Joi.string().required(),
   lastName: Joi.string().required(),
   email: Joi.string().email().required(),
});

router.post('/users', async (req:Request, res:Response) => {
   const user: User[] = await readData('users')
   const body = req.body
   const { error} =  schemaUser.validate(req.body)

   if (error) {
      res.status(404).send(error.details[0].message);
      return
   } else {
      const userId = createIdByUser(body.name, body.email)

      const userResult: User = {
         id: userId,
         name: body.name,
         lastName: body.lastName,
         email: body.email,
         _expenses: [],
      }

      user.push(userResult)
      res.status(200).json('Usuario cadastrado com sucesso!')
      saveDataJson(user, 'users')
   }
})

export default router