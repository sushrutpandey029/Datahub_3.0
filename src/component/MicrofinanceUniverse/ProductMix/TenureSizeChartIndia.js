// // import React, { useMemo, useState, useEffect, useRef } from "react";
// // import ReactApexChart from "react-apexcharts";

// // const TenureSizeChart = ({ data, title = "Tenure Size (%) - All India" }) => {
// //   const [hiddenSeries, setHiddenSeries] = useState([]);
// //   const [hoveredLegend, setHoveredLegend] = useState(null);
// //   const chartRef = useRef(null);

// //   // 🔹 Transform API data (NO OPTIONAL CHAINING)
// //   const transformTenureAPIData = (apiData) => {
// //     if (!apiData || !apiData.data || !Array.isArray(apiData.data)) {
// //       return { series: [], months: [], categories: [], tenureRanges: [] };
// //     }

// //     const colors = ["#2B60AD", "#39B1AC", "#69AB44"];

// //     const getTypeName = (name) => {
// //       const tenureNames = {
// //         "0 to 12": "0 to 12 Months",
// //         "13 to 24": "13 to 24 Months",
// //         "Gtr 24": "Greater than 24 Months",
// //       };

// //       for (var key in tenureNames) {
// //         if (key == name) {
// //           return tenureNames[key];
// //         }
// //       }
// //       return name;
// //     }

// //     // ✅ Define tenureRanges BEFORE using it
// //     const tenureRanges = [
// //       { display: getTypeName("0 to 12"), dataKey: "0 to 12", color: colors[0], originalIndex: 0 },
// //       { display: getTypeName("13 to 24"), dataKey: "13 to 24", color: colors[1], originalIndex: 1 },
// //       { display: getTypeName("Gtr 24"), dataKey: "Gtr 24", color: colors[2], originalIndex: 2 },
// //     ];

// //     const months = apiData.data.map(function (m) {
// //       return m && m.month ? m.month : "";
// //     });

// //     const categories = [];
// //     for (var i = 0; i < months.length; i++) {
// //       categories.push(months[i] + "_Volume");
// //       categories.push(months[i] + "_Value");
// //     }

// //     const series = tenureRanges.map(function (range) {
// //       const dataPoints = [];

// //       for (var i = 0; i < apiData.data.length; i++) {
// //         var monthObj = apiData.data[i] || {};
// //         var vol = monthObj.volume || {};
// //         var val = monthObj.value || {};

// //         var volRaw = vol[range.dataKey];
// //         var valRaw = val[range.dataKey];

// //         // convert safely
// //         var volNum = 0;
// //         if (typeof volRaw === "string") {
// //           if (volRaw.indexOf("%") !== -1) volNum = parseFloat(volRaw.replace("%", "")) || 0;
// //           else volNum = Number(volRaw) || 0;
// //         } else {
// //           volNum = Number(volRaw) || 0;
// //         }

// //         var valNum = 0;
// //         if (typeof valRaw === "string") {
// //           if (valRaw.indexOf("%") !== -1) valNum = parseFloat(valRaw.replace("%", "")) || 0;
// //           else valNum = Number(valRaw) || 0;
// //         } else {
// //           valNum = Number(valRaw) || 0;
// //         }

// //         dataPoints.push(volNum);
// //         dataPoints.push(valNum);
// //       }

// //       return {
// //         name: range.display,
// //         data: dataPoints,
// //         color: range.color,
// //         originalIndex: range.originalIndex,
// //       };
// //     });

// //     return { series: series, months: months, categories: categories, tenureRanges: tenureRanges };
// //   };

// //   // 🔹 Memo + NO OPTIONAL CHAINING
// //   const transformed = transformTenureAPIData(data);

// //   const finalSeries = transformed.series
// //     .filter(function (s) {
// //       return hiddenSeries.indexOf(s.originalIndex) === -1;
// //     })
// //     .reverse();

// //   const series = finalSeries;
// //   const categories = transformed.categories;
// //   const months = transformed.months;
// //   const tenureRanges = transformed.tenureRanges;

// //   const toggleSeries = (originalIndex) => {
// //     setHiddenSeries(function (prev) {
// //       if (prev.indexOf(originalIndex) !== -1) {
// //         return prev.filter(function (i) {
// //           return i !== originalIndex;
// //         });
// //       } else {
// //         return prev.concat(originalIndex);
// //       }
// //     });
// //   };

