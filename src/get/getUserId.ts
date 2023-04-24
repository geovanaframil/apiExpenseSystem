import { Router, Request, Response } from "express"
import User from '../interfaces/userInterface'
import categoryInterface from '../interfaces/userInterface'
import readData from "../utils/readDataJson"
import { ICategoryExpenses } from "../interfaces/categoryInterface"
const router = Router()

let users: User[]

async function initializecategories() {
    const data = await readData("users");
    users = data as User[];
  }
  
  initializecategories();
  
  router.get("/users/:id", async (req: Request, res: Response) => {
    let categories: categoryInterface[] = await readData('categories')
    const user: User[] = await readData('users')
    const id = req.params.id
    const userId = users.find((item) => item.id === id);

    if (userId) {
      const categoriesExpenses: ICategoryExpenses[] = categories.map(category => {
        return {
          ...category,
          _expenses: []
        }
      })

      userId._expenses.forEach(element => {
        const categories = categoriesExpenses.find(category => category.id === element.categoryID)
      if (categories) {
        categories._expenses.push(element);
      }
      })

      const categoriesUpdated = {
        ...userId,
        _categories: [...categoriesExpenses]
      }
      return res.status(200).json(categoriesUpdated);
    } else {
      res.status(404).json(`Usuário correspondente ao id ${id} não existe`);
    }
  });
  
  export default router;