var grid;
var gridChanged = false;
var gridShown = true;

var MaxGrid = 30;
var borderStyle = "solid 1px black";
var backgroundGridColor;



$(function () {
  grid = $("#my-grid");
  // SIZE LIMITS - set max size if chosen bigger
  $("#input_width, #input_height").on('focusout', function () {
    if ($(this).val() > MaxGrid) {
      $(this).val(MaxGrid);
    }
  })
  makeGrid();
});



// Run when clicked New Grid button
function makeGrid(event) {
  var width = $("#input_width").val();
  var height = $("#input_height").val();
  var backgroundGridColor = $("#grid-color").val();
  gridShown = true; // Grid is visible by default

  // Set secondary color to the grid background color (to easily erase things)
  $("#rmb-pen-color").val(backgroundGridColor);

  // ASK IF CREATE NEW GRID when changes
  if (event && gridChanged) {
    var overwriteChanges = window.confirm(
      "Do you want to create new grid? Your changes will be lost."
    );
    if (overwriteChanges) {
      grid.empty();
      gridChanged = false;
    } else {
      return;
    }
  } else {
    // IF NO CHANGES just recreate
    grid.empty();
  }

  //CREATE ROWS <tr> and CELLS <td>
  for (var h = 0; h < height; h++) {
    var row = $("<tr></tr>").appendTo(grid);
    for (var w = 0; w < width; w++) {
      var cell = $("<td></td>").appendTo(row);

      // FILL CELLS
      cell.css("background-color", backgroundGridColor);
      
    }
  }

  // Allow to color multiple cells by pressing the left mouse button and
  // dragging the cursor over multiple cells.
  grid.on("mouseover mousedown", "td", function (event) {
    event.preventDefault();
    if (event.buttons === 1) {
      gridChanged = true;
      $(this).css("background-color", $("#lmb-pen-color").val());
    } else if (event.buttons === 2) {
      // The same for coloring with secondary color
      $(this).css("background-color", $("#rmb-pen-color").val());
    
}
  });


//closes pop-up
$("#newgrid-popup").css("display","none");
}

// Sets border style for every cell and row
function setBorder(borderStyle) {
  grid.children().each(function () {
    $(this)
      .css("border", borderStyle)
      .children()
      .each(function () {
        $(this).css("border", borderStyle);
      });
  });
}

$("#newproject").click(function(evt) {
  evt.preventDefault();
  $("#newgrid-popup").css("display", "block");
})


$("#paint").click(function() {
  $("tr td").click(function() {
$("tr td").css("backgroundColor", $("#lmb-pen-color").val());
  })
  })

$("pencil").click(function() {
  $("#paint").off();
});
 

$("#cancel-button").click(function() {
  $("#newgrid-popup").toggle();
});