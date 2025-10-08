// components/DayView.js
import React from "react";
import { getEventColor, isSameDate } from "./utils/calendarHelpers";
import { downloadMeetingDetails } from "./utils/downloadUtils";

const DayView = ({ currentDate, meetings, handleBackNavigation, viewHistory }) => {
  const dayEvents = meetings.filter((meeting) => {
    const meetingDate = new Date(meeting.start);
    return isSameDate(meetingDate, currentDate);
  });

  dayEvents.sort((a, b) => {
    return new Date(a.start) - new Date(b.start);
  });

  if (dayEvents.length === 0) {
    return (
      <div className="calendar-view day-view active">
        <div className="day-header">
          {currentDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <div className="no-events-day">
          <p>No meetings scheduled for this day</p>
        </div>
        <div className="day-view-back">
          <button
            className="btn btn-back-to-week"
            onClick={handleBackNavigation}
          >
            <i className="fas fa-arrow-left"></i> Back to{" "}
            {viewHistory.length > 0
              ? viewHistory[viewHistory.length - 1].view
              : "Week"}{" "}
            View
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-view day-view active">
      <div className="day-header">
        {currentDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>
      <div className="day-events-list">
        <h3 className="day-events-title">Meetings for the day:</h3>
        {dayEvents.map((event, idx) => {
          const eventDate = new Date(event.start);
          return (
            <div
              key={idx}
              className="day-event-item"
              style={{
                borderLeft: `5px solid ${getEventColor(event.title)}`,
              }}
            >
              <div className="event-time">
                {eventDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="event-details">
                <div className="event-title">{event.title}</div>
                <div className="event-location">
                  {event.extendedProps.state} - {event.extendedProps.region}
                  {event.extendedProps.district &&
                    ` - ${event.extendedProps.district}`}
                </div>
              </div>
              <div className="event-actions">
                <button
                  className="btn-download-event"
                  onClick={() => downloadMeetingDetails(event)}
                  title="Download meeting details"
                >
                  <i className="fas fa-download"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="day-view-back">
        <button
          className="btn btn-back-to-week"
          onClick={handleBackNavigation}
        >
          <i className="fas fa-arrow-left"></i> Back to{" "}
          {viewHistory.length > 0
            ? viewHistory[viewHistory.length - 1].view
            : "Week"}{" "}
          View
        </button>
      </div>
    </div>
  );
};

export default DayView;