import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import MDBox from "shared-ui/components/md/MDBox";
import MDTypography from "shared-ui/components/md/MDTypography";
import axiosInstance from "shared-ui/commons/axiosInstance";
import { ServiceApi } from 'commons/enums/ServiceApi';

function FileDropzone({ currentValue, onUpload, acceptedTypes = "images", uploadFolder, uploadUrl }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState(currentValue || null);

  useEffect(() => {
    if (currentValue) {
      setSelectedUrl(currentValue);
    }
  }, [currentValue]);

  const uploadFileAndGetUrl = async (file, folder, url) => {
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder || "uploads");

      try {
        const response = await axiosInstance.post(url || ServiceApi.file.UPLOAD.path, 
          formData, 
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        
        return response.data.url;
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
      }
    }
    return null;
  };

  const getAcceptedTypes = () => {
    switch (acceptedTypes) {
      case "images":
        return {
          "image/*": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".svg"]
        };
      case "documents":
        return {
          "application/pdf": [".pdf"],
          "application/vnd.ms-excel": [".xls"],
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
          "application/msword": [".doc"],
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
          "text/plain": [".txt"],
          "text/csv": [".csv"]
        };
       case "images":
        return {
          "image/*": [".jpg", ".jpeg", ".png"]
        };
      case "receipts":
        return {
          "application/pdf": [".pdf"],
          "text/plain": [".txt"],
          "image/*": [".jpg", ".jpeg", ".png"]
        };
      default:
        return {
          "image/*": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".svg"]
        };
    }
  };

  const handleDrop = async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      
      if (acceptedTypes === "images") {
        const previewUrl = URL.createObjectURL(file);
        setSelectedUrl(previewUrl);
      }
      
      if (onUpload) {
        try {
          const imageUrl = await uploadFileAndGetUrl(file, uploadFolder, uploadUrl || ServiceApi.file.UPLOAD.path);
          onUpload(imageUrl);
        } catch (error) {
          console.error("Error uploading file:", error);
          onUpload(file);
        }
      }
    }
  };

  return (
    <MDBox>
      <Dropzone
        onDrop={handleDrop}
        multiple={false}
        accept={getAcceptedTypes()}
        maxFiles={1}
      >
        {({ getRootProps, getInputProps }) => (
          <MDBox
            {...getRootProps()}
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "6px",
              padding: "1rem",
              margin: "0.5rem",
              textAlign: "center",
              cursor: "pointer",
              color: "#888",
            }}
          >
            <input {...getInputProps()} />
            {selectedUrl ? (
              <MDBox>
                {acceptedTypes === "images" ? (
                  <img 
                    src={selectedUrl} 
                    alt={selectedFile?.name || "Uploaded file"}
                    style={{
                      width: "100px",
                      height: "auto",
                      borderRadius: "4px",
                      marginBottom: "8px"
                    }}
                  />
                ) : (
                  <MDTypography variant="h6" sx={{ mb: 1 }}>
                    📄
                  </MDTypography>
                )}
                <MDTypography variant="caption" display="block">
                  {selectedFile?.name}
                </MDTypography>
              </MDBox>
            ) : (
              <MDTypography variant="body2" color="secondary">
                {acceptedTypes === "images" 
                  ? "Arraste uma imagem aqui ou clique para selecionar"
                  : "Arraste um documento aqui ou clique para selecionar"
                }
              </MDTypography>
            )}
          </MDBox>
        )}
      </Dropzone>
    </MDBox>
  );
}

FileDropzone.propTypes = {
  onUpload: PropTypes.func.isRequired,
  acceptedTypes: PropTypes.oneOf(["images", "documents"]),
  uploadFolder: PropTypes.string,
  uploadUrl: PropTypes.string,
};

export default FileDropzone;
