import IExpense from "../interfaces/expenseInterface";

function checkExpenseProperty(
  propertyName: keyof IExpense,
  expense: IExpense,
  expectedType: string
): string | undefined {
  const propertyValue = expense[propertyName];

  if (!(propertyName in expense)) {
    return `A propriedade ${propertyName} não foi encontrada no objeto`;
  }
  if (typeof propertyValue !== expectedType) {
    return `A propriedade ${propertyName} deve ser do tipo ${expectedType}`;
  }
}

function verifyBody(expense: IExpense): {
  isValid: boolean;
  errors?: string[];
} {
  const errors: Array<string> = [];

  const nameCheck = checkExpenseProperty("name", expense, "string");
  if (nameCheck) {
    errors.push(nameCheck);
  }

  const categoryIDCheck = checkExpenseProperty("categoryID", expense, "string");
  if (categoryIDCheck) {
    errors.push(categoryIDCheck);
  }

  const userIDCheck = checkExpenseProperty("userID", expense, "string");
  if (userIDCheck) {
    errors.push(userIDCheck);
  }

  const amountCheck = checkExpenseProperty("amount", expense, "number");
  if (amountCheck) {
    errors.push(amountCheck);
  }

  const valid = errors.length === 0;
  return { isValid: true, errors: valid ? undefined : errors };
}

export { checkExpenseProperty, verifyBody };
