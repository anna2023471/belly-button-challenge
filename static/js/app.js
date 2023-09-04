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

        // let slicedData = selectedData.slice(0,10);
    // console.log(sliced);

    let id = selectedMeta.id;
    let ethnicity = selectedMeta.ethnicity;
    let gender = selectedMeta.gender;
    let age = selectedMeta.age;
    let location = selectedMeta.location;
    let bbtype = selectedMeta.bbtype;
    let wfreq = selectedMeta.wfreq;
  
    d3.select(".panel-body").text(`id: ${id}\nethnicity: ${ethnicity}\ngender: ${gender}\nage: ${age}\nlocation: ${location}\nbbtype: ${bbtype}\nwfreq: ${wfreq}`);

    // let list = panel.append("ul");
    // list.append("li").text(`id: ${id}`);
    // list.append("li").text(`ethnicity: ${ethnicity}`);
    // list.append("li").text(`gender: ${gender}`);
    // list.append("li").text(`age: ${age}`);
    // list.append("li").text(`location: ${location}`);
    // list.append("li").text(`bbtype: ${bbtype}`);
    // list.append("li").text(`wfreq: ${wfreq}`);
    console.log(selectedData.sample_values);

    const trace1 = {
      x: Object.values(selectedData.sample_values).slice(0,10),
      y: Object.values(selectedData.otu_ids),
      text: Object.values(selectedData.otu_labels),
      type: "bar",
      orientation: "h"
    };

    const dataset = [trace1];
    const layout = {
      height: 600,
      width: 800
    };

    Plotly.newPlot("bar", dataset, layout);
    
    let marker_size = selectedData.sample_values;
    let marker_colour = selectedData.otu_ids;

    const trace2 = {
        x: Object.values(selectedData.otu_ids),
        y: Object.values(selectedData.sample_values).slice(0,10),
        text: Object.values(selectedData.otu_labels),
        mode: "markers",
        marker: {
            color: marker_colour,
            // size: marker_size,
            sizemode: "area"
        }
      };
  
      const dataset1 = [trace2];
      const layout1 = {
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
  


  

    
   
    

    

    






   
