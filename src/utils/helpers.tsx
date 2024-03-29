import moment from "moment";
type ClampProp = {
  min: number;
  max: number;
  value: number;
};

type calcPriceCheckoutProp = {
  startDate: string | Date | null;
  endDate: string | Date | null;
  averageDailyRate: number;
  fee?: number;
};

export function calcPriceCheckout({
  startDate,
  endDate,
  averageDailyRate,
  fee = 0,
}: calcPriceCheckoutProp): number {
  const a = moment(startDate, "MM-DD-YYYY");
  const b = moment(endDate, "MM-DD-YYYY");

  return b.diff(a, "days") * averageDailyRate + fee;
}

/**
 * @type {string | Date}
 * format date to Month/Day/Year
 */
export function formatDate(date: string | Date | null): string {
  return moment(date).format("MM-DD-YYYY");
}

/**
 * Math.max function takes min and max numbers and keep the value between this numbers
 */
export function clamp({ min, max, value }: ClampProp): number {
  return Math.max(min, Math.min(max, value));
}

// verify if  date is between the closest booking date and maxDate
export function isOutsideRange(date, startDate, bookings, minDate, maxDate) {
  if (startDate) {
    let book: any[] = [];

    bookings.map((booking) => book.push(booking.startDate));

    const closestDate = book.find((b) => {
      const diff = moment(b).diff(startDate, "days");
      return diff >= 0;
    });

    if (!closestDate) return date.isAfter(maxDate) || date.isBefore(minDate);

    return date.isAfter(closestDate) || date.isBefore(minDate);
  }

  return date.isAfter(maxDate) || date.isBefore(minDate);
}
