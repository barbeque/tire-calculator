function calculateAndDisplay() {
  // TODO: just do knockout
  var originalRaw = $("#originalTireSize").text();
  var newRaw = $("#newTireSize").text();

  var originalTireSize = parseTireSize(originalRaw);
  if(!validateTireSize(originalTireSize)) {
    // TODO: Fail validation somehow.
  }

  var newTireSize = parseTireSize(newRaw);
  if(!validateTireSize(newTireSize)) {
    // TODO: Fail validation somehow.
  }

  var oldValues = _getValues(originalTireSize);
  var newValues = _getValues(newTireSize);

  display(oldValues, newValues);
}

function display(oldV, newV) {
  var templateSource =
  "<h2>Diameter (inches)</h2>" +
  "<p>{{diameter}}</p>" +
  "<h2>Circumference (inches)</h2>" +
  "<p>{{circumference}}</p>";
  template = Handlebars.compile(templateSource);

  $("#results").clear();
  $("#results").append(template(oldV));
  $("#results").append(template(newV));
}

function _getValues(tireSize) {
  return {
    diameter: getDiameterForTireSize(tireSize),
    circumference: getCircumferenceForTireSize(tireSize)
  };
}

$("#goButton").on('click', function(e) {
  calculateAndDisplay();
});
