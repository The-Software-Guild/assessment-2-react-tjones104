const chaiHttp = require("chai-http");
const chai = require("chai");
const server = require("../server");

chai.should();

chai.use(chaiHttp);

// Describe tests
describe("Api Tests", () => {
  // Test GET
  describe("GET /api/itemsIntake", () => {
    it("Should GET all the items", (done) => {
      chai
        .request(server)
        .get("/api/itemsIntake")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eq(2);
          done();
        });
    });
    it("Should NOT GET any items", (done) => {
      chai
        .request(server)
        .get("/api/items")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  // Test GET QUERY
  describe("GET ONE QUERY /api/itemsIntake/:id", () => {
    it("Should GET item/s with query", (done) => {
      const param = "?series=CX";
      chai
        .request(server)
        .get("/api/itemsIntake" + param)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.be.a("object");
          res.body[0].should.have.property("name").eq("C7X");
          res.body[0].should.have.property("series").eq("CX");
          res.body[0].should.have.property("digital").eq(false);
          res.body[0].should.have
            .property("colors")
            .members(["black", "grey", "brown"]);
          res.body[0].should.have.property("price").eq(82999.0);
          res.body[0].should.have.property("_id").eq("123");
          done();
        });
    });
    it("Should NOT GET item/s with incorrect query", (done) => {
      const param = "?type=1";
      chai
        .request(server)
        .get("/api/itemsIntake" + param)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq("This query could not found");
          done();
        });
    });
  });

  // Test GET ONE
  describe("GET ONE /api/itemsIntake/:id", () => {
    it("Should GET ONE item passing id param", (done) => {
      const _id = "123";
      chai
        .request(server)
        .get("/api/itemsIntake/" + _id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name").eq("C7X");
          res.body.should.have.property("series").eq("CX");
          res.body.should.have.property("digital").eq(false);
          res.body.should.have
            .property("colors")
            .members(["black", "grey", "brown"]);
          res.body.should.have.property("price").eq(82999.0);
          res.body.should.have.property("_id").eq("123");
          done();
        });
    });
    it("Should NOT GET ONE item passing incorrect id param", (done) => {
      const _id = "abc";
      chai
        .request(server)
        .get("/api/itemsIntake/" + _id)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq("The id was not found");
          done();
        });
    });
  });

  // Test POST
  describe("POST /api/itemsIntake", () => {
    it("Should POST a new item", (done) => {
      const item = {
        name: "YUS3",
        series: "YUS",
        digital: false,
        colors: ["black", "grey", "white"],
        price: 19599.0,
      };
      chai
        .request(server)
        .post("/api/itemsIntake")
        .send(item)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[2].should.be.a("object");
          res.body[2].should.have.property("name").eq("YUS3");
          res.body[2].should.have.property("series").eq("YUS");
          res.body[2].should.have.property("digital").eq(false);
          res.body[2].should.have
            .property("colors")
            .members(["black", "grey", "white"]);
          res.body[2].should.have.property("price").eq(19599.0);
          res.body[2].should.have.property("_id");
          res.body.length.should.be.eq(3);
          done();
        });
    });
    it("Should NOT POST a new item", (done) => {
      const item = {
        name: "YUS3",
        series: "YUS",
        digital: false,
        colors: ["black", "grey", "white"],
      };
      chai
        .request(server)
        .post("/api/itemsIntake")
        .send(item)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq("Incorrect number of properties");
          done();
        });
    });
  });

  // Test PUT
  describe("PUT /api/itemsIntake/:id", () => {
    it("Should PUT an existing item passing id param", (done) => {
      const _id = "123";
      const item = {
        name: "CSP-170",
        series: "Clavinova",
        digital: true,
        colors: ["black", "grey"],
        price: 5999.0,
      };
      chai
        .request(server)
        .put("/api/itemsIntake/" + _id)
        .send(item)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name").eq("CSP-170");
          res.body.should.have.property("series").eq("Clavinova");
          res.body.should.have.property("digital").eq(true);
          res.body.should.have.property("colors").members(["black", "grey"]);
          res.body.should.have.property("price").eq(5999.0);
          res.body.should.have.property("_id");
          done();
        });
    });
    it("Should NOT PUT an existing item passing incorrect id param", (done) => {
      const _id = "abc";
      const item = {
        name: "CSP-170",
        series: "Clavinova",
        digital: true,
        colors: ["black", "grey"],
        price: 5999.0,
      };
      chai
        .request(server)
        .put("/api/itemsIntake/" + _id)
        .send(item)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq("The id was not found");
          done();
        });
    });
  });
  //   // Test DELETE
  describe("DELETE /api/itemsIntake/:id", () => {
    it("Should DELETE an existing item passing id param", (done) => {
      const _id = "123";
      chai
        .request(server)
        .delete("/api/itemsIntake/" + _id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eq(2);
          done();
        });
    });
    it("Should NOT DELETE an existing item passing incorrect id param", (done) => {
      const _id = "abc";
      chai
        .request(server)
        .delete("/api/itemsIntake/" + _id)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq("The id was not found");
          done();
        });
    });
  });
});
