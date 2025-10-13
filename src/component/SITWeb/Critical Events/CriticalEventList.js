// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import {
//   Button,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Box,
//   Grid,
//   Chip,
//   CircularProgress,
//   Typography,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import DownloadIcon from "@mui/icons-material/Download";
// import * as XLSX from "xlsx";
// import InfoIcon from "@mui/icons-material/Info";
// import UpdateIcon from "@mui/icons-material/Update";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
// import RefreshIcon from "@mui/icons-material/Refresh";

// const CriticalEventList = () => {
//   const user = localStorage.getItem("user");
//   const userData = JSON.parse(user);
//   const userName = userData.data.user.name || "";
//   const userRole = userData.data.role_name || "";
//   const userEmail = userData.data.user.email;

//   const [regionalHead, setRegionalHead] = useState([]);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const status = searchParams.get("status") || ""; // "open" or "closed"

//   const [data, setData] = useState([]);
//   const [filters, setFilters] = useState({
//     year: "",
//     startmonth: "",
//     endmonth: "",
//     region: "",
//     state: "",
//     incidents: "",
//     regional_head: "",
//   });
//   const [filterOptions, setFilterOptions] = useState({
//     years: [],
//     months: [],
//     regions: [],
//     states: [],
//     incidents: [],
//     regionalHeads: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [toggleCleared, setToggleCleared] = useState(false);
//   const [activeFiltersCount, setActiveFiltersCount] = useState(0);
//   const [error, setError] = useState(null);

//   // Count active filters
//   useEffect(() => {
//     const count = Object.values(filters).filter((val) => val !== "").length;
//     setActiveFiltersCount(count);
//   }, [filters]);

//   const fetchData = async (params = {}) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const baseParams = {
//         user_role: userRole,
//         username: userName,
//         activity_type: "CI",
//       };

//       const response = await axios.get(
//         "https://api.mfinindia.org/api/auth/meetings/getcidata/filter",
//         {
//           params: { ...baseParams, ...params },
//         }
//       );

//       // Filter data based on status (case-insensitive)
//       const statusFilteredData = response.data.data.filter(
//         (item) =>
//           item.hod_observation &&
//           item.hod_observation.toLowerCase() === status.toLowerCase()
//       );

//       console.log("Filtered Data:", statusFilteredData);

//       setData(statusFilteredData);
//       //   setFilteredData(statusFilteredData);

//       //   setData(response.data.data);

//       // Update filter options, ensuring we don't overwrite with empty arrays if not provided
//       setFilterOptions((prev) => ({
//         years:
//           (response.data.filters &&
//             response.data.filters.years &&
//             response.data.filters.years.filter(Boolean)) ||
//           prev.years,
//         months:
//           (response.data.filters &&
//             response.data.filters.months &&
//             response.data.filters.months.filter(Boolean)) ||
//           prev.months,
//         regions:
//           (response.data.filters && response.data.filters.regions) ||
//           prev.regions,
//         states:
//           (response.data.filters && response.data.filters.states) ||
//           prev.states,
//         incidents:
//           (response.data.filters &&
//             response.data.filters.incidents &&
//             response.data.filters.incidents.filter(Boolean)) ||
//           prev.incidents,
//         regionalHeads:
//           (response.data.filters && response.data.filters.regional_heads) ||
//           prev.regionalHeads,
//       }));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("Failed to load data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial data fetch
//   useEffect(() => {
//     fetchData();
//   }, []);

//   //fetching regional head data
//   useEffect(() => {
//     const fetchRegionalHead = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.mfinindia.org/api/auth/meetings/user/getRole18Users"
//         );
//         console.log("regionalhead", response.data.names);
//         setRegionalHead(response.data.names);
//       } catch (err) {
//         console.log("regionalhead-err", err.response);
//       }
//     };

//     fetchRegionalHead();
//   }, []);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const applyFilters = () => {
//     // Prepare filter params, removing empty values
//     const filterParams = Object.fromEntries(
//       Object.entries(filters).filter(([_, v]) => v !== "")
//     );
//     fetchData(filterParams);
//   };

//   const resetFilters = () => {
//     setFilters({
//       year: "",
//       startmonth: "",
//       endmonth: "",
//       region: "",
//       state: "",
//       incidents: "",
//       regional_head: "",
//     });
//     fetchData(); // Fetch without any filters
//   };

//   const handleEdit = (row) => {
//     navigate(`/edit-meeting/${row.id}`);
//   };

//   const handleUpdateClick = (row) => {
//     navigate(`/update-meeting/${row.id}`);
//   };

//   const handleViewClick = (row) => {
//     navigate("/view-content", { state: { rowData: row } });
//   };

//   const handleDelete = async (row) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this? This action cannot be undone."
//     );
//     if (confirmDelete) {
//       try {
//         await axios.delete(
//           `https://api.mfinindia.org/api/auth/meetings/delete/${row.id}`
//         );
//         setData((prev) => prev.filter((item) => item.id !== row.id));
//       } catch (error) {
//         console.error("Error deleting meeting:", error);
//         alert("Failed to delete. Please try again.");
//       }
//     }
//   };

//   const handleBulkDelete = async () => {
//     if (selectedRows.length === 0) return;

//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete ${selectedRows.length} selected items?`
//     );
//     if (!confirmDelete) return;

//     try {
//       await Promise.all(
//         selectedRows.map((row) =>
//           axios.delete(
//             `https://api.mfinindia.org/api/auth/meetings/delete/${row.id}`
//           )
//         )
//       );
//       setData((prev) =>
//         prev.filter((item) => !selectedRows.some((row) => row.id === item.id))
//       );
//       setSelectedRows([]);
//       setToggleCleared(!toggleCleared);
//     } catch (error) {
//       console.error("Error deleting meetings:", error);
//       alert("Failed to delete some items. Please try again.");
//     }
//   };

//   const exportToExcel = () => {
//     if (data.length === 0) {
//       alert("No data to export");
//       return;
//     }

//     const columnsToExclude = ["updated_at"];

//     const htmlToText = (html) => {
//       if (!html) return "";
//       const temp = document.createElement("div");
//       temp.innerHTML = html;
//       return temp.textContent || temp.innerText || "";
//     };

//     const parseSafeDateTime = (value) => {
//       if (!value) return null;
//       const d = new Date(value);
//       if (!isNaN(d)) return d; // Keep full datetime
//       return null;
//     };

//     const exportData = data.map((item) => {
//       const newItem = { ...item };
//       columnsToExclude.forEach((col) => delete newItem[col]);

//       // ✅ Keep full datetime for Excel
//       newItem.dateOfMeeting = parseSafeDateTime(newItem.dateOfMeeting);

//       if (newItem.activity_details) {
//         newItem.activity_details = htmlToText(newItem.activity_details);
//       }
//       if (newItem.status_update) {
//         newItem.status_update = htmlToText(newItem.status_update);
//       }

