import React, { useEffect, useState } from "react";
import { Card, CardContent, CardActionArea } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const QARBarChart = ({ guardRailsData }) => {

  console.log("bar data in first", guardRailsData);

  const getChartState = (data) => {
    // Default data structure
    let chartData = [
      { label: "Apr-25", value: "0%" },
      { label: "May-25", value: "0%" },
      { label: "Jun-25", value: "0%" },
      { label: "Q1 FY 2025-26", value: "0%" },
    ];

    let title = "% of Loans disbursed crossing the norm of Guardrails - Member";

    // Use API data if available
    if (data && data.chart_data) {
      chartData = data.chart_data;
      title = data.title || title;
    }

    // Alternative data structure - build from monthly_breakdown and quarter_summary
    if (data && data.monthly_breakdown && data.quarter_summary) {
      const monthlyData = data.monthly_breakdown.map((item) => ({
        label: item.month,
        value: item.percentage,
      }));

      const quarterData = {
        label: data.quarter || "Q1 FY 2025-26",
        value: data.quarter_summary.percentage,
      };

      chartData = [...monthlyData, quarterData];
      title = data.title || title;
    }

    // Extract labels and values
    const categories = chartData.map((item) => item.label);
    const seriesData = chartData.map((item) => {
      const value = item.value.replace("%", "");
      return parseFloat(value) || 0;
    });

    // Calculate max value for y-axis
    const maxValue = Math.max(...seriesData) * 1.2 || 5;

    return {
      series: [
        {
          name: title,
          data: seriesData,
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: { show: true },
         },
        title: {
          text: title,
           style: {
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "sans-serif",
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
            dataLabels: { position: "top" },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: (val) => `${val}%`,
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#000"],
            fontWeight: "bold",
            fontFamily: "Arial",
          },
        },
        xaxis: {
          categories,
          axisBorder: { show: false },
          axisTicks: { show: false },
          labels: {
            style: {
              fontSize: "13px",
              fontFamily: "sans-serif",
              fontWeight: 500,
            },
          },
        },
        yaxis: {
          labels: { show: false },
          min: 0,
          max: maxValue,
          tickAmount: 5,
        },
        colors: ["#2B60AD"],
        legend: { show: false },
        tooltip: {
          y: { formatter: (val) => `${val}%` },
        },
        grid: {
          strokeDashArray: 3,
          borderColor: "#e0e0e0",
        },
      },
    };
  };

  const [chartState, setChartState] = useState(getChartState(guardRailsData));

  useEffect(() => {
    console.log("QARBarChart - Updated guardRailsData:", guardRailsData);
    setChartState(getChartState(guardRailsData));
  }, [guardRailsData]);

  return (
    <Card sx={{ height: 420 }}>
      <CardActionArea>
        <CardContent>
          <ReactApexChart
            options={chartState.options}
            series={chartState.series}
            type="bar"
            height={350}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default QARBarChart;
