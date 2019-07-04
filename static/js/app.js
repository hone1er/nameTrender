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
  var maxValue = 0
  var maxYear = 0
  var layout1 = {}
  var mYears = []
  var mValues = []
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
      maxValue =  Math.max(...trace.y)
      maxYear = trace.x[trace.y.indexOf(maxValue)]
      mYears.push(maxYear)
      mValues.push(maxValue)
      console.log(mYears, mValues)
      layout1 = {
        title: `Name: ${text}`,
        showlegend: true,
        annotations: [
          {
            x: mYears[0],
            y: mValues[0],
            xref: 'x',
            yref: 'y',
            text: `max:${mValues[0]} <br> Year:${mYears[0]}`,
            showarrow: true,
            font: {
              family: 'Courier New, monospace',
              size: 16,
              color: '#ffffff'
            },
            align: 'center',
            arrowhead: 2,
            arrowsize: 1,
            arrowwidth: 2,
            arrowcolor: '#636363',
            ax: 20,
            ay: -30,
            bordercolor: '#c7c7c7',
            borderwidth: 2,
            borderpad: 4,
            bgcolor: '#0146be',
            opacity: 0.8
          },
          {
            x: mYears[1],
            y: mValues[1],
            xref: 'x',
            yref: 'y',
            text: `Max:${mValues[1]} <br> Year:${mYears[1]}`,
            showarrow: true,
            font: {
              family: 'Courier New, monospace',
              size: 16,
              color: '#ffffff'
            },
            align: 'center',
            arrowhead: 2,
            arrowsize: 1,
            arrowwidth: 2,
            arrowcolor: '#636363',
            ax: 20,
            ay: -30,
            bordercolor: '#c7c7c7',
            borderwidth: 2,
            borderpad: 4,
            bgcolor: '#ff7f0e',
            opacity: 0.7
          }
        ]
      
      };
    });
    Plotly.newPlot('demo', traces, layout1, { responsive: true })
  })
};



var filterbtn = d3.select("#filter-btn");
filterbtn.on("click", buildMetadata);



