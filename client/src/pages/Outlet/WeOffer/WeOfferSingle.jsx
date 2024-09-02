import { useParams } from "react-router-dom";


const WeOfferSingle = () => {
    const {id} = useParams()
    return (
        <div>
            we{id}
        </div>
    );
};

export default WeOfferSingle;