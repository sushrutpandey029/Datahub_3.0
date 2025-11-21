import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardActionArea,
  Typography,
  CircularProgress
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import GrassIcon from "@mui/icons-material/Grass";
import Grid from "@mui/material/Unstable_Grid2";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../common/Breadcrumb";
import axios from "axios";
import { useState, useEffect } from "react";

const useStyle = makeStyles((theme) => createStyles({
  buttonBg: {
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
  }
}));

const RbiEditData = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fy_year: "",
    quarter: "",
    Part: "",
    document: null
  });
  const [existingDocument, setExistingDocument] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const navigate = useNavigate();
  const classes = useStyle();

  useEffect(() => {
    fetchRecordData();
  }, [id]);

  const fetchRecordData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.mfinindia.org/api/auth/rbi_data_edit/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      if (response.data && response.data.data) {
        const record = response.data.data;
        setFormData({
          fy_year: record.fy_year || "",
          quarter: record.quarter || "",
          Part: record.Part || "",
          document: null
        });
        setExistingDocument(record.document || "");
      }
    } catch (err) {
      console.error("Error fetching record:", err);
      setMessage("Failed to load record data");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (file) => {
    setFormData(prev => ({
      ...prev,
      document: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fy_year || !formData.quarter || !formData.Part) {
      setMessage("Please fill all required fields");
      setIsError(true);
      setIsSuccess(false);
      return;
    }

    try {
      setUpdating(true);
      
      const submitData = new FormData();
      submitData.append('fy_year', formData.fy_year);
      submitData.append('quarter', formData.quarter);
      submitData.append('Part', formData.Part);
      
      if (formData.document) {
        submitData.append('document', formData.document);
      }

      const response = await axios.post(
        `https://api.mfinindia.org/api/auth/rbi_data_update/${id}`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMessage("Record updated successfully!");
        setIsSuccess(true);
        setIsError(false);
        
        setTimeout(() => {
          navigate("/rbi-data-list");
        }, 2000);
      }

    } catch (err) {
      console.error("Update error:", err);
      
      // FIXED: Optional chaining replaced
      const errorMessage = err.response && err.response.data && err.response.data.message 
        ? err.response.data.message 
        : "Error updating record";
      
      setMessage(errorMessage);
      setIsError(true);
      setIsSuccess(false);
    } finally {
      setUpdating(false);
    }
  };

  const handleViewDocument = () => {
    if (existingDocument) {
      const fullUrl = existingDocument.startsWith('http') 
        ? existingDocument 
        : `https://api.mfinindia.org/public/${existingDocument}`;
      window.open(fullUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <Box sx={{ flexGrow: 1 }} mt={10}>
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '50vh' }}>
          <CircularProgress />
          <Typography style={{ marginLeft: '10px' }}>Loading record data...</Typography>
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }} mt={10}>
      <Grid container spacing={1}>
        <Grid xs={12} sm={12} md={12}>
          <div role="presentation">
            <Breadcrumb title="Edit RBI Data" icon={GrassIcon} />
          </div>
        </Grid>

        <Card style={{ padding: "20px", marginTop: "30px", width: "100%" }}>
          <CardActionArea>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
              {message && (
                <div style={{ 
                  padding: "10px", 
                  marginBottom: "20px", 
                  borderRadius: "4px",
                  backgroundColor: isSuccess ? "#d4edda" : "#f8d7da",
                  color: isSuccess ? "#155724" : "#721c24",
                  border: `1px solid ${isSuccess ? "#c3e6cb" : "#f5c6cb"}`
                }}>
                  <strong>{isSuccess ? "Success!" : "Error!"}</strong> {message}
                </div>
              )}

              <Typography variant="h6" gutterBottom style={{ color: "red", marginBottom: "20px" }}>
                <b>Edit RBI Data Record (ID: {id})</b>
              </Typography>

              <Grid container spacing={2}>
                <Grid xs={12} sm={6} md={4}>
                  <label style={{ color: "red", marginBottom: "5px", display: "block" }}>
                    <b>Financial Year *</b>
                  </label>
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    className="form-control"
                    placeholder="e.g., FY 24-25"
                    value={formData.fy_year}
                    onChange={(e) => handleInputChange('fy_year', e.target.value)}
                    required
                  />
                </Grid>

                <Grid xs={12} sm={6} md={4}>
                  <label style={{ color: "red", marginBottom: "5px", display: "block" }}>
                    <b>Quarter *</b>
                  </label>
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    className="form-control"
                    placeholder="e.g., Q1 FY 24-25"
                    value={formData.quarter}
                    onChange={(e) => handleInputChange('quarter', e.target.value)}
                    required
                  />
                </Grid>

                <Grid xs={12} sm={6} md={4}>
                  <label style={{ color: "red", marginBottom: "5px", display: "block" }}>
                    <b>Part *</b>
                  </label>
                  <select
                    style={{ width: "100%" }}
                    className="form-control"
                    value={formData.Part}
                    onChange={(e) => handleInputChange('Part', e.target.value)}
                    required
                  >
                    <option value="">Select Part</option>
                    <option value="Part I">Part I</option>
                    <option value="Part II">Part II</option>
                    <option value="Part III">Part III</option>
                    <option value="Part IV">Part IV</option>
                    <option value="Part V">Part V</option>
                  </select>
                </Grid>

                <Grid xs={12} sm={12} md={12}>
                  <label style={{ marginBottom: "5px", display: "block" }}>
                    <b>Document (PDF/Excel)</b>
                  </label>
                  
                  {existingDocument && (
                    <div style={{ marginBottom: "10px" }}>
                      <Typography variant="body2">
                        <b>Current Document:</b> {existingDocument.split('/').pop()}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleViewDocument}
                        style={{ marginRight: "10px", marginTop: "5px" }}
                      >
                        View Current Document
                      </Button>
                      <Typography variant="caption" display="block" style={{ color: "#666" }}>
                        Upload new file only if you want to replace the current document
                      </Typography>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    style={{ width: "100%" }}
                    className="form-control"
                    accept=".pdf,.xlsx,.xls"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                  />
                  <small style={{ color: "#666" }}>Maximum file size: 5MB (PDF, Excel files allowed)</small>
                </Grid>

                <Grid xs={12} sm={12} md={12} style={{ marginTop: "20px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.buttonBg}
                    style={{ width: "150px", marginRight: "10px" }}
                    disabled={updating}
                  >
                    {updating ? <CircularProgress size={24} /> : "Update Record"}
                  </Button>
                  
                  <Button
                    variant="outlined"
                    style={{ width: "150px", marginRight: "10px" }}
                    onClick={() => navigate(-1)}
                    disabled={updating}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ width: "150px" }}
                    onClick={() => navigate("/rbi-data-list")}
                    disabled={updating}
                  >
                    Back to List
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardActionArea>
        </Card>
      </Grid>
    </Box>
  );
};

export default RbiEditData;