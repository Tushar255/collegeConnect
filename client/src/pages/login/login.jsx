import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import "../../css/login.css";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const handleInput = ((event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInput((prev) => {
            return {...prev, [name]: value};
        })
    });

    const routeToReg = () => {
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    }

    const loginUser = async (e) => {
        e.preventDefault();

        const { email, password } = input;

        const loginResponse = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await loginResponse.json();

        if (data.status === 400 || !data) {
            window.alert("Invalid Details");
            setInput({ email: "", password: "" });
        } else {
            setInput({email: "", password: ""});
            window.alert("Login Successful");
        }
    };

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>collegeConnect</h1>
                    <p>Join us on collegeConnect</p>
                    <span>Don't you have an account?</span>
                    <button onClick={routeToReg}>Register</button>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form method="POST">
                        <input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        value={input.email}
                        onChange={handleInput}
                        />
                        <input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={input.password}
                        onChange={handleInput}
                        />
                        <button onClick={loginUser}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
