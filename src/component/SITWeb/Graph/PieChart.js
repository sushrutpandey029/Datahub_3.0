import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";
import axios from "axios";
import DOMPurify from "dompurify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Close,
  Home,
  CalendarMonth,
  PieChart as PieChartIcon,
  Map,
  Event,
} from "@mui/icons-material";
import { BaseUrl, getPieChartDrillData } from "../../url/url";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PieChart = ({
  years = [],
  months = [],
  defaultYear,
  defaultMonth,
  userRole,
  userName,
}) => {
  const [localYear, setLocalYear] = useState(defaultYear || "");
  const [localMonth, setLocalMonth] = useState(defaultMonth || "");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [drilldownHistory, setDrilldownHistory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [currentLevel, setCurrentLevel] = useState("financial_years");

  // API endpoint
  const API_URL = `${BaseUrl}/${getPieChartDrillData}`;

  // Sync with global defaults
  useEffect(() => {
    setLocalYear(defaultYear || "");
    setLocalMonth(defaultMonth || "");
  }, [defaultYear, defaultMonth]);

  // Fetch data when filters change
  useEffect(() => {
    if (localYear) {
      fetchData();
    }
  }, [localYear, localMonth]);

  // Fetch data when global filters change
  useEffect(() => {
    if (defaultYear) {
      setLocalYear(defaultYear);
      setLocalMonth(defaultMonth || "");
    }
  }, [defaultYear, defaultMonth]);

  // Enhanced helper function to find data in drilldown history
  const findInDrilldownHistory = (level) => {
    console.log("Searching for level:", level, "in history:", drilldownHistory);

    // Search in reverse order (most recent first)
    for (let i = drilldownHistory.length - 1; i >= 0; i--) {
      if (drilldownHistory[i].level === level) {
        console.log("Found:", drilldownHistory[i]);
        return drilldownHistory[i];
      }
    }
    console.log("Not found in history");
    return null;
  };

  // Reset to top level when filters change
  const resetToTopLevel = () => {
    setDrilldownHistory([]);
    setCurrentLevel("financial_years");
  };

  // Handle year dropdown change
  const handleYearChange = (newYear) => {
    setLocalYear(newYear);
    resetToTopLevel();
  };

  // Handle month dropdown change
  const handleMonthChange = (newMonth) => {
    setLocalMonth(newMonth);

    if (newMonth) {
      // If a month is selected, we need to simulate drilling down to months level
      // Reset history and set up the proper drilldown context
      const monthDrilldown = {
        level: "months",
        data: { month_name: newMonth },
      };

      setDrilldownHistory([
        { level: "financial_years", data: { financial_year: localYear } },
      ]);
      setCurrentLevel("activity_types"); // Skip to activity types since month is already selected
    } else {
      // If "All Months" is selected, reset to appropriate level
      if (localYear) {
        setDrilldownHistory([
          { level: "financial_years", data: { financial_year: localYear } },
        ]);
        setCurrentLevel("months");
      } else {
        resetToTopLevel();
      }
    }
  };

  // Fetch data based on current level and filters
  const fetchData = async (drilldownData = null) => {
    try {
      setLoading(true);
      setError(null);

      let params = {
        user_role: userRole,
        username: userName,
      };

      // Always include the currently selected year
      if (localYear) {
        params.year = localYear;
      }

      console.log(
        "Starting fetch with localYear:",
        localYear,
        "localMonth:",
        localMonth
      );

      // Handle dropdown-based filtering
      if (!drilldownData && localMonth) {
        // When month is selected from dropdown, add it to params
        params.month_name = localMonth;
      }

      // Add additional parameters based on drilldown level
      if (drilldownData) {
        const level = drilldownData.level;
        const data = drilldownData.data;

        console.log("Drilldown level:", level, "Data:", data);

        if (level === "financial_years" && data && data.financial_year) {
          // For financial years, set the year parameter
          params.year = data.financial_year;
        } else if (level === "months" && data && data.month_name) {
          params.month_name = data.month_name;
        } else if (level === "activity_types" && data && data.activity_type) {
          // For activity types, we need month context
          let monthName = localMonth; // First try dropdown selection

          const monthData = findInDrilldownHistory("months");
          if (monthData && monthData.data && monthData.data.month_name) {
            monthName = monthData.data.month_name;
          }

          if (monthName) {
            params.month_name = monthName;
          }
          params.activity_type = data.activity_type;
        } else if (level === "region_heads" && data && data.regional_head) {
          // For region heads, we need month and activity type context
          let monthName = localMonth;
          const monthData = findInDrilldownHistory("months");
          if (monthData && monthData.data && monthData.data.month_name) {
            monthName = monthData.data.month_name;
          }

          const activityData = findInDrilldownHistory("activity_types");

          console.log("Month data from history for region heads:", monthData);
          console.log(
            "Activity data from history for region heads:",
            activityData
          );

          if (monthName) {
            params.month_name = monthName;
          }
          if (
            activityData &&
            activityData.data &&
            activityData.data.activity_type
          ) {
            params.activity_type = activityData.data.activity_type;
          }
          params.regional_head = data.regional_head;
        } else if (level === "dates" && data && data.date) {
          // For dates, we need all previous context
          let monthName = localMonth;
          const monthData = findInDrilldownHistory("months");
          if (monthData && monthData.data && monthData.data.month_name) {
            monthName = monthData.data.month_name;
          }

          const activityData = findInDrilldownHistory("activity_types");
          const regionData = findInDrilldownHistory("region_heads");

          if (monthName) {
            params.month_name = monthName;
          }
          if (
            activityData &&
            activityData.data &&
            activityData.data.activity_type
          ) {
            params.activity_type = activityData.data.activity_type;
          }
          if (regionData && regionData.data && regionData.data.regional_head) {
            params.regional_head = regionData.data.regional_head;
          }
          params.date = data.date;
        }
      }

      const response = await axios.get(API_URL, { params });

      if (response.data && response.data.success) {
        setData(response.data);
        setCurrentLevel(response.data.level);

        // Add to drilldown history if it's a drilldown action
        if (drilldownData) {
          console.log("Adding to drilldown history:", {
            level: drilldownData.level,
            data: drilldownData.data,
          });

          setDrilldownHistory((prev) => {
            const newHistory = [
              ...prev,
              {
                level: drilldownData.level, // Store the level we're drilling down FROM
                data: drilldownData.data,
              },
            ];

            console.log("New drilldown history:", newHistory);
            return newHistory;
          });
        } else if (!localMonth) {
          // Only reset history when we're explicitly starting a new query from the top without month filter
          if (currentLevel === "financial_years") {
            console.log("Resetting drilldown history");
            setDrilldownHistory([]);
          }
        }
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load chart data");
    } finally {
      setLoading(false);
    }
  };

  // Handle chart click event for drilldown
  const handleChartClick = (event, chartContext, config) => {
    const clickedIndex = config.dataPointIndex;
    let drilldownData = null;

    console.log("Current level:", currentLevel);
    console.log("Data structure:", data);

    if (currentLevel === "financial_years" && data && data.data) {
      drilldownData = {
        level: "financial_years",
        data: {
          financial_year: data.data[clickedIndex],
        },
      };
      setLocalYear(data.data[clickedIndex]);
    } else if (currentLevel === "months" && data && data.months) {
      drilldownData = {
        level: "months",
        data: data.months[clickedIndex],
      };
      setLocalMonth(data.months[clickedIndex].month_name);
    } else if (
      currentLevel === "activity_types" &&
      data &&
      data.activity_types
    ) {
      drilldownData = {
        level: "activity_types",
        data: data.activity_types[clickedIndex],
      };
    } else if (currentLevel === "region_heads" && data && data.region_heads) {
      drilldownData = {
        level: "region_heads",
        data: data.region_heads[clickedIndex],
      };
    } else if (currentLevel === "dates" && data && data.dates) {
      drilldownData = {
        level: "dates",
        data: data.dates[clickedIndex],
      };
      fetchRecordDetails(drilldownData.data);
      return;
    }

    console.log("Drilldown data:", drilldownData);

    if (drilldownData) {
      fetchData(drilldownData);
    }
  };

  // Fetch record details for the modal
  const fetchRecordDetails = async (dateData) => {
    try {
      setLoading(true);

      let monthName = localMonth;
      const monthData = findInDrilldownHistory("months");
      if (monthData && monthData.data && monthData.data.month_name) {
        monthName = monthData.data.month_name;
      }

      const activityData = findInDrilldownHistory("activity_types");
      const regionData = findInDrilldownHistory("region_heads");

      const params = {
        user_role: userRole,
        username: userName,
        year: localYear,
        month_name: monthName || "",
        activity_type:
          activityData && activityData.data
            ? activityData.data.activity_type
            : "",
        regional_head:
          regionData && regionData.data ? regionData.data.regional_head : "",
        date: dateData.date,
      };

      console.log(
        "Params for record details:",
        JSON.stringify(params, null, 2)
      );

      const response = await axios.get(API_URL, { params });
      console.log(
        "respone in fetch details ",
        JSON.stringify(response.data, null, 2)
      );
      if (response.data && response.data.success) {
        setModalData(response.data.records || []);
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching record details:", error);
      setError("Failed to load record details");
    } finally {
      setLoading(false);
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    if (drilldownHistory.length > 0) {
      const newHistory = [...drilldownHistory];
      const removedLevel = newHistory.pop(); // Remove the last drilldown
      setDrilldownHistory(newHistory);

      console.log("Going back from:", currentLevel, "to previous level");

      // Special handling for month dropdown selection
      if (
        localMonth &&
        newHistory.length === 1 &&
        newHistory[0].level === "financial_years"
      ) {
        // If we have a month selected and we're going back to the year level,
        // we should go to activity_types level instead
        setCurrentLevel("activity_types");
        fetchData();
      } else if (newHistory.length === 0) {
        // If we're back to the top level, refetch with current filters
        if (localMonth) {
          // If month is selected, don't go back to financial_years, stay at months level
          setDrilldownHistory([
            { level: "financial_years", data: { financial_year: localYear } },
          ]);
          setCurrentLevel("months");
        }
        fetchData();
      } else {
        // Otherwise, refetch with the previous level's data
        const previousLevelData = newHistory[newHistory.length - 1];
        fetchData(previousLevelData);
      }
    }
  };

  // Prepare chart data based on current level
  const getChartData = () => {
    let series = [];
    let labels = [];
    let title = "";

    if (currentLevel === "financial_years" && data && data.data) {
      const yearCounts = {};
      data.data.forEach((year) => {
        yearCounts[year] = (yearCounts[year] || 0) + 1;
      });

      series = Object.values(yearCounts);
      labels = Object.keys(yearCounts);
      title = `Financial Year Distribution`;
    } else if (currentLevel === "months" && data && data.months) {
      series = data.months.map((item) => item.total);
      labels = data.months.map((item) => item.month_name);
      title = `Monthly Distribution for ${localYear}`;
    } else if (
      currentLevel === "activity_types" &&
      data &&
      data.activity_types
    ) {
      series = data.activity_types.map((item) => item.total);
      labels = data.activity_types.map((item) => item.activity_type);

      let monthName = localMonth;
      const monthData = findInDrilldownHistory("months");
      if (monthData && monthData.data && monthData.data.month_name) {
        monthName = monthData.data.month_name;
      }

      title = `Activity Types for ${monthName || "All Months"} ${localYear}`;
    } else if (currentLevel === "region_heads" && data && data.region_heads) {
      series = data.region_heads.map((item) => item.total);
      labels = data.region_heads.map((item) => item.regional_head);

      let monthName = localMonth;
      const monthData = findInDrilldownHistory("months");
      if (monthData && monthData.data && monthData.data.month_name) {
        monthName = monthData.data.month_name;
      }

      const activityData = findInDrilldownHistory("activity_types");
      const activityType =
        activityData && activityData.data
          ? activityData.data.activity_type
          : "";

      title = `Regional Heads for ${activityType} - ${
        monthName || "All Months"
      } ${localYear}`;
    } else if (currentLevel === "dates" && data && data.dates) {
      series = data.dates.map((item) => item.total);
      labels = data.dates.map((item) => item.date);

      let monthName = localMonth;
      const monthData = findInDrilldownHistory("months");
      if (monthData && monthData.data && monthData.data.month_name) {
        monthName = monthData.data.month_name;
      }

      const activityData = findInDrilldownHistory("activity_types");
      const regionData = findInDrilldownHistory("region_heads");
      const activityType =
        activityData && activityData.data
          ? activityData.data.activity_type
          : "";
      const regionHead =
        regionData && regionData.data ? regionData.data.regional_head : "";

      title = `Dates for ${regionHead} - ${activityType} - ${
        monthName || "All Months"
      } ${localYear}`;
    }

    return { series, labels, title };
  };

  const { series, labels, title } = getChartData();
  const total = series.reduce((a, b) => a + b, 0);

  const chartOptions = {
    chart: {
      type: "donut",
      toolbar: { show: true },
      events: {
        dataPointSelection: handleChartClick,
      },
    },
    labels,
    colors: [
      "#2B60AD",
      "#39B1AC",
      "#69AB44",
      "#FDBF11",
      "#F78F6D",
      "#F05D5F",
      "#B853A0",
      "#ED1590",
      "#BD1E22",
    ],
    legend: {
      position: "bottom",
      formatter: (legendName, opts) =>
        `${legendName}: ${opts.w.globals.series[opts.seriesIndex]}`,
    },
    title: {
      text: title,
      align: "center",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => total,
            },
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      {/* Header with filters and back button */}
      <div className="flex justify-between items-center mb-4">
        <div className="mb-4 flex flex-wrap md:flex-nowrap gap-4 items-end">
          <div className="w-32">
            {drilldownHistory.length > 0 && (
              <Button onClick={handleBackClick} disabled={loading}>
                <ArrowBackIcon />
              </Button>
            )}
            <label
              htmlFor="year-select"
              className="block text-sm font-medium text-gray-700 mb-1 px-3"
            >
              Financial Year
            </label>
            <select
              value={localYear}
              onChange={(e) => handleYearChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              disabled={loading}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <label
              htmlFor="month-select"
              className="block text-sm font-medium text-gray-700 mb-1 px-3 mt-2"
            >
              Month
            </label>
            <select
              value={localMonth}
              onChange={(e) => handleMonthChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={loading}
            >
              <option value="">All Months</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Unified Chart Wrapper (Fixed Height) */}
      <div
        className="flex items-center justify-center w-full"
        style={{ height: "400px" }}
      >
        {loading ? (
          <div className="text-gray-500">Loading chart data...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : series.length > 0 ? (
          <ReactApexChart
            options={chartOptions}
            series={series}
            type="donut"
            width="100%"
            height="100%"
          />
        ) : (
          <div className="text-gray-500">No data available</div>
        )}
      </div>

      {/* Record Details Modal */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Meeting Details</Typography>
            <IconButton onClick={() => setModalOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {modalData.length > 0 ? (
            modalData.map((meeting, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {meeting.activity_type} Meeting - {meeting.dateOfMeeting}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  <Chip icon={<Map />} label={meeting.region} size="small" />
                  <Chip
                    icon={<Event />}
                    label={meeting.dateOfMeeting}
                    size="small"
                  />
                  <Chip
                    icon={<PieChartIcon />}
                    label={meeting.activity_type}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" paragraph>
                  <strong>Regional Head:</strong> {meeting.regional_head}
                </Typography>
                {meeting.state && (
                  <Typography variant="body2" paragraph>
                    <strong>State:</strong> {meeting.state}
                  </Typography>
                )}
                {meeting.district && (
                  <Typography variant="body2" paragraph>
                    <strong>District:</strong> {meeting.district}
                  </Typography>
                )}
                {meeting.short_description && (
                  <Typography variant="body2" paragraph>
                    <strong>Description:</strong> {meeting.short_description}
                  </Typography>
                )}
                {meeting.important_decision && (
                  <Typography variant="body2" paragraph>
                    <strong>Important Decision:</strong>{" "}
                    {meeting.important_decision}
                  </Typography>
                )}
                {meeting.activity_details && (
                  <div className="activity-details-content">
                    <Typography variant="body2" paragraph>
                      <strong>Activity Details:</strong>
                    </Typography>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(meeting.activity_details),
                      }}
                    />
                  </div>
                )}
                {meeting.url && (
                  <Typography variant="body2">
                    <strong>URL:</strong>{" "}
                    <a
                      href={meeting.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {meeting.url}
                    </a>
                  </Typography>
                )}
              </Paper>
            ))
          ) : (
            <Typography>No meeting details available</Typography>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

PieChart.propTypes = {
  years: PropTypes.array.isRequired,
  months: PropTypes.array.isRequired,
  defaultYear: PropTypes.string,
  defaultMonth: PropTypes.string,
  userRole: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default PieChart;
