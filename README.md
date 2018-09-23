# Autocomplete API
Simple REST API that search on a JSON list of managers and returns those managers whose name or email partially matches an input string. 

# APIs
## Search ##
You can search for manager based on an input string

**<code> GET </code> /v1/employees/autocomplete** 

## Parameters ##
- **input** _(required)_ The search input string.
- **pageNumber** _(optional)_ The page number of the results.
- **pageSize** _(optional)_ The page size of the results.


# Running the application locally
The API is written is Node.js of version 10.10.0. One can run it locally by first installing all the missing packages with <code> npm install </code> and then running <code> npm start </code>. Tests can run by running the command <code> nmp test </code>.

# Conventions
The project is reading directly from a small local JSON file. It loads and reformattes the JSON file on application start up. For Production ready code the JSON file will be stored in a database or a text search engine. Alternatively for a larger JSON file we can search and return a subset of results at a time, instead of loading the whole file in memory.
