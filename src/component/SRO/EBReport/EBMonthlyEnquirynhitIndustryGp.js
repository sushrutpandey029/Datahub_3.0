// import React from "react";
// import { Card, CardContent, CardActionArea } from "@mui/material";
// import ReactApexChart from "react-apexcharts";

// const EBMonthlyEnquirynhitIndustryGp = ({ ebIndustryInquiryGData }) => {
//   console.log("ebIndustryInquiryGData",JSON.stringify(ebIndustryInquiryGData,null,2))
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
//     ebIndustryInquiryGData && ebIndustryInquiryGData.data
//       ? [
//           {
//             name: "Total Enquiries",
//             data:
//               ebIndustryInquiryGData.data.total_enquiries ||
//               new Array(
//                 (ebIndustryInquiryGData &&
//                   ebIndustryInquiryGData.headings.length) ||
//                   5
//               ).fill(0),
//           },
//           {
//             name: "Total Hit Volumes",
//             data:
//               ebIndustryInquiryGData.data.total_hit_volumes ||
//               new Array(
//                 (ebIndustryInquiryGData &&
//                   ebIndustryInquiryGData.headings.length) ||
//                   5
//               ).fill(0),
//           },
//         ]
//       : fallbackSeries;

//   const categories =
//     ebIndustryInquiryGData && ebIndustryInquiryGData.headings
//       ? ebIndustryInquiryGData.headings
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
//         (ebIndustryInquiryGData && ebIndustryInquiryGData.title) ||
//         "Monthly total enquiries and hit volumes - Industry",
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
//       axisBorder: {
//         show: true,
//         color: "#e0e0e0",
//       },
//       axisTicks: {
//         show: true,
//         color: "#e0e0e0",
//       },
//     },
//     yaxis: {
//       title: {},
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
//       y: {
//         formatter: function (val) {
//           return val;
//         },
//       },
//     },
//     grid: {
//       borderColor: "#e7e7e7",
//       strokeDashArray: 3,
//       padding: {
//         top: 0,
//         right: 10,
//         bottom: 0,
//         left: 10,
//       },
//     },
//     fill: {
//       opacity: 1,
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
//             type="bar"
//             height={450}
//           />
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// };

// export default EBMonthlyEnquirynhitIndustryGp;

// new one my

// import React from "react";
// import { Card, CardContent, CardActionArea } from "@mui/material";
// import ReactApexChart from "react-apexcharts";

// const EBMonthlyEnquirynhitIndustryGp = ({ ebIndustryInquiryGData }) => {
//   console.log("ebIndustryInquiryGData", JSON.stringify(ebIndustryInquiryGData, null, 2));

//   const fallbackHeadings = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
//   const fallbackSeries = [
//     {
//       name: "Total Enquiries",
//       type: "bar",
//       data: new Array(fallbackHeadings.length).fill(0),
//     },
//     {
//       name: "Total Hit Volumes",
//       type: "bar",
//       data: new Array(fallbackHeadings.length).fill(0),
//     },
//     {
//       name: "Hit Volumes Proportion (%)",
//       type: "line",
//       data: new Array(fallbackHeadings.length).fill(0),
//     },
//   ];

//   const categories =
//     ebIndustryInquiryGData && ebIndustryInquiryGData.headings
//       ? ebIndustryInquiryGData.headings
//       : fallbackHeadings;

//   const totalEnquiries =
//     ebIndustryInquiryGData &&
//     ebIndustryInquiryGData.data &&
//     ebIndustryInquiryGData.data.total_enquiries
//       ? ebIndustryInquiryGData.data.total_enquiries
//       : fallbackSeries[0].data;

//   const totalHitVolumes =
//     ebIndustryInquiryGData &&
//     ebIndustryInquiryGData.data &&
//     ebIndustryInquiryGData.data.total_hit_volumes
//       ? ebIndustryInquiryGData.data.total_hit_volumes
//       : fallbackSeries[1].data;

