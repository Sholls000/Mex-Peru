import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function FileInput({label, onChange, title, accept, fileValue, htmlRef }) {
    const [selectedFile, setSelectedFile] = useState(fileValue || {});
    const _ref = useRef();


    useEffect(async () => {
        if(fileValue){
            setSelectedFile(fileValue);
        }
    }, []);

    const updateFile = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if(!file) return;

        let _selectedFile = {name: file.name, size: file.size, type: file.type};
        
        setSelectedFile(_selectedFile);

        reader.onloadend = () => {
            console.log("called onload end");
            _selectedFile.base64 = reader.result;
            setSelectedFile(_selectedFile);
            console.log({_selectedFile});
            onChange && _selectedFile.base64 && onChange(_selectedFile);
        };  
        reader.readAsDataURL(file);
        
    }

    const clearFile = ()=>{
        setSelectedFile({});
        onChange  && onChange({});
    }

    return (
       <> {(selectedFile && (selectedFile.size || selectedFile.fileRef)) ? 
            <div className="alert alert-gray alert-dismissible py-1">
            {selectedFile.fileRef? <a target="_blank" href={process.env.REACT_APP_API +`/api/files/loadfile/${selectedFile.fileRef}`}>View file</a>: selectedFile.name}
            {<button className="close" type="button" onClick={()=>clearFile()} ></button>}
           </div>: 
           <div className="custom-file">
            <input
                accept={accept || ".png, .jpg, .jpeg, application/pdf, *.pdf"}
                title={title || "Upload file"}
                type="file"
                className="custom-file-input"
                onChange={(e) => updateFile(e)}
                ref={htmlRef}
            />
            <label className="custom-file-label" htmlFor="customMultipleFiles">{selectedFile.name || label || "Choose file"}</label>
        </div>}</>
    );
}
