import { useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import UserOne from '../../images/user/user-01.png';

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <div className="relative">
        <button
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray-300  dark:border-strokedark dark:bg-meta-4 "
        >
          <span
            className={`absolute -top-0.5 -right-0.5 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === false ? 'hidden' : 'inline'
            }`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>

          <svg
            className="fill-current duration-300 ease-in-out"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.00016 17.0882C9.99697 17.0882 10.8126 16.2726 10.8126 15.2758H7.18766C7.18766 16.2726 8.00329 17.0882 9.00016 17.0882Z"
              fill=""
            />
            <path
              d="M16.1251 12.0258C15.0564 11.0126 13.6876 10.3376 13.6876 6.7132C13.6876 4.06257 11.9564 2.00006 9.56258 1.48443V0.963196C9.56258 0.575696 9.23758 0.250671 8.81258 0.250671C8.42508 0.250671 8.10008 0.575696 8.10008 0.963196V1.48443C5.70633 2.00006 3.93758 4.06257 3.93758 6.7132C3.93758 10.3376 2.56883 11.0126 1.50008 12.0258C1.18133 12.3126 1.25633 12.8376 1.61258 12.9758C4.03758 13.8814 6.62508 14.4632 8.66258 14.4632C10.7001 14.4632 13.2876 13.8814 15.7126 12.9758C16.0688 12.8376 16.1438 12.3126 15.8251 12.0258Z"
              fill=""
            />
          </svg>
        </button>

        {/* <!-- Dropdown Start --> */}
        {dropdownOpen && (
          <div className="absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-2xl border border-stroke color2b p-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80">
            <div className="px-4.5 py-3">
              <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
            </div>

            <ul className="flex h-auto flex-col overflow-y-auto">
              <li>
                <Link
                  className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  to="/notifications"
                >
                  <div className="h-12.5 w-12.5 rounded-full">
                    <img src={UserOne} alt="User" />
                  </div>

                  <div>
                    <h6 className="text-sm font-medium text-black dark:text-white">
                      Maria Desoja
                    </h6>
                    <p className="text-sm">Assign you a new task</p>
                    <p className="text-xs">3min ago</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  to="/notifications"
                >
                  <div className="h-12.5 w-12.5 rounded-full">
                    <img src={UserOne} alt="User" />
                  </div>

                  <div>
                    <h6 className="text-sm font-medium text-black dark:text-white">
                      John Smith
                    </h6>
                    <p className="text-sm">Marked a task as done</p>
                    <p className="text-xs">1hour ago</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  to="/notifications"
                >
                  <div className="h-12.5 w-12.5 rounded-full">
                    <img src={UserOne} alt="User" />
                  </div>

                  <div>
                    <h6 className="text-sm font-medium text-black dark:text-white">
                      Eva William
                    </h6>
                    <p className="text-sm">Added a new comment</p>
                    <p className="text-xs">3hours ago</p>
                  </div>
                </Link>
              </li>
            </ul>

            <button className="flex items-center justify-center bg-gray-2 py-3 text-sm font-medium text-black hover:bg-gray dark:bg-meta-4 dark:text-white dark:hover:bg-opacity-70">
              <Link to="/notifications">See All Notifications</Link>
            </button>
          </div>
        )}
        {/* <!-- Dropdown End --> */}
      </div>
    </ClickOutside>
  );
};

export default DropdownNotification;
