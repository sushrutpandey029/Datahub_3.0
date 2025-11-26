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

// SRO - QAR
export const qarDropdownDataApi = "api/auth/dopdown-data";
export const qarParamertersApi = "api/auth/sro-table1-data";
export const gauardrillapi = "api/auth/guardrailsAnalysis";
export const gauardrillapiuniverse = "/api/auth/guardrailsIndustryAnalysis";
export const universeashirvadbreah =
  "/api/auth/householdIncomeAndFoirBreachIndustry";
export const householdbymemeber = "api/auth/householdIncomeAndFoirBreachMember";
export const beachuinverse = "/api/auth/breachGuardrailsIndustry";
export const beachmemeber = "api/auth/breachGuardrailsMember";


//microuniverse productmix

export const TicketSizeChartApi = "/api/auth/get-ticket-size-allindia";

export const TicketSizeChartApistate = "/api/auth/state-ticket-size";

export const TenureSizeChartApi = "/api/auth/get-tenure-size-allindia";

export const TenureSizeChartApiState = "/api/auth/get-tenure-state-allindia";

export const PayementSizeChartApi = "/api/auth/get-payment-size-allindia";
export const PayementSizeChartApistate = "/api/auth/get-payment-state-allindia";


// SRO NEW cb 
export const cbMemberlist = "api/auth/get-member-month-filter";
export const cbEnititylist = "api/auth/get-entity-month-filter";

export const cbSubmissionMember = "/api/auth/table1";
export const cbSubmissionIndustry = "/api/auth/industryTable2";
export const cbKycSeddingMember = "/api/auth/table1graph1KycVidFillRate";
export const cbKycSeddingIndustry = "/api/auth/table1graph2KycVidFillRateIndustry";
export const cbAcceptanceMember = "/api/auth/getGraph3Data";
export const cbAcceptanceIndustry = "/api/auth/getGraph4Data";

export const cbMemberDataApi = "/api/auth/table1"
export const cbIndustryDataApi = "/api/auth/industryTable2Metrics"

//new cgrm 

export const  dropdownofcgrm = "/api/auth/CGRM_Drop_down_data";
export const table1cgrm = "/api/auth/CGRM_getTable1Data";
export const graph1cgrm = "/api/auth/Nature_of_calls_Member";



// SRO RBI Others
export const rbiQuarterlyDataApi = "api/auth/rbi_data";

// ALM
export const importALMDataApi = "api/auth/alm";

// RBI Master
export const importRBIMasterDataApi = "api/auth/rbi";
export const rbiReportDropDownDataApi = "api/auth/drop-down-data";

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


