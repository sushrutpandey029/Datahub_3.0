import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Box from "@mui/material/Box";
import Breadcrumb from "../common/Breadcrumb";
import axios from "axios";
import GrassIcon from "@mui/icons-material/Grass";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import "./PublicationList.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableViewIcon from "@mui/icons-material/TableView";

const Rbi = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    id: null,
    record: null,
  });
  const navigate = useNavigate();

  // API URLs
  const LIVE_API_URL = "https://api.mfinindia.org/api/auth/rbi_data_list";
  const DELETE_API_URL = "https://api.mfinindia.org/api/auth/rbi_data_delete";

  const columns = [
    {
      name: "Financial Year",
      selector: (row) => row.fy_year || row.financialyear,
      center: true,
      sortable: true,
      width: "200px",
      wrap: true,
    },
    {
      name: "Quarter",
      selector: (row) => row.quarter,
      center: true,
      sortable: true,
      width: "180px",
      wrap: true,
    },
    {
      name: (
        <div style={{ textAlign: "center" }}>
          <div>Documents</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "40px",
              fontSize: "13px",
              marginTop: "5px",
              padding: "0 25px",
            }}
          >
            <strong>Part I</strong>
            <strong>Part II</strong>
          </div>
        </div>
      ),
      cell: (row) => {
        const part1 = row.parts.find(function (p) {
          return p.part === "Part I";
        });
        const part2 = row.parts.find(function (p) {
          return p.part === "Part II";
        });

        const renderButton = function (file) {
          if (!file) return null;
          const fileName = file.toLowerCase();
          const isPDF = fileName.endsWith(".pdf");
          const isExcel =
            fileName.endsWith(".xlsx") || fileName.endsWith(".xls");

          return (
            <Button
              variant="contained"
              size="small"
              onClick={() => handleViewFile(file)}
              startIcon={isPDF ? <PictureAsPdfIcon /> : <TableViewIcon />}
              style={{
                fontSize: "10px",
                marginTop: "3px",
                backgroundColor: isPDF ? "red" : "green",
                minWidth: "70px",
              }}
            >
              {isPDF ? "PDF" : "Excel"}
            </Button>
          );
        };

        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "200px",
              padding: "0 20px",
            }}
          >
            <div style={{ textAlign: "left" }}>
              {part1 ? renderButton(part1.file) : ""}
            </div>
            <div style={{ textAlign: "left" }}>
              {part2 ? renderButton(part2.file) : ""}
            </div>
          </div>
        );
      },
      center: true,
      width: "300px",
    },

    {
      name: "Uploaded Date",
      selector: (row) => {
        // Handle both grouped data and regular data
        if (row.created_at) {
          return new Date(row.created_at).toLocaleDateString();
        }
        return "N/A";
      },
      center: true,
      sortable: true,
      width: "180px",
      wrap: true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <Button
          onClick={() => handleEdit(row)}
          variant="outlined"
          color="primary"
          startIcon={<ModeEditIcon />}
          size="small"
          style={{
            fontSize: "11px",
            // padding: "4px 8px",
            minWidth: "auto",
          }}
          disabled={deleteLoading === row.id}
        ></Button>
      ),
      center: true,
      width: "90px",
    },
    {
      name: "Delete",
      cell: (row) => (
        <Button
          variant="outlined"
          color="error"
          startIcon={
            deleteLoading === row.id ? (
              <CircularProgress size={16} />
            ) : (
              <DeleteIcon />
            )
          }
          size="small"
          onClick={() => openDeleteDialog(row.id, row)}
          disabled={deleteLoading === row.id}
          style={{
            fontSize: "11px",
            padding: "4px 8px",
            minWidth: "auto",
          }}
        >
          {deleteLoading === row.id ? "Deleting..." : ""}
        </Button>
      ),
      center: true,
      width: "90px",
    },
  ];

  // Live Data Fetch Function
  const fetchLiveData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching live RBI data from:", LIVE_API_URL);

      const response = await axios.get(LIVE_API_URL, {
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log(
        "API Response in rbi",
        JSON.stringify(response.data, null, 2)
      );

      if (response.data.status === true && Array.isArray(response.data.data)) {
        const liveData = response.data.data.map((item) => ({
          id: item.id,
          financialyear: item.fy_year,
          fy_year: item.fy_year,
          quarter: item.quarter,
          part: item.Part,
          Part: item.Part,
          pdf_file: item.document,
          document: item.document,
          created_at: item.created_at,
          updated_at: item.updated_at,
          pdd: "Yes",
          image: `rbi_thumbnail_${item.id}.jpg`,
          date: new Date(item.created_at).toISOString().split("T")[0],
          category:
            item.quarter && item.quarter.toLowerCase().includes("q")
              ? "quarterly"
              : "annual",
        }));

        console.log("Processed live data:", JSON.stringify(liveData, null, 2));
        setData(liveData);
        setFilterData(liveData);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err) {
      console.error("Live API fetch failed:", err);
      setError(`Live data fetch failed: ${err.message}. Using static data.`);

      // Fallback to static data
      const staticRbiData = [
        {
          id: 1,
          financialyear: "2023-24",
          quarter: "Q4",
          part: "Part A",
          pdd: "Yes",
          pdf_file: "rbi_report_q4_2024.pdf",
          image: "rbi_thumbnail_1.jpg",
          date: "2024-03-31",
          category: "quarterly",
        },
      ];
      setData(staticRbiData);
      setFilterData(staticRbiData);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    navigate(`/updaterbidata/${row.id}`);
  };

  // Delete Confirmation Dialog
  const openDeleteDialog = (id, record) => {
    console.log("record in delte", record);
    setDeleteDialog({
      open: true,
      id: id,
      record: record,
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      id: null,
      record: null,
    });
  };

  const handleDelete = async (id) => {
    try {
      setDeleteLoading(id);

      const response = await axios.delete(`${DELETE_API_URL}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        // Update local state if server deletion was successful
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        setFilterData(updatedData);

        console.log(`Deleted record with id: ${id}, response.data`);
        setError(null);

        // Show success message
        setTimeout(() => {
          // Auto-hide success
        }, 3000);
      }
    } catch (err) {
      console.log("Delete error:", err);

      if (err.response) {
        setError(
          `Failed to delete record: ${
            err.response.data.message || "Server error"
          }`
        );
      } else if (err.request) {
        setError("Failed to delete record: No response from server");
      } else {
        setError(`Failed to delete record: ${err.message}`);
      }

      // Re-fetch data to ensure sync with server
      fetchLiveData();
    } finally {
      setDeleteLoading(null);
      closeDeleteDialog();
    }
  };

  const handleViewFile = (filePath) => {
    if (filePath) {
      const fullFileUrl = filePath.startsWith("http")
        ? filePath
        : `https://api.mfinindia.org/public/${filePath}`;

      // Check file type
      const isPDF = filePath.toLowerCase().endsWith(".pdf");
      const isExcel =
        filePath.toLowerCase().endsWith(".xlsx") ||
        filePath.toLowerCase().endsWith(".xls");

      if (isPDF) {
        // For PDFs, open in new tab
        window.open(fullFileUrl, "_blank");
      } else if (isExcel) {
        // For Excel files, force download
        const link = document.createElement("a");
        link.href = fullFileUrl;
        link.setAttribute("download", "");
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // For other files, open in new tab
        window.open(fullFileUrl, "_blank");
      }
    }
  };

  // Refresh data function
  const handleRefresh = () => {
    fetchLiveData();
  };

  useEffect(() => {
    fetchLiveData();
  }, []);

  // Custom styles
  const customStyles = {
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "1rem",
        padding: "0.5rem",
        textAlign: "center",
      },
    },
    cells: {
      style: {
        textAlign: "center",
        padding: "0.5rem",
        fontSize: "0.9rem",
      },
    },
    rows: {
      style: {
        minHeight: "60px",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      },
    },
  };

  const groupedData = Object.values(
    data.reduce((acc, item) => {
      const key = `${item.fy_year}-${item.quarter}`;
      if (!acc[key]) {
        acc[key] = {
          id: item.id, // ✅ Add this for delete/edit functionality
          fy_year: item.fy_year,
          quarter: item.quarter,
          created_at: item.created_at, // ✅ ADD THIS LINE
          parts: [],
        };
      }

      acc[key].parts.push({
        part: item.Part,
        file: item.document,
      });

      return acc;
    }, {})
  );

  return (
    <Box sx={{ flexGrow: 1 }} mt={12}>
      <Grid container justifyContent={"space-between"} spacing={2}>
        <Grid
          xs={12}
          sm={12}
          md={12}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Breadcrumb title="RBI Report List" icon={GrassIcon} />
 
          <Button
            className="btn-primary"
            variant="contained"
            onClick={() => navigate("/rbi_add_data")}
            size="small"
          >
            Add New Report
          </Button>
        </Grid>

        {/* Error Alert */}
        {error && (
          <Grid xs={12}>
            <Alert
              severity={error.includes("Failed") ? "error" : "warning"}
              onClose={() => setError(null)}
              action={
                <Button color="inherit" size="small" onClick={handleRefresh}>
                  RETRY
                </Button>
              }
            >
              {error}
            </Alert>
          </Grid>
        )}

        {/* Loading Indicator */}
        {loading && (
          <Grid xs={12} style={{ textAlign: "center", padding: "20px" }}>
            <CircularProgress />
            <div style={{ marginTop: "10px" }}>
              Loading RBI Data from Server...
            </div>
          </Grid>
        )}

        {/* Button Grid */}
        {!loading && (
          <Grid container md={12} justifyContent={"space-between"} spacing={2}>
            <Grid item xs={12} sm={12} md={10} container spacing={1}></Grid>
          </Grid>
        )}

        <Grid xs={12}>
          <Card
            style={{
              marginBottom: "20px",
              width: "100%",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              {!loading && (
                <>
                  <DataTable
                    columns={columns}
                    data={groupedData}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                    customStyles={customStyles}
                    highlightOnHover
                    striped
                    responsive
                    noDataComponent={
                      <div style={{ padding: "20px", textAlign: "center" }}>
                        {data.length === 0
                          ? "No RBI data found."
                          : "No records match your filter."}
                      </div>
                    }
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this RBI data record?
            {deleteDialog.record && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: "#fff3cd",
                  borderRadius: "4px",
                }}
              >
                <strong>Record Details:</strong>
                <br />
                Financial Year: {deleteDialog.record.fy_year}
                <br />
                Quarter: {deleteDialog.record.quarter}
                <br />
                Part: {deleteDialog.record.parts[0].part}
              </div>
            )}
            <br />
            <br />
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} disabled={deleteLoading}>
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(deleteDialog.id)}
            color="error"
            autoFocus
            disabled={deleteLoading}
            startIcon={deleteLoading ? <CircularProgress size={16} /> : null}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Rbi;
