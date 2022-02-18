import { formatJobList, formatQueryParams } from "./Results";

describe("The formatJobList function", () => {
  it("should add a coma to a word", () => {
    expect(formatJobList("item2", 3, 1)).toEqual("item2,");
  });

  it("should not add a coma to a word", () => {
    expect(formatJobList("item3", 3, 2)).toEqual("item3");
  });
});

describe("The formatQueryParams function", () => {
  it("should use the right format for para", () => {
    const result = "a1=true";
    expect(formatQueryParams({ 1: true })).toEqual(result);
  });

  it("should concatenate params with an &", () => {
    const result = "a1=true&a2=false";
    expect(formatQueryParams({ 1: true, 2: false })).toEqual(result);
  });
});
