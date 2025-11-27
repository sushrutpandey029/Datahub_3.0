import React from "react";
import { Box } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const CategoryWiseQuery = ({ data }) => {
  console.log("🔍 CategoryWiseQuery data:", data);
  
  // Static categories - yeh hamesha same rahengi
  const staticCategories = ["Application", "Disbursement", "Dispute with CIR", "Insurance", "Others", "Repayment", "TPP"];

  // Process the API data structure
  let series = [];
  let labels = staticCategories;

  // Safe checking for data and chart5
  console.log("🔍 Checking chart5 data:", data && data.chart5);
  console.log("🔍 Is chart5 array?", data && Array.isArray(data.chart5));

  // Use chart5 instead of chart3 - FIXED with null checks
  if (data && data.chart5 && Array.isArray(data.chart5) && data.chart5.length > 0) {
    console.log("✅ Valid chart5 data found");
    
    series = staticCategories.map(staticLabel => {
      const matchingItem = data.chart5.find(item => item && item.label === staticLabel);
      console.log(`🔍 Looking for ${staticLabel}:`, matchingItem);
      
      if (matchingItem && matchingItem.percentage) {
        const percentageValue = parseFloat(matchingItem.percentage.replace("%", "")) || 0;
        console.log(`🔍 ${staticLabel}: ${percentageValue}%`);
        return percentageValue;
      }
      console.log(`🔍 ${staticLabel}: No data found`);
      return 0;
    });
  } else {
    console.log("❌ No valid chart5 data found");
    series = staticCategories.map(() => 0);
  }

  console.log("📊 Processed series:", series);
  console.log("📊 Processed labels:", labels);

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
        }
      }
    },
    labels: labels,
    colors: ["#2B60AD", "#39B1AC", "#69AB44", "#FDBF11", "#F78F6D", "#F05D5F", "#B853A0"],
    title: {
      text: "Category wise queries - Industry",
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
        const category = labels[opts.seriesIndex];
        // Find matching data for data label - FIXED for chart5 with null checks
        const matchingItem = data && data.chart5 && data.chart5.find(item => item && item.label === category);
        const value = matchingItem && matchingItem.value ? matchingItem.value : "0";
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
          const matchingItem = data && data.chart5 && data.chart5.find(item => item && item.label === category);
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
        key={data ? JSON.stringify(data) : "empty"} // Safe key
      />
    </Box>
  );
};

export default CategoryWiseQuery;