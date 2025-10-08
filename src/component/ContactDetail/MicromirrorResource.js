import React, { useEffect, useState } from "react";
import { uploadDataApi } from "../url/url";
import axios from "axios";
import Breadcrumb from "../common/Breadcrumb";
import GrassIcon from "@mui/icons-material/Grass";
import { Card, CardContent } from "@mui/material";
import DataTable from "react-data-table-component";
import 'bootstrap/dist/css/bootstrap.min.css';
import './MicromirrorResource.css'
import { useNavigate } from "react-router-dom";

const MicromirrorResource = () => {
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  const fetchDataList = async () => {
    try {
      const response = await axios.get(`${uploadDataApi}/datapublicationlist`);
      setDataList(response.data.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`;
  };

  const filterData = dataList.filter(item => item.p_heading === 'micromirror');

  const columns = [
    {
      name: 'S.No',
      cell: (row, index) => index + 1,
      center: true
    },
    {
      name: 'Issue',
      selector: row => row.p_title,
      center: true
    },
    {
      name: 'Release Date',
      selector: row => formatDate(row.date),
      center: true
    },
    {
      name: 'Get report',
      cell: row => (
        <button className="get_report" onClick={() => handlePDFDownload(row.pdf_file)}>
          <i className="bi bi-eye-fill"></i> Get Report
        </button>
      ),
      center: true
    },
  ];

  // const handlePDFDownload = (pdf) => {
  //   const pdfUrl = `https://api.mfinindia.org/public/${pdf}`;
  //   const viewerUrl = `https://docs.google.com/viewer?url=${pdfUrl}&embedded=true`;
  //   window.open(viewerUrl, '_blank');
  // }

  // const handlePDFDownload = (pdf) => {
  //   const parts = pdf.split("/");
  //   const folder = parts[0];
  //   const filename = parts.slice(1).join("/"); // in case of nested folders
  //   const encodedFilename = encodeURIComponent(filename);
  //   const url = `https://api.mfinindia.org/public/${folder}/${encodedFilename}#toolbar=0&navpanes=0&scrollbar=0`;
  //   window.open(url, "_blank");
  // };

  const handlePDFDownload = (pdf) => {
    const parts = pdf.split("/");
    const filename = parts.slice(1).join("/"); // Remove 'pdf_files/' prefix
    console.log("filename", filename);
    navigate(`/secure-pdf/${encodeURIComponent(filename)}`);
   };

  return (
    <div className="row container-outs">
      <div role="presentation" className="mb-4">
        <Breadcrumb
          title="MicroMirror"

          secondTitle="Publication"
          secondUrl="/datapublicationcard"
          second={true}
          icon={GrassIcon}
        />
      </div>

      <div className="col-sm-8">
        <DataTable
          columns={columns}
          data={filterData}
          pagination
        />
      </div>
      <div className="col-sm-4 align-self-center">
        <h2 style={{
          fontWeight: 'bold',
          borderBottom: '3px solid #2b60ad',
          margin: '0 auto',
          width: '50%',
          paddingBottom: '8px',
          fontSize: '2rem',
          color: '#2b60ad',
          marginBottom: '2rem',

        }
        }>Latest Report</h2>
        {filterData.length > 0 && (
          <div className="container-in-matter">
            <div className="top-content">
              <p>
                <button onClick={() => handlePDFDownload(filterData[0].pdf_file)}>
                  <i className="bi bi-eye-fill"></i> View Report
                </button>
              </p>
            </div>
            <div
              className="backimg"
              style={{
                backgroundImage: `url("https://api.mfinindia.org/public/${filterData[0].image}")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                borderRadius: "10px",
              }}
            >
              <div className="dataas">
                <p>{formatDate(filterData[0].date)}</p> {/* Use formatDate for proper date format */}
              </div>
            </div>

            <div className="title">
              <p>{filterData[0].p_title}</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default MicromirrorResource;








