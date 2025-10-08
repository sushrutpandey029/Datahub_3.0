// // utils/printUtils.js
// import { WEEKDAYS } from "./calendarHelpers";

// export const handlePrintCalendar = (currentView, currentDate, meetings, getEventColor) => {
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
//             color: #000 !important;
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
//           <h1>Calendar - ${getCurrentDateRange(currentView, currentDate)}</h1>
//           <p>Printed on ${new Date().toLocaleDateString()}</p>
//         </div>
//         <div class="calendar-print-view">
//   `);

//   // Add weekday headers
//   printDocument.write('<div class="calendar-grid">');
//   WEEKDAYS.forEach((day) => {
//     printDocument.write(`<div class="weekday">${day}</div>`);
//   });

//   // Add calendar days
//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth();
//   const firstDay = new Date(year, month, 1);
//   const startDate = new Date(firstDay);
//   startDate.setDate(startDate.getDate() - firstDay.getDay());

//   for (let i = 0; i < 42; i++) {
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
//     `);

//     dayEvents.forEach((event) => {
//       const color = getEventColor(event.title);
//       printDocument.write(`
//         <div class="event-dot" style="background-color: ${color}; color: #000 !important;">
//           ${event.title} - ${event.extendedProps.state}
//         </div>
//       `);
//     });

//     if (dayEvents.length === 0) {
//       printDocument.write(`
//         <div class="event-dot" style="background-color: #f0f0f0; color: #000 !important;">
//           No meetings
//         </div>
//       `);
//     }

//     printDocument.write("</div>");
//   }

//   printDocument.write(`
//         </div>
//       </body>
//     </html>
//   `);

//   printDocument.close();
//   setTimeout(() => {
//     printWindow.print();
//   }, 250);
// };






// utils/printUtils.js
import { WEEKDAYS } from "./calendarHelpers";

export const handlePrintCalendar = (currentView, currentDate, meetings, getEventColor) => {
  const printWindow = window.open("", "_blank");
  const printDocument = printWindow.document;

  const getCurrentDateRange = (currentView, currentDate) => {
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

  printDocument.write(`
    <html>
      <head>
        <title>Calendar Print</title>
        <style>
          @page {
            size: landscape;
            margin: 0.2cm;
          }
          
          * {
            box-sizing: border-box;
          }
          
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #000;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
          }
          
          .print-container {
            width: 100%;
            height: 100%;
            padding: 10px;
            display: flex;
            flex-direction: column;
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
          }
          
          .print-header p {
            margin: 2px 0 0 0;
            font-size: 11px;
          }
          
          .calendar-container {
            flex: 1;
            overflow: hidden;
          }
          
          .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 1px;
            background: #e0e0e0;
            font-size: 9px;
            height: 100%;
            width: 100%;
          }
          
          .calendar-day {
            background: white;
            padding: 3px;
            border: 1px solid #ccc;
            min-height: 0;
            display: flex;
            flex-direction: column;
          }
          
          .day-number {
            font-weight: bold;
            margin-bottom: 2px;
            font-size: 10px;
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
          }
          
          .event-item {
            padding: 2px 1px;
            margin: 0;
            border-radius: 1px;
            font-size: 8px;
            color: #000 !important;
            line-height: 1.1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
          }
          
          .weekday {
            background: #f0f0f0;
            padding: 5px 2px;
            text-align: center;
            font-weight: bold;
            border: 1px solid #ccc;
            font-size: 10px;
          }
          
          .today {
            background: #f0f7ff !important;
            border: 1px solid #2B60AD !important;
          }
          
          .other-month {
            background: #f8f8f8;
            color: #999;
          }
          
          .more-events {
            font-style: italic;
            color: #666;
            text-align: center;
            background-color: #e0e0e0 !important;
            font-size: 7px;
            padding: 1px;
          }
          
          .no-meetings {
            text-align: center;
            color: #999;
            font-style: italic;
            background-color: #f0f0f0 !important;
          }
          
          @media print {
            @page {
              size: landscape;
              margin: 0.2cm;
            }
            
            body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
            }
            
            .print-container {
              width: 100%;
              height: 100%;
              page-break-inside: avoid;
            }
            
            .calendar-grid {
              page-break-inside: avoid;
              break-inside: avoid;
            }
            
            .calendar-day {
              page-break-inside: avoid;
              break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-container">
          <div class="print-header">
            <h1>Calendar - ${getCurrentDateRange(currentView, currentDate)}</h1>
            <p>Printed on ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="calendar-container">
            <div class="calendar-grid">
  `);

  // Add weekday headers
  WEEKDAYS.forEach((day) => {
    printDocument.write(`<div class="weekday">${day}</div>`);
  });

  // Add calendar days - only 35 days (5 weeks)
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  for (let i = 0; i < 35; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];
    const dayEvents = meetings.filter(
      (meeting) => meeting.start.split("T")[0] === dateStr
    );

    const isToday = date.toDateString() === new Date().toDateString();
    const isCurrentMonth = date.getMonth() === month;

    printDocument.write(`
      <div class="calendar-day ${!isCurrentMonth ? "other-month" : ""} ${
      isToday ? "today" : ""
    }">
        <div class="day-number">${date.getDate()}</div>
        <div class="events-container">
    `);

    // Show ALL events - no limit
    if (dayEvents.length === 0) {
      printDocument.write(`
        <div class="event-item no-meetings">
          No meetings
        </div>
      `);
    } else {
      dayEvents.forEach((event) => {
        const color = getEventColor(event.title);
        printDocument.write(`
          <div class="event-item" style="background-color: ${color};">
            ${event.title} - ${event.extendedProps.state}
          </div>
        `);
      });
    }

    printDocument.write(`
        </div>
      </div>
    `);
  }

  printDocument.write(`
          </div>
        </div>
      </body>
    </html>
  `);

  printDocument.close();
  
  // Wait for content to load then print
  setTimeout(() => {
    printWindow.focus();
    
    // Add beforeprint event to ensure single page
    printWindow.addEventListener('beforeprint', () => {
      // Force single page by scaling if needed
      const body = printWindow.document.body;
      const container = printWindow.document.querySelector('.print-container');
      
      if (container && container.scrollHeight > printWindow.innerHeight) {
        const scale = printWindow.innerHeight / container.scrollHeight;
        if (scale < 1) {
          container.style.transform = `scale(${scale * 0.95})`;
          container.style.transformOrigin = 'top left';
        }
      }
    });
    
    printWindow.print();
    
    // Close window after print (optional)
    setTimeout(() => {
      printWindow.close();
    }, 1000);
    
  }, 500);
};