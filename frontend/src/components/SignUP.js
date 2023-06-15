import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUP = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const collectData = async () => {
    // e.preventDefault();
    console.log(email, name, password);
    let result = await fetch("http://localhost:5000/signup", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    setName("");
    setEmail("");
    setPassword("");
    //user local storage for data store
    localStorage.setItem("user", JSON.stringify(result));
    if (result) {
      navigate("/");
    }
  };
  return (
    <div className="signup">
      <h1>Register</h1>
      <input
        className="inputBox"
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      <input
        className="inputBox"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button onClick={collectData} type="button" id="signupBtn">
        Sign UP
      </button>
    </div>
  );
};

export default SignUP;
