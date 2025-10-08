import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Box,
  Typography,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";

const EBCategoryGpMember = ({ ebCategoryMemberGData }) => {
  console.log("ebCategoryMemberGData", ebCategoryMemberGData);
  const fallbackPie = {
    series: [0, 0],
    labels: ["Active", "Other"],
  };

  const fallbackBreakup = {
    Abscoding: 0,
    Deceased: 0,
    Exited: 0,
    Resigned: 0,
    Retired: 0,
    Terminated: 0,
  };

  const { Active, Other, Breakup } =
    (ebCategoryMemberGData && ebCategoryMemberGData.data) || {};

  const pieChartData = {
    series:
      ebCategoryMemberGData && ebCategoryMemberGData.data
        ? [parseFloat(Active) || 0, parseFloat(Other) || 0]
        : fallbackPie.series,
    labels: fallbackPie.labels,
  };

  const pieChartOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: true,
      },
    },
    labels: pieChartData.labels,
    colors: [
      "#2B60AD",
      "#39B1AC",
      "#69AB44",
      "#FDBF11",
      "#F78F6D",
      "#F05D5F",
      "#B853A0",
      "#ED1590",
      "#BD1E22",
    ],
    title: {
      text:
        (ebCategoryMemberGData && ebCategoryMemberGData.title) ||
        "Employees Category - Member",
      align: "center",
      style: { fontSize: "16px", fontWeight: "bold", color: "#263238" },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
    },
  };

  // Prepare stacked bar data (Breakup of "Other")
  const effectiveBreakup = Breakup || fallbackBreakup;

  // const barChartSeries = Object.entries(effectiveBreakup).map(
  //   ([name, value]) => ({
  //     name,
  //     data: [parseFloat(value) || 0],
  //   })
  // );

  // const barChartOptions = {
  //   chart: {
  //     type: "bar",
  //     stacked: true,
  //     toolbar: {
  //       show: true,
  //     },
  //   },
  //   colors: [
  //     "#2B60AD",
  //     "#39B1AC",
  //     "#69AB44",
  //     "#FDBF11",
  //     "#F78F6D",
  //     "#F05D5F",
  //     "#B853A0",
  //     "#ED1590",
  //     "#BD1E22",
  //   ],
  //   title: {
  //     text: 'Breakdown of "Other"',
  //     align: "center",
  //     style: {
  //       fontSize: "14px",
  //       fontWeight: "bold",
  //       color: "#263238",
  //     },
  //   },
  //   grid: {
  //     show: false,
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //       columnWidth: "60%",
  //     },
  //   },

  //   xaxis: {
  //     categories: [""],
  //     axisBorder: { show: false },
  //     axisTicks: { show: false },
  //     labels: { show: false },
  //   },
  //   yaxis: {
  //     labels: { show: false },
  //   },
  //   legend: {
  //     position: "bottom",
  //     horizontalAlign: "center",
  //     fontSize: "12px",
  //   },
  // };

  const barChartSeries = Object.entries(effectiveBreakup).map(
    ([name, value]) => ({
      name,
      data: [parseFloat(value) || 0], // keep numeric only for plotting
    })
  );

  const barChartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: true },
    },
    colors: [
      "#2B60AD",
      "#39B1AC",
      "#69AB44",
      "#FDBF11",
      "#F78F6D",
      "#F05D5F",
      "#B853A0",
      "#ED1590",
      "#BD1E22",
    ],
    title: {
      text: 'Breakdown of "Other"',
      align: "center",
      style: { fontSize: "14px", fontWeight: "bold", color: "#263238" },
    },
    grid: { show: false },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        // dataLabels: {
        //   position: "top",
        // },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}%`, // ✅ show % on bars
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    xaxis: {
      categories: [""],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
    },
    yaxis: {
      // labels: {
      //   formatter: (val) => `${val}%`, // ✅ show % on y-axis
      // },
      labels: {
        show: false,
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}%`, // ✅ show % in tooltip
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
    },
  };

  return (
    <Card style={{ paddingBottom: "20px" }}>
      <CardActionArea>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="flex-start">
            {/* Pie Chart  */}
            <Box width="60%">
              <ReactApexChart
                options={pieChartOptions}
                series={pieChartData.series}
                type="pie"
                height={350}
              />
            </Box>

            {/* Stacked Bar Chart */}
            <Box width="40%">
              <ReactApexChart
                options={barChartOptions}
                series={barChartSeries}
                type="bar"
                height={330}
              />
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EBCategoryGpMember;