//       if (newItem.hasOwnProperty("head_and_si_remark")) {
//         newItem["Head_SI_Remark"] = newItem["head_and_si_remark"];
//         delete newItem["head_and_si_remark"];
//       }

//       let dateOfEntry = null;
//       if (newItem.hasOwnProperty("created_at")) {
//         dateOfEntry = parseSafeDateTime(newItem["created_at"]);
//         delete newItem["created_at"];
//       }

//       const reorderedItem = {};
//       for (const key in newItem) {
//         if (key === "dateOfMeeting" && dateOfEntry) {
//           reorderedItem["dateOfEntry"] = dateOfEntry;
//         }
//         reorderedItem[key] = newItem[key];

//         if (
//           key === "status_update" &&
//           newItem["Head_SI_Remark"] !== undefined
//         ) {
//           reorderedItem["Head_SI_Remark"] = newItem["Head_SI_Remark"];
//         }
//       }

//       if (!newItem.dateOfMeeting && dateOfEntry) {
//         reorderedItem["dateOfEntry"] = dateOfEntry;
//       }

//       return reorderedItem;
//     });

//     const ws = XLSX.utils.json_to_sheet(exportData);

//     // ✅ Apply Excel datetime format
//     const headers = Object.keys(exportData[0]);
//     ["dateOfMeeting", "dateOfEntry"].forEach((colName) => {
//       const colIndex = headers.indexOf(colName);
//       if (colIndex !== -1) {
//         const range = XLSX.utils.decode_range(ws["!ref"]);
//         for (let R = range.s.r + 1; R <= range.e.r; R++) {
//           const cellAddress = XLSX.utils.encode_cell({ r: R, c: colIndex });
//           const cell = ws[cellAddress];
//           if (cell && cell.v instanceof Date) {
//             cell.t = "d"; // Date type for Excel
//             cell.z = "dd-mmm-yyyy  hh:mm:ss"; // Keep time
//           }
//         }
//       }
//     });

//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "SIT");

//     const randomNum = Math.floor(Math.random() * 9000) + 1000;
//     const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
//     const filename = `Critical_Incidents_${timestamp}_${randomNum}.xlsx`;

//     XLSX.writeFile(wb, filename);
//   };

//   // decide if Edit column should be shown
//   const shouldShowEditColumn =
//     !(
//       userRole === "Admin" ||
//       userRole === "Vertical-Head" ||
//       userRole === "SI_Admin"
//     ) &&
//     data &&
//     data.some(function (row) {
//       return (
//         row &&
//         row.hod_observation &&
//         row.hod_observation.toLowerCase() !== "closed"
//       );
//     });

//   // decide if Update column should be shown
//   const shouldShowUpdateColumn =
//     !(
//       userRole === "Admin" ||
//       userRole === "Vertical-Head" ||
//       userRole === "SI_Admin"
//     ) &&
//     data &&
//     data.some(function (row) {
//       return (
//         row &&
//         row.hod_observation &&
//         row.hod_observation.toLowerCase() !== "open"
//       );
//     });
//   const columns = [
//     {
//       name: "M.ID",
//       selector: (row) => row.id,
//       sortable: true,
//       width: "100px",
//     },
//     {
//       name: "Region",
//       selector: (row) => row.region,
//       sortable: true,
//       width: "100px",
//     },
//     {
//       name: "Regional Head",
//       selector: (row) => row.regional_head,
//       sortable: true,
//       width: "165px",
//       omit: !(
//         userRole === "Admin" ||
//         userRole === "Vertical-Head" ||
//         userRole === "SI_Admin"
//       ),
//     },
//     {
//       name: "State",
//       selector: (row) => row.state,
//       sortable: true,
//       width: "150px",
//     },
//     {
//       name: "District",
//       selector: (row) => row.district,
//       sortable: true,
//       width: "150px",
//     },
//     {
//       name: "Village",
//       selector: (row) => row.village,
//       sortable: true,
//       width: "150px",
//     },
//     {
//       name: "Incidents",
//       selector: (row) => row.incidents,
//       sortable: true,
//       width: "180px",
//     },
//     {
//       name: "Source of Information",
//       selector: (row) => row.source_of_information,
//       sortable: true,
//       width: "180px",
//     },
//     {
//       name: "Short Description",
//       selector: (row) => row.short_description,
//       sortable: true,
//       width: "180px",
//     },
//     // {
//     //   name: "Activity Details",
//     //   selector: row => row.activity_details,
//     //   sortable: true,
//     //   width: "180px",
//     // },
//     {
//       name: "Activity Detail(s)",
//       cell: (row) =>
//         row.activity_details ? (
//           <div
//             dangerouslySetInnerHTML={{ __html: row.activity_details || "-" }}
//             style={{ maxHeight: "15px", overflow: "auto" }}
//           />
//         ) : (
//           "-"
//         ),
//       sortable: true,
//       width: "150px",
//     },
//     {
//       name: "Date Of Entry",
//       selector: (row) => row.created_at,
//       sortable: true,
//       cell: (row) =>
//         row.created_at
//           ? new Date(row.created_at).toLocaleString("en-IN", {
//               timeZone: "Asia/Kolkata",
//               day: "2-digit",
//               month: "long",
//               year: "numeric",
//               hour: "2-digit",
//               minute: "2-digit",
//               hour12: true, // ✅ 12-hour format
//             })
//           : "-",
//       width: "160px", // increased width to accommodate longer text like "23 April 2025"
//     },
//     {
//       name: "Meeting Date",
//       selector: (row) => row.dateOfMeeting,
//       sortable: true,
//       cell: (row) =>
//         row.dateOfMeeting
//           ? new Date(row.dateOfMeeting).toLocaleDateString("en-GB", {
//               day: "numeric",
//               month: "long",
//               year: "numeric",
//             })
//           : "-",
//       width: "160px", // increased width to accommodate longer text like "23 April 2025"
//     },

