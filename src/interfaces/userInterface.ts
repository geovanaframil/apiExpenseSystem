import { IExpenseUser } from "./expenseInterface"

export default interface User {
    id: string,
	name: string,
	lastName: string,
	email: string,
	_expenses: IExpenseUser[]
}

export default interface BodyUser {
	name: string;
	lastName: string;
	email: string;
}