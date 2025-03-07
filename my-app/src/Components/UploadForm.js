import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";

const UploadForm = ({ onUploadSuccess }) => {
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to upload.");
      return;
    }

    try {
      if (file) {
        // If a file is selected
        const formData = new FormData();
        formData.append("file", file);
        formData.append("course_code", courseCode);
        formData.append("description", description);
        formData.append("tags", tags);

        await axios.post("http://127.0.0.1:5000/uploads", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Upload successful!");
        onUploadSuccess(); // Callback to refresh data after upload
        setCourseCode("");
        setDescription("");
        setTags("");
        setFile(null);
      } else {
        alert("Please select a file.");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 413) {
        alert("File size exceeds the maximum limit of 16 MB.");
      } else {
        alert("Error uploading. Please try again.");
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upload a File (Max: 16 MB)
      </Typography>
      
      {/* Course Code */}
      <TextField
        label="Course Code"
        fullWidth
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
        margin="normal"
        required
      />
      
      {/* Description */}
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        required
      />
      
      {/* Tags */}
      <TextField
        label="Tags (comma-separated)"
        fullWidth
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        margin="normal"
      />
      
      {/* File Upload */}
      <Typography variant="body1" sx={{ mt: 2 }}>
        Upload File:
      </Typography>
      <input type="file" onChange={handleFileChange} style={{ marginBottom: "16px" }} />
      
      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default UploadForm;
