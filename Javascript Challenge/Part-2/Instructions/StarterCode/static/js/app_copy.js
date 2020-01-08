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

var button = d3.select("#all_data-btn")
button.on("click", function() {
  


  var table = d3.select("table");
  // Use D3 to select the table
  
  
  
  var tbody = d3.select("tbody");
  
  // Use D3 to set the table class to `table table-striped`
  table.attr("class", "table table-striped");

// Display the results
ufo_sightings.forEach(function(bilson) {
  console.log(bilson);
  var row = tbody.append("tr");
  Object.entries(bilson).forEach(function([key, value]) {
  console.log(key, value);
  //     // Append a cell to the row for each value
  //     // in the weather report object
  var cell = row.append("td");
  cell.text(value);
  });
  })});

var button3 = d3.select("#filter-city-btn")
button3.on("click", function() {

    // Select the input element and get the raw HTML node
  
    var inputElement = d3.select("#city");
  
    // Get the value property of the input element
  
    var inputValue = inputElement.property("value");

    console.log(inputValue)

    function tomasso(sighting) {
    zek = sighting.city
  
    if(zek == inputValue)
      return true;
    else 
      return false;
   
  }
  var inputted = ufo_sightings.filter(tomasso);


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

  var button2 = d3.select("#filter-state-btn")
  button2.on("click", function() {

    // Select the input element and get the raw HTML node
  
    var inputElement = d3.select("#state");
  
    // Get the value property of the input element
  
    var inputValue = inputElement.property("value");

    console.log(inputValue)

    function states(sighting) {
    zek = sighting.state
  
    if(zek == inputValue)
      return true;
    else 
      return false;
   
  }
  var inputted = ufo_sightings.filter(states);


  var table = d3.select("table");
  // Use D3 to select the table
  
  
  
  var tbody = d3.select("tbody");
  
  // Use D3 to set the table class to `table table-striped`
  table.attr("class", "table table-striped");

// Display the results
inputted.forEach(function(wilson) {
  console.log(wilson);
  var row = tbody.append("tr");
  Object.entries(wilson).forEach(function([key, value]) {
  console.log(key, value);
  //     // Append a cell to the row for each value
  //     // in the weather report object
  var cell = row.append("td");
  cell.text(value);
  });
  })});

  var button4 = d3.select("#filter-country-btn")
  button4.on("click", function() {

    // Select the input element and get the raw HTML node
  
    var inputElement = d3.select("#country");
  
    // Get the value property of the input element
  
    var inputValue = inputElement.property("value");

    console.log(inputValue)

    function countries(sighting) {
    zek = sighting.country
  
    if(zek == inputValue)
      return true;
    else 
      return false;
   
  }
  var inputted = ufo_sightings.filter(countries);


  var table = d3.select("table");
  // Use D3 to select the table
  
  
  
  var tbody = d3.select("tbody");
  
  // Use D3 to set the table class to `table table-striped`
  table.attr("class", "table table-striped");

// Display the results
inputted.forEach(function(wilson) {
  console.log(wilson);
  var row = tbody.append("tr");
  Object.entries(wilson).forEach(function([key, value]) {
  console.log(key, value);
  //     // Append a cell to the row for each value
  //     // in the weather report object
  var cell = row.append("td");
  cell.text(value);
  });
  })});

  var button5 = d3.select("#filter-shape-btn")
  button5.on("click", function() {

    // Select the input element and get the raw HTML node
  
    var inputElement = d3.select("#shape");
  
    // Get the value property of the input element
  
    var inputValue = inputElement.property("value");

    console.log(inputValue)

    function shapes(sighting) {
    zek = sighting.shape
  
    if(zek == inputValue)
      return true;
    else 
      return false;
   
  }
  var inputted = ufo_sightings.filter(shapes);


  var table = d3.select("table");
  // Use D3 to select the table
  
  
  
  var tbody = d3.select("tbody");
  
  // Use D3 to set the table class to `table table-striped`
  table.attr("class", "table table-striped");

// Display the results
inputted.forEach(function(bobs) {
  console.log(bobs);
  var row = tbody.append("tr");
  Object.entries(bobs).forEach(function([key, value]) {
  console.log(key, value);
  //     // Append a cell to the row for each value
  //     // in the weather report object
  var cell = row.append("td");
  cell.text(value);
  });
  })});