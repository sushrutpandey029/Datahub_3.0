import React from "react";
import ReactApexChart from "react-apexcharts";

function EBOpenToHireGp({ ebOpenToHireGData }) {
  console.log("ebOpenToHireGData", ebOpenToHireGData);
  const fallbackHeadings = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const fallbackSeries = [
    {
      name: "Yes",
      data: new Array(fallbackHeadings.length).fill(0),
    },
    {
      name: "No",
      data: new Array(fallbackHeadings.length).fill(0),
    },
  ];

  const categories =
    ebOpenToHireGData &&
    ebOpenToHireGData.headings &&
    ebOpenToHireGData.headings.length > 0
      ? ebOpenToHireGData.headings
      : fallbackHeadings;

  const series =
    ebOpenToHireGData && ebOpenToHireGData.data
      ? [
          {
            name: "Yes",
            data:
              ebOpenToHireGData.data.Open_to_Rehire ||
              new Array(categories.length).fill(0),
          },
          {
            name: "No",
            data:
              ebOpenToHireGData.data.Not_Eligible_for_Rehire ||
              new Array(categories.length).fill(0),
          },
        ]
      : fallbackSeries;

  const options = {
    chart: {
      type: "bar",
      stacked: false,
      toolbar: { show: true },
    },
    colors: ["#2B60AD", "#F78F6D"],

    title: {
      text: "Open to rehire",
      align: "center",
      style: { fontSize: "16px", fontWeight: "bold", color: "#263238" },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        dataLabels: {
          position: "top",
        },
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#fff"],
    },

    dataLabels: {
      enabled: true,
      formatter: (val) =>
        val === 0 ? "" : new Intl.NumberFormat("en-IN").format(val),
      offsetY: -20,
      style: {
        fontSize: "12px",
        fontWeight: "bold",
        colors: ["#333"],
      },
    },
    xaxis: {
      categories,
    },
    yaxis: {
      labels: { show: false },
    },
    legend: {
      position: "bottom",
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={400}
        width="100%"
      />
    </div>
  );
}

export default EBOpenToHireGp;
