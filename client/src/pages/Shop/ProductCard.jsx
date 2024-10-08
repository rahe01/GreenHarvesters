import Button from "../../components/Shared/Button/Button";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/productdetails/${product._id}`);
    };

    return (
        <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
                src={product.imageLink}
                alt={product.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-700 mt-2">Price: {product.price}</p>
                <div className="mt-2">
                    <div className="rating rating-sm">
                        {[...Array(5)].map((_, index) => (
                            <input
                                key={index}
                                type="radio"
                                name={`rating-${product._id}`}
                                className="mask mask-star-2 bg-orange-400"
                                checked={index < product.rating}
                                readOnly
                            />
                        ))}
                    </div>
                </div>
                <Button onClick={handleViewDetails} label={"View Details"} />
            </div>
        </div>
    );
};

export default ProductCard;
