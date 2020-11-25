/*
Name:Sarthak Bhagat
email: Sarthak_bhagat@student.uml.edu
Course name: GUI I
Assingment #7- Using the JQuery UI Slider And Tab Widgets
File type: .js file
  Sources used: https://www.npmjs.com/package/rules-js
  https://www.w3schools.com/js/js_validation.asp
*/
$.validator.addMethod("greaterThan", function(value, element, param) {
  var target = $(param);

  if (this.settings.onfocusout && target.not(".validate-greaterThan-blur").length) {
    target.addClass("validate-greaterThan-blur").on("blur.validate-greaterThan", function() {
      $(element).valid();
    });
  }
  return Number(value) >= Number(target.val());
});

/* The following functions checks if the user has input any decimals. If they did, spit out a message*/
$.validator.addMethod("noDecimal", function(value, element) {
  return !(value % 1);
}, "No decimals.Please enter an integer.");

/* These indicate all the rules for the values entered used as the input */
jQuery.validator.addClassRules("InsertValues", {
  required: true,
  number: true
});

$(function() {
  $("#insert").validate({
    rules: {
      /*This function creates rules*/
      /*Checks if there is decimal in the first input*/
      mic: {
        noDecimal: [mic, mic]
      },
      /*Checks if there is decimal in the third input*/
      mir: {
        noDecimal: [mir, mir]
      },
      /*Checks if there is decimal in the second input.Also checks for invalid characters and greater number*/
      mac: {
        noDecimal: [mac, mac],
        greaterThan: [mic, mic]
      },
      /*Checks if there is decimal in the fourth input.Also checks for invalid characters and greater number*/
      mar: {
        noDecimal: [mar, mar],
        greaterThan: [mir, mir]
      }
    },

    /*This is used to display an error message and uses jquery plugin as error message*/
    messages: {
      mic: {
        required: "Insert horizontal first value"
      },
      mir: {
        required: "  Insert vertical first value"
      },
      mac: {
        required: "  Insert horizontal second value",
        greaterThan: "Please enter a larger number than first value"
      },
      mar: {
        required: "Insert vertical second value",
        greaterThan: "Please enter a larger number than first value"
      }
    },

    // Generated the table if the rules are followed by the user on clicking the submit button
    submitHandler: function(form) {
      passIntoTable();
    }
  });
});

function passIntoTable() {
  /* Creates variable by taking input from index.html and converts them into an integer value*/
  var min_Col = Number(document.getElementById("mic").value);
  var max_Col = Number(document.getElementById("mac").value);
  var min_Row = Number(document.getElementById("mir").value);
  var max_Row = Number(document.getElementById("mar").value);

  var result = "<tr><th> </th>"; /* Empty value will have a  (0,0) axis. */

  /* Adds the values for the horizontal inputs. */
  for (var i = min_Col; i <= max_Col; i++) {
    result += "<th>" + i + "</th>";
  }
  result += "</tr>";

  /* Adds the values for the vertical inputs. */
  for (var j = min_Row; j <= max_Row; j++) {
    result += "<tr><th>" + j + "</th>";
    for (var k = min_Col; k <= max_Col; k++) {
      result += "<td>" + j * k + "</td>";
    }
    result += "</tr>";
  }

  /*prints the location of the file */
  document.getElementById("print_table").innerHTML = result;
}

function autoSubmit() {
  $("#insert").submit();
}


/* NOTE: All slider values range value is set to -100 to 100.
/* This is to insert sliders for all the inputs*/
//Start slider for horizontal value
$(function() {
  $("#startRowSlider").slider({
    min: -100,
    max: 100,
    animate: "fast",
    slide: function(event, ui) {
      $("#mic").val(ui.value);
      autoSubmit();
    }
  });
  $("#mic").val($("#startRowSlider").slider("value"));
  autoSubmit();
});
// this function links the form fields to the slider values/inputs
$("#mic").change(function() {
  $("#startRowSlider").slider("value", Number(document.getElementById("mic").value));
  autoSubmit();
});

// End Slider for Horizontal Values
$(function() {
  $("#endRowSlider").slider({
    min: -100,
    max: 100,
    animate: "fast",
    slide: function(event, ui) {
      $("#mac").val(ui.value);
      autoSubmit();
    }
  });
  $("#mac").val($("#endRowSlider").slider("value"));
  autoSubmit();
});

$("#mac").change(function() {
  $("#endRowSlider").slider("value", Number(document.getElementById("mac").value));
  autoSubmit();
});

// Start Slider for Vertical Values
$(function() {
  $("#startColumnSlider").slider({
    min: -100,
    max: 100,
    animate: "fast",
    slide: function(event, ui) {
      $("#mir").val(ui.value);
      autoSubmit();
    }
  });
  $("#mir").val($("#startColumnSlider").slider("value"));
  autoSubmit();
});

$("#mir").change(function() {
  $("#startColumnSlider").slider("value", Number(document.getElementById("mir").value));
  autoSubmit();
});

// End Slider for Vertical Values
$(function() {
  $("#endColumnSlider").slider({
    min: -100,
    max: 100,
    animate: "fast",
    slide: function(event, ui) {
      $("#mar").val(ui.value);
      autoSubmit();
    }
  });
  $("#mar").val($("#endColumnSlider").slider("value"));
  autoSubmit();
});

$("#mar").change(function() {
  $("#endColumnSlider").slider("value", Number(document.getElementById("mar").value));
  autoSubmit();
});
//Table TRacker function helps in taking the user inputs and create tabs and tabs title
// which is just the horizontall X horizontal2 and vertical1 X vertical2 values as header.
var tabularCount = 1;

function tableTracker() {
  $("#tabs").tabs();
  var horizontall = Number(document.getElementById("mic").value);
  var horizontal2 = Number(document.getElementById("mac").value);
  var vertical1 = Number(document.getElementById("mir").value);
  var vertical2 = Number(document.getElementById("mar").value);

  tabularCount++;
  var title = "<li class='tab'><a href='#tab-" + tabularCount + "'>" + horizontall +
    " X " + horizontal2 + " , " + vertical1 + " X " + vertical2 + "</a>" +
    "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";
  $("div#tabs ul").append(title);
  $("div#tabs").append('<div id="tab-' + tabularCount + '">' + $("#multiplicationtable").html() + '</div>');

  $("#tabs").tabs("refresh");
  $("#tabs").tabs("option", "active", -1);

  // this helps in removing the TAB and allows refreshing
  $("#tabs").on("click", "span.ui-icon-close", function() {
    var delTable = $(this).closest("li").remove().attr("aria-controls");
    $("#" + delTable).remove();
    $("#tabs").tabs("refresh");;
  });
}