// //   // 🔥 BLUR / OPACITY LOGIC (NO OPTIONAL CHAINING)
// //   useEffect(() => {
// //     if (!chartRef.current) return;

// //     const chartEl = chartRef.current.querySelector(".apexcharts-inner");
// //     if (!chartEl) return;

// //     const bars = chartEl.querySelectorAll(".apexcharts-series");

// //     if (hoveredLegend === null) {
// //       for (let i = 0; i < bars.length; i++) {
// //         bars[i].style.opacity = "1";
// //         bars[i].style.filter = "none";
// //       }
// //       return;
// //     }

// //     for (let i = 0; i < bars.length; i++) {
// //       const visibleSeries = series[i];
// //       if (!visibleSeries) continue;

// //       if (visibleSeries.originalIndex === hoveredLegend) {
// //         bars[i].style.opacity = "1";
// //         bars[i].style.filter = "none";
// //       } else {
// //         bars[i].style.opacity = "0.2";
// //         bars[i].style.filter = "blur(1px)";
// //       }
// //     }
// //   }, [hoveredLegend, series]);

// //   const options = {
// //     chart: {
// //       type: "bar",
// //       stacked: true,
// //       toolbar: {
// //         show: true,
// //         tools: {
// //           download: true,
// //           selection: true,
// //           zoom: true,
// //           zoomin: true,
// //           zoomout: true,
// //           pan: true,
// //           reset: true,
// //         },
// //       },
// //     },
// //     plotOptions: {
// //       bar: {
// //         horizontal: false,
// //         borderRadius: 3,
// //         columnWidth: "65%",
// //         dataLabels: { position: "center" },
// //       },
// //     },
// //     dataLabels: {
// //       enabled: true,
// //       formatter: function (val) {
// //         return val >= 3 ? Math.round(val) + "%" : "";
// //       },
// //       style: { 
// //         fontSize: "10px", 
// //         colors: ["#fff"], 
// //         fontWeight: 600 
// //       },
// //     },
// //     xaxis: {
// //       categories: categories,
// //       labels: { show: false },
// //       axisBorder: { show: false },
// //       axisTicks: { show: false },
// //     },
// //     yaxis: { show: false, max: 100 },
// //     grid: { show: false },
// //     legend: { show: false },
// //     colors: ["#2B60AD", "#39B1AC", "#69AB44"],
// //     tooltip: {
// //       y: { 
// //         formatter: function (val) { 
// //           return Math.round(val) + "%"; 
// //         } 
// //       },
// //     },
// //     title: {
// //       text: title,
// //       align: "left",
// //     },
// //   };

// //   return (
// //     <div ref={chartRef}>
// //       <ReactApexChart
// //         key={hiddenSeries.join("-")}
// //         options={options}
// //         series={series}
// //         type="bar"
// //         height={380}
// //       />

// //       {/* Custom X axis – Volume/Value + Month + Dividers */}
// //       <div
// //         style={{
// //           marginTop: "-15px",
// //           paddingLeft: "30px",
// //           paddingRight: "30px",
// //           position: "relative",
// //         }}
// //       >
// //         <div
// //           style={{
// //             width: "100%",
// //             height: "2px",
// //             backgroundColor: "#555",
// //             position: "absolute",
// //             top: "0",
// //             left: "0",
// //           }}
// //         />

// //         <div
// //           style={{
// //             display: "flex",
// //             justifyContent: "space-around",
// //             alignItems: "center",
// //             position: "relative",
// //             paddingTop: "2px",
// //           }}
// //         >
// //           <div
// //             style={{
// //               width: "2px",
// //               height: "18px",
// //               backgroundColor: "#555",
// //               position: "absolute",
// //               left: "0",
// //               top: "0",
// //             }}
// //           />

// //           {months.map(function (month, idx) {
// //             return (
// //               <div
// //                 key={idx}
// //                 style={{
// //                   display: "flex",
// //                   justifyContent: "space-around",
// //                   flex: 1,
// //                   position: "relative",
// //                 }}
// //               >
// //                 <span style={{ 
// //                   fontSize: "11px", 
// //                   color: "#666", 
// //                   fontWeight: 600, 
// //                   flex: 1, 
// //                   textAlign: "center" 
// //                 }}>
// //                   Volume
// //                 </span>
// //                 <span style={{ 
// //                   fontSize: "11px", 
// //                   color: "#666", 
// //                   fontWeight: 600, 
// //                   flex: 1, 
// //                   textAlign: "center" 
// //                 }}>
// //                   Value
// //                 </span>

