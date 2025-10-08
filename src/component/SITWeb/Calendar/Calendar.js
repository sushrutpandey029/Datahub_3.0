// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";
// // import "./Calendar.css";
// import "./calandernew.css";
// import { BaseUrl, uploadCalendarCSV, calendarAllMeetings } from "../../url/url";

// const Calendar = () => {
//   // State management
//   const [meetings, setMeetings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedMeetings, setSelectedMeetings] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [currentView, setCurrentView] = useState("month");
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [viewHistory, setViewHistory] = useState([]);

//   const fileInputRef = useRef(null);

//   // Hooks and refs
//   const appNavigate = useNavigate();
//   const calendarRef = useRef(null);

//   // Constants
//   const ACTIVITY_COLORS = {
//     // Define your activity colors here
//     // Example: "Meeting": "#2B60AD"
//   };

//   const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   // Data fetching
//   useEffect(() => {
//     const fetchMeetings = async () => {
//       try {
//         const response = await axios.get(`${BaseUrl}/${calendarAllMeetings}`);

//         if (response.data.success) {
//           const processed = response.data.meetings.map((meeting, idx) => {
//             const eventDate = new Date(
//               meeting.dateOfMeeting || meeting.created_at
//             );
//             const today = new Date();
//             let className = "";

//             if (eventDate.toDateString() === today.toDateString()) {
//               className = "event-today";
//             } else if (eventDate < today) {
//               className = "event-past";
//             } else {
//               className = "event-future";
//             }

//             return {
//               id: idx,
//               title: meeting.activity_type,
//               start: meeting.dateOfMeeting || meeting.created_at,
//               extendedProps: {
//                 regional_head: meeting.regional_head,
//                 activity_type: meeting.activity_type,
//                 region: meeting.region,
//                 state: meeting.state,
//                 district: meeting.district,
//                 village: meeting.village,
//                 placeOfMeeting: meeting.placeOfMeeting,
//                 dateOfMeeting: meeting.dateOfMeeting,
//                 quarter: meeting.quarter,
//               },
//               className,
//             };
//           });

//           setMeetings(processed);
//         } else {
//           setError("Failed to fetch meetings.");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMeetings();
//   }, []);

//   // Helper functions
//   const isSameDate = (date1, date2) => {
//     const d1 = new Date(date1);
//     const d2 = new Date(date2);
//     return d1.toDateString() === d2.toDateString();
//   };

//   const getEventColor = (activityType) => {
//     return ACTIVITY_COLORS[activityType] || "#f7f8f9ff";
//   };

//   // Event handlers
//   const handleDateClick = (dateStr) => {
//     const selected = meetings.filter(
//       (meeting) => meeting.start.split("T")[0] === dateStr
//     );
//     setSelectedMeetings(selected);
//     setShowModal(true);
//   };

//   const handleDayClick = (date) => {
//     setViewHistory((prev) => [
//       ...prev,
//       { view: currentView, date: currentDate, selectedDay },
//     ]);
//     setCurrentDate(new Date(date));
//     setCurrentView("day");
//     setSelectedDay(date);
//   };

//   // const handleViewChange = (viewType) => {
//   //   setViewHistory((prev) => [
//   //     ...prev,
//   //     { view: currentView, date: currentDate, selectedDay },
//   //   ]);
//   //   setCurrentView(viewType);
//   //   if (viewType === "month") {
//   //     setSelectedDay(null);
//   //   }
//   // };

//   const handleViewChange = (viewType) => {
//     setViewHistory((prev) => [
//       ...prev,
//       { view: currentView, date: currentDate, selectedDay },
//     ]);

//     if (viewType === "week") {
//       // Set to first week of current month (Sunday to Saturday)
//       const firstDayOfMonth = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth(),
//         1
//       );
//       const startOfFirstWeek = new Date(firstDayOfMonth);
//       // Find the Sunday of the week containing the 1st of the month
//       startOfFirstWeek.setDate(
//         firstDayOfMonth.getDate() - firstDayOfMonth.getDay()
//       );
//       setCurrentDate(startOfFirstWeek);
//     } else if (viewType === "month") {
//       setSelectedDay(null);
//     }

//     setCurrentView(viewType);
//   };