//     {
//       name: "HOD Observation",
//       selector: (row) => row.hod_observation,
//       sortable: true,
//       width: "170px",
//     },
//     {
//       name: "URL",
//       cell: (row) =>
//         row.url ? (
//           <a
//             href={row.url.startsWith("http") ? row.url : `https://${row.url}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             title={row.url}
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//               color: "#1976d2",
//             }}
//           >
//             <OpenInNewIcon fontSize="small" />
//           </a>
//         ) : (
//           <span>—</span>
//         ),
//       sortable: false,
//       width: "70px",
//       center: true,
//     },
//     // {
//     //   name: "File",
//     //   cell: row => (
//     //     row.uploadFile ? (
//     //       <a
//     //         href={`https://api.mfinindia.org/public/${row.uploadFile}`}
//     //         target="_blank"
//     //         rel="noopener noreferrer"
//     //         style={{
//     //           color: "blue",
//     //           textDecoration: "underline",
//     //           cursor: "pointer",
//     //         }}
//     //       >
//     //         <DownloadIcon />
//     //       </a>
//     //     ) : (
//     //       <span>—</span>
//     //     )
//     //   ),
//     //   center: true,
//     //   sortable: true,
//     //   width: "80px",
//     // },
//     {
//       name: "View",
//       cell: (row) => (
//         <Button
//           variant="contained"
//           color="info"
//           size="small"
//           onClick={() => handleViewClick(row)}
//           sx={{ minWidth: "32px", px: 0 }}
//         >
//           <VisibilityIcon fontSize="small" />
//         </Button>
//       ),
//       sortable: true,
//       ignoreRowClick: true,
//       width: "80px",
//       center: true,
//     },
//     shouldShowEditColumn && {
//       name: "Edit",
//       cell: (row) => (
//         <Button
//           variant="contained"
//           color="primary"
//           size="small"
//           onClick={() => handleEdit(row)}
//           sx={{ minWidth: "32px", px: 0 }}
//         >
//           <EditIcon fontSize="small" />
//         </Button>
//       ),
//       ignoreRowClick: true,
//       width: "80px",
//       center: true,
//       omit:
//         userRole === "Admin" ||
//         userRole === "Vertical-Head" ||
//         userRole === "SI_Admin",
//     },
//     shouldShowUpdateColumn && {
//       name: "Update",
//       cell: (row) => (
//         <Button
//           variant="contained"
//           color="primary"
//           size="small"
//           onClick={() => handleUpdateClick(row)}
//           sx={{ minWidth: "32px", px: 0 }}
//         >
//           <EditIcon fontSize="small" />
//         </Button>
//       ),
//       ignoreRowClick: true,
//       width: "80px",
//       center: true,
//       omit:
//         userRole === "Admin" ||
//         userRole === "Vertical-Head" ||
//         userRole === "SI_Admin",
//     },
//     {
//       name: "Delete",
//       cell: (row) => (
//         <Button
//           variant="contained"
//           color="error"
//           size="small"
//           onClick={() => handleDelete(row)}
//           sx={{ minWidth: "32px", px: 0 }}
//         >
//           <DeleteIcon fontSize="small" />
//         </Button>
//       ),
//       ignoreRowClick: true,
//       width: "80px",
//       center: true,
//     },
//     {
//       name: "Track",
//       cell: (row) => (
//         <Button
//           variant="contained"
//           color="info"
//           size="small"
//           onClick={() => navigate(`/meeting-tracking/${row.id}`)}
//           sx={{ minWidth: "32px", px: 0 }}
//         >
//           <InfoIcon fontSize="small" />
//         </Button>
//       ),
//       ignoreRowClick: true,
//       width: "80px",
//       center: true,
//     },
//     {
//       name: "HOD_SI_Remark",
//       cell: (row) => {
//         const [comment, setComment] = useState(row.comment || "");
//         const [status, setStatus] = useState(row.status || "");

//         // Get the URL status parameter
//         const urlStatus = searchParams.get("status") || "";

//         const handleUpdate = async () => {
//           if (!status) {
//             alert("Please select a status");
//             return;
//           }
//           try {
//             await axios.post(
//               `https://api.mfinindia.org/api/auth/meetings/archmeeting_update_new/${row.id}`,
//               {
//                 id: row.id,
//                 regional_head: row.regional_head,
//                 hodObservation: status,
//                 statusUpdate: comment,
//                 loginemail: userEmail,
//                 username: userName,
//                 activity_type: row.activity_type,
//               }
//             );
//             alert("Data Updated Successfully!");
//             fetchData(); // Refresh data
//           } catch (error) {
//             console.error("Update failed:", error);
//             alert("Update failed. Please try again.");
//           }
//         };

//         return (
//           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               style={{
//                 padding: "6px 12px",
//                 borderRadius: "4px",
//                 border: "1px solid #ccc",
//                 minWidth: "100px",
//               }}
//             >
//               <option value="">Select Status</option>
//               <option value="Open">Open</option>
//               <option value="Closed">Closed</option>
//               {/* {row.hod_observation === "Open" ? (
//                 <option value="Closed">Closed</option>
//               ) : (
//                 <option value="Open">Open</option>
//               )} */}
//             </select>

//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Comments..."
//               style={{
//                 padding: "6px",
//                 borderRadius: "4px",
//                 border: "1px solid #ccc",
//                 minWidth: "150px",
//                 resize: "vertical",
//                 minHeight: "36px",
//               }}
//             />

//             <Button
//               variant="contained"
//               color="primary"
//               size="small"
//               onClick={handleUpdate}
//               sx={{ minWidth: "32px", px: 0 }}
//             >
//               <UpdateIcon fontSize="small" />
//             </Button>
//           </div>
//         );
//       },
//       ignoreRowClick: true,
//       width: "400px",
//       center: true,
//       omit: !(
//         userRole === "Admin" ||
//         userRole === "Vertical-Head" ||
//         userRole === "SI_Admin"
//       ),
//     },
//   ].filter(Boolean);

//   const contextActions = (
//     <Button
//       key="delete"
//       onClick={handleBulkDelete}
//       variant="contained"
//       color="error"
//       startIcon={<DeleteIcon />}
//       disabled={selectedRows.length === 0}
//     >
//       Delete Selected ({selectedRows.length})
//     </Button>
//   );

//   return (
//     <div className="AddMeeting mt-6">
//       <div className="container-fluid">
//         <div className="row g-0">
//           <div className="col-12">
//             <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//               <Button
//                 onClick={() => navigate(-1)}
//                 startIcon={<ArrowBackIcon />}
//                 sx={{ mr: 2 }}
//               >
//                 {/* Back */}
//               </Button>
//               <Typography variant="h4" component="h1">
//                 Critical Incidents
//               </Typography>

//               {activeFiltersCount > 0 && (
//                 <Chip
//                   label={`${activeFiltersCount} active filter(s)`}
//                   color="primary"
//                   size="small"
//                   sx={{ ml: 2 }}
//                 />
//               )}
//             </Box>

//             {/* Filter Section */}

//             <Box
//               sx={{
//                 mb: 3,
//                 p: 2,
//                 border: "1px solid #e0e0e0",
//                 borderRadius: 1,
//                 backgroundColor: "#f9f9f9",
//               }}
//             >
//               <Grid container spacing={2} alignItems="center">
//                 {(userRole === "Admin" ||
//                   userRole === "Vertical-Head" ||
//                   userRole === "SI_Admin") && (
//                   <Grid item xs={12} sm={6} md={2}>
//                     <FormControl fullWidth size="small">
//                       <InputLabel>Regional Head</InputLabel>
//                       <Select
//                         name="regional_head"
//                         value={filters.regional_head}
//                         onChange={handleFilterChange}
//                         label="Regional Head"
//                       >
//                         <MenuItem value="">All Regional Head</MenuItem>
//                         {filterOptions.regionalHeads.map((region) => (
//                           <MenuItem key={region} value={region}>
//                             {region}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                 )}