// //                 <div
// //                   style={{
// //                     width: "2px",
// //                     height: "18px",
// //                     backgroundColor: "#555",
// //                     position: "absolute",
// //                     right: "-6px",
// //                     top: "0",
// //                   }}
// //                 />
// //               </div>
// //             );
// //           })}
// //         </div>

// //         <div
// //           style={{
// //             display: "flex",
// //             justifyContent: "space-around",
// //             marginTop: "8px",
// //             alignItems: "center",
// //           }}
// //         >
// //           {months.map(function (month, idx) {
// //             return (
// //               <div
// //                 key={idx}
// //                 style={{
// //                   fontSize: "11px",
// //                   color: "#444",
// //                   fontWeight: 600,
// //                   flex: 1,
// //                   textAlign: "center",
// //                 }}
// //               >
// //                 {month}
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       {/* Custom Interactive Legend */}
// //       <div
// //         style={{
// //           display: "flex",
// //           justifyContent: "center",
// //           flexWrap: "wrap",
// //           marginTop: "25px",
// //           gap: "12px 20px",
// //         }}
// //       >
// //         {tenureRanges.map(function (item) {
// //           const isHidden = hiddenSeries.indexOf(item.originalIndex) !== -1;
// //           const isHovered = hoveredLegend === item.originalIndex;

// //           return (
// //             <div
// //               key={item.originalIndex}
// //               style={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 cursor: "pointer",
// //                 opacity: isHidden ? 0.4 : isHovered ? 1 : hoveredLegend !== null ? 0.3 : 1,
// //                 transition: "opacity 0.25s ease",
// //               }}
// //               onMouseEnter={() => setHoveredLegend(item.originalIndex)}
// //               onMouseLeave={() => setHoveredLegend(null)}
// //               onClick={() => toggleSeries(item.originalIndex)}
// //             >
// //               <div
// //                 style={{
// //                   width: "12px",
// //                   height: "12px",
// //                   backgroundColor: isHidden ? "#ccc" : item.color,
// //                   marginRight: "6px",
// //                   border: isHidden ? "2px solid #999" : "none",
// //                 }}
// //               />
// //               <span
// //                 style={{
// //                   fontSize: "11px",
// //                   color: isHidden ? "#999" : "#444",
// //                   fontWeight: 500,
// //                   textDecoration: isHidden ? "line-through" : "none",
// //                 }}
// //               >
// //                 {item.display}
// //               </span>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default TenureSizeChart;


// import React, { useMemo, useState, useEffect, useRef } from "react";
// import ReactApexChart from "react-apexcharts";

// const TenureSizeChart = ({ data, title = "Tenure Size (%) - All India" }) => {
//   const [hiddenSeries, setHiddenSeries] = useState([]);
//   const [hoveredLegend, setHoveredLegend] = useState(null);
//   const chartRef = useRef(null);

//   // 🔹 Transform API data (NO OPTIONAL CHAINING)
//   const transformTenureAPIData = (apiData) => {
//     if (!apiData || !apiData.data || !Array.isArray(apiData.data)) {
//       return { series: [], months: [], categories: [], tenureRanges: [] };
//     }

//     const colors = ["#2B60AD", "#39B1AC", "#69AB44"];

//     const getTypeName = (name) => {
//       const tenureNames = {
//         "0 to 12": "0 to 12 Months",
//         "13 to 24": "13 to 24 Months",
//         "Gtr 24": "Greater than 24 Months",
//       };

//       for (var key in tenureNames) {
//         if (key == name) {
//           return tenureNames[key];
//         }
//       }
//       return name;
//     }

//     // ✅ Define tenureRanges BEFORE using it
//     const tenureRanges = [
//       { display: getTypeName("0 to 12"), dataKey: "0 to 12", color: colors[0], originalIndex: 0 },
//       { display: getTypeName("13 to 24"), dataKey: "13 to 24", color: colors[1], originalIndex: 1 },
//       { display: getTypeName("Gtr 24"), dataKey: "Gtr 24", color: colors[2], originalIndex: 2 },
//     ];

