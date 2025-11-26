import React from "react";
import { CardContent, Box } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const NatureofCall = ({ chartData, memberName }) => {
  console.log("🔍 NatureofCall chartData:", chartData);
  console.log("👤 Member Name:", memberName);

  // --- STATIC ITEMS (ALWAYS SHOW) ---
  const staticItems = [
    { label: "Query", value: 0, percentage: "0%" },
    { label: "Complaints", value: 0, percentage: "0%" },
  ];

  // --- MERGE STATIC + DYNAMIC ---
  let mergedData = [];

  if (Array.isArray(chartData)) {
    const map = {};

    // 1. Add static items first
    staticItems.forEach(item => {
      map[item.label.toLowerCase()] = item;
    });

    // 2. Add dynamic items (overwrite if same label)
    chartData.forEach(item => {
      if (item.label) {
        map[item.label.toLowerCase()] = item;
      }
    });

    // Convert map → array
    mergedData = Object.values(map);
  }

  // If nothing even after merge → show empty state
  if (!mergedData || mergedData.length === 0) {
    return (
      <CardContent>
        <Box width="100%">
          <Box
            mb={2}
            textAlign="left"
            style={{ fontSize: "16px", fontWeight: "bold", color: "#263238" }}
          >
            Nature of calls - {memberName || "Member"}
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={270}
            borderRadius="10px"
          ></Box>
        </Box>
      </CardContent>
    );
  }

  // Convert % string → number
  const parsePercentage = (str) => {
    if (!str) return 0;
    return parseFloat(str.replace("%", "")) || 0;
  };

  const series = mergedData.map(item => parsePercentage(item.percentage));
  const labels = mergedData.map(item => item.label);

  const pieChartOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    labels: labels,
    colors: ["#2B60AD", "#FFA500", "#D9534F", "#5BC0DE"],
    title: {
      text: `Nature of calls - ${memberName || "Member"}`,
      align: "left",
      style: { fontSize: "16px", fontWeight: "bold", color: "#263238" },
    },
    legend: {
      position: "bottom",
      fontSize: "14px",
      formatter: function (seriesName, opts) {
        const percentage = opts.w.config.series[opts.seriesIndex].toFixed(2);
        const item = mergedData[opts.seriesIndex];
        const count = item ? item.value : "0";
        return `${seriesName} - ${percentage}% (${count} calls)`;
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return opts.w.config.series[opts.seriesIndex].toFixed(2) + "%";
      },
      style: { fontSize: "14px", fontWeight: "bold", colors: ["#fff"] },
      dropShadow: { enabled: true, top: 1, left: 1, blur: 1, color: "#000", opacity: 0.45 },
    },
    tooltip: {
      y: {
        formatter: function (val, { seriesIndex }) {
          const percentage = val.toFixed(2) + "%";
          const item = mergedData[seriesIndex];
          const count = item ? item.value : "0";
          return `${count} calls (${percentage})`;
        },
      },
    },
    plotOptions: {
      pie: {
        dataLabels: { offset: -10 },
      },
    },
  };

  return (
    <Box width="100%">
      <ReactApexChart
        options={pieChartOptions}
        series={series}
        type="pie"
        height={350}
      />
    </Box>
  );
};

export default NatureofCall;
