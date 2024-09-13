import { AiOutlineHome, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import {
  MdOutlineFoodBank,
  MdOutlineManageAccounts,
  MdOutlineCalendarToday,
} from "react-icons/md";
import { BsFileEarmarkText } from "react-icons/bs";
import { GrLogout } from "react-icons/gr";
import { Link } from "react-router-dom";
import MenuItem from "./Menu/MenuItem";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logOut } = useAuth();

  const handleLogout = async () => {
    try {
      logOut();
      toast.success("Logged Out Successfully");
    } catch (error) {
      toast.error("Failed to Logout");
    }
  };
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-800 text-white p-5 transition-transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:inset-0`}
    >
      <div className="flex justify-between items-center">
        <Link to={"/"}>
          <img src="https://iili.io/d8XQyEQ.png" className="h-14" alt="" />
        </Link>
        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ✕
        </button>
      </div>
      <nav className="mt-5">
        <ul>
          {/* Dashboard */}
          <li>
            <Link to="/dashboard">
              <MenuItem
                label="Dashboard"
                address="/dashboard"
                icon={AiOutlineHome}
              />
            </Link>
          </li>

          {/* Manage Users */}
          <li>
            <Link to="manageusers">
              <MenuItem
                label="Manage Users"
                address="manageusers"
                icon={MdOutlineManageAccounts}
              />
            </Link>
          </li>

          {/* Add Food */}
          <li>
            <Link to="addfood">
              <MenuItem
                label="Add Food"
                address="addfood"
                icon={MdOutlineFoodBank}
              />
            </Link>
          </li>

          {/* My Added Food */}
          <li>
            <Link to="myaddfood">
              <MenuItem
                label="My Added Food"
                address="myaddfood"
                icon={MdOutlineFoodBank}
              />
            </Link>
          </li>

          {/* add blogs */}
          <li>
            <Link to="/add-blogs">
              <MenuItem
                label="Add Blogs"
                address="addBlogs"
                icon={BsFileEarmarkText}
              />
            </Link>
          </li>

          {/* My Added Blogs */}
          <li>
            <Link to="myaddedblogs">
              <MenuItem
                label="My Added Blogs"
                address="myaddedblogs"
                icon={BsFileEarmarkText}
              />
            </Link>
          </li>

          {/* Profile */}
          <li>
            <Link to="profile">
              <MenuItem
                label="Profile"
                address="profile"
                icon={AiOutlineUser}
              />
            </Link>
          </li>

          {/* Settings */}
          <li>
            <Link to="/settings">
              <MenuItem
                label="Settings"
                address="/settings"
                icon={AiOutlineSetting}
              />
            </Link>
          </li>

          {/* Calendar */}
          <li>
            <Link to="calendar">
              <MenuItem
                label="Calendar"
                address="calendar"
                icon={MdOutlineCalendarToday}
              />
            </Link>
          </li>

          {/* Logout */}
          <li>
            <button className="w-full" onClick={handleLogout}>
              <a
                href="#"
                className="flex items-center gap-2 p-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <GrLogout />
                Logout
              </a>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
