// import React from "react";
// import { Card, CardContent, CardActionArea } from "@mui/material";
// import ReactApexChart from "react-apexcharts";

// const EBMonthlyEnquirynhitMemberGp = ({ ebMemberInquiryGData }) => {
//   console.log(
//     "ebMemberInquiryGData",
//     JSON.stringify(ebMemberInquiryGData, null, 2)
//   );
//   // Fallback categories and zero data
//   const fallbackHeadings = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
//   const fallbackSeries = [
//     {
//       name: "Total Enquiries",
//       data: new Array(fallbackHeadings.length).fill(0),
//     },
//     {
//       name: "Total Hit Volumes",
//       data: new Array(fallbackHeadings.length).fill(0),
//     },
//   ];

//   // Use API data if available, else fallback

//   const series =
//     ebMemberInquiryGData && ebMemberInquiryGData.data
//       ? [
//           {
//             name: "Total Enquiries",
//             data:
//               ebMemberInquiryGData.data.total_enquiries ||
//               new Array(
//                 (ebMemberInquiryGData &&
//                   ebMemberInquiryGData.headings.length) ||
//                   5
//               ).fill(0),
//           },
//           {
//             name: "Total Hit Volumes",
//             data:
//               ebMemberInquiryGData.data.total_hit_volumes ||
//               new Array(
//                 (ebMemberInquiryGData &&
//                   ebMemberInquiryGData.headings.length) ||
//                   5
//               ).fill(0),
//           },
//         ]
//       : fallbackSeries;

//   const categories =
//     ebMemberInquiryGData && ebMemberInquiryGData.headings
//       ? ebMemberInquiryGData.headings
//       : fallbackHeadings;

//   const options = {
//     chart: {
//       type: "bar",
//       height: 450,
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
//     colors: ["#2B60AD", "#F78F6D"],
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "90%",
//         endingShape: "rounded",
//         dataLabels: {
//           position: "top",
//         },
//       },
//     },
//     dataLabels: {
//       enabled: true,
//       useHTML: true,
//       formatter: function (val) {
//         return val === 0
//           ? "" // hide 0 values
//           : new Intl.NumberFormat("en-IN").format(val);
//       },
//       style: {
//         fontSize: "12px",
//         fontFamily: "sans-serif",
//         fontWeight: "bold",
//         colors: ["#333"],
//       },
//       offsetY: -25,
//     },
//     stroke: {
//       show: true,
//       width: 2,
//       colors: ["transparent"],
//     },
//     title: {
//       text:
//         (ebMemberInquiryGData && ebMemberInquiryGData.title) ||
//         "Monthly total enquiries and hit volumes - Member",
//       align: "left",
//       style: {
//         fontSize: "16px",
//         fontWeight: "bold",
//         color: "#333",
//       },
//     },
//     xaxis: {
//       categories: categories,
//       labels: {
//         show: true,
//         style: {
//           fontSize: "13px",
//           fontFamily: "sans-serif",
//           fontWeight: 500,
//         },
//       },
//       axisBorder: { show: true, color: "#e0e0e0" },
//       axisTicks: { show: true, color: "#e0e0e0" },
//     },
//     yaxis: {
//       labels: {
//         show: false,
//       },
//       axisTicks: {
//         show: false,
//       },
//       axisBorder: {
//         show: false,
//       },
//     },
//     legend: {
//       position: "bottom",
//       horizontalAlign: "center",
//       fontSize: "14px",
//       fontWeight: 500,
//       markers: { width: 12, height: 12, radius: 6 },
//       itemMargin: { horizontal: 20, vertical: 10 },
//     },
//     tooltip: {
//       y: {
//         formatter: function (val) {
//           return new Intl.NumberFormat("en-IN").format(val);
//         },
//       },
//     },
//     grid: {
//       borderColor: "#e7e7e7",
//       strokeDashArray: 3,
//       padding: { top: 0, right: 10, bottom: 0, left: 10 },
//     },
//     fill: { opacity: 1 },
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
//             type="bar"
//             height={450}
//           />
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// };

// export default EBMonthlyEnquirynhitMemberGp;

// ew code

// import React from "react";
// import ReactApexChart from "react-apexcharts";

