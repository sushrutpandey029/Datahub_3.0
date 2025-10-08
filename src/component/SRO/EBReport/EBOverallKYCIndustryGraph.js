import React from "react";
import { Card, CardContent, CardActionArea } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const EBOverallKYCIndustryGraph = ({ ebKycIndustryGraph }) => {
  // Fallback when data is not ready
  const fallbackHeadings = ["Jan", "Feb", "Mar", "Apr", "May"];
  const fallbackSeries = [
    {
      name: "KYC fill rate cumulative",
      data: new Array(fallbackHeadings.length).fill(0),
    },
    {
      name: "KYC fill rate reporting month",
      data: new Array(fallbackHeadings.length).fill(0),
    },
  ];

  // Use actual data if available, else fallback zeros
  const seriesData =
    ebKycIndustryGraph && ebKycIndustryGraph.data
      ? Object.entries(ebKycIndustryGraph.data).map(([name, values]) => ({
          name,
          data: values.map((val) =>
            typeof val === "string" ? parseFloat(val.replace("%", "")) : val
          ),
        }))
      : fallbackSeries;

  const categories =
    ebKycIndustryGraph && ebKycIndustryGraph.headings
      ? ebKycIndustryGraph.headings
      : fallbackHeadings;

  const options = {
    chart: {
      type: "line",
      height: 450,
    },
    colors: ["#2B60AD", "#F78F6D"],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(1) + "%";
      },
      style: {
        fontSize: "15px",
        fontFamily: "sans-serif",
        fontWeight: "bold",
      },
    },
    stroke: {
      width: [4, 4],
      curve: "smooth",
    },
    title: {
      text:
        (ebKycIndustryGraph && ebKycIndustryGraph.title) ||
        "KYC Fill Rates - Industry",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333",
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        show: true,
        style: {
          fontSize: "13px",
          fontFamily: "sans-serif",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontFamily: "sans-serif",
      fontSize: "14px",
      fontWeight: 500,
    },
    tooltip: {
      y: {
        formatter: (value) => value + "%",
      },
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 26,
      },
    },
  };

  return (
    <Card
      style={{
        paddingBottom: "20px",
        marginTop: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <CardActionArea>
        <CardContent>
          <ReactApexChart
            options={options}
            series={seriesData}
            type="line"
            height={450}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EBOverallKYCIndustryGraph;
