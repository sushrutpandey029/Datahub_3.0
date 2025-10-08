// utils/downloadUtils.js
import * as XLSX from "xlsx";

export const downloadMeetingDetails = (meeting) => {
  const meetingText = `Meeting Details:
ID: ${meeting.id}
Regional Head: ${meeting.extendedProps.regional_head}
Activity Type: ${meeting.title}
Region: ${meeting.extendedProps.region}
State: ${meeting.extendedProps.state}
District: ${meeting.extendedProps.district}
Village: ${meeting.extendedProps.village}
Place of Meeting: ${meeting.extendedProps.placeOfMeeting}
Date of Meeting: ${meeting.start}
Quarter: ${meeting.extendedProps.quarter}`;

  const element = document.createElement("a");
  const file = new Blob([meetingText], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = `meeting-${meeting.id}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const downloadAllMeetings = (meetings) => {
  const excelData = meetings.map((meeting) => ({
    "Regional Head": meeting.extendedProps.regional_head,
    "Activity Type": meeting.title,
    Region: meeting.extendedProps.region,
    State: meeting.extendedProps.state,
    District: meeting.extendedProps.district,
    Village: meeting.extendedProps.village,
    "Place of Meeting": meeting.extendedProps.placeOfMeeting,
    "Date of Meeting": meeting.start,
    Quarter: meeting.extendedProps.quarter,
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Meetings");
  XLSX.writeFile(workbook, "all-meetings.xlsx", { compression: true });
};