import React, { useState, useEffect } from 'react'
import "./profv1.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import post1 from "../../images/post1.jpg";
import profile from "../../images/profile.jpg";
import profile2 from "../../images/profile2.jpg";
import { setLogout } from "../../state/index.js"


const Profile = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();

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
            <header>
                <div className="head">
                    <h1 className="name">collegeConnect</h1>
                    <button onClick={() => {
                        dispatch(setLogout());
                    }} className="logout-btn">Logout</button>
                </div>
                <div className="container">
                    <div className="profile">
                        <div className="profile-image">
                            <img src={post1} alt="profile" />
                        </div>
                    </div>
                    <div className="profile-user-settings">
                        <h1 className="profile-user-name">{user.userName}</h1>
                        <button className="profile-edit-button">Edit Profile</button>
                    </div>
                    <div className="profile-stats">
                        <ul>
                            <li>
                                <span className="profile-stat-count">164</span>posts
                            </li>
                            <li>
                                <span className="profile-stat-count">188</span>followers
                            </li>
                            <li>
                                <span className="profile-stat-count">182</span>following
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <div className="post-box">
                <img src={profile} alt="post" />
                <div className="postinfo">
                    <div className="likes">
                        <i className="ri-heart-3-line" />
                        <span>890</span>
                        <i className="ri-chat-3-line" />
                        <span>42</span>
                    </div>
                </div>
                <img src={profile2} alt="post" />
                <div className="postinfo">
                    <div className="likes">
                        <i className="ri-heart-3-line" />
                        <span>890</span>
                        <i className="ri-chat-3-line" />
                        <span>42</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