//     const months = apiData.data.map(function (m) {
//       return m && m.month ? m.month : "";
//     });

//     const categories = [];
//     for (var i = 0; i < months.length; i++) {
//       categories.push(months[i] + "_Volume");
//       categories.push(months[i] + "_Value");
//     }

//     const series = tenureRanges.map(function (range) {
//       const dataPoints = [];

//       for (var i = 0; i < apiData.data.length; i++) {
//         var monthObj = apiData.data[i] || {};
//         var vol = monthObj.volume || {};
//         var val = monthObj.value || {};

//         var volRaw = vol[range.dataKey];
//         var valRaw = val[range.dataKey];

//         // convert safely
//         var volNum = 0;
//         if (typeof volRaw === "string") {
//           if (volRaw.indexOf("%") !== -1) volNum = parseFloat(volRaw.replace("%", "")) || 0;
//           else volNum = Number(volRaw) || 0;
//         } else {
//           volNum = Number(volRaw) || 0;
//         }

//         var valNum = 0;
//         if (typeof valRaw === "string") {
//           if (valRaw.indexOf("%") !== -1) valNum = parseFloat(valRaw.replace("%", "")) || 0;
//           else valNum = Number(valRaw) || 0;
//         } else {
//           valNum = Number(valRaw) || 0;
//         }

//         dataPoints.push(volNum);
//         dataPoints.push(valNum);
//       }

//       return {
//         name: range.display,
//         data: dataPoints,
//         color: range.color,
//         originalIndex: range.originalIndex,
//       };
//     });

//     return { series: series, months: months, categories: categories, tenureRanges: tenureRanges };
//   };

//   // 🔹 Memo + NO OPTIONAL CHAINING
//   const transformed = transformTenureAPIData(data);

//   const finalSeries = transformed.series
//     .filter(function (s) {
//       return hiddenSeries.indexOf(s.originalIndex) === -1;
//     })
//     .reverse();

//   const series = finalSeries;
//   const categories = transformed.categories;
//   const months = transformed.months;
//   const tenureRanges = transformed.tenureRanges;

//   const toggleSeries = (originalIndex) => {
//     setHiddenSeries(function (prev) {
//       if (prev.indexOf(originalIndex) !== -1) {
//         return prev.filter(function (i) {
//           return i !== originalIndex;
//         });
//       } else {
//         return prev.concat(originalIndex);
//       }
//     });
//   };

//   // 🔥 BLUR / OPACITY LOGIC (NO OPTIONAL CHAINING)
//   useEffect(() => {
//     if (!chartRef.current) return;

//     const chartEl = chartRef.current.querySelector(".apexcharts-inner");
//     if (!chartEl) return;

//     const bars = chartEl.querySelectorAll(".apexcharts-series");

//     if (hoveredLegend === null) {
//       for (let i = 0; i < bars.length; i++) {
//         bars[i].style.opacity = "1";
//         bars[i].style.filter = "none";
//       }
//       return;
//     }

//     for (let i = 0; i < bars.length; i++) {
//       const visibleSeries = series[i];
//       if (!visibleSeries) continue;

//       if (visibleSeries.originalIndex === hoveredLegend) {
//         bars[i].style.opacity = "1";
//         bars[i].style.filter = "none";
//       } else {
//         bars[i].style.opacity = "0.2";
//         bars[i].style.filter = "blur(1px)";
//       }
//     }
//   }, [hoveredLegend, series]);

//   const options = {
//     chart: {
//       type: "bar",
//       stacked: true,
//       toolbar: {
//         show: true,
//         tools: {
//           download: true,
//           selection: true,
//           zoom: true,
//           zoomin: true,
//           zoomout: true,
//           pan: true,
//           reset: true,
//         },
//       },
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         borderRadius: 3,
//         columnWidth: "65%",
//         dataLabels: { position: "center" },
//       },
//     },
//     dataLabels: {
//       enabled: true,
//       formatter: function (val) {
//         return val >= 0.01 ? val.toFixed(2) + "%" : "";
//       },
//       style: { 
//         fontSize: "10px", 
//         colors: ["#fff"], 
//         fontWeight: 600 
//       },
//     },
//     xaxis: {
//       categories: categories,
//       labels: { show: false },
//       axisBorder: { show: false },
//       axisTicks: { show: false },
//     },
//     yaxis: { show: false, max: 100 },
//     grid: { show: false },
//     legend: { show: false },
//     colors: ["#2B60AD", "#39B1AC", "#69AB44"],
//     tooltip: {
//       y: { 
//         formatter: function (val) { 
//           return val.toFixed(2) + "%"; 
//         } 
//       },
//     },
//     title: {
//       text: title,
//       align: "left",
//     },
//   };

