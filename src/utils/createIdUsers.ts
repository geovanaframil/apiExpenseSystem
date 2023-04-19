export default function createIdByUser(name: string, email: string): string {
  const namePrefix = name.slice(0, 3).toLowerCase();
  const emailPrefix = email.slice(0, 3).toLowerCase();
  return `${namePrefix}${emailPrefix}-${Math.floor(Math.random() * 10000)}`
}