import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SecurePDFViewer() {
    const { filename } = useParams();
    const navigate = useNavigate();
    const containerRef = useRef();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndRenderPDF = async () => {
            if (!filename) return;

            try {
                setLoading(true);
                setError(null);

                // Build the dynamic URL
                const pdfUrl = `https://api.mfinindia.org/view-protected-pdf/${encodeURIComponent(filename)}`;

                // Clear container
                const container = containerRef.current;
                container.innerHTML = "";

                const pdfjsLib = window["pdfjsLib"];
                pdfjsLib.GlobalWorkerOptions.workerSrc =
                    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

                // Load and render
                const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const viewport = page.getViewport({ scale: 1.3 });

                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    container.appendChild(canvas);

                    await page.render({ canvasContext: context, viewport }).promise;
                }
            } catch (err) {
                console.error("Error rendering PDF", err);
                setError(err.message || "Failed to load PDF.");
            } finally {
                setLoading(false);
            }
        };

        fetchAndRenderPDF();

        // Disable right click
        const handleContextMenu = (e) => e.preventDefault();
        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, [filename]);

    useEffect(() => {
        const disableRightClick = (e) => e.preventDefault();

        const disableKeys = (e) => {
            if (
                e.key === "F12" ||
                (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
                (e.ctrlKey && (e.key === "U" || e.key === "S" || e.key === "C"))
            ) {
                e.preventDefault();
            }
        };

        document.addEventListener("contextmenu", disableRightClick);
        document.addEventListener("keydown", disableKeys);

        return () => {
            document.removeEventListener("contextmenu", disableRightClick);
            document.removeEventListener("keydown", disableKeys);
        };
    }, []);


    return (
        <div
            style={{
                padding: "1rem",
                maxHeight: "100vh",
                overflowY: "auto",
                background: "#f5f5f5",
            }}
        >
            <button
                onClick={() => navigate(-1)}
                style={{
                    marginBottom: "1rem",
                    background: "#2b60ad",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                }}
            >
                Back
            </button>

            {loading && <p>Loading PDF...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div ref={containerRef} />
        </div>
    );
}