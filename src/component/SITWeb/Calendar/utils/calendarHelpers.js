// utils/calendarHelpers.js
import React from "react"

// Constants
export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const ACTIVITY_COLORS = {
  // Define your activity colors here
  // Example: "Meeting": "#2B60AD"
};

// Date Helper Functions
export const isSameDate = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.toDateString() === d2.toDateString();
};

export const getEventColor = (activityType) => {
  return ACTIVITY_COLORS[activityType] || "#f7f8f9ff";
};

export const getDayDisplay = (date, currentMonth) => {
  const day = date.getDate();
  const month = date.getMonth();

  if (day === 1 || month !== currentMonth) {
    const monthName = date.toLocaleDateString("en-US", { month: "short" });
    return `${day} ${monthName}`;
  }

  return day.toString();
};

// Navigation Helper Functions
export const getCurrentDateRange = (currentView, currentDate) => {
  if (currentView === "month") {
    return currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  } else if (currentView === "week") {
    const start = new Date(currentDate);
    start.setDate(currentDate.getDate() - currentDate.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  } else {
    return currentDate.toLocaleDateString();
  }
};

export const navigateDate = (action, currentDate, currentView) => {
  const newDate = new Date(currentDate);

  switch (action) {
    case "prev":
      if (currentView === "month") {
        newDate.setMonth(currentDate.getMonth() - 1);
      } else if (currentView === "week") {
        newDate.setDate(currentDate.getDate() - 7);
      } else {
        newDate.setDate(currentDate.getDate() - 1);
      }
      break;
    case "next":
      if (currentView === "month") {
        newDate.setMonth(currentDate.getMonth() + 1);
      } else if (currentView === "week") {
        newDate.setDate(currentDate.getDate() + 7);
      } else {
        newDate.setDate(currentDate.getDate() + 1);
      }
      break;
    case "today":
      return new Date();
    default:
      break;
  }

  return newDate;
};

// UI Helper Functions
export const renderMonthOptions = () => {
  return Array.from({ length: 12 }, (_, i) => (
    <option key={i} value={i}>
      {new Date(0, i).toLocaleString("default", { month: "long" })}
    </option>
  ));
};

export const renderYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 1; i++) {
    years.push(i);
  }
  return years.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ));
};