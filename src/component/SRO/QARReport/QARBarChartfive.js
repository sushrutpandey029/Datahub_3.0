import React, { useEffect, useState } from "react";
import { Card, CardContent, CardActionArea, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";

function QARBarChartfive({ chartData }) {
  console.log("bar data in five", chartData);
  // 🧩 Static fallback chart data (same structure as your consoled data)
  const staticChartData = {
    status: true,
    quarter: "Q1 FY 2025-26",
    lender: "Arohan",
    entity: "universe",
    filter_type: "volume",
    title: "Household Income and FOIR Breach: Member",
    parameters: {
      foir_50_hhi_upto_3l: {
        label: "FOIR>50% and HHI upto 3Lk",
        color: "#E86C3B",
        monthly_data: {
          "Q1 FY 2025-26": {
            numerator: "5,593",
            denominator: "241,878",
            percentage: "2.31%",
          },
        },
      },
      hhi_upto_3l: {
        label: "ACs with HHI >3Lk",
        color: "#1B5E7E",
        monthly_data: {
          "Q1 FY 2025-26": {
            numerator: "234,638",
            denominator: "241,878",
            percentage: "97.01%",
          },
        },
      },
    },
    chart: {
      labels: ["Q1 FY 2025-26"],
      series: [
        {
          name: "FOIR>50% and HHI upto 3Lk",
          color: "#E86C3B",
          data: [{ month: "Q1 FY 2025-26", value: "0%" }],
        },
        {
          name: "ACs with HHI >3Lk",
          color: "#1B5E7E",
          data: [{ month: "Q1 FY 2025-26", value: "0%" }],
        },
      ],
    },
  };

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const processChartData = (apiData) => {
    // ✅ Use static fallback data if API data is invalid or empty
    let finalData =
      apiData && apiData.chart && apiData.chart.series
        ? apiData
        : staticChartData;

    const { chart, parameters, title } = finalData;

    const categories = [];
    const seriesData = [];
    const colors = [];

    chart.series.forEach((seriesItem, index) => {
      categories.push(seriesItem.name);

      const value = parseFloat(seriesItem.data[0].value.replace("%", ""));
      seriesData.push(value);

      const paramKey = Object.keys(parameters).find(
        (key) => parameters[key].label === seriesItem.name
      );

      if (paramKey && parameters[paramKey].color) {
        colors.push(parameters[paramKey].color);
      } else if (seriesItem.color) {
        colors.push(seriesItem.color);
      } else {
        colors.push("#2B60AD");
      }
    });

    setSeries([
      {
        name: "Percentage",
        data: seriesData,
      },
    ]);

    setOptions({
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: true },
      },
      title: {
        text: title || "Household Income and FOIR Breach - Member",
        // align: "center",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          fontFamily: "sans-serif",
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "50%",
          borderRadius: 0,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val}%`,
        style: {
          fontSize: "13px",
          colors: ["#000"],
          fontWeight: "bold",
        },
        offsetX: 30,
      },
      xaxis: {
        categories: categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { show: false },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "11px",
            fontFamily: "sans-serif",
            fontWeight: "bold",
          },
        },
      },
      colors: colors,
      legend: { show: false },
      tooltip: {
        y: {
          formatter: (val) => `${val}%`,
        },
      },
      grid: { show: false },
      stroke: { show: false },
    });

    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    processChartData(chartData);
  }, [chartData]);

  if (loading) {
    return (
      <Card
        sx={{
          height: 350,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Loading chart data...</Typography>
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        sx={{
          height: 350,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="error">Error: {error}</Typography>
      </Card>
    );
  }

  if (!series[0] || series[0].data.length === 0) {
    return (
      <Card
        sx={{
          height: 350,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>No data available</Typography>
      </Card>
    );
  }

  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default QARBarChartfive;
