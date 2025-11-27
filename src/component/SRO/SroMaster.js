import { createStyles, makeStyles } from "@material-ui/styles";
import {
  Card,
  Button,
  CardContent,
  CardActions,
  CardActionArea,
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import GrassIcon from "@mui/icons-material/Grass";
import { useState, useEffect } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Breadcrumb from "../common/Breadcrumb";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
// CB SRO - import start from here
import CBVIDKYCSeedingMemberGraph from "./CBReport/CBVIDKYCSeedingMemberGraph";
import CBVIDKYCSeedingIndustryGraph from "./CBReport/CBVIDKYCSeedingIndustryGraph";
import CBDataAcceptanceSmtbMemberGraph from "./CBReport/CBDataAcceptanceSmtbMemberGraph";
import CBDataAcceptanceSmtbIndustryGraph from "./CBReport/CBDataAcceptanceSmtbIndustryGraph";
import CBMonthlySbmsnTable from "./CBReport/CBMonthlySbmsnTable";

//  CB SRO - import end here 



// EB SRO - import start from here
import EBDateofSubmissionTable from "./EBReport/EBDateofSubmissionTable";
import EBOverallKYCMemberGraph from "./EBReport/EBOverallKYCMemberGraph";
import EBCategoryIndustryGp from "./EBReport/EBCategoryIndustryGp";
import EBCategoryGpMember from "./EBReport/EBCategoryGpMember";
import EBOverallKYCIndustryGraph from "./EBReport/EBOverallKYCIndustryGraph";

import EBMonthlyEnquirynhitMemberGp from "./EBReport/EBMonthlyEnquirynhitMemberGp";
import EBMonthlyEnquirynhitIndustryGp from "./EBReport/EBMonthlyEnquirynhitIndustryGp";
//  EB SRO - import end here
//import Loader from "../../common/Loader";
import Loader from "../common/Loader";

// QAR SRO - import start from here
import QARMonthlySbmsnCICTable from "./QARReport/QARMonthlySbmsnCICTable";
import QARBarChart from "./QARReport/QARBarChart";
import QARPieChart from "./QARReport/QARPieChart";


import QARBarCharttwo from "./QARReport/QARBarCharttwo";

import QARBarChartthree from "./QARReport/QARBarChartthree";
import QARBarChartfour from "./QARReport/QARBarChartfour";

import QARBarChartfive from "./QARReport/QARBarChartfive";
import QARBarChartSix from "./QARReport/QARBarChartSix";
//  QAR SRO - import end here

// CGRMIndex SRO - import start from here
import CGRMIndex from "./CGRM/CGRMIndex";
//  CGRMIndex SRO - import end here

// RBI SRO - import start from here
import RBIIndex from "./RBIReport/RBIIndex";
//  RBI SRO - import end here

// RBI SRO - import start from here
import RBIOthersIndex from "./RBIReport/RBIOthersIndex";

//  RBI SRO - import end here

//cgrm -sro start from here
import NatureofCall from "./CGRM/NatureofCall";
import ProductWiseCall from "./CGRM/ProductWiseCall";
import CategoryWiseComplaintsMember from "./CGRM/CategoryWiseComplaintsMember"
import CategoryWiseComplaintsIndustry from "./CGRM/CategoryWiseComplaintsIndustry"
import CategoryWiseQuery from "./CGRM/CategoryWiseQuery";
import CategoryWiseComplaint from "./CGRM/CategoryWiseComplaint";
import CategoryWiseStatus from "./CGRM/CategoryWiseStatus";
import ResulationTAT from "./CGRM/ResulationTAT";
import OriginOfCall from "./CGRM/OriginOfCall";
import OriginOfCallIndustry from "./CGRM/OriginOfCallIndustry"

import ComplaintStatus from "./CGRM/ComplaintStatus";
import ReportTable from "./CGRM/ReportTable";
import AverageTAT from "./CGRM/AverageTAT";

// ***************  Others  : End ************************

import {
  qarDropdownDataApi,
  qarParamertersApi,
  gauardrillapi,
  universeashirvadbreah,
  householdbymemeber,
  beachuinverse,
  beachmemeber,
  gauardrillapiuniverse,
  CBDataAcceptanceIndustryGraphapi,
  rbiReportDropDownDataApi,
  rbiQuarterlyDataApi,
  cbMemberlist,
  cbEnititylist,
  cbMemberDataApi,
  cbIndustryDataApi,
  dropdownofcgrm,
  table1cgrm,
  graph1cgrm,
  graph2cgrm,
  graph3cgrm,
  graph4cgrm,
  graph5cgrm,
  graph6cgrm,
  graph7cgrm,
  graph8cgrm,
  table2cgrm,
  table3cgrm


} from "../url/url";
import { BaseUrl } from "../url/url";
import axios from "axios";
import authHeaders from "../Service/AuthHeaders";
import parse from "html-react-parser";
const useStyle = makeStyles((theme) =>
  createStyles({
    Buttonbg: {
      backgroundColor: "#058283 !important",
    },
  })
);
const SroMaster = () => {
  const classes = useStyle();

  const [value, setValue] = useState("1");



  const [mDataSubmissionSeries, setMDataSubmissionSeries] = useState([]);
  const [mDataSubmissionLabels, setMDataSubmissionLabels] = useState([]);
  const [mKycSeedingSeries, setMKycSeedingSeries] = useState([]);
  const [memberName, setMemberName] = useState("");
  //industry level
  const [iDataSubmissionSeries, setIDataSubmissionSeries] = useState([]);
  const [iDataSubmissionLabels, setIDataSubmissionLabels] = useState([]);
  const [iKycSeedingSeries, setIKycSeedingSeries] = useState([]);

  const formInitialState = {
    member: "",
    toMonth: "",
    isLoader: false,
    isDisabled: false,
    minDate: "",
    maxDate: "",
  };
  const [formState, setFormState] = useState(formInitialState);
  const [entity, setEntity] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [members, setMembers] = useState([]);
  const [Quatars, setQuatarList] = useState([]);
  //EB industry graph states
  const [ebIOverKycMember, setEbIOverKycMember] = useState([]);
  const [ebIInquiryHitSeries, setEbIInquiryHitSeries] = useState([]);
  const [ebIndustryLabels, setEbIndustryLabels] = useState([]);

  //EB industry graph data
  const [ebKycIndustryGraph, setEbKycIndustryGraph] = useState(null);

  //EB member graph data
  const [ebKycMemberGraph, setEbKycMemberGraph] = useState(null);

  const [ebMemberInquiryGData, setEbMemberInquiryGData] = useState(null);
  const [ebIndustryInquiryGData, setEbIndustryInquiryGData] = useState(null);

  const [ebCategoryMemberGData, setEBCategoryMemberGData] = useState([]);
  const [ebCategoryIndustryGData, setEBCategoryIndustryGData] = useState([]);

  // EB member graphs states
  const [ebMOverKycMember, setEbMOverKycMember] = useState([]);
  const [ebMInquiryHitSeries, setEbMInquiryHitSeries] = useState([]);
  const [ebMemberLabels, setEbMemberLabels] = useState([]);

  const [ebcategaryMemberSeries, setEBCategaryMemberSeries] = useState([]);
  const [categoryIndustrySeries, setCategoryIndustrySeries] = useState([]);

  const [QARParametersRecords, setQARParametersRecords] = useState([]);

  const [guardRailsRecords, setGuardRailsRecords] = useState([]);
  const [householdIncomeData, setHouseholdIncomeData] = React.useState(null);
  const [householdIncomeMemberData, setHouseholdIncomeMemberData] =
    React.useState(null);


  const [QARBucketMeetinglabels, setQARBucketMeetinglabels] = useState([]);
  const [QARBucketMeetingSeries, setQARBucketMeetingSeries] = useState([]);
  const [QARBucketMeetingmonthYear, setQARBucketMeetingmonthYear] =
    useState("");

  const [guardRailsChartData, setGuardRailsChartData] = React.useState(null);

  const [guardRailsMemberData, setGuardRailsMemberData] = React.useState(null);

  const [guardRailsIndustryAnalysisData, setGuardRailsIndustryAnalysisData] =
    React.useState(null);

  const [QARStatusACQarterlabels, setQARStatusACQarterlabels] = useState([]);
  const [QARStatusACQarterSeries, setQARStatusACQarterSeries] = useState([]);

  const [memberOrIndustry, setMemberOrIndustry] = useState("Member");
  const [qarMember, setQarMember] = useState([]);
  const [qarType, setQarType] = useState([]);
  const [qarEntity, setQarEntity] = useState([]);
  const [qarQuarter, setQarQuarter] = useState([]);

  // EB monthly submission

  // Start CGRM Report Information
  const [ReportData, setReportData] = useState(null);
  const [table1cgrm, setTable1cgrm] = useState(null);
  const [graph1cgrm, setgraph1cgrm] = useState(null);
  const [graph2cgrm, setgraph2cgrm] = useState(null);
  const [graph3cgrm, setgraph3cgrm] = useState(null);
  const [graph4cgrm, setgraph4cgrm] = useState(null);
  const [graph5cgrm, setgraph5cgrm] = useState(null);
  const [graph6cgrm, setgraph6cgrm] = useState(null);
  const [graph7cgrm, setgraph7cgrm] = useState(null);

  const [graph8cgrm, setgraph8cgrm] = useState(null);

  const [table3cgrm, settable3cgrm] = useState(null);

  const [table2cgrm, settable2cgrm] = useState(null);






  //latest
  const [natureOfCallQuery, setNatureOfCallQuery] = useState(0);
  const [natureOfCallComplaint, setNatureOfCallComplaint] = useState(0);

  const [productWiseCallData, setProductWiseCallData] = useState({});
  const [originOfCallData, setOriginOfCallData] = useState({});

  const [categoryWiseComplaint, setCategoryWiseComplaint] = useState({});
  const [categoryWiseQuery, setCategoryWiseQuery] = useState({});

  const [complaintStatusData, setcomplaintStatusData] = useState({});

  const [averageTATData, setAverageTATData] = useState({});

  const [NatureofCallSerieslabels, setNatureofCallSerieslabels] = useState([]);
  const [NatureofCallSeries, setNatureofCallSeries] = useState([]);

  const [ProductWiseCallVolumelabels, setProductWiseCallVolumelabels] =
    useState([]);
  const [ProductWiseCallVolumeSeries, setProductWiseCallVolumeSeries] =
    useState([]);

  const [CategoryWiseQuerylabels, setCategoryWiseQuerylabels] = useState([]);
  const [CategoryWiseQuerySeries, setCategoryWiseQuerySeries] = useState([]);

  const [CategoryWiseStatuslabels, setCategoryWiseStatuslabels] = useState([]);
  const [CategoryWiseStatusSeries, setCategoryWiseStatusSeries] = useState([]);

  const [ResulationTATlabels, setResulationTATlabels] = useState([]);
  const [ResulationTATSeries, setResulationTATSeries] = useState([]);

  /* End CGRM Report Information */

  // Start RBI report information

  const [rbiIndexData, setRBIIndexData] = useState([]);
  const [rbiYOYData, setRBIYOYData] = useState([]);
  const [rbiHouseholdData, setRBIHouseholdData] = useState(null);

  // end RBI report information

  //RBI-Others information start here
  const [rbiOthersData, setRBIOthersData] = useState([]);
  const [rbiOthersCOB, setRbiOthersCOB] = useState([]);
  const [rbiOthersPQ, setRbiOthersPQ] = useState([]);

  const [rbiDropdown, setRbiDropdown] = useState({
    fyYears: [],
    quarters: [],
    selectedFY: "",
    selectedQuarter: "",
    isLoader: false,
  });

  const [rbiQuarterlyReportData, setRbiQuarterlyReportData] = useState([]);

  //SRO - CB dropdown
  const [cbDropdown, setCBDropdown] = useState({
    members: [],
    entities: [],
    startMonth: null,
    endMonth: null,
    selectedMember: "",
    selectedEntity: "",
    selectedMonth: null,
    isLoader: false,
  });

  const [industryRecords, setIndustryRecords] = useState({
    months: [],
    data: {}
  });

  const [memberRecords, setMemberRecords] = useState({
    months: [],
    data: {}
  });

  //kyc and vid fill rate
  const [vidKycGraph, setVidKycGraph] = useState({
    months: [],
    data: []
  });

  const [industryGraphData, setIndustryGraphData] = useState([]);

  const [cbDataAcceptanceMember, setCBDataAcceptanceMember] = useState([])
  const [cbDataAcceptanceIndustry, setCBDataAcceptanceIndustry] = useState([])

  //SRO CGRM data

  //SRO - CGRM dropdown
  const [cgrmDropdown, setCGRMDropdown] = useState({
    members: [],
    quarters: [],
    entities: [],
    startMonth: null,
    endMonth: null,
    selectedMember: "",
    selectedEntity: "",
    selectedQuarter: "",
    isLoader: false,
  });


  //RBI-Others information end here

  const [ebMemberMonthlySubmission, setEbMemberMonthlySubmission] =
    useState("");
  const [ebIndustryMonthlySubmission, setEbIndustryMonthlySubmission] =
    useState("");
  const [ebUniqueEntity, setEbUniqueEntity] = useState("");
  const [ebentity, setEbEntity] = useState("");

  const handleChange1 = (event, newValue) => {
    setValue(newValue);
    setStartMonth("");
  };
  const graphFilterInitialState = {
    fromMonth: new Date("Aug-2018"),
    toMonth: new Date("Mar-2019"),
    maxDate: new Date("Feb-2025"),
    Quatar: "Mar-23",
    Period: "Q4 FY 22-23",
    dateSeries: "2017",
    isLoader: false,
    isDisabled: false,
  };
  const [graphFilter, setGraphFilter] = useState(graphFilterInitialState);
  const handleGraphToDateChange = (e) => {
    console.log("Value", e.target.value);
    setFormState({ ...formState, ["Quatar"]: e.target.value });
    setGraphFilter({ ...graphFilter, ["Quatar"]: e.target.value });
  };

  // const getCGRMData = async () => {
  //   const quarter = graphFilter.Quarter;
  //   const member = formState.member;

  //   console.log("🚀 Starting CGRM data fetch...");
  //   console.log("📊 Parameters:", { member, quarter });

  //   // STEP 1: Fetch table1 data
  //   try {
  //     const url = `${BaseUrl}/api/auth/CGRM_getTable1Data?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
  //     console.log("🔗 Table1 API URL:", url);

  //     const table1Response = await axios.get(url, {
  //       headers: authHeaders(),
  //     });

  //     console.log("✅ Table1 API Full Response:", table1Response);
  //     console.log("✅ Table1 API Data:", table1Response.data);
  //     console.log("✅ Table1 Status:", table1Response.data.status);
  //     console.log("✅ Table1 Data:", table1Response.data.table1);

  //     if (table1Response.data.status) {
  //       const reportData = {
  //         member: member,
  //         quarter: quarter,
  //         table1: table1Response.data.table1,
  //         default_member: table1Response.data.default_member,
  //         default_quarter: table1Response.data.default_quarter
  //       };

  //       console.log("📊 Setting ReportData:", reportData);
  //       setReportData(reportData);
  //     } else {
  //       console.log("❌ API returned status false");
  //       setReportData(null);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching table1 data:", error);
  //     if (error.response && error.response.data) {
  //       console.error("Error details:", error.response.data);
  //     }
  //     setReportData(null);
  //   }
  //   // ❌ REMOVE THIS OLD API CALL - It overwrites ReportData!
  //   // await axios.get(`${BaseUrl}/api/auth/getReport?month=${quarter}&member=${member}`)

  //   // STEP 2: Fetch other CGRM data (charts)
  //   try {
  //     // Nature of calls
  //     const nocResponse = await axios.get(
  //       `${BaseUrl}/api/auth/nature-of-calls?month=${quarter}&member=${member}`,
  //       { headers: authHeaders() }
  //     );
  //     console.log("Nature of calls:", nocResponse.data);
  //     setNatureOfCallQuery(nocResponse.data.Query);
  //     setNatureOfCallComplaint(nocResponse.data.Complaint);

  //     // Product wise calls
  //     const pwcResponse = await axios.get(
  //       `${BaseUrl}/api/auth/product-wise-calls?month=${quarter}&member=${member}`,
  //       { headers: authHeaders() }
  //     );
  //     console.log("Product wise calls:", pwcResponse.data);
  //     setProductWiseCallData(pwcResponse.data);

  //     // Origin of calls
  //     const oocResponse = await axios.get(
  //       `${BaseUrl}/api/auth/origin-of-calls?month=${quarter}&member=${member}`,
  //       { headers: authHeaders() }
  //     );
  //     console.log("Origin of calls:", oocResponse.data);
  //     setOriginOfCallData(oocResponse.data);

  //     // Category wise complaint
  //     const cwcResponse = await axios.get(
  //       `${BaseUrl}/api/auth/category-wise/Complaint?month=${quarter}&member=${member}`,
  //       { headers: authHeaders() }
  //     );
  //     console.log("Category wise complaint:", cwcResponse.data);
  //     setCategoryWiseComplaint(cwcResponse.data);

  //     // Category wise query
  //     const cwqResponse = await axios.get(
  //       `${BaseUrl}/api/auth/category-wise/Query?month=${quarter}&member=${member}`,
  //       { headers: authHeaders() }
  //     );
  //     console.log("Category wise query:", cwqResponse.data);
  //     setCategoryWiseQuery(cwqResponse.data);

  //     // Complaint status
  //     const csResponse = await axios.get(
  //       `${BaseUrl}/api/auth/complaint-status?month=${quarter}&member=${member}`,
  //       { headers: authHeaders() }
  //     );
  //     console.log("Complaint status:", csResponse.data);
  //     setcomplaintStatusData(csResponse.data);

  //     // Average TAT
  //     const tatResponse = await axios.get(
  //       `${BaseUrl}/api/auth/average-tat?month=${quarter}&member=${member}`,
  //       { headers: authHeaders() }
  //     );
  //     console.log("Average TAT:", tatResponse.data);
  //     setAverageTATData(tatResponse.data);

  //   } catch (error) {
  //     console.error("❌ Error fetching CGRM chart data:", error);
  //     if (error.response && error.response.data) {
  //       console.error("Chart error details:", error.response.data);
  //     }
  //   }
  // };

  // const getCGRMData = async (memberParam = null, quarterParam = null) => {
  //   const quarter = quarterParam || graphFilter.Quarter;
  //   const member = memberParam || formState.member;

  //   console.log("🚀 Starting CGRM data fetch...");
  //   console.log("📊 Parameters:", { member, quarter });

  //   // STEP 2: Fetch Member-specific Nature of Calls - EXTENDED DEBUGGING
  //   try {
  //     const url = `${BaseUrl}/api/auth/Nature_of_calls_Member?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
  //     console.log("🔗 Nature of Calls MEMBER API URL:", url);

  //     const memberResponse = await axios.get(url, {
  //       headers: authHeaders(),
  //     });

  //     console.log("🎯 FULL API RESPONSE:", memberResponse);
  //     console.log("✅ Nature of Calls MEMBER Response DATA:", memberResponse.data);
  //     console.log("📊 Response status:", memberResponse.data.status);
  //     console.log("📊 Has chart1?", !!memberResponse.data.chart1);
  //     console.log("📊 chart1 data:", memberResponse.data.chart1);
  //     console.log("📊 Is chart1 array?", Array.isArray(memberResponse.data.chart1));
  //     console.log("📊 chart1 length:", memberResponse.data.chart1 ? memberResponse.data.chart1.length : 0);

  //     if (memberResponse.data.status) {
  //       const reportData = {
  //         member: memberResponse.data.member || member,
  //         quarter: memberResponse.data.quarter || quarter,
  //         chart1: memberResponse.data.chart1 || [],
  //       };

  //       console.log("🔄 Setting graph1cgrm with:", reportData);
  //       setgraph1cgrm(reportData);

  //       // Immediately check if state was set
  //       setTimeout(() => {
  //         console.log("📝 Current graph1cgrm state:", graph1cgrm);
  //       }, 100);
  //     } else {
  //       console.log("❌ MEMBER API returned status false");
  //       setgraph1cgrm(null);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching Nature of Calls MEMBER data:", error);
  //     if (error.response) {
  //       console.error("Error response data:", error.response.data);
  //       console.error("Error response status:", error.response.status);
  //     }
  //     setgraph1cgrm(null);
  //   }
  //   // STEP 2: Fetch Member-specific Nature of Calls - DEBUGGING
  //   try {
  //     const url = `${BaseUrl}/api/auth/Nature_of_calls_Member?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
  //     console.log("🔗 Nature of Calls MEMBER API URL:", url);

  //     const memberResponse = await axios.get(url, {
  //       headers: authHeaders(),
  //     });

  //     console.log("✅ Nature of Calls MEMBER FULL Response:", memberResponse.data);
  //     console.log("📊 Response status:", memberResponse.data && memberResponse.data.status);
  //     console.log("📊 Has chart1?", !!(memberResponse.data && memberResponse.data.chart1));
  //     console.log("📊 chart1 length:", memberResponse.data && memberResponse.data.chart1 ? memberResponse.data.chart1.length : 0);
  //     console.log("📊 chart1 data:", memberResponse.data && memberResponse.data.chart1);

  //     if (memberResponse.data && memberResponse.data.status) {
  //       const reportData = {
  //         member: memberResponse.data.member || member,
  //         quarter: memberResponse.data.quarter || quarter,
  //         chart1: memberResponse.data.chart1 || [],
  //       };

  //       console.log("📊 Setting graph1cgrm:", reportData);
  //       setgraph1cgrm(reportData);
  //     } else {
  //       console.log("❌ MEMBER API returned status false");
  //       setgraph1cgrm(null);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching Nature of Calls MEMBER data:", error);
  //     if (error.response) {
  //       console.error("Error response data:", error.response.data);
  //       console.error("Error response status:", error.response.status);
  //     }
  //     setgraph1cgrm(null);
  //   }

  //   // STEP 3: Fetch Industry-wide Nature of Calls
  //   try {
  //     const url = `${BaseUrl}/api/auth/Nature_of_calls_Industry?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
  //     console.log("🔗 Nature of Calls INDUSTRY API URL:", url);

  //     const industryResponse = await axios.get(url, {
  //       headers: authHeaders(),
  //     });

  //     console.log("✅ Nature of Calls INDUSTRY Response:", industryResponse.data);
  //     console.log("📊 Response status:", industryResponse.data.status);
  //     console.log("📊 chart1 data:", industryResponse.data.chart1);
  //     console.log("📊 Is chart1 array?", Array.isArray(industryResponse.data.chart1));
  //     console.log("📊 chart1 length:", industryResponse.data.chart1 ? industryResponse.data.chart1.length : 0);

  //     if (industryResponse.data.status) {
  //       const reportData = {
  //         member: industryResponse.data.member || member,
  //         quarter: industryResponse.data.quarter || quarter,
  //         chart1: industryResponse.data.chart1 || [],
  //       };

  //       console.log("📊 Setting graph2cgrm:", reportData);
  //       setgraph2cgrm(reportData);
  //     } else {
  //       console.log("❌ INDUSTRY API returned status false");
  //       setgraph2cgrm(null);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching Nature of Calls INDUSTRY data:", error);
  //     if (error.response) {
  //       console.error("Error response data:", error.response.data);
  //       console.error("Error response status:", error.response.status);
  //     }
  //     setgraph2cgrm(null);
  //   }

  //   // STEP 4: Fetch Category Wise Complaints Member data
  //   try {
  //     const url = `${BaseUrl}/api/auth/categoryWiseComplaintsMember?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
  //     console.log("🔗 Category Wise Complaints Member API URL:", url);

  //     const cwcmResponse = await axios.get(url, {
  //       headers: authHeaders(),
  //     });

  //     console.log("✅ Category Wise Complaints Member Response:", cwcmResponse.data);
  //     console.log("📊 Response status:", cwcmResponse.data.status);
  //     console.log("📊 chart3 data:", cwcmResponse.data.chart3);
  //     console.log("📊 Is chart3 array?", Array.isArray(cwcmResponse.data.chart3));
  //     console.log("📊 chart3 length:", cwcmResponse.data.chart3 ? cwcmResponse.data.chart3.length : 0);

  //     if (cwcmResponse.data.status) {
  //       const reportData = {
  //         member: cwcmResponse.data.member || member,
  //         quarter: cwcmResponse.data.quarter || quarter,
  //         chart3: cwcmResponse.data.chart3 || [],
  //         total: cwcmResponse.data.total || 0,
  //       };

  //       console.log("📊 Setting graph3cgrm:", reportData);
  //       setgraph3cgrm(reportData);
  //     } else {
  //       console.log("❌ Category Wise Complaints Member API returned status false");
  //       setgraph3cgrm(null);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching Category Wise Complaints Member data:", error);
  //     if (error.response) {
  //       console.error("Error response data:", error.response.data);
  //       console.error("Error response status:", error.response.status);
  //     }
  //     setgraph3cgrm(null);
  //   }

  //   // STEP 6: Fetch Category Wise Complaints Industry data
  //   try {
  //     const url = `${BaseUrl}/api/auth/categoryWiseComplaintsIndustry?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
  //     console.log("🔗 Category Wise Complaints Industry API URL:", url);

  //     const cwciResponse = await axios.get(url, {
  //       headers: authHeaders(),
  //     });

  //     console.log("✅ Category Wise Complaints Industry Response:", cwciResponse.data);
  //     console.log("📊 Response status:", cwciResponse.data.status);
  //     console.log("📊 chart3 data:", cwciResponse.data.chart3);
  //     console.log("📊 Is chart3 array?", Array.isArray(cwciResponse.data.chart3));
  //     console.log("📊 chart3 length:", cwciResponse.data.chart3 ? cwciResponse.data.chart3.length : 0);

  //     if (cwciResponse.data.status) {
  //       const reportData = {
  //         member: cwciResponse.data.member || member,
  //         quarter: cwciResponse.data.quarter || quarter,
  //         chart3: cwciResponse.data.chart3 || [],
  //         total: cwciResponse.data.total || 0,
  //       };

  //       console.log("📊 Setting graph4cgrm:", reportData);
  //       setgraph4cgrm(reportData);
  //     } else {
  //       console.log("❌ Category Wise Complaints Industry API returned status false");
  //       setgraph4cgrm(null);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching Category Wise Complaints Industry data:", error);
  //     if (error.response) {
  //       console.error("Error response data:", error.response.data);
  //       console.error("Error response status:", error.response.status);
  //     }
  //     setgraph4cgrm(null);
  //   }
  //   // STEP 7: Fetch Category Wise Queries Member data
  //   try {
  //     const url = `${BaseUrl}/api/auth/categoryWiseQueriesMember?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
  //     console.log("🔗 Category Wise Queries Member API URL:", url);

  //     const cwqmResponse = await axios.get(url, {
  //       headers: authHeaders(),
  //     });

  //     console.log("✅ Category Wise Queries Member Response:", cwqmResponse.data);

  //     if (cwqmResponse.data.status) {
  //       const reportData = {
  //         member: cwqmResponse.data.member || member,
  //         quarter: cwqmResponse.data.quarter || quarter,
  //         chart5: cwqmResponse.data.chart5 || [],
  //         total: cwqmResponse.data.total || 0,
  //       };

  //       console.log("📊 Setting graph5cgrm:", reportData);
  //       setgraph5cgrm(reportData);
  //     } else {
  //       console.log("❌ Category Wise Queries Member API returned status false");
  //       setgraph5cgrm(null);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching Category Wise Queries Member data:", error);
  //     if (error.response) {
  //       console.error("Error response data:", error.response.data);
  //       console.error("Error response status:", error.response.status);
  //     }
  //     setgraph5cgrm(null);
  //   }

  //   // STEP: Fetch Category Wise Queries Industry data - FIXED
  //   try {
  //     const url = `${BaseUrl}/api/auth/categoryWiseQueriesIndustry?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
  //     console.log("🔗 Category Wise Queries Industry API URL:", url);

  //     const cwqiResponse = await axios.get(url, {
  //       headers: authHeaders(),
  //     });

  //     console.log("✅ Category Wise Queries Industry FULL Response:", cwqiResponse.data);
  //     console.log("📊 Response status:", cwqiResponse.data && cwqiResponse.data.status);
  //     console.log("📊 Has chart5?", !!(cwqiResponse.data && cwqiResponse.data.chart5));
  //     console.log("📊 chart5 length:", cwqiResponse.data && cwqiResponse.data.chart5 ? cwqiResponse.data.chart5.length : 0);
  //     console.log("📊 chart5 data:", cwqiResponse.data && cwqiResponse.data.chart5);

  //     if (cwqiResponse.data && cwqiResponse.data.status) {
  //       const reportData = {
  //         member: cwqiResponse.data.member || member,
  //         quarter: cwqiResponse.data.quarter || quarter,
  //         chart5: cwqiResponse.data.chart5 || [], // Use chart5 instead of chart3
  //         total: cwqiResponse.data.total || 0,
  //       };

  //       console.log("📊 Setting graph6cgrm:", reportData);
  //       setgraph6cgrm(reportData);
  //     } else {
  //       console.log("❌ Category Wise Queries Industry API returned status false");
  //       setgraph6cgrm(null);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching Category Wise Queries Industry data:", error);
  //     if (error.response) {
  //       console.error("Error response data:", error.response.data);
  //       console.error("Error response status:", error.response.status);
  //     }
  //     setgraph6cgrm(null);
  //   }
  //   // STEP 10: Fetch Average TAT Member data
  //   try {
  //     const url = `${BaseUrl}/api/auth/averageTATMember?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
  //     console.log("🔗 Average TAT Member API URL:", url);

  //     const tatMemberResponse = await axios.get(url, {
  //       headers: authHeaders(),
  //     });

  //     console.log("✅ Average TAT Member Response:", tatMemberResponse.data);

  //     if (tatMemberResponse.data.status) {
  //       const reportData = {
  //         member: tatMemberResponse.data.member || member,
  //         quarter: tatMemberResponse.data.quarter || quarter,
  //         chart9: tatMemberResponse.data.chart9 || [],
  //         total_closed: tatMemberResponse.data.total_closed || 0,
  //       };

  //       console.log("📊 Setting graph7cgrm:", reportData);
  //       setgraph7cgrm(reportData);
  //     } else {
  //       console.log("❌ Average TAT Member API returned status false");
  //       setgraph7cgrm(null);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching Average TAT Member data:", error);
  //     if (error.response) {
  //       console.error("Error response data:", error.response.data);
  //       console.error("Error response status:", error.response.status);
  //     }
  //     setgraph7cgrm(null);
  //   }
  //   // STEP 9: Fetch Average TAT Industry data
  //   try {
  //     const url = `${BaseUrl}/api/auth/averageTATIndustry?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
  //     console.log("🔗 Average TAT Industry API URL:", url);

  //     const tatResponse = await axios.get(url, {
  //       headers: authHeaders(),
  //     });

  //     console.log("✅ Average TAT Industry Response:", tatResponse.data);

  //     if (tatResponse.data.status) {
  //       const reportData = {
  //         entity_type: tatResponse.data.entity_type,
  //         quarter: tatResponse.data.quarter || quarter,
  //         chart10: tatResponse.data.chart10 || [],
  //         total_closed: tatResponse.data.total_closed || 0,
  //       };

  //       console.log("📊 Setting graph8cgrm:", reportData);
  //       setgraph8cgrm(reportData);
  //     } else {
  //       console.log("❌ Average TAT Industry API returned status false");
  //       setgraph8cgrm(null);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching Average TAT Industry data:", error);
  //     if (error.response) {
  //       console.error("Error response data:", error.response.data);
  //       console.error("Error response status:", error.response.status);
  //     }
  //     setgraph8cgrm(null);
  //   }

  //   // STEP 11: Fetch Origin of Complaints & Queries Industry data
  //   try {
  //     const url = `${BaseUrl}/api/auth/OriginOfComplaintsQueriesIndustry?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
  //     console.log("🔗 Origin of Complaints & Queries Industry API URL:", url);

  //     const originResponse = await axios.get(url, {
  //       headers: authHeaders(),
  //     });

  //     console.log("✅ Origin of Complaints & Queries Industry FULL Response:", originResponse.data);
  //     console.log("📊 Response status:", originResponse.data && originResponse.data.status);
  //     console.log("📊 Has chart8?", !!(originResponse.data && originResponse.data.chart8));
  //     console.log("📊 chart8 length:", originResponse.data && originResponse.data.chart8 ? originResponse.data.chart8.length : 0);

  //     if (originResponse.data && originResponse.data.status) {
  //       const reportData = {
  //         entity_type: originResponse.data.entity_type,
  //         quarter: originResponse.data.quarter || quarter,
  //         chart8: originResponse.data.chart8 || [],
  //       };

  //       console.log("📊 Setting table2cgrm:", reportData);
  //       settable2cgrm(reportData);
  //     } else {
  //       console.log("❌ API returned status false or no status");
  //       settable2cgrm(null);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error:", error);
  //     settable2cgrm(null);
  //   }
  //   // STEP: Fetch Origin of Complaints & Queries Member data
  //   // STEP: Fetch Origin of Complaints & Queries Member data
  //   try {
  //     const url = `${BaseUrl}/api/auth/OriginOfComplaintsQueriesMember?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
  //     console.log("🔗 Origin of Complaints & Queries Member API URL:", url);

  //     const originResponse = await axios.get(url, {
  //       headers: authHeaders(),
  //     });

  //     console.log("✅ Origin of Complaints & Queries Member FULL Response:", originResponse.data);
  //     console.log("📊 Response status:", originResponse.data && originResponse.data.status);
  //     console.log("📊 Has chart7?", !!(originResponse.data && originResponse.data.chart7));
  //     console.log("📊 chart7 length:", originResponse.data && originResponse.data.chart7 ? originResponse.data.chart7.length : 0);
  //     console.log("📊 chart7 data:", originResponse.data && originResponse.data.chart7);

  //     if (originResponse.data && originResponse.data.status) {
  //       const reportData = {
  //         entity_type: originResponse.data.entity_type,
  //         quarter: originResponse.data.quarter || quarter,
  //         chart7: originResponse.data.chart7 || [], // Use chart7 instead of chart8
  //       };

  //       console.log("📊 Setting table3cgrm:", reportData);
  //       settable3cgrm(reportData);
  //     } else {
  //       console.log("❌ API returned status false or no status");
  //       settable3cgrm(null);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error:", error);
  //     settable3cgrm(null);
  //   }
  //   // STEP 5: Fetch other chart data
  //   try {






  //     const cwqResponse = await axios.get(
  //       `${BaseUrl}/api/auth/category-wise/Query?month=${quarter}&member=${member}`,
  //       { headers: authHeaders() }
  //     );
  //     setCategoryWiseQuery(cwqResponse.data);

  //     const csResponse = await axios.get(
  //       `${BaseUrl}/api/auth/complaint-status?month=${quarter}&member=${member}`,
  //       { headers: authHeaders() }
  //     );
  //     setcomplaintStatusData(csResponse.data);

  //     const tatResponse = await axios.get(
  //       `${BaseUrl}/api/auth/average-tat?month=${quarter}&member=${member}`,
  //       { headers: authHeaders() }
  //     );
  //     setAverageTATData(tatResponse.data);

  //   } catch (error) {
  //     console.error("❌ Error fetching chart data:", error);
  //   }
  // };
  const getCGRMData = async (memberParam = null, quarterParam = null) => {
  const quarter = quarterParam || graphFilter.Quarter;
  const member = memberParam || formState.member;

  console.log("🚀 Starting CGRM data fetch...");
  console.log("📊 Parameters:", { member, quarter });

  // STEP 1: Fetch table1 data
  try {
    const url = `${BaseUrl}/api/auth/CGRM_getTable1Data?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
    console.log("🔗 Table1 API URL:", url);

    const table1Response = await axios.get(url, {
      headers: authHeaders(),
    });

    console.log("✅ Table1 API Response:", table1Response.data);

    if (table1Response.data.status) {
      const reportData = {
        member: member,
        quarter: quarter,
        table1: table1Response.data.table1,
        default_member: table1Response.data.default_member,
        default_quarter: table1Response.data.default_quarter
      };

      console.log("📊 Setting table1cgrm:", reportData);
      setTable1cgrm(reportData);
    } else {
      console.log("❌ API returned status false");
      setTable1cgrm(null);
    }
  } catch (error) {
    console.error("❌ Error fetching table1 data:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
    }
    setTable1cgrm(null);
  }

  // STEP 2: Fetch Member-specific Nature of Calls
  try {
    const url = `${BaseUrl}/api/auth/Nature_of_calls_Member?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
    console.log("🔗 Nature of Calls MEMBER API URL:", url);

    const memberResponse = await axios.get(url, {
      headers: authHeaders(),
    });

    console.log("✅ Nature of Calls MEMBER Response:", memberResponse.data);

    if (memberResponse.data.status) {
      const reportData = {
        member: memberResponse.data.member || member,
        quarter: memberResponse.data.quarter || quarter,
        chart1: memberResponse.data.chart1 || [],
      };

      console.log("📊 Setting graph1cgrm:", reportData);
      setgraph1cgrm(reportData);
    } else {
      console.log("❌ MEMBER API returned status false");
      setgraph1cgrm(null);
    }
  } catch (error) {
    console.error("❌ Error fetching Nature of Calls MEMBER data:", error);
    setgraph1cgrm(null);
  }

  // STEP 3: Fetch Industry-wide Nature of Calls
  try {
    const url = `${BaseUrl}/api/auth/Nature_of_calls_Industry?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
    console.log("🔗 Nature of Calls INDUSTRY API URL:", url);

    const industryResponse = await axios.get(url, {
      headers: authHeaders(),
    });

    console.log("✅ Nature of Calls INDUSTRY Response:", industryResponse.data);

    if (industryResponse.data.status) {
      const reportData = {
        member: industryResponse.data.member || member,
        quarter: industryResponse.data.quarter || quarter,
        chart1: industryResponse.data.chart1 || [],
      };

      console.log("📊 Setting graph2cgrm:", reportData);
      setgraph2cgrm(reportData);
    } else {
      console.log("❌ INDUSTRY API returned status false");
      setgraph2cgrm(null);
    }
  } catch (error) {
    console.error("❌ Error fetching Nature of Calls INDUSTRY data:", error);
    setgraph2cgrm(null);
  }

  // STEP 4: Fetch Category Wise Complaints Member data
  try {
    const url = `${BaseUrl}/api/auth/categoryWiseComplaintsMember?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
    console.log("🔗 Category Wise Complaints Member API URL:", url);

    const cwcmResponse = await axios.get(url, {
      headers: authHeaders(),
    });

    console.log("✅ Category Wise Complaints Member Response:", cwcmResponse.data);

    if (cwcmResponse.data.status) {
      const reportData = {
        member: cwcmResponse.data.member || member,
        quarter: cwcmResponse.data.quarter || quarter,
        chart3: cwcmResponse.data.chart3 || [],
        total: cwcmResponse.data.total || 0,
      };

      console.log("📊 Setting graph3cgrm:", reportData);
      setgraph3cgrm(reportData);
    } else {
      console.log("❌ Category Wise Complaints Member API returned status false");
      setgraph3cgrm(null);
    }
  } catch (error) {
    console.error("❌ Error fetching Category Wise Complaints Member data:", error);
    setgraph3cgrm(null);
  }

  // STEP 5: Fetch Category Wise Complaints Industry data
  try {
    const url = `${BaseUrl}/api/auth/categoryWiseComplaintsIndustry?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
    console.log("🔗 Category Wise Complaints Industry API URL:", url);

    const cwciResponse = await axios.get(url, {
      headers: authHeaders(),
    });

    console.log("✅ Category Wise Complaints Industry Response:", cwciResponse.data);

    if (cwciResponse.data.status) {
      const reportData = {
        member: cwciResponse.data.member || member,
        quarter: cwciResponse.data.quarter || quarter,
        chart3: cwciResponse.data.chart3 || [],
        total: cwciResponse.data.total || 0,
      };

      console.log("📊 Setting graph4cgrm:", reportData);
      setgraph4cgrm(reportData);
    } else {
      console.log("❌ Category Wise Complaints Industry API returned status false");
      setgraph4cgrm(null);
    }
  } catch (error) {
    console.error("❌ Error fetching Category Wise Complaints Industry data:", error);
    setgraph4cgrm(null);
  }

  // STEP 6: Fetch Category Wise Queries Member data
  try {
    const url = `${BaseUrl}/api/auth/categoryWiseQueriesMember?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
    console.log("🔗 Category Wise Queries Member API URL:", url);

    const cwqmResponse = await axios.get(url, {
      headers: authHeaders(),
    });

    console.log("✅ Category Wise Queries Member Response:", cwqmResponse.data);

    if (cwqmResponse.data.status) {
      const reportData = {
        member: cwqmResponse.data.member || member,
        quarter: cwqmResponse.data.quarter || quarter,
        chart5: cwqmResponse.data.chart5 || [],
        total: cwqmResponse.data.total || 0,
      };

      console.log("📊 Setting graph5cgrm:", reportData);
      setgraph5cgrm(reportData);
    } else {
      console.log("❌ Category Wise Queries Member API returned status false");
      setgraph5cgrm(null);
    }
  } catch (error) {
    console.error("❌ Error fetching Category Wise Queries Member data:", error);
    setgraph5cgrm(null);
  }

  // STEP 7: Fetch Category Wise Queries Industry data
  try {
    const url = `${BaseUrl}/api/auth/categoryWiseQueriesIndustry?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
    console.log("🔗 Category Wise Queries Industry API URL:", url);

    const cwqiResponse = await axios.get(url, {
      headers: authHeaders(),
    });

    console.log("✅ Category Wise Queries Industry Response:", cwqiResponse.data);

    if (cwqiResponse.data.status) {
      const reportData = {
        member: cwqiResponse.data.member || member,
        quarter: cwqiResponse.data.quarter || quarter,
        chart5: cwqiResponse.data.chart5 || [],
        total: cwqiResponse.data.total || 0,
      };

      console.log("📊 Setting graph6cgrm:", reportData);
      setgraph6cgrm(reportData);
    } else {
      console.log("❌ Category Wise Queries Industry API returned status false");
      setgraph6cgrm(null);
    }
  } catch (error) {
    console.error("❌ Error fetching Category Wise Queries Industry data:", error);
    setgraph6cgrm(null);
  }

  // STEP 8: Fetch Origin of Complaints & Queries Member data
  try {
    const url = `${BaseUrl}/api/auth/OriginOfComplaintsQueriesMember?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
    console.log("🔗 Origin of Complaints & Queries Member API URL:", url);

    const originResponse = await axios.get(url, {
      headers: authHeaders(),
    });

    console.log("✅ Origin of Complaints & Queries Member Response:", originResponse.data);

    if (originResponse.data && originResponse.data.status) {
      const reportData = {
        entity_type: originResponse.data.entity_type,
        quarter: originResponse.data.quarter || quarter,
        chart7: originResponse.data.chart7 || [],
      };

      console.log("📊 Setting table3cgrm:", reportData);
      settable3cgrm(reportData);
    } else {
      console.log("❌ API returned status false or no status");
      settable3cgrm(null);
    }
  } catch (error) {
    console.error("❌ Error:", error);
    settable3cgrm(null);
  }

  // STEP 9: Fetch Origin of Complaints & Queries Industry data
  try {
    const url = `${BaseUrl}/api/auth/OriginOfComplaintsQueriesIndustry?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
    console.log("🔗 Origin of Complaints & Queries Industry API URL:", url);

    const originResponse = await axios.get(url, {
      headers: authHeaders(),
    });

    console.log("✅ Origin of Complaints & Queries Industry Response:", originResponse.data);

    if (originResponse.data && originResponse.data.status) {
      const reportData = {
        entity_type: originResponse.data.entity_type,
        quarter: originResponse.data.quarter || quarter,
        chart8: originResponse.data.chart8 || [],
      };

      console.log("📊 Setting table2cgrm:", reportData);
      settable2cgrm(reportData);
    } else {
      console.log("❌ API returned status false or no status");
      settable2cgrm(null);
    }
  } catch (error) {
    console.error("❌ Error:", error);
    settable2cgrm(null);
  }

  // STEP 10: Fetch Average TAT Member data
  try {
    const url = `${BaseUrl}/api/auth/averageTATMember?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
    console.log("🔗 Average TAT Member API URL:", url);

    const tatMemberResponse = await axios.get(url, {
      headers: authHeaders(),
    });

    console.log("✅ Average TAT Member Response:", tatMemberResponse.data);

    if (tatMemberResponse.data.status) {
      const reportData = {
        member: tatMemberResponse.data.member || member,
        quarter: tatMemberResponse.data.quarter || quarter,
        chart9: tatMemberResponse.data.chart9 || [],
        total_closed: tatMemberResponse.data.total_closed || 0,
      };

      console.log("📊 Setting graph7cgrm:", reportData);
      setgraph7cgrm(reportData);
    } else {
      console.log("❌ Average TAT Member API returned status false");
      setgraph7cgrm(null);
    }
  } catch (error) {
    console.error("❌ Error fetching Average TAT Member data:", error);
    setgraph7cgrm(null);
  }

  // STEP 11: Fetch Average TAT Industry data
  try {
    const url = `${BaseUrl}/api/auth/averageTATIndustry?member=${encodeURIComponent(member)}&quarter=${encodeURIComponent(quarter)}`;
    console.log("🔗 Average TAT Industry API URL:", url);

    const tatResponse = await axios.get(url, {
      headers: authHeaders(),
    });

    console.log("✅ Average TAT Industry Response:", tatResponse.data);

    if (tatResponse.data.status) {
      const reportData = {
        entity_type: tatResponse.data.entity_type,
        quarter: tatResponse.data.quarter || quarter,
        chart10: tatResponse.data.chart10 || [],
        total_closed: tatResponse.data.total_closed || 0,
      };

      console.log("📊 Setting graph8cgrm:", reportData);
      setgraph8cgrm(reportData);
    } else {
      console.log("❌ Average TAT Industry API returned status false");
      setgraph8cgrm(null);
    }
  } catch (error) {
    console.error("❌ Error fetching Average TAT Industry data:", error);
    setgraph8cgrm(null);
  }
};
  const chartColorsMap = {
    memberChart: ["#1E3A5F", "#2C7A9E", "#B8B8B8"],
    universeChart: ["#1E3A5F", "#2E9BDE", "#D4E5F0"],
  };
  const applyChartColors = (apiData, chartType) => {
    if (!apiData || !apiData.chart || !apiData.chart.series) return apiData;

    const colors = chartColorsMap[chartType] || [
      "#1E3A5F",
      "#2E9BDE",
      "#D4E5F0",
    ];

    const updatedData = {
      ...apiData,
      chart: {
        ...apiData.chart,
        series: apiData.chart.series.map((series, idx) => ({
          ...series,
          color: colors[idx] || series.color,
        })),
      },
    };

    return updatedData;
  };
  // const getQARData = async () => {
  //   var queryString = Object.keys(formState)
  //     .map((key) => key + "=" + formState[key])
  //     .join("&");
  //   // sro-get-QAR-paramters- indusrty Level
  //   await axios
  //     .get(`${BaseUrl}/api/auth/sro-get-QAR-paramters?${queryString}`, {
  //       headers: authHeaders(),
  //     })
  //     .then((response) => {
  //       setQARParametersRecords(parse(response.data.data.QARParametersTable));

  //       //setMembers(response.data.MFISelected);
  //     })
  //     .catch((error) => {
  //       console.log("err", error);
  //     });
  //   //sro-get-QAR-paramters - member Level
  // };

  // URL file mein already hai: export const dropdownofcgrm = "/api/auth/CGRM_Drop_down_data";

  // API service function add karein
  const fetchCGRMDropdownData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}${dropdownofcgrm}`, {
        headers: authHeaders(),
      });
      console.log("resp in cgrm", response.data);
      setCGRMDropdown((prev) => ({
        ...prev,
        members: response.data.member,
        quarters: response.data.quarter,
        isLoader: false,
      }));
    } catch (error) {
      console.error('Error fetching CGRM dropdown data:', error);
      return {
        status: false,
        member: [],
        quarter: []
      };
    }
  };
  // Naya function add karein for CGRM dropdown data
  // const getCGRMDropdownData = async () => {
  //   console.log("🔄 Fetching CGRM dropdown data...");

  //   try {
  //     const dropdownData = await fetchCGRMDropdownData();

  //     console.log("✅ Dropdown data:", dropdownData);

  //     if (dropdownData.status) {
  //       setMembers(dropdownData.member || []);
  //       setQuatarList(dropdownData.quarter || []);

  //       // Set default values
  //       if (dropdownData.member.length > 0 && !formState.member) {
  //         setFormState(prev => ({ ...prev, member: dropdownData.member[0] }));
  //       }

  //       // ✅ FIXED: Quatar → Quarter
  //       if (dropdownData.quarter.length > 0 && !graphFilter.Quarter) {
  //         setGraphFilter(prev => ({ ...prev, Quarter: dropdownData.quarter[0] }));
  //       }
  //     }
  //   } catch (error) {
  //     console.error('❌ Error loading CGRM dropdown data:', error);
  //   }
  // };
  const getQARData = async () => {
    console.log("before calling qardata");
    console.log("quarter", formState.quarter);
    console.log("formState", formState);

    try {
      // ✅ Encode all values to handle spaces or special characters
      const params = new URLSearchParams({
        lender_name: formState.member,
        quarter: formState.quarter,
        entity: formState.entity,
        filter_type: formState.type,
      });

      const url = `${BaseUrl}/${qarParamertersApi}?${params.toString()}`;
      console.log("✅ Final Encoded URL:", url);

      const response = await axios.get(url, {
        headers: authHeaders(),
      });

      console.log("qar resp table", response.data);

      setQARParametersRecords(response.data);
    } catch (error) {
      console.log("err in qar table", error);
    }
  };

  const getQARBucketMeetingData = async () => {
    var queryString = Object.keys(formState)
      .map((key) => key + "=" + formState[key])
      .join("&");
    // sro-get-QAR-paramters- indusrty Level
    await axios
      .get(`${BaseUrl}/api/auth/sro-get-QAR-bucketmeeting?${queryString}`, {
        headers: authHeaders(),
      })
      .then((response) => {
        setQARBucketMeetinglabels(response.data.data.labels);
        setQARBucketMeetingSeries(response.data.data.pieSeries);
        setQARBucketMeetingmonthYear(response.data.data.monthYear);
        //setMembers(response.data.MFISelected);
      })
      .catch((error) => {
        console.log("err", error);
      });
    //sro-get-QAR-paramters - member Level
  };
  const getQARStatucAcQarterData = async () => {
    var queryString = Object.keys(formState)
      .map((key) => key + "=" + formState[key])
      .join("&");
    // sro-get-QAR-paramters- indusrty Level
    await axios
      .get(`${BaseUrl}/api/auth/sro-get-QAR-statucacqarter?${queryString}`, {
        headers: authHeaders(),
      })
      .then((response) => {
        setQARStatusACQarterlabels(response.data.data.labels);
        console.log("Raj", response.data.data.labels);
        setQARStatusACQarterSeries(response.data.data.series);
        //setMembers(response.data.MFISelected);
      })
      .catch((error) => {
        console.log("err", error);
      });
    //sro-get-QAR-paramters - member Level
  };

  const getGuardRailsData = async () => {
    console.log("before calling guardrails data");
    console.log("formState", formState);

    try {
      const params = new URLSearchParams({
        lender_name: formState.member,
        quarter: formState.quarter,
        entity: formState.entity,
        filter_type: formState.type,
      });

      const url = `${BaseUrl}/${gauardrillapi}?${params.toString()}`;
      console.log("✅ Guardrails URL:", url);

      const response = await axios.get(url, {
        headers: authHeaders(),
      });

      console.log("Guardrails table response", response.data);
      setGuardRailsRecords(response.data); // store in state to render table
    } catch (error) {
      console.log("err in guardrails table", error);
    }
  };

  const getHouseholdIncomeData = async () => {
    try {
      const params = new URLSearchParams({
        lender_name: formState.member,
        quarter: formState.quarter,
        entity: formState.entity || "universe",
        filter_type: formState.type || "Value",
      });

      const url = `${BaseUrl}${universeashirvadbreah}?${params.toString()}`;
      console.log("✅ Household Income URL:", url);

      const response = await axios.get(url, {
        headers: authHeaders(),
      });

      console.log("Household Income response", response.data);

      if (response.data && response.data.chart) {
        setHouseholdIncomeData(response.data);
      } else {
        console.warn("No chart data in response:", response.data);
        setHouseholdIncomeData({ chart: { series: [], labels: [] } }); // Send empty structure
      }
    } catch (error) {
      console.log("Error in household income chart:", error);
      setHouseholdIncomeData({ chart: { series: [], labels: [] } }); // Send empty structure on error
    }
  };

  const getHouseholdIncomeMemberData = async () => {
    console.log("before calling household income member data");

    console.log("Parameters:", {
      lender_name: formState.member,
      quarter: formState.quarter,
      entity: formState.entity,
      filter_type: formState.type,
    });

    // Validate required fields
    if (!formState.member || !formState.quarter) {
      console.log("Missing required fields - member or quarter");
      setHouseholdIncomeMemberData(null);
      return;
    }

    try {
      const params = new URLSearchParams({
        lender_name: formState.member,
        quarter: formState.quarter,
        entity: formState.entity || "universe",
        filter_type: formState.type || "Volume",
      });

      const url = `${BaseUrl}/${householdbymemeber}?${params.toString()}`;
      console.log("✅ Household Income Member URL:", url);

      const response = await axios.get(url, {
        headers: authHeaders(),
      });

      console.log("Household Income Member response", response.data);

      if (response.data && response.data.chart) {
        setHouseholdIncomeMemberData(response.data);
      } else {
        console.warn("No chart data in response:", response.data);
        setHouseholdIncomeMemberData({ chart: { series: [], labels: [] } });
      }
    } catch (error) {
      console.log("Error in household income member chart:", error);
      setHouseholdIncomeMemberData({ chart: { series: [], labels: [] } });
    }
  };

  const getGuardRailsChartData = async () => {
    console.log("🔄 CALLING getGuardRailsChartData API");

    try {
      const params = new URLSearchParams({
        lender_name: formState.member,
        quarter: formState.quarter,
        entity: formState.entity || "Universe",
        filter_type: formState.type || "Volume",
      });

      const url = `${BaseUrl}${beachuinverse}?${params.toString()}`;
      const response = await axios.get(url, { headers: authHeaders() });

      if (response.data && response.data.chart) {
        const dataWithColors = applyChartColors(response.data, "universeChart");
        setGuardRailsChartData(dataWithColors);
      } else {
        setGuardRailsChartData({ chart: { series: [], labels: [] } });
      }
    } catch (error) {
      console.log("❌ Error:", error);
      setGuardRailsChartData({ chart: { series: [], labels: [] } });
    }
  };

  const getGuardRailsMemberData = async () => {
    console.log("🔄 CALLING getGuardRailsMemberData API");

    if (!formState.member || !formState.quarter) {
      console.log("❌ Missing required fields");
      setGuardRailsMemberData(null);
      return;
    }

    try {
      const params = new URLSearchParams({
        lender_name: formState.member,
        quarter: formState.quarter,
        entity: formState.entity || "universe",
        filter_type: formState.type || "Volume",
      });

      const url = `${BaseUrl}/${beachmemeber}?${params.toString()}`;
      const response = await axios.get(url, { headers: authHeaders() });

      if (response.data && response.data.chart) {
        const dataWithColors = applyChartColors(response.data, "memberChart");
        setGuardRailsMemberData(dataWithColors);
      } else {
        setGuardRailsMemberData({ chart: { series: [], labels: [] } });
      }
    } catch (error) {
      console.log("❌ Error:", error);
      setGuardRailsMemberData({ chart: { series: [], labels: [] } });
    }
  };

  const getGuardRailsIndustryAnalysisData = async () => {
    try {
      const params = new URLSearchParams({
        lender_name: formState.member,
        quarter: formState.quarter,
        entity: formState.entity || "Universe",
        filter_type: formState.type || "Volume",
      });

      const url = `${BaseUrl}${gauardrillapiuniverse}?${params.toString()}`;

      const response = await axios.get(url, {
        headers: authHeaders(),
      });

      console.log("Guardrails Industry Analysis API Response:", response.data);

      if (response.data) {
        console.log("Setting guardRailsIndustryAnalysisData with data");
        setGuardRailsIndustryAnalysisData(response.data);
      } else {
        console.warn("No data in response:", response.data);
        setGuardRailsIndustryAnalysisData({ chart_data: [] });
      }
    } catch (error) {
      console.log("Error in guardrails industry analysis:", error);
      if (error.response && error.response.data) {
        console.log("Error response:", error.response.data);
      }
      setGuardRailsIndustryAnalysisData({ chart_data: [] });
    }
  };

  const getEmployeeBureauData = async () => {
    // member levels monthly submission
    await axios
      .get(
        `${BaseUrl}/api/auth/dateSubmissionMemberLevelNew?short_name=${formState.member}&month=${formState.toMonth}&entity=${ebentity}`,
        {
          headers: authHeaders(),
        }
      )
      .then((response) => {
        console.log("resp dateSubmissionMemberLevelNew", response);
        setEbMemberMonthlySubmission(response.data.EbMemberLevelNewdata);
        setEbIndustryMonthlySubmission(response.data.EbIndustryLevelNewdata);
      })
      .catch((error) => {
        console.log("err", error);
      });

    // industry kyc fill rate and monthly total enquiry and hit volume
    await axios
      .get(
        `${BaseUrl}/api/auth/getKycFillRatesIndustry?short_name=${formState.member}&month=${formState.toMonth}`,
        {
          headers: authHeaders(),
        }
      )
      .then((response) => {
        setEbKycIndustryGraph(response.data.chart);
      })
      .catch((error) => {
        console.log("err", error);
      });

    // member kyc fill rate and monthly total enquiry and hit volume
    await axios
      .get(
        `${BaseUrl}/api/auth/getKycFillRatesMember?short_name=${formState.member}&month=${formState.toMonth}`,
        {
          headers: authHeaders(),
        }
      )
      .then((response) => {
        console.log("resp in getkyc mg", response);
        setEbKycMemberGraph(response.data.chart);
      })
      .catch((error) => {
        console.log("err", error);
      });

    //  get Monthly Enquiries Hit Volumes Member
    await axios
      .get(
        `${BaseUrl}/api/auth/getMonthlyEnquiriesHitVolumesMember?short_name=${formState.member}&month=${formState.toMonth}`,
        {
          headers: authHeaders(),
        }
      )
      .then((response) => {
        setEbMemberInquiryGData(response.data.chart);
      })
      .catch((error) => {
        console.log("err", error);
      });

    // get Monthly Enquiries Hit Volumes Industry
    await axios
      .get(
        `${BaseUrl}/api/auth/getMonthlyEnquiriesHitVolumesIndustry?short_name=${formState.member}&month=${formState.toMonth}`,
        {
          headers: authHeaders(),
        }
      )
      .then((response) => {
        setEbIndustryInquiryGData(response.data.chart);
      })
      .catch((error) => {
        console.log("err", error);
      });

    // sro-get-eb-member-graph-data-new
    await axios
      .get(
        `${BaseUrl}/api/auth/sro-get-eb-member-graph-data-new?short_name=${formState.member}&month=${formState.toMonth}`,
        {
          headers: authHeaders(),
        }
      )
      .then((response) => {
        setEBCategoryMemberGData(response.data.chart);
      })
      .catch((error) => {
        console.log("err", error);
      });

    //sro-get-eb-indusry-graph-data-new
    await axios
      .get(
        `${BaseUrl}/api/auth/sro-get-eb-indusry-graph-data-new?short_name=${formState.member}&month=${formState.toMonth}`,
        {
          headers: authHeaders(),
        }
      )
      .then((response) => {
        setEBCategoryIndustryGData(response.data.chart);
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

  const getUniqueEntity = async () => {
    try {
      const resp = await axios.get(`${BaseUrl}/api/auth/getUniqueEntities`);
      console.log("unique entity", resp.data.data);
      setEbUniqueEntity(resp.data.data);
      setFormState((prevState) => ({
        ...prevState,
        ["maxDate"]: resp.data.date_range.max_date,
        ["minDate"]: resp.data.date_range.min_date,
      }));
    } catch (err) {
      console.log("error in getting unique entity", err);
    }
  };

  const getCBEntity = async () => {
    try {
      // Fetch Entities API
      const entityResp = await axios.get(`${BaseUrl}/${cbEnititylist}`);
      console.log("entityResp", entityResp);
      let entitiesData = [];

      if (
        entityResp &&
        entityResp.data &&
        entityResp.data.data &&
        Array.isArray(entityResp.data.data.entities)
      ) {
        entitiesData = entityResp.data.data.entities;
      }

      setCBDropdown((prev) => ({
        ...prev,
        entities: entitiesData,
        isLoader: false,
      }));

    } catch (err) {
      console.log("error in getting cb entity", err.response);
    }
  }

  const getCreditBureauData = async () => {
    try {
      const member = cbDropdown.selectedMember;
      const entity = cbDropdown.selectedEntity;
      const month = cbDropdown.selectedMonth;

      console.log("cbDropdown", cbDropdown);

      // Industry Level
      const industryRes = await axios.get(
        `${BaseUrl}/api/auth/industryTable2Metrics?month=${month}&entity=${entity}`,
        { headers: authHeaders() }
      );
      console.log("industryRes", industryRes);

      const ind = industryRes.data;

      setIndustryRecords({
        months: ind && ind.months ? ind.months : [],
        data: ind && ind.data ? ind.data : {}
      });

      // Member Level
      const memberRes = await axios.get(
        `${BaseUrl}/api/auth/table1?month=${month}&short_name=${member}`,
        { headers: authHeaders() }
      );
      console.log("memberRes", memberRes);

      const mem = memberRes.data;

      setMemberRecords({
        months: mem && mem.months ? mem.months : [],
        data: mem && mem.data ? mem.data : {}
      });

      // ⭐ NEW — Graph API
      const graphRes = await axios.get(
        `${BaseUrl}/api/auth/table1graph1KycVidFillRate?month=${month}&short_name=${member}`,
        { headers: authHeaders() }
      );

      const graphData = graphRes.data;

      setVidKycGraph({
        months:
          graphData &&
            graphData.graph1_data &&
            Array.isArray(graphData.graph1_data)
            ? graphData.graph1_data.map((x) => x.Month || "")
            : [],
        data:
          graphData &&
            graphData.graph1_data &&
            Array.isArray(graphData.graph1_data)
            ? graphData.graph1_data
            : []
      });

      //vid kyc industry graph
      const kycIndustryGraph = await axios.get(
        `${BaseUrl}/api/auth/table1graph2KycVidFillRateIndustry?month=${month}&entity=${entity}`,
        { headers: authHeaders() }
      );

      // transform here (same logic as before)
      const apiData = kycIndustryGraph.data;

      let transformedIndustryGraph = [];

      if (apiData.graph2_data && Array.isArray(apiData.graph2_data)) {
        transformedIndustryGraph = apiData.graph2_data
          .map((item) => {
            if (
              !item.Month ||
              item.KYC_Fill_Rate === undefined ||
              item.VID_Fill_Rate === undefined
            ) {
              return null;
            }

            return {
              month: item.Month,
              kycFillRate: parseFloat(item.KYC_Fill_Rate.replace("%", "")),
              vidFillRate: parseFloat(item.VID_Fill_Rate.replace("%", "")),
            };
          })
          .filter((d) => d !== null);
      }

      setIndustryGraphData(transformedIndustryGraph);

      // ---- DATA SUBMISSION GRAPH MEMBER ----
      axios
        .get(
          `${BaseUrl}/api/auth/getGraph3Data?month=${month}&short_name=${member}`,
          { headers: authHeaders() }
        )
        .then((res) => {
          const api = res.data;

          // Directly save correct response structure
          console.log("api data", api);
          setCBDataAcceptanceMember({
            months: api.months || [],
            data: api.graph3_data || [],
            member: api.short_name || ""
          });
        })
        .catch((err) => {
          console.log("Error loading graph3 data", err.response);
          setCBDataAcceptanceMember({ months: [], data: [] });
        });
      // ---- DATA SUBMISSION GRAPH INDUSTRY ----
      axios
        .get(
          `${BaseUrl}/api/auth/getGraph4Data?month=${month}&entity=${entity}`,
          { headers: authHeaders() }
        )
        .then((res) => {
          const api = res.data;

          // Directly save correct response structure
          console.log("api data", api);
          setCBDataAcceptanceIndustry({
            months: api.months || [],
            data: api.graph4_data || [],
            member: api.short_name || ""
          });
        })
        .catch((err) => {
          console.log("Error loading graph4 data", err.response);
          setCBDataAcceptanceIndustry({ months: [], data: [] });
        });

    } catch (err) {
      console.log("Error in CB table data getting", err.response);
    }
  };




  const getRBIQuarterlyData = async () => {

    try {
      const response = await axios.get(
        `${BaseUrl}/${rbiQuarterlyDataApi}?fy_year=${encodeURIComponent(
          rbiDropdown.selectedFY
        )}&quarter=${encodeURIComponent(rbiDropdown.selectedQuarter)}`,
        {
          headers: authHeaders(),
        }
      );
      setRbiQuarterlyReportData(response.data);
      console.log("sro-rbi-data", response);
    } catch (error) {
      console.log("rbi quarterly error", error);
    }
  };

  const filterRBIReportHandler = async () => {
    setFormState((prevState) => ({
      ...prevState,
      ["isLoader"]: true,
      ["isDisabled"]: true,
    }));

    await getRBIQuarterlyData();

    setFormState((prevState) => ({
      ...prevState,
      ["isLoader"]: false,
      ["isDisabled"]: false,
    }));
  };

  // sbi rbi report end here

  // RBI-Others start here
  const getRBIOthersData = async () => {
    await axios
      .get(`${BaseUrl}/api/auth/getQuarterlyYOYReport`, {
        headers: authHeaders(),
      })
      .then((response) => {
        setRBIOthersData(parse(response.data.table));
        console.log("rbi_others_data", response);
      })
      .catch((error) => {
        console.log("rbi_others_error", error);
        // setRBIOthersData(error.response.data.message)
      });

    //cost of borrowing graph api
    await axios
      .get(
        `${BaseUrl}/api/auth/financial-data?short_name=${formState.member}&Month_As_on=${formState.Quatar}`,
        { headers: authHeaders() }
      )
      .then((response) => {
        setRbiOthersCOB(response.data);
        console.log("others_cob_data", response);
      })
      .catch((error) => {
        console.log("rbi_others_error", error);
      });

    //portfolio quality  graph api
    await axios
      .get(
        `${BaseUrl}/api/auth/par-data?short_name=${formState.member}&Month_As_on=${formState.Quatar}`,
        { headers: authHeaders() }
      )
      .then((response) => {
        setRbiOthersPQ(response.data);
        console.log("others_PQ", response);
      })
      .catch((error) => {
        console.log("rbi_others_error", error);
      });
  };
  //RBI-Others end here

  const handleToDateChange = (date) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM"); // 👈 gives "2024-02"
      console.log("date in filter", formattedDate);
      setFormState((prev) => ({
        ...prev,
        toMonth: formattedDate,
      }));
    }
  };

  //date change for sro - cb
  const cbhandleToDateChange = (date) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM"); // 👈 gives "2024-02"
      console.log("date in filter", formattedDate);
      setCBDropdown((prev) => ({
        ...prev,
        selectedMonth: formattedDate,
      }));
    }
  };

  const onValueChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const filterCBHandler = async () => {
    setFormState((prevState) => ({
      ...prevState,
      ["isLoader"]: true,
      ["isDisabled"]: true,
    }));
    await getCreditBureauData();
    setFormState((prevState) => ({
      ...prevState,
      ["isLoader"]: false,
      ["isDisabled"]: false,
    }));
  };

  const filterEBHandler = async () => {
    setFormState((prevState) => ({
      ...prevState,
      ["isLoader"]: true,
      ["isDisabled"]: true,
    }));
    await getUniqueEntity();
    await getEmployeeBureauData();
    setFormState((prevState) => ({
      ...prevState,
      ["isLoader"]: false,
      ["isDisabled"]: false,
    }));
  };

  const filterQARHandler = async () => {
    // Prevent multiple simultaneous calls
    if (formState.isLoader) {
      console.log("🔄 Filter already in progress, skipping...");
      return;
    }

    setFormState((prevState) => ({
      ...prevState,
      isLoader: true,
      isDisabled: true,
    }));

    console.log("🔄 FILTER QAR HANDLER CALLED");
    console.log("Filter:", {
      member: formState.member,
      quarter: formState.quarter,
      entity: formState.entity,
      type: formState.type,
    });

    try {
      // Reset previous data
      setHouseholdIncomeData(null);
      setHouseholdIncomeMemberData(null);
      setGuardRailsChartData(null);
      setGuardRailsMemberData(null);
      setGuardRailsIndustryAnalysisData(null); // Add this line

      // Use sequential calls instead of Promise.all to reduce memory pressure
      await getQARData();
      await getQARBucketMeetingData();
      await getQARStatucAcQarterData();
      await getGuardRailsData();
      await getHouseholdIncomeData();
      await getHouseholdIncomeMemberData();
      await getGuardRailsChartData();
      await getGuardRailsMemberData();
      await getGuardRailsIndustryAnalysisData();
    } catch (error) {
      console.error("❌ Error in filterQARHandler:", error);
      alert("Error loading data. Please try again.");
    } finally {
      setFormState((prevState) => ({
        ...prevState,
        isLoader: false,
        isDisabled: false,
      }));
    }
  };

  // const filterCGRMHandler = async () => {
  //   setFormState((prevState) => ({
  //     ...prevState,
  //     ["isLoader"]: true,
  //     ["isDisabled"]: true,
  //   }));
  //   await getCGRMData();
  //   setFormState((prevState) => ({
  //     ...prevState,
  //     ["isLoader"]: false,
  //     ["isDisabled"]: false,
  //   }));
  // };

  const filterCGRMHandler = async () => {
    console.log("🔍 Filter clicked!");
    console.log("📋 Selected Member:", cgrmDropdown.selectedMember);
    console.log("📋 Selected Quarter:", cgrmDropdown.selectedQuarter);

    setFormState((prevState) => ({
      ...prevState,
      isLoader: true,
      isDisabled: true,
    }));

    // ✅ Pass selected values
    await getCGRMData(
      cgrmDropdown.selectedMember,
      cgrmDropdown.selectedQuarter
    );

    setFormState((prevState) => ({
      ...prevState,
      isLoader: false,
      isDisabled: false,
    }));
  };
  const filterRBIOthersHandler = async () => {
    setFormState((prevState) => ({
      ...prevState,
      ["isLoader"]: true,
      ["isDisabled"]: true,
    }));
    await getRBIOthersData();
    setFormState((prevState) => ({
      ...prevState,
      ["isLoader"]: false,
      ["isDisabled"]: false,
    }));
  };

  const getCbLatestMonthYear = async () => {
    setFormState((prevState) => ({
      ...prevState,
      ["isLoader"]: true,
      ["isDisabled"]: true,
    }));
    await axios
      .get(`${BaseUrl}/api/auth/sro-get-cb-latest-month-year-mfi`, {
        headers: authHeaders(),
      })
      .then((response) => {
        const startMonth = response.data.data.startMonth;
        const endMonth = response.data.data.endMonth;
        setMembers(response.data.data.members);
        setStartMonth(startMonth);
        setFormState((prevState) => ({
          ...prevState,
          // ["toMonth"]: new Date(endMonth),
          ["member"]: response.data.data.lastMfi,
          ["isLoader"]: false,
          ["isDisabled"]: false,
        }));
      })
      .catch((error) => {
        console.log("err", error);
        setFormState({
          ...formState,
          ["isLoader"]: false,
          ["isDisabled"]: false,
        });
      });
  };

  const getQARLatestMonthYear = async () => {
    setFormState((prevState) => ({
      ...prevState,
      ["isLoader"]: true,
      ["isDisabled"]: true,
    }));
    await axios
      .get(`${BaseUrl}/api/auth/sro-get-qar-latest-month-year`, {
        headers: authHeaders(),
      })
      .then((response) => {
        const startMonth = response.data.data.startMonth;
        const endMonth = response.data.data.endMonth;
        setMembers(response.data.data.members);
        setStartMonth(startMonth);
        setFormState((prevState) => ({
          ...prevState,
          // ["toMonth"]: new Date(endMonth),
          ["member"]: response.data.data.lastMfi,
          ["isLoader"]: false,
          ["isDisabled"]: false,
        }));
      })
      .catch((error) => {
        console.log("err", error);
        setFormState({
          ...formState,
          ["isLoader"]: false,
          ["isDisabled"]: false,
        });
      });
  };

  const getQuatarList = async () => {
    const api = "api/auth/mm-quater-list";
    await axios
      .get(`${BaseUrl}/${api}`, { headers: authHeaders() })
      .then((response) => {
        setQuatarList(response.data.data);
        setGraphFilter({ ...graphFilter, ["Quatar"]: response.data.maxDate });
        setGraphFilter({ ...graphFilter, ["Period"]: response.data.maxperiod });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getEbLatestMonthYear = async () => {
    setFormState((prevState) => ({
      ...prevState,
      ["isLoader"]: true,
      ["isDisabled"]: true,
    }));
    await axios
      .get(`${BaseUrl}/api/auth/sro-get-eb-latest-month-year`, {
        headers: authHeaders(),
      })
      .then((response) => {
        console.log("resp in sro-eb-member", response);
        const startMonth = response.data.data.startMonth;
        const endMonth = response.data.data.endMonth;
        setMembers(response.data.data.members);
        setStartMonth(startMonth);
        setFormState((prevState) => ({
          ...prevState,
          // ["toMonth"]: new Date(endMonth),
          ["member"]: response.data.data.lastMfi,
          ["isLoader"]: false,
          ["isDisabled"]: false,
        }));
      })
      .catch((error) => {
        console.log("err eb", error);
        setFormState({
          ...formState,
          ["isLoader"]: false,
          ["isDisabled"]: false,
        });
      });
  };

  const getQARDropdownData = async () => {
    try {
      const resp = await axios.get(`${BaseUrl}/${qarDropdownDataApi}`);
      if (resp) {
        setQarMember(resp.data.member);
        setQarEntity(resp.data.entity);
        setQarType(resp.data.type);
        setQarQuarter(resp.data.quarter);
        if (memberOrIndustry === "Industry") {
          setFormState((prev) => ({ ...prev, entity: "universe" }));
        }
        console.log("resp in qar dropdown", resp.data);
      }
    } catch (err) {
      console.log("error in getting qar dropdown data", err.response);
    }
  };

  const getRBIReportDropdownData = async (fy_year) => {
    try {
      setRbiDropdown(function (prev) {
        return { ...prev };
      });

      // 🔹 Decide API URL based on whether FY is passed
      let apiUrl = "";
      if (fy_year && fy_year !== "") {
        apiUrl = `${BaseUrl}/${rbiReportDropDownDataApi}?fy_year=${fy_year}`;
      } else {
        apiUrl = `${BaseUrl}/${rbiReportDropDownDataApi}`;
      }

      const resp = await axios.get(apiUrl);
      console.log("resp in rbi report dropdown", resp);

      if (
        resp &&
        resp.data &&
        resp.data.data &&
        Array.isArray(resp.data.data.fy_years)
      ) {
        var fy_years = resp.data.data.fy_years;
        var quarters = resp.data.data.quarters;
        var selected_fy = resp.data.data.selected_fy;

        setRbiDropdown({
          fyYears: fy_years ? fy_years : [],
          quarters: quarters ? quarters : [],
          selectedFY:
            selected_fy && selected_fy !== ""
              ? selected_fy
              : fy_years.length > 0
                ? fy_years[0]
                : "",
          selectedQuarter: quarters && quarters.length > 0 ? quarters[0] : "",
          isLoader: false,
        });
      } else {
        setRbiDropdown(function (prev) {
          return { ...prev, isLoader: false };
        });
      }
    } catch (err) {
      console.log("error in getting rbi report dropdown data", err);
      setRbiDropdown(function (prev) {
        return { ...prev, isLoader: false };
      });
    }
  };

  // 🔹 Handlers
  const handleFYChange = function (value) {
    setRbiDropdown(function (prev) {
      return { ...prev, selectedFY: value };
    });

    // 🔹 Call API again with the selected FY
    getRBIReportDropdownData(value);
  };

  const handleQuarterChange = function (value) {
    setRbiDropdown(function (prev) {
      return { ...prev, selectedQuarter: value };
    });
  };

  const getCBDropdownData = async () => {
    try {
      setCBDropdown(function (prev) {
        return { ...prev, isLoader: true };
      });

      // Fetch Members API
      const memberResp = await axios.get(`${BaseUrl}/${cbMemberlist}`);
      console.log("memberResp", memberResp);
      let membersData = [];
      let startMonth = null;
      let endMonth = null;

      if (
        memberResp &&
        memberResp.data &&
        memberResp.data.data &&
        Array.isArray(memberResp.data.data.members)
      ) {
        membersData = memberResp.data.data.members;
        startMonth = memberResp.data.data.startMonth;
        endMonth = memberResp.data.data.endMonth;
      }

      // Fetch Entities API
      // const entityResp = await axios.get(`${BaseUrl}/${cbEnititylist}`);
      // console.log("entityResp", entityResp);
      // let entitiesData = [];

      // if (
      //   entityResp &&
      //   entityResp.data &&
      //   entityResp.data.data &&
      //   Array.isArray(entityResp.data.data.entities)
      // ) {
      //   entitiesData = entityResp.data.data.entities;
      // }

      setCBDropdown((prev) => ({
        ...prev,
        members: membersData,
        startMonth: startMonth,
        endMonth: endMonth,
        selectedMember: "",
        selectedMonth: endMonth ? endMonth : null,
        isLoader: false,
      }));

    } catch (err) {
      console.log("Error fetching CB dropdown data", err);
      setCBDropdown(function (prev) {
        return { ...prev, isLoader: false };
      });
    }
  };



  // useEffect(() => {
  //   console.log("value", startMonth, value);
  //   if (value == 1) {
  //     getCbLatestMonthYear();
  //   }
  //   if (value == 2) {
  //     getEbLatestMonthYear();
  //   }
  //   if (value == 3) {
  //     getQARLatestMonthYear();
  //   }
  //   if (value == 4) {
  //     getQARLatestMonthYear();
  //   }
  //   if (value == 5) {
  //     getQARLatestMonthYear();
  //   }
  //   if (value == 6) {
  //     getQARLatestMonthYear();
  //   }
  // }, [value]);

  useEffect(() => {
    console.log("value", startMonth, value);
    if (value == 1) {
      getCbLatestMonthYear();
    }
    if (value == 2) {
      getEbLatestMonthYear();
    }
    if (value == 3) {
      getQARLatestMonthYear();
    }
    if (value == 4) {
      // CGRM ke liye dropdown data fetch karein
      fetchCGRMDropdownData();

    }
    if (value == 5) {
      getQARLatestMonthYear();
    }
    if (value == 6) {
      getQARLatestMonthYear();
    }
  }, [value]);

  useEffect(() => {
    if (startMonth != "" && value == 1) {
      getCBEntity();
      getCreditBureauData();
    }
    if (startMonth != "" && value == 2) {
      getUniqueEntity();
      getEmployeeBureauData();
    }
    if (startMonth != "" && value == 3) {
      getQARData();
      getQARBucketMeetingData();
      getQARStatucAcQarterData();
    }
    if (startMonth != "" && value == 4) {
      getCGRMData();
    }
  }, [startMonth, value]);

  useEffect(() => {
    getQuatarList();
  }, []);

  useEffect(() => {
    getEmployeeBureauData();
  }, [ebentity]);

  useEffect(() => {
    getCreditBureauData();
  }, [cbDropdown.selectedEntity]);

  useEffect(() => {
    getRBIQuarterlyData();
    getRBIOthersData();
    filterRBIReportHandler();
  }, []);

  useEffect(() => {
    getQARDropdownData();
  }, []);

  useEffect(() => {
    getRBIReportDropdownData();
  }, []);

  useEffect(() => {
    getCBDropdownData();
    getCBEntity();
  }, []);


  return (
    <>
      <Box sx={{ flexGrow: 1 }} mt={10}>
        <Breadcrumb title="SRO" icon={GrassIcon} />
        <Grid container spacing={2} mt={2}>
          <Grid xs={12} sm={12} md={12}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange1}
                    aria-label="SRO"
                    centered
                    textColor="secondary"
                    indicatorColor="secondary"
                  >
                    <Tab
                      icon={<AnalyticsIcon />}
                      label="Credit Bureau"
                      value="1"
                    />
                    <Tab
                      icon={<AnalyticsIcon />}
                      label="Employee Bureau"
                      value="2"
                    />
                    <Tab icon={<AnalyticsIcon />} label="QAR" value="3" />
                    <Tab icon={<AnalyticsIcon />} label="CGRM" value="4" />
                    <Tab
                      icon={<AnalyticsIcon />}
                      label="RBI Report"
                      value="5"
                    />
                    <Tab icon={<AnalyticsIcon />} label="Others" value="6" />
                  </TabList>
                </Box>

                {/* Credit Bureau (CB-SRO) Start from Here */}
                <TabPanel value="1">
                  <Grid container spacing={2}>
                    {/* Date Filter Component Start from here */}
                    <Grid xs={12}>
                      <Card>
                        <CardContent>
                          <Grid container spacing={2} alignItems="center">

                            {/* Member */}
                            <Grid item xs={12} sm={4} md={4}>
                              <FormControl variant="standard" fullWidth>
                                <InputLabel>Member</InputLabel>
                                <Select
                                  value={cbDropdown.selectedMember}
                                  onChange={(e) =>
                                    setCBDropdown(function (prev) {
                                      return { ...prev, selectedMember: e.target.value };
                                    })
                                  }
                                >
                                  {cbDropdown.members.map(function (v) {
                                    return (
                                      <MenuItem key={v} value={v}>
                                        {v}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>

                            {/* Entity */}

                            {/* <Grid item xs={12} sm={4} md={3}>
                              <FormControl variant="standard" fullWidth>
                                <InputLabel>Entity</InputLabel>
                                <Select
                                  value={cbDropdown.selectedEntity}
                                  onChange={(e) =>
                                    setCBDropdown(function (prev) {
                                      return { ...prev, selectedEntity: e.target.value };
                                    })
                                  }
                                >
                                  {cbDropdown.entities.map(function (v) {
                                    return (
                                      <MenuItem key={v} value={v}>
                                        {v}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </Grid> */}

                            {/* Month Picker */}
                            <Grid item xs={12} sm={4} md={4}>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                  margin="normal"
                                  variant="standard"
                                  openTo="year"
                                  views={["year", "month"]}
                                  label="Month"
                                  fullWidth
                                  value={cbDropdown.selectedMonth}
                                  onChange={cbhandleToDateChange
                                  }

                                  minDate={
                                    cbDropdown.startMonth
                                      ? new Date(cbDropdown.startMonth)
                                      : new Date("2017-01-01")
                                  }
                                  maxDate={
                                    cbDropdown.endMonth
                                      ? new Date(cbDropdown.endMonth)
                                      : new Date()
                                  }
                                />
                              </MuiPickersUtilsProvider>
                            </Grid>

                            {/* Filter Button */}
                            <Grid item xs={12} sm={12} md={4}>
                              <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 1 }}
                                onClick={filterCBHandler}
                              >
                                Filters
                                <Loader loader={cbDropdown.isLoader} size={15} />
                              </Button>
                            </Grid>

                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>




                    {/* Date Filter Component End here */}

                    {/* Monthly Sbmsn - Dt of month Sub  Start from here */}
                    <Grid xs={12} sm={12} md={12}>
                      <CBMonthlySbmsnTable
                        memberRecords={memberRecords}
                        industryRecords={industryRecords}
                        selectedEntity={cbDropdown.selectedEntity}
                        entityList={cbDropdown.entities}
                        setCBDropdown={setCBDropdown}
                      />
                    </Grid>

                    {/* Monthly Sbmsn - Dt of month Sub  End from here */}

                    {/* Member Level KYC & VID seeding Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <CBVIDKYCSeedingMemberGraph graphData={vidKycGraph} />
                    </Grid>
                    {/* Member Level KYC & VID seeding End from here */}

                    {/* Industry Level KYC & VID seeding Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <CBVIDKYCSeedingIndustryGraph
                        data={industryGraphData}
                      />
                    </Grid>
                    {/* Industry Level KYC & VID seeding End from here */}

                    {/* Member Level : Data Summission & % of data acceptance Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <CBDataAcceptanceSmtbMemberGraph
                        data={cbDataAcceptanceMember}
                      />
                    </Grid>
                    {/* Member Level :  Data Summission & % of data acceptance End from here */}

                    {/* Industry Level :  Data Summission & % of data acceptance Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <CBDataAcceptanceSmtbIndustryGraph
                        data={cbDataAcceptanceIndustry}
                      />
                    </Grid>
                    {/* Industry Level :  Data Summission & % of data acceptance End from here */}
                  </Grid>
                </TabPanel>
                {/* Credit Bureau (CB-SRO)  End from Here */}

                {/* Employee Bureau (EB-SRO) Start from Here */}
                <TabPanel value="2">
                  <Grid container spacing={2}>
                    {/* Date Filter Component Start from here */}
                    <Grid xs={12} sm={12} md={12}>
                      <Card>
                        <CardContent>
                          <Grid container spacing={2} mt={2}>
                            <Grid xs={12} sm={12} md={5}>
                              <FormControl
                                variant="standard"
                                sx={{ m: 2, minWidth: 315 }}
                              >
                                <InputLabel id="demo-simple-select-standard-label">
                                  Member
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-standard-label"
                                  id="demo-simple-select-standard"
                                  label="Select Member"
                                  name="member"
                                  value={formState.member}
                                  onChange={(e) => onValueChange(e)}
                                >
                                  {members.map((v) => {
                                    return <MenuItem value={v}>{v}</MenuItem>;
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <Grid xs={12} sm={12} md={5}>
                                <DatePicker
                                  margin="normal"
                                  variant="standard"
                                  openTo="year"
                                  views={["year", "month"]}
                                  label="Month"
                                  fullWidth
                                  value={
                                    formState.toMonth
                                      ? new Date(formState.toMonth + "-01")
                                      : null
                                  }
                                  onChange={handleToDateChange}
                                  minDate={new Date(formState.minDate + "-01")}
                                  maxDate={new Date(formState.maxDate + "-01")}
                                />
                              </Grid>
                            </MuiPickersUtilsProvider>
                            <Grid xs={12} sm={12} md={2}>
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                style={{
                                  backgroundColor: "#058283 !important",
                                }}
                                sx={{ mt: 3, mb: 2 }}
                                disabled={formState.isDisabled}
                                onClick={filterEBHandler}
                              >
                                Filter
                                <Loader loader={formState.isLoader} size={15} />
                              </Button>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    {/* Date Filter Component End here */}

                    {/* Date of submission */}

                    <EBDateofSubmissionTable
                      ebMemberMonthlySubmission={ebMemberMonthlySubmission}
                      ebIndustryMonthlySubmission={ebIndustryMonthlySubmission}
                      ebUniqueEntity={ebUniqueEntity}
                      ebentity={ebentity}
                      setEbEntity={setEbEntity}
                    />
                    {/* Date of submission */}

                    {/* Member Level KYC fill rate overall & KYC fill rate reporting month Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <EBOverallKYCMemberGraph
                        ebKycMemberGraph={ebKycMemberGraph}
                      />
                    </Grid>
                    {/* Member Level KYC fill rate overall & KYC fill rate reporting month End from here */}

                    {/* Industry Level KYC fill rate overall & KYC fill rate reporting month Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <EBOverallKYCIndustryGraph
                        ebKycIndustryGraph={ebKycIndustryGraph}
                      // ebIOverKycMember={ebIOverKycMember}
                      // ebIndustryLabels={ebIndustryLabels}
                      />
                    </Grid>
                    {/* Industry Level KYC fill rate overall & KYC fill rate reporting month End from here */}

                    {/* Member Level Monthly Total Enquiries and hit volume Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <EBMonthlyEnquirynhitMemberGp
                        ebMemberInquiryGData={ebMemberInquiryGData}
                      // ebMInquiryHitSeries={ebMInquiryHitSeries}
                      // ebMemberLabels={ebMemberLabels}
                      />
                    </Grid>
                    {/* Member Level Monthly Total Enquiries and hit volume End from here */}

                    {/* Industry Level Monthly Total Enquiries and hit volume Start from here */}

                    <Grid xs={12} sm={12} md={6}>
                      <EBMonthlyEnquirynhitIndustryGp
                        ebIndustryInquiryGData={ebIndustryInquiryGData}
                      // ebIInquiryHitSeries={ebIInquiryHitSeries}
                      // ebIndustryLabels={ebIndustryLabels}
                      />
                    </Grid>
                    {/* Industry Level Monthly Total Enquiries and hit volume End from here */}

                    <Grid xs={12} sm={12} md={6}>
                      <EBCategoryGpMember
                        // ebcategaryMemberSeries={ebcategaryMemberSeries}
                        ebCategoryMemberGData={ebCategoryMemberGData}
                      />
                    </Grid>
                    {/* Industry Level Monthly Total Enquiries and hit volume End from here */}

                    <Grid xs={12} sm={12} md={6}>
                      <EBCategoryIndustryGp
                        // categoryIndustrySeries={categoryIndustrySeries}
                        ebCategoryIndustryGData={ebCategoryIndustryGData}
                      />
                    </Grid>
                    {/* Industry Level Monthly Total Enquiries and hit volume End from here */}
                  </Grid>
                </TabPanel>

                {/* Employee Bureau (EB-SRO)  End from Here */}

                {/* QAR-SRO Start from Here */}
                <TabPanel value="3">
                  <Grid container spacing={2}>
                    {/* Date Filter Component Start from here */}
                    <Grid xs={12}>
                      <Card sx={{ p: 1, boxShadow: 2 }}>
                        <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
                          <Grid container spacing={1}>
                            {/* Industry/Member */}
                            <Grid xs={12} sm={6} md={4}>
                              <FormControl
                                variant="standard"
                                sx={{ m: 0.5, minWidth: 250 }}
                              >
                                <InputLabel>Industry / Member</InputLabel>
                                <Select
                                  name="memberOrIndustry"
                                  value={memberOrIndustry || ""}
                                  onChange={(e) => setMemberOrIndustry(e.target.value)}
                                  style={{ textAlign: "left" }}
                                >

                                  <MenuItem value="Member">Member</MenuItem>
                                  <MenuItem value="Industry">Industry</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>

                            {/* Member */}
                            {memberOrIndustry === "Member" && (
                              <Grid xs={12} sm={6} md={4}>
                                <FormControl
                                  variant="standard"
                                  sx={{ m: 0.5, minWidth: 250 }}
                                >
                                  <InputLabel>Member</InputLabel>
                                  <Select
                                    name="member"
                                    value={formState.member || ""}
                                    onChange={onValueChange}
                                  >
                                    {qarMember.map((v) => (
                                      <MenuItem key={v} value={v}>
                                        {v}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            )}

                            {/* Type */}
                            <Grid xs={12} sm={6} md={4}>
                              <FormControl
                                variant="standard"
                                sx={{ m: 0.5, minWidth: 250 }}
                              >
                                <InputLabel>Type</InputLabel>
                                <Select
                                  name="type"
                                  value={formState.type || ""}
                                  onChange={onValueChange}
                                >
                                  {Object.keys(qarType).map((key) => (
                                    <MenuItem key={key} value={qarType[key]}>
                                      {key}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>

                            {/* Entity */}
                            <Grid xs={12} sm={6} md={4}>
                              <FormControl
                                variant="standard"
                                sx={{ m: 0.5, minWidth: 250 }}
                              >
                                <InputLabel>Entity</InputLabel>
                                <Select
                                  name="entity"
                                  value={formState.entity || ""}
                                  onChange={onValueChange}
                                >
                                  {qarEntity.map((v) => (
                                    <MenuItem key={v} value={v}>
                                      {v}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>

                            {/* Quarter */}
                            <Grid xs={12} sm={6} md={4}>
                              <FormControl
                                variant="standard"
                                sx={{ m: 0.5, minWidth: 250 }}
                              >
                                <InputLabel>Quarter</InputLabel>
                                <Select
                                  name="quarter"
                                  value={formState.quarter || ""}
                                  onChange={onValueChange}
                                >
                                  {qarQuarter.map((v) => (
                                    <MenuItem key={v} value={v}>
                                      {v}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>

                            {/* Filter Button */}


                            <Grid
                              xs={12}
                              sm={6}
                              md={4}
                              sx={{ display: "flex", alignItems: "end" }}
                            >
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="small"
                                sx={{ py: 0.6 }}  // padding thoda kam
                                disabled={formState.isDisabled}
                                onClick={filterQARHandler}
                              >
                                Filter
                                <Loader loader={formState.isLoader} size={13} />
                              </Button>
                            </Grid>

                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    {/* Date Filter Component End here */}

                    {/* Date of monthly submission to CICs */}

                    {/* <QARMonthlySbmsnCICTable /> */}

                    <QARMonthlySbmsnCICTable
                      QARParametersRecords={QARParametersRecords}
                      memberOrIndustry={memberOrIndustry} // Yeh line add karo
                    />

                    {memberOrIndustry === "Member" && (
                      <Grid xs={12} sm={12} md={6}>
                        <QARBarChart guardRailsData={guardRailsRecords} />
                      </Grid>
                    )}

                    <Grid
                      xs={12}
                      sm={12}
                      md={memberOrIndustry === "Industry" ? 12 : 6}
                    >
                      <QARBarCharttwo
                        chartData={guardRailsIndustryAnalysisData}
                      />
                    </Grid>

                    {memberOrIndustry === "Member" && (
                      <Grid xs={12} sm={12} md={6}>
                        <QARBarChartthree chartData={guardRailsMemberData} />
                      </Grid>
                    )}

                    <Grid
                      xs={12}
                      sm={12}
                      md={memberOrIndustry === "Industry" ? 12 : 6}
                    >
                      <QARBarChartfour chartData={guardRailsChartData} />
                    </Grid>

                    {memberOrIndustry === "Member" && (
                      <Grid xs={12} sm={12} md={6}>
                        <QARBarChartfive
                          chartData={householdIncomeMemberData}
                        />
                      </Grid>
                    )}

                    <Grid
                      xs={12}
                      sm={12}
                      md={memberOrIndustry === "Industry" ? 12 : 6}
                    >
                      <QARBarChartSix chartData={householdIncomeData} />
                    </Grid>

                    {/* Date of monthly submission to CICs */}
                  </Grid>
                </TabPanel>
                {/* QAR-SRO  End from Here */}
                <TabPanel value="4">
                  <Grid container spacing={2}>
                    {/* Date Filter Component Start from here */}
                    <Grid xs={12} sm={12} md={12}>
                      <Card>
                        <CardContent>
                          <Grid container spacing={2} alignItems="center" mt={2}>
                            {/* Lender Name Dropdown */}
                            <Grid xs={12} sm={12} md={5}>
                              <FormControl
                                variant="standard"
                                sx={{ minWidth: "100%" }}
                              >
                                <InputLabel id="lender-name-label">
                                  Member                                </InputLabel>
                                <Select
                                  labelId="lender-name-label"
                                  id="lender-name-select"
                                  label="Member"
                                  name="member"
                                  value={cgrmDropdown.selectedMember}
                                  // onChange={(e) => onValueChange(e)}
                                  onChange={(e) =>
                                    setCGRMDropdown(function (prev) {
                                      return { ...prev, selectedMember: e.target.value };
                                    })
                                  }
                                >
                                  {cgrmDropdown.members.map((v, index) => {
                                    return (
                                      <MenuItem key={index} value={v}>
                                        {v}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>

                            {/* Quarter Dropdown */}
                            <Grid xs={12} sm={12} md={5}>
                              <FormControl
                                variant="standard"
                                sx={{ minWidth: "100%" }}
                              >
                                <InputLabel id="quarter-label">
                                  Choose Quarter
                                </InputLabel>
                                <Select
                                  labelId="quarter-label"
                                  id="quarter-select"
                                  name="Qautar"
                                  value={cgrmDropdown.selectedQuarter}
                                  onChange={(e) =>
                                    setCGRMDropdown(function (prev) {
                                      return { ...prev, selectedQuarter: e.target.value };
                                    })
                                  }
                                  label="Choose Quarter"
                                >
                                  {cgrmDropdown.quarters.map((q, index) => {
                                    return (
                                      <MenuItem key={index} value={q}>
                                        {q}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>

                            {/* Filter Button */}
                            <Grid xs={12} sm={12} md={2}>
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                  mt: 1,
                                  mb: 1,

                                }}
                                disabled={formState.isDisabled}
                                onClick={filterCGRMHandler}
                              >
                                Filters
                                <Loader loader={formState.isLoader} size={15} />
                              </Button>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    {/* Date Filter Component End here */}

                    {/* Rest of your CGRM components - unchanged */}
                    <Grid xs={12} sm={12} md={12}>
                      <Card
                        style={{ paddingBottom: "20px", marginBottom: "20px" }}
                      >
                        <CardActionArea>
                          <CardContent>
                            <ReportTable table1cgrm={table1cgrm} />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>

                    <Grid xs={6} sm={6} md={6}>
                      <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
                        <CardActionArea>
                          <CardContent>
                            <NatureofCall
                              chartData={graph1cgrm && graph1cgrm.chart1 ? graph1cgrm.chart1 : []}
                              memberName={graph1cgrm && graph1cgrm.member ? graph1cgrm.member : ""}
                            />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>

                    <Grid xs={6} sm={6} md={6}>
                      <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
                        <CardActionArea>
                          <CardContent>
                            <ProductWiseCall data={graph2cgrm} />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>

                    {/* <Grid xs={6} sm={6} md={6}>
                      <Card
                        style={{ paddingBottom: "20px", marginBottom: "20px" }}
                      >
                        <CardActionArea>
                          <CardContent>
                            <CategoryWiseComplaintsMember data={productWiseCallData} />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid> */}
                    <Grid xs={6} sm={6} md={6}>
                      <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
                        <CardActionArea>
                          <CardContent>
                            <CategoryWiseComplaintsMember data={graph3cgrm} />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>

                    {/* Industry Chart */}
                    <Grid xs={6} sm={6} md={6}>
                      <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
                        <CardActionArea>
                          <CardContent>
                            <CategoryWiseComplaintsIndustry data={graph4cgrm} />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>

                    <Grid xs={6} sm={6} md={6}>
                      <Card
                        style={{ paddingBottom: "20px", marginBottom: "20px" }}
                      >
                        <CardActionArea>
                          <CardContent>
                            <CategoryWiseComplaint data={graph5cgrm} />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>

                    <Grid xs={6} sm={6} md={6}>
                      <Card
                        style={{ paddingBottom: "20px", marginBottom: "20px" }}
                      >
                        <CardActionArea>
                          <CardContent>
                            <CategoryWiseQuery data={graph6cgrm} />                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>

                    <Grid xs={12} sm={12} md={12}>
                      <Card
                        style={{ paddingBottom: "20px", marginBottom: "20px" }}
                      >
                        <CardActionArea>
                          <CardContent>
                            <OriginOfCall data={table3cgrm} />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>

                    <Grid xs={12} sm={12} md={12}>
                      <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
                        <CardActionArea>
                          <CardContent>
                            <OriginOfCallIndustry data={table2cgrm} />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>

                    <Grid xs={6} sm={6} md={6}>
                      <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
                        <CardActionArea>
                          <CardContent>
                            <ComplaintStatus data={graph7cgrm} />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>

                    <Grid xs={6} sm={6} md={6}>
                      <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
                        <CardActionArea>
                          <CardContent>
                            <AverageTAT data={graph8cgrm} />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  </Grid>
                </TabPanel>

                {/* RBIIndex-SRO Start from Here */}
                <TabPanel value="5">
                  <Grid container spacing={2}>
                    {/* Date Filter Component Start from here */}
                    <Grid xs={12} sm={12} md={12}>
                      <Card>
                        <CardContent>
                          <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            mt={1}
                          >
                            {/* Financial Year Dropdown */}
                            <Grid item xs={12} sm={12} md={5}>
                              <FormControl variant="standard" fullWidth>
                                <InputLabel id="fy-select-label">
                                  Choose Financial Year
                                </InputLabel>

                                <Select
                                  labelId="fy-select-label"
                                  id="fy-select"
                                  label="Choose Financial Year"
                                  value={rbiDropdown.selectedFY}
                                  onChange={(e) => handleFYChange(e.target.value)}
                                  sx={{ textAlign: "left" }}   // 👈 LEFT ALIGN
                                >
                                  {rbiDropdown.fyYears.map((fy, index) => (
                                    <MenuItem key={index} value={fy}>
                                      {fy}
                                    </MenuItem>
                                  ))}
                                </Select>

                              </FormControl>
                            </Grid>

                            {/* Quarter Dropdown */}
                            <Grid item xs={12} sm={12} md={5}>
                              <FormControl variant="standard" fullWidth>
                                <InputLabel id="quarter-select-label">
                                  Choose Quarter
                                </InputLabel>
                                <Select
                                  labelId="quarter-select-label"
                                  id="quarter-select"
                                  label="Choose Quarter"
                                  value={rbiDropdown.selectedQuarter}
                                  onChange={function (e) {
                                    handleQuarterChange(e.target.value);
                                  }}
                                  sx={{ textAlign: "left" }}   // 👈 LEFT ALIGN

                                >
                                  {rbiDropdown.quarters.map(function (
                                    qtr,
                                    index
                                  ) {
                                    return (
                                      <MenuItem key={index} value={qtr}>
                                        {qtr}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>

                            {/* Filter Button */}
                            <Grid item xs={12} sm={12} md={2}>
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 1 }}
                                onClick={filterRBIReportHandler}
                                disabled={rbiDropdown.isLoader}
                              >
                                Filter
                                <Loader
                                  loader={rbiDropdown.isLoader}
                                  size={15}
                                />
                              </Button>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    {/* Date Filter Component End here */}

                    {/* Date of monthly submission to CICs */}

                    <RBIIndex
                      rbiQuarterlyReportData={rbiQuarterlyReportData}
                    />

                    {/* Date of monthly submission to CICs */}
                  </Grid>
                </TabPanel>
                {/* RBIIndex-SRO  End from Here */}

                {/* Others-SRO Start from Here */}
                <TabPanel value="6">
                  <Grid container spacing={2}>
                    {/* Date Filter Component Start from here */}
                    <Grid xs={12} sm={12} md={12}>
                      <Card>
                        <CardContent>
                          <Grid container spacing={2} mt={2}>
                            <Grid xs={12} sm={12} md={5}>
                              <FormControl
                                variant="standard"
                                sx={{ m: 2, minWidth: 315 }}
                              >
                                <InputLabel id="demo-simple-select-standard-label">
                                  Choose Lender Name
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-standard-label"
                                  id="demo-simple-select-standard"
                                  label="Choose Lender Name"
                                  name="member"
                                  value={formState.member}
                                  onChange={(e) => onValueChange(e)}
                                >
                                  {members.map((v) => {
                                    return (
                                      <MenuItem value={v.ShortName}>
                                        {v.ShortName}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>

                            <Grid xs={12} sm={12} md={5}>
                              <FormControl
                                variant="standard"
                                sx={{ minWidth: "100%" }}
                              >
                                <InputLabel id="demo-simple-select-standard-label">
                                  Choose quater
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-standard-label"
                                  id="demo-simple-select-standard"
                                  name="Qautar"
                                  value={graphFilter.Quatar}
                                  onChange={handleGraphToDateChange}
                                  label="Qautar"
                                >
                                  {Quatars.map((q) => {
                                    return (
                                      <MenuItem value={q.Month}>
                                        {q.Month}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>

                            <Grid xs={12} sm={12} md={2}>
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                style={{
                                  backgroundColor: "#058283 !important",
                                }}
                                sx={{ mt: 3, mb: 2 }}
                                disabled={formState.isDisabled}
                                onClick={filterRBIOthersHandler}
                              >
                                Filter
                                <Loader loader={formState.isLoader} size={15} />
                              </Button>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    {/* Date Filter Component End here */}

                    {/* Date of monthly submission to CICs */}

                    <RBIOthersIndex
                      rbiOthersData={rbiOthersData}
                      rbiOthersCOB={rbiOthersCOB}
                      rbiOthersPQ={rbiOthersPQ}
                    />

                    {/* Date of monthly submission to CICs */}
                  </Grid>
                </TabPanel>
                {/* RBIIndex-SRO Others End from Here */}
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SroMaster;
