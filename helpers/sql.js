const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

// function to create an object with the column names to update in the db and how many values will be passed in // 
function sqlForPartialUpdate(dataToUpdate, jsToSql)
{
  // extracts keys to update in the table for each column passed in // 
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  // sets name of column in the query and the amount of values that need to be passed in // 
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  // returns object with the columns to update in the db and their values //
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
