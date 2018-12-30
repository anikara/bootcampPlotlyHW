function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    var url = "/metadata/" + sample;
    d3.select("#sample-metadata").html("");
    var newlist = d3.select("#sample-metadata").append("ul");
  d3.json(url).then(function(response) {
    console.log(response);
   
    newlist.append("li").text("AGE: " + response.AGE);
    newlist.append("li").text("BBTYPE: " + response.BBTYPE);
    newlist.append("li").text("GENDER: " + response.GENDER);
    newlist.append("li").text("LOCATION: " + response.LOCATION);
    newlist.append("li").text("WFREQ: " + response.WFREQ);

  });
   


}


function buildCharts(sample) {
  var selector = d3.select("#pie");
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = "/samples/" + sample;
  d3.json(url).then(function(response) {

    console.log(response);

    var trace = {
      type: "pie",
      values: response.sample_values.slice(0,10),
      labels: response.otu_ids.slice(0,10),
     };

    var data = [trace];

    var layout = {
      title: "Sample Data for ID " + sample,
    };

    Plotly.newPlot("pie", data, layout);
  
  });
     

  var selector = d3.select("#pie");
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  
  d3.json(url).then(function(response) {

    var trace2 = {
      
      x: response.otu_ids,
      y: response.sample_values,
      type: 'scatter',
      mode: 'markers',
      text: response.otu_labels,
      marker: {
        size: response.sample_values,
        line: {
          color: 'rgb(231, 99, 250)',
          width: 3
        }
      }   
    };

    var data2 = [trace2];

    var layout2 = {
      title: 'Bubble Chart',
      showlegend: false,
  
    };

    Plotly.newPlot("bubble", data2, layout2);
  
  });
     

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
  
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
