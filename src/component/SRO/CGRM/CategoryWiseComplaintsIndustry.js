import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Box,
  Typography,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";

const CategoryWiseComplaintsIndustry = ({ ebCategoryMemberGData }) => {
  console.log("ebCategoryMemberGData", ebCategoryMemberGData);
  
  // Static data from your image for Category wise complaints-Member
  const staticPieData = {
    series: [3716, 11513, 8376, 1113, 7411],
    labels: ["Application", "Disbursement", "Dispute with CIR", "Insurance", "Others", "Repayment", "TPP"],
  };

  const pieChartOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: true,
      },
    },
    labels: staticPieData.labels,
    colors: ["#2B60AD", "#39B1AC", "#69AB44", "#FDBF11", "#F78F6D", "#F05D5F", "#B853A0"],
    title: {
      text: "Category wise complaints-Industry",
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
        const value = staticPieData.series[opts.seriesIndex];
        const percentage = val.toFixed(0);
        return `${value}, ${percentage}%`;
      },
      style: {
        fontSize: "11px",
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
          return val;
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
                height={400}
              />
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryWiseComplaintsIndustry;