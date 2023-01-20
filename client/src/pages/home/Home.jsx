import React from 'react'
import "./home.css"
import Header from "../../components/Header/Header"
import Navbar from '../../components/Navbar/Navbar'
import ad from "../../images/img.webp";
import post1 from "../../images/post1.jpg";
import profile from "../../images/profile.jpg";
import profile2 from "../../images/profile2.jpg";

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
                                    <img className="per-img" src={post1} alt="profile" />
                                </div>
                                <div className="per-details">
                                    <div className="per-name">Jane Doe</div>
                                    <div className="per-loc">NewYork, CA</div>
                                </div>
                            </div>
                            <div className="post-cap">Some really long description.</div>
                            <div>
                                <img className="post-img" src={profile} alt="profile" />
                            </div>
                        </div>
                        <div className="post-unit">
                            <div className="person">
                                <div>
                                    <img className="per-img" src={post1} alt="profile" />
                                </div>
                                <div className="per-details">
                                    <div className="per-name">Jane Doe</div>
                                    <div className="per-loc">NewYork, CA</div>
                                </div>
                            </div>
                            <div className="post-cap">Some really long description.</div>
                            <div>
                                <img className="post-img" src={profile2} alt="profile" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-panel">
                    <div className="right-top">
                        <div className="right-head">
                            <div className="text-l">Sponsored</div>
                            <div className="text-r">Create Ad</div>
                        </div>
                        <div>
                            <img className="ad-img" src={ad} alt="profile" />
                        </div>
                        <div className="right-head">
                            <div className="txt-l">BrandCosmetics</div>
                            <div className="text-r">brandcosmetics.com</div>
                        </div>
                        <div className="right-txt">
                            Your pathway to stunning and immaculate beauty and made sure your
                            skin is exfoliating and skin is shining like light.
                        </div>
                    </div>
                    <div className="friends-list">
                        <>Friend List</>
                        {/* <div className="right-txt">Login to connect with people</div> */}
                    </div>
                </div>
                {/* <div className="right-panel">
                    <div className="friends-list">
                        <h3>Friend List</h3>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Home