//   return (
//     <div ref={chartRef}>
//       <ReactApexChart
//         key={hiddenSeries.join("-")}
//         options={options}
//         series={series}
//         type="bar"
//         height={380}
//       />

//       {/* Custom X axis – Volume/Value + Month + Dividers */}
//       <div
//         style={{
//           marginTop: "-15px",
//           paddingLeft: "30px",
//           paddingRight: "30px",
//           position: "relative",
//         }}
//       >
//         <div
//           style={{
//             width: "100%",
//             height: "2px",
//             backgroundColor: "#555",
//             position: "absolute",
//             top: "0",
//             left: "0",
//           }}
//         />

//         {/* VOLUME/VALUE LABELS - YAHI CHANGE KIYA HAI */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-around",
//             alignItems: "center",
//             position: "relative",
//             paddingTop: "2px",
//           }}
//         >
//           <div
//             style={{
//               width: "2px",
//               height: "18px",
//               backgroundColor: "#555",
//               position: "absolute",
//               left: "0",
//               top: "0",
//             }}
//           />

//           {months.map(function (month, idx) {
//             return (
//               <div
//                 key={idx}
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-around",
//                   flex: 1,
//                   position: "relative",
//                 }}
//               >
//                 <span style={{ 
//                   fontSize: "15px", 
//                   color: "#666", 
//                   fontWeight: 500, 
//                   flex: 1, 
//                   textAlign: "center",
//                   fontFamily: 'sans-serif',
//                 }}>
//                   Volume
//                 </span>
//                 <span style={{ 
//                   fontSize: "15px", 
//                   color: "#666", 
//                   fontWeight: 500, 
//                   flex: 1, 
//                   textAlign: "center",
//                   fontFamily: 'sans-serif',
//                 }}>
//                   Value
//                 </span>

//                 <div
//                   style={{
//                     width: "2px",
//                     height: "18px",
//                     backgroundColor: "#555",
//                     position: "absolute",
//                     right: "-6px",
//                     top: "0",
//                   }}
//                 />
//               </div>
//             );
//           })}
//         </div>

//         {/* MONTH LABELS - YAHI CHANGE KIYA HAI */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-around",
//             marginTop: "8px",
//             alignItems: "center",
//           }}
//         >
//           {months.map(function (month, idx) {
//             return (
//               <div
//                 key={idx}
//                 style={{
//                   fontSize: "15px",
//                   color: "#444",
//                   fontWeight: 500,
//                   flex: 1,
//                   textAlign: "center",
//                   fontFamily: 'sans-serif',
//                 }}
//               >
//                 {month}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Custom Interactive Legend */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           flexWrap: "wrap",
//           marginTop: "25px",
//           gap: "12px 20px",
//         }}
//       >
//         {tenureRanges.map(function (item) {
//           const isHidden = hiddenSeries.indexOf(item.originalIndex) !== -1;
//           const isHovered = hoveredLegend === item.originalIndex;

//           return (
//             <div
//               key={item.originalIndex}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 opacity: isHidden ? 0.4 : isHovered ? 1 : hoveredLegend !== null ? 0.3 : 1,
//                 transition: "opacity 0.25s ease",
//               }}
//               onMouseEnter={() => setHoveredLegend(item.originalIndex)}
//               onMouseLeave={() => setHoveredLegend(null)}
//               onClick={() => toggleSeries(item.originalIndex)}
//             >
//               <div
//                 style={{
//                   width: "12px",
//                   height: "12px",
//                   backgroundColor: isHidden ? "#ccc" : item.color,
//                   marginRight: "6px",
//                   border: isHidden ? "2px solid #999" : "none",
//                 }}
//               />
//               <span
//                 style={{
//                   fontSize: "11px",
//                   color: isHidden ? "#999" : "#444",
//                   fontWeight: 500,
//                   textDecoration: isHidden ? "line-through" : "none",
//                 }}
//               >
//                 {item.display}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default TenureSizeChart;

