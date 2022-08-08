import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const Editor = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [content, setContent] = useState("");
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">I Team Note App</a>
      </h1>
      <Editor setContent={setContent} content={content} />
    </div>
  );
};

export default Home;