//   const handleBackNavigation = () => {
//     if (viewHistory.length > 0) {
//       const previousState = viewHistory[viewHistory.length - 1];
//       setCurrentView(previousState.view);
//       setCurrentDate(previousState.date);
//       setSelectedDay(previousState.selectedDay);
//       setViewHistory((prev) => prev.slice(0, -1));
//     } else {
//       appNavigate(-1);
//     }
//   };

//   const navigateDate = (action) => {
//     const newDate = new Date(currentDate);

//     switch (action) {
//       case "prev":
//         if (currentView === "month") {
//           newDate.setMonth(currentDate.getMonth() - 1);
//         } else if (currentView === "week") {
//           newDate.setDate(currentDate.getDate() - 7);
//         } else {
//           newDate.setDate(currentDate.getDate() - 1);
//         }
//         break;
//       case "next":
//         if (currentView === "month") {
//           newDate.setMonth(currentDate.getMonth() + 1);
//         } else if (currentView === "week") {
//           newDate.setDate(currentDate.getDate() + 7);
//         } else {
//           newDate.setDate(currentDate.getDate() + 1);
//         }
//         break;
//       case "today":
//         setCurrentDate(new Date());
//         setSelectedDay(null);
//         setViewHistory([]);
//         return;
//       default:
//         break;
//     }

//     setCurrentDate(newDate);
//   };

//   const handleMonthChange = (e) => {
//     const newMonth = parseInt(e.target.value);
//     const newDate = new Date(currentDate);
//     newDate.setMonth(newMonth);
//     setCurrentDate(newDate);
//   };

//   const handleYearChange = (e) => {
//     const newYear = parseInt(e.target.value);
//     const newDate = new Date(currentDate);
//     newDate.setFullYear(newYear);
//     setCurrentDate(newDate);
//   };

//   // Download functions
//   const downloadMeetingDetails = (meeting) => {
//     const meetingText = `Meeting Details:
// ID: ${meeting.id}
// Regional Head: ${meeting.extendedProps.regional_head}
// Activity Type: ${meeting.title}
// Region: ${meeting.extendedProps.region}
// State: ${meeting.extendedProps.state}
// District: ${meeting.extendedProps.district}
// Village: ${meeting.extendedProps.village}
// Place of Meeting: ${meeting.extendedProps.placeOfMeeting}
// Date of Meeting: ${meeting.start}
// Quarter: ${meeting.extendedProps.quarter}`;

//     const element = document.createElement("a");
//     const file = new Blob([meetingText], { type: "text/plain" });
//     element.href = URL.createObjectURL(file);
//     element.download = `meeting-${meeting.id}.txt`;
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//   };

//   const downloadAllMeetings = () => {
//     const excelData = meetings.map((meeting) => ({
//       "Regional Head": meeting.extendedProps.regional_head,
//       "Activity Type": meeting.title,
//       Region: meeting.extendedProps.region,
//       State: meeting.extendedProps.state,
//       District: meeting.extendedProps.district,
//       Village: meeting.extendedProps.village,
//       "Place of Meeting": meeting.extendedProps.placeOfMeeting,
//       "Date of Meeting": meeting.start,
//       Quarter: meeting.extendedProps.quarter,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(excelData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Meetings");
//     XLSX.writeFile(workbook, "all-meetings.xlsx", { compression: true });
//   };

//   // UI helper functions
//   const renderMonthOptions = () => {
//     return Array.from({ length: 12 }, (_, i) => (
//       <option key={i} value={i}>
//         {new Date(0, i).toLocaleString("default", { month: "long" })}
//       </option>
//     ));
//   };

//   const renderYearOptions = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear - 5; i <= currentYear + 1; i++) {
//       years.push(i);
//     }
//     return years.map((year) => (
//       <option key={year} value={year}>
//         {year}
//       </option>
//     ));
//   };

//   const getCurrentDateRange = () => {
//     if (currentView === "month") {
//       return currentDate.toLocaleDateString("en-US", {
//         month: "long",
//         year: "numeric",
//       });
//     } else if (currentView === "week") {
//       const start = new Date(currentDate);
//       start.setDate(currentDate.getDate() - currentDate.getDay());
//       const end = new Date(start);
//       end.setDate(start.getDate() + 6);
//       return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
//     } else {
//       return currentDate.toLocaleDateString();
//     }
//   };

//   const handlePrintCalendar = () => {
//     const printWindow = window.open("", "_blank");
//     const printDocument = printWindow.document;

