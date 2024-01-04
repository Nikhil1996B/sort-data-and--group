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

// output normalized as id's and entities
// const output = {
//   stocksData: {
//     ids: ["MSFT", "APPL", "NVDA"],
//     entities: {
//       MSFT: {
//         "01-DEC-2023": {
//           high: 392,
//           low: 390.5,
//         },
//       },
//       APPL: {},
//       NVDA: {},
//     },
//   },
// };

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const normalizedStocksData = obj.reduce(
  (acc, curr) => {
    // properties destructered from input
    const { date, isin, high, low } = curr;
    //   ids and entities from accumalator
    const { ids, entities } = acc;

    //   If the ID is new, add to ids
    if (!ids.includes(isin)) {
      acc.ids.push(isin);
    }
    //   group the values of entities based on date
    isEmpty(entities)
      ? (acc.entities = { [isin]: { [date]: { high, low } } })
      : entities[isin] === undefined
        ? (acc.entities = { ...entities, [isin]: { [date]: { high, low } } })
        : Object.entries(entities).map(([key]) => {
            if (key === isin) {
              acc.entities[key] = {
                ...entities[key],
                [date]: {
                  high,
                  low,
                },
              };
            } else {
              acc.entities = {
                ...entities,
                [key]: {
                  ...entities[key],
                  [date]: {
                    high,
                    low,
                  },
                },
              };
            }
          });

    return acc;
  },
  { ids: [], entities: {} },
);

const displayOutput = document.getElementById("output");
displayOutput.innerHTML = JSON.stringify(normalizedStocksData || {}, null, 4);
