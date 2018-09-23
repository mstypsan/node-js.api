
exports.pageResults = function(array, pageNumber, pageSize){
    const startIndex = (pageNumber - 1) * pageSize;
    const pagedResults = array.slice(startIndex, startIndex + pageSize);
  
    return {results: pagedResults, pageNumber: pageNumber, pageSize: pageSize};
  }
  
  exports.searchEmployees = function(formattedEmloyeeData, input){
    const inputToLower = input.toLowerCase();

    const searchResults = formattedEmloyeeData.filter(({employeeData, accountData}) => 
      employeeData.attributes.firstName && employeeData.attributes.firstName.toLowerCase().includes(inputToLower) ||
      employeeData.attributes.lastName && employeeData.attributes.lastName.toLowerCase().includes(inputToLower) ||
      accountData && accountData.attributes && accountData.attributes.email.toLowerCase().includes(inputToLower)
    );
  
    return searchResults;
  }