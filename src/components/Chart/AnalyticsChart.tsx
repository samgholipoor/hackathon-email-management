import { useMemo } from "react";
import { Spinner } from "@/services/loading";
import { formatPersianDate } from "@/utils/calendar";
import { formatNumber } from "@/utils/formatNumber";
import Box from "../Box.jsx";
import Icon from "../Icon";
import Chart from "./Chart";

interface Data {
  label: string;
  value: number;
  min: number;
  max: number;
  weighted_avg: number;
}

interface AnalyticsChart {
  data: Data[];
  loading?: boolean;
  labelName?: string;
  valueName?: string;
}

const fixNumber = (a: number) =>
  a && typeof a === "number" ? formatNumber(a.toFixed()) : " - ";

const AnalyticsChart = ({ data, loading = false }: AnalyticsChart) => {
  const dataChart = useMemo(() => {
    if (!data || !data.length) {
      return null;
    }

    return {
      chart: {
        type: "area",
        height: 300,
        zoom: {
          enabled: true,
          type: "x",
          autoScaleYaxis: false,
          zoomedArea: {
            fill: {
              opacity: 0.4,
            },
            stroke: {
              opacity: 0.4,
              width: 2,
            },
          },
        },
      },
      series: [
        {
          name: "میانگین",
          data: data.map(({ label, value }) => ({
            x: label,
            y: value,
          })),
        },
        {
          name: "میانگین وزنی",
          data: data.map(({ label, weighted_avg }) => ({
            x: label,
            y: weighted_avg,
          })),
        },
        {
          name: "کمینه",
          data: data.map(({ label, min }) => ({
            x: label,
            y: min,
          })),
        },
        {
          name: "بیشینه",
          data: data.map(({ label, max }) => ({
            x: label,
            y: max,
          })),
        },
      ],
      yaxis: {
        type: "datetime",
        labels: {
          formatter: function (val: number) {
            return fixNumber(val);
          },
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          formatter: function (val: number) {
            return formatPersianDate(val);
          },
        },
      },
      dataLabels: {
        formatter: function (val) {
          return fixNumber(val);
        },
      },
    };
  }, [data]);

  const render = useMemo(() => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full border rounded-md">
          <Spinner className="w-8 h-8" />
        </div>
      );
    }

    if (dataChart === null) {
      return (
        <div className="flex justify-center items-center gap-1 px-4 h-full">
          <span>داده‌ای برای نمایش وجود ندارد</span>
          <Icon name="error_outline_black_24dp" className="h-8 w-8" />
        </div>
      );
    }

    if (dataChart) {
      return <Chart options={dataChart} style={{ direction: "ltr" }} />;
    }

    return null;
  }, [loading, dataChart]);

  return <Box className="overflow-hidden h-96 py-4">{render}</Box>;
};

export default AnalyticsChart;
