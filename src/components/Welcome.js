import router from "next/router";
import Header from "../components/Header";

export default function Welcome() {
  function handleGetStarted() {
    router.push("/register");
  }

  return (
    <>
      <Header />
      <div style={{ margin: 0 + "1rem" }}>
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
        <button onClick={() => handleGetStarted()}>Get started</button>
      </div>

      <style></style>
    </>
  );
}
