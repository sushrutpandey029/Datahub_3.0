import * as React from "react";
import {
  Card,
  Button,
  CardContent,
  CardActionArea,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel-3";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Dropdown, DropdownMenuItem } from "../../Mudra/dropdown";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

function EBDateofSubmissionTable(props) {
  const {
    ebMemberMonthlySubmission,
    ebIndustryMonthlySubmission,
    ebUniqueEntity,
    ebentity,
    setEbEntity,
    selectedMember,
  } = props;

  const [open, setOpen] = useState(false);

  const downloadPdfMudraBankWise = (tableId, filename) => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: `#${tableId}` });
    pdf.save(filename);
  };

  // ---- Demo fallback data before API ----
  const demoMemberData = {
    headings: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: {
      "Date of monthly submission": ["0", "0", "0", "0", "0", "0"],
      "Total number of employees submitted – cumulative": [
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
      ],
      "Total number of employees submitted - during the month": [
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
      ],
      "Total number of Active employees - during the month": [
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
      ],
    },
  };

  const demoIndustryData = {
    headings: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: {
      "Percentage of members submitted the data": [
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
      ],
      "Lenders submitted on or before 10th": ["0", "0", "0", "0", "0", "0"],
      "Total number of employees submitted - during the month ('000)": [
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
      ],
      "Total number of employees submitted - cumulative ('000)": [
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
      ],
    },
  };

  const memberData = ebMemberMonthlySubmission || demoMemberData;
  const industryData = ebIndustryMonthlySubmission || demoIndustryData;

  return (
    <>
      {/* Member Level Table */}
      <Grid xs={12} sm={12} md={12}>
        <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
          <CardActionArea>
            <CardContent>
              {/* Header with Download button */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{ fontSize: "18px", color: "#bd2f03" }}
                  component="div"
                >
                  {/* Date of submission - Member Level */}
                  Date of submission - {selectedMember || "Member Level"}
                </Typography>

                <Dropdown
                  keepOpen
                  open={open}
                  trigger={
                    <Button
                      style={{
                        border: "1px solid #000",
                        borderRadius: "6px",
                        background: "#fff",
                        color: "#000000",
                        height: "29px",
                        textTransform: "none",
                      }}
                      endIcon={<ArrowDropDownIcon />}
                    >
                      Download
                    </Button>
                  }
                  menu={[
                    <DropdownMenuItem>
                      <ReactHTMLTableToExcel
                        id="test-table-xls-button1"
                        // className="htmlToExcel"
                        table="table-to-xls1"
                        filename="member-level-export"
                        filetype="xls"
                        sheet="Member Level Report"
                        buttonText={
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px",
                              color: "#000",
                              fontSize: "14px",
                              fontWeight: 500,
                            }}
                          >
                            EXCEL FORMAT
                            <FileDownloadIcon fontSize="small" />
                          </span>
                        }
                        className="excel-btn"
                      />
                    </DropdownMenuItem>,
                    <DropdownMenuItem>
                      <Button
                        onClick={() =>
                          downloadPdfMudraBankWise(
                            "table-to-xls1",
                            "member-level-report.pdf"
                          )
                        }
                        style={{ color: "#000000" }}
                        endIcon={<PictureAsPdfIcon />}
                      >
                        PDF Format
                      </Button>
                    </DropdownMenuItem>,
                  ]}
                />
              </div>

              {/* Table */}
              <Table
                striped
                bordered
                hover
                id="table-to-xls1"
                style={{ marginTop: "10px" }}
              >
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Parameters</th>
                    {memberData.headings.map((head, index) => (
                      <th key={index} style={{ textAlign: "right" }}>
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(memberData.data).map(
                    ([paramName, values], rowIndex) => (
                      <tr key={rowIndex}>
                        <td style={{ textAlign: "left" }}>{paramName}</td>
                        {values.map((val, colIndex) => (
                          <td key={colIndex} style={{ textAlign: "right" }}>
                            {val}
                          </td>
                        ))}
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid>
        <select
          value={ebentity}
          onChange={(e) => setEbEntity(e.target.value)}
          style={{
            height: "29px",
            borderRadius: "6px",
            border: "1px solid #000",
            background: "#fff",
            fontSize: "13px",
            cursor: "pointer",
            color: "#000",
          }}
        >
          <option value="">Universe</option>
          {ebUniqueEntity &&
            ebUniqueEntity.map((entity, idx) => (
              <option key={idx} value={entity}>
                {entity}
              </option>
            ))}
        </select>
      </Grid>

      {/* Industry Level Table */}
      <Grid xs={12} sm={12} md={12}>
        <Card style={{ paddingBottom: "20px" }}>
          <CardActionArea>
            <CardContent>
              {/* Header with Filter + Download aligned */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{ fontSize: "18px", color: "#bd2f03" }}
                  component="div"
                >
                  Date of submission - {ebentity || "Industry Level"}
                </Typography>

                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>


                  {/* Download Dropdown */}
                  <Dropdown
                    keepOpen
                    open={open}
                    trigger={
                      <Button
                        style={{
                          border: "1px solid #000",
                          borderRadius: "6px",
                          background: "#fff",
                          color: "#000000",
                          height: "29px",
                          textTransform: "none",
                        }}
                        endIcon={<ArrowDropDownIcon />}
                      >
                        Download
                      </Button>
                    }
                    menu={[
                      <DropdownMenuItem>
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button2"
                          table="table-to-xls2"
                          filename="industry-level-export"
                          filetype="xls"
                          sheet="Industry Level Report"
                          buttonText={
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                color: "#000",
                                fontSize: "14px",
                                fontWeight: 500,
                              }}
                            >
                              EXCEL FORMAT
                              <FileDownloadIcon fontSize="small" />
                            </span>
                          }
                          className="excel-btn"
                        />
                      </DropdownMenuItem>,
                      <DropdownMenuItem>
                        <Button
                          onClick={() =>
                            downloadPdfMudraBankWise(
                              "table-to-xls2",
                              "industry-level-report.pdf"
                            )
                          }
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            color: "#000000",
                            fontSize: "14px",
                            fontWeight: 500,
                            textTransform: "none",
                          }}
                          endIcon={<PictureAsPdfIcon />}
                        >
                          PDF Format
                        </Button>
                      </DropdownMenuItem>,
                    ]}
                  />
                </div>
              </div>

              {/* Table */}
              <Table
                striped
                bordered
                hover
                id="table-to-xls2"
                style={{ marginTop: "10px" }}
              >
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Parameters</th>
                    {industryData.headings.map((head, index) => (
                      <th key={index} style={{ textAlign: "right" }}>
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(industryData.data).map(
                    ([paramName, values], rowIndex) => (
                      <tr key={rowIndex}>
                        <td style={{ textAlign: "left" }}>{paramName}</td>
                        {values.map((val, colIndex) => (
                          <td key={colIndex} style={{ textAlign: "right" }}>
                            {val}
                          </td>
                        ))}
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
}

export default EBDateofSubmissionTable;
