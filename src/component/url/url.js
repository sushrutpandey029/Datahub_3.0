export const BaseUrl = "https://api.mfinindia.org";
//export const BaseUrl = "http://localhost:8000";
export const GlpGrowthTrendsApi = "api/auth/glp-growth-trend-calculations";
export const microFinanceActiveEntities =
  "api/auth/micro-finance-active-entities";
export const loginApi = "api/auth/login";
export const resetLoginStatusApi = "api/auth/resetLoginStatus";
export const loginOTOApi = "api/auth/loginOTP";
export const ChangePasswordApi = "api/auth/change-password";
export const ForgotPasswordApi = "api/auth/forgotPassword";
export const ChangePhoneApi = "api/auth/change-phone";
export const DRIMapApi = "api/auth/update-dri-frame";
export const getContactListApi = "api/auth/contacts";
export const addContactApi = "api/auth/add-contacts";
export const getContactDetailsApi = "api/auth/contact-details";
export const importContactApi = "api/auth/contacts";
export const importDRIStateApi = "api/auth/dri-states-import";
export const importDRIDistrictApi = "api/auth/dri-district-import";
export const importDRIMapDataApi = "api/auth/importCsvdatamap";
export const importDRIPinCodeDataApi =
  "api/auth/dri_states_district-import_PINCode";
export const fetchPinCodeData = "api/auth/fetch-pincode-data";
export const fetchAllPinCodeData = "api/auth/fetch-all-pincode-data";

// cb
export const importCbDistrict = "api/auth/cb-district-master";
export const importCbState = "api/auth/cb-state-master";

// member-associate-master
export const importMemberAssociateMaster = "api/auth/member-associate-master";

// mudra

// export const importMudraBankWise = "api/auth/mudrabankwise";
// export const importMudraDistrictWise = "api/auth/mudradistrictwise";
// export const importRadarExternalInciterApi = "api/auth/rader-external-inciter";
// export const importRadarNegativeAreaApi = "api/auth/rader-negative-area";
// export const importRadarRiskyAreaApi = "api/auth/rader-risky-area";
// export const importRadarRingLeaderApi = "api/auth/rader-ring-leader";

//micrometer import
export const importMmMasterDataApi = "api/auth/mm-import-master-data";
export const importMmMasterBorrowingsDataApi =
  "api/auth/mm-import-master-borrowings-data";
export const importMmStateMasterApi = "api/auth/mm-import-state-master";

// DRI
export const fetchMonthsYears = "api/auth/fetchMonthsYears";
export const getDistrictAndCategory = "api/auth/getdisteictandcategory";
export const fetchNewRecords = "api/auth/new_fetch_records";

// SRO
export const importSROEBDataApi = "api/auth/sro-import-eb-data";
export const importSROCBDataApi = "api/auth/sro-import-cb-data";
export const importSROQARDataApi = "api/auth/sro-import-qar-data";
export const importSROCGRMDataApi = "api/auth/sro-import-cgrm-data";

// ALM
export const importALMDataApi = "api/auth/alm";

// RBI Master
export const importRBIMasterDataApi = "api/auth/rbi";

//data publication
export const uploadDataApi = "https://api.mfinindia.org/api/auth";

//SIT URL
export const getPieCountData =
  "api/auth/meetings/newcount/newpie_activity_type";

export const getBarCountData = "api/auth/meetings/newcount/newyear/newmonth";
export const getBarChartDrillData =
  "api/auth/meetings/graph/drilldown/barchart";
export const getPieChartDrillData =
  "api/auth/meetings/graph/drilldown/piechart";

export const uploadCalendarCSV = "api/auth/meetings/upload/calendarCSV";
export const calendarAllMeetings = "api/auth/meetings/allmeetingscalendar";
