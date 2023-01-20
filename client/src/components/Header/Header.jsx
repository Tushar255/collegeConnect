import "./navbar.css";
import { Search } from "@mui/icons-material";
import { useSelector } from "react-redux";
import UserImage from "../UserImage";

const Navbar = () => {
    const user = useSelector((state) => state.user);
    const fullName = `${user.firstName} ${user.lastName}`;
    const pic = `${user.picturePath}`;

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo"><a href="/home">collegeConnect</a></span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input
                        placeholder="Search..."
                        className="searchInput"
                    />
                </div>
            </div>
            <div className="topbarRight">
                <img src={pic} className="topbarImg" />
                {/* <UserImage image={pic} /> */}
                <span>{fullName}</span>
            </div>
        </div>
    );
}

export default Navbar