import React, { useMemo, useState, useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";

const TenureSizeChart = ({ data, title = "Tenure Size (%) - All India" }) => {
  const [hiddenSeries, setHiddenSeries] = useState([]);
  const [hoveredLegend, setHoveredLegend] = useState(null);
  const chartRef = useRef(null);

  // 🔹 Transform API data (NO OPTIONAL CHAINING)
  const transformTenureAPIData = (apiData) => {
    if (!apiData || !apiData.data || !Array.isArray(apiData.data)) {
      return { series: [], months: [], categories: [], tenureRanges: [] };
    }

    const colors = ["#2B60AD", "#39B1AC", "#69AB44"];

    const getTypeName = (name) => {
      const tenureNames = {
        "0 to 12": "0 to 12 Months",
        "13 to 24": "13 to 24 Months",
        "Gtr 24": "Greater than 24 Months",
      };

      for (var key in tenureNames) {
        if (key == name) {
          return tenureNames[key];
        }
      }
      return name;
    }

    // ✅ Define tenureRanges BEFORE using it
    const tenureRanges = [
      { display: getTypeName("0 to 12"), dataKey: "0 to 12", color: colors[0], originalIndex: 0 },
      { display: getTypeName("13 to 24"), dataKey: "13 to 24", color: colors[1], originalIndex: 1 },
      { display: getTypeName("Gtr 24"), dataKey: "Gtr 24", color: colors[2], originalIndex: 2 },
    ];

    const months = apiData.data.map(function (m) {
      return m && m.month ? m.month : "";
    });

    const categories = [];
    for (var i = 0; i < months.length; i++) {
      categories.push(months[i] + "_Volume");
      categories.push(months[i] + "_Value");
    }

    const series = tenureRanges.map(function (range) {
      const dataPoints = [];

      for (var i = 0; i < apiData.data.length; i++) {
        var monthObj = apiData.data[i] || {};
        var vol = monthObj.volume || {};
        var val = monthObj.value || {};

        var volRaw = vol[range.dataKey];
        var valRaw = val[range.dataKey];

        // convert safely
        var volNum = 0;
        if (typeof volRaw === "string") {
          if (volRaw.indexOf("%") !== -1) volNum = parseFloat(volRaw.replace("%", "")) || 0;
          else volNum = Number(volRaw) || 0;
        } else {
          volNum = Number(volRaw) || 0;
        }

        var valNum = 0;
        if (typeof valRaw === "string") {
          if (valRaw.indexOf("%") !== -1) valNum = parseFloat(valRaw.replace("%", "")) || 0;
          else valNum = Number(valRaw) || 0;
        } else {
          valNum = Number(valRaw) || 0;
        }

        dataPoints.push(volNum);
        dataPoints.push(valNum);
      }

      return {
        name: range.display,
        data: dataPoints,
        color: range.color,
        originalIndex: range.originalIndex,
      };
    });

    return { series: series, months: months, categories: categories, tenureRanges: tenureRanges };
  };

  // 🔹 Memo + NO OPTIONAL CHAINING
  const transformed = transformTenureAPIData(data);

  const finalSeries = transformed.series
    .filter(function (s) {
      return hiddenSeries.indexOf(s.originalIndex) === -1;
    })
    .reverse();

  const series = finalSeries;
  const categories = transformed.categories;
  const months = transformed.months;
  const tenureRanges = transformed.tenureRanges;

  const toggleSeries = (originalIndex) => {
    setHiddenSeries(function (prev) {
      if (prev.indexOf(originalIndex) !== -1) {
        return prev.filter(function (i) {
          return i !== originalIndex;
        });
      } else {
        return prev.concat(originalIndex);
      }
    });
  };

  // 🔥 BLUR / OPACITY LOGIC (NO OPTIONAL CHAINING)
  useEffect(() => {
    if (!chartRef.current) return;

    const chartEl = chartRef.current.querySelector(".apexcharts-inner");
    if (!chartEl) return;

    const bars = chartEl.querySelectorAll(".apexcharts-series");

    if (hoveredLegend === null) {
      for (let i = 0; i < bars.length; i++) {
        bars[i].style.opacity = "1";
        bars[i].style.filter = "none";
      }
      return;
    }

    for (let i = 0; i < bars.length; i++) {
      const visibleSeries = series[i];
      if (!visibleSeries) continue;

      if (visibleSeries.originalIndex === hoveredLegend) {
        bars[i].style.opacity = "1";
        bars[i].style.filter = "none";
      } else {
        bars[i].style.opacity = "0.2";
        bars[i].style.filter = "blur(1px)";
      }
    }
  }, [hoveredLegend, series]);

  const options = {
    chart: {
      type: "bar",
      stacked: true,
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
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 3,
        columnWidth: "65%",
        dataLabels: { position: "center" },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val >= 0.01 ? val.toFixed(2) + "%" : "";
      },
      style: { 
        fontSize: "10px", 
        colors: ["#fff"], 
        fontWeight: 600 
      },
    },
    xaxis: {
      categories: categories,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false, max: 100 },
    grid: { show: false },
    legend: { show: false },
    colors: ["#2B60AD", "#39B1AC", "#69AB44"],
    tooltip: {
      y: { 
        formatter: function (val) { 
          return val.toFixed(2) + "%"; 
        } 
      },
    },
    title: {
      text: title,
      align: "left",
    },
  };

  return (
    <div ref={chartRef}>
      <ReactApexChart
        key={hiddenSeries.join("-")}
        options={options}
        series={series}
        type="bar"
        height={380}
      />

      {/* Custom X axis – Volume/Value + Month + Dividers */}
      <div
        style={{
          marginTop: "-15px",
          paddingLeft: "30px",
          paddingRight: "30px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "#555",
            position: "absolute",
            top: "0",
            left: "0",
          }}
        />

        {/* VOLUME/VALUE LABELS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            position: "relative",
            paddingTop: "2px",
          }}
        >
          <div
            style={{
              width: "2px",
              height: "18px",
              backgroundColor: "#555",
              position: "absolute",
              left: "0",
              top: "0",
            }}
          />

          {months.map(function (month, idx) {
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flex: 1,
                  position: "relative",
                }}
              >
                <span style={{ 
                  fontSize: "15px", 
                  color: "#666", 
                  fontWeight: 500, 
                  flex: 1, 
                  textAlign: "center",
                  fontFamily: 'sans-serif',
                }}>
                  Volume
                </span>
                <span style={{ 
                  fontSize: "15px", 
                  color: "#666", 
                  fontWeight: 500, 
                  flex: 1, 
                  textAlign: "center",
                  fontFamily: 'sans-serif',
                }}>
                  Value
                </span>

                <div
                  style={{
                    width: "2px",
                    height: "18px",
                    backgroundColor: "#555",
                    position: "absolute",
                    right: "-6px",
                    top: "0",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* MONTH LABELS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "8px",
            alignItems: "center",
          }}
        >
          {months.map(function (month, idx) {
            return (
              <div
                key={idx}
                style={{
                  fontSize: "15px",
                  color: "#444",
                  fontWeight: 500,
                  flex: 1,
                  textAlign: "center",
                  fontFamily: 'sans-serif',
                }}
              >
                {month}
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Interactive Legend - YAHI CHANGE KIYA HAI */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "25px",
          gap: "12px 20px",
        }}
      >
        {tenureRanges.map(function (item) {
          const isHidden = hiddenSeries.indexOf(item.originalIndex) !== -1;
          const isHovered = hoveredLegend === item.originalIndex;

          return (
            <div
              key={item.originalIndex}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                opacity: isHidden ? 0.4 : isHovered ? 1 : hoveredLegend !== null ? 0.3 : 1,
                transition: "opacity 0.25s ease",
              }}
              onMouseEnter={() => setHoveredLegend(item.originalIndex)}
              onMouseLeave={() => setHoveredLegend(null)}
              onClick={() => toggleSeries(item.originalIndex)}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: isHidden ? "#ccc" : item.color,
                  marginRight: "6px",
                  border: isHidden ? "2px solid #999" : "none",
                }}
              />
              <span
                style={{
                  fontSize: "15px",
                  color: isHidden ? "#999" : "#444",
                  fontWeight: 500,
                  fontFamily: 'sans-serif',
                  textDecoration: isHidden ? "line-through" : "none",
                }}
              >
                {item.display}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TenureSizeChart;