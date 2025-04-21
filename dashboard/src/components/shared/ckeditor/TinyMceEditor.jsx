import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class TinyMceEditor extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event, editor) {
    const data = editor.getData();
    // انتقال داده به والد (مثلاً برای ذخیره در state)
    const { onChange } = this.props;  // اینجا باید تابع onChange از props گرفته بشه
    if (onChange) {
      onChange(data);
    }
  }

  static defaultConfig = {
    language: "fa", // ← این خط را اضافه کن
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "blockQuote",
      "ckfinder",
      "|",
      "imageUpload",
      "resizeImage",
      "mediaEmbed",
      "insertTable",
      "|",
      "undo",
      "redo"
    ]
  };
  

  render() {
    return (
      <div className="ckeditor-wrapper">
        <CKEditor
          editor={ClassicEditor}
          config={TinyMceEditor.defaultConfig}
          data={this.props.value} // مقدار value را از props می‌گیریم
          onChange={this.onChange} // متد onChange را به CKEditor می‌دهیم
          onInit={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
        />
      </div>
    );
  }
}

export default TinyMceEditor;
