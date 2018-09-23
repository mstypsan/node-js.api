const sinon = require('sinon');
const chai = require('chai');
const should = require('chai').should();
const utilities = require('../utilities');

describe('pageResults', function () {
  it('asking for the first page with a page size of 3, return the first 3 items', function () {
    const pagedItems = utilities.pageResults([1,2,3,4,5], 1, 3)

    pagedItems.results.should.eql([1,2,3]);
  });

  it('asking for the last page with a page size of 3, return the last items', function () {
    const pagedItems = utilities.pageResults([1,2,3,4,5], 2, 3)

    pagedItems.results.should.eql([4,5]);
  });

  it('asking for the page that does not exist, return empty array', function () {
    const pagedItems = utilities.pageResults([1,2,3,4,5], 10, 3)

    pagedItems.results.should.eql([]);
  });

});

describe('searchEmployees', function () {
  it('for a given input that is part of the name, return the matched item', function () {
    const employees = [ 
      {
        employeeData: {
        "type": "employees",
        "id": "012",
        "attributes": {
          "identifier": null,
          "firstName": "FirstName",
          "lastName": "LastName",
          "name": "FirstName LastName"
        }
      }
      },
      {
        employeeData: {
        "type": "employees",
        "id": "012",
        "attributes": {
          "identifier": null,
          "firstName": "abc",
          "lastName": "efg",
          "name": "abc efg"
        }
      }
    }
    ];

    const results = utilities.searchEmployees(employees, 'Name')
    results.length.should.equal(1);
    results[0].employeeData.id.should.equal("012");
  });

  it('for a given input that matches search, ignore uppercase characters', function () {
    const employees = [ 
      {
        employeeData: {
        "type": "employees",
        "id": "012",
        "attributes": {
          "identifier": null,
          "firstName": "FirstNAme",
          "lastName": "LastName",
          "name": "FirstNAme LastName"
          }
        }
      }
    ];

    const results = utilities.searchEmployees(employees, 'naME')
    results.length.should.equal(1);
    results[0].employeeData.id.should.equal("012");
  });

  it('for a given input that matches the email, return results', function () {
    const employees = [ 
      {
        employeeData: {
        "type": "employees",
        "id": "012",
        "attributes": {
          "identifier": null,
          "firstName": "FirstNAme",
          "lastName": "LastName",
          "name": "FirstNAme LastName"
          }
        },
        accountData:{
          "type": "accounts",
          "id": "111",
          "attributes": {
            "email": "email@em1ail.com"
          }
        }
      }
    ];

    const results = utilities.searchEmployees(employees, 'em1')
    results.length.should.equal(1);
    results[0].employeeData.id.should.equal("012");
  });

  
});