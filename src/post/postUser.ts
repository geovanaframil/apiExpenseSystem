import { Router, Request, Response } from "express";
import User from '../interfaces/userInterface'
import readData from "../utils/readDataJson";
import saveDataJson from "../utils/saveDataJson";
import createIdByUser from "../utils/createIdUsers";
import validateUser from "../utils/validateUsers";
const router = Router()
const Joi = require('joi')
const data = require("../../database/users.json");
const users: User[] = data;

const schema = Joi.object({
   id: Joi.string(),
   name: Joi.string().required(),
   lastName: Joi.string().required(),
   email: Joi.string().email().required(),
   expenses: Joi.array().min(1).items(
      Joi.object({
         id: Joi.string(),
         name: Joi.string().required(),
         userId: Joi.string(),
         amount: Joi.number().required(),
         status: Joi.string().required(),
         _category: Joi.object({
            id: Joi.string(),
            name: Joi.string().required()
         }).required()
      })
   ).required()
})

function handleBodyUser(returnAPI: any, idUser: string): User {
   const expenses = returnAPI.expenses.map((expense: any) => ({
      id: expense.id,
      name: expense.name,
      userId: idUser,
      amount: expense.amount,
      status: expense.status,
      _category: {
         id: expense._category.id,
         name: expense._category.name
      }
   }))

   const user: User = {
      id: idUser,
      name: returnAPI.name,
      lastName: returnAPI.lastName,
      email: returnAPI.email,
      expenses: expenses
   }

   return user
}

router.post('/users', (req:Request, res:Response) => {
   const body = req.body
   const { error, value } =  schema.validate(req.body)
   if (error) {
      res.status(404).send(error.details[0].message);
      return
   } else {
      const userId = createIdByUser(body.name, body.email)
      const bodyUser = handleBodyUser(body, userId)
      users.push(bodyUser)
      res.status(200).json('Usuario cadastrado com sucesso!')
      saveDataJson(users, 'users')
   }
})

export default router