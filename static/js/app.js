function buildLineGraph() {
  d3.event.preventDefault();
  // Grab the value from the form and make a d3.json request to the API in order to build traces and layout for line graph
  var selector = d3.select("#name");
  var text = selector.property("value");
  var url = `/names/${text}`;
  var traces = [];
  var layout = {};
  d3.json(url).then(function(response) {
    Object.entries(response).forEach(data => {
      var color = data[0] == "Male" ? "#5074E8" : "#F47474";
      var trace = {
        x: data[1].year,
        y: data[1].count,
        type: "scatter",
        name: `${data[0]}`,
        line: {
          color: `${color}`,
          width: 4
        }
      };
      if (trace.x.length > 0) {
        traces.push(trace);
      }
      var annotations = [];
      traces.forEach(trace => {
        var y = Math.max(...trace.y);
        var x = trace.x[trace.y.indexOf(y)];
        var color = trace.line.color;

        annotations.push({
          x: x,
          y: y,
          xref: "x",
          yref: "y",
          text: `Max:${y} <br> Year:${x}`,
          showarrow: true,
          font: {
            family: "Courier New, monospace",
            size: 16,
            color: "#ffffff"
          },
          align: "center",
          arrowhead: 2,
          arrowsize: 1,
          arrowwidth: 2,
          arrowcolor: "#636363",
          ax: 20,
          ay: -30,
          bordercolor: "#c7c7c7",
          borderwidth: 2,
          borderpad: 4,
          bgcolor: color,
          opacity: 0.8
        });
      });
      layout = {
        title: `Name: ${text}`,
        showlegend: true,
        annotations: annotations,
        legend: {
          x: 0,
          y: -0.125,
          traceorder: "normal",
          font: {
            family: "sans-serif",
            size: 12,
            color: "#000"
          },
          bgcolor: "#FFFFFF",
          bordercolor: "#000000",
          borderwidth: 2,
          orientation: "h"
        }
      };
    });
    Plotly.newPlot("demo", traces, layout, { responsive: true });
  });
}

var filterbtn = d3.select("#filter-btn");
filterbtn.on("click", buildLineGraph);
