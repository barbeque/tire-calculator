function parseTireSize(input) {
  // Should be of the form:
  // xxx yy zz
  // or Pxxx yy zz
  // or Pxxx/yy/zz
  // or xxx yy ZR zz
  // or xxx-yy-zz etc.
}

function validateTireSize(tireSize) {
  // Minimum sizes pulled out of thin air
  if(!tireSize.wheelDiameter || tireSize.wheelDiameter < 3) {
    return false;
  }
  if(!tireSize.profile || tireSize.profile <= 10) {
    return false;
  }
  if(!tireSize.width || tireSize.width < 80) {
    return false;
  }

  return true; // yay
}

function getDiameterForTireSize(tireSize) {
  // Convert section width to imperial
  var widthInches = tireSize.width / 25.4;
  // Get the diameter for tire size
  var sidewallHeight = widthInches * (tireSize.profile / 100);
  var diameter = sidewallHeight * 2 + tireSize.wheelDiameter;
  return diameter;
}

function getCircumferenceForTireSize(tireSize) {
  var diameter = getDiameterForTireSize(tireSize);
  return Math.PI * diameter;
}
