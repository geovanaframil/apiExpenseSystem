import { IExpenseUser } from "./expenseInterface";
export interface ICategory {
  id: string;
  name: string;
}

export interface ICategoryExpenses extends ICategory {
  _expenses: IExpenseUser[];
}


