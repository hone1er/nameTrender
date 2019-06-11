var name = d3.select("#name");

function buildMetadata() {
  d3.event.preventDefault();
  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`
  // Format the data
  var x = document.getElementById("frm1");
  var text = "";
  text += x.elements[0].value;
  var url = `/names/${text}`;
  var traces = []
  console.log(url);
  d3.json(url).then(function (response) {
    Object.entries(response).forEach((data) => {
      var trace = {
        x: data[1].year,
        y: data[1].count,
        type: 'scatter'
      };
      traces.push(trace)
    });
    Plotly.newPlot('demo', traces)
  })
};

var filterbtn = d3.select("#filter-btn");

filterbtn.on("click", buildMetadata);


