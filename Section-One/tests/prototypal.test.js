const Square = require("../prototypal");
var expect = require("chai").expect;

describe("Prototypal Tests", () => {
  describe("Equal sides", () => {
    it("A squire with sides 1, 1, 1, 1 is a square", () => {
      let newSquare = new Square(1, 1, 1, 1);
      expect(newSquare.isSquare()).to.equal(true);
    });
    it("A squire with sides 10, 10, 10, 10 is a square", () => {
      let newSquare = new Square(10, 10, 10, 10);
      expect(newSquare.isSquare()).to.equal(true);
    });
    it("A squire with sides 100, 100, 100, 100 is a square", () => {
      let newSquare = new Square(100, 100, 100, 100);
      expect(newSquare.isSquare()).to.equal(true);
    });
  });

  describe("Unequal sides", () => {
    it("A squire with sides 1, 2, 1, 2 is not a square", () => {
      let newSquare = new Square(1, 2, 1, 2);
      expect(newSquare.isSquare()).to.equal(false);
    });
    it("A squire with sides 12, 24, 36, 48 is not a square", () => {
      let newSquare = new Square(12, 24, 36, 48);
      expect(newSquare.isSquare()).to.equal(false);
    });
    it("A squire with sides 10, 10, 10, 20 is not a square", () => {
      let newSquare = new Square(10, 10, 10, 20);
      expect(newSquare.isSquare()).to.equal(false);
    });
  });

  describe("Non-numbers", () => {
    it("A squire with sides null, null, null, null is not a square", () => {
      let newSquare = new Square(null, null, null, null);
      expect(newSquare.isSquare()).to.equal(false);
    });
    it("A squire with sides undefined, undefined, undefined, undefined is not a square", () => {
      let newSquare = new Square(undefined, undefined, undefined, undefined);
      expect(newSquare.isSquare()).to.equal(false);
    });
    it("A squire with sides NaN, NaN, NaN, NaN is not a square", () => {
      let newSquare = new Square(NaN, NaN, NaN, NaN);
      expect(newSquare.isSquare()).to.equal(false);
    });
    it("A squire with sides '10', '10', '10', '10' is not a square", () => {
      let newSquare = new Square("10", "10", "10", "10");
      expect(newSquare.isSquare()).to.equal(false);
    });
    it("A squire with sides [], [], [], [] is not a square", () => {
      let newSquare = new Square([], [], [], []);
      expect(newSquare.isSquare()).to.equal(false);
    });
    it("A squire with sides array [1], [1], [1], [1] is not a square", () => {
      let foo = [1];
      let newSquare = new Square(foo, foo, foo, foo);
      expect(newSquare.isSquare()).to.equal(false);
    });
    it("A squire with sides false, false, false, false is not a square", () => {
      let newSquare = new Square(false, false, false, false);
      expect(newSquare.isSquare()).to.equal(false);
    });
    it("A squire with sides true, true, true, true is not a square", () => {
      let newSquare = new Square(true, true, true, true);
      expect(newSquare.isSquare()).to.equal(false);
    });
    it("A squire with sides true, false, true, false is not a square", () => {
      let newSquare = new Square(true, false, true, false);
      expect(newSquare.isSquare()).to.equal(false);
    });
    it("A squire with sides 'foo', 'foo', 'foo', 'foo' is not a square", () => {
      let newSquare = new Square("foo", "foo", "foo", "foo");
      expect(newSquare.isSquare()).to.equal(false);
    });
    it("A squire with sides of object foo, foo, foo, foo is not a square", () => {
      let foo = { a: 1 };
      let newSquare = new Square(foo, foo, foo, foo);
      expect(newSquare.isSquare()).to.equal(false);
    });
    it("A squire with sides Infinity, Infinity, Infinity, Infinity is not a square", () => {
      let newSquare = new Square(Infinity, Infinity, Infinity, Infinity);
      expect(newSquare.isSquare()).to.equal(false);
    });
  });

  describe("Negative numbers and zero", () => {
    it("A squire with sides -1, -1, -1, -1 is not a square", () => {
      let newSquare = new Square(-1, -1, -1, -1);
      expect(newSquare.isSquare()).to.equal(false);
    });
    it("A squire with sides -12, -24, -36, -48 is not a square", () => {
      let newSquare = new Square(-12, -24, -36, -48);
      expect(newSquare.isSquare()).to.equal(false);
    });
    it("A squire with sides 0, 0, 0, 0 is not a square", () => {
      let newSquare = new Square(0, 0, 0, 0);
      expect(newSquare.isSquare()).to.equal(false);
    });
  });
});
