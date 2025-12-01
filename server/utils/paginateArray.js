function paginateArray(array, pageNumber, itemsPerPage) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return array.slice(startIndex, endIndex);
}

module.exports = {
  paginateArray
};