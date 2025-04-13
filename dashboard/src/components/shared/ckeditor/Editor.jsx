/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoNgNARATAdALDADBSIQE4CMm3qgDijgFZEQBmdEExM8+xYgdkRynMThQgFMA7FIjDBMYIUNESAupADGAQx6NmEKUA==
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";

import "./Editor.css";

const LICENSE_KEY =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzYxMjQ3OTksImp0aSI6IjNiMzFlYTIwLWRjY2MtNGNmNi05NjE5LTE2MjFhM2Q0YWFjNSIsImxpY2Vuc2VkSG9zdHMiOlsiZGFzaGJvYXJkLmt1YXJtb25pYS5jb20iXSwidXNhZ2VFbmRwb2ludCI6Imh0dHBzOi8vcHJveHktZXZlbnQuY2tlZGl0b3IuY29tIiwiZGlzdHJpYnV0aW9uQ2hhbm5lbCI6WyJjbG91ZCIsImRydXBhbCJdLCJmZWF0dXJlcyI6WyJEUlVQIiwiQk9YIl0sInZjIjoiMzZlMDMyNWEifQ.Z9Gzl4iIQSphIDMT8cGaddJYwbZGJMNGprFrxWNB0FlRzbj1hQeM2YEGcKa43iL9Z6-dHVDVNpFycf3QE7ARHg";

export default function Editor({ value, onChange }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const cloud = useCKEditorCloud({ version: "45.0.0" });

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { ClassicEditor, editorConfig } = useMemo(() => {
    if (cloud.status !== "success" || !isLayoutReady) {
      return {};
    }

    const {
      ClassicEditor,
      Autosave,
      BlockQuote,
      Bold,
      Essentials,
      Heading,
      Indent,
      IndentBlock,
      Italic,
      Link,
      Paragraph,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      Underline
    } = cloud.CKEditor;

    return {
      ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "link",
            "insertTable",
            "blockQuote",
            "|",
            "outdent",
            "indent"
          ],
          shouldNotGroupWhenFull: false
        },
        plugins: [
          Autosave,
          BlockQuote,
          Bold,
          Essentials,
          Heading,
          Indent,
          IndentBlock,
          Italic,
          Link,
          Paragraph,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          Underline
        ],
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph"
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1"
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2"
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3"
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4"
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5"
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6"
            }
          ]
        },
        initialData: "",
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file"
              }
            }
          }
        },
        placeholder: "Type or paste your content here!",
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties"
          ]
        }
      }
    };
  }, [cloud, isLayoutReady]);

  return (
    <div className="main-container">
      <div
        className="editor-container editor-container_classic-editor"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {ClassicEditor && editorConfig && (
              <CKEditor
                editor={ClassicEditor}
                data={value}
                config={editorConfig}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  onChange(data);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
