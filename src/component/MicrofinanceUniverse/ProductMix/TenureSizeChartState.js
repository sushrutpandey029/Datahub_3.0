
import React, { useMemo, useState, useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";

const TenureSizeChartstate = ({ data, title = "Tenure Size (%) - State", subtitle = "" }) => {
  console.log("data in tenurestate", data);
  const [hiddenSeries, setHiddenSeries] = useState([]);
  const [hoveredLegend, setHoveredLegend] = useState(null);
  const chartRef = useRef(null);

  var TenureTitle = useMemo(() => {
    var regionName = data ? (data.region || data.regionName || "") : "";
    var stateName = data ? (data.state || data.stateName || "") : "";

    if (regionName && stateName) return `${regionName} - ${stateName}`;
    if (regionName) return regionName;
    if (stateName) return stateName;

    return "";
  }, [data]);

  // --------------------------
  // Transform API data (no optional chaining)
  // --------------------------
  const transformTenureAPIData = (apiData) => {
    if (!apiData || apiData.status !== 200 || !apiData.data || !Array.isArray(apiData.data)) {
      return { series: [], months: [], categories: [], tenureRanges: [] };
    }

    var colors = ["#2B60AD", "#39B1AC", "#69AB44"];

    var tenureRanges = [
      { display: "0 to 12 Months", dataKey: "0 to 12", color: colors[0], originalIndex: 0 },
      { display: "13 to 24 Months", dataKey: "13 to 24", color: colors[1], originalIndex: 1 },
      { display: "Greater than 24 Months", dataKey: "Gtr 24", color: colors[2], originalIndex: 2 },
    ];

    // months array
    var months = apiData.data.map(function (m) {
      return m && m.month ? m.month : "";
    });

    // categories for x-axis
    var categories = [];
    for (var i = 0; i < months.length; i++) {
      categories.push(months[i] + "_Volume");
      categories.push(months[i] + "_Value");
    }

    // prepare series (original order)
    var series = tenureRanges.map(function (range) {
      var dataPoints = [];

      for (var j = 0; j < apiData.data.length; j++) {
        var monthObj = apiData.data[j] || {};
        var vol = monthObj.volume ? monthObj.volume : {};
        var val = monthObj.value ? monthObj.value : {};

        var volRaw = vol[range.dataKey];
        var valRaw = val[range.dataKey];

        // safe convert to number (support number or "12%" strings)
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

  // --------------------------
  // Transform + filter + reverse for display
  // --------------------------
  const transformed = useMemo(function () {
    return transformTenureAPIData(data);
  }, [data]);

  var finalSeries = [];
  if (transformed.series && Array.isArray(transformed.series)) {
    finalSeries = transformed.series
      .filter(function (s) {
        return hiddenSeries.indexOf(s.originalIndex) === -1;
      })
      .reverse(); // reverse for correct stacked display order
  }

  var series = finalSeries;
  var categories = transformed.categories;
  var months = transformed.months;
  var tenureRanges = transformed.tenureRanges;

  // --------------------------
  // toggle legend (hide/show)
  // --------------------------
  var toggleSeries = function (originalIndex) {
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

  // --------------------------
  // hover legend effect (blur other bars)
  // --------------------------
  useEffect(function () {
    if (!chartRef.current) return;

    var chartEl = chartRef.current.querySelector(".apexcharts-inner");
    if (!chartEl) return;

    var bars = chartEl.querySelectorAll(".apexcharts-series");

    if (hoveredLegend === null) {
      for (var i = 0; i < bars.length; i++) {
        bars[i].style.opacity = "1";
        bars[i].style.filter = "none";
      }
      return;
    }

    for (var k = 0; k < bars.length; k++) {
      var visibleSeries = series[k];
      if (!visibleSeries) continue;

      if (visibleSeries.originalIndex === hoveredLegend) {
        bars[k].style.opacity = "1";
        bars[k].style.filter = "none";
      } else {
        bars[k].style.opacity = "0.2";
        bars[k].style.filter = "blur(1px)";
      }
    }
  }, [hoveredLegend, series]);

  // --------------------------
  // Apex options (USE TenureTitle here)
  // --------------------------
  var options = {
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


    title: {
      text:
        (data && data.title) || "Tenure (%) - All India",
      align: "left",

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
        return val >= 3 ? Math.round(val) + "%" : "";
      },
      style: { fontSize: "10px", colors: ["#fff"], fontWeight: 600 },
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
    colors: ["#1f4e78", "#f7941d", "#00a651"],
    tooltip: {
      y: { formatter: function (val) { return Math.round(val) + "%"; } },
    },
  };

  // --------------------------
  // Loading fallback
  // --------------------------
  if (!data) {
    return (
      <div
        style={{
          height: "450px",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          flexDirection: "column",
        }}
      >
        <p>Loading tenure data...</p>
      </div>
    );
  }

  // --------------------------
  // Render
  // --------------------------
  return (
    <div ref={chartRef}>
      <ReactApexChart key={hiddenSeries.join("-")} options={options} series={series} type="bar" height={380} />

      {/* Custom X axis – bold horizontal + Volume/Value + month + vertical dividers */}
      <div
        style={{
          marginTop: "-15px",
          paddingLeft: "30px",
          paddingRight: "30px",
          position: "relative",
        }}
      >
        {/* Bold horizontal line */}
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
                <span style={{ fontSize: "11px", color: "#666", fontWeight: 600, flex: 1, textAlign: "center" }}>Volume</span>
                <span style={{ fontSize: "11px", color: "#666", fontWeight: 600, flex: 1, textAlign: "center" }}>Value</span>

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
                  fontSize: "11px",
                  color: "#444",
                  fontWeight: 600,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                {month}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Legend */}
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
          var isHidden = hiddenSeries.indexOf(item.originalIndex) !== -1;
          var isHovered = hoveredLegend === item.originalIndex;

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
              onMouseEnter={function () {
                setHoveredLegend(item.originalIndex);
              }}
              onMouseLeave={function () {
                setHoveredLegend(null);
              }}
              onClick={function () {
                toggleSeries(item.originalIndex);
              }}
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
                  fontSize: "11px",
                  color: isHidden ? "#999" : "#444",
                  fontWeight: 500,
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

export default TenureSizeChartstate;