// function EBMonthlyEnquirynhitMemberGp({ ebMemberInquiryGData }) {
//   var categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
//   if (
//     ebMemberInquiryGData &&
//     ebMemberInquiryGData.headings &&
//     ebMemberInquiryGData.headings.length > 0
//   ) {
//     categories = ebMemberInquiryGData.headings;
//   }

//   var totalEnquiries = [1780, 1729, 1774, 2234, 1896, 1924];
//   if (
//     ebMemberInquiryGData &&
//     ebMemberInquiryGData.data &&
//     ebMemberInquiryGData.data.total_enquiries
//   ) {
//     totalEnquiries = ebMemberInquiryGData.data.total_enquiries;
//   }

//   var totalHitVolumes = [872, 752, 868, 1037, 885, 1004];
//   if (
//     ebMemberInquiryGData &&
//     ebMemberInquiryGData.data &&
//     ebMemberInquiryGData.data.total_hit_volumes
//   ) {
//     totalHitVolumes = ebMemberInquiryGData.data.total_hit_volumes;
//   }

//   var hitVolumesProportionRaw = [
//     "49.0%",
//     "43.5%",
//     "48.9%",
//     "46.4%",
//     "46.7%",
//     "52.2%",
//   ];
//   if (
//     ebMemberInquiryGData &&
//     ebMemberInquiryGData.data &&
//     ebMemberInquiryGData.data.hit_volumes_proportion
//   ) {
//     hitVolumesProportionRaw = ebMemberInquiryGData.data.hit_volumes_proportion;
//   }

//   // Convert percentage strings to actual values based on total enquiries
//   var hitVolumesProportion = hitVolumesProportionRaw.map(function (val, index) {
//     var percent = parseFloat(val.replace("%", ""));
//     return Math.round((percent / 100) * totalEnquiries[index]);
//   });

//   var chartTitle = "Monthly Data Overview";
//   if (
//     ebMemberInquiryGData &&
//     ebMemberInquiryGData.title &&
//     ebMemberInquiryGData.title.length > 0
//   ) {
//     chartTitle = ebMemberInquiryGData.title;
//   }

//   var series = [
//     {
//       name: "Total Enquiries",
//       type: "bar",
//       data: totalEnquiries,
//     },
//     {
//       name: "Total Hit Volumes",
//       type: "bar",
//       data: totalHitVolumes,
//     },
//     {
//       name: "Hit Volumes Proportion (scaled)",
//       type: "line",
//       data: hitVolumesProportion,
//     },
//   ];

//   var options = {
//     chart: {
//       type: "line",
//       stacked: false,
//       toolbar: { show: true },
//     },
//     title: {
//       text: chartTitle,
//       align: "left",
//     },
//     stroke: {
//       width: [0, 0, 3],
//       curve: "smooth",
//     },
//     plotOptions: {
//       bar: {
//         columnWidth: "40%",
//       },
//     },
//     dataLabels: {
//       enabled: true,
//       enabledOnSeries: [0, 1, 2],
//     },
//     xaxis: {
//       categories: categories,
//     },
//     yaxis: {
//       title: {
//         text: "Volume",
//       },
//       labels: {
//         formatter: function (val) {
//           return val;
//         },
//       },
//     },
//     tooltip: {
//       shared: true,
//       intersect: false,
//     },
//     legend: {
//       position: "top",
//       horizontalAlign: "center",
//     },
//   };

//   return (
//     <div>
//       <ReactApexChart options={options} series={series} type="line" height={400} />
//     </div>
//   );
// }

// export default EBMonthlyEnquirynhitMemberGp;

// new one code

// import React from "react";
// import { Card, CardContent, CardActionArea } from "@mui/material";
// import ReactApexChart from "react-apexcharts";

// const EBMonthlyEnquirynhitMemberGp = () => {
//   const ebMemberInquiryGData = {
//     title: "Monthly total enquiries and hit volumes - Arohan",
//     type: "bar-line",
//     headings: ["Jan-25", "Feb-25", "Mar-25", "Apr-25", "May-25", "Jun-25"],
//     data: {
//       short_name: "Arohan",
//       total_enquiries: [1780, 1729, 1774, 2234, 1896, 1924],
//       total_hit_volumes: [872, 752, 868, 1037, 885, 1004],
//       hit_volumes_proportion: [
//         "49.0%",
//         "43.5%",
//         "48.9%",
//         "46.4%",
//         "46.7%",
//         "52.2%",
//       ],
//     },
//   };

