import "./styles.css";

const obj = [
  { isin: "MSFT", high: 392, low: 390.5, date: "01-DEC-2023" },
  { isin: "APPL", high: 191, low: 190.5, date: "01-DEC-2023" },
  { isin: "NVDA", high: 474, low: 432.5, date: "01-DEC-2023" },

  { isin: "MSFT", high: 394, low: 389.5, date: "02-DEC-2023" },
  { isin: "APPL", high: 192, low: 185.5, date: "02-DEC-2023" },
  { isin: "NVDA", high: 489, low: 475, date: "02-DEC-2023" },

  { isin: "MSFT", high: 386, low: 380.5, date: "03-DEC-2023" },
  { isin: "APPL", high: 195, low: 192, date: "03-DEC-2023" },
  { isin: "NVDA", high: 455, low: 430, date: "03-DEC-2023" },
];
const isDataPresent = (data, key, value) =>
  data.some((filter) => filter[key] == value);

const output = obj.reduce((acc, curr) => {
  const { isin, date, high, low } = curr;
  if (isDataPresent(acc, "date", date)) {
    let updatedItem = acc.find((filter) => filter?.date === date);
    console.log(updatedItem);
    updatedItem = { ...updatedItem, [isin]: { high, low } };
    const targetIndex = acc.findIndex((filter) => filter?.date === date);
    acc[targetIndex] = updatedItem;
    return acc;
  } else {
    acc.push({
      date,
      [isin]: { high, low },
    });
    return acc;
  }
}, []);
console.log(output);
const displayOutput = document.getElementById("output");
displayOutput.innerHTML = JSON.stringify(output || [], null, 4);
