import { Router, Request, Response } from "express";
import User from '../interfaces/userInterface'
import readData from "../utils/readDataJson";

const router = Router()

router.get('/users', (req:Request, res:Response) => {
    const usersData = readData('users')
    if(usersData.length !== 0) {
        res.status(200).json(usersData)
    } else {
        res.status(400).json('Não existe usuario cadastrados no momento!')
    }
})

export default router