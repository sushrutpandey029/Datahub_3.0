import React from "react";
import {
  Box,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";

const ProductWiseCall = ({ data }) => {
  console.log("ProductWiseCall data:", data);
  
  // Use props data if available, otherwise use static data
  const pieData = {
    series: data ? [data.query || 64.8, data.complaint || 62.43] : [64.8, 62.43],
    labels: ["Query", "Complaints"],
  };

  const pieChartOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: true,
      },
    },
    labels: pieData.labels,
    colors: ["#2B60AD", "#FFA500"],
    title: {
      text: "Nature of calls - Industry",
      align: "left",
      style: { fontSize: "16px", fontWeight: "bold", color: "#263238" },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
    },
    dataLabels: {
      enabled: true,
      formatter: function(val, opts) {
        return opts.w.config.series[opts.seriesIndex] + "%";
      },
      style: {
        fontSize: "12px",
        colors: ["#fff"]
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
      }
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val + "%";
        }
      }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5
        }
      }
    }
  };

  return (
    <Box width="100%">
      <ReactApexChart
        options={pieChartOptions}
        series={pieData.series}
        type="pie"
        height={350}
      />
    </Box>
  );
};

export default ProductWiseCall;