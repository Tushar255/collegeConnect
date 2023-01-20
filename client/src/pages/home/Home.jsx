import React from 'react'
import "./home.css"
import Header from "../../components/Header/Header"
import Navbar from '../../components/Navbar/Navbar'

const Home = () => {
    return (
        <div className='home'>
            <Header />
            <div className="main">
                <div className="left-panel">
                    <Navbar />
                </div>
                <div className="post-area">
                    <div className="post-list">
                        <div className="post-unit">
                            <div className="person">
                                <div>
                                    <img className="per-img" alt="profile" />
                                </div>
                                <div className="per-details">
                                    <div className="per-name">Jane Doe</div>
                                    <div className="per-loc">NewYork, CA</div>
                                </div>
                            </div>
                            <div className="post-cap">Some really long description.</div>
                            <div>
                                <img className="post-img" alt="profile" />
                            </div>
                        </div>
                        <div className="post-unit">
                            <div className="person">
                                <div>
                                    <img className="per-img" alt="profile" />
                                </div>
                                <div className="per-details">
                                    <div className="per-name">Jane Doe</div>
                                    <div className="per-loc">NewYork, CA</div>
                                </div>
                            </div>
                            <div className="post-cap">Some really long description.</div>
                            <div>
                                <img className="post-img" alt="profile" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-panel">
                    <div className="friends-list">
                        <h3>Friend List</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home