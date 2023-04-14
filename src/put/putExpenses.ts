import { Router, Request, Response } from "express";
import IExpense from "../interfaces/expenseInterface";
import saveData from "../utils/saveDataJson";
import readData from "../utils/readDataJson";

const router = Router();
const data = require("../../database/expenses.json");
const expenses: IExpense[] = data;

function verifyAndUpdateExpenseBody(body: any) {
  const validProperties = ["name", "amount", "status"];
  const invalidProperties = Object.keys(body).filter(
    (prop) => !validProperties.includes(prop)
  );

  if (invalidProperties.length > 0) {
    return {
      errors: `Propriedades inválidas: ${invalidProperties.join(", ")}`,
    };
  }

  // Se for fornecido, verifica se o amount é um número
  if (body.name && typeof body.name !== "string") {
    return { errors: "O conteúdo do nome deve ser uma string." };
  }
  if (body.amount && typeof body.amount !== "number") {
    return { errors: "O valor da despesa deve ser um número." };
  }
  if (body.status && typeof body.status !== "string") {
    return { errors: "O conteúdo do status deve ser uma string." };
  }

  // Retorna um objeto com as propriedades permitidas
  return {
    name: body.name,
    amount: body.amount,
    status: body.status,
  };
}

router.put("/expenses/:expensesID", (req: Request, res: Response) => {
  const id = req.params.expensesID;
  const body = req.body;

  const expenseIndex = expenses.findIndex((expense) => expense.id === id);
  if (expenseIndex === -1) {
    return res
      .status(404)
      .json(`despesa correspondente ao id ${id} não existe`);
  }

  const validatedBody = verifyAndUpdateExpenseBody(body);
  if (validatedBody.errors) {
    return res.status(400).json({ message: validatedBody.errors });
  }

  const currentExpense = expenses[expenseIndex];
  const updatedExpense = { ...currentExpense, ...validatedBody };
  expenses[expenseIndex] = updatedExpense;
  res
    .status(200)
    .json({ message: "Despesa atualizada com sucesso", updatedExpense });
  saveData(expenses, "expenses");
});

export default router;
