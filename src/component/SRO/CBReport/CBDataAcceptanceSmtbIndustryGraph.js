// import React, { useState, useEffect } from "react";
// import ReactApexChart from "react-apexcharts";
// import { Card, CardContent, CardActionArea } from "@mui/material";

// // Number format function included in the same file
// const number_format = (number) => {
//   if (number === null || number === undefined || isNaN(number)) {
//     return '0';
//   }

//   const num = typeof number === 'string' ? parseFloat(number) : number;

//   if (isNaN(num)) {
//     return '0';
//   }

//   return num.toLocaleString('en-IN', {
//     maximumFractionDigits: 2,
//     minimumFractionDigits: 0
//   });
// };

// const CBDataAcceptanceIndustryGraph = ({ data}) => {
//   console.log("data in CBDataAcceptanceIndustryGraph",data);
//   const [graphData, setGraphData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const entity = "NBFC-MFI"

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await fetch(
//           `https://api.mfinindia.org/api/auth/getGraph4Data?entity=${entity}`
//         );

//         if (!response.ok) {
//           throw new Error(`Failed to fetch data: ${response.status}`);
//         }

//         const apiData = await response.json();
//         console.log("CB Data Acceptance Industry API Response:", apiData);

//         if (!apiData.status || !apiData.graph4_data || !Array.isArray(apiData.graph4_data)) {
//           throw new Error('Invalid data format from API');
//         }

//         setGraphData(apiData);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching CB data acceptance industry:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [entity]);

//   // Show loading state
//   if (loading) {
//     return (
//       <Card
//         style={{
//           paddingBottom: "20px",
//           marginTop: "20px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           minHeight: "500px",
//         }}
//       >
//         <CardActionArea>
//           <CardContent>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 minHeight: "450px",
//                 fontSize: "18px",
//                 color: "#6b7280",
//                 fontFamily: "Arial, sans-serif",
//               }}
//             >
//               Loading Data...
//             </div>
//           </CardContent>
//         </CardActionArea>
//       </Card>
//     );
//   }

//   // Show error state
//   if (error) {
//     return (
//       <Card
//         style={{
//           paddingBottom: "20px",
//           marginTop: "20px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           minHeight: "500px",
//         }}
//       >
//         <CardActionArea>
//           <CardContent>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 minHeight: "450px",
//                 fontSize: "18px",
//                 color: "#d32f2f",
//                 fontFamily: "Arial, sans-serif",
//                 flexDirection: "column",
//               }}
//             >
//               <div>Error Loading Data</div>
//               <div style={{ fontSize: "14px", marginTop: "10px", color: "#6b7280" }}>
//                 {error}
//               </div>
//             </div>
//           </CardContent>
//         </CardActionArea>
//       </Card>
//     );
//   }

//   // Check if data exists after loading
//   if (!graphData || !graphData.graph4_data || !Array.isArray(graphData.graph4_data)) {
//     return (
//       <Card
//         style={{
//           paddingBottom: "20px",
//           marginTop: "20px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           minHeight: "500px",
//         }}
//       >
//         <CardActionArea>
//           <CardContent>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 minHeight: "450px",
//                 fontSize: "18px",
//                 color: "#6b7280",
//                 fontFamily: "Arial, sans-serif",
//               }}
//             >
//               No Data Available
//             </div>
//           </CardContent>
//         </CardActionArea>
//       </Card>
//     );
//   }

//   // Extract and parse data from API response
//   const submissionCounts = [];
//   const acceptanceRates = [];
//   const months = [];

//   graphData.graph4_data.forEach(item => {
//     if (item.Month && item.Data_Submission_Count_Lk !== undefined && item.Data_Acceptance_Percent !== undefined) {
//       // Parse submission count (remove "Lk" and convert to number)
//       const countStr = String(item.Data_Submission_Count_Lk).replace(' Lk', '').trim();
//       const countValue = parseFloat(countStr) || 0;

//       // Parse acceptance rate (remove % and convert to number)
//       const rateStr = String(item.Data_Acceptance_Percent).replace('%', '').trim();
//       const rateValue = parseFloat(rateStr) || 0;

//       // Use the month directly
//       const month = item.Month;

//       submissionCounts.push(countValue);
//       acceptanceRates.push(rateValue);
//       months.push(month);
//     }
//   });

//   console.log("CB Data Acceptance Industry extracted data:", {
//     submissionCounts,
//     acceptanceRates,
//     months,
//     dataLength: graphData.graph4_data.length
//   });

//   // Check if there's any real data
//   const hasAnyData = submissionCounts.some(v => v > 0) || acceptanceRates.some(v => v > 0);

//   if (!hasAnyData || months.length === 0) {
//     console.log("No CB data acceptance industry data available - all values are zero");
//     return (
//       <Card
//         style={{
//           paddingBottom: "20px",
//           marginTop: "20px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           minHeight: "500px",
//         }}
//       >
//         <CardActionArea>
//           <CardContent>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 minHeight: "450px",
//                 fontSize: "18px",
//                 color: "#6b7280",
//                 fontFamily: "Arial, sans-serif",
//               }}
//             >
//               No Data Available
//             </div>
//           </CardContent>
//         </CardActionArea>
//       </Card>
//     );
//   }

//   // Calculate dynamic ranges for both Y-axes
//   const maxSubmissionCount = Math.max(...submissionCounts, 1);
//   const minSubmissionCount = Math.min(...submissionCounts);
//   const maxAcceptanceRate = Math.max(...acceptanceRates, 1);
//   const minAcceptanceRate = Math.min(...acceptanceRates);

//   // Dynamic Y-axis ranges with padding
//   const computedSubmissionMax = Math.ceil(maxSubmissionCount * 1.1);
//   const computedSubmissionMin = Math.max(0, Math.floor(minSubmissionCount * 0.9));

//   // Dynamic percentage range - adjust based on actual data range
//   let computedAcceptanceMax, computedAcceptanceMin;

//   // If data range is small (like 99-100%), show detailed range
//   if (maxAcceptanceRate - minAcceptanceRate < 5) {
//     computedAcceptanceMax = Math.min(100, Math.ceil(maxAcceptanceRate + 0.5));
//     computedAcceptanceMin = Math.max(0, Math.floor(minAcceptanceRate - 0.5));
//   } else {
//     // For wider ranges, use normal calculation
//     computedAcceptanceMax = Math.min(100, Math.ceil(maxAcceptanceRate * 1.1));
//     computedAcceptanceMin = Math.max(0, Math.floor(minAcceptanceRate * 0.9));
//   }

//   // Ensure min is always less than max
//   if (computedAcceptanceMin >= computedAcceptanceMax) {
//     computedAcceptanceMin = Math.max(0, computedAcceptanceMax - 5);
//   }

//   console.log("Dynamic Y-axis ranges:", {
//     submission: { min: computedSubmissionMin, max: computedSubmissionMax },
//     acceptance: { min: computedAcceptanceMin, max: computedAcceptanceMax }
//   });

//   // Build series with independent Y axes
//   const series = [
//     {
//       name: "Data submission count (Lk)",
//       type: "column",
//       data: submissionCounts,
//     },
//     {
//       name: "% of Data acceptance",
//       type: "line",
//       data: acceptanceRates, // Use actual percentage values
//     }
//   ];

//   const options = {
//     chart: {
//       type: "line",
//       height: 450,
//       stacked: false,
//       toolbar: {
//         show: true,
//         tools: {
//           download: true,
//           selection: false,
//           zoom: true,
//           zoomin: true,
//           zoomout: true,
//           pan: false,
//           reset: true,
//         },
//       },
//     },
//     noData: {
//       text: "Loading...",
//       style: {
//         color: "#000000",
//         fontSize: "15px",
//         fontFamily: "sans-serif",
//         fontWeight: 500,
//       },
//     },
//     colors: ["#1e5a9e", "#e67e22"],
//     stroke: {
//       width: [0, 4],
//       curve: "smooth",
//     },
//     markers: {
//       size: [0, 6],
//       strokeColors: ["#1e5a9e", "#e67e22"],
//       strokeWidth: 2,
//       hover: {
//         size: 8,
//       },
//     },
//     dataLabels: {
//       enabled: true,
//       enabledOnSeries: [0, 1],
//       formatter: function (val, opts) {
//         if (opts.seriesIndex === 0) {
//           // Bar labels - submission count
//           return val === 0 ? "" : number_format(val);
//         } else if (opts.seriesIndex === 1) {
//           // Line labels - acceptance rate percentage
//           const idx = opts.dataPointIndex;
//           const rate = acceptanceRates[idx] || 0;
//           return rate === 0 ? "" : rate.toFixed(1) + "%";
//         }
//         return "";
//       },
//       style: {
//         fontSize: "11px",
//         fontFamily: "sans-serif",
//         fontWeight: "bold",
//         colors: ["#000000"],
//       },
//       offsetY: -10,
//       background: {
//         enabled: false,
//       },
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "60%",
//         endingShape: "rounded",
//         dataLabels: {
//           position: "top",
//         },
//       },
//     },
//     title: {
//       text: graphData.graph_name || "Data submission count and acceptance rate - Industry",
//       align: "left",
//       style: {
//         fontSize: "16px",
//         fontWeight: "bold",
//         color: "#333",
//       },
//     },
//     xaxis: {
//       categories: months,
//       labels: {
//         show: true,
//         style: {
//           fontSize: "13px",
//           fontFamily: "sans-serif",
//           fontWeight: 500,
//           colors: "#666",
//         },
//       },
//       axisBorder: {
//         show: false,

//       },
//       axisTicks: {
//         show: false,

//       },
//     },
//     yaxis: [
//       {
//         // Left Y-axis for submission count - HIDDEN
//         seriesName: "Data submission count (Lk)",
//         axisTicks: {
//           show: false,
//         },
//         axisBorder: {
//           show: false,
//         },
//         labels: {
//           show: false, // Hide left side numbers
//         },
//         title: {
//           text: "", // Remove left side title
//         },
//         min: computedSubmissionMin,
//         max: computedSubmissionMax,
//       },
//       {
//         // Right Y-axis for acceptance rate - HIDDEN
//         seriesName: "% of Data acceptance",
//         opposite: true,
//         axisTicks: {
//           show: false,
//         },
//         axisBorder: {
//           show: false,
//         },
//         labels: {
//           show: false, // Hide right side percentages
//         },
//         title: {
//           text: "", // Remove right side title
//         },
//         min: computedAcceptanceMin,
//         max: computedAcceptanceMax,
//         tickAmount: 5,
//       },
//     ],
//     legend: {
//       position: "bottom",
//       horizontalAlign: "center",
//       fontFamily: "sans-serif",
//       fontSize: "14px",
//       fontWeight: 500,
//       markers: {
//         width: 12,
//         height: 12,
//         radius: 6,
//       },
//       itemMargin: {
//         horizontal: 20,
//         vertical: 10,
//       },
//     },
//     tooltip: {
//       shared: true,
//       intersect: false,
//       custom: function ({ series, seriesIndex, dataPointIndex, w }) {
//         let result =
//           '<div class="apexcharts-tooltip-title">' +
//           (w.globals.categoryLabels[dataPointIndex] || "") +
//           "</div>";

//         for (let i = 0; i < series.length; i++) {
//           if (series[i] && series[i][dataPointIndex] !== undefined) {
//             const val = series[i][dataPointIndex];
//             const serieName = w.globals.seriesNames[i];
//             const color = w.globals.colors[i];

//             if (serieName === "% of Data acceptance") {
//               const rate = acceptanceRates[dataPointIndex] || 0;
//               result +=
//                 '<div class="apexcharts-tooltip-series-group">' +
//                 '<span class="apexcharts-tooltip-marker" style="background-color: ' +
//                 color +
//                 ';"></span>' +
//                 '<div class="apexcharts-tooltip-text">' +
//                 '<div class="apexcharts-tooltip-y-group">' +
//                 '<span class="apexcharts-tooltip-text-y-label">' +
//                 serieName +
//                 ": </span>" +
//                 '<span class="apexcharts-tooltip-text-y-value">' +
//                 rate.toFixed(1) +
//                 "%</span>" +
//                 "</div></div></div>";
//             } else {
//               result +=
//                 '<div class="apexcharts-tooltip-series-group">' +
//                 '<span class="apexcharts-tooltip-marker" style="background-color: ' +
//                 color +
//                 ';"></span>' +
//                 '<div class="apexcharts-tooltip-text">' +
//                 '<div class="apexcharts-tooltip-y-group">' +
//                 '<span class="apexcharts-tooltip-text-y-label">' +
//                 serieName +
//                 ": </span>" +
//                 '<span class="apexcharts-tooltip-text-y-value">' +
//                 number_format(val) +
//                 " Lk</span>" +
//                 "</div></div></div>";
//             }
//           }
//         }

//         return result;
//       },
//     },
//     grid: {

//       show: false,

//     },

//   };

//   return (
//     <Card
//       style={{
//         paddingBottom: "20px",
//         marginTop: "20px",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//       }}
//     >
//       <CardActionArea>
//         <CardContent>
//           <ReactApexChart
//             options={options}
//             series={series}
//             type="line"
//             height={450}
//           />
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// };

// export default CBDataAcceptanceIndustryGraph;


import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardContent, CardActionArea } from "@mui/material";

