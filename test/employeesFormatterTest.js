const sinon = require('sinon');
const chai = require('chai');
const should = require('chai').should();
const employeesFormatter = require('../employeesFormatter');

describe('getEmployees', function () {
  it('for a given employee and account with same id, make the match', function () {
    const employees = {
        "data": [
            {
              "type": "employees",
              "id": "012",
              "attributes": {
                "identifier": null,
                "firstName": "FirstName",
                "lastName": "LastName"
              },
              "relationships": {
                "account": {
                  "data": {
                    "type": "accounts",
                    "id": "111"
                  }
                }
              }
            }],
            "included": [
                {
                  "type": "accounts",
                  "id": "111",
                  "attributes": {
                    "email": "email@email.com"
                  }
                }]
    };

    const results = employeesFormatter.getEmployees(employees);
    results.length.should.equal(1);
    const employee = results[0];
    employee.employeeData.type.should.equal("employees");
    employee.employeeData.id.should.equal("012");
    employee.employeeData.relationships.account.data.id.should.equal("111");
    employee.accountData.type.should.equal("accounts");
    employee.accountData.id.should.equal("111");
  });


  it('for a given employee and account with differents id, do not make the match', function () {
    const employees = {
        "data": [
            {
              "type": "employees",
              "id": "012",
              "attributes": {
                "identifier": null,
                "firstName": "FirstName",
                "lastName": "LastName"
              },
              "relationships": {
                "account": {
                  "data": {
                    "type": "accounts",
                    "id": "112"
                  }
                }
              }
            }],
            "included": [
                {
                  "type": "accounts",
                  "id": "111",
                  "attributes": {
                    "email": "email@email.com"
                  }
                }]
    };

    const results = employeesFormatter.getEmployees(employees);
    results.length.should.equal(1);
    const employee = results[0];
    employee.employeeData.type.should.equal("employees");
    employee.employeeData.id.should.equal("012");
    employee.employeeData.relationships.account.data.id.should.equal("112");
    employee.accountData.should.eql({});
  });

  it('if there are 2 employee records with the same id, return only a unique record', function () {
    const employees = {
        "data": [
            { "type": "employees", "id": "012", "relationships":{"account":{"data":{id:"0"}}}},
            { "type": "employees", "id": "012", "relationships":{"account":{"data":{id:"0"}}}}],
        "included":[]
    };

    const results = employeesFormatter.getEmployees(employees);
    results.length.should.equal(1);
    const employee = results[0];
    employee.employeeData.type.should.equal("employees");
    employee.employeeData.id.should.equal("012");
  });

});