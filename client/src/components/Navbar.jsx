import { useState } from "react";
import {
    Search,
    Message,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state/index";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <div>Navbar</div>
    )
}

export default Navbar;