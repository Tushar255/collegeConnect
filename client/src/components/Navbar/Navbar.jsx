import "./navbar.css";
import {
    Home,
    Chat,
    Person,
} from "@mui/icons-material";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const { _id } = useSelector((state) => state.user);
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Home className="sidebarIcon" />
                        <span className="sidebarListItemText"><a href="/home"></a>Home</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon" />
                        <span className="sidebarListItemText"><a href="/home"></a>Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <Person className="sidebarIcon" />
                        <span className="sidebarListItemText" onClick={() => navigate(`/profile/${_id}`)}>Profile</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar