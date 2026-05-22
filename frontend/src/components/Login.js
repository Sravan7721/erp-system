import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const loginUser = async () => {

    if (!email || !password) {

      alert("Please fill all fields");

      return;
    }

    try {

      const response = await axios.post(

        "http://localhost:8080/api/auth/login",

        {
          email,
          password
        }
      );

      if (response.data) {

  // SAVE TOKEN

  localStorage.setItem(
    "token",
    response.data
  );

  localStorage.setItem(
    "isLoggedIn",
    "true"
  );

  navigate("/dashboard");
} else {

        alert(response.data);

      }

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-[#081028] flex justify-center items-center">

      <div className="bg-slate-900 p-10 rounded-3xl w-[400px]">

        <h1 className="text-4xl font-bold text-white mb-8 text-center">

          Login

        </h1>

        <div className="flex flex-col gap-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="bg-slate-800 text-white p-4 rounded-xl outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="bg-slate-800 text-white p-4 rounded-xl outline-none"
          />

          <button
            onClick={loginUser}
            className="bg-green-500 hover:bg-green-600 p-4 rounded-xl text-white font-bold"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="text-green-400"
          >
            Create New Account
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;