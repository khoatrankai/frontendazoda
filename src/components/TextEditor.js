import Editor from "ckeditor5-custom-build";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { data } from "jquery";

export default function TextEditor({name,value,setDataChange,disabled}){
    const editorConfiguration = {
        toolbar: {
            items:[
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'imageUpload',
                'insertTable',
                'mediaEmbed',
                'undo',
                'redo',
                'alignment',
                'fontSize',
                'horizontalLine',
            ]
        },
        language: 'en',
        image:{
            toolbar: [
                'imageTextAlternative',
                'toggleImageCaption',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells'
            ]
        }
    };

    return (
        <>
            <CKEditor
                editor={Editor}
                config={editorConfiguration}
                disabled={disabled}
                data={value}
                onChange={(e,editor)=>{
                    // console.log(name)
                    const data = editor.getData()
                    setDataChange(name,data)
                }}
            />

          
        </>
    )
}