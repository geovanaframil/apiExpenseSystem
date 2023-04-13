import { Router, Request, Response } from "express";
import IExpense from "../interfaces/expenseInterface";
import saveData from "../utils/saveDataJson";
import readData from "../utils/readDataJson";

const router = Router();
const data = readData("expenses");
const expenses: IExpense[] = data;

router.put("/expenses/:expensesID", (req: Request, res: Response) => {
  const id = req.params.expensesID;
  const body = req.body;
  const expenseId = expenses.findIndex((item) => item.id === id);
  if (expenseId === -1) {
    return res
      .status(404)
      .json(`despesa correspondente ao id ${id} não existe`);
  }

  const validProperties = ["name", "amount", "status"];
  const hasInvalidProperty = Object.keys(body).some(
    (prop) => !validProperties.includes(prop)
  );
  if (hasInvalidProperty) {
    return res.status(400).json("Propriedades inválidas");
  }

  const currentExpense = expenses[expenseId];
  currentExpense.name = body.name ?? currentExpense.name;
  currentExpense.amount = body.amount ?? currentExpense.amount;
  currentExpense.status = body.status ?? currentExpense.status;
  saveData(currentExpense, "expenses");
  res.status(200).json(currentExpense);
});

export default router;
