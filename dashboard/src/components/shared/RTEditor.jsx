import { CKEditor } from "@ckeditor/ckeditor5-react";
import CKEditorBuild from './ckeditor/ckeditor/build/ckeditor';

const RTEditor = ({ value, onChange, ...props }) => {
  return (
    <CKEditor
      editor={CKEditorBuild.Editor}
      data={value}
      onChange={(event, editor) => {
        onChange?.(editor.getData());
      }}
    />
  );
};

export default RTEditor;
