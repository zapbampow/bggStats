import type { Data, DateGroup } from "../../types";
import { ChartColors } from "../../ChartColors";

export default function getMonthsChartDataByYear(
  data: DateGroup[],
  year: number
): Data {
  // console.log("data", data);
  const months = data[0]?.months || [];
  const labels = months.map((month) => month.month);
  const amounts = months.map((month) => month.count);

  return {
    labels: labels,
    datasets: [
      {
        label: "# of Dates",
        data: amounts,
        backgroundColor: Object.values(ChartColors),
      },
    ],
  };
}
