export const totalPagesHandler = (totalAmount: number, take: number) =>
  totalAmount !== 0 ? (take !== -1 ? Math.ceil(totalAmount / take) : 1) : 0;
