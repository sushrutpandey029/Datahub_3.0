import React from "react";
import { Box } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const NatureofCall = ({ chartData, memberName }) => {
  console.log("🎯 NATUREOFCALL PROPS RECEIVED:");
  console.log("📊 chartData:", chartData);
  console.log("📊 memberName:", memberName);
  console.log("📊 Type of chartData:", typeof chartData);
  console.log("📊 Is chartData array?", Array.isArray(chartData));
  
  // Static categories
  const staticCategories = ["Query", "Complaint"];
  
  // Process the API data structure
  let series = [];
  let labels = staticCategories;

  // CategoryWiseQuery की तरह data processing
  if (chartData && Array.isArray(chartData) && chartData.length > 0) {
    console.log("✅ Valid chartData found in component");
    
    series = staticCategories.map(staticLabel => {
      const matchingItem = chartData.find(item => item && item.label === staticLabel);
      console.log(`🔍 Looking for ${staticLabel}:`, matchingItem);
      
      if (matchingItem && matchingItem.percentage) {
        const percentageValue = parseFloat(matchingItem.percentage.replace("%", "")) || 0;
        console.log(`✅ ${staticLabel}: ${percentageValue}%`);
        return percentageValue;
      }
      console.log(`❌ ${staticLabel}: No matching data found`);
      return 0;
    });
  } else {
    console.log("❌ No valid chartData found in component");
    console.log("💡 Using fallback data");
    series = staticCategories.map(() => 0);
  }

  console.log("📊 Final series:", series);
  console.log("📊 Final labels:", labels);

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
    colors: ["#2B60AD", "#FFA500"],
    title: {
      text: "Nature of calls - " + (memberName || 'Member'),
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
        const matchingItem = chartData && chartData.find(item => item && item.label === category);
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
          const matchingItem = chartData && chartData.find(item => item && item.label === category);
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
        key={chartData ? JSON.stringify(chartData) : "empty"}
      />
    </Box>
  );
};

export default NatureofCall;