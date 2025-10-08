// import React from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const RichTextEditor = ({ name, value, onChange, required }) => {
//   const handleEditorChange = (content) => {
//     // Simulate a synthetic event for consistency with handleChange
//     const event = {
//       target: {
//         name,
//         value: content,
//         type: "quill",
//       },
//     };
//     onChange(event);
//   };

//   return (
//     <ReactQuill
//       value={value || ""}
//       onChange={handleEditorChange}
//       modules={{
//         toolbar: [
//           [{ header: [1, 2, 3, 4, 5, 6, false] }],
//           ["bold", "italic", "underline", "strike"],
//           [{ color: [] }, { background: [] }],
//           [{ list: "ordered" }, { list: "bullet" }],
//           [{ script: "sub" }, { script: "super" }],
//           [{ indent: "-1" }, { indent: "+1" }],
//           [{ direction: "rtl" }],
//           ["blockquote", "code-block"],
//           ["link", "image"],
//           [{ align: [] }],
//           [{ size: ["small", false, "large", "huge"] }],
//           ["clean"],
//         ],
//       }}
//       theme="snow"
//       formats={[
//         "header",
//         "font",
//         "size",
//         "bold",
//         "italic",
//         "underline",
//         "strike",
//         "color",
//         "background",
//         "script",
//         "list",
//         "bullet",
//         "indent",
//         "direction",
//         "align",
//         "blockquote",
//         "code-block",
//         "link",
//         "image",
//       ]}
//       style={{ height: "350px", marginBottom: "50px" }}
//     />
//   );
// };

// export default RichTextEditor;
