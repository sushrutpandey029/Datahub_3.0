import React, { useEffect, useState, useCallback } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  Chip,
  Paper,
  Button,
} from "@mui/material";
import {
  Close,
  PieChart as PieChartIcon,
  Map,
  Event,
} from "@mui/icons-material";
import { BaseUrl, getBarChartDrillData } from "../../url/url";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BarChart = ({
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
  const [currentView, setCurrentView] = useState("month_wise_count");

  const API_URL = `${BaseUrl}/${getBarChartDrillData}`;

  // Sync with global defaults
  useEffect(() => {
    setLocalYear(defaultYear || "");
    setLocalMonth(defaultMonth || "");
  }, [defaultYear, defaultMonth]);

  // Fetch data when filters change or on mount
  useEffect(() => {
    if (localYear) {
      fetchData();
    }
  }, [localYear, localMonth]);

  // Fetch data based on current level and filters
  const fetchData = async (
    drilldownParams = null,
    isBackNavigation = false
  ) => {
    try {
      setLoading(true);
      setError(null);

      let params = {
        user_role: userRole,
        username: userName,
        year: localYear,
      };

      // Add additional parameters based on drilldown level
      if (drilldownParams) {
        const { level, value } = drilldownParams;

        if (level === "month") {
          params.month = value;
        } else if (level === "activity_type") {
          params.month = findInHistory("month") || localMonth;
          params.activity_type = value;
        } else if (level === "region") {
          params.month = findInHistory("month") || localMonth;
          params.activity_type = findInHistory("activity_type");
          params.region = value;
        } else if (level === "date") {
          params.month = findInHistory("month") || localMonth;
          params.activity_type = findInHistory("activity_type");
          params.region = findInHistory("region");
          params.dateOfMeeting = value;
          fetchRecordDetails(params);
          return;
        }
      } else if (localMonth) {
        // If no drilldown but we have a month filter
        params.month = localMonth;
      }

      console.log("API call params:", params);

      const response = await axios.get(API_URL, { params });
      console.log("API response:", response.data);

      if (response.data && response.data.success) {
        setData(response.data.data || []);
        setCurrentView(response.data.view || "month_wise_count");

        // Add to drilldown history if it's a drilldown action (not back navigation)
        if (drilldownParams && !isBackNavigation) {
          setDrilldownHistory((prev) => [
            ...prev,
            {
              level: drilldownParams.level,
              value: drilldownParams.value,
              view: response.data.view,
              data: response.data,
            },
          ]);
        } else if (!drilldownParams && !isBackNavigation) {
          // Reset history when starting a new query from the top
          setDrilldownHistory([]);
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

  // Helper function to find data in drilldown history
  const findInHistory = (level) => {
    for (let i = drilldownHistory.length - 1; i >= 0; i--) {
      if (drilldownHistory[i].level === level) {
        return drilldownHistory[i].value;
      }
    }
    return null;
  };

  // Fetch record details for the modal
  const fetchRecordDetails = async (params) => {
    try {
      setLoading(true);

      console.log("Fetching record details with params:", params);

      const response = await axios.get(API_URL, { params });

      if (response.data && response.data.success) {
        setModalData(response.data.data || []);
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching record details:", error);
      setError("Failed to load record details");
    } finally {
      setLoading(false);
    }
  };

  // Handle chart click event for drilldown
  const handleChartClick = (event, chartContext, config) => {
    const clickedIndex = config.dataPointIndex;
    const clickedValue = categories[clickedIndex];

    if (!clickedValue) return;

    let drilldownParams = null;

    switch (currentView) {
      case "month_wise_count":
        drilldownParams = { level: "month", value: clickedValue };
        break;
      case "month_activity_summary":
        drilldownParams = { level: "activity_type", value: clickedValue };
        break;
      case "region_count":
        drilldownParams = { level: "region", value: clickedValue };
        break;
      case "date_list_with_count":
        drilldownParams = { level: "date", value: clickedValue };
        break;
      default:
        return;
    }

    if (drilldownParams) {
      fetchData(drilldownParams);
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    if (drilldownHistory.length > 0) {
      const newHistory = [...drilldownHistory];
      const removedItem = newHistory.pop();

      setDrilldownHistory(newHistory);

      if (newHistory.length === 0) {
        // If we're back to the top level, refetch with current filters
        fetchData(null, true);
      } else {
        // Otherwise, refetch with the previous level's data
        const previousLevel = newHistory[newHistory.length - 1];
        fetchData(
          { level: previousLevel.level, value: previousLevel.value },
          true
        );
      }
    }
  };

  // Reset to initial view
  const resetToInitial = () => {
    setDrilldownHistory([]);
    setCurrentView("month_wise_count");
    fetchData();
  };

  // Prepare chart data based on current view
  const getChartData = () => {
    let categories = [];
    let seriesData = [];
    let title = "";

    if (data && data.length > 0) {
      switch (currentView) {
        case "month_wise_count":
          categories = data.map((item) => item.month_name || item.month);
          seriesData = data.map((item) => item.total);
          title = `Meetings in ${localYear}`;
          break;
        case "month_activity_summary":
          categories = data.map((item) => item.activity_type);
          seriesData = data.map((item) => item.total);
          const month = findInHistory("month") || localMonth;
          title = `${month} Activities`;
          break;
        case "region_count":
          categories = data.map((item) => item.region);
          seriesData = data.map((item) => item.total);
          const activityType = findInHistory("activity_type");
          title = `${activityType} - Regions`;
          break;
        case "date_list_with_count":
          categories = data.map((item) => item.dateOfMeeting);
          seriesData = data.map((item) => item.total);
          const region = findInHistory("region");
          title = `${region} - Meeting Dates`;
          break;
        default:
          categories = [];
          seriesData = [];
          title = "Meeting Data";
      }
    }

    return { categories, seriesData, title };
  };

  const { categories, seriesData, title } = getChartData();

  const chartOptions = {
    chart: {
      type: "bar",
      height: 400,
      toolbar: { show: true },
      events: {
        dataPointSelection: handleChartClick,
      },
    },
    grid: { show: false },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
        dataLabels: { position: "top" },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: { fontSize: "12px", colors: ["#000"] },
    },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories,
      labels: { style: { fontSize: "12px" }, rotate: -45 },
    },
    yaxis: { show: false },
    fill: { opacity: 1 },
    tooltip: {
      y: { formatter: (val) => `${val} meeting${val !== 1 ? "s" : ""}` },
    },
    colors: ["#2B60AD"],
    title: {
      text: title,
      align: "center",
      style: { fontSize: "16px" },
    },
  };

  // Handle year change
  const handleYearChange = (year) => {
    setLocalYear(year);
    resetToInitial();
  };

  // Handle month changeF
  const handleMonthChange = (month) => {
    setLocalMonth(month);
    resetToInitial();
  };

  // Helper function for breadcrumb labels
  const getBreadcrumbLabel = (item) => {
    switch (item.level) {
      case "month":
        return item.value;
      case "activity_type":
        return item.value;
      case "region":
        return item.value;
      case "date":
        return item.value;
      default:
        return "Data";
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      {/* Header with filters and back button */}
      <div className="flex justify-between items-center mb-4">
        <div className="mb-4 flex flex-wrap md:flex-nowrap gap-4 items-end">
          <div className="w-32">
            {drilldownHistory.length > 0 && (
              <Button
                // variant="outlined"
                onClick={handleBackClick}
                disabled={loading}
              >
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

      {/* Chart Wrapper (Fixed Height) */}
      <div
        className="flex items-center justify-center w-full"
        style={{ height: "400px" }}
      >
        {loading ? (
          <div className="text-gray-500">Loading chart data...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : seriesData.length > 0 ? (
          <ReactApexChart
            options={chartOptions}
            series={[{ name: "Meetings", data: seriesData }]}
            type="bar"
            width="100%"
            height="100%"
          />
        ) : (
          <div className="text-gray-500">No data available</div>
        )}
      </div>

      {/* Meeting Details Modal */}
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

BarChart.propTypes = {
  years: PropTypes.array.isRequired,
  months: PropTypes.array.isRequired,
  defaultYear: PropTypes.string,
  defaultMonth: PropTypes.string,
  userRole: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default BarChart;
