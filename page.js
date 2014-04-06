function calculateAndDisplay() {
  // TODO: just do knockout
  var originalRaw = $("#originalTireSize").val();
  var newRaw = $("#newTireSize").val();

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
  "<p>{{formatInches diameter}}</p>" +
  "<h2>Circumference (inches)</h2>" +
  "<p>{{formatInches circumference}}</p>";
  template = Handlebars.compile(templateSource);

  $(".results").empty();
  $("#originalResults").append(template(oldV));
  $("#newResults").append(template(newV));
}

function _getValues(tireSize) {
  return {
    diameter: getDiameterForTireSize(tireSize),
    circumference: getCircumferenceForTireSize(tireSize)
  };
}

Handlebars.registerHelper('formatInches', _formatInches);

$("#goButton").on('click', function(e) {
  calculateAndDisplay();
});
