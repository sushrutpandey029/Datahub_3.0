// import React from "react";
// import { Card, CardContent, CardActionArea } from "@mui/material";
// import ReactApexChart from "react-apexcharts";

// const CBVIDKYCSeedingMemberGraph = () => {
//   const [data, setData] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState(null);

//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           "https://api.mfinindia.org/api/auth/table1graph1KycVidFillRate?month=2025-08&short_name=Annapurna"
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const apiData = await response.json();
//         console.log("API Response:", apiData);

//         if (!apiData.graph1_data || !Array.isArray(apiData.graph1_data)) {
//           throw new Error("Invalid data format from API");
//         }

//         const transformedData = apiData.graph1_data
//           .map((item) => {
//             if (
//               !item.Month ||
//               item.KYC_Fill_Rate === undefined ||
//               item.VID_Fill_Rate === undefined
//             ) {
//               console.warn("Invalid item structure:", item);
//               return null;
//             }

//             const kycRate = parseFloat(item.KYC_Fill_Rate.replace("%", ""));
//             const vidRate = parseFloat(item.VID_Fill_Rate.replace("%", ""));

//             return {
//               month: item.Month,
//               kycFillRate: kycRate,
//               vidFillRate: vidRate
//             };
//           })
//           .filter((item) => item !== null);

//         console.log("Transformed Data:", transformedData);
//         setData(transformedData);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Fallback data
//   const fallbackHeadings = ["Mar-25", "Apr-25", "May-25", "Jun-25", "Jul-25", "Aug-25"];
//   const fallbackSeries = [
//     {
//       name: "KYC Fill Rate",
//       data: [100.0, 100.0, 100.0, 100.0, 100.0, 100.0],
//     },
//     {
//       name: "VID Fill Rate",
//       data: [94.9, 94.9, 94.9, 94.8, 94.9, 99.8],
//     },
//   ];

//   // Process data or use fallback
//   const seriesData = data.length > 0 
//     ? [
//         {
//           name: "KYC Fill Rate",
//           data: data.map((item) => item.kycFillRate),
//         },
//         {
//           name: "VID Fill Rate",
//           data: data.map((item) => item.vidFillRate),
//         },
//       ]
//     : fallbackSeries;

//   const categories = data.length > 0 
//     ? data.map((item) => item.month)
//     : fallbackHeadings;

