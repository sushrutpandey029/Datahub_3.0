
import React, { useState, useEffect, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./RichTextEditor.css";

const RichTextEditor = ({ name, value = "", onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [initialized, setInitialized] = useState(false);
  const editorRef = useRef(null);
  const lastHtmlRef = useRef("");

  useEffect(() => {
    // Only initialize once with the initial value
    if (!initialized && value !== lastHtmlRef.current) {
      initializeEditor(value);
      setInitialized(true);
      return;
    }

    // Handle subsequent updates only if value changed
    if (initialized && value !== lastHtmlRef.current) {
      updateEditorContent(value);
    }
  }, [value, initialized]);

  const initializeEditor = (html) => {
    lastHtmlRef.current = html;

    if (!html) {
      setEditorState(EditorState.createEmpty());
      return;
    }

    try {
      const cleanValue = sanitizeHtml(html);
      const contentBlock = htmlToDraft(cleanValue);

      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
          contentBlock.entityMap
        );
        setEditorState(EditorState.createWithContent(contentState));
      }
    } catch (error) {
      console.error("Error initializing editor:", error);
      setEditorState(EditorState.createEmpty());
    }
  };

  const updateEditorContent = (html) => {
    lastHtmlRef.current = html;

    if (!html) {
      setEditorState(EditorState.createEmpty());
      return;
    }

    try {
      const cleanValue = sanitizeHtml(html);
      const contentBlock = htmlToDraft(cleanValue);

      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
          contentBlock.entityMap
        );

        // Preserve current selection if editor is focused
        const selection = editorState.getSelection();
        const newEditorState = EditorState.createWithContent(contentState);

        if (editorRef.current.editor.contains(document.activeElement)) {
          setEditorState(EditorState.forceSelection(newEditorState, selection));
        } else {
          setEditorState(newEditorState);
        }
      }
    } catch (error) {
      console.error("Error updating editor content:", error);
    }
  };

  const sanitizeHtml = (html) => {
    if (!html) return "";
    // Remove RTL control characters and fix common HTML issues
    return html
      .replace(/[\u202A-\u202E\u200E\u200F\u061C]/g, "")
      .replace(/<br\s*\/?>/gi, "<br>")
      .replace(/&nbsp;/g, " ");
  };

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);

    const content = newEditorState.getCurrentContent();
    const htmlContent = content.hasText()
      ? draftToHtml(convertToRaw(content))
      : "";

    lastHtmlRef.current = htmlContent;
    onChange({
      target: {
        name,
        value: htmlContent,
        type: "html",
      },
    });
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        direction: "ltr",
        unicodeBidi: "isolate",
      }}
    >
      <Editor
        ref={editorRef}
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        editorStyle={{
          direction: "ltr",
          textAlign: "left",
          unicodeBidi: "plaintext",
          backgroundColor: "#fff",
          padding: "10px",
          minHeight: "200px",
          maxHeight: "300px",
          whiteSpace: "pre-wrap",
        }}
        textAlignment="left"
        toolbar={{
          options: ["inline", "list", "textAlign", "link", "history"],
          textAlign: { inDropdown: false },
        }}
      />
    </div>
  );
};

export default RichTextEditor;
