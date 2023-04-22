function createIdByExpense(name: string): string {
  const namePrefix = name.slice(0, 3).toLowerCase();
  return `exp_${namePrefix}-${Math.floor(Math.random() * 10000)}`;
}

export default createIdByExpense;