//   const hitVolumesProportionRaw =
//     ebIndustryInquiryGData &&
//     ebIndustryInquiryGData.data &&
//     ebIndustryInquiryGData.data.hit_volumes_proportion
//       ? ebIndustryInquiryGData.data.hit_volumes_proportion
//       : fallbackSeries[2].data;

//   const hitVolumesProportion = hitVolumesProportionRaw.map(function (val, index) {
//     var percent = typeof val === "string" ? parseFloat(val.replace("%", "")) : val;
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
//         columnWidth: "70%",
//         endingShape: "rounded",
//         dataLabels: {
//           position: "top",
//         },
//       },
//     },
//     dataLabels: {
//       enabled: true,
//       useHTML: true,
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
//         // colors: ["#fff"],
//         rotate: 90,
//       },
//      offsetY: -25,
//     },
//     stroke: {
//       show: true,
//       width: [0, 0, 3],
//       curve: "straight",
//     },
//     title: {
//       text:
//         (ebIndustryInquiryGData && ebIndustryInquiryGData.title) ||
//         "Monthly total enquiries and hit volumes - Industry",
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
//       axisBorder: {
//         show: true,
//         color: "#e0e0e0",
//       },
//       axisTicks: {
//         show: true,
//         color: "#e0e0e0",
//       },
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
//       padding: {
//         top: 0,
//         right: 10,
//         bottom: 0,
//         left: 10,
//       },
//     },
//     fill: {
//       opacity: 1,
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

// export default EBMonthlyEnquirynhitIndustryGp;

// import * as React from "react";
// import ReactApexChart from "react-apexcharts";
// import { Card, CardContent, CardActionArea } from "@mui/material";
// import number_format from "../../Unqiue/Common_func";

// class EBMonthlyEnquirynhitIndustryGp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       series: [],
//       options: {},
//     };
//   }

//   static getDerivedStateFromProps(props, state) {
//     console.log("industry-graph-data", props);

//     const { ebIndustryInquiryGData } = props;

//     if (!ebIndustryInquiryGData || !ebIndustryInquiryGData.data) {
//       console.log("No industry data available");
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

//     // ✅ Extract data
//     const { total_enquiries, total_hit_volumes, hit_volumes_proportion } =
//       ebIndustryInquiryGData.data;

//     console.log("Industry extracted data:", {
//       total_enquiries,
//       total_hit_volumes,
//       hit_volumes_proportion,
//       headings: ebIndustryInquiryGData.headings,
//     });

//     // ✅ Convert % string → number
//     const proportionNumbers = (hit_volumes_proportion || []).map(
//       (v) => parseFloat(v.replace("%", "")) || 0
//     );

//     console.log("Industry proportion numbers:", proportionNumbers);

//     // ✅ Build series
//     const seriesData = [
//       {
//         name: "Total Enquiries",
//         type: "column",
//         data: total_enquiries || [],
//       },
//       {
//         name: "Total Hit Volumes",
//         type: "column",
//         data: total_hit_volumes || [],
//       },
//       {
//         name: "Hit Volumes Proportion",
//         type: "line",
//         data: proportionNumbers,
//       },
//     ];

//     console.log("Industry series data:", seriesData);

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
//         colors: ["#083EC1", "#E3800A", "#ff0000ff"], // same as member
//         stroke: {
//           width: [0, 0, 4],
//           curve: "smooth",
//           colors: ["#ff0000ff", "#ff0000ff", "#ff0000ff"],
//         },
//         markers: {
//           size: [0, 0, 6],
//           colors: ["#ff0000ff"],
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
//             if (opts.seriesIndex === 2) {
//               return val === 0 ? "" : val.toFixed(1);
//             }
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
//             ebIndustryInquiryGData.title ||
//             "Monthly total enquiries and hit volumes - Industry",
//           align: "left",
//           style: {
//             fontSize: "16px",
//             fontWeight: "bold",
//             color: "#333",
//           },
//         },
//         xaxis: {
//           categories: ebIndustryInquiryGData.headings || [],
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
//           labels: {
//             show: false,
//           },
//           axisTicks: {
//             show: false,
//           },
//           axisBorder: {
//             show: false,
//           },
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
//           formatter: function (
//             value,
//             { series, seriesIndex, dataPointIndex, w }
//           ) {
//             let result =
//               '<div class="apexcharts-tooltip-title">' +
//               w.globals.categoryLabels[dataPointIndex] +
//               "</div>";

