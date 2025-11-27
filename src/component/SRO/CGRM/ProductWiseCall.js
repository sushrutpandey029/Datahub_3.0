import React from "react";
import { Box } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const ProductWiseCall = ({ data }) => {
  console.log("ProductWiseCall data:", data);
  
  // Static data - CategoryWiseComplaintsMember की तरह
  const staticCategories = ["Query", "Complaint"];
  
  // Process the API data structure
  let series = [];
  let labels = staticCategories; // Always use static categories

  if (data && data.chart1 && Array.isArray(data.chart1)) {
    // API structure: data.chart1 contains array of {label, value, percentage}
    // Static categories ke according data map karo
    series = staticCategories.map(staticLabel => {
      // Find matching data for this static category
      const matchingItem = data.chart1.find(item => item && item.label === staticLabel);
      if (matchingItem && matchingItem.percentage) {
        // Percentage value nikal rahe hain
        return parseFloat(matchingItem.percentage.replace("%", "")) || 0;
      }
      return 0; // If no data found for this category, return 0
    });
  } else {
    // Fallback static data - CategoryWiseComplaintsMember की तरह
    series = staticCategories.map(() => 0);
  }

  console.log("Processed series:", series);
  console.log("Processed labels:", labels);

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
    colors: ["#2B60AD", "#FFA500"],
    title: {
      text: "Nature of calls - Industry",
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
        // Find matching data for data label
        const matchingItem = data && data.chart1 && data.chart1.find(item => item && item.label === category);
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
          // Find matching data for tooltip
          const matchingItem = data && data.chart1 && data.chart1.find(item => item && item.label === category);
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
        key={JSON.stringify(data)} // CategoryWiseComplaintsMember की तरह data के basis पर re-render
      />
    </Box>
  );
};

export default ProductWiseCall;