const { strictEquals, expected } = require("../equivalence");
var expect = require("chai").expect;

describe("Equivalence Tests", () => {
  // Numbers
  describe("Numbers: ", () => {
    it("True: 0 and 0 are strictly equal", () => {
      expect(strictEquals(0, 0)).to.equal(expected(0, 0));
    });
    it("False: 0 and 1 not are strictly equal", () => {
      expect(strictEquals(0, 1)).to.equal(expected(0, 1));
    });
  });

  // Undefined
  describe("Undefined: ", () => {
    it("True: undefined and undefined are strictly equal", () => {
      expect(strictEquals(undefined, undefined)).to.equal(
        expected(undefined, undefined)
      );
    });
  });

  // null
  describe("Null: ", () => {
    it("True: null and null are strictly equal", () => {
      expect(strictEquals(null, null)).to.equal(expected(null, null));
    });
  });

  // booleans
  describe("Booleans: ", () => {
    it("True: false and false are strictly equal", () => {
      expect(strictEquals(false, false)).to.equal(expected(false, false));
    });
    it("False: true and false are not strictly equal", () => {
      expect(strictEquals(true, false)).to.equal(expected(true, false));
    });
  });

  // strings
  describe("Strings: ", () => {
    it("True: 'foo' and 'foo' are strictly equal", () => {
      expect(strictEquals("foo", "foo")).to.equal(expected("foo", "foo"));
    });
    it("False: 'foo' and 'bar' are not strictly equal", () => {
      expect(strictEquals("foo", "bar")).to.equal(expected("foo", "bar"));
    });
  });

  // arrays
  describe("Arrays: ", () => {
    it("False: [] and [] are not strictly equal", () => {
      expect(strictEquals([], [])).to.equal(expected([], []));
    });
  });

  // objects
  describe("Objects: ", () => {
    it("True: Object foo and Object foo are strictly equal", () => {
      let foo = { a: 1 };
      expect(strictEquals(foo, foo)).to.equal(expected(foo, foo));
    });
    it("False: Object foo and Object bar are not strictly equal", () => {
      let foo = { a: 1 };
      let bar = { a: 1 };
      expect(strictEquals(foo, bar)).to.equal(expected(foo, bar));
    });
  });

  // -0 and +0
  describe("-0 and +0: ", () => {
    it("True: -0 and +0 are strictly equal", () => {
      expect(strictEquals(-0, +0)).to.equal(expected(-0, +0));
    });
    it("True: +0 and -0 are strictly equal", () => {
      expect(strictEquals(+0, -0)).to.equal(expected(+0, -0));
    });
  });

  // NaN
  describe("NaN: ", () => {
    it("False: NaN and NaN are not strictly equal", () => {
      expect(strictEquals(NaN, NaN)).to.equal(expected(NaN, NaN));
    });
  });

  // Different Types
  describe("Different Types: ", () => {
    it("False: '0' and 0 are not strictly equal", () => {
      expect(strictEquals("0", 0)).to.equal(expected("0", 0));
    });
    it("False: '' and false are not strictly equal", () => {
      expect(strictEquals("", false)).to.equal(expected("", false));
    });
    it("False: [1,2] and '1,2' are not strictly equal", () => {
      expect(strictEquals([1, 2], "1,2")).to.equal(expected([1, 2], "1,2"));
    });
    it("False: new String('foo') and 'foo' are not strictly equal", () => {
      expect(strictEquals(new String("foo"), "foo")).to.equal(
        expected(new String("foo"), "foo")
      );
    });
    it("False: true and 1 are not strictly equal", () => {
      expect(strictEquals(true, 1)).to.equal(expected(true, 1));
    });
    it("False: false and 0 are not strictly equal", () => {
      expect(strictEquals(false, 0)).to.equal(expected(false, 0));
    });
    it("False: null and undefined are not strictly equal", () => {
      expect(strictEquals(null, undefined)).to.equal(expected(null, undefined));
    });
  });
});