//             series.forEach((serie, index) => {
//               if (serie[dataPointIndex] !== undefined) {
//                 let val = serie[dataPointIndex];
//                 let serieName = w.globals.seriesNames[index];

//                 if (serieName === "Hit Volumes Proportion") {
//                   result += '<div class="apexcharts-tooltip-series-group">';
//                   result +=
//                     '<span class="apexcharts-tooltip-marker" style="background-color: ' +
//                     w.globals.colors[index] +
//                     ';"></span>';
//                   result += '<div class="apexcharts-tooltip-text">';
//                   result += '<div class="apexcharts-tooltip-y-group">';
//                   result +=
//                     '<span class="apexcharts-tooltip-text-y-label">' +
//                     serieName +
//                     ": </span>";
//                   result +=
//                     '<span class="apexcharts-tooltip-text-y-value">' +
//                     val.toFixed(1) +
//                     "%</span>";
//                   result += "</div></div></div>";
//                 } else {
//                   result += '<div class="apexcharts-tooltip-series-group">';
//                   result +=
//                     '<span class="apexcharts-tooltip-marker" style="background-color: ' +
//                     w.globals.colors[index] +
//                     ';"></span>';
//                   result += '<div class="apexcharts-tooltip-text">';
//                   result += '<div class="apexcharts-tooltip-y-group">';
//                   result +=
//                     '<span class="apexcharts-tooltip-text-y-label">' +
//                     serieName +
//                     ": </span>";
//                   result +=
//                     '<span class="apexcharts-tooltip-text-y-value">' +
//                     number_format(val) +
//                     "</span>";
//                   result += "</div></div></div>";
//                 }
//               }
//             });

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

// export default EBMonthlyEnquirynhitIndustryGp;

// import React from "react";
// import { Card, CardContent, CardActionArea } from "@mui/material";
// import ReactApexChart from "react-apexcharts";

// const EBMonthlyEnquirynhitIndustryGp = ({ ebIndustryInquiryGData }) => {
//   console.log(
//     "ebIndustryInquiryGData",
//     JSON.stringify(ebIndustryInquiryGData, null, 2)
//   );

//   const fallbackHeadings = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
//   const fallbackSeries = [
//     {
//       name: "Total Enquiries",
//       type: "bar",
//       data: new Array(fallbackHeadings.length).fill(0),
//     },
//     {
//       name: "Total Hit Volumes",
//       type: "bar",
//       data: new Array(fallbackHeadings.length).fill(0),
//     },
//     {
//       name: "Hit Volumes Proportion (%)",
//       type: "line",
//       data: new Array(fallbackHeadings.length).fill(0),
//     },
//   ];

//   const categories =
//     ebIndustryInquiryGData && ebIndustryInquiryGData.headings
//       ? ebIndustryInquiryGData.headings
//       : fallbackHeadings;

//   const totalEnquiries =
//     ebIndustryInquiryGData &&
//     ebIndustryInquiryGData.data &&
//     ebIndustryInquiryGData.data.total_enquiries
//       ? ebIndustryInquiryGData.data.total_enquiries
//       : fallbackSeries[0].data;

//   const totalHitVolumes =
//     ebIndustryInquiryGData &&
//     ebIndustryInquiryGData.data &&
//     ebIndustryInquiryGData.data.total_hit_volumes
//       ? ebIndustryInquiryGData.data.total_hit_volumes
//       : fallbackSeries[1].data;

//   const hitVolumesProportionRaw =
//     ebIndustryInquiryGData &&
//     ebIndustryInquiryGData.data &&
//     ebIndustryInquiryGData.data.hit_volumes_proportion
//       ? ebIndustryInquiryGData.data.hit_volumes_proportion
//       : fallbackSeries[2].data;

