import { Router, Request, Response } from "express";
import IExpense from "../interfaces/expenseInterface";
import saveData from "../utils/saveDataJson";
import readData from "../utils/readDataJson";
import User from "../interfaces/userInterface";
import { IExpenseUser } from "../interfaces/expenseInterface";
import { ICategory } from "../interfaces/categoryInterface";

const router = Router();
const data = require("../../database/expenses.json");

function verifyAndUpdateExpenseBody(body: any) {
  const validProperties = ["name", "amount", "status", "categoryID", "userID"];
  const invalidProperties = Object.keys(body).filter(
    (prop) => !validProperties.includes(prop)
  );

  if (invalidProperties.length > 0) {
    return {
      errors: `Propriedades inválidas: ${invalidProperties.join(", ")}`,
    };
  }

  const updatedBody : any= {};
  for (const prop of validProperties) {
    if (body[prop] !== undefined) {
      updatedBody[prop] = body[prop];
    }
  }

  if (body.name && typeof body.name !== "string") {
    return { errors: "O conteúdo do nome deve ser uma string." };
  }
  if (body.amount && typeof body.amount !== "number") {
    return { errors: "O valor da despesa deve ser um número." };
  }
  if (body.status && typeof body.status !== "string") {
    return { errors: "O conteúdo do status deve ser uma string." };
  }
  // Retorna um objeto com as propriedades permitidas atualizadas
  return updatedBody;
}

router.put("/expenses/:expensesID", async (req: Request, res: Response) => {
  const expenses: IExpense[] = await readData('expenses')
  const users: User[] = await readData('users')
  const category:ICategory[] = await readData('categories')
  const expenseIds = req.params.expensesID;
  const body = req.body;

  let indexExpense = expenses.findIndex(expense => expense.id === expenseIds);
  if (indexExpense === -1) {
    return res
      .status(404)
      .json(`despesa correspondente ao id ${expenseIds} não existe`);
  }

  const updatedBody = verifyAndUpdateExpenseBody(body);
  if (updatedBody.errors) {
    return res.status(400).json({ message: updatedBody.errors });
  }

  const { categoryID, userID} = body
  const categories = category.find(category => category.id === categoryID);

  if(!categories) {
    return res
      .status(404)
      .json(`Categoria não encontrada!`);
  }

  const user = users.find(user => user.id === userID);

  if (!user) {
    return res
    .status(404)
    .json(`Usuario não encontrado!`);
  }

  const Expense = expenses[indexExpense]
  const userExpense = Expense.userID

  if(userID !== userExpense) {
    const Iduser = users.find(user => user.id === userExpense);
    if (Iduser) { Iduser._expenses = Iduser._expenses.filter( expense => expense.id !== expenseIds) }

    const ExpenseForUser: IExpenseUser = {id: expenseIds,
    name: body.name ?? Expense.name,
    categoryID: body.categoryID ?? Expense.categoryID,
    userID: body.userID ?? Expense.userID,
    amount: body.amount ?? Expense.amount,
    status: body.status ?? Expense.status,
    _category: {...categories}
  }
  user._expenses.push(ExpenseForUser)

} else {
  const expenses = user._expenses.find(expense => expense.id === expenseIds);
  if (expenses) {expenses.name = body.name ?? Expense.name;
    expenses.categoryID = body.categoryID ?? Expense.categoryID;
    expenses.amount = body.amount ?? Expense.amount;
    expenses.status = body.status ?? Expense.status;
    expenses._category = {...categories};
  }
}

const { id, name, lastName, email } = user;
const newExpense: IExpense = {
    id: expenseIds,
    name: body.name ?? Expense.name,
    categoryID: body.categoryID ?? Expense.categoryID,
    userID: body.userID ?? Expense.userID,
    amount: body.amount ?? Expense.amount,
    status: body.status ?? Expense.status,
    _user: {id,name, lastName, email },
    _category: {...categories}
}

expenses[indexExpense] = newExpense;
saveData(expenses, 'expenses');
saveData(users, 'users');

return res.status(200).json(newExpense);
})


export default router;
