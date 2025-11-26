
import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Box,
  Typography,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";

const AverageTAT = ({ ebCategoryMemberGData }) => {
  console.log("ebCategoryMemberGData", ebCategoryMemberGData);
  
  // Static data from your image for Average TAT - Member
  const staticPieData = {
    series: [59, 23, 10, 8],
    labels: ["<=7 days", "8-15 days", "16-30 days", ">30 days"],
  };

  const pieChartOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: true,
      },
    },
    labels: staticPieData.labels,
    colors: ["#2B60AD", "#39B1AC", "#69AB44", "#FDBF11"],
    title: {
      text: "Average TAT - Industry",
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
        const percentage = val.toFixed(0);
        return `${percentage}%`;
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
          offset: -5,
          minAngleToShowLabel: 10
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

export default AverageTAT;