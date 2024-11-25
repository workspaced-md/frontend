import router from "next/router";
import Header from "../components/Header";
import Upload from "../components/Upload";

export default function Dashboard() {
  return (
    <>
      <Header />
      <div style={{ margin: 0 + "1rem" }}>
        <h2>Dashboard</h2>
        <p>Here you can:</p>
        <ul>
          <li>create a new note</li>
          <li>view all your notes</li>
          <li>edit a note</li>
          <li>delete a note</li>
        </ul>
        <button onClick={() => router.push("/new")}>+</button>
      </div>

      <Upload />
    </>
  );
}
