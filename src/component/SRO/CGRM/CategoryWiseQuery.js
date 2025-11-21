

// import * as React from "react";
// import number_format from "../../Unqiue/Common_func";
// import ReactApexChart from "react-apexcharts";
// class CategoryWiseQuery extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           series: [44, 55, 13, 43, 22],
//           options: {
//             chart: {
//               width: 380,
//               type: 'pie',
//             },
//             title: {
//                 text: "Category wise Query",
//                 align: "left",
//               },
//             noData: {
//                 text: "Loading...",
//                 align: "center",
//                 verticalAlign: "bottom",
//                 offsetX: 0,
//                 offsetY: 0,
//                 style: {
//                   color: "#000000",
//                   fontSize: "14px",
//                   fontFamily: "Helvetica",
//                 },
//               },
//               legend: {
//                 position: "bottom",
//                 horizontalAlign: "center",
//                 fontFamily: 'sans-serif',
//                 fontSize: '15px',
//                 fontWeight: 500,
//               },
//             labels: ['Claim settlement', 'Processing', 'Disbursement', 'Service', 'Other'],
//             responsive: [{
//               breakpoint: 480,
//               options: {
//                 chart: {
//                   width: 200
//                 },
//                 legend: {
//                   position: 'bottom'
//                 }
//               }
//             }]
//           }, 
        
//         };
//       }

//   render() {
//     return (
//       <ReactApexChart
//         options={this.state.options}
//         series={this.state.series}
//         type="pie"
//         height={528}
//       />
//     );
//   }
// }
// export default CategoryWiseQuery;
import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Box,
  Typography,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";

const CategoryWiseQuery = ({ ebCategoryMemberGData }) => {
  console.log("ebCategoryMemberGData", ebCategoryMemberGData);
  
  // Static data from your image for Category wise complaints-Member
  const staticPieData = {
    series: [3716, 11513, 8376, 1113, 7411],
    labels: ["Application", "Disbursement", "Dispute with CIR", "Insurance", "Others", "Repayment", "TPP"],
  };

  const pieChartOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: true,
      },
    },
    labels: staticPieData.labels,
    colors: ["#2B60AD", "#39B1AC", "#69AB44", "#FDBF11", "#F78F6D", "#F05D5F", "#B853A0"],
    title: {
      text: "Category wise quries-Industry",
      align: "center",
      style: { fontSize: "16px", fontWeight: "bold", color: "#263238" },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
    },
    dataLabels: {
      enabled: true,
      formatter: function(val, opts) {
        const value = staticPieData.series[opts.seriesIndex];
        const percentage = val.toFixed(0);
        return `${value}, ${percentage}%`;
      },
      style: {
        fontSize: "11px",
        colors: ["#fff"]
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
      y: {
        formatter: function(val) {
          return val;
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
    <Card style={{ paddingBottom: "20px" }}>
      <CardActionArea>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center">
            {/* Pie Chart Only */}
            <Box width="100%">
              <ReactApexChart
                options={pieChartOptions}
                series={staticPieData.series}
                type="pie"
                height={400}
              />
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryWiseQuery;