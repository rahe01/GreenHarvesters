import { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// Importing icons
import { FaEdit, FaTrash, FaPause } from 'react-icons/fa';

import { format } from 'date-fns'; // Import date formatting library
import EmptyState from '../../../../components/Shared/EmptyState copy';

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
            await axiosSecure.delete(`/foods/${id}`);
            setFoods(foods.filter(food => food._id !== id));
        } catch (error) {
            console.error('Error deleting food:', error);
        }
    };

    // Handle edit and pause actions
    const handleEdit = (id) => {
        console.log(`Edit food with id: ${id}`);
    };

    const handlePause = (id) => {
        console.log(`Pause food with id: ${id}`);
    };

    return (
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
                                onClick={() => handlePause(food._id)}
                                className="p-2 color1t hover:text-yellow-800 transition-colors duration-300"
                                aria-label="Pause Food"
                            >
                                <FaPause size={20} />
                            </button>
                            <button
                                onClick={() => handleEdit(food._id)}
                                className="p-2 color1t hover:text-blue-800 transition-colors duration-300"
                                aria-label="Edit Food"
                            >
                                <FaEdit size={20} />
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
                <EmptyState label={"Add Food"} address={"/addFood"} message={"You have no food added yet."} />
            )}
        </div>
    );
};

export default MyAddFood;
