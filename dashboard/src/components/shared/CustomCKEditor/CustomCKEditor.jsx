// src/components/shared/ckeditor/CustomEditor.jsx
import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

// اینجا build سفارشی رو وارد می‌کنیم
import CustomEditor from "../../../../custom-ckeditor/src/ckeditor";

class CustomEditorComponent extends Component {
  onChange = (event, editor) => {
    const data = editor.getData();
    this.props.onChange?.(data);
  };

  render() {
    return (
      <CKEditor
        editor={CustomEditor}
        data={this.props.value}
        config={{
          language: "fa", // اگه فارسی اضافه کردی
        }}
        onChange={this.onChange}
      />
    );
  }
}

export default CustomEditorComponent;