//   const hitVolumesProportion = hitVolumesProportionRaw.map(function (val, index) {
//     var percent = typeof val === "string" ? parseFloat(val.replace("%", "")) : val;
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
//       name: "Hit Volumes Proportion",
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
//     colors: ["#2563eb", "#fb923c", "#ef4444"],
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "55%",
//         endingShape: "rounded",
//         dataLabels: {
//           position: 'top',
//         }
//       },
//     },
//     dataLabels: {
//       enabled: true,
//       enabledOnSeries: [0, 1, 2],
//       formatter: function (val, opts) {
//         const seriesIndex = opts.seriesIndex;
//         if (seriesIndex === 2) {
//           return hitVolumesProportionRaw[opts.dataPointIndex] || "";
//         }
//         return val === 0 ? "" : new Intl.NumberFormat("en-IN").format(val);
//       },
//       style: {
//         fontSize: "12px",
//         fontFamily: "Arial, sans-serif",
//         fontWeight: "600",
//         colors: ["#000"],
//       },
//       offsetY: -25,
//       background: {
//         enabled: false,
//       }
//     },
//     stroke: {
//       show: true,
//       width: [0, 0, 3],
//       curve: "straight",
//     },
//     markers: {
//       size: [0, 0, 8],
//       colors: ["#2563eb", "#fb923c", "#ef4444"],
//       strokeColors: "#ef4444",
//       strokeWidth: 2,
//       hover: {
//         size: 10,
//       }
//     },
//     title: {
//       text:
//         (ebIndustryInquiryGData && ebIndustryInquiryGData.title) ||
//         "Monthly Total Enquiries and Hit Volumes - Industry",
//       align: "left",
//       style: {
//         fontSize: "18px",
//         fontWeight: "600",
//         color: "#1f2937",
//         fontFamily: "Arial, sans-serif",
//       },
//     },
//     xaxis: {
//       categories: categories,
//       labels: {
//         show: true,
//         style: {
//           fontSize: "13px",
//           fontFamily: "Arial, sans-serif",
//           fontWeight: 500,
//           colors: "#374151",
//         },
//       },
//       axisBorder: {
//         show: true,
//         color: "#d1d5db",
//       },
//       axisTicks: {
//         show: true,
//         color: "#d1d5db",
//       },
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
//       fontFamily: "Arial, sans-serif",
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
//       borderColor: "#e5e7eb",
//       show:false,
//       strokeDashArray: 0,
//       padding: {
//         top: 0,
//         right: 20,
//         bottom: 0,
//         left: 10,
//       },
//     },
//     fill: {
//       opacity: 1,
//     },
//   };

//   return (
//     <Card
//       style={{
//         paddingBottom: "20px",
//         marginTop: "20px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
//         borderRadius: "8px",
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

// export default EBMonthlyEnquirynhitIndustryGp;

