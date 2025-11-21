import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Box,
  Typography,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";

const ProductWiseCall = ({ ebCategoryMemberGData }) => {
  console.log("ebCategoryMemberGData", ebCategoryMemberGData);
  
  // Static data from your image
  const staticPieData = {
    series: [64.8, 62.43],
    labels: ["Query", "Complaints"],
  };

  const pieChartOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: true,
      },
    },
    labels: staticPieData.labels,
    colors: ["#2B60AD", "#FFA500"], // Blue for Query, Orange for Complaints
    title: {
      text: "Nature of calls - Industry",
      align: "center",
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
    <Card style={{ paddingBottom: "20px" }}>
      <CardActionArea>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center">
            {/* Pie Chart Only */}
            <Box width="100%">
              <ReactApexChart
                options={pieChartOptions}
                series={staticPieData.series}
                type="pie"
                height={350}
              />
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductWiseCall;