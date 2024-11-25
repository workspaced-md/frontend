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
      // Handle click-to-select
      const fileList = acceptedFiles.map((file) => ({
        file,
        path: file.webkitRelativePath || file.name, // Use relative path for folders
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
    <ul style={{ marginLeft: level * 20 + "px" }}>
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
    <div>
      <h2>Upload Files or Folders</h2>
      <div
        {...getRootProps({
          style: {
            border: "2px dashed #ccc",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
          },
        })}
      >
        {/* Add webkitdirectory for folder selection */}
        <input {...getInputProps()} webkitdirectory="true" directory="true" />
        {isDragActive ? (
          <p>Drop files or folders here...</p>
        ) : (
          <p>Drag 'n' drop files or folders here, or click to select files</p>
        )}
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Folder Structure:</h4>
          {renderFileTree(fileTree)}
        </div>
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
