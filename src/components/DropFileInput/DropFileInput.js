import React, { useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";


function DropFileInput(props) {
    const files = props.file;
    const setFiles = props.setFile;



const baseStyle = {
    height: '10vh',
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };
  
  const focusedStyle = {
    borderColor: "#2196f3",
  };
  
  const acceptStyle = {
    borderColor: "#00e676",
  };
  
  const rejectStyle = {
    borderColor: "#ff1744",
  };
  
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };
  const thumb = {
      display: "inline-flex",
      borderRadius: 2,
      border: "1px solid #eaeaea",
      marginBottom: 8,
      marginRight: 8,
      width: 100,
      height: 100,
      padding: 4,
      boxSizing: "border-box",
      position: "relative",
    };
    
  const deleteButton = {
      position: "absolute",
      top: 4,
      right: 4,
      backgroundColor: "white",
      color: "black",
      border: "none",
      cursor: "pointer",
    };
  
  
  const thumbs = files.map((file, index) => (
    <div style={thumb} key={file.name}>
      <button
        style={deleteButton}
        onClick={() => {
          const newFiles = [...files];
          newFiles.splice(index, 1);
          setFiles(newFiles);
        }}
      >
        X
      </button>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));
  
  
  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };
  
  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };
  
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/png": [".png", ".jpg", ".jpeg"],
      },
      maxFiles: 1,
      maxSize: 25 * 1024 * 1024, // 25 MB in bytes
      onDrop: (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
          // Display a toaster notification if a file is rejected due to size
          toast.error('File size limit exceeded. Please upload a file under 25MB.', {
          style: {
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.01)",
          },
          position: "top-center",
        });
        } else {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        }
      },
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isFocused,
        isDragAccept,
        isDragReject
      ]);



  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);


  return (
    <>
    <section className="">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>

    <Toaster containerStyle={{ top: "50px" }} />

</>

  );
}

export default DropFileInput;
