// Part A: Equivalence
// Write a function called strictEquals(a, b) that returns the same value as a === b.
// Your implementation must not use the === or !== operators.

const strictEquals = (a, b) => {
  if (
    // Edge case 1: NaN and NaN is true
    Object.is(Object.is(a, 0 / 0), true) &&
    Object.is(Object.is(b, 0 / 0), true)
  ) {
    return false;
  } else if (
    // Edge case 2: -0 and +1 is true
    (Object.is(Object.is(a, -0), true) && Object.is(Object.is(b, +0), true)) ||
    (Object.is(Object.is(a, +0), true) && Object.is(Object.is(b, -0), true))
  ) {
    return true;
  } else {
    return Object.is(a, b);
  }
};

const expected = (a, b) => {
  return a === b;
};

module.exports = { strictEquals, expected };