//                 <Grid item xs={12} sm={6} md={2}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel>Year</InputLabel>
//                     <Select
//                       name="year"
//                       value={filters.year}
//                       onChange={handleFilterChange}
//                       label="Year"
//                     >
//                       <MenuItem value="">All Years</MenuItem>
//                       {filterOptions.years.map((year) => (
//                         <MenuItem key={year} value={year}>
//                           {year}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={2}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel>Start Month</InputLabel>
//                     <Select
//                       name="startmonth"
//                       value={filters.startmonth}
//                       onChange={handleFilterChange}
//                       label="Start Month"
//                     >
//                       <MenuItem value="">All Months</MenuItem>
//                       {filterOptions.months.map((month) => (
//                         <MenuItem key={month} value={month}>
//                           {month}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={2}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel>End Month</InputLabel>
//                     <Select
//                       name="endmonth"
//                       value={filters.endmonth}
//                       onChange={handleFilterChange}
//                       label="End Month"
//                     >
//                       <MenuItem value="">All Months</MenuItem>
//                       {filterOptions.months.map((month) => (
//                         <MenuItem key={month} value={month}>
//                           {month}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={2}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel>Region</InputLabel>
//                     <Select
//                       name="region"
//                       value={filters.region}
//                       onChange={handleFilterChange}
//                       label="Region"
//                     >
//                       <MenuItem value="">All Regions</MenuItem>
//                       {filterOptions.regions.map((region) => (
//                         <MenuItem key={region} value={region}>
//                           {region}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={2}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel>State</InputLabel>
//                     <Select
//                       name="state"
//                       value={filters.state}
//                       onChange={handleFilterChange}
//                       label="State"
//                     >
//                       <MenuItem value="">All States</MenuItem>
//                       {filterOptions.states.map((state) => (
//                         <MenuItem key={state} value={state}>
//                           {state}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={2}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel>Critical Event</InputLabel>
//                     <Select
//                       name="incidents"
//                       value={filters.incidents}
//                       onChange={handleFilterChange}
//                       label="Critical Event"
//                     >
//                       <MenuItem value="">All Events</MenuItem>
//                       {filterOptions.incidents.map((incident) => (
//                         <MenuItem key={incident} value={incident}>
//                           {incident}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={2}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={applyFilters}
//                     fullWidth
//                     startIcon={<FilterAltIcon />}
//                     disabled={loading}
//                   >
//                     Apply Filters
//                   </Button>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={2}>
//                   <Button
//                     variant="outlined"
//                     onClick={resetFilters}
//                     fullWidth
//                     startIcon={<FilterAltOffIcon />}
//                     disabled={loading}
//                   >
//                     Reset
//                   </Button>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={2}>
//                   <Button
//                     variant="outlined"
//                     onClick={() => fetchData()}
//                     fullWidth
//                     startIcon={<RefreshIcon />}
//                     disabled={loading}
//                   >
//                     Refresh
//                   </Button>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={2}>
//                   <Button
//                     variant="contained"
//                     color="success"
//                     startIcon={<DownloadIcon />}
//                     onClick={exportToExcel}
//                     fullWidth
//                     disabled={loading || data.length === 0}
//                     style={{
//                       backgroundColor: "rgb(25 118 210)",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Export Excel
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Box>

//             {/* Data Table */}
//             {error ? (
//               <Box
//                 sx={{
//                   p: 3,
//                   border: "1px solid #ffebee",
//                   backgroundColor: "#ffebee",
//                   borderRadius: 1,
//                   textAlign: "center",
//                 }}
//               >
//                 <Typography color="error">{error}</Typography>
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   onClick={() => fetchData()}
//                   sx={{ mt: 2 }}
//                 >
//                   Retry
//                 </Button>
//               </Box>
//             ) : loading ? (
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   p: 3,
//                 }}
//               >
//                 <CircularProgress />
//               </Box>
//             ) : (
//               <>
//                 <Box
//                   sx={{
//                     mb: 2,
//                     display: "flex",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <Typography variant="subtitle1">
//                     Showing {data.length} records
//                   </Typography>
//                   {selectedRows.length > 0 && contextActions}
//                 </Box>

//                 <DataTable
//                   columns={columns}
//                   data={data}
//                   pagination
//                   highlightOnHover
//                   progressPending={loading}
//                   paginationPerPage={10}
//                   paginationRowsPerPageOptions={[10, 20, 30, 50]}
//                   noDataComponent={
//                     <Typography sx={{ p: 3, textAlign: "center" }}>
//                       No critical incidents found. Try adjusting your filters.
//                     </Typography>
//                   }
//                   customStyles={{
//                     table: {
//                       style: {
//                         border: "1px solid #e0e0e0",
//                       },
//                     },
//                     headCells: {
//                       style: {
//                         backgroundColor: "#307eac",
//                         fontWeight: "bold",
//                         color: "#fff",
//                         borderRight: "1px solid #fff",
//                         borderBottom: "1px solid #e0e0e0",
//                       },
//                     },
//                     cells: {
//                       style: {
//                         borderRight: "1px solid #e0e0e0",
//                         borderBottom: "1px solid #e0e0e0",
//                       },
//                     },
//                   }}
//                 />
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CriticalEventList;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Grid,
  Chip,
  CircularProgress,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import * as XLSX from "xlsx";
import InfoIcon from "@mui/icons-material/Info";
import UpdateIcon from "@mui/icons-material/Update";
import VisibilityIcon from "@mui/icons-material/Visibility";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import RefreshIcon from "@mui/icons-material/Refresh";
import TableViewIcon from "@mui/icons-material/TableView";

