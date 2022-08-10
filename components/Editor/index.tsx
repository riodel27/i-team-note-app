import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import axios from "axios";

type propType = {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  content: string;
};

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "Start writing here !!!",
          level: 1,
        },
      },
    ],
  };
};
const EDITTOR_HOLDER_ID = "editorjs";

const Editor = (props: propType) => {
  const { setContent, content } = props;

  const isInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!isInstance.current) {
      initEditor();
    }
    return () => {
      if (isInstance.current) {
        isInstance.current.destroy();
        isInstance.current = null;
      }
    };
  }, []);

  const handleSaveNote = async () => {
    const data = await isInstance?.current?.save();

    axios.post("/api/note", { data: JSON.stringify(data) });
  };

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      data: content === "" ? DEFAULT_INITIAL_DATA() : JSON.parse(content),
      onReady: () => {
        isInstance.current = editor;
      },
      onChange: (api, event) => {
        console.log("Now I know that Editor's content changed!");
      },

      autofocus: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          config: {
            defaultLevel: 1,
          },
        },
      },
    });
  };

  return (
    <>
      <div style={{ border: "1px solid grey", marginTop: "40px" }}>
        <div id={EDITTOR_HOLDER_ID}> </div>
      </div>
      <button onClick={handleSaveNote}>save</button>
    </>
  );
};

export default Editor;
