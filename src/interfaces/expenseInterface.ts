import ICategory from "./categoryInterface";

interface IExpense {
  id: string;
  name: string;
  categoryID: string;
  userID: string;
  amount: number;
  status: string;
  _user: {
    id: string;
    name: string;
    lastName: string;
    email: string;
  }
  _category: ICategory;
}

interface IExpenseBodyPost {
  name: string;
  categoryID: string;
  userID: string;
  amount: number;
}

interface IExpenseByUser {
  id: string;
  name: string;
  categoryID: string;
  userID: string;
  amount: number;
  status: string;
  _category: ICategory
}

interface IUpdateExpense {
  name: string;
  categoryID: string;
  userID: string;
  amount: number;
  status: string
}


export {IExpense, IExpenseBodyPost, IExpenseByUser, IUpdateExpense}