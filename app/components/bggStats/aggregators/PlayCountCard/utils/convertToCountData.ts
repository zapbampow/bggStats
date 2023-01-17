import dayjs from "dayjs";
import type { PlayCountDateGroup } from "../../types";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";

const convertToCountData = (data: PlayDataModel[]) => {
  let countData: PlayCountDateGroup[] = data.reduce(
    (acc: PlayCountDateGroup[], cur) => {
      const data = dayjs(cur.date);
      let curYear = data.format("YYYY");
      let curMonth = data.format("MMM");
      let curMonthNum = data.month();
      let curYearIndex = acc.findIndex((group) => group.year === curYear);
      let quantity = cur?.quantity || 1;

      // if year doesn't exist, create it
      if (curYearIndex === -1) {
        acc.push({
          year: curYear,
          count: quantity,
          months: [
            {
              month: curMonth,
              count: quantity,
              monthNum: curMonthNum,
              dates: [{ day: cur.date, count: quantity }],
            },
          ],
        });
        return acc;
      }

      // handle month data
      let curMonthIndex = acc[curYearIndex].months.findIndex(
        (monthData) => monthData.month === curMonth
      );

      // if current month doesn't exist, create it
      if (curMonthIndex === -1) {
        acc[curYearIndex].months.push({
          month: curMonth,
          count: quantity,
          monthNum: curMonthNum,
          dates: [{ day: cur.date, count: quantity }],
        });

        acc[curYearIndex].count += quantity;

        return acc;
      }

      // handle date data
      let curDateIndex = acc[curYearIndex].months[
        curMonthIndex
      ].dates.findIndex((date) => date.day === cur.date);

      // if current date doesn't exist, create it
      if (curDateIndex === -1) {
        // increase year count
        acc[curYearIndex].count += quantity;
        // increase month count
        acc[curYearIndex].months[curMonthIndex].count += quantity;
        // add date to month
        acc[curYearIndex].months[curMonthIndex].dates.push({
          day: cur.date,
          count: quantity,
        });

        return acc;
      }

      // If it made it this far, then the date already exists. Increase count everywhere
      // increase year count
      acc[curYearIndex].count += quantity;
      // increase month count
      acc[curYearIndex].months[curMonthIndex].count += quantity;
      // add date to month
      acc[curYearIndex].months[curMonthIndex].dates[curDateIndex].count +=
        quantity;

      return acc;
    },
    []
  );

  return countData;
};

export default convertToCountData;
