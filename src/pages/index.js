import { useEffect, useState } from "react";
import Welcome from "../components/Welcome";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  if (token) {
    return (
      <>
        <Dashboard />
      </>
    );
  } else {
    return (
      <>
        <Welcome />
      </>
    );
  }
}
