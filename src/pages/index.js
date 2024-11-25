import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import router from "next/router";

export default function Home() {
  function handleGetStarted() {
    router.push("/register");
  }

  return (
    <>
      <Header />
      <div className={styles.bodyContainer}>
        <p>The easiest way to host your</p>
        <ul>
          <li>blog</li>
          <li>notes</li>
          <li>documentation</li>
          <li>knowledge base</li>
          <li>secret diary</li>
          <li>manifesto</li>
          <li>do we need to keep going?</li>
        </ul>
        <p>Forget about sharing raw markdown files ever again.</p>
        <button onClick={() => handleGetStarted()}>Get started</button>
      </div>
    </>
  );
}
