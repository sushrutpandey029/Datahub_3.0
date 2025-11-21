
import React, { useMemo, useState, useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import "apexcharts/dist/apexcharts.css";


const TicketSizeChartstate = ({
  data,
  region,
  state,
  title = "",
  subtitle = "",
}) => {

  const [hiddenSeries, setHiddenSeries] = useState([]);
  const [hoveredLegend, setHoveredLegend] = useState(null);
  const chartRef = useRef(null);




  // 🔹 Transform API data
  const transformTicketAPIData = (apiData) => {
    if (!apiData || !apiData.table) {
      return { series: [], categories: [], months: [], ticketRanges: [] };
    }

    const colors = ["#2B60AD", "#39B1AC", "#69AB44", "#FDBF11", "#F78F6D", "#F05D5F"];

    const months = [];
    for (let i = 1; i < apiData.columns.length; i += 2) {
      const month = apiData.columns[i].split("_")[0];
      months.push(month);
    }

    const ticketRanges = apiData.table.map((row, idx) => ({
      key: row["Ticket Size"],
      color: colors[idx % colors.length],
      originalIndex: idx,
    }));

    const categories = [];
    months.forEach((month) => {
      categories.push(`${month}_Volume`);
      categories.push(`${month}_Value`);
    });

    const series = apiData.table.map((row, rowIndex) => {
      const name = row["Ticket Size"];
      const dataPoints = [];

      for (let i = 1; i < apiData.columns.length; i += 2) {
        const vol = parseFloat((row[apiData.columns[i]] || "0").replace("%", ""));
        const val = parseFloat((row[apiData.columns[i + 1]] || "0").replace("%", ""));
        dataPoints.push(vol, val);
      }

      return {
        name,
        data: dataPoints,
        color: colors[rowIndex % colors.length],
        originalIndex: rowIndex,
      };
    });

    return { series, categories, months, ticketRanges };
  };

  // 🔹 Memoized transform + hidden filter + reverse
  const { series, categories, months, ticketRanges } = useMemo(() => {
    const transformed = transformTicketAPIData(data);

    const filteredSeries = transformed.series
      .filter((s) => !hiddenSeries.includes(s.originalIndex))
      .reverse();

    return {
      series: filteredSeries,
      categories: transformed.categories,
      months: transformed.months,
      ticketRanges: transformed.ticketRanges,
    };
  }, [data, hiddenSeries]);

  const toggleSeries = (originalIndex) => {
    setHiddenSeries((prev) =>
      prev.includes(originalIndex)
        ? prev.filter((i) => i !== originalIndex)
        : [...prev, originalIndex]
    );
  };

  // 🔥 Blur on legend hover
  useEffect(() => {
    if (!chartRef.current) return;
    const chartEl = chartRef.current.querySelector(".apexcharts-inner");
    if (!chartEl) return;

    const bars = chartEl.querySelectorAll(".apexcharts-series");

    if (hoveredLegend === null) {
      bars.forEach((bar) => {
        bar.style.opacity = "1";
        bar.style.filter = "none";
      });
      return;
    }

    bars.forEach((bar, idx) => {
      const visibleSeries = series[idx];
      if (!visibleSeries) return;

      if (visibleSeries.originalIndex === hoveredLegend) {
        bar.style.opacity = "1";
        bar.style.filter = "none";
      } else {
        bar.style.opacity = "0.2";
        bar.style.filter = "blur(1px)";
      }
    });
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

    title: {
      text: (data && data.title) || "Ticket Size (%)",
      align: "left",

    },

    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 3,
        columnWidth: "65%",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => (val >= 1 ? `${Math.round(val)}%` : ""),
      style: { fontSize: "10px", colors: ["#fff"], fontWeight: 600 },
    },
    xaxis: {
      categories,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false, max: 100 },
    grid: { show: false },
    legend: { show: false },
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

      {/* CUSTOM X-AXIS */}
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "0px",
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
          {months.map((month, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-around",
                flex: 1,
                gap: "6px",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  color: "#666",
                  fontWeight: 600,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Volume
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#666",
                  fontWeight: 600,
                  flex: 1,
                  textAlign: "center",
                }}
              >
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
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "8px",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {months.map((month, idx) => (
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
          ))}
        </div>
      </div>

      {/* LEGENDS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "25px",
          gap: "12px 20px",
        }}
      >
        {ticketRanges.map((item) => {
          const isHidden = hiddenSeries.includes(item.originalIndex);
          const isHovered = hoveredLegend === item.originalIndex;

          return (
            <div
              key={item.originalIndex}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                opacity: isHidden ? 0.4 : isHovered ? 1 : hoveredLegend !== null ? 0.3 : 1,
              }}
              onMouseEnter={() => setHoveredLegend(item.originalIndex)}
              onMouseLeave={() => setHoveredLegend(null)}
              onClick={() => toggleSeries(item.originalIndex)}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: item.color,
                  marginRight: "6px",
                  border: isHidden ? "2px solid #999" : "none",
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  color: "#444",
                  fontWeight: 500,
                }}
              >
                {item.key}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketSizeChartstate;
