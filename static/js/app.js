var name = d3.select("#name");

function buildMetadata() {
  d3.event.preventDefault();
  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`
  // Format the data
  var selector = d3.select("#name")
  var text = selector.property("value")
  var url = `/names/${text}`;
  var traces = []
  d3.json(url).then(function (response) {
    Object.entries(response).forEach((data) => {
      console.log(data[0]);
      var trace = {
        x: data[1].year,
        y: data[1].count,
        type: 'scatter',
        name: `${data[0]}`
      };
      traces.push(trace)
    });
    var layout1 = {
      title: `Name: ${text}`,
      showlegend: true,

    };

    Plotly.newPlot('demo', traces, layout1, { responsive: true })
  })
};



var filterbtn = d3.select("#filter-btn");
filterbtn.on("click", buildMetadata);



