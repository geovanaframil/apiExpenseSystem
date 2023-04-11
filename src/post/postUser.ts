import { Router, Request, Response } from "express";
import User from '../interfaces/userInterface'
import readData from "../utils/readDataJson";
import saveDataJson from "../utils/saveDataJson";
const router = Router()

const data = readData('users')
const users: User[] = data

function handleBodyUser(returnAPI: any, id:number): User {
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
   if(body) {
    saveDataJson(body, 'users')
    res.status(200).json('Usuario cadastrado com sucesso!')
   } else {
    res.status(404).json('Ops! algo deu errado')
   }
})

export default router