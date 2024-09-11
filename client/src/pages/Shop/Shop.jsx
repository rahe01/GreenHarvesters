import { useState } from "react";
import Title from "../../components/Shared/Title/Title";
import ProductCard from "./ProductCard";

const products = [
    { id: 1, name: "Organic Wheat", price: 120, rating: 4, image: "https://iili.io/dk5KYNI.png", category: "Category1" },
    { id: 2, name: "Tomato", price: 80, rating: 5, image: "https://iili.io/dk5KYNI.png", category: "Vegetables" },
    { id: 3, name: "Capsicum", price: 150, rating: 4, image: "https://iili.io/dk5KYNI.png", category: "Vegetables" },
    { id: 4, name: "Organic Rice", price: 200, rating: 4, image: "https://iili.io/dk5KYNI.png", category: "Grains" },
    { id: 5, name: "Organic Barley", price: 300, rating: 4, image: "https://iili.io/dk5KYNI.png", category: "Grains" },
    { id: 6, name: "Organic Oats", price: 180, rating: 4, image: "https://iili.io/dk5KYNI.png", category: "Grains" },
    { id: 7, name: "Spinach", price: 70, rating: 5, image: "https://iili.io/dk5KYNI.png", category: "Vegetables" },
    { id: 8, name: "Carrot", price: 90, rating: 5, image: "https://iili.io/dk5KYNI.png", category: "Vegetables" },
    { id: 9, name: "Quinoa", price: 350, rating: 4, image: "https://iili.io/dk5KYNI.png", category: "Grains" },
    { id: 10, name: "Kale", price: 120, rating: 5, image: "https://iili.io/dk5KYNI.png", category: "Vegetables" },
    // Add more products as needed...
];

const Shop = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    // Filter and paginate products
    const filteredProducts = products.filter(product =>
        (selectedCategory === 'All' || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div>
            <Title title="Shop" />
            <div className="container mx-auto py-8">
                <div className="flex flex-col lg:flex-row">
                    {/* Sidebar for filtering */}
                    <aside className="w-full lg:w-1/4 p-4 bg-gray-100 lg:mr-4">
                        <div className="bg-[#EEC044] text-pink-600 p-5 rounded-2xl">
                            <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
                            <ul>
                                <li>
                                    <button
                                        onClick={() => setSelectedCategory('All')}
                                        className="underline"
                                    >
                                        All
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setSelectedCategory('Vegetables')}
                                        className="underline"
                                    >
                                        Vegetables
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setSelectedCategory('Grains')}
                                        className="underline"
                                    >
                                        Grains
                                    </button>
                                </li>
                                {/* Add more categories as needed */}
                            </ul>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-2">Search</h3>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Search for products..."
                            />
                        </div>
                    </aside>
                    {/* Products Grid */}
                    <main className="w-full lg:w-3/4 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {currentProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        {/* Pagination */}
                        <div className="mt-8 flex justify-center">
                            <div className="join">
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="join-item btn"
                                >
                                    «
                                </button>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="join-item btn"
                                >
                                    »
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Shop;
