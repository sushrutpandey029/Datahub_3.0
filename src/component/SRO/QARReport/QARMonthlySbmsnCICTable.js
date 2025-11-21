import * as React from "react";
import {
  Card,
  Button,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import ReactHTMLTableToExcel from "react-html-table-to-excel-3";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Dropdown, DropdownMenuItem } from "../../Mudra/dropdown";

function CBMonthlySbmsnCICTable(props) {
  const { QARParametersRecords, memberOrIndustry } = props;
  console.log(
    "QARParametersRecords in cctable",
    JSON.stringify(QARParametersRecords, null, 2)
  );

  console.log("memberOrIndustry in cctable", memberOrIndustry);

  // Static data with correct alignment structure
  const staticData = {
    columns: ["Parameter", "Apr-25", "May-25", "Jun-25", "Q1 FY 2025-26"],
    table: [
      {
        Parameter: "Date of monthly submission to CICs",
        "Apr-25": "",
        "May-25": "",
        "Jun-25": "",
        "Q1 FY 2025-26": "",
      },
      {
        Parameter: "If all weekly files were submitted to CICs (Yes/No)",
        "Apr-25": "",
        "May-25": "",
        "Jun-25": "",
        "Q1 FY 2025-26": "",
      },
      {
        Parameter: "How many unique daily files were submitted in a month",
        "Apr-25": "0",
        "May-25": "0",
        "Jun-25": "0",
        "Q1 FY 2025-26": "0",
      },
      {
        Parameter:
          "Number of active accounts submitted in a monthly file to CICs (on balance sheet)",
        "Apr-25": "0",
        "May-25": "0",
        "Jun-25": "0",
        "Q1 FY 2025-26": "0",
      },
      {
        Parameter:
          "Loan accounts disbursed during the period (on balance sheet)",
        "Apr-25": "0",
        "May-25": "0",
        "Jun-25": "0",
        "Q1 FY 2025-26": "0",
      },
      {
        Parameter: "Valid Voter ID (%)",
        "Apr-25": { Value: "0", Percentage: "0%" },
        "May-25": { Value: "0", Percentage: "0%" },
        "Jun-25": { Value: "0", Percentage: "0%" },
        "Q1 FY 2025-26": { Value: "0", Percentage: "0%" },
      },
      {
        Parameter: "Valid PAN (%)",
        "Apr-25": { Value: "0", Percentage: "0%" },
        "May-25": { Value: "0", Percentage: "0%" },
        "Jun-25": { Value: "0", Percentage: "0%" },
        "Q1 FY 2025-26": { Value: "0", Percentage: "0%" },
      },
      {
        Parameter:
          "Loans disbursed crossing the norm of annual household income of >3 lacs",
        "Apr-25": { Value: "0", Percentage: "0%" },
        "May-25": { Value: "0", Percentage: "0%" },
        "Jun-25": { Value: "0", Percentage: "0%" },
        "Q1 FY 2025-26": { Value: "0", Percentage: "0%" },
      },
      {
        Parameter:
          "Loans disbursed crossing the norm of annual household income of >3 lacs and FOIR <= 50%",
        "Apr-25": { Value: "0", Percentage: "0%" },
        "May-25": { Value: "0", Percentage: "0%" },
        "Jun-25": { Value: "0", Percentage: "0%" },
        "Q1 FY 2025-26": { Value: "0", Percentage: "0%" },
      },
      {
        Parameter:
          "Loans disbursed crossing the norm of annual household income of >3 lacs and FOIR >50%",
        "Apr-25": { Value: "0", Percentage: "0%" },
        "May-25": { Value: "0", Percentage: "0%" },
        "Jun-25": { Value: "0", Percentage: "0%" },
        "Q1 FY 2025-26": { Value: "0", Percentage: "0%" },
      },
      {
        Parameter:
          "Loans disbursed with annual household income of upto 3 lacs",
        "Apr-25": { Value: "0", Percentage: "0%" },
        "May-25": { Value: "0", Percentage: "0%" },
        "Jun-25": { Value: "0", Percentage: "0%" },
        "Q1 FY 2025-26": { Value: "0", Percentage: "0%" },
      },
      {
        Parameter:
          "Loans disbursed with annual household income of upto 3 lacs and FOIR <= 50%",
        "Apr-25": { Value: "0", Percentage: "0%" },
        "May-25": { Value: "0", Percentage: "0%" },
        "Jun-25": { Value: "0", Percentage: "0%" },
        "Q1 FY 2025-26": { Value: "0", Percentage: "0%" },
      },
      {
        Parameter:
          "Loans disbursed with annual household income of upto 3 lacs and FOIR > 50%",
        "Apr-25": { Value: "0", Percentage: "0%" },
        "May-25": { Value: "0", Percentage: "0%" },
        "Jun-25": { Value: "0", Percentage: "0%" },
        "Q1 FY 2025-26": { Value: "0", Percentage: "0%" },
      },
    ],
  };

  // Use dynamic data if available, otherwise use static data
  const data =
    QARParametersRecords &&
    QARParametersRecords.table &&
    QARParametersRecords.table.length > 0
      ? QARParametersRecords
      : staticData;

  // Get filter type from props or default to "value"
  const filterType =
    (QARParametersRecords && QARParametersRecords.filter_type) || "value";

  const [open, setOpen] = React.useState(false);

  // PDF Export
  const downloadPdf = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#table-to-xls" });
    pdf.save("guardrails-report.pdf");
  };

  // Helper function to extract value from cell data
  const getValue = (cellData) => {
    if (!cellData) return "";
    if (typeof cellData === "string") return cellData;
    if (typeof cellData === "object" && cellData.Value !== undefined)
      return cellData.Value;
    return "";
  };

  // Helper function to extract percentage from cell data
  const getPercentage = (cellData) => {
    if (!cellData) return "";
    if (typeof cellData === "object" && cellData.Percentage !== undefined)
      return cellData.Percentage;
    return "";
  };

  // Check if cell has percentage value
  const hasPercentage = (cellData) => {
    return (
      cellData &&
      typeof cellData === "object" &&
      cellData.Percentage !== undefined
    );
  };

  // Check if row should have merged columns (no percentage column)
  const shouldMergeColumns = (row) => {
    const mergedRows = [
      "Date of monthly submission to CICs",
      "If all weekly files were submitted to CICs (Yes/No)",
      "How many unique daily files were submitted in a month",
      "Number of active accounts submitted in a monthly file to CICs (on balance sheet)",
      "Loan accounts disbursed during the period (on balance sheet)",
    ];
    return mergedRows.includes(row.Parameter);
  };

  // Rows that should be hidden when Industry filter is selected
  const getRowsToHideForIndustry = () => {
    return [
      "Date of monthly submission to CICs",
      "If all weekly files were submitted to CICs (Yes/No)",
    ];
  };

  // Determine which rows to show based on filter type and Industry/Member selection
  const getFilteredRows = () => {
    let filteredRows = data.table;

    // First apply percentage filter if needed
    if (filterType === "percentage") {
      filteredRows = filteredRows.filter(
        (row) =>
          hasPercentage(row["Apr-25"]) ||
          hasPercentage(row["May-25"]) ||
          hasPercentage(row["Jun-25"]) ||
          hasPercentage(row["Q1 FY 2025-26"])
      );
    }

    // Then apply Industry/Member filter
    if (memberOrIndustry === "Industry") {
      const rowsToHide = getRowsToHideForIndustry();
      filteredRows = filteredRows.filter(
        (row) => !rowsToHide.includes(row.Parameter)
      );
    }

    return filteredRows;
  };

  // Get dynamic column names from the data
  const getDynamicColumns = () => {
    if (data.columns && data.columns.length > 0) {
      return data.columns.filter((col) => col !== "Parameter");
    }
    return ["Apr-25", "May-25", "Jun-25", "Q1 FY 2025-26"];
  };

  const dynamicColumns = getDynamicColumns();

  // Styles for centered headers
  const headerStyle = {
    textAlign: "center",
    fontWeight: "bold",
  };

  // Styles for right-aligned data cells
  const dataCellStyle = {
    textAlign: "right",
  };

  return (
    <Grid xs={12} sm={12} md={12}>
      <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              style={{
                textAlign: "left",
                fontSize: "18px",
                color: "#bd2f03",
              }}
              component="div"
            >
              Guardrails Dashboard
              <span style={{ float: "right", marginRight: "10px" }}>
                <Dropdown
                  keepOpen
                  open={open}
                  trigger={
                    <Button
                      style={{
                        borderBottom: "2px solid",
                        color: "#000000",
                      }}
                      endIcon={<ArrowDropDownIcon />}
                    >
                      Download
                    </Button>
                  }
                  menu={[
                    <DropdownMenuItem key="excel">
                      <Button
                        style={{ color: "#000000" }}
                        endIcon={<FileDownloadIcon />}
                      >
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="htmlToExcel"
                          table="table-to-xls"
                          filename="guardrails-report"
                          filetype="xls"
                          sheet="Guardrails Data"
                          buttonText="Excel Format"
                        />
                      </Button>
                    </DropdownMenuItem>,
                    <DropdownMenuItem key="pdf">
                      <Button
                        onClick={downloadPdf}
                        style={{ color: "#000000" }}
                        endIcon={<PictureAsPdfIcon />}
                      >
                        PDF Format
                      </Button>
                    </DropdownMenuItem>,
                  ]}
                />
              </span>
            </Typography>

            {/* Data Table Section */}
            <Table
              id="table-to-xls"
              striped
              bordered
              hover
              style={{ marginTop: "10px", textAlign: "left" }}
            >
              <thead>
                <tr>
                  <th style={headerStyle} rowSpan="2">
                    Parameters
                  </th>
                  {dynamicColumns.map((column, index) => (
                    <th key={index} colSpan="2" style={headerStyle}>
                      {column}
                    </th>
                  ))}
                </tr>
                <tr>
                  {dynamicColumns.map((column, index) => (
                    <React.Fragment key={index}>
                      <th style={headerStyle}>Value</th>
                      <th style={headerStyle}>Percentage</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getFilteredRows().map((row, index) => {
                  const isMergedRow = shouldMergeColumns(row);

                  return (
                    <tr key={index}>
                      <td style={{ minWidth: "300px" }}>{row.Parameter}</td>

                      {dynamicColumns.map((column, colIndex) => (
                        <React.Fragment key={colIndex}>
                          {isMergedRow ? (
                            <td
                              style={{
                                ...(isMergedRow
                                  ? { textAlign: "center" }
                                  : dataCellStyle),
                                minWidth: "100px",
                              }}
                              colSpan="2"
                            >
                              {getValue(row[column])}
                            </td>
                          ) : (
                            <>
                              <td
                                style={{ ...dataCellStyle, minWidth: "80px" }}
                              >
                                {getValue(row[column])}
                              </td>
                              <td
                                style={{ ...dataCellStyle, minWidth: "80px" }}
                              >
                                {getPercentage(row[column])}
                              </td>
                            </>
                          )}
                        </React.Fragment>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default CBMonthlySbmsnCICTable;
