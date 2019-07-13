# Name Trender

This will be a website that can take 1 or more names through user input, and return to the user charts/graphs
showing the change in the popularity of the names over time in the US. The data for the names was retrieved from https://www.ssa.gov

NameTrender – [Website](https://nametrender.com/)

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

buildLineGraph() take the infromation provided from theis endpoint to produce a line chart showing births per year for males and females

### /names/map/<name>
Pandas reads in a csv file from an AWS S3 bucket via the s3fs module that contains all name, state, and year info. Pandas then
returns data in csv format after filtering for the given name
columns = [state, 1910, 1911, 1912,...2017]

buildChoropleth() takes the information provided from this endpoint to produce a choroleth graph of the USA
