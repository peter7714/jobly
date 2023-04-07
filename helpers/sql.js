const { BadRequestError } = require("../expressError");

// makes selective update selective update queries
// 
// dataToUpdate is the new value you want to update
// 
// jsToSql maps javascript data fields into database column names
// 
// returns object {sqlSetCols, dataToUpdate} sqlSetCols is the column names, dataToUpdate is an array of the data
// 
// function to create an object with the column names to update in the db and how many values will be passed in // 
function sqlForPartialUpdate(dataToUpdate, jsToSql)
{
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
