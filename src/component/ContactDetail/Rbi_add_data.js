import { createStyles, makeStyles } from "@material-ui/styles";
import { Button, Card, CardActionArea, Typography } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import GrassIcon from "@mui/icons-material/Grass";
import Grid from "@mui/material/Unstable_Grid2";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../common/Breadcrumb";
import axios from "axios";
import { useState } from "react";

const useStyle = makeStyles((theme) => createStyles({}));

const Rbi_add_data = () => {
  const [records, setRecords] = useState([
    {
      fy_year: "",
      quarter: "", // Empty initially - aap khud daalenge
      Part: "",
      document: null,
    },
  ]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldError, setFieldError] = useState(false);

  const navigate = useNavigate();

  // Add new record field
  const addRecord = () => {
    setRecords([
      ...records,
      {
        fy_year: "",
        quarter: "", // Empty for new records too
        Part: "",
        document: null,
      },
    ]);
  };

  // Remove record field
  const removeRecord = (index) => {
    if (records.length > 1) {
      const updatedRecords = records.filter((_, i) => i !== index);
      setRecords(updatedRecords);
    }
  };

  // Handle input change for records
  const handleRecordChange = (index, field, value) => {
    const updatedRecords = [...records];
    updatedRecords[index][field] = value;
    setRecords(updatedRecords);
  };

  // Handle file upload for specific record
  const handleFileChange = (index, file) => {
    const updatedRecords = [...records];
    updatedRecords[index].document = file;
    setRecords(updatedRecords);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all records
    const isValid = records.every(
      (record) => record.fy_year && record.quarter && record.Part
    );

    if (!isValid) {
      setFieldError(true);
      setMessage("Please fill all required fields for all records");
      setIsError(true);
      setIsSuccess(false);
      return;
    }

    try {
      const formData = new FormData();

      // Prepare data for API in the format your backend expects
      records.forEach((record, index) => {
        formData.append(`records[${index}][fy_year]`, record.fy_year);
        formData.append(`records[${index}][quarter]`, record.quarter);
        formData.append(`records[${index}][Part]`, record.Part);

        if (record.document) {
          formData.append(`records[${index}][document]`, record.document);
        }
      });

      const response = await axios.post(
        "http://api.mfinindia.org/api/auth/rbi-data-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setMessage(
          `Success! ${response.data.total_saved} record(s) saved successfully`
        );
        setIsSuccess(true);
        setIsError(false);
        setFieldError(false);

        // Show success details
        console.log("Saved records:", response.data.records);

        // Reset form after successful submission
        setTimeout(() => {
          setRecords([
            {
              fy_year: "",
              quarter: "",
              Part: "",
              document: null,
            },
          ]);
          setIsSuccess(false);
          setMessage("");
        }, 5000);
      }
    } catch (err) {
      console.log("Error: ", err);
      setMessage("Error saving data. Please try again.");
      setIsError(true);
      setIsSuccess(false);
      setFieldError(true);
    }
  };

  const classes = useStyle();

  return (
    <Box sx={{ flexGrow: 1 }} mt={10}>
      <Grid container spacing={1}>
        <Grid xs={12} sm={12} md={12}>
          <div role="presentation">
            <Breadcrumb title="RBI Data Upload" icon={GrassIcon} />
          </div>
        </Grid>

        <Card style={{ padding: "20px", marginTop: "30px", width: "100%" }}>
          <CardActionArea>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              {/* Success/Error Messages */}
              {message && (
                <div
                  style={{
                    padding: "10px",
                    marginBottom: "20px",
                    borderRadius: "4px",
                    backgroundColor: isSuccess ? "#d4edda" : "#f8d7da",
                    color: isSuccess ? "#155724" : "#721c24",
                    border: `1px solid ${isSuccess ? "#c3e6cb" : "#f5c6cb"}`,
                  }}
                >
                  <strong>{isSuccess ? "Success!" : "Error!"}</strong> {message}
                </div>
              )}

              {fieldError && !message && (
                <p style={{ color: "red" }}>
                  <b>All fields are required for all records</b>
                </p>
              )}

              {/* Records Section */}
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: "red", marginBottom: "20px" }}
              >
                <b>RBI Data Records</b>
              </Typography>

              {records.map((record, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ddd",
                    padding: "15px",
                    marginBottom: "15px",
                    borderRadius: "5px",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{ marginBottom: "15px", color: "#1976d2" }}
                  >
                    <b>Record {index + 1}</b>
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid xs={12} sm={6} md={4}>
                      <label
                        style={{
                          color: "red",
                          marginBottom: "5px",
                          display: "block",
                        }}
                      >
                        <b>Financial Year *</b>
                      </label>
                      <input
                        type="text"
                        style={{ width: "100%" }}
                        className="form-control"
                        placeholder="e.g., FY 24-25"
                        value={record.fy_year}
                        onChange={(e) =>
                          handleRecordChange(index, "fy_year", e.target.value)
                        }
                      />
                    </Grid>

                    <Grid xs={12} sm={6} md={4}>
                      <label
                        style={{
                          color: "red",
                          marginBottom: "5px",
                          display: "block",
                        }}
                      >
                        <b>Quarter *</b>
                      </label>
                      <input
                        type="text"
                        style={{ width: "100%" }}
                        className="form-control"
                        placeholder="e.g., Q1 FY 24-25"
                        value={record.quarter}
                        onChange={(e) =>
                          handleRecordChange(index, "quarter", e.target.value)
                        }
                      />
                    </Grid>

                    <Grid xs={12} sm={6} md={4}>
                      <label
                        style={{
                          color: "red",
                          marginBottom: "5px",
                          display: "block",
                        }}
                      >
                        <b>Part *</b>
                      </label>
                      <select
                        style={{ width: "100%" }}
                        className="form-control"
                        value={record.Part}
                        onChange={(e) =>
                          handleRecordChange(index, "Part", e.target.value)
                        }
                      >
                        <option value="">Select Part</option>
                        <option value="Part I">Part I</option>
                        <option value="Part II">Part II</option>
                      </select>
                    </Grid>

                    <Grid xs={12} sm={12} md={12}>
                      <input
                        type="file"
                        style={{ width: "100%" }}
                        className="form-control"
                        accept=".pdf,.xlsx,.xls"
                        onChange={(e) =>
                          handleFileChange(index, e.target.files[0])
                        }
                      />
                    </Grid>
                    
                      <small style={{ textAlign: "left",paddingLeft:"10px" }}>
                        part1 for pdf and part2 for excel file only.
                      </small>
                    

                    {records.length > 1 && (
                      <Grid xs={12} sm={12} md={12}>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => removeRecord(index)}
                        >
                          Remove This Record
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </div>
              ))}

              {records.length < 2 && (
                <Grid xs={12} sm={12} md={12} style={{ marginBottom: "20px" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={addRecord}
                    style={{ marginRight: "10px" }}
                  >
                    + Add Another Record
                  </Button>

                  <Typography
                    variant="body2"
                    style={{ color: "#666", display: "inline" }}
                  >
                    {records.length} record(s) added
                  </Typography>
                </Grid>
              )}

              {/* Add More Records Button */}

              {/* Submit Button */}
              <Grid xs={12} sm={12} md={12}>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.Buttonbg}
                  style={{ width: "150px", marginRight: "10px" }}
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>

                <Button
                  variant="outlined"
                  style={{ width: "150px" }}
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </Grid>
            </Box>
          </CardActionArea>
        </Card>
      </Grid>
    </Box>
  );
};

export default Rbi_add_data;
