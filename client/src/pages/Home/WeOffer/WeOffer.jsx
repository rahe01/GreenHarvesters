import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const WeOffer = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL; // Access the API URL from the environment variable
    const getOfferEndpoint = `${apiUrl}/getoffer`;
    fetch(getOfferEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setOffers(data))
      .catch((error) => console.error('Error fetching the data:', error));
  }, []);

  return (
    <div
      className="bg-cover bg-center bg-no-repeat p-8"
      style={{ backgroundImage: `url('./WeOffer/banner.png')` }}
    >
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">What We Offer</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.length > 0 ? (
            offers.map((offer) => (
              <Link 
                to={`/offer/${offer._id}`} 
                key={offer.id} 
                className="relative bg-white p-6 rounded-lg block hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
              >
                {/* Image container with icon */}
                <div className="relative w-full h-48 mb-4 aspect-square ">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover rounded-lg  group-hover:scale-90 
                transition"
                  />
                  <img
                    src={offer.icon}
                    alt={`${offer.title} Icon`}
                    className="absolute bottom-4 right-4 w-12 h-12  group-hover:scale-90 
                transition"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-2">{offer.title}</h2>
                <p className="mb-4">{offer.description}</p>
              </Link>
            ))
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default WeOffer;
