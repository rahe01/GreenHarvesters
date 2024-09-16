import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import Title from "../../components/Shared/Title/Title";
import Button from "../../components/Shared/Button/Button";
import useAuth from './../../hooks/useAuth';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
  const product = useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const auth = useAuth();
  const { user } = auth;
  const axiosSecure = useAxiosSecure();

  // Handle case where product is not available
  if (!product) {
    return <div>Product not found or failed to load.</div>;
  }

  // Format the date for product creation
  const formattedDate = new Date(product.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Handle adding item to cart
  const handleAddToCart = async () => {
    try {
      const cartItem = {
        foodName: product.name,
        quantity,
        totalPrice: product.price * quantity,
        foodImage: product.imageLink,
        userName: user?.displayName || "Guest",
        userEmail: user?.email || "guest@example.com",
      };

      // Make a secure request to add to cart
      const response = await axiosSecure.post('/cartadd', cartItem);

      // Check for successful response
      if (response && response.data && response.status === 201) {
        toast.success(`${product.name} added to cart with quantity ${quantity}`);
      } else {
        console.error('Failed to add to cart:', response);
        toast.error('There was a problem adding this item to the cart.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('An error occurred while adding the item to the cart.');
    }
  };

  // Handle quantity decrement (min 1)
  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // Handle quantity increment (max 50)
  const incrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity < 50 ? prevQuantity + 1 : 50));
  };

  return (
    <div>
      <Title title={product.name}></Title>
      <div className="card lg:card-side bg-base-100 shadow-xl m-6 container mx-auto flex flex-col lg:flex-row">
        <figure className="w-full lg:w-1/3">
          <img
            src={product.imageLink}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body w-full lg:w-2/3 p-6">
          <h2 className="card-title text-2xl lg:text-3xl font-bold">
            {product.name}
          </h2>
          <p className="text-lg font-semibold mt-2">
            Price: {product.price} TK
          </p>
          <p className="text-gray-700 my-2 break-words max-w-7xl">
            {product.description}
          </p>
          <p
            className={`font-semibold ${
              product.status === "available" ? "text-green-500" : "text-red-500"
            }`}
          >
            Status: {product.status}
          </p>

          <h1 className="font-bold text-lg">Seller Info:</h1>

          <div className="flex items-center my-1">
            <img
              src={product.userPhotoURL}
              alt={product.userName}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-medium">{product.userName}</p>
              <p className="text-gray-600">{product.userEmail}</p>
            </div>
          </div>

          <p className="text-gray-600 mt-2">Created on: {formattedDate}</p>

          <div className="card-actions justify-start lg:justify-end mt-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="quantity" className="font-medium">
                Quantity by Kg:
              </label>
              <div className="relative flex items-center max-w-[8rem]">
                <button
                  type="button"
                  onClick={decrementQuantity}
                  className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                  </svg>
                </button>
                <input
                  type="text"
                  id="quantity"
                  className="color1b border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm block w-full"
                  value={quantity}
                  readOnly
                />
                <button
                  type="button"
                  onClick={incrementQuantity}
                  className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                  </svg>
                </button>
              </div>
            </div>

            <button className="btn color1b mt-2 lg:mt-0" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="text-center container mx-auto mt-6">
        <Button onClick={() => navigate(-1)} label={"Back to Shop"} />
      </div>
    </div>
  );
};

export default ProductDetails;
