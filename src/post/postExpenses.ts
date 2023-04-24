import { Router, Request, Response } from "express";
import IExpense, { IExpenseUser } from "../interfaces/expenseInterface";
import { ICategory } from "../interfaces/categoryInterface";
import User from "../interfaces/userInterface";
import Joi from 'joi'
import { IExpensePost } from "../interfaces/expenseInterface";
import readData from "../utils/readDataJson";
import idGenerateExpenses from "../utils/createIdExpenses";
import saveDataJson from "../utils/saveDataJson";

const router = Router()

export const bodyPostSchema: Joi.ObjectSchema<IExpensePost> = Joi.object({
    name: Joi.string().required(),
    categoryID: Joi.string().required(),
    userID: Joi.string().required(),
    amount: Joi.number().strict().required(),
    status: Joi.string().required(),
    userName:Joi.string()
});


router.post("/expenses", async (req: Request, res: Response) => {
  const expensesData: IExpense[] = await readData('expenses');
  const categoriesData: ICategory[] = await readData('categories');
  const usersData: User[] =  await readData('users');
  const body: IExpensePost = req.body;

  const { error } =  bodyPostSchema.validate(body)
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  
  const { categoryID, userID } = body
  const categoryFind = categoriesData.find( category => category.id === categoryID)
  const userFind = usersData.find(user => user.id === userID)
  const UserIndex = usersData.findIndex(user => user.id === userID)

  if (categoryFind && userFind) {
    const { id, name, lastName, email } = userFind;

    const idExpenses = idGenerateExpenses();
    const idGenerated = `exp_${idExpenses}`;
    const ExpenseGenerated: IExpense = {
        id: idGenerated,
        ...body,
        status: 'PENDENTE',
        _user: {
            id,
            name,
            lastName,
            email
        },
        _category: {
            ...categoryFind
        }
    };

    const ExpenseUser: IExpenseUser = {
        id: idGenerated,
        ...body,
        status: 'PENDENTE',
        _category: {
            ...categoryFind
        }
    };

    usersData[UserIndex]._expenses.push(ExpenseUser);
    expensesData.push(ExpenseGenerated);

    res.status(200).json(ExpenseGenerated);
    saveDataJson(expensesData, 'expenses');
    saveDataJson(usersData, 'users');

} else { return res.status(400).json('Usuario com esse ID não encontado!') }
})

export default router;