//   const options = {
//     chart: {
//       type: "line",
//       height: 450,
//       zoom: {
//         enabled: false,
//       },
//       toolbar: {
//         show: true,
//         tools: {
//           download: true,
//           selection: false,
//           zoom: false,
//           zoomin: false,
//           zoomout: false,
//           pan: false,
//           reset: false,
//         },
//         export: {
//           csv: {
//             filename: `KYC_VID_Fill_Rate_Annapurna`,
//             columnDelimiter: ",",
//             headerCategory: "Month",
//             headerValue: "Value (%)",
//           },
//           svg: {
//             filename: `KYC_VID_Fill_Rate_Annapurna`,
//           },
//           png: {
//             filename: `KYC_VID_Fill_Rate_Annapurna`,
//           },
//         },
//       },
//     },
//     colors: ["#2B60AD", "#F78F6D"], // Using colors from reference chart
//     dataLabels: {
//       enabled: true,
//       formatter: function (val) {
//         return val.toFixed(1) + "%";
//       },
//       style: {
//         fontSize: "13px",
//         fontFamily: "sans-serif",
//         fontWeight: "bold",
//       },
//       background: {
//         enabled: true,
//         borderRadius: 2,
//         padding: 4,
//         opacity: 0.9,
//         borderWidth: 1,
//         borderColor: "#fff",
//       },
//     },
//     stroke: {
//       width: [3, 3],
//       curve: "smooth",
//     },
//     markers: {
//       size: 6,
//       hover: {
//         size: 8,
//       },
//     },
//     title: {
//       text: "KYC and VID Fill Rate - Annapurna",
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
//         color: "#e7e7e7",
//       },
//       axisTicks: {
//         color: "#e7e7e7",
//       },
//     },
//     yaxis: {
//      show:false
//     },
//     legend: {
//       position: "bottom",
//       horizontalAlign: "center",
//       fontSize: "14px",
//       fontWeight: 500,
//       markers: {
//         width: 12,
//         height: 12,
//         radius: 6,
//       },
//     },
//     tooltip: {
//       y: {
//         formatter: (value) => value + "%",
//       },
//     },
//     grid: {
//       borderColor: "#e7e7e7",
//       row: {
//         colors: ["#f3f3f3", "transparent"],
//         opacity: 0.5,
//       },
//       padding: {
//         top: 20,
//         right: 20,
//         bottom: 20,
//         left: 20,
//       },
//     },
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           legend: {
//             position: "bottom",
//             horizontalAlign: "center",
//           },
//         },
//       },
//     ],
//   };

//   if (loading) {
//     return (
//       <Card
//         style={{
//           padding: "20px",
//           marginTop: "20px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           textAlign: "center",
//         }}
//       >
//         <CardContent>
//           <h3
//             style={{
//               fontSize: "16px",
//               fontWeight: "bold",
//               marginBottom: "20px",
//               color: "#333",
//               textAlign: "left",
//             }}
//           >
//             KYC and VID Fill Rate - Annapurna
//           </h3>
//           <p>Loading data...</p>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card
//         style={{
//           padding: "20px",
//           marginTop: "20px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           textAlign: "center",
//         }}
//       >
//         <CardContent>
//           <h3
//             style={{
//               fontSize: "16px",
//               fontWeight: "bold",
//               marginBottom: "20px",
//               color: "#333",
//               textAlign: "left",
//             }}
//           >
//             KYC and VID Fill Rate - Annapurna
//           </h3>
//           <p style={{ color: "red" }}>Error: {error}</p>
//         </CardContent>
//       </Card>
//     );
//   }

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
//             series={seriesData}
//             type="line"
//             height={450}
//           />
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// };

// export default CBVIDKYCSeedingMemberGraph;

// import React from "react";
// import { Card, CardContent, CardActionArea } from "@mui/material";
// import ReactApexChart from "react-apexcharts";

// const CBVIDKYCSeedingMemberGraph = ({ graphData }) => {
//   const [data, setData] = React.useState([]);

//   React.useEffect(() => {
//     if (
//       graphData &&
//       graphData.data &&
//       Array.isArray(graphData.data) &&
//       graphData.data.length > 0
//     ) {
//       const transformed = graphData.data
//         .map((item) => {
//           if (
//             !item ||
//             !item.Month ||
//             item.KYC_Fill_Rate == null ||
//             item.VID_Fill_Rate == null
//           ) {
//             return null;
//           }

//           const kycRate = parseFloat(String(item.KYC_Fill_Rate).replace("%", ""));
//           const vidRate = parseFloat(String(item.VID_Fill_Rate).replace("%", ""));

//           return {
//             month: item.Month,
//             kycFillRate: isNaN(kycRate) ? 0 : kycRate,
//             vidFillRate: isNaN(vidRate) ? 0 : vidRate
//           };
//         })
//         .filter((x) => x !== null);

//       setData(transformed);
//     } else {
//       setData([]);
//     }
//   }, [graphData]);

//   // Fallback data
//   const fallbackHeadings = ["Mar-25", "Apr-25", "May-25", "Jun-25", "Jul-25", "Aug-25"];
//   const fallbackSeries = [
//     { name: "KYC Fill Rate", data: [0, 0, 0, 0, 0, 0] },
//     { name: "VID Fill Rate", data: [0, 0, 0, 0, 0, 0] }
//   ];

//   const seriesData =
//     data.length > 0
//       ? [
//           { name: "KYC Fill Rate", data: data.map((x) => x.kycFillRate) },
//           { name: "VID Fill Rate", data: data.map((x) => x.vidFillRate) }
//         ]
//       : fallbackSeries;

//   const categories = data.length > 0 ? data.map((x) => x.month) : fallbackHeadings;

//   const options = {
//     chart: {
//       type: "line",
//       height: 450,
//       zoom: { enabled: false },
//       toolbar: {
//         show: true,
//         tools: {
//           download: true,
//           selection: false,
//           zoom: false,
//           zoomin: false,
//           zoomout: false,
//           pan: false,
//           reset: false
//         }
//       }
//     },

//     // SAME AS OLD CHART
//     grid: {
//       borderColor: "#e7e7e7",
//       padding: {
//         left: 20,
//         right: 20,
//         bottom: 20,
//         top: 20
//       }
//     },

//     colors: ["#2B60AD", "#F78F6D"],

//     dataLabels: {
//       enabled: true,
//       formatter: (val) => val.toFixed(1) + "%",
//       style: {
//         fontSize: "13px",
//         fontWeight: "bold"
//       },
//       background: {
//         enabled: true,
//         borderRadius: 2,
//         padding: 4
//       }
//     },

//     stroke: { width: [3, 3], curve: "smooth" },
//     markers: { size: 6 },

//     title: {
//       text: "KYC and VID Fill Rate - Member",
//       align: "left",
//       style: {
//         fontSize: "16px",
//         fontWeight: "bold"
//       }
//     },

//     xaxis: {
//       categories,
//       labels: {
//         show: true,
//         style: {
//           fontSize: "13px",
//           fontWeight: 500
//         },
//         offsetX: 0   // keep clean like old version
//       },
//       axisBorder: { color: "#e7e7e7" },
//       axisTicks: { color: "#e7e7e7" }
//     },

//     yaxis: { show: false },

//     legend: {
//       position: "bottom",
//       horizontalAlign: "center",
//       fontSize: "14px"
//     }
//   };

//   return (
//     <Card style={{ paddingBottom: "20px", marginTop: "20px" }}>
//       <CardActionArea>
//         <CardContent>
//           <ReactApexChart
//             options={options}
//             series={seriesData}
//             type="line"
//             height={450}
//           />
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// };

// export default CBVIDKYCSeedingMemberGraph;
// import React from "react";
// import { Card, CardContent, CardActionArea } from "@mui/material";
// import ReactApexChart from "react-apexcharts";

// const CBVIDKYCSeedingMemberGraph = ({ graphData }) => {
//   const [data, setData] = React.useState([]);

//   React.useEffect(() => {
//     if (
//       graphData &&
//       graphData.data &&
//       Array.isArray(graphData.data) &&
//       graphData.data.length > 0
//     ) {
//       const transformed = graphData.data
//         .map((item) => {
//           if (
//             !item ||
//             !item.Month ||
//             item.KYC_Fill_Rate == null ||
//             item.VID_Fill_Rate == null
//           ) {
//             return null;
//           }

//           const kycRate = parseFloat(String(item.KYC_Fill_Rate).replace("%", ""));
//           const vidRate = parseFloat(String(item.VID_Fill_Rate).replace("%", ""));

//           return {
//             month: item.Month,
//             kycFillRate: isNaN(kycRate) ? 0 : kycRate,
//             vidFillRate: isNaN(vidRate) ? 0 : vidRate
//           };
//         })
//         .filter((x) => x !== null);

//       setData(transformed);
//     } else {
//       setData([]);
//     }
//   }, [graphData]);

//   // Fallback data
//   const fallbackHeadings = ["Mar-25", "Apr-25", "May-25", "Jun-25", "Jul-25", "Aug-25"];
//   const fallbackSeries = [
//     { name: "KYC Fill Rate", data: [0, 0, 0, 0, 0, 0] },
//     { name: "VID Fill Rate", data: [0, 0, 0, 0, 0, 0] }
//   ];

//   const seriesData =
//     data.length > 0
//       ? [
//           { name: "KYC Fill Rate", data: data.map((x) => x.kycFillRate) },
//           { name: "VID Fill Rate", data: data.map((x) => x.vidFillRate) }
//         ]
//       : fallbackSeries;

//   const categories = data.length > 0 ? data.map((x) => x.month) : fallbackHeadings;

//   const options = {
//     chart: {
//       type: "line",
//       height: 450,
//       zoom: { enabled: false },
//       toolbar: {
//         show: true,
//         tools: {
//           download: true,
//           selection: false,
//           zoom: false,
//           zoomin: false,
//           zoomout: false,
//           pan: false,
//           reset: false
//         }
//       }
//     },

//     // REMOVED ALL GRID LINES BUT KEEP X-AXIS VISIBLE
//     grid: {
//       show: false,
//       padding: {
//         left: 20,
//         right: 20,
//         bottom: 20,
//         top: 20
//       }
//     },

//     colors: ["#2B60AD", "#F78F6D"],

//     dataLabels: {
//       enabled: true,
//       formatter: (val) => val.toFixed(2) + "%", // Double decimal formatting
//       style: {
//         fontSize: "13px",
//         fontWeight: "bold"
//       },
//       background: {
//         enabled: true,
//         borderRadius: 2,
//         padding: 4
//       }
//     },

//     stroke: { width: [3, 3], curve: "smooth" },
//     markers: { size: 6 },

//     title: {
//       text: "KYC and VID Fill Rate - Member",
//       align: "left",
//       style: {
//         fontSize: "16px",
//         fontWeight: "bold"
//       }
//     },

//     xaxis: {
//       categories,
//       labels: {
//         show: true,
//         style: {
//           fontSize: "13px",
//           fontWeight: 500
//         },
//         offsetX: 0
//       },
//       axisBorder: {
//         show: true, // Keep x-axis line visible
//         color: '#e7e7e7'
//       },
//       axisTicks: {
//         show: true // Keep x-axis ticks visible
//       }
//     },

//     yaxis: { 
//       show: false 
//     },

//     legend: {
//       position: "bottom",
//       horizontalAlign: "center",
//       fontSize: "14px"
//     },

//     // Fix tooltip to show double decimal
//     tooltip: {
//       y: {
//         formatter: function(value) {
//           return value.toFixed(2) + "%"; // Ensure tooltip shows double decimal
//         }
//       }
//     }
//   };

//   return (
//     <Card style={{ paddingBottom: "20px", marginTop: "20px" }}>
//       <CardActionArea>
//         <CardContent>
//           <ReactApexChart
//             options={options}
//             series={seriesData}
//             type="line"
//             height={450}
//           />
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// };

// export default CBVIDKYCSeedingMemberGraph;

import React from "react";
import { Card, CardContent, CardActionArea } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const CBVIDKYCSeedingMemberGraph = ({ graphData }) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (
      graphData &&
      graphData.data &&
      Array.isArray(graphData.data) &&
      graphData.data.length > 0
    ) {
      const transformed = graphData.data
        .map((item) => {
          if (
            !item ||
            !item.Month ||
            item.KYC_Fill_Rate == null ||
            item.VID_Fill_Rate == null
          ) {
            return null;
          }

          const kycRate = parseFloat(String(item.KYC_Fill_Rate).replace("%", ""));
          const vidRate = parseFloat(String(item.VID_Fill_Rate).replace("%", ""));

          return {
            month: item.Month,
            kycFillRate: isNaN(kycRate) ? 0 : kycRate,
            vidFillRate: isNaN(vidRate) ? 0 : vidRate
          };
        })
        .filter((x) => x !== null);

      setData(transformed);
    } else {
      setData([]);
    }
  }, [graphData]);

  // Fallback data
  const fallbackHeadings = ["Mar-25", "Apr-25", "May-25", "Jun-25", "Jul-25", "Aug-25"];
  const fallbackSeries = [
    { name: "KYC Fill Rate", data: [0, 0, 0, 0, 0, 0] },
    { name: "VID Fill Rate", data: [0, 0, 0, 0, 0, 0] }
  ];

  const seriesData =
    data.length > 0
      ? [
          { name: "KYC Fill Rate", data: data.map((x) => x.kycFillRate) },
          { name: "VID Fill Rate", data: data.map((x) => x.vidFillRate) }
        ]
      : fallbackSeries;

  const categories = data.length > 0 ? data.map((x) => x.month) : fallbackHeadings;

  const options = {
    chart: {
      type: "line",
      height: 450,
      zoom: { enabled: false },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      }
    },

    // FIXED GRID PADDING - LEFT SIDE CUTTING ISSUE RESOLVED
    grid: {
      show: false,
      padding: {
        left: 30,   // Increased left padding to prevent cutting
        right: 20,
        bottom: 20,
        top: 20
      }
    },

    colors: ["#2B60AD", "#F78F6D"],

    dataLabels: {
      enabled: true,
      formatter: (val) => val.toFixed(2) + "%", // Double decimal formatting
      style: {
        fontSize: "13px",
        fontWeight: "bold"
      },
      background: {
        enabled: true,
        borderRadius: 2,
        padding: 4
      }
    },

    stroke: { width: [3, 3], curve: "smooth" },
    markers: { size: 6 },

    title: {
      text: "KYC and VID Fill Rate - Member",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold"
      }
    },

    xaxis: {
      categories,
      labels: {
        show: true,
        style: {
          fontSize: "13px",
          fontWeight: 500
        },
        offsetX: 0
      },
      axisBorder: {
        show: true, // Keep x-axis line visible
        color: '#e7e7e7'
      },
      axisTicks: {
        show: true // Keep x-axis ticks visible
      }
    },

    yaxis: { 
      show: false 
    },

    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px"
    },

    // Fix tooltip to show double decimal
    tooltip: {
      y: {
        formatter: function(value) {
          return value.toFixed(2) + "%"; // Ensure tooltip shows double decimal
        }
      }
    }
  };

  return (
    <Card style={{ paddingBottom: "20px", marginTop: "20px" }}>
      <CardActionArea>
        <CardContent>
          <ReactApexChart
            options={options}
            series={seriesData}
            type="line"
            height={450}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CBVIDKYCSeedingMemberGraph;