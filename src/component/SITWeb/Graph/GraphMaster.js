import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Button,
} from "@mui/material";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import axios from "axios";
import { BaseUrl, getBarCountData } from "../../url/url";

function GraphMaster({ userRole, userName }) {
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);

  const [globalYear, setGlobalYear] = useState("");
  const [globalMonth, setGlobalMonth] = useState("");

  // Fetch filter options (years + months)
  const fetchFilterOptions = async (financialYear = "") => {
    try {
      const response = await axios.get(
        `${BaseUrl}/api/auth/meetings/graph/Dates`,
        {
          params: {
            user_role: userRole,
            financial_year: financialYear || undefined,
          },
        }
      );

      console.log("response in fetchFilterOptions", response.data);
      const { financial_years, month_strings } = response.data;

      setYears(financial_years || []);
      setMonths(month_strings || []);

      if (!globalYear && financial_years && financial_years.length > 0) {
        setGlobalYear(financial_years[0]);
      }

      if (!globalMonth) {
        setGlobalMonth(""); // empty string = All Months
      }
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  // Load filter options on mount
  useEffect(() => {
    fetchFilterOptions();
  }, []);

  // Reload months when year changes
  useEffect(() => {
    if (globalYear) {
      fetchFilterOptions(globalYear);
    }
  }, [globalYear]);

  return (
    <Grid container spacing={2}>
      {/* Global Filter Box */}
      <Grid item xs={12} mt={5}>
        <Box
          display="flex"
          gap={2}
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 2 }}
        >
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={globalYear}
              onChange={(e) => setGlobalYear(e.target.value)}
              label="Year"
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Month</InputLabel>
            <Select
              value={globalMonth}
              onChange={(e) => setGlobalMonth(e.target.value)}
              label="Month"
            >
              <MenuItem value="">All Months</MenuItem>
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>

      {/* Bar Chart */}
      <Grid item xs={12} md={6}>
        <div className="chart-container">
          <BarChart
            years={years}
            months={months}
            defaultYear={globalYear}
            defaultMonth={globalMonth}
            userRole={userRole}
            userName={userName}
          />
        </div>
      </Grid>

      {/* Pie Chart */}
      <Grid item xs={12} md={6}>
        <div className="chart-container">
          <PieChart
            years={years}
            months={months}
            defaultYear={globalYear}
            defaultMonth={globalMonth}
            userRole={userRole}
            userName={userName}
          />
        </div>
      </Grid>
    </Grid>
  );
}

export default GraphMaster;