//     printDocument.write(`
//     <html>
//       <head>
//         <title>Calendar Print</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             margin: 20px;
//             color: #000;
//           }
//           .print-header {
//             text-align: center;
//             margin-bottom: 20px;
//             border-bottom: 2px solid #000;
//             padding-bottom: 10px;
//           }
//           .calendar-grid {
//             display: grid;
//             grid-template-columns: repeat(7, 1fr);
//             gap: 1px;
//             background: #04070aff;
//           }
//           .calendar-day {
//             background: white;
//             min-height: 100px;
//             padding: 5px;
//             border: 1px solid #ccc;
//           }
//           .day-number {
//             font-weight: bold;
//             margin-bottom: 5px;
//           }
//           .event-dot {
//             padding: 2px 4px;
//             margin: 2px 0;
//             border-radius: 3px;
//             font-size: 10px;
//             color: #000 !important; /* Force black text */
//           }
//           .weekday {
//             background: #f0f0f0;
//             padding: 10px;
//             text-align: center;
//             font-weight: bold;
//             border: 1px solid #ccc;
//           }
//           .today {
//             background: #f0f7ff !important;
//             border: 2px solid #2B60AD !important;
//           }
//           .other-month {
//             background: #f8f8f8;
//             color: #999;
//           }
//           @media print {
//             body { margin: 0; }
//             .calendar-day { page-break-inside: avoid; }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="print-header">
//           <h1>Calendar - ${getCurrentDateRange()}</h1>
//           <p>Printed on ${new Date().toLocaleDateString()}</p>
//         </div>
//         <div class="calendar-print-view">
//   `);

//     // Add weekday headers
//     printDocument.write('<div class="calendar-grid">');
//     WEEKDAYS.forEach((day) => {
//       printDocument.write(`<div class="weekday">${day}</div>`);
//     });

//     // Add calendar days
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const startDate = new Date(firstDay);
//     startDate.setDate(startDate.getDate() - firstDay.getDay());

//     for (let i = 0; i < 42; i++) {
//       const date = new Date(startDate);
//       date.setDate(startDate.getDate() + i);
//       const dateStr = date.toISOString().split("T")[0];
//       const dayEvents = meetings.filter(
//         (meeting) => meeting.start.split("T")[0] === dateStr
//       );

//       const isToday = date.toDateString() === new Date().toDateString();
//       const isCurrentMonth = date.getMonth() === month;

//       printDocument.write(`
//       <div class="calendar-day ${!isCurrentMonth ? "other-month" : ""} ${
//         isToday ? "today" : ""
//       }">
//         <div class="day-number">${date.getDate()}</div>
//     `);

//       // Show ALL events without truncation
//       dayEvents.forEach((event) => {
//         const color = getEventColor(event.title);
//         printDocument.write(`
//         <div class="event-dot" style="background-color: ${color}; color: #000 !important;">
//           ${event.title} - ${event.extendedProps.state}
//         </div>
//       `);
//       });

//       if (dayEvents.length === 0) {
//         printDocument.write(`
//         <div class="event-dot" style="background-color: #f0f0f0; color: #000 !important;">
//           No meetings
//         </div>
//       `);
//       }

//       printDocument.write("</div>");
//     }

//     printDocument.write(`
//         </div>
//       </body>
//     </html>
//   `);

//     printDocument.close();
//     setTimeout(() => {
//       printWindow.print();
//     }, 250);
//   };

//   const getDayDisplay = (date, currentMonth) => {
//     const day = date.getDate();
//     const month = date.getMonth();
//     const year = date.getFullYear();

//     // Show month name for:
//     // - First day of any month
//     // - Last day of previous month (if visible)
//     // - Any day that's not in current month
//     if (day === 1 || month !== currentMonth) {
//       const monthName = date.toLocaleDateString("en-US", { month: "short" });
//       return `${day} ${monthName}`;
//     }

//     return day.toString();
//   };

//   // Calendar View Components
//   const MonthView = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();

//     const firstDay = new Date(year, month, 1);
//     const startDate = new Date(firstDay);
//     startDate.setDate(startDate.getDate() - firstDay.getDay());

//     // Create weekday headers
//     const weekdayHeaders = WEEKDAYS.map((day, index) => (
//       <div key={index} className="weekday">
//         {day}
//       </div>
//     ));

//     // Create calendar days
//     const days = [];
//     for (let i = 0; i < 35; i++) {
//       const date = new Date(startDate);
//       date.setDate(startDate.getDate() + i);

