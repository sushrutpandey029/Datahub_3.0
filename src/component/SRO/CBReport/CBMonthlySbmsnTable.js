
import React, { useState } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button
} from "@mui/material";
import { Dropdown, DropdownMenuItem } from "../../Mudra/dropdown";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Table } from "react-bootstrap";

function CBMonthlySbmsnTable({ memberRecords, industryRecords, entityList, setCBDropdown, selectedEntity }) {
  console.log("memberRecords",memberRecords);
  console.log("industryRecords",industryRecords);

  const [open] = useState(false);

  // ----------------------------
  // FIXED DEFAULT MONTHS
  // ----------------------------
  const defaultMonths = ["Mar-25", "Apr-25", "May-25", "Jun-25", "Jul-25", "Aug-25"];

  // ----------------------------
  // MEMBER FIELDS
  // ----------------------------
  const memberFields = [
    "Date_1FortSub",
    "Date_2FortSub",
    "DailyFilesSubmitted",
    "VID_fill_rate",
    "PAN_fill_rate",
    "Total_monthly_family_income_fill_rate",
    "Number_of_instalments_fill_rate",
    "Instalment_amount_fill_rate",
    "Valid_phone_number_seeding_rate",
    "Number_of_active_loan_accounts",
    "Value_of_active_loan_accounts_in_crores",
  ];

  // ----------------------------
  // INDUSTRY FIELDS
  // ----------------------------
  const industryFields = [
    "First_Fortnight_File_OnTime",
    "Second_Fortnight_File_OnTime",
    "Daily_Files_20Plus",
    "VID_Fill_Rate",
    "PAN_Fill_Rate",
    "Family_Income_Fill_Rate",
    "Instalment_Amt_Fill_Rate",
    "Instalment_Num_Fill_Rate",
    "Phone_Valid_Rate",
    "Active_Loans_Number_inCr",
    "Active_Loans_Value_inCr"
  ];

  // ----------------------------
  // CREATE DUMMY DATA
  // ----------------------------
  const createDefaultObject = (months, fields) => {
    const obj = {};
    months.forEach((m) => {
      obj[m] = {};
      fields.forEach((f) => {
        obj[m][f] = "0";
      });
    });
    return obj;
  };

  const defaultMemberData = {
    months: defaultMonths,
    data: createDefaultObject(defaultMonths, memberFields)
  };

  const defaultIndustryData = {
    months: defaultMonths,
    data: createDefaultObject(defaultMonths, industryFields)
  };

  // ----------------------------
  // FIXED FALLBACK LOGIC
  // Ensures dummy table always loads if API empty
  // ----------------------------
  const memberData =
    memberRecords &&
      Array.isArray(memberRecords.months) &&
      memberRecords.months.length > 0 &&
      memberRecords.data &&
      typeof memberRecords.data === "object"
      ? memberRecords
      : defaultMemberData;

  const industryData =
    industryRecords &&
      Array.isArray(industryRecords.months) &&
      industryRecords.months.length > 0 &&
      industryRecords.data &&
      typeof industryRecords.data === "object"
      ? industryRecords
      : defaultIndustryData;

  // ----------------------------
  // SAFE ACCESSOR (NO OPTIONAL CHAINING)
  // ----------------------------
  const getData = (obj, month, key) => {
    if (
      obj &&
      obj.data &&
      obj.data[month] &&
      typeof obj.data[month][key] !== "undefined"
    ) {
      return obj.data[month][key];
    }
    return "0";
  };

  const downloadPdf = (id, filename) => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#" + id });
    pdf.save(filename);
  };

  return (
    <>
      {/* =============================== */}
      {/* MEMBER LEVEL TABLE               */}
      {/* =============================== */}
      <Grid xs={12} sm={12} md={12}>
        <Card style={{ marginBottom: "20px" }}>
          <CardActionArea>
            <CardContent>
              <Typography
                variant="h5"
                style={{ textAlign: "left", fontSize: "18px", color: "#bd2f03" }}
              >
                Monthly Submission Member
                <span style={{ float: "right" }}>
                  <Dropdown
                    keepOpen
                    open={open}
                    trigger={
                      <Button endIcon={<ArrowDropDownIcon />} style={{ color: "#000" }}>
                        Download
                      </Button>
                    }
                    menu={[
                      <DropdownMenuItem key="excel">
                        <Button style={{ color: "#000" }}>
                          <ReactHTMLTableToExcel
                            className="htmlToExcel"
                            table="table-member"
                            filename="member-report"
                            buttonText="Excel"
                          />
                        </Button>
                      </DropdownMenuItem>,
                      <DropdownMenuItem key="pdf">
                        <Button
                          style={{ color: "#000" }}
                          endIcon={<PictureAsPdfIcon />}
                          onClick={() => downloadPdf("table-member", "member.pdf")}
                        >
                          PDF
                        </Button>
                      </DropdownMenuItem>
                    ]}
                  />
                </span>
              </Typography>

              <Table id="table-member" striped bordered hover>
                <thead>
                  <tr>
                    <th>Parameters</th>
                    {memberData.months.map((m) => (
                      <th key={m}>{m}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {memberFields.map((field) => (
                    <tr key={field}>
                      <td>{field.replace(/_/g, " ")}</td>
                      {memberData.months.map((m) => (
                        <td key={m}>{getData(memberData, m, field)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      {/* entity dropdown */}
      <Grid container
        justifyContent="flex-start"
        alignItems="center"
        style={{ margin: "10px 0" }}>
        <select
          value={selectedEntity}
          onChange={(e) => setCBDropdown((prev) => ({ ...prev, selectedEntity: e.target.value }))}
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
          {entityList &&
            entityList.map((entity, idx) => (
              <option key={idx} value={entity}>
                {entity}
              </option>
            ))}
        </select>
      </Grid>

      {/* =============================== */}
      {/* INDUSTRY LEVEL TABLE            */}
      {/* =============================== */}
      <Grid xs={12} sm={12} md={12}>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography
                variant="h5"
                style={{ textAlign: "left", fontSize: "18px", color: "#bd2f03" }}
              >
                Monthly Submission - Industry
              </Typography>

              <Table id="table-industry" striped bordered hover>
                <thead>
                  <tr>
                    <th>Parameters</th>
                    {industryData.months.map((m) => (
                      <th key={m}>{m}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {industryFields.map((field) => (
                    <tr key={field}>
                      <td>{field.replace(/_/g, " ")}</td>
                      {industryData.months.map((m) => (
                        <td key={m}>{getData(industryData, m, field)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
}

export default CBMonthlySbmsnTable;
