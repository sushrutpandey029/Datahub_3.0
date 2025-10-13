// // utils/printUtils.js
// import { WEEKDAYS } from "./calendarHelpers";

// export const handlePrintCalendar = (
//   currentView,
//   currentDate,
//   meetings,
//   getEventColor
// ) => {
//   const printWindow = window.open("", "_blank");
//   const printDocument = printWindow.document;

//   const getCurrentDateRange = (currentView, currentDate) => {
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

//   printDocument.write(`
//     <html>
//       <head>
//         <title>Calendar Print</title>
//         <style>
//           @page {
//             size: landscape;
//             margin: 0.2cm;
//           }

//           * {
//             box-sizing: border-box;
//           }

//           body {
//             font-family: Arial, sans-serif;
//             margin: 0;
//             padding: 0;
//             color: #000;
//             width: 100vw;
//             height: 100vh;
//             overflow: hidden;
//           }

//           .print-container {
//             width: 100%;
//             height: 100%;
//             padding: 10px;
//             display: flex;
//             flex-direction: column;
//           }

//           .print-header {
//             text-align: center;
//             margin-bottom: 10px;
//             border-bottom: 1px solid #000;
//             padding-bottom: 8px;
//             flex-shrink: 0;
//           }

//           .print-header h1 {
//             margin: 0;
//             font-size: 18px;
//             line-height: 1.2;
//           }

//           .print-header p {
//             margin: 2px 0 0 0;
//             font-size: 11px;
//           }

//           .calendar-container {
//             flex: 1;
//             overflow: hidden;
//           }

//           .calendar-grid {
//             display: grid;
//             grid-template-columns: repeat(7, 1fr);
//             gap: 0;
//             background: #e0e0e0;
//             font-size: 9px;
//             height: 100%;
//             width: 100%;
//             border-collapse: collapse;
//           }

//           .calendar-day {
//             background: white;
//             padding: 3px;
//             border: 1px solid #ccc;
//             min-height: 0;
//             display: flex;
//             flex-direction: column;
//           }

//           .day-number {
//             font-weight: bold;
//             margin-bottom: 2px;
//             font-size: 14px;
//             line-height: 1;
//             text-align: left;
//             padding-left: 2px;
//           }

//           .events-container {
//             flex: 1;
//             overflow: hidden;
//             display: flex;
//             flex-direction: column;
//             gap: 1px;
//           }

//           .event-item {
//             padding: 2px 1px;
//             margin: 0;
//             border-radius: 1px;
//             font-size: 8px;
//             color: #000 !important;
//             line-height: 1.1;
//             white-space: nowrap;
//             overflow: hidden;
//             text-overflow: ellipsis;
//             text-align: left;
//           }

//           // .weekday {
//           //   background: #f0f0f0;
//           //   padding: 2px 0;
//           //   text-align: center;
//           //   font-weight: bold;
//           //   border: 1px solid #ccc;
//           //   font-size: 10px;

//           // }

//           .weekday {
//             background: #f0f0f0;
//             padding: 1px 0; /* Reduced padding */
//             text-align: center;
//             font-weight: bold;
//             border: 1px solid #ccc;
//             font-size: 9px; /* Slightly smaller font */
//             line-height: 1; /* Tighter line height */
//             height: 16px; /* Fixed height */
//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }

//           .today {
//             background: #f0f7ff !important;
//             border: 1px solid #2B60AD !important;
//           }

//           .other-month {
//             background: #f8f8f8;
//             color: #999;
//           }

//           .more-events {
//             font-style: italic;
//             color: #666;
//             text-align: center;
//             background-color: #e0e0e0 !important;
//             font-size: 7px;
//             padding: 1px;
//           }

//           @media print {
//             @page {
//               size: landscape;
//               margin: 0.2cm;
//             }

//             body {
//               margin: 0;
//               padding: 0;
//               width: 100%;
//               height: 100%;
//             }

//             .print-container {
//               width: 100%;
//               height: 100%;
//               page-break-inside: avoid;
//             }

//             .calendar-grid {
//               page-break-inside: avoid;
//               break-inside: avoid;
//             }

