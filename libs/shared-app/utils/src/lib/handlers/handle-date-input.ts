export const handleDateInput = (date: string | null): Date | null => {
  if (!date) return null;

  const dateObj = new Date(date);

  return new Date(
    dateObj.getTime() + Math.abs(dateObj.getTimezoneOffset() * 60000)
  );
};
