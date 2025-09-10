import { forwardRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ckeditor-dark.css';

const RTEditor = forwardRef(({ value, onChange, ...props }, ref) => {
    return (
        <div className={`px-3 bg-white dark:bg-gray-800 relative`} dir="rtl">
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={(event, editor) => {
                    onChange?.(editor.getData());
                }}
                config={{
                    language: 'fa',
                    toolbar: [
                        'undo',
                        'redo',
                        'bold',
                        'italic',
                        'link',
                        'imageUpload',
                        'fullscreen', // دکمه fullscreen
                    ],
                }}
            />
        </div>
    );
});

export default RTEditor;
