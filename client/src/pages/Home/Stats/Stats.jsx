import { FaProjectDiagram, FaUsers, FaTrophy, FaRegClock, FaCoffee, FaThumbsUp } from 'react-icons/fa';
import CountUp from 'react-countup';

const Stats = () => {
    return (
        <section className="p-4 my-6 container mx-auto md:p-8 dark:bg-gray-100">
            <div className="grid grid-cols-1 gap-6 m-4 mx-auto md:m-0 md:grid-cols-2 xl:grid-cols-3">
                {/* Each stat card */}
                <div className="flex overflow-hidden rounded-lg color1b dark:bg-gray-50 transform transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center justify-center px-4 color2b dark:bg-violet-600">
                        <FaProjectDiagram className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between flex-1 p-3">
                        <p className="text-2xl font-semibold">
                            <CountUp end={200} duration={2} suffix="+" />
                        </p>
                        <p>Projects</p>
                    </div>
                </div>

                <div className="flex overflow-hidden rounded-lg color2b dark:bg-gray-50 dark:text-gray-800 transform transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center justify-center px-4 color1b dark:bg-violet-600">
                        <FaUsers className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between flex-1 p-3">
                        <p className="text-2xl font-semibold">
                            <CountUp end={7500} duration={2} suffix="+" />
                        </p>
                        <p>Customers</p>
                    </div>
                </div>

                <div className="flex overflow-hidden rounded-lg color1b dark:bg-gray-50 dark:text-gray-800 transform transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center justify-center px-4 color2b dark:bg-violet-600">
                        <FaTrophy className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between flex-1 p-3">
                        <p className="text-2xl font-semibold">
                            <CountUp end={14} duration={2} />
                        </p>
                        <p>Awards</p>
                    </div>
                </div>

                <div className="flex overflow-hidden rounded-lg color2b dark:bg-gray-50 dark:text-gray-800 transform transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center justify-center px-4 color1b dark:bg-violet-600">
                        <FaRegClock className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between flex-1 p-3">
                        <p className="text-2xl font-semibold">
                            <CountUp end={24} duration={2} />
                            <span>/7 h</span>
                        </p>
                        <p>Support</p>
                    </div>
                </div>

                <div className="flex overflow-hidden rounded-lg color1b dark:bg-gray-50 transform transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center justify-center px-4 color2b dark:bg-violet-600">
                        <FaCoffee className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between flex-1 p-3">
                        <p className="text-2xl font-semibold">
                            <CountUp end={720} duration={2} suffix=" L" />
                        </p>
                        <p>Coffee</p>
                    </div>
                </div>

                <div className="flex overflow-hidden rounded-lg color2b dark:bg-gray-50 dark:text-gray-800 transform transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center justify-center px-4 color1b dark:bg-violet-600">
                        <FaThumbsUp className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between flex-1 p-3">
                        <p className="text-2xl font-semibold">
                            <CountUp end={150} duration={2} suffix="+" />
                        </p>
                        <p>Positive Feedbacks</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