//       const dateStr = date.toISOString().split("T")[0];
//       const dayEvents = meetings.filter(
//         (meeting) => meeting.start.split("T")[0] === dateStr
//       );

//       const isToday = date.toDateString() === new Date().toDateString();
//       const isCurrentMonth = date.getMonth() === month;

//       days.push(
//         <div
//           key={i}
//           className={`calendar-day ${!isCurrentMonth ? "other-month" : ""} ${
//             isToday ? "today" : ""
//           }`}
//           onClick={() => handleDateClick(dateStr)}
//         >
//           {/* <div className="day-number">{date.getDate()}</div> */}
//           <div className="day-number">{getDayDisplay(date, month)}</div>
//           <div className="day-events">
//             {dayEvents.map((event, idx) => (
//               <div
//                 key={idx}
//                 className={`event-dot ${event.className}`}
//                 style={{
//                   backgroundColor: getEventColor(event.title),
//                   color: "#000000", // Force black text
//                 }}
//                 title={`${event.title} - ${event.extendedProps.state}`}
//               >
//                 {event.title} - {event.extendedProps.state}
//               </div>
//             ))}
//             {dayEvents.length === 0 && (
//               <div className="no-events">No meetings</div>
//             )}
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="calendar-view month-view active">
//         <div className="calendar-weekdays">{weekdayHeaders}</div>
//         <div className="calendar-grid">{days}</div>
//       </div>
//     );
//   };

//   //first function
//   // const WeekView = () => {
//   //   const startOfWeek = new Date(currentDate);
//   //   startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
//   //   const month = currentDate.getMonth();

//   //   const daysColumns = [];
//   //   for (let i = 0; i < 7; i++) {
//   //     const date = new Date(startOfWeek);
//   //     date.setDate(startOfWeek.getDate() + i);

//   //     const dateStr = date.toISOString().split("T")[0];
//   //     const dayEvents = meetings.filter((meeting) => {
//   //       const meetingDateStr = meeting.start.split("T")[0];
//   //       return meetingDateStr === dateStr;
//   //     });

//   //     const isToday = date.toDateString() === new Date().toDateString();
//   //     const isSelected = selectedDay && isSameDate(date, selectedDay);

//   //     daysColumns.push(
//   //       <div
//   //         key={i}
//   //         className={`week-day-column ${isToday ? "today" : ""} ${
//   //           isSelected ? "selected" : ""
//   //         }`}
//   //         onClick={() => handleDayClick(date)}
//   //       >
//   //         <div className="week-day-header">
//   //           <div className="weekday-name">{WEEKDAYS[i]}</div>
//   //           <div className="weekday-date"> {getDayDisplay(date, month)}</div>
//   //           {/* <div className="weekday-date">{date.getDate()}</div> */}
//   //         </div>
//   //         <div className="week-day-events">
//   //           {dayEvents.length > 0 ? (
//   //             dayEvents.map((event, idx) => (
//   //               <div
//   //                 key={idx}
//   //                 className="week-event"
//   //                 style={{ backgroundColor: getEventColor(event.title) }}
//   //                 title={`${event.title} - ${event.extendedProps.state}`}
//   //               >
//   //                 {event.title} - {event.extendedProps.state}
//   //               </div>
//   //             ))
//   //           ) : (
//   //             <div className="no-events">No meetings</div>
//   //           )}
//   //         </div>
//   //       </div>
//   //     );
//   //   }

//   //   return <div className="calendar-view week-view active">{daysColumns}</div>;
//   // };

//   const WeekView = () => {
//     // Always start from Sunday of the current week
//     const startOfWeek = new Date(currentDate);
//     startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

//     const daysColumns = [];
//     for (let i = 0; i < 7; i++) {
//       const date = new Date(startOfWeek);
//       date.setDate(startOfWeek.getDate() + i);

//       const dateStr = date.toISOString().split("T")[0];
//       const dayEvents = meetings.filter((meeting) => {
//         const meetingDateStr = meeting.start.split("T")[0];
//         return meetingDateStr === dateStr;
//       });

//       const isToday = date.toDateString() === new Date().toDateString();
//       const isSelected = selectedDay && isSameDate(date, selectedDay);
//       const isCurrentMonth = date.getMonth() === currentDate.getMonth();

