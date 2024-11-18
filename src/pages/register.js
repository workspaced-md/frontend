import { useState } from "react";

export default function Register() {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState("");

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
      setLoginResponse(data.message);
    } catch (error) {
      setLoginResponse(`Error: ${error.message}`);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmitUser} encType="json">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div>{loginResponse}</div>
    </div>
  );
}
