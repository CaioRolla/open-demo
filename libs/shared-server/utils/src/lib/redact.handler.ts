export const emailRedactHandler = (email: string): string => {
  const splitted = email.split('');
  const arrobaIndex = splitted.findIndex((l) => l === '@');

  return splitted
    .map((l, index) => {
      if (index > 1 && index < arrobaIndex) {
        return '*';
      }

      return l;
    })
    .join('');
};

export const nationalRegistrationRedactHandler = (number: string): string => {
  const splitted = number.split('.').join('').split('-').join().split('');

  return splitted
    .map((l, index) => {
      if (index > 2) {
        return '*';
      }

      return l;
    })
    .join('');
};