//       daysColumns.push(
//         <div
//           key={i}
//           className={`week-day-column ${isToday ? "today" : ""} ${
//             isSelected ? "selected" : ""
//           } ${!isCurrentMonth ? "other-month" : ""}`}
//           onClick={() => handleDayClick(date)}
//         >
//           <div className="week-day-header">
//             <div className="weekday-name">{WEEKDAYS[i]}</div>
//             <div className="weekday-date">
//               {getDayDisplay(date, currentDate.getMonth())}
//             </div>
//           </div>
//           <div className="week-day-events">
//             {dayEvents.length > 0 ? (
//               dayEvents.map((event, idx) => (
//                 <div
//                   key={idx}
//                   className="week-event"
//                   style={{ backgroundColor: getEventColor(event.title) }}
//                   title={`${event.title} - ${event.extendedProps.state}`}
//                 >
//                   {event.title} - {event.extendedProps.state}
//                 </div>
//               ))
//             ) : (
//               <div className="no-events">No meetings</div>
//             )}
//           </div>
//         </div>
//       );
//     }

//     return <div className="calendar-view week-view active">{daysColumns}</div>;
//   };

//   const DayView = () => {
//     const dayEvents = meetings.filter((meeting) => {
//       const meetingDate = new Date(meeting.start);
//       return isSameDate(meetingDate, currentDate);
//     });

//     // Sort events by time
//     dayEvents.sort((a, b) => {
//       return new Date(a.start) - new Date(b.start);
//     });

//     // If no events, show message
//     if (dayEvents.length === 0) {
//       return (
//         <div className="calendar-view day-view active">
//           <div className="day-header">
//             {currentDate.toLocaleDateString("en-US", {
//               weekday: "long",
//               month: "long",
//               day: "numeric",
//               year: "numeric",
//             })}
//           </div>
//           <div className="no-events-day">
//             <p>No meetings scheduled for this day</p>
//           </div>
//           <div className="day-view-back">
//             <button
//               className="btn btn-back-to-week"
//               onClick={handleBackNavigation}
//             >
//               <i className="fas fa-arrow-left"></i> Back to{" "}
//               {viewHistory.length > 0
//                 ? viewHistory[viewHistory.length - 1].view
//                 : "Week"}{" "}
//               View
//             </button>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="calendar-view day-view active">
//         <div className="day-header">
//           {currentDate.toLocaleDateString("en-US", {
//             weekday: "long",
//             month: "long",
//             day: "numeric",
//             year: "numeric",
//           })}
//         </div>
//         <div className="day-events-list">
//           <h3 className="day-events-title">Meetings for the day:</h3>
//           {dayEvents.map((event, idx) => {
//             const eventDate = new Date(event.start);
//             return (
//               <div
//                 key={idx}
//                 className="day-event-item"
//                 style={{
//                   borderLeft: `5px solid ${getEventColor(event.title)}`,
//                 }}
//               >
//                 <div className="event-time">
//                   {eventDate.toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </div>
//                 <div className="event-details">
//                   <div className="event-title">{event.title}</div>
//                   <div className="event-location">
//                     {event.extendedProps.state} - {event.extendedProps.region}
//                     {event.extendedProps.district &&
//                       ` - ${event.extendedProps.district}`}
//                   </div>
//                 </div>
//                 <div className="event-actions">
//                   <button
//                     className="btn-download-event"
//                     onClick={() => downloadMeetingDetails(event)}
//                     title="Download meeting details"
//                   >
//                     <i className="fas fa-download"></i>
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <div className="day-view-back">
//           <button
//             className="btn btn-back-to-week"
//             onClick={handleBackNavigation}
//           >
//             <i className="fas fa-arrow-left"></i> Back to{" "}
//             {viewHistory.length > 0
//               ? viewHistory[viewHistory.length - 1].view
//               : "Week"}{" "}
//             View
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // open hidden file input on button click
//   const handleFileUpload = () => {
//     fileInputRef.current.click();
//   };
//   // handle file selection + upload immediately
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file); // field name "file" should match your API

//     try {
//       const response = await axios.post(
//         `${BaseUrl}/${uploadCalendarCSV}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       if (response.data.success) {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert("Error uploading file");
//     }
//   };

//   // Render loading and error states
//   if (loading)
//     return (
//       <div className="mfin-calendar-loading-container">
//         <div className="mfin-calendar-loading-message">Loading ...</div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="mfin-calendar-error-container">
//         <div className="mfin-calendar-error-message">Error: {error}</div>{" "}
//       </div>
//     );

//   // Main render
//   return (
//     <div className="AddMeeting">
//       <div className="container mt-5">
//         <div className="row g-4 mt-5 background-color-calander-tab">
//           <div className="col-sm-12 mt-0">
//             <div className="mfin-calendar-container mt-0">
//               {/* Calendar Controls */}
//               <div
//                 className="mfin-calendar-controls"
//                 style={{ marginBottom: "20px" }}
//               >
//                 <div className="mfin-calendar-navigation-group">
//                   <div className="mfin-calendar-date-selectors">
//                     <button
//                       className="mfin-calendar-today"
//                       onClick={() => navigateDate("today")}
//                     >
//                       Today
//                     </button>

//                     <select
//                       value={currentDate.getMonth()}
//                       onChange={handleMonthChange}
//                       className="mfin-calendar-selector"
//                     >
//                       {renderMonthOptions()}
//                     </select>

//                     <select
//                       value={currentDate.getFullYear()}
//                       onChange={handleYearChange}
//                       className="mfin-calendar-selector"
//                     >
//                       {renderYearOptions()}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="mfin-calendar-button-group">
//                   <button
//                     className="mfin-calendar-button"
//                     onClick={downloadAllMeetings}
//                   >
//                     Download All Meetings
//                   </button>
//                   <button
//                     className="mfin-calendar-button"
//                     onClick={handlePrintCalendar}
//                   >
//                     Print Calendar
//                   </button>
//                   <button
//                     className="mfin-calendar-button"
//                     onClick={handleFileUpload}
//                   >
//                     Upload File
//                   </button>
//                   {/* hidden input */}
//                   <input
//                     type="file"
//                     accept=".csv"
//                     ref={fileInputRef}
//                     style={{ display: "none" }}
//                     onChange={handleFileChange}
//                   />
//                 </div>
//               </div>

//               {/* Calendar Header */}
//               <div className="calendar-header">
//                 <div className="header-controls">
//                   <button
//                     className="btn btn-icon"
//                     onClick={() => navigateDate("prev")}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       fill="black"
//                       viewBox="0 0 320 512"
//                     >
//                       <path
//                         d="M224 96c8.188 0 16.38 3.125
//                                 22.62 9.375 12.5 12.5 12.5 32.75
//                                 0 45.25L141.2 256l105.4 105.4c12.5
//                                 12.5 12.5 32.75 0 45.25s-32.75
//                                 12.5-45.25 0l-128-128c-12.5-12.5
//                                 -12.5-32.75 0-45.25l128-128C207.6
//                                 99.13 215.8 96 224 96z"
//                       />
//                     </svg>
//                   </button>

//                   <h1 className="current-month">{getCurrentDateRange()}</h1>

//                   <button
//                     className="btn btn-icon"
//                     onClick={() => navigateDate("next")}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       fill="black"
//                       viewBox="0 0 320 512"
//                     >
//                       <path
//                         d="M96 96c-8.188 0-16.38 3.125-22.62
//                                   9.375-12.5 12.5-12.5 32.75 0
//                                   45.25L178.8 256l-105.4 105.4c-12.5
//                                   12.5-12.5 32.75 0 45.25s32.75
//                                   12.5 45.25 0l128-128c12.5-12.5
//                                   12.5-32.75 0-45.25l-128-128C112.4
//                                   99.13 104.2 96 96 96z"
//                       />
//                     </svg>
//                   </button>
//                 </div>

//                 <div className="view-controls">
//                   <button
//                     className={`btn btn-view ${
//                       currentView === "month" ? "active" : ""
//                     }`}
//                     onClick={() => handleViewChange("month")}
//                   >
//                     Month
//                   </button>
//                   <button
//                     className={`btn btn-view ${
//                       currentView === "week" ? "active" : ""
//                     }`}
//                     onClick={() => handleViewChange("week")}
//                   >
//                     Week
//                   </button>
//                   <button
//                     className={`btn btn-view ${
//                       currentView === "day" ? "active" : ""
//                     }`}
//                     onClick={() => {
//                       if (currentView !== "day") {
//                         handleViewChange("day");
//                       }
//                     }}
//                   >
//                     Day
//                   </button>
//                 </div>
//               </div>

//               {/* Calendar Container */}
//               <div className="calendar-container" ref={calendarRef}>
//                 {currentView === "month" && <MonthView />}
//                 {currentView === "week" && <WeekView />}
//                 {currentView === "day" && <DayView />}
//               </div>

