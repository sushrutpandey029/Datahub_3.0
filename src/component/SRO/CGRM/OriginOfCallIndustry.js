

import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const OriginOfCallIndustry
 = ({ data }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    // Static data from your image
    const staticData = {
      categories: ["BH", "UP", "TN", "MP", "RJ", "#N/A", "MH", "HR", "PB", "OD"],
      queryData: [821, 804, 491, 401, 300, 310, 205, 204, 198, 118],
      complaintData: [114, 56, 61, 53, 31, 33, 23, 27, 0, 0]
    };

    // Transform data into ApexCharts series format
    const series = [
      {
        name: "Query",
        data: staticData.queryData,
      },
      {
        name: "Complaint",
        data: staticData.complaintData,
      },
    ];

    // Set chart options
    setOptions({
      chart: {
        type: "bar",
        height: 350,
        stacked: false,
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => val, // Show actual value on bars
      },
      title: {
        text: "Origin of complaints & queries - Top 10 states (Member)",
        align: "left",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          color: "#000000",
        },
      },
      xaxis: {
        categories: staticData.categories,
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: 600,
          },
        },
      },
      yaxis: {
        title: {
          text: "Number of Calls",
        },
        labels: {
          formatter: (val) => val.toFixed(0),
        },
      },
      colors: ["#2B60AD", "#39B1AC"], // Blue for Query, Teal for Complaint
      legend: {
        position: "top",
        horizontalAlign: "center",
      },
      tooltip: {
        y: {
          formatter: (val) => val,
        },
      },
    });

    // Set series data
    setSeries(series);
  }, []);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={350}
    />
  );
};

export default OriginOfCallIndustry
;