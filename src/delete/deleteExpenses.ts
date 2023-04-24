import { Router, Request, Response } from "express";
import IExpense from "../interfaces/expenseInterface";
import saveData from "../utils/saveDataJson";
import readData from "../utils/readDataJson";
import User from "../interfaces/userInterface";

const router = Router();
const data = require("../../database/expenses.json");
const expenses: IExpense[] = data

router.delete("/expenses/:expenseID", async (req: Request, res: Response) => {
  const expenses: IExpense[] = await readData('expenses')
  const user: User[] = await readData('users')
  const id = req.params.expenseID

  const expenseId = expenses.find((item) => item.id === id)

  if (expenseId) {
    const idUser = expenseId.userID
    const expenseIndex = user.findIndex((item) => item.id === idUser)

    user[expenseIndex]._expenses = user[expenseIndex]._expenses.filter(item => item.id !== id)

    const resultExpenses = expenses.filter(expense => expense.id !== id)
    res.status(200).json("Despesa removida com sucesso");

    saveData(resultExpenses, "expenses")
    saveData(user, "users")

    return res.status(200).json(expenseId)
  } else {
    res.status(404).json(`Despesa correspondente ao id ${id} não existe`);
  }
})
export default router;
