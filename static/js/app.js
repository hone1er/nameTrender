var name = d3.select("#name");

function buildMetadata() {
  d3.event.preventDefault();
  var selector = d3.select("#name");
  var text = selector.property("value");
  var url = `/names/${text}`;
  var traces = [];
  var layout1 = {};
  var counter = 0;
  d3.json(url).then(function(response) {
    Object.entries(response).forEach(data => {
      var color = counter > 0 ? "#5074E8" : "#F47474";
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
      counter++;
      if (trace.x.length > 0) {
        traces.push(trace);
      }
      var annotations = []
      traces.forEach(element => {
      
        var y =  Math.max(...element.y);
        var x = element.x[element.y.indexOf(y)];
        var color =  element.line.color;
        console.log(x, y, color)
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
        })
      });
      layout1 = {
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
    Plotly.newPlot("demo", traces, layout1, { responsive: true });
  });
}

var filterbtn = d3.select("#filter-btn");
filterbtn.on("click", buildMetadata);
