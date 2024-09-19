import { useState, useEffect } from "react"; // Import necessary hooks
import { HiTrash } from "react-icons/hi"; // Import Trash Icon
import useCart from "../../../../hooks/useCart";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import EmptyState from "../../../../components/Shared/EmptyState";

import toast from "react-hot-toast";
import OrderModal from "./OrderModal";


const MyCart = () => {
  const { cartItems, loading, handleDelete, handleCheck } = useCart();
  const [totalPrice, setTotalPrice] = useState(0); // State to track total price of checked items
  const [discountedPrice, setDiscountedPrice] = useState(0); // State to track discounted price
  const [coupon, setCoupon] = useState(""); // State for coupon input
  const [isCouponApplied, setIsCouponApplied] = useState(false); // State to track if coupon is applied
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility


  // Function to calculate the total price of checked items
  useEffect(() => {
    const calculatedTotal = cartItems.reduce((acc, item) => {
      if (item.checked) {
        return acc + item.totalPrice;
      }
      return acc;
    }, 0);
    setTotalPrice(calculatedTotal);

    // If the coupon is already applied, apply discount to the new total
    if (isCouponApplied) {
      const discountedTotal = calculatedTotal * 0.9; // Apply 10% discount
      setDiscountedPrice(discountedTotal);
    } else {
      setDiscountedPrice(calculatedTotal);
    }
  }, [cartItems, isCouponApplied]); // Recalculate when cartItems or coupon status changes

  // Function to handle coupon submission
  const handleApplyCoupon = () => {
    if (coupon === "FARM10") {
      setIsCouponApplied(true);
      const discountedTotal = totalPrice * 0.9; // Apply 10% discount
      setDiscountedPrice(discountedTotal);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid Coupon Code");
    }
  };

  // Function to handle the "Order Now" button click
  const handleOrderNow = () => {
    if (totalPrice === 0) {
      toast.error("Please select at least one item to place an order");
      return;
    }
    setIsModalOpen(true); // Open the modal
  };

  // Function to handle order confirmation
  const handleConfirmOrder = () => {
    // Implement order confirmation logic here (e.g., API call)
    // After confirming, delete all checked items
    cartItems.forEach((item) => {
      if (item.checked) {
        handleDelete(item._id);
      }
    });
    toast.success("Order placed successfully!");
    setIsModalOpen(false); // Close the modal
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <Breadcrumb pageName={"My Cart"} />

      {cartItems.length === 0 ? (
        <EmptyState
          label={"Shop"}
          address={"/shop"}
          message={"No added item here. Go to our shop"}
        />
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 border-b"
            >
              <div className="flex items-center space-x-4">
                {/* Checkbox next to the image */}
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheck(item._id)} // Update checked state
                />
                <img
                  src={item.foodImage}
                  alt={item.foodName}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.foodName}</h2>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total Price: ${item.totalPrice}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-xl text-red-500"
                >
                  <HiTrash />
                </button>
              </div>
            </div>
          ))}

          {/* Coupon Input Field */}
          {/* Coupon Input Field */}
          <form className="relative mt-4" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="coupon" className="sr-only">
              Coupon Code
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 9v2a2 2 0 11-4 0V9a2 2 0 114 0v2a2 2 0 104 0V9a6 6 0 10-6 6h4"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter coupon code 'FARM10'"
                required
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="text-white absolute end-2.5 bottom-2.5 bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Apply Coupon
              </button>
            </div>
          </form>

          {/* Display total and discounted price */}
          <div className="mt-4">
            <p className="text-lg font-semibold">
              Total Price: ${totalPrice.toFixed(2)}
            </p>
            {isCouponApplied && (
              <p className="text-lg font-semibold text-green-600">
                Discounted Price: ${discountedPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Order Button */}
          <button
            onClick={handleOrderNow}
            className="mt-4 px-6 py-3 text-white bg-blue-500 rounded-md"
          >
            Order Now
          </button>

          {/* Order Modal */}
          {isModalOpen && (
            <OrderModal
              isOpen={isModalOpen} // Add isOpen prop here
              totalAmount={discountedPrice || totalPrice} // Rename totalPrice to totalAmount
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleConfirmOrder}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MyCart;
