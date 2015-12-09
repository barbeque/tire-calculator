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

  newValues.difference = getCircumferenceDifference(oldValues.circumference, newValues.circumference);
  newValues.speedAtOneHundred = getSpeedAtOneHundred(oldValues.circumference, newValues.circumference);

  display(oldValues, newValues);
}

function display(oldV, newV) {
  var templateSource =
  "<h2>Diameter (inches)</h2>" +
  "<p>{{formatInches diameter}}</p>" +
  "<h2>Circumference (inches)</h2>" +
  "<p>{{formatInches circumference}}</p>" +
  "{{#if difference}}" +
  "<h2>Circumference difference (%)</h2>" +
  "{{formatPercent difference}}" +
  "<h2>Road Speed at Indicated 100kph</h2>" +
  "{{formatSpeed speedAtOneHundred}}" +
  "{{/if}}";
  template = Handlebars.compile(templateSource);

  $(".results").empty();
  $("#originalResults").append(template(oldV));
  $("#newResults").append(template(newV));
}

function _loadCarList() {
  cars = [
    { text: "92 Honda Civic", value: "175 70 13" },
    { text: "97 Mazda Miata", value: "185 60 14" },
    { text: "03 Subaru Impreza", value: "195 60 15"},
    { text: "03 Subaru WRX", value: "205 55 16" }
  ];

  l = $("#carList")

  l.html('');
  l.append($("<option/>", {
    text: "predefined cars...",
    value: null
  }));

  $.each(cars, function(index, carChoice) {
    l.append($("<option/>", carChoice))
  });
}

function _getValues(tireSize) {
  return {
    diameter: getDiameterForTireSize(tireSize),
    circumference: getCircumferenceForTireSize(tireSize)
  };
}

Handlebars.registerHelper('formatInches', _formatInches);
Handlebars.registerHelper('formatPercent', _formatDifference);
Handlebars.registerHelper('formatSpeed', _formatSpeed);

$("#goButton").on('click', function(e) {
  calculateAndDisplay();
});

_loadCarList();

$("#carList").change(function(c) {
  selectedValues = $("#carList option:selected");
  if(selectedValues.length > 0) {
    // Prefill the current tire size
    selectedValue = $("#carList option:selected")[0].value;
    $("#originalTireSize").val(selectedValue);
  }
});
