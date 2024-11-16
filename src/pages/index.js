import { useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

export default function Home() {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [uploadResponse, setUploadResponse] = useState("");
  const [content, setContent] = useState("");
  const [targetDir, setTargetDir] = useState("/");
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

  const handleFetchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${URL}/markdown?file=${encodeURIComponent(filename)}`
      );
      const data = await response.json();
      const sanitizedMarkdown = DOMPurify.sanitize(data.content);
      setContent(marked(sanitizedMarkdown));
    } catch (error) {
      setContent(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleUploadSubmit} encType="multipart/form-data">
        <input type="file" name="markdownFile" accept=".md" required />
        <input type="text" name="targetDir" defaultValue="/" />
        <button type="submit">Upload</button>
      </form>
      <div dangerouslySetInnerHTML={{ __html: uploadResponse }}></div>

      <h1>View</h1>
      <form onSubmit={handleFetchSubmit}>
        <label for="file">Markdown File Name:</label>
        <input
          type="text"
          id="file"
          name="file"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          required
        />
        <button type="submit">Fetch Markdown</button>
      </form>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}
