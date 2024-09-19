import { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// Importing icons
import { FaTrash, FaPause, FaPlay } from 'react-icons/fa';
import { format } from 'date-fns'; // Import date formatting library

import toast from 'react-hot-toast';
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb';
import EmptyState from '../../../../components/Shared/EmptyState';

const MyAddFood = () => {
    const [foods, setFoods] = useState([]);
    const { user } = useAuth(); // Get user info, including email
    const axiosSecure = useAxiosSecure(); // Use secure Axios instance

    // Fetch the food data by user email
    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axiosSecure.get(`/food/user/${user?.email}`);
                const sortedFoods = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date
                setFoods(sortedFoods);
            } catch (error) {
                console.error('Error fetching food data:', error);

            }
        };
        if (user?.email) {
            fetchFoods();
        }
    }, [user, axiosSecure]);

    // Handle delete action
    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/fooddelete/${id}`);
            setFoods(foods.filter(food => food._id !== id));
            toast.success('Food deleted successfully');
        } catch (error) {
            console.error('Error deleting food:', error);
            toast.error('Failed to delete food');
        }
    };

    // Handle pause action (toggle status)
    const handlePause = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'paused' ? 'available' : 'paused';
            const response = await axiosSecure.patch(`/foodtoggle/${id}`, { status: newStatus }); // Adjust endpoint to fit your API
            if (response.status === 200) {
                setFoods(foods.map(food =>
                    food._id === id ? { ...food, status: newStatus } : food
                ));
                toast.success(`Food status updated to ${newStatus}`);
            } else {
                throw new Error('Failed to update food status');
            }
        } catch (error) {
            console.error('Error updating food status:', error.message || error);
            toast.error('Failed to update food status');
        }
    };

    return (
        <div>
            <Breadcrumb pageName={"My Added Food"} />
            <div className="container mx-auto p-4">
                {foods && foods.length > 0 ? (
                    foods.map((food) => (
                        <div
                            key={food._id}
                            className="flex flex-col md:flex-row items-center justify-between p-4 mb-4 bg-white shadow-md rounded-lg dark:bg-gray-800"
                        >
                            {/* Image and details */}
                            <div className="flex flex-col md:flex-row justify-center items-center mb-4 md:mb-0 w-full md:w-auto">
                                <img
                                    src={food.imageLink}
                                    alt={food.name}
                                    className="w-20 h-20 rounded-lg object-cover mr-4 mb-2 md:mb-0"
                                />
                                <div className="flex flex-col text-center md:text-left">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                        {food.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Status: <span className={`${food.status === 'available' ? 'text-green-400' : 'text-red-500'}`}>{food.status || 'N/A'}</span>
                                    </p>
                                    {/* Display the date food was added */}
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Added on: {format(new Date(food.createdAt), 'MMMM d, yyyy')}
                                    </p>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => handlePause(food._id, food.status)}
                                    className="p-2 color1t hover:text-yellow-800 transition-colors duration-300"
                                    aria-label="Pause/Resume Food"
                                >
                                    {food.status === 'available' ? (<FaPause size={20} />) : (<FaPlay color='red' />)}


                                </button>
                                <button
                                    onClick={() => handleDelete(food._id)}
                                    className="p-2 color1t hover:text-red-800 transition-colors duration-300"
                                    aria-label="Delete Food"
                                >
                                    <FaTrash size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <EmptyState label={"Add Food"} address={"/dashboard/addfood"} message={"You have no food added yet."} />
                )}
            </div>
        </div>
    );
};

export default MyAddFood;
