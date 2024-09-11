// components/Sidebar/index.js
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';
import { GrLogout } from 'react-icons/gr';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 transform color2b dark:bg-gray-800 p-5 transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:inset-0`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold dark:text-white">My Sidebar</h2>
        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ✕
        </button>
      </div>
      <nav className="mt-5">
        <ul>
          <li>
            <a href="#" className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
              <AiOutlineHome />
              Home
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
              <AiOutlineUser />
              Profile
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
              <AiOutlineSetting />
              Settings
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-2 p-2 text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-700">
              <GrLogout />
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
