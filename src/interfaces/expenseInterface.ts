interface IExpense {
  id:string,
  name: string
  categoryID: string
  userID: string
  amount: number
  status: string
  _user: IUser
  _category: ICategory
}

export interface IExpenseUser {
  id: string
  name: string
  categoryID: string
  userID: string
  amount: number
  status: string
  _category: ICategory
}

export interface IExpensePost {
  name: string
  categoryID: string
  userID: string
  amount: number
  status: string
}

interface IUser {
  id: string
  name: string
  lastName: string
  email: string
}

interface ICategory {
  id: string
  name: string
}

export default IExpense
