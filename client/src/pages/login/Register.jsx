import React from "react";
import { useState } from "react";
import "../../css/register.css";

const Register = () => {
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        picturePath: ""
    });

    const handleInput = ((event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInput((prev) => {
            return { ...prev, [name]: value };
        })
    });

    const registerUser = async (e) => {
        e.preventDefault();

        const { firstName, lastName, userName, email, password, picturePath } = input;

        const registerResponse = await fetch("http://localhost:3001/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, userName, email, password, picturePath })
        });

        const data = await registerResponse.json();

        if (data.status !== 201) {
            window.alert("Registration Unsuccessful!");
        }
    };

    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>collegeConnect</h1>
                    <p>Join us on collegeConnect</p>
                    <span>Do you have an account?</span>
                    <button>Login</button>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form method="POST">
                        <input 
                        type="text" 
                        name="firstName"
                        value={input.firstName}
                        placeholder="First-Name" 
                        onChange={handleInput}
                        />
                        <input 
                        type="text" 
                        name="lastName"
                        value={input.lastName}
                        placeholder="Last-Name" 
                        onChange={handleInput}
                        />
                        <input 
                        type="text" 
                        name="userName"
                        value={input.username}
                        placeholder="Username" 
                        onChange={handleInput}
                        />
                        <input 
                        type="email" 
                        name="email"
                        value={input.email}
                        placeholder="Email" 
                        onChange={handleInput}
                        />
                        <input 
                        type="password" 
                        name="password"
                        value={input.password}
                        placeholder="Password" 
                        onChange={handleInput}
                        />
                        <input 
                        type="text" 
                        name="picturePath"
                        value={input.picturePath}
                        placeholder="PicturePath" 
                        onChange={handleInput}
                        />
                        
                        {/* <input 
                        type="text" 
                        name="description"
                        value={input.description}
                        placeholder="Description" 
                        onChange={handleInput}
                        />
                        <input 
                        type="text" 
                        name="skills"
                        value={input.skills}
                        placeholder="Skills"
                        onChange={handleInput}
                        />
                        <input 
                        type="text" 
                        name="location"
                        value={input.location}
                        placeholder="Location"
                        onChange={handleInput}
                        /> */}
                        <button onClick={registerUser}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
