import React, { useEffect, useState } from "react";
import { Card, CardContent, CardActionArea } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const QARBarCharttwo = ({ chartData }) => {

  console.log("bar data in two", chartData);

  const defaultChartData = [
    { label: "Apr-25", value: "0%" },
    { label: "May-25", value: "0%" },
    { label: "Jun-25", value: "0%" },
    { label: "Q1 FY 2025-26", value: "0%" },
  ];

  const defaultTitle =
    "% of Loans disbursed crossing the norm of Guardrails - Universe";

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: true, 
      },
     },
    title: {
      text: defaultTitle,
       style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: "sans-serif",
       },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%", // ✅ narrower bars for more space between columns
        distributed: true,
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
        fontSize: "12px",
        colors: ["#000"],
        fontWeight: "bold",
      },
    },
    xaxis: {
      categories: [],
      axisBorder: { show: true },
      axisTicks: { show: false },
      labels: {
        style: {
          fontSize: "13px",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      labels: { show: false },
      min: 0,
      max: 5,
      tickAmount: 5,
    },
    colors: ["#39B1AC"],
    legend: { show: false },
    tooltip: {
      y: {
        formatter: (val) => `${val}%`,
      },
    },
    grid: {
      show:false,
      strokeDashArray: 3,
      borderColor: "#e0e0e0",
    },
  });

  const processChartData = (apiData) => {
    let dataToUse = defaultChartData;
    let titleToUse = defaultTitle;

    if (apiData && apiData.chart_data.length > 0) {
      dataToUse = apiData.chart_data;
    }

    if (apiData && apiData.title) {
      titleToUse = apiData.title;
    }

    const categories = dataToUse.map((item) => item.label);
    const values = dataToUse.map((item) =>
      parseFloat(item.value.replace("%", "")) || 0
    );

    const maxValue = Math.max(...values);
    const yAxisMax = isFinite(maxValue) && maxValue > 0 ? Math.ceil(maxValue * 1.2) : 5;

    setSeries([{ name: titleToUse, data: values }]);

    setOptions((prev) => ({
      ...prev,
      title: {
        ...prev.title,
        text: titleToUse, // ✅ uses ApexChart title property
      },
      xaxis: {
        ...prev.xaxis,
        categories,
      },
      yaxis: {
        ...prev.yaxis,
        max: yAxisMax,
      },
    }));
  };

  useEffect(() => {
    processChartData(chartData);
  }, [chartData]);

  return (
    <Card sx={{ height: 420, backgroundColor: "#fff" }}>
      <CardActionArea>
        <CardContent>
          <ReactApexChart options={options} series={series} type="bar" height={350} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default QARBarCharttwo;
