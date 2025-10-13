import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./calandernew.css";
import { BaseUrl, uploadCalendarCSV, calendarAllMeetings } from "../../url/url";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Import utilities
import {
  navigateDate as navigateDateHelper,
  getEventColor,
} from "./utils/calendarHelpers";
import { downloadAllMeetings } from "./utils/downloadUtils";
import { handlePrintCalendar } from "./utils/printUtils";

// Import components
import CalendarControls from "./CalendarControls";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";
import MeetingModal from "./MeetingModal";

const Calendar = () => {
  // State management
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMeetings, setSelectedMeetings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentView, setCurrentView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [viewHistory, setViewHistory] = useState([]);
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const appNavigate = useNavigate();
  const calendarRef = useRef(null);

  // Data fetching
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/${calendarAllMeetings}`);
        if (response.data.success) {
          const processed = response.data.meetings.map((meeting, idx) => {
            const eventDate = new Date(
              meeting.dateOfMeeting || meeting.created_at
            );
            const today = new Date();
            let className = "";

            if (eventDate.toDateString() === today.toDateString()) {
              className = "event-today";
            } else if (eventDate < today) {
              className = "event-past";
            } else {
              className = "event-future";
            }

            return {
              id: idx,
              title: meeting.activity_type,
              start: meeting.dateOfMeeting || meeting.created_at,
              extendedProps: {
                regional_head: meeting.regional_head,
                activity_type: meeting.activity_type,
                region: meeting.region,
                state: meeting.state,
                district: meeting.district,
                village: meeting.village,
                placeOfMeeting: meeting.placeOfMeeting,
                dateOfMeeting: meeting.dateOfMeeting,
                quarter: meeting.quarter,
              },
              className,
            };
          });
          console.log("processed", processed);
          setMeetings(processed);
        } else {
          setError("Failed to fetch meetings.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  // Event handlers
  const handleDateClick = (dateStr) => {
    // Add timezone offset to handle UTC dates correctly
    const clickedDate = new Date(dateStr + "T00:00:00"); // Force local time
    const selected = meetings.filter((meeting) => {
      const meetingDate = new Date(meeting.start);

      // Compare year, month, day directly
      return (
        meetingDate.getFullYear() === clickedDate.getFullYear() &&
        meetingDate.getMonth() === clickedDate.getMonth() &&
        meetingDate.getDate() === clickedDate.getDate()
      );
    });

    setSelectedMeetings(selected);
    setShowModal(true);
  };

  const handleDayClick = (date) => {
    setViewHistory((prev) => [
      ...prev,
      { view: currentView, date: currentDate, selectedDay },
    ]);
    setCurrentDate(new Date(date));
    setCurrentView("day");
    setSelectedDay(date);
  };

  const handleViewChange = (viewType) => {
    setViewHistory((prev) => [
      ...prev,
      { view: currentView, date: currentDate, selectedDay },
    ]);

    if (viewType === "week") {
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const startOfFirstWeek = new Date(firstDayOfMonth);
      startOfFirstWeek.setDate(
        firstDayOfMonth.getDate() - firstDayOfMonth.getDay()
      );
      setCurrentDate(startOfFirstWeek);
    } else if (viewType === "month") {
      setSelectedDay(null);
    }

    setCurrentView(viewType);
  };

  const handleBackNavigation = () => {
    if (viewHistory.length > 0) {
      const previousState = viewHistory[viewHistory.length - 1];
      setCurrentView(previousState.view);
      setCurrentDate(previousState.date);
      setSelectedDay(previousState.selectedDay);
      setViewHistory((prev) => prev.slice(0, -1));
    } else {
      appNavigate(-1);
    }
  };

  const handleBackToIndia = () => {};

  // Add this to your main component or layout
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        // Call your custom print function instead
        handlePrintCalendar(currentView, currentDate, meetings, getEventColor);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentView, currentDate, meetings, getEventColor]);

  const navigateDate = (action) => {
    const newDate = navigateDateHelper(action, currentDate, currentView);
    if (action === "today") {
      setCurrentDate(newDate);
      setSelectedDay(null);
      setViewHistory([]);
    } else {
      setCurrentDate(newDate);
    }
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    const newDate = new Date(currentDate);
    newDate.setMonth(newMonth);
    setCurrentDate(newDate);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    const newDate = new Date(currentDate);
    newDate.setFullYear(newYear);
    setCurrentDate(newDate);
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${BaseUrl}/${uploadCalendarCSV}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Error uploading file");
    }
  };

  // Render loading and error states
  if (loading)
    return (
      <div className="mfin-calendar-loading-container">
        <div className="mfin-calendar-loading-message">Loading ...</div>
      </div>
    );

  if (error)
    return (
      <div className="mfin-calendar-error-container">
        <div className="mfin-calendar-error-message">Error: {error}</div>
      </div>
    );

  return (
    <div className="AddMeeting">
      <div className="container mt-5">
        <div className="row g-4 mt-5 background-color-calander-tab">
          <div className="col-sm-12 mt-0">
            <div className="mfin-calendar-container mt-0">
              {/* Back button + CalendarControls in same row */}
              <div className="d-flex align-items-center justify-content-start gap-3 mb-3">
                <button
                  onClick={() => navigate(-1)}
                  className="btn  d-flex align-items-center"
                  style={{ borderRadius: "50%", width: 40, height: 40 }}
                >
                  <ArrowBackIcon />
                </button>

                <div className="flex-grow-1">
                  <CalendarControls
                    currentDate={currentDate}
                    handleMonthChange={handleMonthChange}
                    handleYearChange={handleYearChange}
                    navigateDate={navigateDate}
                    downloadAllMeetings={() => downloadAllMeetings(meetings)}
                    handlePrintCalendar={() =>
                      handlePrintCalendar(
                        currentView,
                        currentDate,
                        meetings,
                        getEventColor
                      )
                    }
                    handleFileUpload={handleFileUpload}
                    fileInputRef={fileInputRef}
                    handleFileChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Calendar Header */}
              <div className="calendar-header">
                <div className="view-controls">
                  <button
                    className={`btn btn-view ${
                      currentView === "month" ? "active" : ""
                    }`}
                    onClick={() => handleViewChange("month")}
                  >
                    Month
                  </button>
                  <button
                    className={`btn btn-view ${
                      currentView === "week" ? "active" : ""
                    }`}
                    onClick={() => handleViewChange("week")}
                  >
                    Week
                  </button>
                  <button
                    className={`btn btn-view ${
                      currentView === "day" ? "active" : ""
                    }`}
                    onClick={() =>
                      currentView !== "day" && handleViewChange("day")
                    }
                  >
                    Day
                  </button>
                </div>
              </div>

              {/* Calendar Container */}
              <div className="calendar-container" ref={calendarRef}>
                {currentView === "month" && (
                  <MonthView
                    currentDate={currentDate}
                    meetings={meetings}
                    handleDateClick={handleDateClick}
                    setSelectedMeetings={setSelectedMeetings}
                    setShowModal={setShowModal}
                  />
                )}
                {currentView === "week" && (
                  <WeekView
                    currentDate={currentDate}
                    meetings={meetings}
                    selectedDay={selectedDay}
                    handleDayClick={handleDayClick}
                  />
                )}
                {currentView === "day" && (
                  <DayView
                    currentDate={currentDate}
                    meetings={meetings}
                    handleBackNavigation={handleBackNavigation}
                    viewHistory={viewHistory}
                  />
                )}
              </div>

              <MeetingModal
                showModal={showModal}
                selectedMeetings={selectedMeetings}
                setShowModal={setShowModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
