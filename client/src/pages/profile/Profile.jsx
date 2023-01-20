import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import "./profile.css"

const Profile = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    if (!user) return null;

    return (
        <div>
            <div className="container">
                <div className="name">
                    <h2>Name: {user.firstName} {user.lastName}</h2>
                    <h2>UserName: {user.userName}</h2>
                </div>
                <div className="other">
                    <h2>Email: {user.email}</h2>
                    <h2>Friends: {user.friends.length}</h2>
                </div>
            </div>
        </div>
    )
}

export default Profile