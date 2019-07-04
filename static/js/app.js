var name = d3.select("#name");

function buildMetadata() {
  d3.event.preventDefault();
  var selector = d3.select("#name")
  var text = selector.property("value")
  var url = `/names/${text}`;
  var traces = []
  var maxValue = 0
  var maxYear = 0
  var layout1 = {}
  var mYears = []
  var mValues = []
  var counter = 0
  d3.json(url).then(function (response) {
    Object.entries(response).forEach((data) => {
      console.log(data[0]);
      var color = (counter > 0) ? '#5074E8' : '#F47474';
      var trace = {
        x: data[1].year,
        y: data[1].count,
        type: 'scatter',
        name: `${data[0]}`,
        line: {
          color: `${color}`,
          width: 3
        }
      };
      counter ++
      traces.push(trace)
      maxValue =  Math.max(...trace.y)
      maxYear = trace.x[trace.y.indexOf(maxValue)]
      mYears.push(maxYear)
      mValues.push(maxValue)
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
            bgcolor: '#E85050',
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
            bgcolor: 'blue',
            opacity: 0.7
          }
        ],
        legend: {
          x: 0,
          y: -0.125,
          traceorder: 'normal',
          font: {
            family: 'sans-serif',
            size: 12,
            color: '#000'
          },
          bgcolor: '#FFFFFF',
          bordercolor: '#000000',
          borderwidth: 2,
          "orientation": "h"
        }      
      };
    });
    Plotly.newPlot('demo', traces, layout1, { responsive: true })
  })
};


var filterbtn = d3.select("#filter-btn");
filterbtn.on("click", buildMetadata);