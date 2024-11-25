import { useState } from "react";
import Header from "../components/Header";

export default function Upload() {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [uploadResponse, setUploadResponse] = useState("");
  const [filename, setFilename] = useState("example.md");

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
    <div>
      <Header />
      <h1>Upload</h1>
      <form onSubmit={handleUploadSubmit} encType="multipart/form-data">
        <input type="file" name="markdownFile" accept=".md" required />
        <input type="text" name="targetDir" defaultValue="/" />
        <button type="submit">Upload</button>
      </form>
      <div>{uploadResponse}</div>
    </div>
  );
}
