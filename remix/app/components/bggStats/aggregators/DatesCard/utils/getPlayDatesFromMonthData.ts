import type { Data, DateGroup } from "../../types";
import { ChartColors } from "../../ChartColors";

type Args = {
  data: DateGroup;
  year: number | null;
  month: string | null;
};

export default function getPlayDatesFromMonthData({ data, year, month }: Args) {
  if (!data || !year || !month) return null;

  const selectedMonth = data.months.find((m) => m.month === month);
  return selectedMonth?.dates;
}
