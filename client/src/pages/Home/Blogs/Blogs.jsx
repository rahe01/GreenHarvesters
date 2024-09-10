import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import Title from '../../../components/Shared/Title/Title';
import { Select, Option } from '@material-tailwind/react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const axiosSecure = useAxiosSecure();

    // Fetch blogs from the backend
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axiosSecure.get('/getblogs');
                // Sort blogs by date (latest first)
                const sortedBlogs = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setBlogs(sortedBlogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, [axiosSecure]);

    // Filter blogs based on category and search query
    const filteredBlogs = blogs.filter((blog) => {
        const matchesCategory = selectedCategory === '' || blog.category === selectedCategory;
        const matchesSearchQuery = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearchQuery;
    });

    return (
        <div>
            <Title title="Blogs" />
            {/* Header with filter and buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    {/* Filter by Category */}
                    <Select
                        value={selectedCategory}
                        onChange={(value) => setSelectedCategory(value)}
                        label="Select a Category"
                        className="w-full sm:w-72 md:w-80 lg:w-96"
                    >
                        <Option value="">All Categories</Option>
                        <Option value="Crops">Crops</Option>
                        <Option value="Farming Techniques">Farming Techniques</Option>
                        <Option value="Livestock">Livestock</Option>
                        <Option value="Pest and Disease Management">Pest and Disease Management</Option>
                        <Option value="Soil and Fertilizers">Soil and Fertilizers</Option>
                        <Option value="Technology and Equipment">Technology and Equipment</Option>
                        <Option value="Market and Economics">Market and Economics</Option>
                        <Option value="Sustainability">Sustainability</Option>
                        <Option value="Education and Resources">Education and Resources</Option>
                        <Option value="Events and News">Events and News</Option>
                    </Select>

                    {/* Search by Title */}
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by title"
                        className="px-4 py-2 rounded-full border border-gray-300 w-full sm:w-72"
                    />
                </div>

                {/* Add Blog Button */}
                <div className="mt-4 md:mt-0">
                    <Link to="/addBlogs">
                        <button
                            type="button"
                            className="color1b flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                        >
                            <AiOutlinePlus size={20} />
                            Add Blog
                        </button>
                    </Link>
                </div>
            </div>

            {/* Blogs Listing */}
            <section className="dark:bg-gray-100 dark:text-gray-800">
                <div className="max-w-screen-xl p-5 mx-auto">
                    {filteredBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 sm:grid-cols-2">
                            {filteredBlogs.map((blog) => (
                                <div
                                    key={blog._id}
                                    className="relative flex items-end justify-start w-full text-left bg-center bg-cover h-96"
                                    style={{ backgroundImage: `url(${blog.imgSrc})` }}
                                >
                                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-transparent to-gray-900"></div>
                                    <div className="absolute top-0 left-0 right-0 flex items-center justify-between mx-5 mt-3">
                                        <span className="px-3 py-2 text-xs font-semibold tracking-wider uppercase bg-violet-600 text-white">
                                            {blog.category}
                                        </span>
                                        <div className="flex flex-col justify-start text-center text-white">
                                            <span className="text-3xl font-semibold leading-none tracking-wide">{new Date(blog.date).getDate()}</span>
                                            <span className="leading-none uppercase">{new Date(blog.date).toLocaleString('default', { month: 'short' })}</span>
                                        </div>
                                    </div>
                                    <h2 className="z-10 p-5">
                                        <Link to={`/blog/${blog._id}`} className="font-medium text-md hover:underline text-white">
                                            {blog.title}
                                        </Link>
                                    </h2>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center">No blogs found.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blogs;
