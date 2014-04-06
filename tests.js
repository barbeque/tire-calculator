module("parsing");
test("exhaustive freetext test", function() {
  var codes =
  [
    '225 45 17',
    '225-45-17',
    '225/45/17',
    '225/45ZR17',
    '225-45 17',
    '   225    45    - 17'
  ];
  for(var c in codes) {
    var determined = parseTireSize(codes);
    ok(validateTireSize(determined), 'Returned tire code for ' + c + ' failed validation.');
    ok(determined.wheelDiameter == 17, 'Wheel diameter should have been 17 but was ' + determined.wheelDiameter);
    ok(determined.profile == 45, 'Profile should have been 45 but was ' + determined.profile);
    ok(determined.width == 225, 'Tire width should have been 225 but was ' + determined.width);
  }
});

module("calculating");
test("known tire diameter for miata tires", function() {
  var tireSize = {
    width: 185,
    profile: 60,
    wheelDiameter: 15
  };
  var computedDiameter = getDiameterForTireSize(tireSize);
  closeEnough(computedDiameter, 23.7, 0.1, "94 Miata tires are 23.7 inches tall, but the calculator returned " + computedDiameter);
});

function closeEnough(provided, expected, tolerance, message) {
  ok(provided > expected - tolerance && provided < expected + tolerance, message);
}
