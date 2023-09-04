// Fetch the json data and console log it
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data) {
    console.log(data);
    const samples = data.samples;
    console.log(samples);
    const demographics = data.metadata;
    console.log(demographics);

    const select = document.getElementById("selDataset")
    const options = samples.map(samples => samples.id);

    for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    };

     // Define a function to update the chart based on the selected ID
  function updateChart(selectedID) {
    const selectedData = samples.find(samples => samples.id == selectedID);
    console.log(selectedData);
    const selectedMeta = demographics.find(demographics => demographics.id == selectedID);
    console.log(selectedMeta);

    let id = selectedMeta.id;
    let ethnicity = selectedMeta.ethnicity;
    let gender = selectedMeta.gender;
    let age = selectedMeta.age;
    let location = selectedMeta.location;
    let bbtype = selectedMeta.bbtype;
    let wfreq = selectedMeta.wfreq;
  
    d3.select(".panel-body").html(`id: ${id} \
                                  <br> ethnicity: ${ethnicity} \
                                  <br> gender: ${gender} \
                                  <br> age: ${age} \
                                  <br> location: ${location} \
                                  <br> bbtype: ${bbtype} \
                                  <br> wfreq: ${wfreq}`);   

    const trace1 = {
      x: Object.values(selectedData.sample_values).slice(0,10),
      y: Object.values(selectedData.otu_ids).map(String),
      text: Object.values(selectedData.otu_labels),
      type: "bar",
      orientation: "h"
    };

    const dataset = [trace1];
    const layout = {yaxis: {type: "category", autorange: "reversed", tickprefix: "OTU", showtickprefix: "all"},
      height: 600,
      width: 800
    };

    Plotly.newPlot("bar", dataset, layout);
    
    let marker_size = Object.values(selectedData.sample_values);
    let marker_colour = Object.values(selectedData.otu_ids);

    const trace2 = {
        x: Object.values(selectedData.otu_ids).map(String),
        y: Object.values(selectedData.sample_values),
        text: Object.values(selectedData.otu_labels),
        mode: "markers",
        marker: {
            color: marker_colour,
            size: marker_size,
            sizemax: 40
        }
      };
  
      const dataset1 = [trace2];
      const layout1 = {
        xaxis: {title: {text: "OTU ID"}},
        height: 600,
        width: 800
      };
    
    Plotly.newPlot("bubble", dataset1, layout1);
  }
  
    // Initialize the chart with the default ID (e.g., 940)
  updateChart(940);
  

  // Add event listener to the dropdown for chart updates
  d3.selectAll("#selDataset").on("change", function () {
    const selectedID = d3.select(this).property("value");
    updateChart(selectedID);

    d3.selectAll(".panel-body").on("change", function() {
        const selectedMeta = d3.select(this).property("value");
        updateMeta(selectedMeta);
      });

  })});
  


  

    
   
    

    

    






   
