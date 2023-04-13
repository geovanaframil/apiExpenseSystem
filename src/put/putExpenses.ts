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
  const invalidProperties = Object.keys(body).filter(
    (prop) => !validProperties.includes(prop)
  );

  if (invalidProperties.length > 0) {
    return res
      .status(400)
      .json(`Propriedades inválidas: ${invalidProperties.join(", ")}`);
  }

  const currentExpense = expenses[expenseId];
  const updatedExpenses = expenses.map((expense) => {
    if (expense.id === id) {
      return {
        ...currentExpense,
        ...body,
      };
    }
    return expense;
  });
  saveData(updatedExpenses, "expenses");
  res.status(200).json(updatedExpenses);
});

export default router;
