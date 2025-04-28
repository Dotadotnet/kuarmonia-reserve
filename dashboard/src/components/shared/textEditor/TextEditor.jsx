import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '../../../ckeditor/ckeditor';
import "./Style.css"
const MyEditor = ({ value, onChange }) => {
  const [data, setData] = React.useState(() => value);

  React.useEffect(() => {
    setData(value);
  }, [value]);

  return (
    <div>
      <CKEditor
        editor={Editor}
        data={data}
        onChange={(event, editor) => {
          const value = editor.getData();
          setData(value);  
          onChange(value);  
        }}
      />
    </div>
  );
};

export default MyEditor;
