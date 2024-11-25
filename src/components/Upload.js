import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Upload() {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [files, setFiles] = useState([]);
  const [uploadResponse, setUploadResponse] = useState("");

  // Recursively process folder entries
  const readEntry = (entry) =>
    new Promise((resolve) => {
      if (entry.isFile) {
        entry.file((file) => resolve({ file, path: entry.fullPath }));
      } else if (entry.isDirectory) {
        const reader = entry.createReader();
        const entries = [];
        const readEntries = () => {
          reader.readEntries(async (batch) => {
            if (!batch.length) {
              const children = await Promise.all(entries.map(readEntry));
              resolve(children.flat());
            } else {
              entries.push(...batch);
              readEntries();
            }
          });
        };
        readEntries();
      }
    });

  // Process dropped items (files or folders)
  const processItems = async (items) => {
    const entries = [];
    for (const item of items) {
      const entry = item.webkitGetAsEntry();
      if (entry) {
        entries.push(readEntry(entry));
      }
    }
    const allFiles = await Promise.all(entries);
    return allFiles.flat();
  };

  // Handle file drop or folder selection
  const onDrop = useCallback(async (acceptedFiles, rejectedFiles, event) => {
    if (event?.dataTransfer?.items) {
      // Handle drag-and-drop
      const items = event.dataTransfer.items;
      const fileList = await processItems(items);
      setFiles((prevFiles) => [...prevFiles, ...fileList]);
    } else {
      // Handle click-to-select (files only)
      const fileList = acceptedFiles.map((file) => ({
        file,
        path: file.name, // No folder structure for individual files
      }));
      setFiles((prevFiles) => [...prevFiles, ...fileList]);
    }
  }, []);

  // Initialize Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: false,
    noDragEventsBubbling: true,
  });

  // Build file tree
  const buildFileTree = (files) => {
    const tree = {};

    files.forEach(({ path }) => {
      const parts = path.replace(/^\//, "").split("/");
      let current = tree;

      parts.forEach((part, index) => {
        if (!current[part]) {
          current[part] = index === parts.length - 1 ? null : {};
        }
        current = current[part];
      });
    });

    return tree;
  };

  const fileTree = buildFileTree(files);

  // Render file tree
  const renderFileTree = (tree, level = 0) => (
    <ul>
      {Object.entries(tree).map(([name, subtree]) => (
        <li key={name}>
          {subtree === null ? (
            name
          ) : (
            <>
              {name}
              {renderFileTree(subtree, level + 1)}
            </>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div style={{ margin: "0 1rem" }}>
      <h2>Upload</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          {...getRootProps({
            style: {
              border: "2px dashed #ccc",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              width: "50%",
            },
          })}
        >
          <input type="file" multiple {...getInputProps()} />
          {isDragActive ? (
            <p>Drop files or folders here ...</p>
          ) : (
            <p>Drop files/folders here, or click to select files</p>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: "20px" }}>{renderFileTree(fileTree)}</div>
      )}

      {uploadResponse && (
        <div
          style={{
            marginTop: "20px",
            color: uploadResponse.startsWith("Success") ? "green" : "red",
          }}
        >
          {uploadResponse}
        </div>
      )}
    </div>
  );
}
