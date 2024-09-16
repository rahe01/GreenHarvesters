import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import toast from 'react-hot-toast';


const useCart = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                setLoading(true);
                const { data } = await axiosSecure.get(`/cartbymail/${user?.email}`);
                setCartItems(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchCartItems();
        }
    }, [user?.email, axiosSecure]);

    const handleDelete = async (itemId) => {
        try {
            await axiosSecure.delete(`/cartdelete/${itemId}`);
            setCartItems(cartItems.filter(item => item._id !== itemId));
            toast.success("Item removed from cart");
        } catch (error) {
            toast.error("Failed to delete item");
        }
    };

    const handleCheck = (itemId) => {
        setCartItems(prevItems => 
            prevItems.map(item =>
                item._id === itemId ? { ...item, checked: !item.checked } : item
            )
        );
    };

    return { cartItems, loading, error, handleDelete, handleCheck };
};

export default useCart;