//   const categories = ebMemberInquiryGData.headings;
//   const totalEnquiries = ebMemberInquiryGData.data.total_enquiries;
//   const totalHitVolumes = ebMemberInquiryGData.data.total_hit_volumes;
//   const hitVolumesProportionRaw =
//     ebMemberInquiryGData.data.hit_volumes_proportion;

//   const hitVolumesProportion = hitVolumesProportionRaw.map(function (
//     val,
//     index
//   ) {
//     var percent =
//       typeof val === "string" ? parseFloat(val.replace("%", "")) : val;
//     return Math.round((percent / 100) * totalEnquiries[index]);
//   });

//   const series = [
//     {
//       name: "Total Enquiries",
//       type: "bar",
//       data: totalEnquiries,
//     },
//     {
//       name: "Total Hit Volumes",
//       type: "bar",
//       data: totalHitVolumes,
//     },
//     {
//       name: "Hit Volumes Proportion (%)",
//       type: "line",
//       data: hitVolumesProportion,
//     },
//   ];

//   const options = {
//     chart: {
//       type: "line",
//       height: 450,
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
//     colors: ["#2B60AD", "#F78F6D", "#39B1AC"],
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "60%",
//         endingShape: "rounded",
//         dataLabels: {
//           position: "top",
//           offsetY: -30,
//         },
//       },
//     },
//     dataLabels: {
//       enabled: true,
//       useHTML: false,
//       formatter: function (val, opts) {
//         const seriesIndex = opts.seriesIndex;
//         if (seriesIndex === 2) {
//           return hitVolumesProportionRaw[opts.dataPointIndex] || "";
//         }
//         return val === 0 ? "" : new Intl.NumberFormat("en-IN").format(val);
//       },
//       style: {
//         fontSize: "12px",
//         fontFamily: "sans-serif",
//         fontWeight: "bold",
//         colors: ["#000"],
//         rotate: 90, // rotate bar labels
//       },
//       background: {
//         enabled: false, // disable background box
//       },
//       offsetY: -25,
//     },
//     stroke: {
//       show: true,
//       width: [0, 0, 3],
//       curve: "straight",
//     },
//     title: {
//       text: ebMemberInquiryGData.title,
//       align: "left",
//       style: {
//         fontSize: "16px",
//         fontWeight: "bold",
//         color: "#333",
//       },
//     },
//     xaxis: {
//       categories: categories,
//       labels: {
//         show: true,
//         style: {
//           fontSize: "13px",
//           fontFamily: "sans-serif",
//           fontWeight: 500,
//         },
//       },
//       axisBorder: { show: true, color: "#e0e0e0" },
//       axisTicks: { show: true, color: "#e0e0e0" },
//     },
//     yaxis: {
//       labels: {
//         show: false,
//       },
//       axisTicks: {
//         show: false,
//       },
//       axisBorder: {
//         show: false,
//       },
//     },
//     legend: {
//       position: "bottom",
//       horizontalAlign: "center",
//       fontSize: "14px",
//       fontWeight: 500,
//       markers: { width: 12, height: 12, radius: 6 },
//       itemMargin: { horizontal: 20, vertical: 10 },
//     },
//     tooltip: {
//       shared: true,
//       intersect: false,
//       y: {
//         formatter: function (val, opts) {
//           const seriesIndex = opts.seriesIndex;
//           if (seriesIndex === 2) {
//             return hitVolumesProportionRaw[opts.dataPointIndex] || "";
//           }
//           return new Intl.NumberFormat("en-IN").format(val);
//         },
//       },
//     },
//     grid: {
//       borderColor: "#e7e7e7",
//       strokeDashArray: 3,
//       padding: { top: 0, right: 10, bottom: 0, left: 10 },
//     },
//     fill: { opacity: 1 },
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

// export default EBMonthlyEnquirynhitMemberGp;


// import * as React from "react";
// import ReactApexChart from "react-apexcharts";
// import { Card, CardContent, CardActionArea } from "@mui/material";
// import number_format from "../../Unqiue/Common_func";

