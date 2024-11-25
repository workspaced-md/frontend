import React, { useState } from "react";

export default function Upload() {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [uploadResponse, setUploadResponse] = useState("");

  const handleUploadSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await fetch(`${URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.text();
      setUploadResponse(data);
    } catch (error) {
      setUploadResponse(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleUploadSubmit} encType="multipart/form-data">
        <input type="file" name="markdownFile" accept=".md" required />
        <input type="text" name="targetDir" defaultValue="/" />
        <button type="submit">Upload</button>
      </form>
      <div>{uploadResponse}</div>
    </>
  );
}
