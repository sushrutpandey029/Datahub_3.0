// components/MeetingModal.js
import React from "react";

const MeetingModal = ({ showModal, selectedMeetings, setShowModal }) => {
  console.log("selectedMeetings",selectedMeetings)
  if (!showModal || selectedMeetings.length === 0) return null;

  return (
    <div className="mfin-calendar-modal-overlay">
      <div className="mfin-calendar-modal-content mt-5">
        <div className="mfin-calendar-modal-header">
          <h4>
            Meetings on{" "}
            {(() => {
              const dateObj = new Date(selectedMeetings[0].start);
              return dateObj.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
            })()}
          </h4>
          <button
            className="mfin-calendar-close-button"
            onClick={() => setShowModal(false)}
          >
            ×
          </button>
        </div>
        <div className="mfin-calendar-modal-body">
          <table
            className="mfin-calendar-meeting-table"
            style={{
              border: "1px solid #ccc",
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>
                  Activity Type
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>
                  Date of Meeting
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>
                  State
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedMeetings.map((meeting, idx) => (
                <tr key={idx}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {meeting.title || "N/A"}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {new Date(meeting.start).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {meeting.extendedProps.state || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MeetingModal;