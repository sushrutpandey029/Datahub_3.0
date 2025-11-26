import * as React from "react";
import {
  Button,
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

function ReportTable({ table1cgrm }) {
  const [tableData, setTableData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  console.log("📊 ReportTable received table1cgrm:", table1cgrm);

  // Default static data with zeros
  const getDefaultData = (memberName = "Member") => {
    return {
      columns: ["Indicators", memberName, "MFIN - CGRM Industry figures"],
      table: [
        {
          Indicators: "Queries received during the quarter",
          [memberName]: "0",
          "MFIN - CGRM Industry figures": "0"
        },
        {
          Indicators: "Complaints received during the quarter",
          [memberName]: "0",
          "MFIN - CGRM Industry figures": "0"
        },
        {
          Indicators: "Average TAT of complaints resolved during the quarter",
          [memberName]: "0",
          "MFIN - CGRM Industry figures": "0"
        },
        {
          Indicators: "Pending Complaints at end of the quarter",
          [memberName]: "0",
          "MFIN - CGRM Industry figures": "0"
        }
      ],
    };
  };

  // Transform API data when table1cgrm changes
  React.useEffect(() => {
    console.log("🔄 useEffect triggered");
    console.log("table1cgrm value:", table1cgrm);

    // Check if we have valid data
    if (table1cgrm && Array.isArray(table1cgrm.table1) && table1cgrm.table1.length > 0) {
      setLoading(true);

      try {
        console.log("🔄 Transforming API data...");

        // Get member name from multiple possible sources
        const memberName = table1cgrm.default_member || table1cgrm.member || "Member";

        console.log("📝 Using member name:", memberName);

        const transformedData = {
          columns: ["Indicators", memberName, "MFIN - CGRM Industry figures"],
          table: table1cgrm.table1.map(item => ({
            Indicators: item.indicator,
            [memberName]: item.member || "0",
            "MFIN - CGRM Industry figures": item.aggregate || "0"
          }))
        };

        console.log("✅ Transformed table data:", transformedData);
        setTableData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error transforming table data:", error);
        const memberName = (table1cgrm && table1cgrm.default_member) || (table1cgrm && table1cgrm.member) || "Member";
        setTableData(getDefaultData(memberName));
        setLoading(false);
      }
    } else {
      // No valid data - show default
      console.log("ℹ️ No valid data, using defaults");
      const memberName = (table1cgrm && table1cgrm.default_member) || (table1cgrm && table1cgrm.member) || "Member";
      setTableData(getDefaultData(memberName));
      setLoading(false);
    }
  }, [table1cgrm]);

  const [open, setOpen] = React.useState(false);

  // PDF Export
  const downloadPdf = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#table-to-xls" });
    pdf.save("cgrm-report.pdf");
  };

  // Get dynamic column names
  const getDynamicColumns = () => {
    if (tableData && tableData.columns) {
      return tableData.columns.filter(col => col !== "Indicators");
    }
    const defaultData = getDefaultData();
    return defaultData.columns.filter(col => col !== "Indicators");
  };

  const dynamicColumns = getDynamicColumns();
  const dataToShow = tableData || getDefaultData();

  // Styling
  const headerStyle = {
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#f5f5f5",
  };

  const dataCellStyle = {
    textAlign: "right",
    padding: "8px 12px",
  };

  const indicatorCellStyle = {
    textAlign: "left",
    padding: "8px 12px",
    fontWeight: "500",
  };

  return (
    <Grid xs={12} sm={12} md={12}>
      {/* Header */}
      <Typography
        gutterBottom
        variant="h5"
        style={{ textAlign: "left", fontSize: "18px", color: "#bd2f03" }}
      >
        CGRM Dashboard

        <span style={{ float: "right", marginRight: "10px" }}>
          <Dropdown
            keepOpen
            open={open}
            trigger={
              <Button
                style={{ borderBottom: "2px solid", color: "#000000" }}
                endIcon={<ArrowDropDownIcon />}
              >
                Download
              </Button>
            }
            menu={[
              <DropdownMenuItem key="excel">
                <Button style={{ color: "#000000" }} endIcon={<FileDownloadIcon />}>
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="htmlToExcel"
                    table="table-to-xls"
                    filename="cgrm-report"
                    filetype="xls"
                    sheet="CGRM Data"
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

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Typography>Loading data...</Typography>
        </div>
      )}

      {/* Table */}
      {!loading && (
        <Table
          id="table-to-xls"
          striped
          bordered
          hover
          style={{ marginTop: "10px", width: "100%" }}
        >
          <thead>
            <tr>
              <th style={{ ...headerStyle, width: "40%" }}>Indicators</th>
              {dynamicColumns.map((column, index) => (
                <th key={index} style={{ ...headerStyle, width: "30%" }}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {dataToShow.table.map((row, index) => (
              <tr key={index}>
                <td style={indicatorCellStyle}>{row.Indicators}</td>
                {dynamicColumns.map((column, colIndex) => (
                  <td key={colIndex} style={dataCellStyle}>
                    {row[column] || "0"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </Table>
      )}

      {/* Footer Info */}
      { }
    </Grid>
  );
}

export default ReportTable;