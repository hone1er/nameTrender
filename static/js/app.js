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

function buildChoropleth() {
  console.log("building");
  var selector = d3.select("#name");
  var name = selector.property("value");
  Plotly.d3.csv(`http://127.0.0.1:5000/names/map/${name}`, function(err, rows) {
    function unpack(rows, key) {
      return rows.map(function(row) {
        return row[key];
      });
    }
    var allYears = [];
    Object.entries(rows[0]).forEach(function(i, idx, array) {
      if (idx < array.length - 1) {
        allYears.push(array[idx][0]);
      }
    });
    var steps = [];
    for (let i = 0; i < allYears.length; i++) {
      const element = allYears[i];
      var step = {
        label: element,
        method: "animate",
        args: [
          [element],
          {
            mode: "immediate",
            frame: { redraw: true, duration: 2 },
            transition: { duration: 20 }
          }
        ]
      };
      steps.push(step);
    }
    var frames = [];
    for (let i = 0; i < allYears.length; i++) {
      const element = allYears[i];
      var frame = {
        name: element,
        data: [
          {
            z: unpack(rows, element)
          }
        ]
      };
      frames.push(frame);
    }

    Plotly.newPlot(
      "myDiv",
      {
        data: [
          {
            type: "choropleth",
            locationmode: "USA-states",
            locations: unpack(rows, "state"),
            z: unpack(rows, allYears[0]),
            text: unpack(rows, "state"),
            autocolorscale: true
          }
        ],
        layout: {
          title: `Total Births By State For ${name}`,
          geo: {
            scope: "usa",
            showlakes: true,
            lakecolor: "rgb(255,255,255)"
          },
          sliders: [
            {
              pad: { t: 30 },
              x: 0,
              len: 0.95,
              currentvalue: {
                xanchor: "right",
                prefix: "Year: ",
                font: {
                  color: "#888",
                  size: 20
                }
              },
              transition: { duration: 0 },
              // By default, animate commands are bound to the most recently animated frame:
              steps: steps
            }
          ],
          updatemenus: [
            {
              type: "buttons",
              showactive: false,
              x: 0.3,
              y: 0.3,
              xanchor: "right",
              yanchor: "top",
              direction: "left",
              pad: { t: 60, r: 20 },
              buttons: [
                {
                  label: "Play",
                  method: "animate",
                  args: [
                    null,
                    {
                      fromcurrent: true,
                      frame: { redraw: true, duration: 1000 },
                      transition: { duration: 500 }
                    }
                  ]
                },
                {
                  label: "Pause",
                  method: "animate",
                  args: [
                    [null],
                    {
                      mode: "immediate",
                      frame: { redraw: true, duration: 0 }
                    }
                  ]
                }
              ]
            }
          ]
        },
        // The slider itself does not contain any notion of timing, so animating a slider
        // must be accomplished through a sequence of frames. Here we'll change the color
        // and the data of a single trace:
        frames: frames
      },
      { responsive: true }
    );
  });
}

function build() {
  buildLineGraph();
  //buildChoropleth();
 //
}

var filterbtn = d3.select("#filter-btn");
filterbtn.on("click", build);
