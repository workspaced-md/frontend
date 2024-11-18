// login page should provide a link to sign up page, forgot password page, home page, oauth options, and login fields
import { useState } from "react";

export default function Login() {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
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
        setLoginResponse(data.message);
        return;
      }
    } catch (error) {
      setLoginResponse(`Error: ${error.message}`);
      return;
    }
  }

  return (
    <div>
      <h1>Log In</h1>
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
      <div>{loginResponse}</div>

      <br />

      <a href="/register">Sign Up</a>
      <br />
      <a href="/forgot-password">Forgot password?</a>
    </div>
  );
}
