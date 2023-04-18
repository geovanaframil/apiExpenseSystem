function createIdByCategory(name: string): string {
  const namePrefix = name.slice(0, 4).toLowerCase();
  return `cat-${namePrefix}-${Math.floor(Math.random() * 10000)}`;
}

export default createIdByCategory;
