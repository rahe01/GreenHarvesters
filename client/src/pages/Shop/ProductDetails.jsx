import { useLoaderData } from 'react-router-dom';

const ProductDetails = () => {
    const product = useLoaderData();

    if (!product) {
        return <div>Product not found or failed to load.</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.imageLink} alt={product.name} />
            <p>Price: {product.price}</p>
            <p>{product.description}</p>
        </div>
    );
};

export default ProductDetails;