const CriticalEventList = () => {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const userName = userData.data.user.name || "";
  const userRole = userData.data.role_name || "";
  const userEmail = userData.data.user.email;

  const [regionalHead, setRegionalHead] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status") || ""; // "open" or "closed"

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    year: "",
    startmonth: "",
    endmonth: "",
    region: "",
    state: "",
    incidents: "",
    regional_head: "",
  });
  const [filterOptions, setFilterOptions] = useState({
    years: [],
    months: [],
    regions: [],
    states: [],
    incidents: [],
    regionalHeads: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [error, setError] = useState(null);
  const [showAllColumns, setShowAllColumns] = useState(false);

  // Count active filters
  useEffect(() => {
    const count = Object.values(filters).filter((val) => val !== "").length;
    setActiveFiltersCount(count);
  }, [filters]);

  const fetchData = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const baseParams = {
        user_role: userRole,
        username: userName,
        activity_type: "CI",
      };

      const response = await axios.get(
        "https://api.mfinindia.org/api/auth/meetings/getcidata/filter",
        {
          params: { ...baseParams, ...params },
        }
      );

      // Filter data based on status (case-insensitive)
      const statusFilteredData = response.data.data.filter((item) => {
        if (!item.hod_observation) return false;

        const obs = item.hod_observation.toLowerCase();
        const statusLower = status.toLowerCase();

        // Include 'reopen' always
        return obs === statusLower || obs === "reopen";
      });

      console.log("Filtered Data:", statusFilteredData);

      // ✅ Sort Reopen to top
      statusFilteredData.sort((a, b) => {
        const obsA = a.hod_observation ? a.hod_observation.toLowerCase() : "";
        const obsB = b.hod_observation ? b.hod_observation.toLowerCase() : "";

        if (obsA === "reopen" && obsB !== "reopen") return -1;
        if (obsA !== "reopen" && obsB === "reopen") return 1;
        return 0;
      });

      setData(statusFilteredData);

      // Update filter options, ensuring we don't overwrite with empty arrays if not provided
      setFilterOptions((prev) => ({
        years:
          (response.data.filters &&
            response.data.filters.years &&
            response.data.filters.years.filter(Boolean)) ||
          prev.years,
        months:
          (response.data.filters &&
            response.data.filters.months &&
            response.data.filters.months.filter(Boolean)) ||
          prev.months,
        regions:
          (response.data.filters && response.data.filters.regions) ||
          prev.regions,
        states:
          (response.data.filters && response.data.filters.states) ||
          prev.states,
        incidents:
          (response.data.filters &&
            response.data.filters.incidents &&
            response.data.filters.incidents.filter(Boolean)) ||
          prev.incidents,
        regionalHeads:
          (response.data.filters && response.data.filters.regional_heads) ||
          prev.regionalHeads,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  //fetching regional head data
  useEffect(() => {
    const fetchRegionalHead = async () => {
      try {
        const response = await axios.get(
          "https://api.mfinindia.org/api/auth/meetings/user/getRole18Users"
        );
        console.log("regionalhead", response.data.names);
        setRegionalHead(response.data.names);
      } catch (err) {
        console.log("regionalhead-err", err.response);
      }
    };

    fetchRegionalHead();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    // Prepare filter params, removing empty values
    const filterParams = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "")
    );
    fetchData(filterParams);
  };

  const resetFilters = () => {
    setFilters({
      year: "",
      startmonth: "",
      endmonth: "",
      region: "",
      state: "",
      incidents: "",
      regional_head: "",
    });
    fetchData(); // Fetch without any filters
  };

  const handleEdit = (row) => {
    navigate(`/edit-meeting/${row.id}`);
  };

  const handleUpdateClick = (row) => {
    navigate(`/update-meeting/${row.id}`);
  };

  const handleViewClick = (row) => {
    navigate("/view-content", { state: { rowData: row } });
  };

  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://api.mfinindia.org/api/auth/meetings/delete/${row.id}`
        );
        setData((prev) => prev.filter((item) => item.id !== row.id));
      } catch (error) {
        console.error("Error deleting meeting:", error);
        alert("Failed to delete. Please try again.");
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedRows.length} selected items?`
    );
    if (!confirmDelete) return;

    try {
      await Promise.all(
        selectedRows.map((row) =>
          axios.delete(
            `https://api.mfinindia.org/api/auth/meetings/delete/${row.id}`
          )
        )
      );
      setData((prev) =>
        prev.filter((item) => !selectedRows.some((row) => row.id === item.id))
      );
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    } catch (error) {
      console.error("Error deleting meetings:", error);
      alert("Failed to delete some items. Please try again.");
    }
  };

  const exportToExcel = () => {
    if (data.length === 0) {
      alert("No data to export");
      return;
    }

    const columnsToExclude = ["updated_at"];

    const htmlToText = (html) => {
      if (!html) return "";
      const temp = document.createElement("div");
      temp.innerHTML = html;
      return temp.textContent || temp.innerText || "";
    };

    const parseSafeDateTime = (value) => {
      if (!value) return null;
      const d = new Date(value);
      if (!isNaN(d)) return d; // Keep full datetime
      return null;
    };

    const exportData = data.map((item) => {
      const newItem = { ...item };
      columnsToExclude.forEach((col) => delete newItem[col]);

      // ✅ Keep full datetime for Excel
      newItem.dateOfMeeting = parseSafeDateTime(newItem.dateOfMeeting);

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

      let dateOfEntry = null;
      if (newItem.hasOwnProperty("created_at")) {
        dateOfEntry = parseSafeDateTime(newItem["created_at"]);
        delete newItem["created_at"];
      }

      const reorderedItem = {};
      for (const key in newItem) {
        if (key === "dateOfMeeting" && dateOfEntry) {
          reorderedItem["dateOfEntry"] = dateOfEntry;
        }
        reorderedItem[key] = newItem[key];

        if (
          key === "status_update" &&
          newItem["Head_SI_Remark"] !== undefined
        ) {
          reorderedItem["Head_SI_Remark"] = newItem["Head_SI_Remark"];
        }
      }

      if (!newItem.dateOfMeeting && dateOfEntry) {
        reorderedItem["dateOfEntry"] = dateOfEntry;
      }

      return reorderedItem;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);

    // ✅ Apply Excel datetime format
    const headers = Object.keys(exportData[0]);
    ["dateOfMeeting", "dateOfEntry"].forEach((colName) => {
      const colIndex = headers.indexOf(colName);
      if (colIndex !== -1) {
        const range = XLSX.utils.decode_range(ws["!ref"]);
        for (let R = range.s.r + 1; R <= range.e.r; R++) {
          const cellAddress = XLSX.utils.encode_cell({ r: R, c: colIndex });
          const cell = ws[cellAddress];
          if (cell && cell.v instanceof Date) {
            cell.t = "d"; // Date type for Excel
            cell.z = "dd-mmm-yyyy  hh:mm:ss"; // Keep time
          }
        }
      }
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SIT");

    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const filename = `Critical_Incidents_${timestamp}_${randomNum}.xlsx`;

    XLSX.writeFile(wb, filename);
  };

  // HOD/SI Remark Column (ALWAYS LAST) - COMPACT VERSION
  const hodSiRemarkColumn = {
    name: "HOD/SI Remark",
    cell: (row) => {
      const [comment, setComment] = useState(row.comment || "");
      const [status, setStatus] = useState(row.status || "");

      const handleUpdate = async () => {
        if (!status) {
          alert("Please select a status");
          return;
        }
        try {
          await axios.post(
            `https://api.mfinindia.org/api/auth/meetings/archmeeting_update_new/${row.id}`,
            {
              id: row.id,
              regional_head: row.regional_head,
              hodObservation: status,
              statusUpdate: comment,
              loginemail: userEmail,
              username: userName,
              activity_type: row.activity_type,
            }
          );
          alert("Data Updated Successfully!");
          fetchData(); // Refresh data
        } catch (error) {
          console.error("Update failed:", error);
          alert("Update failed. Please try again.");
        }
      };

      return (
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "3px", 
          minWidth: "220px",
          maxWidth: "220px"
        }}>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              padding: "3px 6px",
              borderRadius: "3px",
              border: "1px solid #ccc",
              minWidth: "75px",
              fontSize: "10px",
              textAlign: "left",
              height: "28px"
            }}
          >
            <option value="">Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comments..."
            style={{
              padding: "3px 5px",
              borderRadius: "3px",
              border: "1px solid #ccc",
              width: "90px",
              minWidth: "90px",
              resize: "vertical",
              minHeight: "28px",
              maxHeight: "60px",
              fontSize: "10px",
              textAlign: "left",
              fontFamily: "inherit",
              lineHeight: "1.2"
            }}
          />

          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleUpdate}
            sx={{ 
              minWidth: "26px", 
              width: "26px",
              height: "26px",
              minHeight: "26px",
              p: 0
            }}
          >
            <UpdateIcon fontSize="small" />
          </Button>
        </div>
      );
    },
    ignoreRowClick: true,
    width: "220px",
    minWidth: "220px",
    maxWidth: "220px",
    center: false,
    omit: !(
      userRole === "Admin" ||
      userRole === "Vertical-Head" ||
      userRole === "SI_Admin"
    ),
  };

  // SEPARATE ACTION COLUMNS

  // View Column
  const viewColumn = {
    name: "View",
    cell: (row) => (
      <Tooltip title="View Details">
        <IconButton
          color="info"
          size="small"
          onClick={() => handleViewClick(row)}
          sx={{ 
            minWidth: "32px", 
            width: "32px",
            height: "32px"
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    ),
    ignoreRowClick: true,
    width: "80px",
    minWidth: "80px",
    maxWidth: "80px",
    center: true,
  };

  // Edit Column - Only show when status is NOT "closed"
  const editColumn = {
    name: "Edit",
    cell: (row) => {
      const isClosed = row.hod_observation && row.hod_observation.toLowerCase() === "closed";
      
      // Don't show Edit button if status is "closed"
      if (isClosed) return null;

      return (
        <Tooltip title="Edit">
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleEdit(row)}
            sx={{ 
              minWidth: "32px", 
              width: "32px",
              height: "32px"
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      );
    },
    ignoreRowClick: true,
    width: "80px",
    minWidth: "80px",
    maxWidth: "80px",
    center: true,
    omit:
      userRole === "Admin" ||
      userRole === "Vertical-Head" ||
      userRole === "SI_Admin",
  };

  // Update Column - Only show when status is NOT "open"
  const updateColumn = {
    name: "Update",
    cell: (row) => {
      const isOpen = row.hod_observation && row.hod_observation.toLowerCase() === "open";
      
      // Don't show Update button if status is "open"
      if (isOpen) return null;

      return (
        <Tooltip title="Update">
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleUpdateClick(row)}
            sx={{ 
              minWidth: "32px", 
              width: "32px",
              height: "32px"
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      );
    },
    ignoreRowClick: true,
    width: "80px",
    minWidth: "80px",
    maxWidth: "80px",
    center: true,
    omit:
      userRole === "Admin" ||
      userRole === "Vertical-Head" ||
      userRole === "SI_Admin",
  };

  // Delete Column
  const deleteColumn = {
    name: "Delete",
    cell: (row) => (
      <Tooltip title="Delete">
        <IconButton
          color="error"
          size="small"
          onClick={() => handleDelete(row)}
          sx={{ 
            minWidth: "32px", 
            width: "32px",
            height: "32px"
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    ),
    ignoreRowClick: true,
    width: "80px",
    minWidth: "80px",
    maxWidth: "80px",
    center: true,
  };

  // Track Column
// Track Column - Blue color for normal, Red for Reopen
const trackColumn = {
  name: "Track",
  cell: function (row) {
    var isReopen =
      row.hod_observation && row.hod_observation.toLowerCase() === "reopen";
    return (
      <Tooltip title="Track Meeting">
        <IconButton
          size="small"
          onClick={() => navigate(`/meeting-tracking/${row.id}`)}
          sx={{
            minWidth: "38px",
            width: "38px",
            height: "32px",
            backgroundColor: isReopen ? "#ff4444" : "transparent",
            color: isReopen ? "#ffffff" : "#1976d2", // Blue color for normal track
            fontWeight: isReopen ? "bold" : "normal",
            animation: isReopen ? "pulse 1.5s ease-in-out infinite" : "none",
            '&:hover': {
              backgroundColor: isReopen ? "#ff2222" : "rgba(25, 118, 210, 0.04)",
              transform: isReopen ? "scale(1.1)" : "scale(1.05)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <InfoIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    );
  },
  ignoreRowClick: true,
  width: "80px",
  minWidth: "80px",
  maxWidth: "80px",
  center: true,
};

  // Define ALL columns in EXACT SERIES/ORDER for "View All Columns"
  const allColumnsInSeries = [
    // 1. MID
    {
      name: "MID",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
      minWidth: "80px",
      maxWidth: "80px",
    },
    // 2. State
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true,
      width: "130px",
      minWidth: "130px",
      cell: (row) => (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          textAlign: 'left'
        }}>
          {row.state || '-'}
        </div>
      )
    },
    // 3. District
    {
      name: "District",
      selector: (row) => row.district,
      sortable: true,
      width: "130px",
      minWidth: "130px",
      cell: (row) => (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          textAlign: 'left'
        }}>
          {row.district || '-'}
        </div>
      )
    },
    // 4. Region
    {
      name: "Region",
      selector: (row) => row.region,
      sortable: true,
      width: "120px",
      minWidth: "120px",
      cell: (row) => (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          textAlign: 'left'
        }}>
          {row.region || '-'}
        </div>
      )
    },
    // 5. Regional Head
    {
      name: "Regional Head",
      selector: (row) => row.regional_head,
      sortable: true,
      width: "150px",
      minWidth: "150px",
      cell: (row) => (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          textAlign: 'left'
        }}>
          {row.regional_head || '-'}
        </div>
      ),
      omit: !(
        userRole === "Admin" ||
        userRole === "Vertical-Head" ||
        userRole === "SI_Admin"
      ),
    },
    // 6. Village
    {
      name: "Village",
      selector: (row) => row.village,
      sortable: true,
      width: "120px",
      minWidth: "120px",
      cell: (row) => (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          textAlign: 'left'
        }}>
          {row.village || '-'}
        </div>
      )
    },
    // 7. Incidents - SHOW IN ONE LINE WITH ELLIPSIS
    {
      name: "Incidents",
      selector: (row) => row.incidents,
      sortable: true,
      width: "150px",
      minWidth: "150px",
      cell: (row) => (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          textAlign: 'left'
        }}>
          {row.incidents || '-'}
        </div>
      )
    },
    // 8. Source of Information
    {
      name: "Source of Information",
      selector: (row) => row.source_of_information,
      sortable: true,
      width: "200px",
      minWidth: "200px",
      cell: (row) => (
        <div
          title={row.source_of_information}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            textAlign: 'left'
          }}
        >
          {row.source_of_information || '-'}
        </div>
      )
    },
    // 9. Short Description - SHOW IN ONE LINE WITH ELLIPSIS
    {
      name: "Short Description",
      selector: (row) => row.short_description,
      sortable: true,
      width: "200px",
      minWidth: "200px",
      cell: (row) => (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          textAlign: 'left'
        }}>
          {row.short_description || '-'}
        </div>
      )
    },
    // 10. Meeting Date
    {
      name: "Meeting Date",
      selector: (row) => row.dateOfMeeting,
      sortable: true,
      cell: (row) =>
        row.dateOfMeeting
          ? new Date(row.dateOfMeeting).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "-",
      width: "140px",
      minWidth: "140px",
      style: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }
    },
    // 11. Activity Detail(s) - FIXED VERSION
    {
      name: "Activity Detail(s)",
      cell: (row) => {
        if (!row.activity_details) return "-";
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = row.activity_details;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
        
        return (
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
              fontSize: '12px',
              textAlign: 'left'
            }}
            title={plainText}
          >
            {plainText}
          </div>
        );
      },
      sortable: true,
      width: "200px",
      minWidth: "200px",
    },
    // 12. Date Of Entry
    {
      name: "Date Of Entry",
      selector: (row) => row.created_at,
      sortable: true,
      cell: (row) =>
        row.created_at
          ? new Date(row.created_at).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "-",
      width: "180px",
      minWidth: "180px",
    },
    // 13. URL
    {
      name: "URL",
      cell: (row) =>
        row.url ? (
          <a
            href={row.url.startsWith("http") ? row.url : `https://${row.url}`}
            target="_blank"
            rel="noopener noreferrer"
            title={row.url}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#1976d2",
            }}
          >
            <OpenInNewIcon fontSize="small" />
          </a>
        ) : (
          <span>—</span>
        ),
      sortable: false,
      width: "70px",
      minWidth: "70px",
      maxWidth: "70px",
      center: true,
    },
    // 14. HOD Observations - COMPACT VERSION
    {
      name: "HOD Observations",
      selector: (row) => row.hod_observation,
      sortable: true,
      width: "200px",
      minWidth: "150px",
      maxWidth: "150px",
      cell: (row) => {
        const isReopen =
          row.hod_observation && row.hod_observation.toLowerCase() === "reopen";

        return (
          <div
            title={row.hod_observation}
            style={{
              color: isReopen ? "#ff4444" : "inherit",
              fontWeight: isReopen ? "bold" : "normal",
              textTransform: isReopen ? "uppercase" : "none",
              animation: isReopen ? "pulse 1.5s ease-in-out infinite" : "none",
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '4px 0',
              fontSize: '12px'
            }}
          >
            {row.hod_observation}
          </div>
        );
      },
    },
    // 15. View Column
    viewColumn,
    // 16. Edit Column
    editColumn,
    // 17. Update Column
    updateColumn,
    // 18. Delete Column
    deleteColumn,
    // 19. Track Column
    trackColumn,
    // 20. HOD/SI Remark Column (ALWAYS LAST)
    hodSiRemarkColumn,
  ].filter(Boolean);

  // Define DEFAULT view columns (only basic columns + action columns)
  const defaultViewColumns = [
    // 1. MID
    {
      name: "MID",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
      minWidth: "80px",
      maxWidth: "80px",
    },
    // 2. State
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true,
      width: "130px",
      minWidth: "130px",
      cell: (row) => (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          textAlign: 'left'
        }}>
          {row.state || '-'}
        </div>
      )
    },
    // 3. District
    {
      name: "District",
      selector: (row) => row.district,
      sortable: true,
      width: "130px",
      minWidth: "130px",
      cell: (row) => (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          textAlign: 'left'
        }}>
          {row.district || '-'}
        </div>
      )
    },
    // 4. Incidents - SHOW IN ONE LINE WITH ELLIPSIS
    {
      name: "Incidents",
      selector: (row) => row.incidents,
      sortable: true,
      width: "150px",
      minWidth: "150px",
      cell: (row) => (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          textAlign: 'left'
        }}>
          {row.incidents || '-'}
        </div>
      )
    },
    // 5. Source of Information
    {
      name: "Source of Information",
      selector: (row) => row.source_of_information,
      sortable: true,
      width: "200px",
      minWidth: "200px",
      cell: (row) => (
        <div
          title={row.source_of_information}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            textAlign: 'left'
          }}
        >
          {row.source_of_information || '-'}
        </div>
      )
    },
    // 6. Meeting Date
    {
      name: "Meeting Date",
      selector: (row) => row.dateOfMeeting,
      sortable: true,
      cell: (row) =>
        row.dateOfMeeting
          ? new Date(row.dateOfMeeting).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "-",
      width: "140px",
      minWidth: "140px",
      style: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }
    },
    // 7. HOD Observations - COMPACT VERSION
    {
      name: "HOD Observations",
      selector: (row) => row.hod_observation,
      sortable: true,
      width: "198px",
      minWidth: "150px",
      maxWidth: "150px",
      cell: (row) => {
        const isReopen =
          row.hod_observation && row.hod_observation.toLowerCase() === "reopen";

        return (
          <div
            title={row.hod_observation}
            style={{
              color: isReopen ? "#ff4444" : "inherit",
              fontWeight: isReopen ? "bold" : "normal",
              textTransform: isReopen ? "uppercase" : "none",
              animation: isReopen ? "pulse 1.5s ease-in-out infinite" : "none",
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '4px 0',
              fontSize: '12px'
            }}
          >
            {row.hod_observation}
          </div>
        );
      },
    },
    // 8. View Column
    viewColumn,
    // 9. Edit Column
    editColumn,
    // 10. Update Column
    updateColumn,
    // 11. Delete Column
    deleteColumn,
    // 12. Track Column
    trackColumn,
    // 13. HOD/SI Remark Column (ALWAYS LAST)
    hodSiRemarkColumn,
  ].filter(Boolean);

  // Final columns based on view mode
  const columns = showAllColumns ? allColumnsInSeries : defaultViewColumns;

  const contextActions = (
    <Button
      key="delete"
      onClick={handleBulkDelete}
      variant="contained"
      color="error"
      startIcon={<DeleteIcon />}
      disabled={selectedRows.length === 0}
    >
      Delete Selected ({selectedRows.length})
    </Button>
  );

  const toggleAllColumns = () => {
    setShowAllColumns(!showAllColumns);
  };

  return (
    <div className="AddMeeting mt-6">
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-12">
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Button
                onClick={() => navigate(-1)}
                startIcon={<ArrowBackIcon />}
                sx={{ mr: 2 }}
              >
                {/* Back */}
              </Button>
              <Typography variant="h4" component="h1" sx={{ textAlign: 'center', width: '100%' }}>
                Critical Incidents
              </Typography>

              {activeFiltersCount > 0 && (
                <Chip
                  label={`${activeFiltersCount} active filter(s)`}
                  color="primary"
                  size="small"
                  sx={{ ml: 2 }}
                />
              )}

              <Box sx={{ ml: "auto" }}>
                <Button
                  variant={showAllColumns ? "contained" : "outlined"}
                  color="primary"
                  onClick={toggleAllColumns}
                  startIcon={<TableViewIcon />}
                >
                  {showAllColumns ? "Default View" : "View All Columns"}
                </Button>
              </Box>
            </Box>

            {/* Filter Section */}
            <Box
              sx={{
                mb: 3,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Grid container spacing={2} alignItems="center">
                {(userRole === "Admin" ||
                  userRole === "Vertical-Head" ||
                  userRole === "SI_Admin") && (
                  <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Regional Head</InputLabel>
                      <Select
                        name="regional_head"
                        value={filters.regional_head}
                        onChange={handleFilterChange}
                        label="Regional Head"
                      >
                        <MenuItem value="">All Regional Head</MenuItem>
                        {filterOptions.regionalHeads.map((region) => (
                          <MenuItem key={region} value={region}>
                            {region}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Year</InputLabel>
                    <Select
                      name="year"
                      value={filters.year}
                      onChange={handleFilterChange}
                      label="Year"
                    >
                      <MenuItem value="">All Years</MenuItem>
                      {filterOptions.years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Start Month</InputLabel>
                    <Select
                      name="startmonth"
                      value={filters.startmonth}
                      onChange={handleFilterChange}
                      label="Start Month"
                    >
                      <MenuItem value="">All Months</MenuItem>
                      {filterOptions.months.map((month) => (
                        <MenuItem key={month} value={month}>
                          {month}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>End Month</InputLabel>
                    <Select
                      name="endmonth"
                      value={filters.endmonth}
                      onChange={handleFilterChange}
                      label="End Month"
                    >
                      <MenuItem value="">All Months</MenuItem>
                      {filterOptions.months.map((month) => (
                        <MenuItem key={month} value={month}>
                          {month}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Region</InputLabel>
                    <Select
                      name="region"
                      value={filters.region}
                      onChange={handleFilterChange}
                      label="Region"
                    >
                      <MenuItem value="">All Regions</MenuItem>
                      {filterOptions.regions.map((region) => (
                        <MenuItem key={region} value={region}>
                          {region}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>State</InputLabel>
                    <Select
                      name="state"
                      value={filters.state}
                      onChange={handleFilterChange}
                      label="State"
                    >
                      <MenuItem value="">All States</MenuItem>
                      {filterOptions.states.map((state) => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Critical Event</InputLabel>
                    <Select
                      name="incidents"
                      value={filters.incidents}
                      onChange={handleFilterChange}
                      label="Critical Event"
                    >
                      <MenuItem value="">All Events</MenuItem>
                      {filterOptions.incidents.map((incident) => (
                        <MenuItem key={incident} value={incident}>
                          {incident}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={applyFilters}
                    fullWidth
                    startIcon={<FilterAltIcon />}
                    disabled={loading}
                  >
                    Apply Filters
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    variant="outlined"
                    onClick={resetFilters}
                    fullWidth
                    startIcon={<FilterAltOffIcon />}
                    disabled={loading}
                  >
                    Reset
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    variant="outlined"
                    onClick={() => fetchData()}
                    fullWidth
                    startIcon={<RefreshIcon />}
                    disabled={loading}
                  >
                    Refresh
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<DownloadIcon />}
                    onClick={exportToExcel}
                    fullWidth
                    disabled={loading || data.length === 0}
                    style={{
                      backgroundColor: "rgb(25 118 210)",
                      fontWeight: "bold",
                    }}
                  >
                    Export Excel
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {/* Data Table */}
            {error ? (
              <Box
                sx={{
                  p: 3,
                  border: "1px solid #ffebee",
                  backgroundColor: "#ffebee",
                  borderRadius: 1,
                  textAlign: "center",
                }}
              >
                <Typography color="error">{error}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => fetchData()}
                  sx={{ mt: 2 }}
                >
                  Retry
                </Button>
              </Box>
            ) : loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 3,
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1">
                    Showing {data.length} records
                    {showAllColumns ? " (All Columns)" : " (Default View)"}
                  </Typography>
                  {selectedRows.length > 0 && contextActions}
                </Box>

                <Box sx={{ 
                  border: "1px solid #e0e0e0", 
                  borderRadius: 1, 
                  overflow: "hidden",
                  '& .rdt_Table': {
                    minWidth: showAllColumns ? 'fit-content' : '100%',
                  },
                  '& .rdt_TableWrapper': {
                    overflowX: showAllColumns ? 'auto' : 'hidden',
                  }
                }}>
                  <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    highlightOnHover
                    progressPending={loading}
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 20, 30, 50]}
                    noDataComponent={
                      <Typography sx={{ p: 3, textAlign: "center" }}>
                        No critical incidents found. Try adjusting your filters.
                      </Typography>
                    }
                    customStyles={{
                      table: {
                        style: {
                          tableLayout: 'fixed',
                          width: '100%',
                          minWidth: showAllColumns ? 'fit-content' : '100%',
                        },
                      },
                      tableWrapper: {
                        style: {
                          overflowX: showAllColumns ? 'auto' : 'hidden',
                          minWidth: '100%',
                        },
                      },
                      headCells: {
                        style: {
                          backgroundColor: "#307eac",
                          fontWeight: "bold",
                          color: "#fff",
                          borderRight: "1px solid #fff",
                          borderBottom: "1px solid #e0e0e0",
                          padding: "8px 12px",
                          fontSize: "14px",
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                          textAlign: 'center',
                          justifyContent: 'center'
                        },
                      },
                      cells: {
                        style: {
                          borderRight: "1px solid #e0e0e0",
                          borderBottom: "1px solid #e0e0e0",
                          padding: "8px 12px",
                          fontSize: "13px",
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                          textAlign: 'left',
                          justifyContent: 'flex-start'
                        },
                      },
                    }}
                    fixedHeader
                    fixedHeaderScrollHeight="calc(100vh - 300px)"
                    dense
                  />
                </Box>

                <style jsx global>{`
                  @keyframes pulse {
                    0% { 
                      opacity: 1;
                      box-shadow: 0 0 0 0 rgba(255, 68, 68, 0.7);
                    }
                    50% { 
                      opacity: 0.8;
                      box-shadow: 0 0 0 10px rgba(106, 148, 227, 0);
                    }
                    100% { 
                      opacity: 1;
                      box-shadow: 0 0 0 0 rgba(53, 154, 212, 0);
                    }
                  }
                  
                  @keyframes blinkTrack {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.15); }
                    100% { opacity: 1; transform: scale(1); }
                  }
                `}</style>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriticalEventList;