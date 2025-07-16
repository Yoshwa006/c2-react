// src/components/TextEditor.jsx
import React from "react";
import Editor from "@monaco-editor/react";

const languageMap = {
    cpp: "cpp",
    java: "java",
    python: "python",
    javascript: "javascript",
};

const TextEditor = ({
                        language = "java",
                        code = "",
                        onChange = () => {},
                        height = "500px",
                        readOnly = false,
                    }) => {
    const handleEditorChange = (value) => {
        onChange(value);
    };

    return (
        <div className="rounded-xl shadow-md border border-gray-300 overflow-hidden">
            <Editor
                height={height}
                defaultLanguage={languageMap[language] || "java"}
                defaultValue={code}
                value={code}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                    fontSize: 14,
                    readOnly: readOnly,
                    minimap: { enabled: false },
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default TextEditor;
