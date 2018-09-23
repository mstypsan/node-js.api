const { query, validationResult } = require('express-validator/check');
const employeesJson = require('../employees');
const employees = require('../employeesFormatter').getEmployees(employeesJson);
const utilities = require('../utilities');

exports.autocomplete = [
  query('input').exists(),
  query('pageNumber').optional().isInt({ gt: 0 }),
  query('pageSize').optional().isInt({ gt: 0 }),
  (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const pageNumber = req.query.pageNumber || 1;
    const pageSize = req.query.pageSize || 10;
    const input = req.query.input;

    const allEmployees = utilities.searchEmployees(employees, input);
    const pagedResults = utilities.pageResults(allEmployees, pageNumber, pageSize);
    
    return res.json(pagedResults);
   }
  ];