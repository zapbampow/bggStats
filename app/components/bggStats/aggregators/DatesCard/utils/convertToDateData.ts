import dayjs from "dayjs";
import type { DateGroup } from "../../types";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";

const convertToDateData = (data: PlayDataModel[]) => {
  let dateData: DateGroup[] = data.reduce((acc: DateGroup[], cur) => {
    const date = dayjs(cur.date);
    let curYear = date.format("YYYY");
    let curMonth = date.format("MMM");
    let curMonthNum = date.month();
    let curYearIndex = acc.findIndex((group) => group.year === curYear);

    // if year doesn't exist, create it
    if (curYearIndex === -1) {
      acc.push({
        year: curYear,
        count: 1,
        months: [
          {
            month: curMonth,
            count: 1,
            monthNum: curMonthNum,
            dates: [cur.date],
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
        count: 1,
        monthNum: curMonthNum,
        dates: [cur.date],
      });

      acc[curYearIndex].count += 1;
      return acc;
    }

    let curDateIndex = acc[curYearIndex].months[curMonthIndex].dates.findIndex(
      (date) => date === cur.date
    );

    // if current date doesn't exist, create it
    if (curDateIndex === -1) {
      // increase year count
      acc[curYearIndex].count += 1;
      // add date to month
      acc[curYearIndex].months[curMonthIndex].dates.push(cur.date);
      // increase month count
      acc[curYearIndex].months[curMonthIndex].count += 1;
    }

    return acc;
  }, []);
  // console.log("dateData", dateData);
  return dateData;
};

export default convertToDateData;
