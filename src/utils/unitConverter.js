const METER_TO_MILE = 0.00062137;

export const metersToMiles = (meter, fractionDigits = 1) =>
  (meter * METER_TO_MILE).toFixed(fractionDigits);