import React from "react";
import { Card, CardContent, CardActionArea } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const EBMonthlyEnquirynhitIndustryGp = ({ ebIndustryInquiryGData }) => {
  console.log(
    "ebIndustryInquiryGData",
    JSON.stringify(ebIndustryInquiryGData, null, 2)
  );

  // Check if data is empty or not available
  const hasData =
    ebIndustryInquiryGData &&
    ebIndustryInquiryGData.data &&
    ((ebIndustryInquiryGData.data.total_enquiries &&
      ebIndustryInquiryGData.data.total_enquiries.some((val) => val > 0)) ||
      (ebIndustryInquiryGData.data.total_hit_volumes &&
        ebIndustryInquiryGData.data.total_hit_volumes.some((val) => val > 0)));

  // If no data, show "No Data Available" message
  if (!hasData) {
    return (
      <Card
        style={{
          paddingBottom: "20px",
          marginTop: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          borderRadius: "8px",
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

  const fallbackHeadings = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const fallbackSeries = [
    {
      name: "Total Enquiries",
      type: "bar",
      data: new Array(fallbackHeadings.length).fill(0),
    },
    {
      name: "Total Hit Volumes",
      type: "bar",
      data: new Array(fallbackHeadings.length).fill(0),
    },
    {
      name: "Hit Volumes Proportion (%)",
      type: "line",
      data: new Array(fallbackHeadings.length).fill(0),
    },
  ];

  const categories =
    ebIndustryInquiryGData && ebIndustryInquiryGData.headings
      ? ebIndustryInquiryGData.headings
      : fallbackHeadings;

  const totalEnquiries =
    ebIndustryInquiryGData &&
    ebIndustryInquiryGData.data &&
    ebIndustryInquiryGData.data.total_enquiries
      ? ebIndustryInquiryGData.data.total_enquiries
      : fallbackSeries[0].data;

  const totalHitVolumes =
    ebIndustryInquiryGData &&
    ebIndustryInquiryGData.data &&
    ebIndustryInquiryGData.data.total_hit_volumes
      ? ebIndustryInquiryGData.data.total_hit_volumes
      : fallbackSeries[1].data;

  const hitVolumesProportionRaw =
    ebIndustryInquiryGData &&
    ebIndustryInquiryGData.data &&
    ebIndustryInquiryGData.data.hit_volumes_proportion
      ? ebIndustryInquiryGData.data.hit_volumes_proportion
      : fallbackSeries[2].data;

  const hitVolumesProportion = hitVolumesProportionRaw.map(function (
    val,
    index
  ) {
    var percent =
      typeof val === "string" ? parseFloat(val.replace("%", "")) : val;
    return Math.round((percent / 100) * totalEnquiries[index]);
  });

  const series = [
    {
      name: "Total Enquiries",
      type: "bar",
      data: totalEnquiries,
    },
    {
      name: "Total Hit Volumes",
      type: "bar",
      data: totalHitVolumes,
    },
    {
      name: "Hit Volumes Proportion",
      type: "line",
      data: hitVolumesProportion,
    },
  ];

  const options = {
    chart: {
      type: "line",
      height: 450,
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
    colors: ["#2563eb", "#fb923c", "#ef4444"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0, 1, 2],
      formatter: function (val, opts) {
        const seriesIndex = opts.seriesIndex;
        if (seriesIndex === 2) {
          return hitVolumesProportionRaw[opts.dataPointIndex] || "";
        }
        return val === 0 ? "" : new Intl.NumberFormat("en-IN").format(val);
      },
      style: {
        fontSize: "12px",
        fontFamily: "Arial, sans-serif",
        fontWeight: "600",
        colors: ["#000"],
      },
      offsetY: -25,
      background: {
        enabled: false,
      },
    },
    stroke: {
      show: true,
      width: [0, 0, 3],
      curve: "straight",
    },
    markers: {
      size: [0, 0, 8],
      colors: ["#2563eb", "#fb923c", "#ef4444"],
      strokeColors: "#ef4444",
      strokeWidth: 2,
      hover: {
        size: 10,
      },
    },
    title: {
      text:
        (ebIndustryInquiryGData && ebIndustryInquiryGData.title) ||
        "Monthly Total Enquiries and Hit Volumes - Industry",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#1f2937",
        fontFamily: "Arial, sans-serif",
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        show: true,
        style: {
          fontSize: "13px",
          fontFamily: "Arial, sans-serif",
          fontWeight: 500,
          colors: "#374151",
        },
      },
      axisBorder: {
        show: true,
        color: "#d1d5db",
      },
      axisTicks: {
        show: true,
        color: "#d1d5db",
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontFamily: "Arial, sans-serif",
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
      y: {
        formatter: function (val, opts) {
          const seriesIndex = opts.seriesIndex;
          if (seriesIndex === 2) {
            return hitVolumesProportionRaw[opts.dataPointIndex] || "";
          }
          return new Intl.NumberFormat("en-IN").format(val);
        },
      },
    },
    grid: {
      borderColor: "#e5e7eb",
      show: false,
      strokeDashArray: 0,
      padding: {
        top: 0,
        right: 20,
        bottom: 0,
        left: 10,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <Card
      style={{
        paddingBottom: "20px",
        marginTop: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        borderRadius: "8px",
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

export default EBMonthlyEnquirynhitIndustryGp;