// class EBMonthlyEnquirynhitMemberGp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       series: [],
//       options: {},
//     };
//   }

//   static getDerivedStateFromProps(props, state) {
//     console.log("member-graph-data", props);

//     const { ebMemberInquiryGData } = props;

//     if (!ebMemberInquiryGData || !ebMemberInquiryGData.data) {
//       console.log("No member data available");
//       return {
//         series: [],
//         options: {
//           chart: { type: "line", height: 450 },
//           noData: {
//             text: "No Data Available",
//             style: {
//               color: "#000000",
//               fontSize: "15px",
//               fontFamily: "sans-serif",
//               fontWeight: 500,
//             },
//           },
//         },
//       };
//     }

//     // Extract raw arrays
//     const {
//       total_enquiries = [],
//       total_hit_volumes = [],
//       hit_volumes_proportion = [],
//     } = ebMemberInquiryGData.data;

//     // Normalize numeric arrays (ensure numbers)
//     const parsedEnquiries = (total_enquiries || []).map((v) => Number(v) || 0);
//     const parsedHitVolumes = (total_hit_volumes || []).map(
//       (v) => Number(v) || 0
//     );

//     // Robust percent parsing (remove % and whitespace)
//     const proportionNumbers = (hit_volumes_proportion || []).map((v) => {
//       const s = v === null || v === undefined ? "0" : String(v);
//       const clean = s.replace(/%/g, "").trim();
//       return parseFloat(clean) || 0;
//     });

//     console.log("Member extracted data:", {
//       parsedEnquiries,
//       parsedHitVolumes,
//       proportionNumbers,
//       headings: ebMemberInquiryGData.headings,
//     });

//     // Ensure there's at least 1 to avoid division by zero
//     const maxCount =
//       Math.max(
//         ...(parsedEnquiries.length ? parsedEnquiries : [0]),
//         ...(parsedHitVolumes.length ? parsedHitVolumes : [0]),
//         1
//       ) || 1;

//     // Scale proportion to the counts axis so line is visible on same Y axis.
//     // scaled = (percent / 100) * maxCount
//     const scaledProportion = proportionNumbers.map((p) => (p / 100) * maxCount);

//     // Build series (note: third series uses scaled values for plotting)
//     const seriesData = [
//       {
//         name: "Total Enquiries",
//         type: "column",
//         data: parsedEnquiries,
//       },
//       {
//         name: "Total Hit Volumes",
//         type: "column",
//         data: parsedHitVolumes,
//       },
//       {
//         name: "Hit Volumes Proportion",
//         type: "line",
//         data: scaledProportion,
//       },
//     ];

//     console.log("Member series data:", seriesData);

//     // Decide Y axis max (dynamic). If you want fixed 0-30000 uncomment the yaxis.max line below.
//     const computedYMax = Math.ceil(maxCount / 1000) * 1000; // round up to nearest 1000

