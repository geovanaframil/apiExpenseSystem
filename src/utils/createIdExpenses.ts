export default function idGenerateExpenses(): string {
    const idExpenses = Math.floor(Math.random() * 1999981) + 20;
    return `${idExpenses}`
}