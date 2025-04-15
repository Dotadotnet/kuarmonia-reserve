// /**
//  * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
//  * https://ckeditor.com/ckeditor-5/builder/#installation/NoNgNARATAdArDADBSBGRAWOHVUYgdl1QIKigA4NE4yCQoQLVmKBmKMiuATh4LYgUEAKYA7FIjDBUYKVNkKAupDYBjRFABmiIUqA
//  */

// import { useState, useEffect, useRef, useMemo } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import {
// 	ClassicEditor,
// 	Alignment,
// 	Autoformat,
// 	AutoImage,
// 	Autosave,
// 	Base64UploadAdapter,
// 	BlockQuote,
// 	Bold,
// 	Bookmark,
// 	CloudServices,
// 	Code,
// 	CodeBlock,
// 	Emoji,
// 	Essentials,
// 	FontBackgroundColor,
// 	FontColor,
// 	FontFamily,
// 	FontSize,
// 	GeneralHtmlSupport,
// 	Heading,
// 	Highlight,
// 	ImageBlock,
// 	ImageCaption,
// 	ImageInline,
// 	ImageInsert,
// 	ImageInsertViaUrl,
// 	ImageResize,
// 	ImageStyle,
// 	ImageTextAlternative,
// 	ImageToolbar,
// 	ImageUpload,
// 	Indent,
// 	IndentBlock,
// 	Italic,
// 	Link,
// 	LinkImage,
// 	List,
// 	ListProperties,
// 	Mention,
// 	Paragraph,
// 	PlainTableOutput,
// 	RemoveFormat,
// 	SourceEditing,
// 	SpecialCharacters,
// 	SpecialCharactersArrows,
// 	SpecialCharactersCurrency,
// 	SpecialCharactersEssentials,
// 	SpecialCharactersLatin,
// 	SpecialCharactersMathematical,
// 	SpecialCharactersText,
// 	Strikethrough,
// 	Subscript,
// 	Superscript,
// 	Table,
// 	TableCaption,
// 	TableCellProperties,
// 	TableColumnResize,
// 	TableLayout,
// 	TableProperties,
// 	TableToolbar,
// 	TextTransformation,
// 	TodoList,
// 	Underline
// } from 'ckeditor5';

// import 'ckeditor5/ckeditor5.css';


// const LICENSE_KEY =
// 	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzYyMTExOTksImp0aSI6Ijg1ZGM4ZTNhLTk1NDAtNGY5Yy05YjY4LTg4NTNjMjE5NDE3OSIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiNjAzNzRiZTcifQ.5CJB9WjYh1Mf-3P6_Dt91LSh2DbkxgLrWbwAqrResXXDLPeJKTekh1HfINGdWnCHIEqfYQGV4xIPPJVGaZOlYg';

// export default function App() {
// 	const editorContainerRef = useRef(null);
// 	const editorRef = useRef(null);
// 	const [isLayoutReady, setIsLayoutReady] = useState(false);

// 	useEffect(() => {
// 		setIsLayoutReady(true);

// 		return () => setIsLayoutReady(false);
// 	}, []);

// 	const { editorConfig } = useMemo(() => {
// 		if (!isLayoutReady) {
// 			return {};
// 		}