//               {/* Meeting Details Modal */}
//               {showModal && selectedMeetings.length > 0 && (
//                 <div className="mfin-calendar-modal-overlay">
//                   <div className="mfin-calendar-modal-content mt-5">
//                     <div className="mfin-calendar-modal-header">
//                       <h4>
//                         Meetings on{" "}
//                         {(() => {
//                           const dateObj = new Date(selectedMeetings[0].start);
//                           return dateObj.toLocaleDateString("en-GB", {
//                             day: "numeric",
//                             month: "long",
//                             year: "numeric",
//                           });
//                         })()}
//                       </h4>
//                       <button
//                         className="mfin-calendar-close-button"
//                         onClick={() => setShowModal(false)}
//                       >
//                         ×
//                       </button>
//                     </div>
//                     <div className="mfin-calendar-modal-body">
//                       <table
//                         className="mfin-calendar-meeting-table"
//                         style={{
//                           border: "1px solid #ccc",
//                           width: "100%",
//                           borderCollapse: "collapse",
//                         }}
//                       >
//                         <thead>
//                           <tr>
//                             <th
//                               style={{
//                                 border: "1px solid #ccc",
//                                 padding: "8px",
//                                 textAlign: "left",
//                               }}
//                             >
//                               Activity Type
//                             </th>
//                             <th
//                               style={{
//                                 border: "1px solid #ccc",
//                                 padding: "8px",
//                                 textAlign: "left",
//                               }}
//                             >
//                               Date of Meeting
//                             </th>
//                             <th
//                               style={{
//                                 border: "1px solid #ccc",
//                                 padding: "8px",
//                                 textAlign: "left",
//                               }}
//                             >
//                               State
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {selectedMeetings.map((meeting, idx) => (
//                             <tr key={idx}>
//                               <td
//                                 style={{
//                                   border: "1px solid #ccc",
//                                   padding: "8px",
//                                 }}
//                               >
//                                 {meeting.title || "N/A"}
//                               </td>
//                               <td
//                                 style={{
//                                   border: "1px solid #ccc",
//                                   padding: "8px",
//                                 }}
//                               >
//                                 {new Date(meeting.start).toLocaleDateString(
//                                   "en-GB",
//                                   {
//                                     day: "numeric",
//                                     month: "long",
//                                     year: "numeric",
//                                   }
//                                 )}
//                               </td>
//                               <td
//                                 style={{
//                                   border: "1px solid #ccc",
//                                   padding: "8px",
//                                 }}
//                               >
//                                 {meeting.extendedProps.state || "N/A"}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Calendar;

// Calendar.js (Simplified)

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./calandernew.css";
import { BaseUrl, uploadCalendarCSV, calendarAllMeetings } from "../../url/url";

// Import utilities
import {
  navigateDate as navigateDateHelper,
  getCurrentDateRange,
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

              {/* Calendar Header */}
              <div className="calendar-header">
                <div className="header-controls">
                  <button
                    className="btn btn-icon"
                    onClick={() => navigateDate("prev")}
                  >
                    {/* SVG icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="black"
                      viewBox="0 0 320 512"
                    >
                      <path
                        d="M224 96c8.188 0 16.38 3.125
                                22.62 9.375 12.5 12.5 12.5 32.75
                                0 45.25L141.2 256l105.4 105.4c12.5
                                12.5 12.5 32.75 0 45.25s-32.75
                                12.5-45.25 0l-128-128c-12.5-12.5
                                -12.5-32.75 0-45.25l128-128C207.6
                                99.13 215.8 96 224 96z"
                      />
                    </svg>
                  </button>
                  <h1 className="current-month">
                    {getCurrentDateRange(currentView, currentDate)}
                  </h1>
                  <button
                    className="btn btn-icon"
                    onClick={() => navigateDate("next")}
                  >
                    {/* SVG icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="black"
                      viewBox="0 0 320 512"
                    >
                      <path
                        d="M96 96c-8.188 0-16.38 3.125-22.62
                                  9.375-12.5 12.5-12.5 32.75 0
                                  45.25L178.8 256l-105.4 105.4c-12.5
                                  12.5-12.5 32.75 0 45.25s32.75
                                  12.5 45.25 0l128-128c12.5-12.5
                                  12.5-32.75 0-45.25l-128-128C112.4
                                  99.13 104.2 96 96 96z"
                      />
                    </svg>
                  </button>
                </div>

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
