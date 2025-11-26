import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ReactApexChart from "react-apexcharts";

function QARBarChartfour({ chartData }) {
  console.log("bar data in four", chartData);
  // 🧩 Static fallback data
  const staticChartData = {
    status: true,
    quarter: "Q1 FY 2025-26",
    lender: "Universe",
    entity: "universe",
    filter_type: "volume",
    title: "Breach of Guardrails Parameters: Universe",
    chart: {
      labels: ["Apr-25", "May-25", "Jun-25", "Q1 FY 2025-26"],
      series: [
        {
          name: "Breaching the lender cap",
          color: "#1E3A5F",
          data: [
            { month: "Apr-25", value: "0%" },
            { month: "May-25", value: "0%" },
            { month: "Jun-25", value: "0%" },
            { month: "Q1 FY 2025-26", value: "0%" },
          ],
        },
        {
          name: "Total o/s is more than 2 lac",
          color: "#2E9BDE",
          data: [
            { month: "Apr-25", value: "0%" },
            { month: "May-25", value: "0%" },
            { month: "Jun-25", value: "0%" },
            { month: "Q1 FY 2025-26", value: "0%" },
          ],
        },
        {
          name: "NPA borrower",
          color: "#D4E5F0",
          data: [
            { month: "Apr-25", value: "0%" },
            { month: "May-25", value: "0%" },
            { month: "Jun-25", value: "0%" },
            { month: "Q1 FY 2025-26", value: "0%" },
          ],
        },
      ],
    },
  };

  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const [chartTitle, setChartTitle] = useState("");

  const defaultColors = ["#2B60AD", "#39B1AC", "#69AB44"];

  const processChartData = (apiData) => {
    const finalData =
      apiData && apiData.chart && apiData.chart.series
        ? apiData
        : staticChartData;

    const labels = finalData.chart.labels || [];

    const seriesData = finalData.chart.series.map((s, i) => ({
      name: s.name,
      data: s.data.map((d) => parseFloat(d.value.replace("%", "")) || 0),
      color: defaultColors[i],
    }));

    const colors = seriesData.map((s) => s.color);

    setChartSeries(seriesData);
    setChartTitle(
      finalData.title || "Breach of Guardrails Parameters: Universe"
    );

    setChartOptions({
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: true,
        },
      },
      title: {
        text: finalData.title || "Breach of Guardrails Parameters: Universe",

        style: {
          fontSize: "16px",
          fontWeight: "bold",
          color: "#333",
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "70%", // 🔹 reduced for better spacing between bars
          endingShape: "rounded",
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val}%`,
        offsetY: -20,
        style: {
          fontSize: "11px",
          colors: ["#333"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      xaxis: {
        categories: labels,
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        show: false,
      },
      colors,
      legend: {
        position: "bottom",
        fontSize: "11px",
      },
      grid: {
        show:false,
        borderColor: "#f1f1f1",
      },
      tooltip: {
        y: {
          formatter: (val) => `${val}%`,
        },
      },
    });
  };

  useEffect(() => {
    processChartData(chartData);
  }, [chartData]);

  return (
    <Card
      sx={{
        height: "auto",
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <CardContent>
        <Box id="chart">
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default QARBarChartfour;
