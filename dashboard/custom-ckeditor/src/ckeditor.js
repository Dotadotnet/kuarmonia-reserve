import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

// Plugins to include in the build:
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Bold, Italic, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Undo } from '@ckeditor/ckeditor5-undo';

export default class CustomEditor extends ClassicEditorBase {}

CustomEditor.builtinPlugins = [
  Essentials,
  Bold,
  Italic,
  Underline,
  Paragraph,
  Undo
];

CustomEditor.defaultConfig = {
  toolbar: {
    items: [
      'bold',
      'italic',
      'underline',
      '|',
      'undo',
      'redo'
    ]
  },
  language: 'fa',
};
