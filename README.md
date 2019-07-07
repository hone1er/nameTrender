# Name Trender

This will be a website that can take 1 or more names through user input, and return to the user charts/graphs
showing the change in the popularity of the names over time in the US. The data for the names was retrieved from https://www.ssa.gov

NameTrender – [Website](https://nametrender.herokuapp.com/)

## API ENDPOINTS

### /names/<name>

return json data in the form
{"Female": {
count: [],
year: []
}
"Male": {
count: [],
year: []
}}

### /names/map/<name>

returns data in csv format for the given name
columns = [state, 1910, 1911, 1912,...2017]