// Number format helper
const number_format = (number) => {
  if (number === null || number === undefined || isNaN(number)) return "0";
  const num = typeof number === "string" ? parseFloat(number) : number;
  if (isNaN(num)) return "0";
  return num.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
};

const CBDataAcceptanceIndustryGraph = ({ data }) => {
  console.log("data in CBDataAcceptanceIndustryGraph", data);

  // -----------------------------
  // ⭐ Dummy Data (for first load)
  // -----------------------------
  const dummyMonths = ["Jan-25", "Feb-25", "Mar-25", "Apr-25", "May-25"];

  var dummyRows = [];
  for (var i = 0; i < dummyMonths.length; i++) {
    dummyRows.push({
      Month: dummyMonths[i],
      Data_Submission_Count_Lk: "0",
      Data_Acceptance_Percent: "0%",
    });
  }

  // -----------------------------------------
  // ⭐ Fallback logic WITHOUT optional chaining
  // -----------------------------------------
  var months = dummyMonths;
  if (data && data.months && Array.isArray(data.months) && data.months.length > 0) {
    months = data.months;
  }

  var rows = dummyRows;
  if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
    rows = data.data;
  }

  // Extract values
  var submissionCounts = rows.map(function (item) {
    return parseFloat(String(item.Data_Submission_Count_Lk).replace(" Lk", "")) || 0;
  });

  var acceptanceRates = rows.map(function (item) {
    return parseFloat(String(item.Data_Acceptance_Percent).replace("%", "")) || 0;
  });

  // Dynamic Y-axis ranges
  var maxSubmission = Math.max.apply(null, submissionCounts.concat([1]));
  var minSubmission = Math.min.apply(null, submissionCounts);

  var maxAcceptance = Math.max.apply(null, acceptanceRates.concat([1]));
  var minAcceptance = Math.min.apply(null, acceptanceRates);

  var computedSubmissionMax = Math.ceil(maxSubmission * 1.1);
  var computedSubmissionMin = Math.max(0, Math.floor(minSubmission * 0.9));

  var computedAcceptanceMax, computedAcceptanceMin;

  if (maxAcceptance - minAcceptance < 5) {
    computedAcceptanceMax = Math.min(100, Math.ceil(maxAcceptance + 0.5));
    computedAcceptanceMin = Math.max(0, Math.floor(minAcceptance - 0.5));
  } else {
    computedAcceptanceMax = Math.min(100, Math.ceil(maxAcceptance * 1.1));
    computedAcceptanceMin = Math.max(0, Math.floor(minAcceptance * 0.9));
  }

  if (computedAcceptanceMin >= computedAcceptanceMax) {
    computedAcceptanceMin = Math.max(0, computedAcceptanceMax - 5);
  }

  var titleName = "Industry";
  if (data && data.short_name) {
    titleName = data.short_name;
  }

  var series = [
    {
      name: "Data submission count (Lk)",
      type: "column",
      data: submissionCounts,
    },
    {
      name: "% of Data acceptance",
      type: "line",
      data: acceptanceRates,
    },
  ];

  var options = {
    chart: {
      type: "line",
      height: 450,
      stacked: false,
      toolbar: { show: true },
    },

    colors: ["#1e5a9e", "#e67e22"],

    stroke: {
      width: [0, 4],
      curve: "smooth",
    },

    markers: {
      size: [0, 6],
      strokeColors: ["#1e5a9e", "#e67e22"],
      strokeWidth: 2,
      hover: { size: 8 },
    },

    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        var index = opts.dataPointIndex;
        if (opts.seriesIndex === 0) {
          return val === 0 ? "" : number_format(val);
        } else {
          var rate = acceptanceRates[index] || 0;
          return rate === 0 ? "" : rate.toFixed(1) + "%";
        }
      },
      style: {
        fontSize: "11px",
        fontWeight: "bold",
        colors: ["#000"],
      },
      offsetY: -10,
      background: { enabled: false },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        endingShape: "rounded",
      },
    },

    title: {
      text: "Data submission count & acceptance rate - " + titleName,
      align: "left",
      style: { fontSize: "16px", fontWeight: "bold" },
    },

    xaxis: {
      categories: months,
      labels: {
        style: {
          fontSize: "13px",
          fontWeight: 500,
          colors: "#666",
        },
      },
      axisBorder: {
        show: false,
        color: "#e0e0e0",
      },
      axisTicks: {
        show: false,
        color: "#e0e0e0",
      },
    },

    yaxis: [
      {
        show: false,
        min: computedSubmissionMin,
        max: computedSubmissionMax,
      },
      {
        opposite: true,
        show: false,
        min: computedAcceptanceMin,
        max: computedAcceptanceMax,
      },
    ],

    legend: {
      position: "bottom",
      fontSize: "14px",
      markers: { width: 12, height: 12 },
    },

    tooltip: {
      shared: true,
      custom: function ({ series, dataPointIndex, w }) {
        var month = w.globals.categoryLabels[dataPointIndex];

        return (
          '<div class="apexcharts-tooltip-title">' +
          month +
          "</div>" +
          '<div><span style="color:#1e5a9e; font-weight:bold;">Data Submission:</span> ' +
          number_format(submissionCounts[dataPointIndex]) +
          " Lk</div>" +
          '<div><span style="color:#e67e22; font-weight:bold;">Acceptance Rate:</span> ' +
          acceptanceRates[dataPointIndex].toFixed(1) +
          "%</div>"
        );
      },
    },

    grid: { show: false },
  };

  return (
    <Card style={{ paddingBottom: 20, marginTop: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <CardActionArea>
        <CardContent>
          <ReactApexChart options={options} series={series} type="line" height={450} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CBDataAcceptanceIndustryGraph;
