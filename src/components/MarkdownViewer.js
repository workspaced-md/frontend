import { useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

export default function MarkdownViewer() {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [content, setContent] = useState("");
  const [filename, setFilename] = useState("example.md");

  const handleFetchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${URL}/markdown?file=${encodeURIComponent(filename)}`,
      );
      const data = await response.json();
      const sanitizedMarkdown = DOMPurify.sanitize(data.content);
      setContent(marked(sanitizedMarkdown));
    } catch (error) {
      setContent(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <h1>View</h1>
      <form onSubmit={handleFetchSubmit}>
        <label for="file">Markdown File Name: </label>
        <input
          type="text"
          id="file"
          name="file"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Fetch Markdown</button>
      </form>

      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </>
  );
}
