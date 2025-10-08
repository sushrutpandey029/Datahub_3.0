// components/WeekView.js
import React from "react";
import { WEEKDAYS, getDayDisplay, getEventColor, isSameDate } from "./utils/calendarHelpers";

const WeekView = ({ currentDate, meetings, selectedDay, handleDayClick }) => {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  const daysColumns = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    const dateStr = date.toISOString().split("T")[0];
    const dayEvents = meetings.filter((meeting) => {
      const meetingDateStr = meeting.start.split("T")[0];
      return meetingDateStr === dateStr;
    });

    const isToday = date.toDateString() === new Date().toDateString();
    const isSelected = selectedDay && isSameDate(date, selectedDay);
    const isCurrentMonth = date.getMonth() === currentDate.getMonth();

    daysColumns.push(
      <div
        key={i}
        className={`week-day-column ${isToday ? "today" : ""} ${
          isSelected ? "selected" : ""
        } ${!isCurrentMonth ? "other-month" : ""}`}
        onClick={() => handleDayClick(date)}
      >
        <div className="week-day-header">
          <div className="weekday-name">{WEEKDAYS[i]}</div>
          <div className="weekday-date">
            {getDayDisplay(date, currentDate.getMonth())}
          </div>
        </div>
        <div className="week-day-events">
          {dayEvents.length > 0 ? (
            dayEvents.map((event, idx) => (
              <div
                key={idx}
                className="week-event"
                style={{ backgroundColor: getEventColor(event.title) }}
                title={`${event.title} - ${event.extendedProps.state}`}
              >
                {event.title} - {event.extendedProps.state}
              </div>
            ))
          ) : (
            <div className="no-events">No meetings</div>
          )}
        </div>
      </div>
    );
  }

  return <div className="calendar-view week-view active">{daysColumns}</div>;
};

export default WeekView;