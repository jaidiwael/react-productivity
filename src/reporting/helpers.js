export const arrayColors = ["blue", "red", "pink", "teal"];

export const renderMinutes = (seconds) => {
  const rest = seconds % 60;
  const entier = Math.floor(seconds / 60);
  return entier + (rest > 0 ? 1 : 0);
};
