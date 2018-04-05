import data from "../data";

export const searchFirstName = name => {
  name = name.toLowerCase();
  let firstNames = name.split(",");
  console.log("firstNames queries : ", firstNames);
  let results = [];
  firstNames.map(n => {
    let match = data.find(o => n === o.firstName.toLowerCase());
    if (match) {
      results.push(match);
    }
  });
  return results;
};
