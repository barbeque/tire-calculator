function calculateAndDisplay() {
  // TODO: just do knockout
  _resetOops();

  var originalRaw = $("#originalTireSize").val();
  var newRaw = $("#newTireSize").val();

  var originalTireSize = parseTireSize(originalRaw);
  if(!validateTireSize(originalTireSize)) {
    _oops("#originalTireSize"); return;
  }

  var newTireSize = parseTireSize(newRaw);
  if(!validateTireSize(newTireSize)) {
    _oops("#newTireSize"); return;
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
    { text: "02-05 Subaru WRX", value: "205 55 16" },
    { text: "06-07 Subaru WRX", value: "215 45 17" }
  ];

  l = $("#carList")

  l.html('');
  l.append($("<option/>", {
    text: "predefined cars...",
    value: ""
  }));

  $.each(cars, function(index, carChoice) {
    l.append($("<option/>", carChoice))
  });
}

function _oops(who) {
  $(who).parent().addClass("has-error");
}

function _resetOops() {
  $("#newTireSize,#originalTireSize").each(function() {
    $(this).parent().removeClass("has-error");
  });
}

function _getValues(tireSize) {
  return {
    diameter: getDiameterForTireSize(tireSize),
    circumference: getCircumferenceForTireSize(tireSize)
  };
}

function _enterWasPressed(ev) {
  var key = ev.keyCode ? ev.keyCode : ev.which;
  return key == 13;
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

$("#originalTireSize").keydown(function(ev) {
  if(_enterWasPressed(ev)) {
    $("#newTireSize").focus();
    $("#newTireSize").select();
  }
});

$("#newTireSize").keydown(function(ev) {
  if(_enterWasPressed(ev)) {
    $("#goButton").click();
  }
});
