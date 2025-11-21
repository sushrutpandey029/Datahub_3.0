import { createStyles, makeStyles } from "@material-ui/styles";
import TicketSizeChart from "../ProductMix/TicketSizeChartIndia.js";
import TicketSizeChartstate from "./TicketSizeChartstate.js";
import TenureSizeChart from "../ProductMix/TenureSizeChartIndia.js";
import TenureSizeChartstate from "./TenureSizeChartState.js";
import PaymentSizeChart from "../ProductMix/PaymentSizeChartIndia.js";
import PaymentSizeChartstate from "../ProductMix/PaymentSizeChartState.js";
import { Button, Card, CardContent, Typography, Divider } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BaseUrl,
  TicketSizeChartApi,
  TenureSizeChartApi,
  PayementSizeChartApi,
  TicketSizeChartApistate,
  TenureSizeChartApiState,
  PayementSizeChartApistate,
} from "../../url/url";
import authHeaders from "../../Service/AuthHeaders";
import Loader from "../../common/Loader";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { CardActionArea } from "@mui/material";

const useStyle = makeStyles((theme) =>
  createStyles({
    Buttonbg: {
      backgroundColor: "#2B60AD !important",
    },
    th: {
      fontWeight: "bold",
    },
  })
);

const ProductMixMaster = () => {
  const classes = useStyle();
  const graphFilterInitialState = {
    fromMonth: new Date("2023-06-01"), // ✅ June 2023
    toMonth: new Date("2025-08-01"), // ✅ August 2025 (latest)
    dateSeries: "All",
    maxDate: new Date("2025-08-01"),
    region: 0,
    states: 0,
    isLoader: false,
    isDisabled: false,
  };

  const [graphFilter, setGraphFilter] = useState(graphFilterInitialState);
  const [regionList, setRegionList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [ticketChartData, setTicketChartData] = useState(null);
  const [tenureChartData, setTenureChartData] = useState(null);
  const [tenureStateChartData, setTenureStateChartData] = useState(null);
  const [paymentChartData, setPaymentChartData] = useState(null);
  const [ticketStateChartData, setTicketStateChartData] = useState(null);
  const [paymentStateChartData, setPaymentStateChartData] = useState(null);

  // Format date for API parameters
  const formatDateForAPI = (date) => {
    if (!date) return "";
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const year = date.getFullYear().toString().slice(-2);
    const month = monthNames[date.getMonth()];
    return `${month}-${year}`;
  };

  // Get current region/state info for titles
  const getRegionStateInfo = () => {
    if (graphFilter.states !== 0) {
      const selectedState = stateList.find(
        (state) => state.State_Equifax === graphFilter.states
      );
      return selectedState ? selectedState.State_Equifax : "Selected State";
    }
    if (graphFilter.region !== 0) {
      const selectedRegion = regionList.find(
        (region) => region.Region === graphFilter.region
      );
      return selectedRegion
        ? `${selectedRegion.Region} Region`
        : "Selected Region";
    }
    return "All States";
  };

  // Helper function for dynamic titles
  const getChartTitle = (data, defaultTitle, isState = false) => {
    if (data && data.summary && data.summary.data_type) {
      return `${data.summary.category} - ${data.summary.data_type}`;
    }

    const regionStateInfo = getRegionStateInfo();
    return `${defaultTitle} - ${isState ? regionStateInfo : "All India"}`;
  };

  // Common function for API parameters - SIMPLIFIED
  const getAPIParams = (filters = {}) => {
    const params = {
      month: formatDateForAPI(filters.date || graphFilter.toMonth),
    };

    // Only add region/state if specifically selected
    if (graphFilter.region !== 0) {
      params.region = graphFilter.region;
    }

    if (graphFilter.states !== 0) {
      params.state = graphFilter.states;
    }

    return params;
  };

  useEffect(() => {
    getRegionList();
    getStateList();
    // Load initial chart data
    fetchChartData();
  }, []);

  const getRegionList = async () => {
    const api = "api/auth/master-get-region-list";
    await axios
      .get(`${BaseUrl}/${api}`, { headers: authHeaders() })
      .then((response) => {
        setRegionList(response.data.data);
      })
      .catch((error) => {
        console.log("outreach", error);
      });
  };

  const getStateList = async (region = 0) => {
    const api = `api/auth/master-get-state-list?Region=${region}`;
    await axios
      .get(`${BaseUrl}/${api}`, { headers: authHeaders() })
      .then((response) => {
        setStateList(response.data.data);
      })
      .catch((error) => {
        console.log("outreach", error);
      });
  };

  const handleGraphToDateChange = (date) => {
    setGraphFilter({ ...graphFilter, ["toMonth"]: date });
  };

  // ✅ FIXED: Fetch Ticket Size Chart Data for State
  const fetchTicketStateChartData = async (filters = {}) => {
    try {
      const params = getAPIParams(filters);

      console.log("Ticket State API Call:", {
        url: `${BaseUrl}${TicketSizeChartApistate}`,
        params: params,
      });

      const response = await axios.get(`${BaseUrl}${TicketSizeChartApistate}`, {
        params: params,
        headers: authHeaders(),
      });

      console.log("✅ Ticket State API Response:", response.data);

      if (response.data.status === 200) {
        setTicketStateChartData(response.data);
      } else {
        console.error("State Ticket API returned error:", response.data);
        setTicketStateChartData(null);
      }
    } catch (error) {
      console.log("Error fetching state ticket chart data:", error);
      setTicketStateChartData(null);
    }
  };

  // ✅ FIXED: Fetch Tenure Size Chart Data for State
  const fetchTenureStateChartData = async (filters = {}) => {
    try {
      const params = getAPIParams(filters);

      console.log("📅 Tenure State API Call:", {
        url: `${BaseUrl}${TenureSizeChartApiState}`,
        params: params,
      });

      const response = await axios.get(`${BaseUrl}${TenureSizeChartApiState}`, {
        params: params,
        headers: authHeaders(),
      });

      console.log("✅ Tenure State API Response:", response.data);

      if (response.data.status === 200) {
        setTenureStateChartData(response.data);
      } else {
        console.error("State Tenure API returned error:", response.data);
        setTenureStateChartData(null);
      }
    } catch (error) {
      console.log("Error fetching state tenure chart data:", error);
      setTenureStateChartData(null);
    }
  };

  // ✅ FIXED: Fetch Payment Size Chart Data for India
  const fetchPaymentChartData = async (filters = {}) => {
    try {
      const params = getAPIParams(filters);

      console.log("💰 Payment India API Call:", {
        url: `${BaseUrl}${PayementSizeChartApi}`,
        params: params,
      });

      const response = await axios.get(`${BaseUrl}${PayementSizeChartApi}`, {
        params: params,
        headers: authHeaders(),
      });

      console.log("✅ Payment India API Response:", response.data);

      if (response.data.status === 200) {
        setPaymentChartData(response.data);
      } else {
        console.error("Payment India API returned error:", response.data);
        setPaymentChartData(null);
      }
    } catch (error) {
      console.log("Error fetching payment chart data:", error);
      setPaymentChartData(null);
    }
  };

  // ✅ WORKING: Fetch Payment Size Chart Data for State
  const fetchPaymentStateChartData = async (filters = {}) => {
    try {
      const params = getAPIParams(filters);

      console.log("💳 Payment State API Call:", {
        url: `${BaseUrl}${PayementSizeChartApistate}`,
        params: params,
      });

      const response = await axios.get(
        `${BaseUrl}${PayementSizeChartApistate}`,
        {
          params: params,
          headers: authHeaders(),
        }
      );

      console.log("✅ Payment State API Response:", response.data);

      if (response.data && response.data.status === 200) {
        setPaymentStateChartData(response.data);
      } else {
        console.error("Payment State API returned error:", response.data);
        setPaymentStateChartData(null);
      }
    } catch (error) {
      console.log("Error fetching payment state chart data:", error);
      setPaymentStateChartData(null);
    }
  };

  // ✅ FIXED: Fetch Ticket Size Chart Data for India with Debugging (No Optional Chaining)
  const fetchTicketChartData = async (filters = {}) => {
    try {
      const params = getAPIParams(filters);

      console.log("🎫 [Ticket India] API Call:", {
        url: `${BaseUrl}${TicketSizeChartApi}`,
        params: params,
        fullUrl: `${BaseUrl}${TicketSizeChartApi}?${new URLSearchParams(
          params
        )}`,
      });

      const response = await axios.get(`${BaseUrl}${TicketSizeChartApi}`, {
        params: params,
        headers: authHeaders(),
      });

      console.log("✅ [Ticket India] API Response:", {
        status: response.data.status,
        dataLength: response.data.data ? response.data.data.length : 0,
        dataSample: response.data.data ? response.data.data[0] : "No data",
        fullResponse: response.data,
      });

      if (response.data.status === 200) {
        console.log("🎯 [Ticket India] Setting chart data");
        setTicketChartData(response.data);
      } else {
        console.error("❌ [Ticket India] API returned error:", response.data);
        setTicketChartData(null);
      }
    } catch (error) {
      console.error("❌ [Ticket India] Error fetching ticket chart data:", {
        error: error.message,
        response: error.response ? error.response.data : "No response",
        status: error.response ? error.response.status : "No status",
      });
      setTicketChartData(null);
    }
  };

  // ✅ WORKING: Fetch Tenure Size Chart Data for India
  const fetchTenureChartData = async (filters = {}) => {
    try {
      const params = getAPIParams(filters);

      const response = await axios.get(`${BaseUrl}${TenureSizeChartApi}`, {
        params: params,
        headers: authHeaders(),
      });

      if (response.data.status === 200) {
        setTenureChartData(response.data);
      } else {
        console.error("Tenure API returned error:", response.data);
        setTenureChartData(null);
      }
    } catch (error) {
      console.log("Error fetching tenure chart data:", error);
      setTenureChartData(null);
    }
  };

  // Fetch all charts data
  const fetchChartData = async (filters = {}) => {
    setGraphFilter((prev) => ({ ...prev, isLoader: true, isDisabled: true }));

    try {
      await Promise.all([
        // All India APIs
        fetchTicketChartData(filters), // ✅ Working
        fetchTenureChartData(filters), // ✅ Working
        fetchPaymentChartData(filters), // ✅ Fixed now

        // State APIs
        fetchTicketStateChartData(filters), // ✅ Fixed now
        fetchTenureStateChartData(filters), // ✅ Fixed now
        fetchPaymentStateChartData(filters), // ✅ Working
      ]);
    } catch (error) {
      console.log("Error fetching chart data:", error);
    } finally {
      setGraphFilter((prev) => ({
        ...prev,
        isLoader: false,
        isDisabled: false,
      }));
    }
  };

  const filterdateGraph = async () => {
    const filters = {
      region: graphFilter.region,
      state: graphFilter.states,
      date: graphFilter.toMonth,
    };
    await fetchChartData(filters);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* Filter Component Start from here */}
          <Grid xs={12}>
            <Card>
              <CardContent>
                <Grid
                  container
                  spacing={2}
                 
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  {/* Region */}
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl
                      variant="standard"
                      fullWidth
                      sx={{ minWidth: 250 }}
                    >
                      <InputLabel>Select Region</InputLabel>
                      <Select
                        name="region"
                        value={graphFilter.region}
                        onChange={(e) => {
                          setGraphFilter({
                            ...graphFilter,
                            ["region"]: e.target.value,
                          });
                          getStateList(e.target.value);
                        }}
                        label="Select Region"
                      >
                        <MenuItem value={0}>All</MenuItem>
                        {regionList.map((val, key) => (
                          <MenuItem key={key} value={val.Region}>
                            {val.Region}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* State */}
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl
                      variant="standard"
                      fullWidth
                      sx={{ minWidth: 250 }}
                    >
                      <InputLabel>Select State</InputLabel>
                      <Select
                        name="states"
                        value={graphFilter.states}
                        onChange={(e) =>
                          setGraphFilter({
                            ...graphFilter,
                            ["states"]: e.target.value,
                          })
                        }
                        label="Select State"
                      >
                        <MenuItem value={0}>All</MenuItem>
                        {stateList.map((val, ind) => (
                          <MenuItem key={ind} value={val.State_Equifax}>
                            {val.State_Equifax}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Month Picker */}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xs={12} sm={6} md={3}>
                      <DatePicker
                        margin="dense"
                        variant="standard"
                        openTo="month"
                        views={["year", "month"]}
                        label="Select Month & Year"
                        fullWidth
                        value={graphFilter.toMonth}
                        onChange={(date) => {
                          if (
                            date >= new Date("2023-06-01") &&
                            date <= new Date("2025-08-01")
                          ) {
                            handleGraphToDateChange(date);
                          } else {
                            alert(
                              "Please select a month between Jun 2023 and Aug 2025"
                            );
                          }
                        }}
                        minDate={new Date("2023-06-01")}
                        maxDate={new Date("2025-08-01")}
                        disableFuture
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>

                  {/* Filter Button */}
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    display="flex"
                    justifyContent="flex-start"
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.Buttonbg}
                      sx={{ mt: 2, mb: 1 }}
                      disabled={graphFilter.isDisabled}
                      onClick={filterdateGraph}
                    >
                      Filter
                      <Loader loader={graphFilter.isLoader} size={15} />
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Filter Component End here */}

          {/* Ticket Size Chart Component - India */}
          <Grid xs={6} sm={6} md={6}>
            <Card >
              <CardActionArea>
                <CardContent>
                  <TicketSizeChart
                    data={ticketChartData}
                    title={getChartTitle(
                      ticketChartData,
                      "Ticket Size (%)",
                      false
                    )}
                    subtitle="All India Data"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Ticket Size Chart Component - State */}
          <Grid xs={6} sm={6} md={6}>
            <Card >
              <CardActionArea>
                <CardContent>
                  <TicketSizeChartstate
                    data={ticketStateChartData}
                    title={getChartTitle(
                      ticketStateChartData,
                      "Ticket Size (%)",
                      true
                    )}
                    subtitle={getRegionStateInfo()}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Tenure Size Chart Component - India */}
          <Grid xs={6} sm={6} md={6}>
            <Card >
              <CardActionArea>
                <CardContent>
                  <TenureSizeChart
                    data={tenureChartData}
                    title={getChartTitle(
                      tenureChartData,
                      "Tenure Size (%)",
                      false
                    )}
                    subtitle="All India Data"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Tenure Size Chart Component - State */}
          <Grid xs={6} sm={6} md={6}>
            <Card >
              <CardActionArea>
                <CardContent>
                  <TenureSizeChartstate
                    data={tenureStateChartData}
                    title={getChartTitle(
                      tenureStateChartData,
                     
                      true
                    )}
                    subtitle={getRegionStateInfo()}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Payment Size Chart Component - India */}
          <Grid xs={6} sm={6} md={6}>
            <Card >
              <CardActionArea>
                <CardContent>
                  <PaymentSizeChart
                    data={paymentChartData}
                    title={getChartTitle(
                      paymentChartData,
                      "Repayment Frequency (%)",
                      false
                    )}
                    subtitle="All India Data"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Payment Size Chart Component - State */}
          <Grid xs={6} sm={6} md={6}>
            <Card >
              <CardActionArea>
                <CardContent>
                  <PaymentSizeChartstate
                    data={paymentStateChartData}
                    title={getChartTitle(
                      paymentStateChartData,
                      "Repayment Frequency (%)",
                      true
                    )}
                    subtitle={getRegionStateInfo()}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductMixMaster;
