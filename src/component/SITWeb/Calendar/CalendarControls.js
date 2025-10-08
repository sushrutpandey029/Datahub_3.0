// components/CalendarControls.js
import React from "react";
import { renderMonthOptions, renderYearOptions } from "./utils/calendarHelpers";

const CalendarControls = ({
  currentDate,
  handleMonthChange,
  handleYearChange,
  navigateDate,
  downloadAllMeetings,
  handlePrintCalendar,
  handleFileUpload,
  fileInputRef,
  handleFileChange
}) => {
  return (
    <div className="mfin-calendar-controls" style={{ marginBottom: "20px" }}>
      <div className="mfin-calendar-navigation-group">
        <div className="mfin-calendar-date-selectors">
          <button
            className="mfin-calendar-today"
            onClick={() => navigateDate("today")}
          >
            Today
          </button>

          <select
            value={currentDate.getMonth()}
            onChange={handleMonthChange}
            className="mfin-calendar-selector"
          >
            {renderMonthOptions()}
          </select>

          <select
            value={currentDate.getFullYear()}
            onChange={handleYearChange}
            className="mfin-calendar-selector"
          >
            {renderYearOptions()}
          </select>
        </div>
      </div>

      <div className="mfin-calendar-button-group">
        <button
          className="mfin-calendar-button"
          onClick={downloadAllMeetings}
        >
          Download All Meetings
        </button>
        <button
          className="mfin-calendar-button"
          onClick={handlePrintCalendar}
        >
          Print Calendar
        </button>
        <button
          className="mfin-calendar-button"
          onClick={handleFileUpload}
        >
          Upload File
        </button>
        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default CalendarControls;