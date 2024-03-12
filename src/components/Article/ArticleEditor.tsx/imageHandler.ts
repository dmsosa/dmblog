import { ContextStore, TextAreaTextApi, TextState } from "@uiw/react-md-editor";
import { ClipboardEvent, DragEvent, SetStateAction } from "react";

export async function onImagePasted({ dataTransfer, onChange } : {
    dataTransfer: DataTransfer,
    onChange: (name?: string | undefined, e?: React.ChangeEvent<HTMLTextAreaElement> | undefined, state?: ContextStore | undefined) => void
}) {
    const reader = new FileReader();
    const files: File[] = []
    for (let index = 0; index < dataTransfer.items.length ; index++)  {
        const file = dataTransfer.files.item(index);
        if (file) {
            files.push(file);
        }
    }
    await Promise.all(
        files.map( (file) => {
            console.log(file);
            reader.onload = function(){
                var dataURL = reader.result;
                const insertedMarkdown = insertIntoTextArea(`![](${dataURL})`);
                if (!insertedMarkdown) {
                    return;
                }
                onChange(insertedMarkdown);
            }
            reader.readAsDataURL(file);
            const url = "cloudinary";

        })
    );
}



function insertIntoTextArea(text: string ): string | null {
    const textarea = document.getElementById("md-editor") as HTMLTextAreaElement;
    if (!textarea) {
        return null;
    }
    let sentence = textarea.value;
    const len = sentence.length;
    const pos = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const front = sentence.slice(0, pos);
    const back = sentence.slice(end, len);

    sentence = front + text + back;
    textarea.value = sentence;

    textarea.selectionEnd = end + text.length;
    
    return sentence;
}