// Assign the data from `data.js` to a descriptive variable
var people = data;

console.log(people);

// Select the button
var button = d3.select("#button");



// Complete the click handler for the form
button.on("click", function() {

  // Select the input element and get the raw HTML node

  var inputElement = d3.select("#patient-form-input");

  // Get the value property of the input element

  var inputValue = inputElement.property("value");

  // Use the form input to filter the data by blood type

  function dadumle(patient) {
    zek = patient.bloodType;
  
    if(zek == inputValue)
      return true;
    else 
      return false;
   
  }
  var inputted = people.filter(dadumle);


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
  });
 
  

  // BONUS: Calculate summary statistics for the age field of the filtered data

  // First, create an array with just the age values

  var age_values = inputted.map(zagreb => zagreb.age)

  console.log(age_values)

  // Next, use math.js to calculate the mean, median, mode, var, and std of the ages
  french = math.mean(age_values)
  frenchy = math.median(age_values)
  italiano = math.mode(age_values)
  deutsch = math.var(age_values)
  chouchou = math.std(age_values)


  console.log(french,frenchy,italiano,chouchou,deutsch)

  // Finally, add the summary stats to the `ul` tag

 

// Create a new element
var li1 = d3.select("ul").append("li").text(`Blood Type ${inputValue} Summary Stats`);
var li2 = d3.select("ul").append("li").text(`Mean: ${french} `);
var li3 = d3.select("ul").append("li").text(`Median: ${frenchy} `);
var li4 = d3.select("ul").append("li").text(`Mode: ${italiano} `);
var li5 = d3.select("ul").append("li").text(`Variance: ${deutsch} `);
var li6 = d3.select("ul").append("li").text(`Median: ${chouchou} `);
});





  