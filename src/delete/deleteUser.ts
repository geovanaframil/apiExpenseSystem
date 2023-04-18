import { Router, Request, Response } from "express"
import User from '../interfaces/userInterface'
import readData from "../utils/readDataJson"
import saveDataJson from "../utils/saveDataJson"
const router = Router()

const data = require("../../database/users.json")
const users: User[] = data

router.delete("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = users.find((item) => item.id === id);
    if (userId) {
      let userObject = users.filter((item) => item.id !== id);

      res.status(200).json("Usuario removido com sucesso");

      saveDataJson(userObject, "users");

      return res.status(200).json(userId);
    } else {
      res.status(404).json(`Usuário correspondente ao id ${id} não existe`);
    }
  });

  export default router;