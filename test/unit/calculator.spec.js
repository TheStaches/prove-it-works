const expect =require("chai").expect;
const Calculator = require("../../src/js/lib/Calculator");

describe("Calculator", () => {
  let calculator = null;

  beforeEach(() => {
    calculator = new Calculator();
  });

  // Add
  it("should have an add function", () => {
    expect(calculator.add).to.exist;
  });
  // Subtract
  it("should have an add function", () => {
    expect(calculator.subtract).to.exist;
  });
  // Multiply
  it("should have an add function", () => {
    expect(calculator.multiply).to.exist;
  });
  // Divide
  it("should have an add function", () => {
    expect(calculator.divide).to.exist;
  });

  it("should add 2 + 2 together correctly", () => {
    expect(calculator.add(2, 2)).to.equal(4);
  });

  it("should subtract 2 - 2 together correctly", () => {
    expect(calculator.subtract(2, 2)).to.equal(0);
  });

  it("should multiply 2 * 2 together correctly", () => {
    expect(calculator.multiply(2, 2)).to.equal(4);
  });

  it("should divide 2 / 2 together correctly", () => {
    expect(calculator.divide(2, 2)).to.equal(1);
  });

});


