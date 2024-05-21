"use client";
import React from "react";
import { Editor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
const EditorComponent = ({
  code,
  language,
}: {
  code: string;
  language: string;
}) => {
  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editor.updateOptions({
      readOnly: true,
    });
  };

  return (
    <div className="flex flex-col items-end gap-4 mt-4">
      <div className="flex items-center gap-2 font-Raleway">
        <h1 className="text-white">Language: </h1>
        <span className="bg-backgroundAccentDark text-white  sm:text-lg px-4 py-2 rounded-lg">
          {language}
        </span>
      </div>
      <Editor
        defaultLanguage={language}
        height={"50vh"}
        width={"800px"}
        defaultValue={code}
        onMount={onMount}
        theme="vs-dark"
      />
    </div>
  );
};

export default EditorComponent;
