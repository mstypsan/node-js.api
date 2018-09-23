
exports.pageResults = function(array, pageNumber, pageSize){
    const startIndex = (pageNumber - 1) * pageSize;
    const pagedResults = array.slice(startIndex, startIndex + pageSize);
  
    return {results: pagedResults, pageNumber: pageNumber, pageSize: pageSize};
  }
  
  exports.searchEmployees = function(formattedEmloyeeData, input){
    const inputToLower = input.toLowerCase();
    const searchResults = formattedEmloyeeData.filter(employee => 
      employee.employeeData.attributes.firstName && employee.employeeData.attributes.firstName.toLowerCase().includes(inputToLower) ||
      employee.employeeData.attributes.lastName && employee.employeeData.attributes.lastName.toLowerCase().includes(inputToLower) ||
      employee.accountData && employee.accountData.attributes && employee.accountData.attributes.email.toLowerCase().includes(inputToLower)
    );
  
    return searchResults;
  }