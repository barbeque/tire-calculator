module("parsing");

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
