import { HiTrash } from 'react-icons/hi'; // Import Trash Icon
import { IoCheckmarkCircleSharp } from 'react-icons/io5'; // Import Check Icon
import useCart from '../../../../hooks/useCart';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner';
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb';
import EmptyState from '../../../../components/Shared/EmptyState';


const MyCart = () => {
    const { cartItems, loading, handleDelete, handleCheck } = useCart();

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <Breadcrumb pageName={"My Cart"} />

            {cartItems.length === 0 ? (
                <EmptyState label={"Shop"} address={"/shop"} message={"No added Item here . Go to our shop"} />
            ) : (
                <div className="space-y-4">
                    {cartItems.map(item => (
                        <div key={item._id} className="flex items-center justify-between p-4 border-b">
                            <div className="flex items-center space-x-4">
                                <img src={item.foodImage} alt={item.foodName} className="w-16 h-16 object-cover" />
                                <div>
                                    <h2 className="text-lg font-semibold">{item.foodName}</h2>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    <p className="text-sm text-gray-500">Total Price: ${item.totalPrice}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => handleCheck(item._id)} className={`text-xl ${item.checked ? 'text-green-500' : 'text-gray-500'}`}>
                                    <IoCheckmarkCircleSharp />
                                </button>
                                <button onClick={() => handleDelete(item._id)} className="text-xl text-red-500">
                                    <HiTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCart;
