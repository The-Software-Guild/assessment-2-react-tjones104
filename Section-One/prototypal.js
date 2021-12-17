// Part B: Prototypal Inheritance
// You are given a function, Square, that takes four parameters, A, B, C, and D, denoting the length of the square's edges.
// Using prototype properties, add a method to Square named isSquare that prints true if a Square object has equal edges and false if they are unequal.
function Square(A, B, C, D) {
  this.A = A;
  this.B = B;
  this.C = C;
  this.D = D;
}

// example test code
// function processData(input) {
//   let sq1 = new Square(input[0], input[1], input[2], input[3]);
//   sq1.isSquare();

//   console.log(Object.getPrototypeOf(sq1));
// }

// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// _input = "";
// process.stdin.on("data", function (input) {
//   _input += input;
// });

// process.stdin.on("end", function () {
//   _input = _input.split(' ').map(num => Number(num));
//   processData(_input);
// });
