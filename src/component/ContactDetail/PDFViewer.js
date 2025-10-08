import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PdfViewer = () => {
    const { filename } = useParams();
    const decodedFilename = decodeURIComponent(filename);
    const pdfUrl = `https://api.mfinindia.org/public/${decodedFilename}`;
    const googleViewerUrl = `https://docs.google.com/gview?url=${pdfUrl}&embedded=true`;

    useEffect(() => {
        const disableShortcuts = (e) => {
            if (
                (e.ctrlKey && (e.key === 'p' || e.key === 's')) || // Ctrl+P, Ctrl+S
                e.key === 'F12'
            ) {
                e.preventDefault();
                alert("This action is disabled!");
            }
        };

        const disableRightClick = (e) => e.preventDefault();

        document.addEventListener('keydown', disableShortcuts);
        document.addEventListener('contextmenu', disableRightClick);

        return () => {
            document.removeEventListener('keydown', disableShortcuts);
            document.removeEventListener('contextmenu', disableRightClick);
        };
    }, []);

    return (
        <div style={{ height: "100vh" }}>
            <iframe
                src={googleViewerUrl}
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Secure PDF Viewer"
            ></iframe>
        </div>
    );
};

export default PdfViewer;
