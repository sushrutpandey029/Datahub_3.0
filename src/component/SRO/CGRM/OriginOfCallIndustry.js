import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const OriginOfCallIndustry = ({ data }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    console.log("🔍 OriginOfCallIndustry Component - Data prop received:", data);
    
    // Static series names - always show Query and Complaint
    const staticSeriesNames = ["Query", "Complaint"];
    
    // Use chart8 for Industry API
    if (data && data.chart8 && Array.isArray(data.chart8)) {
      console.log("✅ Valid data received in OriginOfCallIndustry");
      console.log("📊 chart8 data:", data.chart8);
      
      // Process API data
      const top10States = data.chart8.slice(0, 10);
      
      const categories = top10States.map(item => item.state || 'Unknown');
      const queryData = top10States.map(item => item.query_count || 0);
      const complaintData = top10States.map(item => item.complaint_count || 0);

      console.log("📊 Processed Categories:", categories);
      console.log("📊 Processed Query Data:", queryData);
      console.log("📊 Processed Complaint Data:", complaintData);

      // Transform data into ApexCharts series format with static names
      const seriesData = [
        {
          name: staticSeriesNames[0], // "Query"
          data: queryData,
        },
        {
          name: staticSeriesNames[1], // "Complaint"
          data: complaintData,
        },
      ];

      // Calculate dynamic height based on data
      const dynamicHeight = Math.max(400, categories.length * 50);

      // Find max values for each series for independent scaling
      const maxQueryValue = Math.max(...queryData);
      const maxComplaintValue = Math.max(...complaintData);
      const maxOverallValue = Math.max(maxQueryValue, maxComplaintValue);

      // Get industry name from data
      const industryName = data.entity_type || 'Industry';

      // Set chart options
      setOptions({
        chart: {
          type: "bar",
          height: dynamicHeight,
          stacked: false,
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true
            }
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
            }
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "60%",
            endingShape: "rounded",
            dataLabels: {
              position: "top"
            }
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function(val) { 
            return val ? val.toLocaleString() : '0'; 
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
            fontWeight: "bold",
            fontFamily: 'sans-serif'
          },
          background: {
            enabled: false
          }
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        title: {
          text: `Origin of complaints & queries - Top 10 states (${industryName})`,
          align: "left",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            color: "#263238",
            fontFamily: 'sans-serif'
          },
        },
        xaxis: {
          categories: categories,
          labels: {
            style: {
              fontSize: "12px",
              fontWeight: 600,
              fontFamily: 'sans-serif'
            },
            rotate: -45,
          },
        },
        yaxis: {
          title: {
            text: "", // Remove y-axis title
          },
          labels: {
            show: false, // Hide y-axis labels completely
          },
          min: 0,
          max: maxOverallValue * 1.1, // Add 10% padding
          tickAmount: 5,
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        colors: ["#2B60AD", "#39B1AC"], // Blue for Query, Teal for Complaint
        legend: {
          position: "top",
          horizontalAlign: "center",
          fontFamily: 'sans-serif',
          labels: {
            colors: "#444",
            useSeriesColors: false
          },
          markers: {
            width: 12,
            height: 12,
            radius: 6
          }
        },
        tooltip: {
          style: {
            fontFamily: 'sans-serif'
          },
          y: {
            formatter: function(val) { 
              return val ? val.toLocaleString() : '0'; 
            },
          },
        },
        grid: {
          borderColor: '#f1f1f1',
          padding: {
            top: 20,
            right: 10,
            bottom: 10,
            left: 10
          },
          yaxis: {
            lines: {
              show: false // Hide grid lines on y-axis
            }
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom"
            }
          }
        }]
      });

      // Set series data
      setSeries(seriesData);
    } else {
      console.log("❌ No valid data in OriginOfCallIndustry");
      console.log("Data:", data);
      console.log("Has chart8?", !!(data && data.chart8));
      console.log("Is array?", Array.isArray(data && data.chart8));
      
      // Get industry name even when no data
      const industryName = data && data.entity_type ? data.entity_type : 'Industry';

      // Set empty state with static series
      const emptySeriesData = [
        {
          name: staticSeriesNames[0], // "Query"
          data: [],
        },
        {
          name: staticSeriesNames[1], // "Complaint" 
          data: [],
        },
      ];

      setOptions({
        chart: {
          type: "bar",
          height: 400,
          toolbar: {
            show: false,
          }
        },
        title: {
          text: `Origin of complaints & queries - Top 10 states (${industryName})`,
          align: "left",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        xaxis: {
          categories: [], // Empty categories for no data
        },
        yaxis: {
          labels: {
            show: false, // Hide y-axis labels in empty state too
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        grid: {
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        noData: {
          text: "No data available",
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: '#444',
            fontSize: '14px',
            fontFamily: 'sans-serif'
          }
        }
      });
      
      setSeries(emptySeriesData);
    }
  }, [data]);

  // Get height safely without optional chaining
  const chartHeight = options.chart && options.chart.height ? options.chart.height : 400;

  console.log("🎯 Rendering OriginOfCallIndustry chart with height:", chartHeight);
  console.log("🎯 Series data:", series);

  return (
    <div className="origin-of-call-chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={chartHeight}
        key={JSON.stringify(series)} // For re-render when data changes
      />
    </div>
  );
};

export default OriginOfCallIndustry;