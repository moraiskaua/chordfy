export const getNameInitials = (name: string) => {
  const names = name.split(' ');

  if (names.length > 1) {
    const firstNameInitial = names[0][0].toUpperCase();
    const lastNameInitial = names[names.length - 1][0].toUpperCase();

    return `${firstNameInitial}${lastNameInitial}`;
  }

  return name.slice(0, 2).toUpperCase();
};
