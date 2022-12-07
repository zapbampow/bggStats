import type { Data, DateGroup } from "../../types";
import { ChartColors } from "../../ChartColors";

export default function getMonthsChartDataByYear(
  data: DateGroup[],
  year: string
): Data {
  //   TODO: get the months data from the year object
  const labels = data.map((item) => item.year.toString());
  const years = data.map((item) => item.count);

  return {
    labels: labels,
    datasets: [
      {
        label: "Years",
        data: years,
        backgroundColor: Object.values(ChartColors),
      },
    ],
  };
}
