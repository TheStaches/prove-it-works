const express = require("express");
const expect = require("chai").expect;
const path = require("path");
const Nightmare = require("nightmare");

const app = express();

app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../dist")));

const url = "http://localhost:8888";

const nightmare = Nightmare();

describe("End to End Tests", () => {
  let httpServer = null;
  let pageObject = null;
  
  before((done) => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach(() => {
    pageObject = nightmare.goto(url);
  });

  after((done) => {
    httpServer.close();
    done();
  });

  it("should contain a <h1> element for your page title", () => {
    return pageObject
      .evaluate(() => document.querySelector("h1").innerText)
      .then(headerText => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal("Mortgage Calculator");
      });
  });

  it("should contain a <button> element with the text Calculate", () => {
    return pageObject
      .evaluate(() => document.querySelector("button").innerText)
      .then(text => {
      expect(text).to.not.be.null;
      expect(text).to.equal("Calculate");
      });
  });

  it("should contain a <select> element with the first option Monthly", () => {
    return pageObject
      .evaluate(() => document.querySelector("option").innerText)
      .then(text => {
      expect(text).to.not.be.null;
      expect(text).to.equal("Monthly");
      });
  });

  it("should correctly calculate mortgage", () => 
    pageObject
      .wait()
      .type("input[name=principal]", 300000)
      .type("input[name=interestRate]", 3.75)
      .type("input[name=loanTerm]", 30)
      .select("select[name=period]", 12)
      .click("button#calculate")
      .wait("#output")
      .evaluate(() => document.querySelector("#output").innerText)
      .then((outputText) => {
        expect(outputText).to.equal("$1389.35");
      })
  ).timeout(6500)
});