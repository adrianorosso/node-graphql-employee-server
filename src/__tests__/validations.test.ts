import { isIdValid, isDurationValid } from "../utils/validations";

describe("Test the ID validations", () => {
  it("Should return TRUE for VALID ID values", () => {
    expect(isIdValid(1)).toBeTruthy();
    expect(isIdValid(42)).toBeTruthy();
    expect(isIdValid(999)).toBeTruthy();
    expect(isIdValid(9999999999999)).toBeTruthy();
  });

  it("Should return FALSE for INVALID ID values", () => {
    expect(isIdValid(-1)).toBeFalsy();
    expect(isIdValid(0)).toBeFalsy();
    expect(isIdValid(-34.5)).toBeFalsy();
    expect(isIdValid(9999999.999)).toBeFalsy();
  });
});

describe("Test the duration validations", () => {
  it("Should return TRUE for VALID duration values", () => {
    expect(isDurationValid(1)).toBeTruthy();
    expect(isDurationValid(42)).toBeTruthy();
    expect(isDurationValid(999)).toBeTruthy();
  });

  it("Should return FALSE for INVALID duration values", () => {
    expect(isDurationValid(-1)).toBeFalsy();
    expect(isDurationValid(0)).toBeFalsy();
    expect(isDurationValid(-34.5)).toBeFalsy();
    expect(isDurationValid(1000)).toBeFalsy();
    expect(isDurationValid(9999999.999)).toBeFalsy();
  });
});
