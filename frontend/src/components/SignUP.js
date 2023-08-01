import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUP = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError]=useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const collectData = async () => {
    // e.preventDefault();
    if(!email || !name || !password || !imageFile){
      setError(true);
      return false;
    }else{

    console.log(email, name, password);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", imageFile);

   
    try {
      let result = await fetch("http://localhost:5000/signup", {
        method: "post",
        body: formData,
      });
    result = await result.json();
    console.log(result);
    setName("");
    setEmail("");
    setPassword("");
    setImageFile("");
    //user local storage for data store
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    if (result) {
      navigate("/");
    }
  } catch (error) {
    console.error("Error while uploading data:", error);
  }
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
      {error && !name && <span className="error">Enter valid name</span>}
      <input
        className="inputBox"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      {error && !email && <span className="error">Enter valid email</span>}
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      {error && !password && <span className="error">Enter valid password</span>}
      <input
        className="inputBox"
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      {error && !imageFile && <span className="error">Upload Image</span>}
      <button onClick={collectData} type="button" id="signupBtn">
        Sign UP
      </button>
     
    
    
   
    
    
    </div>
  );
};

export default SignUP;
