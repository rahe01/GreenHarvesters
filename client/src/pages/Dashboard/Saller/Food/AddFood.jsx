import { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import toast from 'react-hot-toast';
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb';
import Button from '../../../../components/Shared/Button/Button';

const AddFood = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [description, setDescription] = useState('');
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    console.log(user.email, user.displayName, user.photoURL);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const foodData = { 
            name, 
            category, 
            price: parseFloat(price), // Convert price to a number
            imageLink, 
            description, 
            status : 'available',
            userEmail: user.email, 
            userName: user.displayName, 
            userPhotoURL: user.photoURL 
        };

        try {
            const response = await axiosSecure.post('/food', foodData);
            console.log(response.data);
            // Handle successful response
            setName('');
            setCategory('');
            setPrice('');
            setImageLink('');
            setDescription('');
            toast.success("Food was successfully created");
        } catch (error) {
            if (error.response) {
                // Server responded with a status code other than 2xx
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                // No response received
                console.error('Error request data:', error.request);
            } else {
                // Error setting up the request
                console.error('Error message:', error.message);
                toast.error('Error setting');
            }
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-5 lg:p-10 rounded-2xl">
            <Breadcrumb pageName={"Add Food"}></Breadcrumb>
            <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 p-4">
                {/* Left Side Image */}
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <img
                        src="https://iili.io/dgLwxdG.jpg"
                        alt="Food Image"
                        className="w-full h-auto rounded-lg"
                    />
                </div>

                {/* Right Side Form */}
                <div className="w-full md:w-1/2">
                    <h1 className='text-3xl font-bold py-5'>Create a New Food Entry</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="category">
                                Category
                            </label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                required
                            >
                               <option value="setect">Select Category</option>
                                <option value="Fruits">Fruits</option>
                                <option value="Vegetables">Vegetables</option>
                                <option value="Dairy">Dairy</option>
                                <option value="Meat">Meat</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="price">
                                Price (TK)
                            </label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="imageLink">
                                Image Link
                            </label>
                            <input
                                type="url"
                                id="imageLink"
                                value={imageLink}
                                onChange={(e) => setImageLink(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                required
                            ></textarea>
                        </div>

                        <Button
                            type="submit"
                            label={"Add Food"}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFood;
