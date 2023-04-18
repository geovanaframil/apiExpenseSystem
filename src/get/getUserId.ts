import { Router, Request, Response } from "express"
import User from '../interfaces/userInterface'
import readData from "../utils/readDataJson"
const router = Router()

let users: User[]

async function initializecategories() {
    const data = await readData("users");
    users = data as User[];
  }
  
  initializecategories();
  
  router.get("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = users.find((item) => item.id === id);
    if (userId) {
      return res.status(200).json(userId);
    } else {
      res.status(404).json(`Usuário correspondente ao id ${id} não existe`);
    }
  });
  
  export default router;