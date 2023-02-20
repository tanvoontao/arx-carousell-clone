'use client'
import { useState, useRef, useEffect } from "react"
import { BiUpload as UploadIcon } from "react-icons/bi"
import { useDropzone } from 'react-dropzone';

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
    objectFit: 'cover'
};

const maxLength = 20;

const validateName = (file) => {
    if (file.name?.length > maxLength) {
        return {
            code: "name-too-large",
            message: `Name is larger than ${maxLength} characters`
        };
    }
    return null
}

const DropZoneUpload = (props) => {
    const { setImages, maxFiles } = props;

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        maxFiles: maxFiles,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        },
        validator: validateName,
        onDrop: (acceptedFiles, fileRejections) => {
            acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }));
            fileRejections.map((file) => Object.assign(file.file, {
                preview: URL.createObjectURL(file.file)
            }));
            setImages(acceptedFiles);
        }
    });




    const convertToMegaBytes = (num) => {
        num = Math.round((num / 1024 / 1024) * 100) / 100;
        return num
    }

    const dropRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        dropRef.current.classList.remove("border-dashed");
        dropRef.current.classList.add("border-solid");
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        dropRef.current.classList.add("border-dashed");
        dropRef.current.classList.remove("border-solid");
    };




    const acceptedFileItemsForTable = acceptedFiles.map(file => (
        <tr key={file.path}>
            <td>
                <div style={thumb}>
                    <div style={thumbInner}>
                        <img
                            src={file.preview}
                            style={img}
                            // Revoke data uri after image is loaded
                            onLoad={() => { URL.revokeObjectURL(file.preview) }}
                        />
                    </div>
                </div>
            </td>
            <td>{file.path}</td>
            <td>{convertToMegaBytes(file.size)} mb</td>
        </tr>
    ));

    const fileRejectionItemsForTable = fileRejections.map(({ file, errors }) => (

        <tr key={file.path}>
            <td>
                <div style={thumb}>
                    <div style={thumbInner}>
                        <img
                            src={file.preview}
                            style={img}
                            // Revoke data uri after image is loaded
                            onLoad={() => { URL.revokeObjectURL(file.preview) }}
                        />
                    </div>
                </div>
            </td>
            <td>{file.path.length > 20 ? `${file.path.substring(0, 20)}...` : file.path}</td>
            <td>{convertToMegaBytes(file.size)} mb</td>
            <td>
                <ul>
                    {errors.map(e => (
                        <li key={e.code}>{e.message}</li>
                    ))}
                </ul>
            </td>
        </tr>

    ));


    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => acceptedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);


    return (
        <>
            <section className="w-full" >
                <div
                    {...getRootProps({ className: 'dropzone  group p-2 rounded border-dashed border-4 border-gray-300 flex items-center justify-center flex-col cursor-pointer text-center hover:border-solid' })}
                    ref={dropRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <input
                        {...getInputProps()}
                    />

                    <UploadIcon size={30} className="cursor-pointer" />
                    <p className='group-hover:text-yellow1'>Max {maxFiles} images</p>
                    <p className='group-hover:text-yellow1'>🫳 Click or Drag & Drop to upload images</p>
                </div>

                {acceptedFiles?.length > 0 &&
                    <>
                        <p>Accepted Files</p>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left">Image</th>
                                    <th className="text-left">File Name</th>
                                    <th className="text-left">Size</th>
                                </tr>
                            </thead>
                            <tbody>
                                {acceptedFileItemsForTable}
                            </tbody>
                        </table>
                    </>
                }

                {fileRejections?.length > 0 &&
                    <>
                        <p className="text-red-400">Rejected Files</p>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left">Image</th>
                                    <th className="text-left">File Name</th>
                                    <th className="text-left">Size</th>
                                    <th className="text-left">Errors</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fileRejectionItemsForTable}
                            </tbody>
                        </table>
                    </>
                }

            </section>
        </>
    )
}

export default DropZoneUpload
