import { Router, Request, Response } from "express";
import createIdByExpense from "../utils/createIdByExpense";
import IExpense from "../interfaces/expenseInterface";
import { verifyBody } from "../utils/verifyBodyExpense";
import saveData from "../utils/saveDataJson";
import readData from "../utils/readDataJson";

const router = Router();
const data = require("../../database/expenses.json");
const expenses: IExpense[] = data;

function handleBodyExpenseRegister(
  returnAPI: any,
  idExpense: string
): IExpense {
  const newExpense = {
    name: returnAPI.name,
    categoryID: returnAPI.categoryID,
    userID: returnAPI.userID,
    amount: returnAPI.amount,
    status: "PENDENTE",
    id: idExpense,
    _user: {
      id: returnAPI._user.id,
      name: returnAPI._user.name,
      lastName: returnAPI._user.lastName,
      email: returnAPI._user.email,
    },
    _category: {
      id: returnAPI._category.id,
      name: returnAPI._category.name,
    },
  };
  return newExpense;
}

router.post("/expenses", (req: Request, res: Response) => {
  const body = req.body;
  const bodyIsValid = verifyBody(body);
  if (bodyIsValid.errors) {
    res.status(400).json({ message: bodyIsValid.errors });
  } else {
    const IdExpense = createIdByExpense(body.name, body.userID);
    const currentExpense = handleBodyExpenseRegister(body, IdExpense);
    expenses.push(currentExpense);
    res.status(200).json({ message: "usuário cadastrado com sucesso" });
    saveData(expenses, "expenses");
  }
});

export default router;