//     return {
//       series: seriesData,
//       options: {
//         chart: {
//           type: "line",
//           height: 450,
//           stacked: false,
//           toolbar: {
//             show: true,
//             tools: {
//               download: true,
//               selection: false,
//               zoom: true,
//               zoomin: true,
//               zoomout: true,
//               pan: false,
//               reset: true,
//             },
//           },
//         },
//         noData: {
//           text: "Loading...",
//           style: {
//             color: "#000000",
//             fontSize: "15px",
//             fontFamily: "sans-serif",
//             fontWeight: 500,
//           },
//         },
//         colors: ["#083EC1", "#E3800A", "#ff0000ff"],
//         stroke: {
//           width: [0, 0, 4],
//           curve: "smooth",
//         },
//         markers: {
//           size: [0, 0, 6],
//           strokeColors: ["#083EC1", "#E3800A", "#ffffffff"],
//           strokeWidth: 2,
//           hover: {
//             size: 8,
//           },
//         },
//         dataLabels: {
//           enabled: true,
//           enabledOnSeries: [0, 1, 2],
//           formatter: function (val, opts) {
//             // For line we want to show the original percent value (not the scaled plotted value)
//             if (opts.seriesIndex === 2) {
//               const idx = opts.dataPointIndex;
//               const p = proportionNumbers[idx] || 0;
//               return p === 0 ? "" : p.toFixed(1) + "%";
//             }
//             // For bar charts show formatted numbers
//             return val === 0 ? "" : number_format(val);
//           },
//           style: {
//             fontSize: "11px",
//             fontFamily: "sans-serif",
//             fontWeight: "bold",
//             colors: ["#000000"],
//           },
//           offsetY: -10,
//           background: {
//             enabled: false,
//           },
//         },
//         plotOptions: {
//           bar: {
//             horizontal: false,
//             columnWidth: "60%",
//             endingShape: "rounded",
//             dataLabels: {
//               position: "top",
//             },
//           },
//         },
//         title: {
//           text:
//             ebMemberInquiryGData.title ||
//             "Monthly total enquiries and hit volumes - Member",
//           align: "left",
//           style: {
//             fontSize: "16px",
//             fontWeight: "bold",
//             color: "#333",
//           },
//         },
//         xaxis: {
//           categories: ebMemberInquiryGData.headings || [],
//           labels: {
//             show: true,
//             style: {
//               fontSize: "13px",
//               fontFamily: "sans-serif",
//               fontWeight: 500,
//               colors: "#666",
//             },
//           },
//           axisBorder: {
//             show: true,
//             color: "#e0e0e0",
//           },
//           axisTicks: {
//             show: true,
//             color: "#e0e0e0",
//           },
//         },
//         yaxis: {
//           title: {
//             text: "",
//           },
//           // show formatted y-axis labels (counts)
//           labels: {
//             show: false,
//             formatter: function (val) {
//               return number_format(val);
//             },
//           },
//           min: 0,
//           max: computedYMax,
//           // If you want a fixed 0-30000 range instead, replace the two lines above with:
//           // min: 0,
//           // max: 30000,
//         },
//         legend: {
//           position: "bottom",
//           horizontalAlign: "center",
//           fontFamily: "sans-serif",
//           fontSize: "14px",
//           fontWeight: 500,
//           markers: {
//             width: 12,
//             height: 12,
//             radius: 6,
//           },
//           itemMargin: {
//             horizontal: 20,
//             vertical: 10,
//           },
//         },
//         tooltip: {
//           shared: true,
//           intersect: false,
//           // custom tooltip so we can show original percent values for the line series
//           custom: function ({ series, seriesIndex, dataPointIndex, w }) {
//             let result =
//               '<div class="apexcharts-tooltip-title">' +
//               (w.globals.categoryLabels[dataPointIndex] || "") +
//               "</div>";

//             for (let i = 0; i < series.length; i++) {
//               if (series[i] && series[i][dataPointIndex] !== undefined) {
//                 const val = series[i][dataPointIndex];
//                 const serieName = w.globals.seriesNames[i];
//                 const color = w.globals.colors[i];

//                 if (serieName === "Hit Volumes Proportion") {
//                   // use original percent (not the scaled plotting value)
//                   const p = proportionNumbers[dataPointIndex] || 0;
//                   result +=
//                     '<div class="apexcharts-tooltip-series-group">' +
//                     '<span class="apexcharts-tooltip-marker" style="background-color: ' +
//                     color +
//                     ';"></span>' +
//                     '<div class="apexcharts-tooltip-text">' +
//                     '<div class="apexcharts-tooltip-y-group">' +
//                     '<span class="apexcharts-tooltip-text-y-label">' +
//                     serieName +
//                     ": </span>" +
//                     '<span class="apexcharts-tooltip-text-y-value">' +
//                     p.toFixed(1) +
//                     "%</span>" +
//                     "</div></div></div>";
//                 } else {
//                   result +=
//                     '<div class="apexcharts-tooltip-series-group">' +
//                     '<span class="apexcharts-tooltip-marker" style="background-color: ' +
//                     color +
//                     ';"></span>' +
//                     '<div class="apexcharts-tooltip-text">' +
//                     '<div class="apexcharts-tooltip-y-group">' +
//                     '<span class="apexcharts-tooltip-text-y-label">' +
//                     serieName +
//                     ": </span>" +
//                     '<span class="apexcharts-tooltip-text-y-value">' +
//                     number_format(val) +
//                     "</span>" +
//                     "</div></div></div>";
//                 }
//               }
//             }

