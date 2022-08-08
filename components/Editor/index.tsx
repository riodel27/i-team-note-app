import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";

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

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      data: content === "" ? DEFAULT_INITIAL_DATA() : JSON.parse(content),
      onReady: () => {
        isInstance.current = editor;
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
    </>
  );
};

export default Editor;