//             .calendar-day {
//               page-break-inside: avoid;
//               break-inside: avoid;
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="print-container">
//           <div class="print-header">
//             <h1>Calendar - ${getCurrentDateRange(currentView, currentDate)}</h1>
//             <p>Printed on ${new Date().toLocaleDateString()}</p>
//           </div>
//           <div class="calendar-container">
//             <div class="calendar-grid">
//   `);

//   // Add weekday headers
//   WEEKDAYS.forEach((day) => {
//     printDocument.write(`<div class="weekday">${day}</div>`);
//   });

//   // Add calendar days - only 35 days (5 weeks)
//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth();
//   const firstDay = new Date(year, month, 1);
//   const startDate = new Date(firstDay);
//   startDate.setDate(startDate.getDate() - firstDay.getDay());

//   for (let i = 0; i < 35; i++) {
//     const date = new Date(startDate);
//     date.setDate(startDate.getDate() + i);
//     const dateStr = date.toISOString().split("T")[0];
//     const dayEvents = meetings.filter(
//       (meeting) => meeting.start.split("T")[0] === dateStr
//     );

//     const isToday = date.toDateString() === new Date().toDateString();
//     const isCurrentMonth = date.getMonth() === month;

//     printDocument.write(`
//       <div class="calendar-day ${!isCurrentMonth ? "other-month" : ""} ${
//       isToday ? "today" : ""
//     }">
//         <div class="day-number">${date.getDate()}</div>
//         <div class="events-container">
//     `);

//     // Show ALL events - no limit
//     if (dayEvents.length === 0) {
//     } else {
//       dayEvents.forEach((event) => {
//         const color = getEventColor(event.title);
//         printDocument.write(`
//           <div class="event-item" style="background-color: ${color};">
//             ${event.title} - ${event.extendedProps.state}
//           </div>
//         `);
//       });
//     }

//     printDocument.write(`
//         </div>
//       </div>
//     `);
//   }

//   printDocument.write(`
//           </div>
//         </div>
//       </body>
//     </html>
//   `);

//   printDocument.close();

//   // Wait for content to load then print
//   setTimeout(() => {
//     printWindow.focus();

//     // Add beforeprint event to ensure single page
//     printWindow.addEventListener("beforeprint", () => {
//       // Force single page by scaling if needed
//       const body = printWindow.document.body;
//       const container = printWindow.document.querySelector(".print-container");

//       if (container && container.scrollHeight > printWindow.innerHeight) {
//         const scale = printWindow.innerHeight / container.scrollHeight;
//         if (scale < 1) {
//           container.style.transform = `scale(${scale * 0.95})`;
//           container.style.transformOrigin = "top left";
//         }
//       }
//     });

//     printWindow.print();

//     // Close window after print (optional)
//     setTimeout(() => {
//       printWindow.close();
//     }, 1000);
//   }, 500);
// };

// utils/printUtils.js
import { WEEKDAYS } from "./calendarHelpers";

// Cache for event colors to avoid repeated calculations
const eventColorCache = new Map();

