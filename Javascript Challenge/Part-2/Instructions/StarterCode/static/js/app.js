// from data.js
var ufo_sightings = data;
console.log(ufo_sightings)

// YOUR CODE HERE!
var button = d3.select("#filter-btn")
button.on("click", function() {

    // Select the input element and get the raw HTML node
  
    var inputElement = d3.select("#datetime");
  
    // Get the value property of the input element
  
    var inputValue = inputElement.property("value");

    console.log(inputValue)

    function dadumle(sighting) {
    zek = sighting.datetime
  
    if(zek == inputValue)
      return true;
    else 
      return false;
   
  }
  var inputted = ufo_sightings.filter(dadumle);


  var table = d3.select("table");
  // Use D3 to select the table
  
  
  
  var tbody = d3.select("tbody");
  
  // Use D3 to set the table class to `table table-striped`
  table.attr("class", "table table-striped");

// Display the results
inputted.forEach(function(hello) {
  console.log(hello);
  var row = tbody.append("tr");
  Object.entries(hello).forEach(function([key, value]) {
  console.log(key, value);
  //     // Append a cell to the row for each value
  //     // in the weather report object
  var cell = row.append("td");
  cell.text(value);
  });
  })});

  