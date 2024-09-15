import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import Title from "../../components/Shared/Title/Title";
import Button from "../../components/Shared/Button/Button";

const ProductDetails = () => {
  const product = useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()

  if (!product) {
    return <div>Product not found or failed to load.</div>;
  }

  // Format the date
  const formattedDate = new Date(product.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleAddToCart = () => {
    alert(`${product.name} added to cart with quantity ${quantity}`);
  };

  return (
    <div>
      <Title title={product.name}></Title>
      <div className="card lg:card-side bg-base-100 shadow-xl m-6 container mx-auto flex flex-col lg:flex-row">
        <figure className="w-full  lg:w-1/3">
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

          <h1 className="font-bold text-lg">Saller Info :</h1>

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
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="select select-bordered w-24"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-primary mt-2 lg:mt-0"
              onClick={handleAddToCart}
            >
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
