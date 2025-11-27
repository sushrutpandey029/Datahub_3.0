

import React from "react";
import {
  Box,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";

const CategoryWiseComplaintsMember = ({ data }) => {
  console.log("CategoryWiseComplaintsMember data:", data);
  
  // Static categories - yeh hamesha same rahengi
  const staticCategories = ["Application", "Disbursement", "Dispute with CIR", "Insurance", "Others", "Repayment", "TPP"];

  // Process the API data structure
  let series = [];
  let labels = staticCategories; // Always use static categories for legends

  if (data && data.chart3 && Array.isArray(data.chart3)) {
    // API structure: data.chart3 contains array of {label, value, percentage}
    // Static categories ke according data map karo
    series = staticCategories.map(staticLabel => {
      // Find matching data for this static category
      const matchingItem = data.chart3.find(item => item && item.label === staticLabel);
      if (matchingItem && matchingItem.percentage) {
        // Percentage value nikal rahe hain
        return parseFloat(matchingItem.percentage.replace("%", "")) || 0;
      }
      return 0; // If no data found for this category, return 0
    });
  } else {
    // Fallback empty data
    series = staticCategories.map(() => 0);
  }

  console.log("Processed series:", series);
  console.log("Processed labels:", labels);

  // Safe member name with fallback
  const memberName = (data && data.member) ? data.member : 'Member';

  const pieChartOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: true,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        },
        fontFamily: 'sans-serif'
      }
    },
    labels: labels,
    colors: ["#2B60AD", "#39B1AC", "#69AB44", "#FDBF11", "#F78F6D", "#F05D5F", "#B853A0"],
    title: {
      text: "Category wise complaints - " + memberName,
      align: "left",
      style: { 
        fontSize: "16px", 
        fontWeight: "bold", 
        color: "#263238",
        fontFamily: 'sans-serif'
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: 'sans-serif',
      labels: {
        colors: "#444",
        useSeriesColors: false
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val, opts) {
        const percentage = val.toFixed(2) + "%";
        const value = data && data.chart3 && data.chart3[opts.seriesIndex] ? data.chart3[opts.seriesIndex].value : "0";
        return [value, percentage];
      },
      style: {
        fontSize: "11px",
        colors: ["#fff"],
        fontWeight: "bold",
        fontFamily: 'sans-serif'
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
      style: {
        fontFamily: 'sans-serif'
      },
      y: {
        formatter: function(val, { seriesIndex, w }) {
          const category = labels[seriesIndex];
          // Find matching data for tooltip
          const matchingItem = data && data.chart3 && data.chart3.find(item => item && item.label === category);
          if (matchingItem && matchingItem.value && matchingItem.percentage) {
            return matchingItem.value + " (" + matchingItem.percentage + ")";
          }
          return val.toFixed(2) + "%";
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
    <Box width="100%">
      <ReactApexChart
        options={pieChartOptions}
        series={series}
        type="pie"
        height={400}
        key={JSON.stringify(series)}
      />
    </Box>
  );
};

export default CategoryWiseComplaintsMember;