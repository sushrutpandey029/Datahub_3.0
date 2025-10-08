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
import CategoryWiseQuery from "./CGRM/CategoryWiseQuery";
import CategoryWiseComplaint from "./CGRM/CategoryWiseComplaint";
import CategoryWiseStatus from "./CGRM/CategoryWiseStatus";
import ResulationTAT from "./CGRM/ResulationTAT";
import OriginOfCall from "./CGRM/OriginOfCall";
import ComplaintStatus from "./CGRM/ComplaintStatus";
import ReportTable from "./CGRM/ReportTable";
import AverageTAT from "./CGRM/AverageTAT";

// ***************  Others  : End ************************

import { BaseUrl } from "../url/url";
import axios from "axios";
import authHeaders from "../Service/AuthHeaders";
import parse from "html-react-parser";
import EBOpenToHireGp from "./EBReport/EBOpenToHireGp";

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

  const [industryRecords, setIndustryLevelRecords] = useState([]);
  const [memberRecords, setMemberLevelRecords] = useState([]);

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

  const [ebOpenToHireGData, setEbOpenToHireGData] = useState([]);

  // EB member graphs states
  const [ebMOverKycMember, setEbMOverKycMember] = useState([]);
  const [ebMInquiryHitSeries, setEbMInquiryHitSeries] = useState([]);
  const [ebMemberLabels, setEbMemberLabels] = useState([]);

  const [ebcategaryMemberSeries, setEBCategaryMemberSeries] = useState([]);
  const [categoryIndustrySeries, setCategoryIndustrySeries] = useState([]);

  const [QARParametersRecords, setQARParametersRecords] = useState([]);

  const [QARBucketMeetinglabels, setQARBucketMeetinglabels] = useState([]);
  const [QARBucketMeetingSeries, setQARBucketMeetingSeries] = useState([]);
  const [QARBucketMeetingmonthYear, setQARBucketMeetingmonthYear] =
    useState("");

  const [QARStatusACQarterlabels, setQARStatusACQarterlabels] = useState([]);
  const [QARStatusACQarterSeries, setQARStatusACQarterSeries] = useState([]);

  // EB monthly submission

  // Start CGRM Report Information
  const [ReportData, setReportData] = useState(null);

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

  const getCGRMData = async () => {
    var queryString = Object.keys(formState)
      .map((key) => key + "=" + formState[key])
      .join("&");

    const Quatar = formState.Quatar;
    const member = formState.member;

    // sro-get-cgrm-category-wise
    await axios
      .get(`${BaseUrl}/api/auth/sro-get-cgrm-category-wise?${queryString}`, {
        headers: authHeaders(),
      })
      .then((response) => {
        setNatureofCallSeries(response.data.data.NatureOfCalls);
        setProductWiseCallVolumeSeries(response.data.data.ProductWiseCall);
        //setMembers(response.data.MFISelected);
      })
      .catch((error) => {
        console.log("err", error);
      });
    //sro-get-QAR-paramters - member Level

    //sro-get-cgrm-getReport
    await axios
      .get(`${BaseUrl}/api/auth/getReport?month=${Quatar}&member=${member}`, {
        headers: authHeaders(),
      })
      .then((response) => {
        setReportData(response.data);
        // console.log("cgrm_report", response.data);
      })
      .catch((err) => {
        console.log("cgrm_report_err", err);
      });

    //sro get nature-of-calls
    await axios
      .get(
        `${BaseUrl}/api/auth/nature-of-calls?month=${Quatar}&member=${member}`,
        {
          headers: authHeaders(),
        }
      )
      .then((response) => {
        console.log("noc", response);
        setNatureOfCallQuery(response.data.Query);
        setNatureOfCallComplaint(response.data.Complaint);
      })
      .catch((err) => {
        console.log("cgrm_noc_err", err);
      });

    //sro get cgrm product-wise-call
    await axios
      .get(
        `${BaseUrl}/api/auth/product-wise-calls?month=${Quatar}&member=${member}`,
        {
          headers: authHeaders(),
        }
      )
      .then((response) => {
        console.log("pwc", response);
        setProductWiseCallData(response.data);
        console.log("product", productWiseCallData);
      })
      .catch((err) => {
        console.log("cgrm_noc_err", err);
      });

    //sro get cgrm origin-of-call
    await axios
      .get(
        `${BaseUrl}/api/auth/origin-of-calls?month=${Quatar}&member=${member}`,
        {
          headers: authHeaders(),
        }
      )
      .then((response) => {
        setOriginOfCallData(response.data);
      })
      .catch((err) => {
        console.log("cgrm_noc_err", err);
      });

    //sro get cgrm category-wise-compalint data
    await axios
      .get(
        `${BaseUrl}/api/auth/category-wise/Complaint?month=${Quatar}&member=${member}`,
        {
          headers: authHeaders(),
        }
      )
      .then((response) => {
        console.log("complaint", response);
        setCategoryWiseComplaint(response.data);
      })
      .catch((err) => {
        console.log("cgrm-category-wise-complaint-err", err);
      });

    //sro get cgrm category-wise-query data
    await axios
      .get(
        `${BaseUrl}/api/auth/category-wise/Query?month=${Quatar}&member=${member}`,
        {
          headers: authHeaders(),
        }
      )
      .then((response) => {
        console.log("query", response);
        setCategoryWiseQuery(response.data);
      })
      .catch((err) => {
        console.log("cgrm-category-wise-query-err", err);
      });

    //sro get cgrm complaint-status data
    await axios
      .get(
        `${BaseUrl}/api/auth/complaint-status?month=${Quatar}&member=${member}`,
        {
          headers: authHeaders(),
        }
      )
      .then((response) => {
        setcomplaintStatusData(response.data);
      })
      .catch((err) => {
        console.log("cgrm-complaint-status-data-err", err);
      });

    //sro get cgrm average-tat data
    await axios
      .get(`${BaseUrl}/api/auth/average-tat?month=${Quatar}&member=${member}`, {
        headers: authHeaders(),
      })
      .then((response) => {
        setAverageTATData(response.data);
      })
      .catch((err) => {
        console.log("cgrm-average-tat-data-err", err);
      });
  };

  const getQARData = async () => {
    var queryString = Object.keys(formState)
      .map((key) => key + "=" + formState[key])
      .join("&");
    // sro-get-QAR-paramters- indusrty Level
    await axios
      .get(`${BaseUrl}/api/auth/sro-get-QAR-paramters?${queryString}`, {
        headers: authHeaders(),
      })
      .then((response) => {
        setQARParametersRecords(parse(response.data.data.QARParametersTable));

        //setMembers(response.data.MFISelected);
      })
      .catch((error) => {
        console.log("err", error);
      });
    //sro-get-QAR-paramters - member Level
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
        `${BaseUrl}/api/auth/getKycFillRatesIndustry?short_name=${formState.member}&month=${formState.toMonth}&entity=${ebentity}`,
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
        `${BaseUrl}/api/auth/getMonthlyEnquiriesHitVolumesIndustry?short_name=${formState.member}&month=${formState.toMonth}&entity=${ebentity}`,
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
    console.log("data object", formState);

    //sro-get-eb-indusry-graph-data-new
    await axios
      .get(
        `${BaseUrl}/api/auth/sro-get-eb-indusry-graph-data-new?short_name=${formState.member}&month=${formState.toMonth}&entity=${ebentity}`,
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

    //sro-get-eb-open-to-hire
    await axios
      .get(
        `${BaseUrl}/api/auth/eb-openToRehireGraph?short_name=${formState.member}&month=${formState.toMonth}&entity=${ebentity}`,
        {
          headers: authHeaders(),
        }
      )
      .then((response) => {
        console.log("resp opentohire", response);
        setEbOpenToHireGData(response.data);
      })
      .catch((error) => {
        console.log("err in opentohire", error);
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

  const getCreditBureauData = async () => {
    var queryString = Object.keys(formState)
      .map((key) => key + "=" + formState[key])
      .join("&");

    //Monthly Submission - indusrty Level
    await axios
      .get(
        `${BaseUrl}/api/auth/sro-get-credit-bureau-calculations-industry?${queryString}`,
        { headers: authHeaders() }
      )
      .then((response) => {
        setIndustryLevelRecords(parse(response.data.data.industryLevel));
      })
      .catch((error) => {
        console.log("err", error);
      });

    //Monthly Submission - member Level
    await axios
      .get(
        `${BaseUrl}/api/auth/sro-get-credit-bureau-calculations-member?${queryString}`,
        { headers: authHeaders() }
      )
      .then((response) => {
        setMemberLevelRecords(parse(response.data.data.memberLevel));
      })
      .catch((error) => {
        console.log("err", error);
      });

    //Data Submission - Member Level
    await axios
      .get(
        `${BaseUrl}/api/auth/sro-get-member-credit-bureau-data?${queryString}`,
        { headers: authHeaders() }
      )
      .then((response) => {
        setMDataSubmissionSeries(response.data.data.memberDataSubmissionSeries);
        setMDataSubmissionLabels(response.data.data.memberDataSubmissionLabels);
        setMKycSeedingSeries(response.data.data.memberKycSeedingSeries);
        setMemberName(" - " + response.data.data.memberName);
      })
      .catch((error) => {
        console.log("err", error);
      });

    //Data Submission - industry Level
    await axios
      .get(
        `${BaseUrl}/api/auth/sro-get-member-data-submission-acceptance-graph?${queryString}`,
        { headers: authHeaders() }
      )
      .then((response) => {
        setIDataSubmissionSeries(response.data.data.dataSubmissionSeries);
        setIDataSubmissionLabels(response.data.data.dataSubmissionLabels);
        setIKycSeedingSeries(response.data.data.kycSeedingSeries);
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

  // sro -RBI report start here
  // get rbi quaterly data

  const getRBIQuarterlyData = async () => {
    console.log("formstate_member_b", formState.member);
    console.log("formstate_quatar_b", formState.Quatar);

    await axios
      .get(
        `${BaseUrl}/api/auth/quarterly-data-report-highlights?Short_Name=${formState.member}&Month_As_on=${formState.Quatar}`,
        {
          headers: authHeaders(),
        }
      )
      .then((response) => {
        setRBIIndexData(parse(response.data.data));
        console.log("sro-rbi-data", response);
      })
      .catch((error) => {
        console.log("rbi quaterly error", error);
        setRBIIndexData(error.response.data.message);
        // console.log('err-mess',error.response.data.message);
      });

    await axios
      .get(
        `${BaseUrl}/api/auth/quarterly-yoy-report-highlights?Short_Name=${formState.member}&Month_As_on=${formState.Quatar}`,
        { headers: authHeaders() }
      )
      .then((response) => {
        setRBIYOYData(parse(response.data.data));
        console.log("sro-rbi-yoy-data", response);
      })
      .catch((error) => {
        console.log("rbi quaterly error", error);
        setRBIYOYData(error.response.data.message);
      });

    //     -----household income and indebtedness data-----indebtedness-summary

    //api changed  calculate-HHIIndebtedness to indebtedness-summary
    await axios
      .get(
        `${BaseUrl}/api/auth/indebtedness-summary?short_name=${formState.member}&Month_As_on=${formState.Quatar}`,
        { headers: authHeaders() }
      )
      .then((response) => {
        setRBIHouseholdData(response.data);
        console.log("sro-rbi-household-data", response.data);
      })
      .catch((error) => {
        console.log("rbi quaterly error", error);
        // setRBIHouseholdData(error.response.data || "error in api call")
      });
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
    setFormState((prevState) => ({
      ...prevState,
      ["isLoader"]: true,
      ["isDisabled"]: true,
    }));
    await getQARData();
    await getQARBucketMeetingData();
    await getQARStatucAcQarterData();
    setFormState((prevState) => ({
      ...prevState,
      ["isLoader"]: false,
      ["isDisabled"]: false,
    }));
  };

  const filterCGRMHandler = async () => {
    setFormState((prevState) => ({
      ...prevState,
      ["isLoader"]: true,
      ["isDisabled"]: true,
    }));
    await getCGRMData();
    setFormState((prevState) => ({
      ...prevState,
      ["isLoader"]: false,
      ["isDisabled"]: false,
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

  useEffect(() => {
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
      getQARLatestMonthYear();
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
    getRBIQuarterlyData();
    getRBIOthersData();
    filterRBIReportHandler();
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
                                    return (
                                      <MenuItem value={v.ShortName}>
                                        {v.ShortName}
                                      </MenuItem>
                                    );
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
                                  value={formState.toMonth}
                                  onChange={handleToDateChange}
                                  maxDate={graphFilter.maxDate}
                                  minDate={new Date("2017-01-01")}
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
                                onClick={filterCBHandler}
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

                    {/* Monthly Sbmsn - Dt of month Sub  Start from here */}

                    <CBMonthlySbmsnTable
                      memberRecords={memberRecords}
                      industryRecords={industryRecords}
                      memberName={memberName}
                    />

                    {/* Monthly Sbmsn - Dt of month Sub  End from here */}

                    {/* Member Level KYC & VID seeding Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <CBVIDKYCSeedingMemberGraph
                        mKycSeedingSeries={mKycSeedingSeries}
                        mDataSubmissionLabels={mDataSubmissionLabels}
                        memberName={memberName}
                      />
                    </Grid>
                    {/* Member Level KYC & VID seeding End from here */}

                    {/* Industry Level KYC & VID seeding Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <CBVIDKYCSeedingIndustryGraph
                        iKycSeedingSeries={iKycSeedingSeries}
                        iDataSubmissionLabels={iDataSubmissionLabels}
                      />
                    </Grid>
                    {/* Industry Level KYC & VID seeding End from here */}

                    {/* Member Level : Data Summission & % of data acceptance Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <CBDataAcceptanceSmtbMemberGraph
                        mDataSubmissionSeries={mDataSubmissionSeries}
                        mDataSubmissionLabels={mDataSubmissionLabels}
                        memberName={memberName}
                      />
                    </Grid>
                    {/* Member Level :  Data Summission & % of data acceptance End from here */}

                    {/* Industry Level :  Data Summission & % of data acceptance Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <CBDataAcceptanceSmtbIndustryGraph
                        iDataSubmissionSeries={iDataSubmissionSeries}
                        iDataSubmissionLabels={iDataSubmissionLabels}
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
                      selectedMember={formState.member}
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
                      />
                    </Grid>
                    {/* Industry Level KYC fill rate overall & KYC fill rate reporting month End from here */}

                    {/* Member Level Monthly Total Enquiries and hit volume Start from here */}
                    <Grid xs={12} sm={12} md={6}>
                      <EBMonthlyEnquirynhitMemberGp
                        ebMemberInquiryGData={ebMemberInquiryGData}
                      />
                    </Grid>
                    {/* Member Level Monthly Total Enquiries and hit volume End from here */}

                    {/* Industry Level Monthly Total Enquiries and hit volume Start from here */}

                    <Grid xs={12} sm={12} md={6}>
                      <EBMonthlyEnquirynhitIndustryGp
                        ebIndustryInquiryGData={ebIndustryInquiryGData}
                      />
                    </Grid>
                    {/* Industry Level Monthly Total Enquiries and hit volume End from here */}

                    <Grid xs={12} sm={12} md={6}>
                      <EBCategoryGpMember
                        ebCategoryMemberGData={ebCategoryMemberGData}
                      />
                    </Grid>
                    {/* Industry Level Monthly Total Enquiries and hit volume End from here */}

                    <Grid xs={12} sm={12} md={6}>
                      <EBCategoryIndustryGp
                        ebCategoryIndustryGData={ebCategoryIndustryGData}
                      />
                    </Grid>
                    {/* Industry Level Monthly Total Enquiries and hit volume End from here */}
                    <Grid xs={12} sm={12} md={12}>
                      <EBOpenToHireGp ebOpenToHireGData={ebOpenToHireGData} />
                    </Grid>
                  </Grid>
                </TabPanel>

                {/* Employee Bureau (EB-SRO)  End from Here */}

                {/* QAR-SRO Start from Here */}
                <TabPanel value="3">
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
                                    return (
                                      <MenuItem value={v.ShortName}>
                                        {v.ShortName}
                                      </MenuItem>
                                    );
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
                                  label="Reporting Month"
                                  fullWidth
                                  value={formState.toMonth}
                                  onChange={handleToDateChange}
                                  minDate={new Date("2017-01-01")}
                                  maxDate={graphFilter.maxDate}
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
                                onClick={filterQARHandler}
                                maxDate={graphFilter.maxDate}
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

                    {/* <QARMonthlySbmsnCICTable /> */}

                    <QARMonthlySbmsnCICTable
                      QARParametersRecords={QARParametersRecords}
                      // memberName={memberName}
                    />

                    <Grid xs={6} sm={6} md={6}>
                      <Card
                        style={{ paddingBottom: "20px", marginBottom: "20px" }}
                      >
                        <CardActionArea>
                          <CardContent>
                            <QARBarChart
                              QARStatusACQarterlabels={QARStatusACQarterlabels}
                              QARStatusACQarterSeries={QARStatusACQarterSeries}
                            />
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
                            <QARPieChart
                              QARBucketMeetinglabels={QARBucketMeetinglabels}
                              QARBucketMeetingSeries={QARBucketMeetingSeries}
                              QARBucketMeetingmonthYear={
                                QARBucketMeetingmonthYear
                              }
                            />
                          </CardContent>
                        </CardActionArea>
                      </Card>
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
                                onClick={filterCGRMHandler}
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

                    {/* Date of monthly submission to CICs */}
                    <Grid xs={12} sm={12} md={12}>
                      <Card
                        style={{ paddingBottom: "20px", marginBottom: "20px" }}
                      >
                        <CardActionArea>
                          <CardContent>
                            <ReportTable ReportData={ReportData} />
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
                            <NatureofCall
                              Query={natureOfCallQuery}
                              Complaint={natureOfCallComplaint}
                            />
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
                            <ProductWiseCall data={productWiseCallData} />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>

                    <Grid xs={12} sm={12} md={12}>
                      <Card
                        style={{ paddingBottom: "20px", marginBottom: "20px" }}
                      >
                        <CardActionArea>
                          <CardContent>
                            {/* <CategoryWiseQuery /> */}
                            <OriginOfCall data={originOfCallData} />
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
                            <CategoryWiseComplaint
                              data={categoryWiseComplaint}
                            />
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
                            <CategoryWiseQuery data={categoryWiseQuery} />
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
                            <ComplaintStatus data={complaintStatusData} />
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
                            <CategoryWiseStatus />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid> */}

                    <Grid xs={6} sm={6} md={6}>
                      <Card
                        style={{ paddingBottom: "20px", marginBottom: "20px" }}
                      >
                        <CardActionArea>
                          <CardContent>
                            <AverageTAT data={averageTATData} />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>

                    {/* <Grid xs={6} sm={6} md={6}>
                      <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
                        <CardActionArea>
                          <CardContent>
                            <NatureofCall
                              NatureofCallSeries={NatureofCallSeries}
                            />

                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>

                    <Grid xs={6} sm={6} md={6}>
                      <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
                        <CardActionArea>
                          <CardContent>
                            <ProductWiseCall
                              ProductWiseCallVolumeSeries={ProductWiseCallVolumeSeries}
                            />

                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>

                    <Grid xs={6} sm={6} md={6}>
                      <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
                        <CardActionArea>
                          <CardContent>
                            <CategoryWiseQuery />

                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>

                    <Grid xs={6} sm={6} md={6}>
                      <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
                        <CardActionArea>
                          <CardContent>
                            <CategoryWiseComplaint />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                    <Grid xs={6} sm={6} md={6}>
                      <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
                        <CardActionArea>
                          <CardContent>
                            <CategoryWiseStatus />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>

                    <Grid xs={6} sm={6} md={6}>
                      <Card style={{ paddingBottom: "20px", marginBottom: "20px" }}>
                        <CardActionArea>
                          <CardContent>
                            <ResulationTAT />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid> */}

                    {/* Date of monthly submission to CICs */}
                  </Grid>
                </TabPanel>

                {/* RBIIndex-SRO Start from Here */}
                <TabPanel value="5">
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
                                  Choose Short Name
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
                                  Choose Month
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
                                onClick={filterRBIReportHandler}
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

                    <RBIIndex
                      rbiIndexData={rbiIndexData}
                      rbiYOYData={rbiYOYData}
                      rbiHouseholdData={rbiHouseholdData}
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
