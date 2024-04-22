export const arrayColors = ["blue", "red", "pink", "teal"];

export const renderMinutes = (seconds) => {
  const rest = seconds % 60;
  const entier = Math.floor(seconds / 60);
  return entier + (rest > 0 ? 1 : 0);
};

export const activities = [
  {
    id: 1,
    activity: "Pinking",
    productivity: "120",
    performance: "+8%",
    volumes: "199 000",
    objective: "100%",
    color: "#63A0F9",
  },
  {
    id: 2,
    activity: "Packing",
    productivity: "98",
    performance: "+2%",
    volumes: "199 000",
    objective: "99%",
    color: "#53E492",
  },
  {
    id: 3,
    activity: "Emballage",
    productivity: "110",
    performance: "-2%",
    volumes: "199 000",
    objective: "98%",
    color: "#8982DC",
  },
  {
    id: 4,
    activity: "Reception",
    productivity: "80",
    performance: "-2%",
    volumes: "199 000",
    objective: "90%",
    color: "#27817B",
  },
  {
    id: 5,
    activity: "Pinking",
    productivity: "120",
    performance: "+8%",
    volumes: "199 000",
    objective: "100%",
    color: "#63A0F9",
  },
  {
    id: 6,
    activity: "Packing 1",
    productivity: "98",
    performance: "+2%",
    volumes: "199 000",
    objective: "99%",
    color: "#63A0F9",
  },
];

export const clients = [
  {
    id: 1,
    client: "BIC",
    productivity: "120",
    performance: "+8%",
    volumes: "199 000",
    objective: "100%",
  },
  {
    id: 2,
    client: "TIBET",
    productivity: "98",
    performance: "+2%",
    volumes: "199 000",
    objective: "99%",
  },
  {
    id: 3,
    client: "TIFED",
    productivity: "110",
    performance: "-2%",
    volumes: "199 000",
    objective: "98%",
  },
  {
    id: 4,
    client: "RENAULT",
    productivity: "80",
    performance: "-2%",
    volumes: "199 000",
    objective: "90%",
  },
  {
    id: 5,
    client: "PEUGEOT",
    productivity: "120",
    performance: "+8%",
    volumes: "199 000",
    objective: "100%",
  },
  {
    id: 6,
    client: "GLASSES",
    productivity: "98",
    performance: "+2%",
    volumes: "199 000",
    objective: "99%",
  },
];

export const operators = [
  {
    id: 1,
    operator: "Jean Paul",
    productivity: "120",
    performance: "+8%",
    volumes: "199 000",
    objective: "100%",
  },
  {
    id: 2,
    operator: "Mina Cloudia",
    productivity: "98",
    performance: "+2%",
    volumes: "199 000",
    objective: "99%",
  },
  {
    id: 3,
    operator: "Arther Guidon",
    productivity: "110",
    performance: "-2%",
    volumes: "199 000",
    objective: "98%",
  },
  {
    id: 4,
    operator: "Jupiter Ledon",
    productivity: "80",
    performance: "-2%",
    volumes: "199 000",
    objective: "90%",
  },
  {
    id: 5,
    operator: "Rosaline trase",
    productivity: "120",
    performance: "+8%",
    volumes: "199 000",
    objective: "100%",
  },
  {
    id: 6,
    operator: "Teressa boutwen",
    productivity: "98",
    performance: "+2%",
    volumes: "199 000",
    objective: "99%",
  },
];

export const customOrder = (field) => (a, b) => {
  if (a[field] < b[field]) {
    return -1;
  }
  if (a[field] > b[field]) {
    return 1;
  }
  return 0;
};
