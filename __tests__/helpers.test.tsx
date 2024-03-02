import { calcPriceCheckout, formatDate, clamp } from "@/utils/helpers";

describe("calcPriceCheckout tests", () => {
  it("should calculate the correct price without fee", () => {
    const props = {
      startDate: "01-01-2023",
      endDate: "01-10-2023",
      averageDailyRate: 100,
    };
    expect(calcPriceCheckout(props)).toBe(900);
  });

  it("should calculate the correct price with fee", () => {
    const props = {
      startDate: "01-01-2023",
      endDate: "01-10-2023",
      averageDailyRate: 100,
      fee: 50,
    };
    expect(calcPriceCheckout(props)).toBe(950);
  });

  it("returns fee when no days in between", () => {
    const props = {
      startDate: "01-01-2023",
      endDate: "01-01-2023",
      averageDailyRate: 100,
      fee: 100,
    };
    expect(calcPriceCheckout(props)).toBe(100);
  });
});

describe("formatDate tests", () => {
  it("should format Date object correctly", () => {
    const date = new Date("2023-01-01T00:00:00");
    expect(formatDate(date)).toBe("01-01-2023");
  });

  it("should format string date correctly", () => {
    expect(formatDate("2023-01-01")).toBe("01-01-2023");
  });

  it("returns an empty string for null", () => {
    expect(formatDate(null)).toBe("Invalid date");
  });
});

describe("clamp tests", () => {
  it("clamps value to min if below min", () => {
    expect(clamp({ min: 1, max: 5, value: 0 })).toBe(1);
  });

  it("clamps value to max if above max", () => {
    expect(clamp({ min: 1, max: 5, value: 6 })).toBe(5);
  });

  it("returns value if within range", () => {
    expect(clamp({ min: 1, max: 5, value: 3 })).toBe(3);
  });

  it("handles min and max being the same", () => {
    expect(clamp({ min: 5, max: 5, value: 3 })).toBe(5);
  });

  it("returns value if min and max are reversed and value is out of original bounds", () => {
    expect(clamp({ min: 5, max: 3, value: 6 })).toBe(5);
    expect(clamp({ min: 5, max: 3, value: 2 })).toBe(5);
  });
});
