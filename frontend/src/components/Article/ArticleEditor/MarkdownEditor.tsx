// import { ChangeEvent, useState } from 'react';
// import MDEditor, {  ContextStore } from '@uiw/react-md-editor';
// import { onImagePasted } from './imageHandler';

// function MarkdownEditor({ body, handleChange } : {
//     body: string,
//     handleChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
// }) {
//     const [markdown, setMarkdown] = useState(body);
//     const onChange = (
//         name?: string | undefined,
//         e?: React.ChangeEvent<HTMLTextAreaElement> | undefined,
//         state?: ContextStore | undefined ) => {

//         if (!e ) return;
//         const newMarkdown = e.target.value;
//         setMarkdown(newMarkdown);
//         handleChange(e);
//     }

//     return (
//         <div className='markdown-editor'>
//             <MDEditor
//             value={body}
//             onChange={onChange}
//             onDrop={(e) => onImagePasted({dataTransfer: e.dataTransfer, onChange})}
//             onPaste={(e) => onImagePasted({dataTransfer: e.clipboardData, onChange})}
//             textareaProps={{id: "md-editor", name: "body", placeholder: "Write your wonderful article!"}}
//             />
//         </div>

//         )
// }

// export default MarkdownEditor;
