import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./InteractiveStateAndCityMap.css";
import Loader from "../common/Loader";
import RestoreIcon from "@mui/icons-material/Restore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  BaseUrl,
  fetchMonthsYears,
  getDistrictAndCategory,
  fetchNewRecords,
} from "../url/url";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";

const FilterDiv = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  handleFilter,
  handleReset,
  currentState,
  handleBackToIndia,
  toggleFullscreen,
  isFullscreen,
}) => {
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const response = await fetch(
          // "https://api.mfinindia.org/api/auth/fetchMonthsYears",
          `${BaseUrl}/${fetchMonthsYears}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data from the API.");
        }

        const data = await response.json();
        setMonths(data.months || []);
        setYears(data.years || []);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchFilterData();
  }, []);

  return (
    <div className="filter-container">
      {currentState && (
        <button onClick={handleBackToIndia} className="btn">
          <ArrowBackIcon />
        </button>
      )}
      <div className="filter-group">
        <label htmlFor="year" className="select-label">
          <strong>Select Year:</strong>
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="custom-select"
        >
          <option value="">select</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="month" className="select-label">
          <strong>Select Month:</strong>
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="custom-select"
        >
          <option value="">select</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleFilter} className="btn btn-primary">
        Filter
      </button>
      <button onClick={toggleFullscreen} className="btn btn-primary">
        {isFullscreen ? "Exit Fullscreen" : "View Fullscreen"}
      </button>
      <button onClick={handleReset} className="btn btn-secondary reset-btn">
        <RestoreIcon />
      </button>
    </div>
  );
};

const InteractiveStateAndCityMap = () => {
  const [districtColors, setDistrictColors] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentState, setCurrentState] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  // const [selectedDistrict, setSelectedDistrict] = useState(null);

  const navigate = useNavigate();

  const categoryColors = {
    "Very High": "#c20000",
    "Very Low": "#ffd966",
    Low: "#aed643",
    Moderate: "#9cb0e8",
    High: "#ff5050",
  };

  const handleFilter = async () => {
    setLoading(true);
    await fetchDistrictColors();

    if (currentState) {
      loadCitiesForState(currentState);
    }

    setLoading(false);
  };

  const handleReset = async () => {
    setLoading(true);
    setSelectedMonth("");
    setSelectedYear("");
    await fetchDistrictColors();

    if (currentState) {
      loadCitiesForState(currentState);
    } else {
      d3.json("/mapFiles/india_state_geo.json").then((statesGeojson) => {
        renderStates(statesGeojson);
      });
    }

    setLoading(false);
  };

  const handleBackToIndia = () => {
    d3.select("#map-container").selectAll(".tooltip").remove();
    setCurrentState(null);
    d3.json("/mapFiles/india_state_geo.json").then((statesGeojson) => {
      renderStates(statesGeojson);
    });
  };

  const fetchDistrictColors = async () => {
    try {
      const response = await fetch(`${BaseUrl}/${getDistrictAndCategory}`);
      // const response = await fetch(
      //   "https://api.mfinindia.org/api/auth/getdisteictandcategory"
      // );
      const data = await response.json();

      const districtWithColors = data.map((district) => ({
        district_name: district.district_name,
        color: categoryColors[district.dri_category] || "#fff",
      }));

      setDistrictColors(districtWithColors);
    } catch (error) {
      console.error("Error fetching district colors:", error);
    }
  };

  function formatNumber(value) {
    if (value !== null) {
      return Math.round(value).toLocaleString("en-IN");
    }
    return value;
  }

  function formatNumberDigits(value) {
    if (value !== null) {
      return value.toFixed(2).toLocaleString("en-IN");
    }
    return value;
  }

  function formatNumberDigitsOne(value) {
    if (value !== null) {
      return value.toFixed(1).toLocaleString("en-IN");
    }
    return value;
  }

  const extractYearAndMonth = (datestring) => {
    if (!datestring) return;

    const [year, month] = datestring.split("-");
    if (year && month) {
      setSelectedYear(year);
      setSelectedMonth(getMonthName(month));
    }
  };

  const getMonthName = (monthNumber) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[parseInt(monthNumber, 10) - 1];
  };

  function renderStates(statesGeojson) {
    const svg = d3.select("#map");
    svg.selectAll("*").remove();

    const width = isFullscreen ? window.innerWidth : 800;
    const height = isFullscreen ? window.innerHeight + 50 : 800;

    const projection = d3
      .geoMercator()
      .scale(1200)
      .center([80, 22])
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    d3.select("#map-container").selectAll(".tooltip").remove();
    const tooltip = d3
      .select("#map-container")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg
      .attr("width", width)
      .attr("height", height)
      .selectAll("path")
      .data(statesGeojson.features)
      .enter()
      .append("path")
      .attr("class", "state")
      .attr("d", path)
      .on("mouseover", function (event, d) {
        tooltip.html("<div class='map-data'>Loading data...</div>");
        d3.select(this).style("fill", "#00aaff");
        tooltip.transition().duration(200).style("opacity", 1);

        if (d.properties.st_nm) {
          const baseUrl = `${BaseUrl}/${fetchNewRecords}`;
          // const baseUrl =
          //   "https://api.mfinindia.org/api/auth/new_fetch_records";
          const url =
            selectedMonth && selectedYear
              ? `${baseUrl}/${selectedMonth}/${selectedYear}`
              : baseUrl;

          fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "state", value: d.properties.st_nm }),
          })
            .then((response) => response.json())
            .then((records) => {
              if (records.length > 0) {
                const firstRecord = records[0];
                extractYearAndMonth(firstRecord.Date);
                let output = "";
                records.forEach((record) => {
                  output += `<div class='map-data'>
                    <strong>${record.State_Name}</strong>
                    GLP (Rs Cr): <span class="record-value">${formatNumber(
                      record.GLP_RsCr
                    )}</span> |
                    No. of AC ('000): <span class="record-value">${formatNumber(
                      record.NoOfAccounts_K
                    )}</span><br>
                    No. of UB ('000): <span class="record-value">${formatNumber(
                      record.NoOfUB_K
                    )}</span> |
                    No. of FIs: <span class="record-value">${formatNumber(
                      record.NoOfFI
                    )}</span><br>
                    <b><br>MFIN-RADAR</b><br>
                    Ring Leader: <span class="record-value">${formatNumber(
                      record.R_RL
                    )}</span> |
                    External Inciter: <span class="record-value">${formatNumber(
                      record.R_EI
                    )}</span> <br>
                    Risky Area: <span class="record-value">${formatNumber(
                      record.R_RA
                    )}</span> |
                    Negative Area: <span class="record-value">${formatNumber(
                      record.R_NA
                    )}</span><br>
                    <b><br>MFIN-CGRM (as on <span class="record-value">${
                      record.Date
                    }</span>)</b><br>
                    Query: <span class="record-value">${formatNumber(
                      record.CGRM_Q
                    )}</span> |
                    Complaints: <span class="record-value">${formatNumber(
                      record.CGRM_C
                    )}</span> <br>
                    Resolved: <span class="record-value">${formatNumber(
                      record.CGRM_R
                    )}</span> |
                    Pending: <span class="record-value">${formatNumber(
                      record.CGRM_P
                    )}</span>
                  </div>`;
                });
                tooltip.html(output);
              }
            })
            .catch(() => {
              tooltip.html("<p>Error fetching records</p>");
            });
        }
      })
      // .on("mousemove", function (event) {
      //   const [x, y] = d3.pointer(event, this);
      //   tooltip.style("left", `${x + 20}px`).style("top", `${y}px`);
      // })
      .on("mousemove", function (event) {
        event.preventDefault();

        const x = event.clientX;
        const y = event.clientY;
        const offset = 15;
        const tooltipElement = d3.select(".tooltip").node();

        if (tooltipElement) {
          const tooltipRect = tooltipElement.getBoundingClientRect();

          // Calculate X positioning
          const rightPosition = x + offset;
          const leftPosition = x - tooltipRect.width - offset;

          let bestX;
          if (rightPosition + tooltipRect.width <= window.innerWidth) {
            bestX = rightPosition;
          } else if (leftPosition >= 0) {
            bestX = leftPosition;
          } else {
            bestX = rightPosition; // fallback
          }

          // ✅ Adaptive Y positioning
          let bestY;
          if (y + tooltipRect.height + offset <= window.innerHeight) {
            // enough space below → show below cursor
            bestY = y + offset;
          } else {
            // not enough space → show above cursor
            bestY = y - tooltipRect.height - offset;
            if (bestY < offset) bestY = offset; // clamp if too high
          }

          // Ensure X is within viewport
          bestX = Math.max(
            offset,
            Math.min(bestX, window.innerWidth - tooltipRect.width - offset)
          );

          tooltip
            .style("position", "fixed")
            .style("left", `${bestX}px`)
            .style("top", `${bestY}px`);
        }
      })
      .on("mouseout", function () {
        d3.select(this).style("fill", "#d3d3d3");
        tooltip.transition().duration(500).style("opacity", 0);
      })
      .on("click", function (event, d) {
        const state_name = d.properties.st_nm;
        setCurrentState(state_name);
        loadCitiesForState(state_name);
      });

    svg
      .selectAll(".state-label")
      .data(statesGeojson.features)
      .enter()
      .append("text")
      .attr("class", "state-label")
      .attr("transform", (d) => {
        const centroid = path.centroid(d);
        return `translate(${centroid[0]},${centroid[1]})`;
      })
      .attr("dy", ".35em")
      .text((d) => d.properties.st_nm)
      .style("font-size", "11px")
      .style("pointer-events", "none");
  }

  function loadCitiesForState(stateName) {
    d3.select("#map-container").selectAll(".tooltip").remove();
    const state_Name = stateName.replace(/\s/g, "");

    d3.json(`/mapFiles/states/${state_Name}.json`).then((citiesGeojson) => {
      renderCities(citiesGeojson, stateName);
    });
  }

  function renderCities(citiesGeojson, stateName) {
    const svg = d3.select("#map");
    svg.selectAll("*").remove();

    const width = isFullscreen ? window.innerWidth : 800;
    const height = isFullscreen ? window.innerHeight - 100 : 800;

    const projection = d3.geoMercator();
    const bounds = d3.geoBounds(citiesGeojson);
    const widthScale = width / Math.abs(bounds[1][0] - bounds[0][0]);
    const heightScale = height / Math.abs(bounds[1][1] - bounds[0][1]);
    const scale = Math.min(widthScale, heightScale) * 45;

    projection
      .scale(scale)
      .center([
        (bounds[0][0] + bounds[1][0]) / 2,
        (bounds[0][1] + bounds[1][1]) / 2,
      ])
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const districtColorMap = {};
    districtColors.forEach((item) => {
      districtColorMap[item.district_name] = item.color;
    });

    d3.select("#map-container").selectAll(".tooltip").remove();
    const tooltip = d3
      .select("#map-container")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg
      .attr("width", width)
      .attr("height", height)
      .append("text")
      .attr("x", 70)
      .attr("y", 30)
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(`${stateName} Districts`);

    svg
      .selectAll("path")
      .data(citiesGeojson.features)
      .enter()
      .append("path")
      .attr("class", "city")
      .attr("d", path)
      .style("fill", (d) => districtColorMap[d.properties.district] || "#fff")
      .on("mouseover", function (event, d) {
        tooltip.html("<div class='map-data'>Loading data...</div>");
        tooltip.transition().duration(200).style("opacity", 1);

        if (d.properties.district) {
          const baseUrl = `${BaseUrl}/${fetchNewRecords}`;

          const url =
            selectedMonth && selectedYear
              ? `${baseUrl}/${selectedMonth}/${selectedYear}`
              : baseUrl;

          fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "district",
              value: d.properties.district,
              state: d.properties.st_nm,
            }),
          })
            .then((response) => response.json())
            .then((records) => {
              if (records.length > 0) {
                const firstRecord = records[0];
                extractYearAndMonth(firstRecord.Date);
                let output = "";
                records.forEach((record) => {
                  output += `<div class='map-data'>
                    <strong>${record.State_Name}, ${
                    record.District_Name
                  }</strong>
                    DRI Category: <span class="record-value">${
                      record.DRI_Category
                    }</span> |
                    DRI Score: <span class="record-value">${(
                      record.DRI_Score * 100
                    ).toFixed(2)}%</span><br>
                    GLP (Rs Cr): <span class="record-value">${formatNumberDigits(
                      record.GLP_RsCr
                    )}</span> |
                    GLP Rank: <span class="record-value">${formatNumber(
                      record.GLP_Rank
                    )}</span><br>
                    No. of AC ('000): <span class="record-value">${formatNumberDigitsOne(
                      record.NoOfAccounts_K
                    )}</span> |
                    No. of UB ('000): <span class="record-value">${formatNumberDigitsOne(
                      record.NoOfUB_K
                    )}</span> |
                    No. of FIs: <span class="record-value">${formatNumber(
                      record.NoOfFI
                    )}</span><br><br>
                    Density of FI: <span class="record-value">${formatNumberDigitsOne(
                      record.DensityOfFIs
                    )}</span>
                    (Percentile: <span class="record-value">${(
                      record.DensityOfFIs_P * 100
                    ).toFixed(2)}%</span>)<br>
                    Accounts/UB: <span class="record-value">${formatNumberDigitsOne(
                      record.AcperUB
                    )}</span>
                    (Percentile: <span class="record-value">${(
                      record.AcperUB_P * 100
                    ).toFixed(2)}%</span>)<br>
                    Depth of Outreach: <span class="record-value">${(
                      record.DepthOfOutreach * 100
                    ).toFixed(2)}%</span>
                    (Percentile: <span class="record-value">${(
                      record.DepthOfOutreach_P * 100
                    ).toFixed(2)}%</span>)<br>
                    Portfolio/GDPP (per HH): <span class="record-value">${(
                      record.PerCapita * 100
                    ).toFixed(2)}%</span>
                    (Percentile: <span class="record-value">${(
                      record.PerCapita_P * 100
                    ).toFixed(2)}%</span>)<br>
                    PAR 60-180 Days: <span class="record-value">${(
                      record.PAR60 * 100
                    ).toFixed(2)}%</span>
                    (Percentile: <span class="record-value">${(
                      record.PAR60_P * 100
                    ).toFixed(2)}%</span>) <br><br>
                    <b>MFIN-RADAR</b> <br>
                    Ring Leader: <span class="record-value">${formatNumber(
                      record.R_RL
                    )}</span> |
                    External Inciter: <span class="record-value">${formatNumber(
                      record.R_EI
                    )}</span><br>
                    Risky Area: <span class="record-value">${formatNumber(
                      record.R_RA
                    )}</span> |
                    Negative Area: <span class="record-value">${formatNumber(
                      record.R_NA
                    )}</span><br><br>
                    <b>MFIN-CGRM (as on <span class="record-value">${
                      record.Date
                    }</span>)</b> <br>
                    Query: <span class="record-value">${formatNumber(
                      record.CGRM_Q
                    )}</span> |
                    Complaints: <span class="record-value">${formatNumber(
                      record.CGRM_C
                    )}</span><br>
                    Resolved: <span class="record-value">${formatNumber(
                      record.CGRM_R
                    )}</span> |
                    Pending <span class="record-value">${formatNumber(
                      record.CGRM_P
                    )}</span>
                  </div>`;
                });
                tooltip.html(output);
              }
            })
            .catch(() => {
              tooltip.html("<p>Error fetching records</p>");
            });
        }
      })
      // .on("mousemove", function (event) {
      //   const [x, y] = d3.pointer(event, this);
      //   tooltip.style("left", `${x + 20}px`).style("top", `${y}px`);
      // })
      .on("mousemove", function (event) {
        event.preventDefault();

        const x = event.clientX;
        const y = event.clientY;
        const offset = 15;
        const tooltipElement = d3.select(".tooltip").node();

        if (tooltipElement) {
          const tooltipRect = tooltipElement.getBoundingClientRect();

          // Calculate X positioning
          const rightPosition = x + offset;
          const leftPosition = x - tooltipRect.width - offset;

          let bestX;
          if (rightPosition + tooltipRect.width <= window.innerWidth) {
            bestX = rightPosition;
          } else if (leftPosition >= 0) {
            bestX = leftPosition;
          } else {
            bestX = rightPosition; // fallback
          }

          // ✅ Adaptive Y positioning
          let bestY;
          if (y + tooltipRect.height + offset <= window.innerHeight) {
            // enough space below → show below cursor
            bestY = y + offset;
          } else {
            // not enough space → show above cursor
            bestY = y - tooltipRect.height - offset;
            if (bestY < offset) bestY = offset; // clamp if too high
          }

          // Ensure X is within viewport
          bestX = Math.max(
            offset,
            Math.min(bestX, window.innerWidth - tooltipRect.width - offset)
          );

          tooltip
            .style("position", "fixed")
            .style("left", `${bestX}px`)
            .style("top", `${bestY}px`);
        }
      })

      .on("mouseout", function () {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    svg
      .selectAll(".city-label")
      .data(citiesGeojson.features)
      .enter()
      .append("text")
      .attr("class", "city-label")
      .attr("transform", (d, i) => {
        const centroid = path.centroid(d);
        const offset = i % 2 === 0 ? -14 : 14;
        return `translate(${centroid[0]},${centroid[1] + offset})`;
      })
      .attr("dy", ".25em")
      .text((d) => d.properties.district);
  }

  useEffect(() => {
    fetchDistrictColors();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (currentState) {
        loadCitiesForState(currentState);
      } else {
        d3.json("/mapFiles/india_state_geo.json").then((statesGeojson) => {
          renderStates(statesGeojson);
        });
      }
    };

    d3.select("#map-container").selectAll(".tooltip").remove();
    loadData();

    return () => {
      d3.select("#map-container").selectAll(".tooltip").remove();
    };
  }, [districtColors, currentState, isFullscreen]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  if (loading) {
    return <Loader loader={loading} size={30} />;
  }

  return (
    <div
      id="map-container"
      className={`map-container ${isFullscreen ? "fullscreen" : ""}`}
    >
      <div className="map-controls">
        <FilterDiv
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          handleFilter={handleFilter}
          handleReset={handleReset}
          currentState={currentState}
          handleBackToIndia={handleBackToIndia}
          toggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
        />
      </div>

      <div className="map-wrapper">
        <svg id="map"></svg>
      </div>

      <div className="color-container">
        <div className="color-item">
          <p className="colortext">Very High</p>
          <div className="color-box very-high"></div>
        </div>
        <div className="color-item">
          <p className="colortext">High</p>
          <div className="color-box high"></div>
        </div>
        <div className="color-item">
          <p className="colortext">Moderate</p>
          <div className="color-box moderate"></div>
        </div>
        <div className="color-item">
          <p className="colortext">Low</p>
          <div className="color-box low"></div>
        </div>
        <div className="color-item">
          <p className="colortext">Very Low</p>
          <div className="color-box very-low"></div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveStateAndCityMap;
