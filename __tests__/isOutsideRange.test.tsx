import moment from "moment";
import { isOutsideRange } from "@/utils/helpers";

// Mock Data
const bookings = [
  { startDate: "04-10-2024" },
  { startDate: "04-15-2024" },
  { startDate: "04-20-2024" },
];
const startDate = moment("04-12-2024");
const minDate = moment("04-05-2024");
const maxDate = moment("04-25-2024");

// Begin Unit Tests
describe("isOutsideRange Function", () => {
  it("should return false when date is within the range", () => {
    // Scenario: date is between the closest booking date and maxDate, but not including the closest booking date's day const date = moment('04-15-16');
    expect(
      isOutsideRange(
        moment("04-14-2024"),
        startDate,
        bookings,
        minDate,
        maxDate,
      ),
    ).toBeFalsy();
  });

  it("should return true when date is before minDate", () => {
    const date = moment("2024-04-04");
    expect(
      isOutsideRange(date, startDate, bookings, minDate, maxDate),
    ).toBeTruthy();
  });

  it("should return true when date is after maxDate", () => {
    const date = moment("2024-04-26");
    expect(
      isOutsideRange(date, startDate, bookings, minDate, maxDate),
    ).toBeTruthy();
  });

  it("should return true when the date is exactly on the day of a booking", () => {
    // Scenario: date is exactly on a booking start date const date = moment('04-15-2024');
    expect(
      isOutsideRange(moment(), startDate, bookings, minDate, maxDate),
    ).toBeTruthy();
  });

  it("should return false when date is before the closest booking date to the provided start date", () => {
    const date = moment("04-14-2024");
    expect(
      isOutsideRange(date, startDate, bookings, minDate, maxDate),
    ).toBeFalsy();
  });

  it("should handle when no startDate is provided", () => {
    const date = moment("2024-04-12");
    expect(isOutsideRange(date, null, bookings, minDate, maxDate)).toBeFalsy();
  });
});
