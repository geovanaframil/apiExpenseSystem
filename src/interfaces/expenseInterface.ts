interface IExpense {
  name: string;
  categoryID: string;
  userID: string;
  amount: number;
  status: string;
  id: string;
  _user: IUser;
  _category: ICategory;
}

interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

interface ICategory {
  id: string;
  name: string;
}

export default IExpense;
