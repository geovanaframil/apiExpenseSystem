import { IExpenseByUser } from "./expenseInterface";

interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  _expenses: IExpenseByUserWithUser[]; // Usando a nova interface aqui
}


interface IBodyUser {
  name: string;
  lastName: string;
  email: string;
}

interface IExpenseByUserWithUser extends IExpenseByUser {
  _user: {
    id: string;
    name: string;
    lastName: string;
    email: string;
  }
}


export {User, IBodyUser, IExpenseByUserWithUser}
