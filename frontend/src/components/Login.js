import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    // console.log(email,password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Enter Correct Details");
    }
  };
  return (
    <div className="login">
      <input
        className="inputBox"
        value={email}
        type="text"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        value={password}
        className="inputBox"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} type="button" id="signupBtn">
        Login
      </button>
    </div>
  );
};

export default Login;
