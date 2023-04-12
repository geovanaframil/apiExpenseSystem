import { Router, Request, Response } from "express";
import createIdByExpense from "../utils/createIdByExpense";
import IExpense from "../interfaces/expenseInterface";
import verifyBody from "../utils/verifyBodyExpense";
import saveData from "../utils/saveDataJson";

const router = Router();

function handleBodyExpenseRegister(
  returnAPI: any,
  idExpense: string
): IExpense {
  const newExpense = {
    name: returnAPI.name,
    categoryID: returnAPI.categoryID,
    userID: returnAPI.userID,
    amount: returnAPI.amount,
    id: idExpense,
  };
  return newExpense;
}

router.post("/expenses", (req: Request, res: Response) => {
  const body = req.body;
  const bodyIsValid = verifyBody(body);
  if (bodyIsValid.errors) {
    res.json(bodyIsValid.errors);
  } else {
    body.id = createIdByExpense(body.name, body.userID);
    const currentExpense = handleBodyExpenseRegister(body, body.id);
    saveData(currentExpense, "expenses");
    res.json({ message: `Despesa cadastrada com sucesso! ${body}` });
  }
});

export default router;
