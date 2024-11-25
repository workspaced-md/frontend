import { useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";

export default function Login() {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState("");

  async function handleSubmitUser(event) {
    event.preventDefault();
    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        localStorage.setItem("token", token);

        setLoginResponse(data.message);
        router.push("/");
      }
    } catch (error) {
      setLoginResponse(`Error: ${error.message}`);
    }
  }

  return (
    <>
      <Header />
      <div style={{ margin: "1rem" }}>
        <h2>Log In</h2>
        <form onSubmit={handleSubmitUser} encType="json">
          <label for="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <br />
          <label for="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button type="submit">Log In</button>
        </form>

        <br />

        <div>{loginResponse}</div>

        <br />

        <a href="/register">Sign up</a>
        <br />
        <a href="/forgot-password">Forgot password?</a>
      </div>
    </>
  );
}
