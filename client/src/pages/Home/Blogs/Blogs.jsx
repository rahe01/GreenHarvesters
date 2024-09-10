import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import Title from '../../../components/Shared/Title/Title';

const blogsData = [
    {
        id: 1,
        title: 'Noster tincidunt reprimique ad pro',
        date: 'February 19, 2021',
        category: 'Technology',
        imgSrc: 'https://source.unsplash.com/random/480x360',
        description: 'Ei delenit sensibus liberavisse pri...',
    },
    {
        id: 2,
        title: 'In usu laoreet repudiare legendos',
        date: 'January 21, 2021',
        category: 'Health',
        imgSrc: 'https://source.unsplash.com/random/480x360?1',
        description: 'Mei ex aliquid eleifend forensibus...',
    },
    // Add more blog data here
];

const Blogs = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter blogs based on category and search query
    const filteredBlogs = blogsData.filter((blog) => {
        const matchesCategory = selectedCategory === '' || blog.category === selectedCategory;
        const matchesSearchQuery = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearchQuery;
    });

    return (
        <div className="">
            <Title title={"Blogs"}></Title>
            {/* Header with filter and buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Filter by Category */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 rounded-full border border-gray-300"
                    >
                        <option value="">All Categories</option>
                        <option value="Technology">Technology</option>
                        <option value="Health">Health</option>
                        <option value="Business">Business</option>
                    </select>

                    {/* Search by Title */}
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by title"
                        className="px-4 py-2 rounded-full border border-gray-300 w-full sm:w-auto"
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
                <div className="container max-w-6xl mx-auto space-y-6 sm:space-y-12">
                    {filteredBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBlogs.map((blog) => (
                                <a
                                    key={blog.id}
                                    href="#"
                                    className="block max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50"
                                >
                                    <img
                                        src={blog.imgSrc}
                                        alt={blog.title}
                                        className="object-cover w-full h-64 rounded sm:h-80 lg:col-span-7 dark:bg-gray-500"
                                    />
                                    <div className="p-6 space-y-2 lg:col-span-5">
                                        <h3 className="text-xl font-semibold sm:text-2xl lg:text-3xl group-hover:underline group-focus:underline">
                                            {blog.title}
                                        </h3>
                                        <span className="text-xs dark:text-gray-600">{blog.date}</span>
                                        <p className="text-sm">{blog.description}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-lg">No blogs found.</p>
                    )}

                    {/* Load more button */}
                    <div className="flex justify-center mt-6">
                        <button
                            type="button"
                            className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-50 dark:text-gray-600"
                        >
                            Load more posts...
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blogs;
