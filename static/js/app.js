function extractData(id) {
    d3.json("data/samples.json").then (data =>{
        console.log(data)
        var otuIds = data.samples[0].otu_ids;
        console.log(otuIds)
        var sampleValues = data.samples[0].sample_values;
        console.log(sampleValues)
        var otuLabels = data.samples[0].otu_labels;
        console.log(otuLabels)

        var topValues = (data.samples[0].sample_values.slice(0,10)).reverse();
        var topOtu = (data.samples[0].otu_ids.slice(0,10)).reverse();
        var topIds = topOtu.map(d => "OTU " + d);
        console.log(`OTU IDS: ${topIds}`)
        var topLabels = data.samples[0].otu_labels.slice(0,10);

        var trace = {
            x: topValues,
            y: topIds,
            text: topLabels,
            type : "bar",
            orientation : "h"
            
        };

        var dataBar = [trace];

        var layout = {
            title: "Top 10 OTU's Found in Individuals",
            yaxis: {
                tickmode: "linear"
            }
        };
        
    Plotly.newPlot("bar", dataBar, layout);

        var traceBubble = {
            x: otuIds,
            y: sampleValues,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIds
            },
            text: otuLabels
        };
    
        var layoutBubble = {
            xaxis: {title: "OTU ID"},
            height: 500,
            width: 1500
        };
       
        var dataBubble = [traceBubble];

    Plotly.newPlot("bubble", dataBubble, layoutBubble);
    });
}
    function sampleMetadata(id) {
        d3.json("data/samples.json").then((data1)=> {
            var metaData = data1.metadata;
            console.log(metaData)
            var metadataString = metaData.filter(metadata => metadata.id.toString() ===  id)[0];
            var demoInfo = d3.select("#sample-metadata");
            demoInfo.html("");
            Object.entries(metadataString).forEach((key) => {   
                demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }

    function optionChanged(id) {
        extractData(id);
        sampleMetadata(id);
    };

    function init() {
        var dropdownMenu = d3.select("#selDataset");
        d3.json("data/samples.json").then((data)=> {
            console.log(data)
            data.names.forEach(function(name) {
                dropdownMenu.append("option").text(name).property("value");

            });
            extractData(data.names[0]);
            sampleMetadata(data.names[0]);
        });
    }
    init();