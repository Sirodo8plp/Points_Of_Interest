const GetNumberOfRows = (arr, num) => {
  let numberOfRows = [];
  if (arr && arr.length % num === 0) {
    for (let i = 0; i < 4; i++) {
      numberOfRows.push(i + 1);
    }
  }
  if (arr && arr.length % num !== 0) {
    for (let i = 0; i < Math.floor(arr.length / num) + 1; i++) {
      numberOfRows.push(i + 1);
    }
  }
  return numberOfRows;
};

export default GetNumberOfRows;
