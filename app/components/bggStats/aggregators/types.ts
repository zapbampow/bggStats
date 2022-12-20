export type DataSet = {
  label: string;
  data: number[];
  backgroundColor?: string[];
};

export type Data = {
  labels: string[];
  datasets: DataSet[];
};

export type Screen = "year" | "months" | "month";

export type DateGroup = {
  year: string;
  count: number;
  months: {
    monthNum: number;
    month: string;
    count: number;
    dates: string[];
  }[];
};