// 		return {
// 			editorConfig: {
// 				toolbar: {
// 					items: [
// 						'sourceEditing',
// 						'|',
// 						'heading',
// 						'|',
// 						'fontSize',
// 						'fontFamily',
// 						'fontColor',
// 						'fontBackgroundColor',
// 						'|',
// 						'bold',
// 						'italic',
// 						'underline',
// 						'strikethrough',
// 						'subscript',
// 						'superscript',
// 						'code',
// 						'removeFormat',
// 						'|',
// 						'emoji',
// 						'specialCharacters',
// 						'link',
// 						'bookmark',
// 						'insertImage',
// 						'insertTable',
// 						'insertTableLayout',
// 						'highlight',
// 						'blockQuote',
// 						'codeBlock',
// 						'|',
// 						'alignment',
// 						'|',
// 						'bulletedList',
// 						'numberedList',
// 						'todoList',
// 						'outdent',
// 						'indent'
// 					],
// 					shouldNotGroupWhenFull: false
// 				},
// 				plugins: [
// 					Alignment,
// 					Autoformat,
// 					AutoImage,
// 					Autosave,
// 					Base64UploadAdapter,
// 					BlockQuote,
// 					Bold,
// 					Bookmark,
// 					CloudServices,
// 					Code,
// 					CodeBlock,
// 					Emoji,
// 					Essentials,
// 					FontBackgroundColor,
// 					FontColor,
// 					FontFamily,
// 					FontSize,
// 					GeneralHtmlSupport,
// 					Heading,
// 					Highlight,
// 					ImageBlock,
// 					ImageCaption,
// 					ImageInline,
// 					ImageInsert,
// 					ImageInsertViaUrl,
// 					ImageResize,
// 					ImageStyle,
// 					ImageTextAlternative,
// 					ImageToolbar,
// 					ImageUpload,
// 					Indent,
// 					IndentBlock,
// 					Italic,
// 					Link,
// 					LinkImage,
// 					List,
// 					ListProperties,
// 					Mention,
// 					Paragraph,
// 					PlainTableOutput,
// 					RemoveFormat,
// 					SourceEditing,
// 					SpecialCharacters,
// 					SpecialCharactersArrows,
// 					SpecialCharactersCurrency,
// 					SpecialCharactersEssentials,
// 					SpecialCharactersLatin,
// 					SpecialCharactersMathematical,
// 					SpecialCharactersText,
// 					Strikethrough,
// 					Subscript,
// 					Superscript,
// 					Table,
// 					TableCaption,
// 					TableCellProperties,
// 					TableColumnResize,
// 					TableLayout,
// 					TableProperties,
// 					TableToolbar,
// 					TextTransformation,
// 					TodoList,
// 					Underline
// 				],
// 				fontFamily: {
// 					supportAllValues: true
// 				},
// 				fontSize: {
// 					options: [10, 12, 14, 'default', 18, 20, 22],
// 					supportAllValues: true
// 				},
// 				heading: {
// 					options: [
// 						{
// 							model: 'paragraph',
// 							title: 'Paragraph',
// 							class: 'ck-heading_paragraph'
// 						},
// 						{
// 							model: 'heading1',
// 							view: 'h1',
// 							title: 'Heading 1',
// 							class: 'ck-heading_heading1'
// 						},
// 						{
// 							model: 'heading2',
// 							view: 'h2',
// 							title: 'Heading 2',
// 							class: 'ck-heading_heading2'
// 						},
// 						{
// 							model: 'heading3',
// 							view: 'h3',
// 							title: 'Heading 3',
// 							class: 'ck-heading_heading3'
// 						},
// 						{
// 							model: 'heading4',
// 							view: 'h4',
// 							title: 'Heading 4',
// 							class: 'ck-heading_heading4'
// 						},
// 						{
// 							model: 'heading5',
// 							view: 'h5',
// 							title: 'Heading 5',
// 							class: 'ck-heading_heading5'
// 						},
// 						{
// 							model: 'heading6',
// 							view: 'h6',
// 							title: 'Heading 6',
// 							class: 'ck-heading_heading6'
// 						}
// 					]
// 				},
// 				htmlSupport: {
// 					allow: [
// 						{
// 							name: /^.*$/,
// 							styles: true,
// 							attributes: true,
// 							classes: true
// 						}
// 					]
// 				},
// 				image: {
// 					toolbar: [
// 						'toggleImageCaption',
// 						'imageTextAlternative',
// 						'|',
// 						'imageStyle:inline',
// 						'imageStyle:wrapText',
// 						'imageStyle:breakText',
// 						'|',
// 						'resizeImage'
// 					]
// 				},
// 				initialData:
// 					'',
// 				licenseKey: LICENSE_KEY,
// 				link: {
// 					addTargetToExternalLinks: true,
// 					defaultProtocol: 'https://',
// 					decorators: {
// 						toggleDownloadable: {
// 							mode: 'manual',
// 							label: 'Downloadable',
// 							attributes: {
// 								download: 'file'
// 							}
// 						}
// 					}
// 				},
// 				list: {
// 					properties: {
// 						styles: true,
// 						startIndex: true,
// 						reversed: true
// 					}
// 				},
// 				mention: {
// 					feeds: [
// 						{
// 							marker: '@',
// 							feed: [
// 								/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
// 							]
// 						}
// 					]
// 				},
// 				placeholder: 'متن خودتون بنویسین',
// 				table: {
// 					contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
// 				}
// 			}
// 		};
// 	}, [isLayoutReady]);

// 	return (
// 		<div className="main-container">
// 			<div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
// 				<div className="editor-container__editor">
// 					<div ref={editorRef}>{editorConfig && <CKEditor editor={ClassicEditor} config={editorConfig} />}</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
