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

function ReportTable(props) {
  const { ReportData } = props;
  const [tableData, setTableData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  console.log("ReportData in ReportTable:", ReportData);

  // Static fallback data
  const staticData = {
    columns: ["Indicators", "Satin", "MFIN - CGRM Industry figures"],
    table: [
      {
        "Indicators": "Queries received during the quarter",
        "Satin": "511",
        "MFIN - CGRM Industry figures": "16272"
      },
      {
        "Indicators": "Complaints received during the quarter",
        "Satin": "15",
        "MFIN - CGRM Industry figures": "407"
      },
      {
        "Indicators": "Average TAT of complaints resolved during the quarter",
        "Satin": "5",
        "MFIN - CGRM Industry figures": "7"
      },
      {
        "Indicators": "Pending Complaints at end of the quarter",
        "Satin": "0",
        "MFIN - CGRM Industry figures": "7"
      }
    ],
  };

  // Transform API data when ReportData changes
  React.useEffect(() => {
    if (ReportData && ReportData.table1) {
      setLoading(true);
      try {
        // Transform API data to match your table structure
        const transformedData = {
          columns: ["Indicators", ReportData.default_member || ReportData.member, "MFIN - CGRM Industry figures"],
          table: ReportData.table1.map(item => ({
            "Indicators": item.indicator,
            [ReportData.default_member || ReportData.member]: item.member,
            "MFIN - CGRM Industry figures": item.aggregate
          }))
        };
        setTableData(transformedData);
        console.log("Transformed table data:", transformedData);
      } catch (error) {
        console.error("Error transforming table data:", error);
        setTableData(staticData);
      } finally {
        setLoading(false);
      }
    } else {
      // Use static data if no ReportData
      setTableData(staticData);
    }
  }, [ReportData]);

  const [open, setOpen] = React.useState(false);

  // PDF Export
  const downloadPdf = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#table-to-xls" });
    pdf.save("cgrm-report.pdf");
  };

  // Get dynamic column names from the data
  const getDynamicColumns = () => {
    if (tableData && tableData.columns && tableData.columns.length > 0) {
      return tableData.columns.filter((col) => col !== "Indicators");
    }
    return staticData.columns.filter((col) => col !== "Indicators");
  };

  const dynamicColumns = getDynamicColumns();
  const dataToShow = tableData || staticData;

  // Styles for centered headers
  const headerStyle = {
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#f5f5f5",
  };

  // Styles for data cells
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
              CGRM Dashboard
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

            {/* Loading State */}
            {loading && (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <Typography>Loading data...</Typography>
              </div>
            )}

            {/* Data Table Section */}
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
                        <td
                          key={colIndex}
                          style={dataCellStyle}
                        >
                          {row[column] || "0"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            {/* Show current filter info */}
            {ReportData && ReportData.member && (
              <Typography 
                variant="body2" 
                style={{ 
                  marginTop: "10px", 
                  fontStyle: "italic",
                  color: "#666"
                }}
              >
                Showing data for: {ReportData.member} - {ReportData.quarter}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default ReportTable;