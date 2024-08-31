import { NavLink } from "react-router-dom";

const Link = ({title , address}) => {
    return (
<NavLink
    to={address}
    className={({ isActive }) =>
        isActive ? "text-blue-500" : "text-gray-500"
    }
>
    {title}
</NavLink>

    );
};

export default Link;