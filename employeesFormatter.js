exports.getEmployees = function(employees){
    
    const allEmployeeData = [...employees.data, ...employees.included.filter(x => x.type == "employees" )];
    const allAccountData = employees.included.filter(x => x.type == "accounts" );

    const formattedEmloyeeData = [];
    const uniqueIds = []

    allEmployeeData.forEach(function(employee) {
        const accountDataArray = allAccountData.filter(x => x.id == employee.relationships.account.data.id);
        accountData = accountDataArray.length == 1 ? accountDataArray[0] : {} 
        if(!uniqueIds.includes(employee.id))
        {
            uniqueIds.push(employee.id);
            formattedEmloyeeData.push({ employeeData: employee, accountData: accountData });
        }
    });

    return formattedEmloyeeData;
}