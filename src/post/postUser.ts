import { Router, Request, Response } from "express";
import User from '../interfaces/userInterface'
import readData from "../utils/readDataJson";
import saveDataJson from "../utils/saveDataJson";
import createIdByUser from "../utils/createIdUsers";
import validateUserInput from "../utils/validateUsers";
const router = Router()

const data = readData('users')
const users: User[] = data

function handleBodyUser(returnAPI: any, id:string): User {
   const User = {
      id:id,
      name: returnAPI.name,
      lastName: returnAPI.lastName,
      email:returnAPI.email,
   }
   return User;
}

router.post('/users', (req:Request, res:Response) => {
   const body = req.body
   const validationResult = validateUserInput(body)

   if (!validationResult.valid) {
      res.status(404).json(validationResult.errors);
      return
   }

   const userId = createIdByUser(body.name, body.email)
   const bodyUser = handleBodyUser(body, userId)

   if(bodyUser) {
      const users = readData('users')
      users.push(bodyUser)
      saveDataJson(users, 'users')
      res.status(200).json('Usuario cadastrado com sucesso!')
   } else {
      res.status(400).json('Ops! algo deu errado')
   }
})

export default router