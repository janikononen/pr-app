import { useGetTranings } from "../components/fetch-functiot&custom-hookit/useGetTrainings";
import _ from "lodash";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function TrainingChartPage() {
  const { trainings } = useGetTranings();
  const [chartData, setChartData] = useState<
    { type: string; minutes: number | null }[]
  >([]);

  useEffect(() => {
    document.title = "Training Chart";
    if (trainings.length > 0) {
      const groupedTrainings = _.groupBy(trainings, "activity");
      const data = Object.keys(groupedTrainings).map((activity) => {
        const total = _.sumBy(groupedTrainings[activity], "duration");
        return { type: activity, minutes: total || null };
      });
      setChartData(data);
    }
  }, [trainings]);

  const chartSetting = {
    yAxis: [
      {
        label: "Duration (min)",
        width: 60,
      },
    ],
    height: 500,
  };

  function valueFormatter(value: number | null) {
    return `${value} min`;
  }

  return (
    <div>
      <h1>Training Chart</h1>
      <BarChart
        dataset={chartData}
        xAxis={[{ dataKey: "type", scaleType: "band" }]}
        series={[
          {
            dataKey: "minutes",
            label: "Total Duration",
            valueFormatter,
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
