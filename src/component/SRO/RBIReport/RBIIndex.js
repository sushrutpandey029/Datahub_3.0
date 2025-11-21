
// import * as React from "react";
// import { Card, Button, CardContent, Typography } from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2";
// import "bootstrap/dist/css/bootstrap.min.css";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import TableViewIcon from "@mui/icons-material/TableView";
// import DataTable from "react-data-table-component";
// import { useEffect } from "react";
// import { BaseUrl } from "../../url/url";

// function RBIIndex(props) {
//   const [rbiDocuments, setRbiDocuments] = React.useState([]);

//   // 🧩 Load data from props
//   useEffect(() => {
//     if (
//       props &&
//       props.rbiQuarterlyReportData &&
//       props.rbiQuarterlyReportData.status === true &&
//       Array.isArray(props.rbiQuarterlyReportData.data)
//     ) {
//       setRbiDocuments(props.rbiQuarterlyReportData.data);
//     }
//   }, [props]);

//   // 🧩 Handle PDF/Excel open/download
//   const handleDocumentClick = (filePath, docItem) => {
//     if (!filePath) return;

//     const fullFileUrl = filePath.startsWith("http")
//       ? filePath
//       : `${BaseUrl}/public/${filePath}`;

//     const isPDF = filePath.toLowerCase().endsWith(".pdf");
//     const isExcel =
//       filePath.toLowerCase().endsWith(".xlsx") ||
//       filePath.toLowerCase().endsWith(".xls");

