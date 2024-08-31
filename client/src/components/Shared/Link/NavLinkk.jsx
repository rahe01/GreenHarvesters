import { NavLink } from "react-router-dom";

const NavLinkk = ({title , address}) => {
    return (
<NavLink
    to={address}
    className={({ isActive }) =>
        isActive ? "text-blue-500" : "text-white"
    }
>
    {title}
</NavLink>

    );
};

export default NavLinkk;