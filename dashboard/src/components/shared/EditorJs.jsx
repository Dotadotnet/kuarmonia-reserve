import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";

const EditorJs = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const holderRef = useRef("editorjs-container");

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: holderRef.current,
        tools: {
          header: Header,
          paragraph: Paragraph
        },
        data: value,
        onChange: async () => {
          const content = await editorRef.current.save();
          onChange(content);
        }
      });
    }

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return <div id={holderRef.current} className="min-h-[200px] border p-2 bg-white dark:bg-gray-800 rounded" />;
};

export default EditorJs;
