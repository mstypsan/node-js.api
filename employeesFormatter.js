exports.getEmployees = function(employees){
    
    const allEmployeeData = [...employees.data, ...employees.included.filter(x => x.type === "employees" )];
    const allAccountData = employees.included.filter(x => x.type === "accounts" );
    const allAccountDataMap = new Map(allAccountData.map(x => [x.id, x]));

    const formattedEmloyeeData = [];
    const uniqueId = {};

    allEmployeeData.forEach(function(employee) {
        const accountData = allAccountDataMap.get(employee.relationships.account.data.id) ||  {};

        if(!uniqueId[employee.id]) {
            uniqueId[employee.id] = employee;
            formattedEmloyeeData.push({ employeeData: employee, accountData: accountData });
        }
    });

    return formattedEmloyeeData;
}