//     if (isExcel) {
//       const link = document.createElement("a");
//       link.href = fullFileUrl;
//       link.setAttribute(
//         "download",
//         `RBI_${docItem.fy_year}_${docItem.quarter}_${docItem.Part}.xlsx`
//       );
//       link.setAttribute("target", "_blank");
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } else {
//       window.open(fullFileUrl, "_blank");
//     }
//   };

//   // 🧩 Group data by FY & Quarter
//   const groupedData = Object.values(
//     rbiDocuments.reduce(function (acc, item) {
//       const key = item.fy_year + "-" + item.quarter;
//       if (!acc[key]) {
//         acc[key] = {
//           id: item.id,
//           fy_year: item.fy_year,
//           quarter: item.quarter,
//           created_at: item.created_at,
//           parts: [],
//         };
//       }
//       acc[key].parts.push({
//         part: item.Part,
//         file: item.document,
//       });
//       return acc;
//     }, {})
//   );

//   // 🧩 DataTable columns
//   const columns = [
//     {
//       name: "Financial Year",
//       selector: (row) => row.fy_year,
//       center: true,
//       sortable: true,
//       width: "200px",
//     },
//     {
//       name: "Quarter",
//       selector: (row) => row.quarter,
//       center: true,
//       sortable: true,
//       width: "200px",
//     },
//     {
//       name: (
//         <div style={{ textAlign: "center" }}>
//           <div>Documents</div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               gap: "40px",
//               fontSize: "13px",
//               marginTop: "5px",
//               padding: "0 25px",
//             }}
//           >
//             <strong>Part I</strong>
//             <strong>Part II</strong>
//           </div>
//         </div>
//       ),
//       cell: (row) => {
//         const part1 = row.parts.find((p) => p.part === "Part I");
//         const part2 = row.parts.find((p) => p.part === "Part II");

//         const renderButton = (file) => {
//           if (!file) return null;
//           const isPDF = file.toLowerCase().endsWith(".pdf");
//           const isExcel =
//             file.toLowerCase().endsWith(".xlsx") ||
//             file.toLowerCase().endsWith(".xls");

//           return (
//             <Button
//               variant="contained"
//               size="small"
//               onClick={() => handleDocumentClick(file, row)}
//               startIcon={isPDF ? <PictureAsPdfIcon /> : <TableViewIcon />}
//               style={{
//                 fontSize: "10px",
//                 padding: "4px 8px",
//                 minWidth: "60px",
//                 backgroundColor: isPDF ? "#d32f2f" : "#2e7d32",
//                 color: "white",
//               }}
//             >
//               {isPDF ? "PDF" : "Excel"}
//             </Button>
//           );
//         };

//         return (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               width: "200px",
//               padding: "0 20px",
//             }}
//           >
//             <div>{part1 && part1.file && renderButton(part1.file)}</div>
//             <div>{part2 && part2.file && renderButton(part2.file)}</div>
//           </div>
//         );
//       },
//       center: true,
//       width: "300px",
//     },
//     {
//       name: "Uploaded Date",
//       selector: (row) =>
//         row.created_at ? new Date(row.created_at).toLocaleDateString() : "N/A",
//       center: true,
//       sortable: true,
//       width: "180px",
//     },
//   ];

//   // 🧩 Custom styles — full width + no header background
//   const customStyles = {
//     table: {
//       style: {
//         width: "100%",
//       },
//     },
//     headCells: {
//       style: {
//         backgroundColor: "transparent", // ❌ Removed background
//         color: "#333",
//         fontWeight: "600",
//         fontSize: "1rem",
//         textAlign: "center",
//         borderBottom: "2px solid #ddd",
//       },
//     },
//     cells: {
//       style: {
//         textAlign: "center",
//         padding: "0.5rem",
//         fontSize: "0.9rem",
//       },
//     },
//     rows: {
//       style: {
//         minHeight: "60px",
//         "&:hover": {
//           backgroundColor: "#f5f5f5",
//         },
//       },
//     },
//   };

//   return (
//     <Grid xs={12}>
//       <Card
//         style={{
//           marginBottom: "20px",
//           width: "100%",
//           boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//         }}
//       >
//         <CardContent>
//           <Typography
//             variant="h5"
//             style={{
//               textAlign: "left",
//               fontSize: "18px",
//               color: "#bd2f03",
//               fontWeight: "bold",
//               marginBottom: "20px",
//             }}
//           >
//             RBI Quarterly Reports
//           </Typography>

//           <div style={{ width: "100%", overflowX: "auto" }}>
//             <DataTable
//               columns={columns}
//               data={groupedData}
//               pagination
//               paginationPerPage={10}
//               paginationRowsPerPageOptions={[5, 10, 15, 20]}
//               customStyles={customStyles}
//               highlightOnHover
//               striped
//               responsive
//               noDataComponent={
//                 <div
//                   style={{
//                     padding: "40px",
//                     textAlign: "center",
//                     color: "#666",
//                   }}
//                 >
//                   No RBI documents available.
//                 </div>
//               }
//             />
//           </div>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// }

// export default RBIIndex;


import * as React from "react";
import { Card, Button, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import "bootstrap/dist/css/bootstrap.min.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableViewIcon from "@mui/icons-material/TableView";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { BaseUrl } from "../../url/url";

function RBIIndex(props) {
  const [rbiDocuments, setRbiDocuments] = React.useState([]);

  // Load data from props
  useEffect(() => {
    if (
      props &&
      props.rbiQuarterlyReportData &&
      props.rbiQuarterlyReportData.status === true &&
      Array.isArray(props.rbiQuarterlyReportData.data)
    ) {
      setRbiDocuments(props.rbiQuarterlyReportData.data);
    }
  }, [props]);

  // Handle PDF/Excel open/download
  const handleDocumentClick = (filePath, docItem) => {
    if (!filePath) return;

    const fullFileUrl = filePath.startsWith("http")
      ? filePath
      : `${BaseUrl}/public/${filePath}`;

    const isPDF = filePath.toLowerCase().endsWith(".pdf");
    const isExcel =
      filePath.toLowerCase().endsWith(".xlsx") ||
      filePath.toLowerCase().endsWith(".xls");

    if (isExcel) {
      const link = document.createElement("a");
      link.href = fullFileUrl;
      link.setAttribute(
        "download",
        `RBI_${docItem.fy_year}_${docItem.quarter}_${docItem.Part}.xlsx`
      );
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(fullFileUrl, "_blank");
    }
  };

  // Group by FY-Year + Quarter
  const groupedData = Object.values(
    rbiDocuments.reduce((acc, item) => {
      const key = `${item.fy_year}-${item.quarter}`;
      if (!acc[key]) {
        acc[key] = {
          id: item.id,
          fy_year: item.fy_year,
          quarter: item.quarter,
          created_at: item.created_at,
          parts: [],
        };
      }
      acc[key].parts.push({
        part: item.Part,
        file: item.document,
      });
      return acc;
    }, {})
  );

  // // Table Columns
  // const columns = [
  //   {
  //     name: "Financial Year",
  //     selector: (row) => row.fy_year,
  //     center: true,
  //     sortable: true,
  //     width: "200px",
  //   },
  //   {
  //     name: "Quarter",
  //     selector: (row) => row.quarter,
  //     center: true,
  //     sortable: true,
  //     width: "200px",
      
              

  //   },
  //   {
  //     name: (
  //       <div style={{ textAlign: "center" }}>
  //         <div>Documents</div>
  //         <div
  //           style={{
  //             display: "flex",
  //             justifyContent: "space-between",
  //             gap: "40px",
  //             fontSize: "13px",
  //             marginTop: "5px",
  //             padding: "0 25px",
              
  //           }}
  //         >
  //           <strong>Part I</strong>
  //           <strong>Part II</strong>
  //         </div>
  //       </div>
  //     ),
  //     cell: (row) => {
  //       const part1 = row.parts.find((p) => p.part === "Part I");
  //       const part2 = row.parts.find((p) => p.part === "Part II");

  //       const renderBtn = (file) => {
  //         if (!file) return null;

  //         const isPDF = file.toLowerCase().endsWith(".pdf");
  //         const isExcel =
  //           file.toLowerCase().endsWith(".xlsx") ||
  //           file.toLowerCase().endsWith(".xls");

  //         return (
  //           <Button
  //             variant="contained"
  //             size="small"
  //             onClick={() =>
  //               handleDocumentClick(file, {
  //                 fy_year: row.fy_year,
  //                 quarter: row.quarter,
  //                 Part: isPDF ? "Part I" : "Part II",
  //               })
  //             }
  //             startIcon={isPDF ? <PictureAsPdfIcon /> : <TableViewIcon />}
  //             style={{
  //               fontSize: "10px",
  //               padding: "4px 8px",
  //               minWidth: "60px",
  //               backgroundColor: isPDF ? "#d32f2f" : "#2e7d32",
  //               color: "white",
  //             }}
  //           >
  //             {isPDF ? "PDF" : "Excel"}
  //           </Button>
  //         );
  //       };

  //       return (
  //         <div
  //           style={{
  //             display: "flex",
  //             justifyContent: "space-between",
  //             width: "200px",
  //             padding: "0 20px",
  //           }}
  //         >
  //           <div>{part1?.file && renderBtn(part1.file)}</div>
  //           <div>{part2?.file && renderBtn(part2.file)}</div>
  //         </div>
  //       );
  //     },
  //     center: true,
  //     width: "300px",
  //   },
  //   {
  //     name: "Uploaded Date",
  //     selector: (row) =>
  //       row.created_at
  //         ? new Date(row.created_at).toLocaleDateString("en-IN")
  //         : "N/A",
  //     center: true,
  //     sortable: true,
  //     width: "180px",
  //   },
  // ];

  const columns = [
  {
    name: "Financial Year",
    selector: (row) => row.fy_year,
    sortable: true,
    width: "200px",
    style: { textAlign: "left" },   // 👈 DATA LEFT
  },
  {
    name: "Quarter",
    selector: (row) => row.quarter,
    sortable: true,
    width: "200px",
    style: { textAlign: "left" },   // 👈 DATA LEFT
  },

  {
    name: (
      <div style={{ textAlign: "center" }}>
        <div>Documents</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "40px",
            fontSize: "13px",
            marginTop: "5px",
            padding: "0 25px",
          }}
        >
          <strong>Part I</strong>
          <strong>Part II</strong>
        </div>
      </div>
    ),
    cell: (row) => {
      const part1 = row.parts.find((p) => p.part === "Part I");
      const part2 = row.parts.find((p) => p.part === "Part II");

      const renderBtn = (file) => {
        if (!file) return null;

        const isPDF = file.toLowerCase().endsWith(".pdf");
        const isExcel =
          file.toLowerCase().endsWith(".xlsx") ||
          file.toLowerCase().endsWith(".xls");

        return (
          <Button
            variant="contained"
            size="small"
            onClick={() =>
              handleDocumentClick(file, {
                fy_year: row.fy_year,
                quarter: row.quarter,
                Part: isPDF ? "Part I" : "Part II",
              })
            }
            startIcon={isPDF ? <PictureAsPdfIcon /> : <TableViewIcon />}
            style={{
              fontSize: "10px",
              padding: "4px 8px",
              minWidth: "60px",
              backgroundColor: isPDF ? "#d32f2f" : "#2e7d32",
              color: "white",
            }}
          >
            {isPDF ? "PDF" : "Excel"}
          </Button>
        );
      };

      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "200px",
            padding: "0 20px",
          }}
        >
          <div>{part1 && part1.file && renderBtn(part1.file)}   </div>
          <div>{part2 && part2.file && renderBtn(part2.file)}</div>
        </div>
      );
    },
    width: "300px",
    style: { textAlign: "left" },  // 👈 DATA LEFT
  },

  {
    name: "Uploaded Date",
    selector: (row) =>
      row.created_at
        ? new Date(row.created_at).toLocaleDateString("en-IN")
        : "N/A",
    sortable: true,
    width: "180px",
    style: { textAlign: "left" },   // 👈 DATA LEFT
  },
];


  // Custom Styles
  const customStyles = {
    table: { style: { width: "100%" } },
    headCells: {
      style: {
        backgroundColor: "transparent",
        color: "#333",
        fontWeight: "600",
        fontSize: "1rem",
        textAlign: "center",
        borderBottom: "2px solid #ddd",
      },
    },
    cells: {
      style: {
        textAlign: "center",
        padding: "0.5rem",
        fontSize: "0.9rem",
      },
    },
    rows: {
      style: {
        minHeight: "60px",
        "&:hover": { backgroundColor: "#f5f5f5" },
      },
    },
  };

  return (
    <Grid xs={12}>
      <Card
        style={{
          marginBottom: "20px",
          width: "100%",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            style={{
              textAlign: "left",
              fontSize: "18px",
              color: "#bd2f03",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            RBI Quarterly Reports
          </Typography>

          <div style={{ width: "100%", overflowX: "auto" }}>
            <DataTable
              columns={columns}
              data={groupedData}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[5, 10, 15, 20]}
              customStyles={customStyles}
              highlightOnHover
              striped
              responsive
              noDataComponent={
                <div
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  No RBI documents available.
                </div>
              }
            />
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default RBIIndex;
