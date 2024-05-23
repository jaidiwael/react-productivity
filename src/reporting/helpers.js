export const arrayColors = [
  { color: "#036DDC", label: "SUPPORT" },
  { color: "#63A0F9", label: "PICK" },
  { color: "#53E492", label: "PACK" },
  { color: "#FF5F5D", label: "TEMPS MANQUANT" },
];

export const renderMinutes = (seconds) => {
  const rest = seconds % 60;
  const entier = Math.floor(seconds / 60);
  return entier + (rest > 0 ? 1 : 0);
};

export const customOrder = (field, direction) => (a, b) => {
  if (direction === "asc") {
    if (a[field] < b[field]) {
      return -1;
    }
    if (a[field] > b[field]) {
      return 1;
    }
  } else {
    if (a[field] > b[field]) {
      return -1;
    }
    if (a[field] < b[field]) {
      return 1;
    }
  }
  return 0;
};
