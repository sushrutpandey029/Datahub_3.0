import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import "./dashboard.css";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as XLSX from "xlsx";
import GraphMaster from "../Graph/GraphMaster";

const Dashboard = () => {
  // User data
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const userName = userData.data.user.name;
  const userRole = userData.data.role_name;

  const navigate = useNavigate();
  const [activityCounts, setActivityCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMeeting, setLoadingMeeting] = useState(false);
  const [latestData, setLatestData] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch activity counts
  useEffect(() => {
    const fetchActivityCounts = async () => {
      try {
        const response = await axios.get(
          `https://api.mfinindia.org/api/auth/meetings/count/activities`,
          {
            params: {
              user_role: userRole,
              username: userName,
            },
          }
        );
        setActivityCounts(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivityCounts();
  }, [userRole, userName]);

  // Fetch latest activity data for modal
  useEffect(() => {
    const isToShowModal = localStorage.getItem("latestAcitivityModal");
    const getLatestData = async () => {
      try {
        const response = await axios.get(
          "https://api.mfinindia.org/api/auth/meetings/latest-logout"
        );
        if (response.data.data) {
          setLatestData(response.data.data);
          setShowModal(true);
          localStorage.setItem("latestAcitivityModal", 1);
        }
      } catch (err) {
        console.log("error in getting latest data", err.message);
      }
    };

    if (userRole === "Vertical-Head" && isToShowModal != 1) {
      getLatestData();
    }
  }, [userRole]);

  // Menu items configuration
  const menuItems = [
    {
      title: "SKMs",
      subTitle: "Stakeholder Engagement",
      activityType: "SKM",
      link: "/skm",
      icon: <i className="bi bi-people"></i>,
    },
    {
      title: "SCMs",
      subTitle: "State Chapter Meeting",
      activityType: "SCM",
      link: "/scm",
      icon: <i className="bi bi-people"></i>,
    },
    {
      title: "VSCMs",
      subTitle: "Virtual State Chapter Meeting",
      activityType: "VSCM",
      link: "/vscm",
      icon: <i className="bi bi-people"></i>,
    },
    {
      title: "DFMs",
      subTitle: "District Forum Meeting",
      activityType: "DFM",
      link: "/dfm",
      icon: <i className="bi bi-patch-check-fill"></i>,
    },
    {
      title: "CIs",
      subTitle: "Critical Incidents",
      activityType: "CI",
      link: "/ci",
      icon: <i className="bi bi-exclamation-triangle-fill"></i>,
    },
    {
      title: "SCCs",
      subTitle: "State Coordination Committee",
      activityType: "SCC",
      link: "/scc",
      icon: <i className="bi bi-people-fill"></i>,
    },
    {
      title: "MFAPs",
      subTitle: "MicroFinance Awareness Program",
      activityType: "MFAP",
      link: "/mfap",
      icon: <i className="bi bi-piggy-bank-fill"></i>,
    },
    {
      title: "Activity Planner FY 25-26",
      subTitle: "Calendar",
      activityType: "MFAP",
      link: "/calendar",
      icon: <i className="bi bi-calendar-event-fill"></i>,
    },
  ];

  // Get count for specific activity type
  const getCountForActivity = (activityType) => {
    const activity = activityCounts.find(
      (item) => item.activity_type === activityType
    );
    return activity ? activity.count : 0;
  };

  // Download All Meetings
  const handleDownloadMeeting = async () => {
    setLoadingMeeting(true);
    try {
      const response = await axios.get(
        "https://api.mfinindia.org/api/auth/meetings/count/allmeeting",
        {
          params: { user_role: userRole, username: userName },
        }
      );

      const columnsToExclude = ["updated_at", "logout_time"];

      // Convert HTML to plain text
      const htmlToText = (html) => {
        if (!html) return "";
        const temp = document.createElement("div");
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || "";
      };

      const filteredExportData = response.data.data.map((item) => {
        const newItem = { ...item };
        columnsToExclude.forEach((col) => delete newItem[col]);

        newItem.dateOfMeeting = newItem.dateOfMeeting
          ? new Date(newItem.dateOfMeeting)
          : null;

        if (newItem.activity_details) {
          newItem.activity_details = htmlToText(newItem.activity_details);
        }
        if (newItem.status_update) {
          newItem.status_update = htmlToText(newItem.status_update);
        }

        if (newItem.hasOwnProperty("head_and_si_remark")) {
          newItem["Head_SI_Remark"] = newItem["head_and_si_remark"];
          delete newItem["head_and_si_remark"];
        }

        if (newItem.hasOwnProperty("created_at")) {
          newItem.dateOfEntry = new Date(newItem["created_at"]);
          delete newItem["created_at"];
        } else {
          newItem.dateOfEntry = null;
        }

        const reorderedItem = {};
        for (const key in newItem) {
          reorderedItem[key] = newItem[key];
          if (
            key === "status_update" &&
            newItem["Head_SI_Remark"] !== undefined
          ) {
            reorderedItem["Head_SI_Remark"] = newItem["Head_SI_Remark"];
          }
        }

        return reorderedItem;
      });

      const ws = XLSX.utils.json_to_sheet(filteredExportData);

      const headers = Object.keys(filteredExportData[0]);
      ["dateOfMeeting", "dateOfEntry"].forEach((colName) => {
        const colIndex = headers.indexOf(colName);
        if (colIndex !== -1) {
          const range = XLSX.utils.decode_range(ws["!ref"]);
          for (let R = range.s.r + 1; R <= range.e.r; R++) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: colIndex });
            const cell = ws[cellAddress];
            if (cell && (cell.t === "d" || cell.t === "n")) {
              cell.z = "dd-mmm-yy";
            }
          }
        }
      });

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SIT");

      const randomNum = Math.floor(Math.random() * 9000) + 1000;
      const filename = `SIT_Meetings_${randomNum}.xlsx`;

      XLSX.writeFile(wb, filename);
    } catch (err) {
      console.log("error in downloading all meetings.", err);
    } finally {
      setLoadingMeeting(false);
    }
  };

  // Close modal
  const closeModal = () => setShowModal(false);

  // Loading and error states
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-message">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="AddMeeting">
      <div className="container mt-5">
        <div className="row g-4 mt-5">
          <div className="col-sm-12 mt-0">
            <Box className="mt-0" sx={{ flexGrow: 1, mt: 5, px: 3 }}>
              <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={12}>
                  {/* Top Buttons */}
                  <div className="row justify-content-end mt-0">
                    <div className="col-sm-6">
                      <div className="col-sm-6 mb-3">
                        <button
                          onClick={() => navigate(-1)}
                          className="back-button"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "1rem",
                          }}
                        >
                          <ArrowBackIcon />
                        </button>
                      </div>
                    </div>

                    <div className="col-sm-6 text-end button-group">
                      <button
                        type="button"
                        className="css-1vhaqj4-MuiButtonBase-root-MuiButton-root w-auto m-0"
                        onClick={() => navigate("/form-entry")}
                      >
                        Add Activity <i className="bi bi-plus"></i>
                      </button>

                      <button
                        type="button"
                        className="css-1vhaqj4-MuiButtonBase-root-MuiButton-root w-auto m-0"
                        onClick={handleDownloadMeeting}
                      >
                        {loadingMeeting ? (
                          "processing..."
                        ) : (
                          <>
                            Download All Meetings{" "}
                            <i className="bi bi-download"></i>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Graphs */}
                  <div className="ag-format-container">
                    <GraphMaster userRole={userRole} userName={userName} />

                    {/* Activity Cards */}
                    <div className="ag-courses_box">
                      {menuItems.map((item, index) => (
                        <div key={index} className="ag-courses_item">
                          <Link
                            to={item.link}
                            className="ag-courses-item_link sit"
                            target={
                              item.link.startsWith("http") ? "_blank" : "_self"
                            }
                          >
                            <h1>{item.icon}</h1>
                            <div className="ag-courses-item_title sittitle">
                              <h3>{item.subTitle}</h3>
                              <span className="short-name">({item.title})</span>
                              <h5 className="count-display">
                                {getCountForActivity(item.activityType)}
                              </h5>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>

            {/* Latest Activity Modal */}
            {showModal && latestData && (
              <div
                className="modal"
                style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">
                        New Activity Data Available
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="latest-data-container">
                        <div className="data-item">
                          <span className="data-label">Total New Data:</span>
                          <span className="data-value">
                            {latestData.null_count_after_latest}
                          </span>
                        </div>
                        {Object.entries(latestData.activity_type_counts).map(
                          ([key, value]) => {
                            const activityRoutes = {
                              SKM: "/skm",
                              SCM: "/scm",
                              DFM: "/dfm",
                              CI: "/critical-event",
                              SCC: "/scc",
                              MFAP: "/mfap",
                            };

                            return (
                              <Link
                                to={activityRoutes[key] || "#"}
                                className="data-item-link"
                                onClick={() => setShowModal(false)}
                                key={key}
                              >
                                <div className="data-item">
                                  <span className="data-label">{key}:</span>
                                  <span className="data-value">{value}</span>
                                </div>
                              </Link>
                            );
                          }
                        )}
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