export const handlePrintCalendar = (
  currentView,
  currentDate,
  meetings,
  getEventColor
) => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    console.error("Failed to open print window. Please allow pop-ups.");
    return;
  }

  const printDocument = printWindow.document;

  // Memoized date range calculation
  const getCurrentDateRange = () => {
    const today = new Date();

    switch (currentView) {
      case "month":
        return currentDate.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });

      case "week":
        const start = new Date(currentDate);
        start.setDate(currentDate.getDate() - currentDate.getDay());
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;

      default:
        return currentDate.toLocaleDateString();
    }
  };

  // Optimized event grouping by date
  const eventsByDate = meetings.reduce((acc, meeting) => {
    const dateKey = meeting.start.split("T")[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(meeting);
    return acc;
  }, {});

  // Pre-calculate calendar dates
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });

  // Generate HTML content efficiently
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Calendar Print - ${getCurrentDateRange()}</title>
        <meta charset="UTF-8">
        <style>
          @page {
            size: landscape;
            margin: 0.2cm;
          }
          
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #000;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            background: white;
          }
          
          .print-container {
            width: 100%;
            height: 100%;
            padding: 10px;
            display: flex;
            flex-direction: column;
            page-break-inside: avoid;
          }
          
          .print-header {
            text-align: center;
            margin-bottom: 10px;
            border-bottom: 1px solid #000;
            padding-bottom: 8px;
            flex-shrink: 0;
          }
          
          .print-header h1 {
            margin: 0;
            font-size: 18px;
            line-height: 1.2;
            font-weight: bold;
          }
          
          .print-header p {
            margin: 2px 0 0 0;
            font-size: 11px;
            color: #666;
          }
          
          .calendar-container {
            flex: 1;
            overflow: hidden;
            min-height: 0;
          }
          
          .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 0;
            background: #e0e0e0;
            font-size: 9px;
            height: 100%;
            width: 100%;
            border-collapse: collapse;
          }
          
          .calendar-day {
            background: white;
            padding: 3px;
            border: 1px solid #ccc;
            min-height: 0;
            display: flex;
            flex-direction: column;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .day-number {
            font-weight: bold;
            margin-bottom: 2px;
            font-size: 14px;
            line-height: 1;
            text-align: left;
            padding-left: 2px;
          }
          
          .events-container {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            gap: 1px;
            min-height: 0;
          }
          
          .event-item {
            padding: 2px 1px;
            border-radius: 1px;
            font-size: 8px;
            color: #000 !important;
            line-height: 1.1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            border: none;
          }
          
          .weekday {
            background: #f0f0f0;
            padding: 1px 0;
            text-align: center;
            font-weight: bold;
            border: 1px solid #ccc;
            font-size: 9px;
            line-height: 1;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .today {
            background: #f0f7ff !important;
            border: 1px solid #2B60AD !important;
          }
          
          .other-month {
            background: #f8f8f8;
            color: #999;
          }
          
          .empty-day {
            min-height: 20px;
          }
          
          @media print {
            body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
            }
            
            .print-container {
              transform: none !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-container">
          <div class="print-header">
            <h1>Calendar - ${getCurrentDateRange()}</h1>
            <p>Printed on ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="calendar-container">
            <div class="calendar-grid">
              ${WEEKDAYS.map((day) => `<div class="weekday">${day}</div>`).join(
                ""
              )}
              ${calendarDays
                .map((date) => {
                  const dateStr = date.toISOString().split("T")[0];
                  const dayEvents = eventsByDate[dateStr] || [];
                  const isToday =
                    date.toDateString() === new Date().toDateString();
                  const isCurrentMonth = date.getMonth() === month;

                  return `
                  <div class="calendar-day ${
                    !isCurrentMonth ? "other-month" : ""
                  } ${isToday ? "today" : ""}">
                    <div class="day-number">${date.getDate()}</div>
                    <div class="events-container">
                      ${
                        dayEvents.length > 0
                          ? dayEvents
                              .map((event) => {
                                const cacheKey =
                                  event.title + event.extendedProps.state;
                                if (!eventColorCache.has(cacheKey)) {
                                  eventColorCache.set(
                                    cacheKey,
                                    getEventColor(event.title)
                                  );
                                }
                                const color = eventColorCache.get(cacheKey);

                                return `
                              <div class="event-item" style="background-color: ${color};">
                                ${event.title} - ${event.extendedProps.state}
                              </div>
                            `;
                              })
                              .join("")
                          : '<div class="empty-day"></div>'
                      }
                    </div>
                  </div>
                `;
                })
                .join("")}
            </div>
          </div>
        </div>
        
        <script>
          // Auto-print and close functionality
          window.addEventListener('load', function() {
            // Ensure content fits on one page
            const container = document.querySelector('.print-container');
            const body = document.body;
            
            if (container && body) {
              const scale = Math.min(
                1,
                window.innerHeight / container.scrollHeight,
                window.innerWidth / container.scrollWidth
              );
              
              if (scale < 0.95) {
                container.style.transform = 'scale(' + (scale * 0.95) + ')';
                container.style.transformOrigin = 'top left';
              }
            }
            
            // Print after a short delay to ensure rendering is complete
            setTimeout(() => {
              window.print();
              
              // Close window after print
              setTimeout(() => {
                window.close();
              }, 500);
            }, 100);
          });
        </script>
      </body>
    </html>
  `;

  printDocument.write(htmlContent);
  printDocument.close();
};

// Cleanup cache periodically (optional)
setInterval(() => {
  eventColorCache.clear();
}, 300000);