//             return result;
//           },
//         },
//         grid: {
//           borderColor: "#e7e7e7",
//           show: false,
//           strokeDashArray: 3,
//           padding: {
//             top: 0,
//             right: 30,
//             bottom: 0,
//             left: 10,
//           },
//         },
//         fill: {
//           opacity: [0.9, 0.9, 0.1],
//         },
//       },
//     };
//   }

//   render() {
//     return (
//       <Card
//         style={{
//           paddingBottom: "20px",
//           marginTop: "20px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//         }}
//       >
//         <CardActionArea>
//           <CardContent>
//             <ReactApexChart
//               options={this.state.options}
//               series={this.state.series}
//               type="line"
//               height={450}
//             />
//           </CardContent>
//         </CardActionArea>
//       </Card>
//     );
//   }
// }

// export default EBMonthlyEnquirynhitMemberGp;

import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardContent, CardActionArea } from "@mui/material";
import number_format from "../../Unqiue/Common_func";

const EBMonthlyEnquirynhitMemberGp = ({ ebMemberInquiryGData }) => {
  console.log("member-graph-data", ebMemberInquiryGData);

  // Check if data exists
  if (!ebMemberInquiryGData || !ebMemberInquiryGData.data) {
    console.log("No member data available");
    return (
      <Card
        style={{
          paddingBottom: "20px",
          marginTop: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          minHeight: "500px",
        }}
      >
        <CardActionArea>
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "450px",
                fontSize: "18px",
                color: "#6b7280",
                fontFamily: "Arial, sans-serif",
              }}
            >
              No Data Available
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  // Extract raw arrays
  const {
    total_enquiries = [],
    total_hit_volumes = [],
    hit_volumes_proportion = [],
  } = ebMemberInquiryGData.data;

  // Normalize numeric arrays (ensure numbers)
  const parsedEnquiries = (total_enquiries || []).map((v) => Number(v) || 0);
  const parsedHitVolumes = (total_hit_volumes || []).map((v) => Number(v) || 0);

  // Check if there's any real data
  const hasAnyData =
    parsedEnquiries.some((v) => v > 0) || parsedHitVolumes.some((v) => v > 0);

  if (!hasAnyData) {
    console.log("No member data available - all values are zero");
    return (
      <Card
        style={{
          paddingBottom: "20px",
          marginTop: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          minHeight: "500px",
        }}
      >
        <CardActionArea>
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "450px",
                fontSize: "18px",
                color: "#6b7280",
                fontFamily: "Arial, sans-serif",
              }}
            >
              No Data Available
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  // Robust percent parsing (remove % and whitespace)
  const proportionNumbers = (hit_volumes_proportion || []).map((v) => {
    const s = v === null || v === undefined ? "0" : String(v);
    const clean = s.replace(/%/g, "").trim();
    return parseFloat(clean) || 0;
  });

  console.log("Member extracted data:", {
    parsedEnquiries,
    parsedHitVolumes,
    proportionNumbers,
    headings: ebMemberInquiryGData.headings,
  });

  // Ensure there's at least 1 to avoid division by zero
  const maxCount =
    Math.max(
      ...(parsedEnquiries.length ? parsedEnquiries : [0]),
      ...(parsedHitVolumes.length ? parsedHitVolumes : [0]),
      1
    ) || 1;

  // Scale proportion to the counts axis so line is visible on same Y axis
  const scaledProportion = proportionNumbers.map((p) => (p / 100) * maxCount);

  // Build series
  const series = [
    {
      name: "Total Enquiries",
      type: "column",
      data: parsedEnquiries,
    },
    {
      name: "Total Hit Volumes",
      type: "column",
      data: parsedHitVolumes,
    },
    {
      name: "Hit Volumes Proportion",
      type: "line",
      data: scaledProportion,
    },
  ];

  console.log("Member series data:", series);

  // Decide Y axis max (dynamic)
  const computedYMax = Math.ceil(maxCount / 1000) * 1000;

  const options = {
    chart: {
      type: "line",
      height: 450,
      stacked: false,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: true,
        },
      },
    },
    noData: {
      text: "Loading...",
      style: {
        color: "#000000",
        fontSize: "15px",
        fontFamily: "sans-serif",
        fontWeight: 500,
      },
    },
    colors: ["#083EC1", "#E3800A", "#ff0000ff"],
    stroke: {
      width: [0, 0, 4],
      curve: "smooth",
    },
    markers: {
      size: [0, 0, 6],
      strokeColors: ["#083EC1", "#E3800A", "#ffffffff"],
      strokeWidth: 2,
      hover: {
        size: 8,
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0, 1, 2],
      formatter: function (val, opts) {
        if (opts.seriesIndex === 2) {
          const idx = opts.dataPointIndex;
          const p = proportionNumbers[idx] || 0;
          return p === 0 ? "" : p.toFixed(1) + "%";
        }
        return val === 0 ? "" : number_format(val);
      },
      style: {
        fontSize: "11px",
        fontFamily: "sans-serif",
        fontWeight: "bold",
        colors: ["#000000"],
      },
      offsetY: -10,
      background: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        endingShape: "rounded",
        dataLabels: {
          position: "top",
        },
      },
    },
    title: {
      text:
        ebMemberInquiryGData.title ||
        "Monthly total enquiries and hit volumes - Member",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333",
      },
    },
    xaxis: {
      categories: ebMemberInquiryGData.headings || [],
      labels: {
        show: true,
        style: {
          fontSize: "13px",
          fontFamily: "sans-serif",
          fontWeight: 500,
          colors: "#666",
        },
      },
      axisBorder: {
        show: true,
        color: "#e0e0e0",
      },
      axisTicks: {
        show: true,
        color: "#e0e0e0",
      },
    },
    yaxis: {
      title: {
        text: "",
      },
      labels: {
        show: false,
        formatter: function (val) {
          return number_format(val);
        },
      },
      min: 0,
      max: computedYMax,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontFamily: "sans-serif",
      fontSize: "14px",
      fontWeight: 500,
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
      itemMargin: {
        horizontal: 20,
        vertical: 10,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        let result =
          '<div class="apexcharts-tooltip-title">' +
          (w.globals.categoryLabels[dataPointIndex] || "") +
          "</div>";

        for (let i = 0; i < series.length; i++) {
          if (series[i] && series[i][dataPointIndex] !== undefined) {
            const val = series[i][dataPointIndex];
            const serieName = w.globals.seriesNames[i];
            const color = w.globals.colors[i];

            if (serieName === "Hit Volumes Proportion") {
              const p = proportionNumbers[dataPointIndex] || 0;
              result +=
                '<div class="apexcharts-tooltip-series-group">' +
                '<span class="apexcharts-tooltip-marker" style="background-color: ' +
                color +
                ';"></span>' +
                '<div class="apexcharts-tooltip-text">' +
                '<div class="apexcharts-tooltip-y-group">' +
                '<span class="apexcharts-tooltip-text-y-label">' +
                serieName +
                ": </span>" +
                '<span class="apexcharts-tooltip-text-y-value">' +
                p.toFixed(1) +
                "%</span>" +
                "</div></div></div>";
            } else {
              result +=
                '<div class="apexcharts-tooltip-series-group">' +
                '<span class="apexcharts-tooltip-marker" style="background-color: ' +
                color +
                ';"></span>' +
                '<div class="apexcharts-tooltip-text">' +
                '<div class="apexcharts-tooltip-y-group">' +
                '<span class="apexcharts-tooltip-text-y-label">' +
                serieName +
                ": </span>" +
                '<span class="apexcharts-tooltip-text-y-value">' +
                number_format(val) +
                "</span>" +
                "</div></div></div>";
            }
          }
        }

        return result;
      },
    },
    grid: {
      borderColor: "#e7e7e7",
      show: false,
      strokeDashArray: 3,
      padding: {
        top: 0,
        right: 30,
        bottom: 0,
        left: 10,
      },
    },
    fill: {
      opacity: [0.9, 0.9, 0.1],
    },
  };

  return (
    <Card
      style={{
        paddingBottom: "20px",
        marginTop: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <CardActionArea>
        <CardContent>
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={450}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EBMonthlyEnquirynhitMemberGp;
