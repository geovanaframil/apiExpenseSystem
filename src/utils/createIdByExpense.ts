function createIdByExpense(name: string, id: string): string {
  const namePrefix = name.slice(0, 3).toLowerCase();
  const idPrefix = id.slice(0, 3).toLowerCase();
  return `${namePrefix}${idPrefix}-${Math.floor(Math.random() * 10000)}`;
}

export default createIdByExpense;
