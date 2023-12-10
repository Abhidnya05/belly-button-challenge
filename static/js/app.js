// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});


// Step1 
// Define a Function to intitialize the dashboard
function init() {

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  d3.json(url).then((data) => {
      
      // Set a variable name for the sample names
      let samples = data.names;
      // Add  samples to dropdown menu
      samples.forEach((id) => {

          // Log the value of id
          console.log(id);

          dropdownMenu.append("option")
          .text(id)
          .property("value",id);
      });

      // Set the first sample from the list
      let sample = samples[0];

      // Log the value of sample_one
      console.log(sample);

      //  Mutiple functions for different charts
      getData(sample);
      getBarChart(sample);
      getBubbleChart(sample);
      getGaugeChart(sample);

  });
};
        
// Step2
// Define a Function to get Data
function getData(sample) {

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {

      // Get all metadata
      let metadata  = data.metadata;
      // Filter based on the value of the sample
      let value     = metadata.filter(result => result.id == sample);
      // Log the array of metadata after filteration
      console.log(value)

      // Get the first index from the array
      let valueData = value[0];

      // Clear out metadata
      d3.select("#sample-metadata").html("");

      // Use Object.entries to add each key/value pair l
      Object.entries(valueData).forEach(([key,value]) => {

          // Log the individual key/value pairs
          console.log(key,value);

          d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
      });
  });

};

// Step3
// Define a Function to get Bar Chart
function getBarChart(sample) {

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {

      // Get all sample data
      let sampleInfo = data.samples;
      // Filter based on the value of the sample
      let value = sampleInfo.filter(result => result.id == sample);
      
      // Get the first index from the array
      let valueData = value[0];

      // Get the otu_ids, lables, and sample values
      let otu_ids       = valueData.otu_ids;
      let otu_labels    = valueData.otu_labels;
      let sample_values = valueData.sample_values;

      // Log the data to the console
      console.log(otu_ids,otu_labels,sample_values);

      // Set top ten items to display in descending order
      let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
      let xticks = sample_values.slice(0,10).reverse();
      let labels = otu_labels.slice(0,10).reverse();
      
      // Set up the trace for the bar chart
      let trace = {
          x: xticks,
          y: yticks,
          text: labels,
          type: "bar",
          orientation: "h"
      };

      // Setup the layout
      let layout = {
          title: "Top 10 OTUs Present"
      };

      // Call Plotly to plot the bar chart
      Plotly.newPlot("bar", [trace], layout)
  });
};

// Step4
// Define a Function to get Bubble Chart
function getBubbleChart(sample) {

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {
      
      // Get all sample data
      let sampleInfo = data.samples;
      // Filter based on the value of the sample
      let value = sampleInfo.filter(result => result.id == sample);

      // Get the first index from the array
      let valueData = value[0];

      // Get the otu_ids, lables, and sample values
      let otu_ids       = valueData.otu_ids;
      let otu_labels    = valueData.otu_labels;
      let sample_values = valueData.sample_values;

      // Log the data to the console
      console.log(otu_ids,otu_labels,sample_values);
      
      // Set up the trace for bubble chart
      let trace1 = {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
              size: sample_values,
              color: otu_ids,
              // colorscale: "Jet"
              colorscale: "Earth"
          }
      };

      // Set up the layout
      let layout = {
        
          hovermode: "closest",
          xaxis: {title: "OTU ID"},
      };

      // Call Plotly to plot the bubble chart
      Plotly.newPlot("bubble", [trace1], layout)
  });
};

// Step5
// Define a Function to change dashboard
function DashChange(value) { 

  // Substitue new ID Number
  console.log(value); 

  // Call all functions defined above
  getData(value);
  getBarChart(value);
  getBubbleChart(value);
  getGaugeChart(value);
};

// Call the initialize function
init();
