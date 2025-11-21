// import React from "react";
// import { Card, CardContent, CardActionArea } from "@mui/material";
// import ReactApexChart from "react-apexcharts";

// const CBVIDKYCSeedingIndustryGraph = () => {
//   const [data, setData] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState(null);

//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           "https://api.mfinindia.org/api/auth/table1graph2KycVidFillRateIndustry?month=2025-08&entity=NBFC-MFI"
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const apiData = await response.json();
//         console.log("API Response:", apiData);

//         if (!apiData.graph2_data || !Array.isArray(apiData.graph2_data)) {
//           throw new Error("Invalid data format from API");
//         }

//         const transformedData = apiData.graph2_data
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
//       data: [91.3, 91.4, 91.4, 92.0, 91.6, 91.0],
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
//             filename: `KYC_VID_Fill_Rate_Industry`,
//             columnDelimiter: ",",
//             headerCategory: "Month",
//             headerValue: "Value (%)",
//           },
//           svg: {
//             filename: `KYC_VID_Fill_Rate_Industry`,
//           },
//           png: {
//             filename: `KYC_VID_Fill_Rate_Industry`,
//           },
//         },
//       },
//     },
//     colors: ["#2B60AD", "#F78F6D"],
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
//       text: "KYC and VID Fill Rate - Industry",
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
//             KYC and VID Fill Rate - Industry
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
//             KYC and VID Fill Rate - Industry
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

// export default CBVIDKYCSeedingIndustryGraph;


import React from "react";
import { Card, CardContent, CardActionArea } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const CBVIDKYCSeedingIndustryGraph = ({ data }) => {
  const hasData = data && data.length > 0;

  // Fallback
  const fallbackHeadings = ["Mar-25", "Apr-25", "May-25", "Jun-25", "Jul-25", "Aug-25"];
  const fallbackSeries = [
    { name: "KYC Fill Rate", data: [0, 0, 0, 0, 0, 0] },
    { name: "VID Fill Rate", data: [0, 0, 0, 0, 0, 0] }
  ];

  // Real or fallback
  const seriesData = hasData
    ? [
        { name: "KYC Fill Rate", data: data.map((x) => x.kycFillRate) },
        { name: "VID Fill Rate", data: data.map((x) => x.vidFillRate) }
      ]
    : fallbackSeries;

  const categories = hasData ? data.map((x) => x.month) : fallbackHeadings;

  // EXACT TEMPLATE FROM OLD WORKING COMPONENT
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

    colors: ["#2B60AD", "#F78F6D"],

    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(1)}%`,
      style: {
        fontSize: "13px",
        fontFamily: "sans-serif",
        fontWeight: "bold"
      },
      background: {
        enabled: true,
        borderRadius: 2,
        padding: 4,
        opacity: 0.9,
        borderWidth: 1,
        borderColor: "#fff"
      }
    },

    stroke: { width: [3, 3], curve: "smooth" },

    markers: {
      size: 6,
      hover: { size: 8 }
    },

    title: {
      text: "KYC and VID Fill Rate - Industry",
      align: "left",
      style: { fontSize: "16px", fontWeight: "bold", color: "#333" }
    },

    xaxis: {
      categories: categories,
      labels: {
        show: true,
        style: {
          fontSize: "13px",
          fontFamily: "sans-serif",
          fontWeight: 500
        }
      },
      axisBorder: { color: "#e7e7e7" },
      axisTicks: { color: "#e7e7e7" }
    },

    yaxis: { show: false },

    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      fontWeight: 500,
      markers: {
        width: 12,
        height: 12,
        radius: 6
      }
    },

    tooltip: {
      y: { formatter: (value) => value + "%" }
    },

    grid: {
      borderColor: "#e7e7e7",
      row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 },
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20        // 🔥 FIX FOR LEFT SIDE CUTTING
      }
    }
  };

  return (
    <Card style={{ paddingBottom: "20px", marginTop: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
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

export default CBVIDKYCSeedingIndustryGraph;
