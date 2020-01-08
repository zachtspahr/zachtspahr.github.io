// Use D3 to select the table body
var table = d3.select("table");
// Use D3 to select the table



var tbody = d3.select("tbody");

// Use D3 to set the table class to `table table-striped`
table.attr("class", "table table-striped");
// Loop through an array of grades and build the entire table body from scratch
var grades = [["Malcolm", 80], ["Zoe", 85], ["Kaylee", 99], ["Simon", 99], ["Wash", 79]];

console.log(grades);

// // Step 1: Loop Through `data` and console.log each weather report object

 grades.forEach(function(zek) {
    console.log(zek);
    
 
    Object.entries(zek).forEach(function([key, value]) {
      console.log(key, value);
    });
  });

  grades.forEach(function(zek) {
    console.log(zek);
    ;
    
    Object.entries(zek).forEach(function([key, value]) {
    console.log(key, value);
    //     // Append a cell to the row for each value
    //     // in the weather report object
    ;
    });
    });

    grades.forEach(function(zek) {
        console.log(zek);
        var row = tbody.append("tr");
        Object.entries(zek).forEach(function([key, value]) {
        console.log(key, value);
        //     // Append a cell to the row for each value
        //     // in the weather report object
        var cell = row.append("td");
        cell.text(value);
        });
        });
 
