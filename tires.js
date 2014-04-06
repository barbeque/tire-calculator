function parseTireSize(input) {
  // Should be of the form:
  // xxx yy zz
  // or Pxxx yy zz
  // or Pxxx/yy/zz
  // or xxx yy ZR zz
  // or xxx-yy-zz etc.

  // I know! I'll use REGULAR EXPRESSIONS.
  // Hoo boy here we go.
  var regex = /\D*(\d+)\D*(\d+)\D*(\d+)\D*/g;
  var match = regex.exec(input);

  if(!match || match.length < 3) {
    // something has gone wrong.
    return {};
  }

  a = parseInt(match[1]);
  b = parseInt(match[2]);
  c = parseInt(match[3]);

  return {
    width: a,
    profile: b,
    wheelDiameter: c
  };
}

function validateTireSize(tireSize) {
  // Minimum sizes pulled out of thin air
  if(!tireSize.wheelDiameter || isNaN(tireSize.wheelDiameter) || tireSize.wheelDiameter < 3) {
    return false;
  }
  if(!tireSize.profile || isNaN(tireSize.profile) || tireSize.profile <= 10) {
    return false;
  }
  if(!tireSize.width || isNaN(tireSize.width) || tireSize.width < 80) {
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

function _formatInches(inches) {
  capped = _cap(inches);
  return capped + " in.";
}

function getCircumferenceDifference(oldCircumference, newCircumference) {
  return newCircumference / oldCircumference;
}

function getSpeedAtOneHundred(oldCircumference, newCircumference) {
  // Revs per mile...
  // 1 mile = 63360 inches
  var oldRevsPerMile = 63360 / oldCircumference;
  var newRevsPerMile = 63360 / newCircumference;

  // At 60mph...
  var oldRevsAtSixty = oldRevsPerMile * 62.1371;
  // At the same amount of revs, how much is the speedo reading?
  var newMilesPerHour = oldRevsAtSixty / newRevsPerMile;

  // Convert to KPH.
  return (newMilesPerHour / 62.1371) * 100;
}

function _formatDifference(difference) {
  // Expect fractional..
  var d = difference - 1;
  if(d == 0) {
    return "none";
  }
  // TODO: Ghetto copy and paste here...
  var percentile = d*100;
  capped = _cap(percentile);
  return capped + "%";
}

function _formatSpeed(speedo) {
  var capped = _cap(speedo);
  return capped + " km/h";
}

function _cap(input) {
  var stringified = input.toString();
  capped = (stringified.indexOf(".") >= 0) ? stringified.substr(0, stringified.indexOf(".") + 3) : stringified;
  return capped;
}
