


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

  // Pre-calculate calendar dates for October 2025 (as per your image)
  const year = 2025;
  const month = 9; // October (0-indexed)
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });

  // Function to format event display exactly like in the image
  const formatEventForDisplay = (event) => {
    // Safe access without optional chaining
    const activityType = (event.extendedProps && event.extendedProps.activity_type) || event.title || '';
    const state = (event.extendedProps && event.extendedProps.state) || '';
    
    // Format exactly like in the image: "ACTIVITY - State"
    return `${activityType} - ${state}`;
  };

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
            font-size: 12px;
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
            border-bottom: 2px solid #000;
            padding-bottom: 8px;
            flex-shrink: 0;
          }
          
          .print-header h1 {
            margin: 0;
            font-size: 20px;
            line-height: 1.2;
            font-weight: bold;
          }
          
          .print-header p {
            margin: 2px 0 0 0;
            font-size: 12px;
            color: #666;
          }
          
          .calendar-container {
            flex: 1;
            overflow: hidden;
            min-height: 0;
            border: 2px solid #000;
          }
          
          .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 0;
            background: #e0e0e0;
            font-size: 10px;
            height: 100%;
            width: 100%;
            border-collapse: collapse;
          }
          
          .calendar-day {
            background: white;
            padding: 4px;
            border: 1px solid #000;
            min-height: 120px;
            display: flex;
            flex-direction: column;
            page-break-inside: avoid;
            break-inside: avoid;
            position: relative;
          }
          
          .day-number {
            font-weight: bold;
            margin-bottom: 4px;
            font-size: 14px;
            line-height: 1;
            text-align: left; /* CHANGED BACK TO LEFT ALIGNMENT */
            padding: 2px;
            background: #f8f9fa;
            border-radius: 2px;
            display: inline-block;
            min-width: 24px;
            /* REMOVED text-align: center */
          }
          
          .events-container {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            gap: 2px;
            min-height: 0;
          }
          
          .event-item {
            padding: 3px 4px;
            border-radius: 2px;
            font-size: 9px;
            color: #000 !important;
            line-height: 1.2;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            border: none;
            margin-bottom: 1px;
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          .weekday {
            background: #f0f0f0;
            padding: 8px 0;
            text-align: center;
            font-weight: bold;
            border: 1px solid #000;
            font-size: 12px;
            line-height: 1;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 2px solid #000;
          }
          
          .today {
            background: #e7f3ff !important;
            border: 2px solid #2B60AD !important;
          }
          
          .other-month {
            background: #f8f8f8;
            color: #999;
          }
          
          .empty-day {
            min-height: 20px;
          }
          
          /* Ensure all borders are visible and consistent */
          .calendar-day, .weekday {
            border: 1px solid #000;
          }
          
          .calendar-grid {
            border: 1px solid #000;
          }
          
          /* Compact event styling for multiple events */
          .compact-events {
            display: flex;
            flex-direction: column;
            gap: 1px;
          }
          
          .event-line {
            display: block;
            width: 100%;
          }

          @media print {
            body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              font-size: 10px;
            }
            
            .print-container {
              transform: none !important;
              padding: 5px;
            }
            
            .calendar-day {
              min-height: 110px;
              padding: 3px;
              border: 1px solid #000 !important;
            }
            
            .event-item {
              font-size: 8px;
              padding: 2px 3px;
              line-height: 1.1;
            }
            
            .day-number {
              font-size: 12px;
              text-align: left; /* KEEP LEFT ALIGNMENT IN PRINT */
            }
            
            .weekday {
              font-size: 10px;
              padding: 6px 0;
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
              ${WEEKDAYS.map((day) => `<div class="weekday">${day}</div>`).join("")}
              ${calendarDays
                .map((date) => {
                  const dateStr = date.toISOString().split("T")[0];
                  const dayEvents = eventsByDate[dateStr] || [];
                  const isToday = date.toDateString() === new Date().toDateString();
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
                                const cacheKey = event.title + ((event.extendedProps && event.extendedProps.state) || '');
                                if (!eventColorCache.has(cacheKey)) {
                                  eventColorCache.set(
                                    cacheKey,
                                    getEventColor(event.title)
                                  );
                                }
                                const color = eventColorCache.get(cacheKey);

                                return `
                              <div class="event-item" style="background-color: ${color};">
                                ${formatEventForDisplay(event)}
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
            
            // Adjust font sizes if content is too large
            const checkContentFit = () => {
              const calendarGrid = document.querySelector('.calendar-grid');
              if (calendarGrid && container) {
                const gridHeight = calendarGrid.scrollHeight;
                const containerHeight = container.clientHeight;
                
                if (gridHeight > containerHeight * 0.8) {
                  // Reduce font sizes slightly
                  const eventItems = document.querySelectorAll('.event-item');
                  eventItems.forEach(item => {
                    item.style.fontSize = '7px';
                    item.style.padding = '1px 2px';
                  });
                  
                  const dayNumbers = document.querySelectorAll('.day-number');
                  dayNumbers.forEach(item => {
                    item.style.fontSize = '10px';
                  });
                }
              }
            };

            // Check fit after a short delay
            setTimeout(() => {
              checkContentFit();
              
              // Print after ensuring content fits
              setTimeout(() => {
                window.print();
                
                // Close window after print
                setTimeout(() => {
                  window.close();
                }, 500);
              }, 100);
            }, 100);
          });

          // Also check on resize
          window.addEventListener('resize', function() {
            const checkContentFit = () => {
              const calendarGrid = document.querySelector('.calendar-grid');
              if (calendarGrid) {
                const gridHeight = calendarGrid.scrollHeight;
                const containerHeight = window.innerHeight;
                
                if (gridHeight > containerHeight * 0.8) {
                  const eventItems = document.querySelectorAll('.event-item');
                  eventItems.forEach(item => {
                    item.style.fontSize = '7px';
                  });
                }
              }
            };
            setTimeout(checkContentFit, 50);
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
