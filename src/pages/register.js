import { useState } from "react";

export default function Register() {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerResponse, setRegisterResponse] = useState("");

  async function handleSubmitUser(event) {
    event.preventDefault();
    const formData = {
      email: email,
      username: username,
      password: password,
    };
    try {
      const response = await fetch(`${URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setRegisterResponse(data.message);
    } catch (error) {
      setRegisterResponse(`Error: ${error.message}`);
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
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
        <label for="username">Username:</label>
        <br />
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit">Register</button>
      </form>

      <br />

      <div>{registerResponse}</div>

      <br />

      <a href="/login">Log In</a>
      <br />
      <a href="/forgot-password">Forgot password?</a>
    </div>
  );
}
