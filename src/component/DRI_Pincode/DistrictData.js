import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../common/Loader";
import {
  TextField,
  Autocomplete,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { BaseUrl, fetchPinCodeData, fetchAllPinCodeData } from "../url/url";

const DistrictData = ({
  districtName,
  stateName,
  selectedMonth,
  selectedYear,
  onClose,
}) => {
  const [districtData, setDistrictData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPinCode, setSelectedPinCode] = useState("");
  const [pinCodes, setPinCodes] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [downloading, setDownloading] = useState(false);

  const API_URL = `${BaseUrl}/${fetchPinCodeData}`;
  const DOWNLOAD_ALL_API = `${BaseUrl}/${fetchAllPinCodeData}`;

  // Always show these columns with formatted display names
  const tableHeaders = [
    { key: "PIN_Code", label: "PIN Code" },
    { key: "GLP", label: "GLP (Rs Cr)" },
    { key: "PAR_1t30", label: "PAR 1-30%" },
    { key: "PAR_31t60", label: "PAR 31-60%" },
    { key: "PAR_61t90", label: "PAR 61-90%" },
    { key: "PAR_91t180", label: "PAR 91-180%" },
    { key: "PAR_180", label: "PAR>180%" },
  ];

  useEffect(() => {
    fetchDistrictData();
  }, [districtName, stateName, selectedMonth, selectedYear]);

  const fetchDistrictData = async (pinCode = null) => {
    if (pinCode) setTableLoading(true);
    else setLoading(true);
    setError(null);

    try {
      const requestBody = {
        state_name: stateName,
        district_name: districtName,
        ...(pinCode && { pincode: pinCode }),
      };

      const response = await axios.post(API_URL, requestBody, {
        params: { monthName: selectedMonth, year: selectedYear },
      });
      console.log("resp pincode", JSON.stringify(response, null, 2));

      if (response.data.status) {
        if (pinCode) {
          // Single PIN mode - data comes in "records" array
          const singleData = response.data.records || [];
          setDisplayedData(singleData);
        } else {
          // Full district data - data comes in "data" object with pincodes as keys
          const data = response.data.data || {};
          console.log("data in pinlist", data);
          const pinList = Object.keys(data);
          setDistrictData(data);
          setPinCodes(pinList);

          // Create an array of all records and sort by GLP in descending order
          const allRecords = [];
          Object.keys(data).forEach((pin) => {
            if (data[pin] && data[pin].length > 0) {
              allRecords.push(data[pin][0]); // Each pin has an array with one object
            }
          });

          // Sort by GLP in descending order (convert to number for proper sorting)
          const sortedRecords = allRecords.sort((a, b) => {
            const glpA = parseFloat(a.GLP) || 0;
            const glpB = parseFloat(b.GLP) || 0;
            return glpB - glpA; // Descending order
          });

          // Take top 10 records with highest GLP
          const top10Records = sortedRecords.slice(0, 10);
          setDisplayedData(top10Records);
        }
      } else {
        setError("No data found for this district");
      }
    } catch (error) {
      console.error("Error fetching district data:", error);
      setError("Error loading district data");
    } finally {
      setLoading(false);
      setTableLoading(false);
    }
  };

  const handlePinCodeChange = (event, newValue) => {
    if (newValue) {
      setSelectedPinCode(newValue);
      fetchDistrictData(newValue);
    } else {
      setSelectedPinCode("");
      if (districtData) {
        const first10Pins = Object.keys(districtData).slice(0, 10);
        const initialRows = first10Pins.flatMap(
          (pin) => districtData[pin] || []
        );
        setDisplayedData(initialRows);
      }
    }
  };

  const handleDownloadAll = async () => {
    try {
      const requestBody = {
        state_name: stateName,
        district_name: districtName,
      };
      setDownloading(true);

      const response = await axios.post(DOWNLOAD_ALL_API, requestBody, {
        params: {
          monthName: selectedMonth,
          year: selectedYear,
        },
      });

      if (response && response.data.status && response.data.data) {
        const { data } = response.data;

        // Use the same headers for CSV download
        const headers = tableHeaders.map((header) => header.key);

        const allRows = Object.keys(data).flatMap((pin) =>
          data[pin].map((record) =>
            headers.map((header) =>
              record[header] !== undefined ? record[header] : ""
            )
          )
        );

        const csvContent = [
          tableHeaders.map((header) => header.label).join(","), // Use formatted labels for CSV header
          ...allRows.map((r) =>
            r.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")
          ),
        ].join("\n");

        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${districtName}_${stateName}_${selectedMonth}_${selectedYear}_all_pincodes.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert("No data available to download.");
      }
    } catch (err) {
      console.error("Error downloading all pincode data:", err);
      alert("Failed to download CSV");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Loader loader={loading} size={30} />
        <p>Loading district data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4">District Data</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      </div>
    );
  }

  return (
    <div style={{ minWidth: "900px" }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">
          {stateName}, {districtName}
          {selectedPinCode && `, ${selectedPinCode}`}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Dropdown + Download */}
      <Box
        display="flex"
        gap={2}
        justifyContent={"space-between"}
        alignItems="center"
        mb={3}
        flexWrap="wrap"
      >
        <Autocomplete
          value={selectedPinCode}
          onChange={handlePinCodeChange}
          options={pinCodes}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select PIN Code"
              variant="outlined"
              size="small"
              style={{ minWidth: "250px" }}
            />
          )}
        />

        <Button
          variant="contained"
          startIcon={
            downloading ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <DownloadIcon />
            )
          }
          onClick={handleDownloadAll}
          disabled={!districtData || downloading}
        >
          {downloading ? "Downloading..." : "Download"}
        </Button>
      </Box>

      {/* Table */}
      {/* <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "white",
          maxHeight: "100vh",
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          "& td": { backgroundColor: "white !important" },
        }}
      >
        {tableLoading ? (
          <Box textAlign="center" py={5}>
            <CircularProgress />
            <Typography mt={2}>Loading data...</Typography>
          </Box>
        ) : displayedData && displayedData.length > 0 ? (
          <Table stickyHeader size="small">
            <TableHead
              sx={{
                "& th": {
                  backgroundColor: "#f4f4f4",
                  fontWeight: "bold",
                },
              }}
            >
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell key={header.key}>{header.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedData.map((row, index) => (
                <TableRow key={index}>
                  {tableHeaders.map((header) => (
                    <TableCell key={header.key}>
                      {row[header.key] !== undefined ? row[header.key] : "N/A"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box textAlign="center" py={4}>
            <Typography variant="body1" color="textSecondary">
              No data available.
            </Typography>
          </Box>
        )}
      </TableContainer> */}

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "white",
          maxHeight: "100vh",
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          "& td": { backgroundColor: "white !important" },
        }}
      >
        {tableLoading ? (
          <Box textAlign="center" py={5}>
            <CircularProgress />
            <Typography mt={2}>Loading data...</Typography>
          </Box>
        ) : displayedData && displayedData.length > 0 ? (
          <>
            <Table stickyHeader size="small">
              <TableHead
                sx={{
                  "& th": {
                    backgroundColor: "#f4f4f4",
                    fontWeight: "bold",
                  },
                }}
              >
                <TableRow>
                  {tableHeaders.map((header) => (
                    <TableCell key={header.key}>{header.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.map((row, index) => (
                  <TableRow key={index}>
                    {tableHeaders.map((header) => (
                      <TableCell key={header.key}>
                        {row[header.key] !== undefined
                          ? row[header.key]
                          : "N/A"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "#fafafa",
                borderTop: "1px solid #ddd",
              }}
            >
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontStyle: "bold" }}
              >
                Note: Sum of all PIN codes GLP in District will not equal the
                aggregated value.
              </Typography>
            </div>
          </>
        ) : (
          <Box textAlign="center" py={4}>
            <Typography variant="body1" color="textSecondary">
              No data available.
            </Typography>
          </Box>
        )}
      </TableContainer>
    </div>
  );
};

export default DistrictData;
