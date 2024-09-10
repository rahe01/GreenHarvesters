import { useLoaderData, useNavigate } from "react-router-dom";
import { GiMilkCarton, GiFertilizerBag, GiCow,  GiHelp } from "react-icons/gi";
import { FaUserFriends,  FaMoneyBillWave } from "react-icons/fa";
import { useEffect } from "react";
import Title from "../../../components/Shared/Title/Title";
import Button from "../../../components/Shared/Button/Button";

const WeOfferSingle = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <Title title={data.title}></Title>
      <div className="container mx-auto p-6 bg-gradient-to-br from-purple-300 via-blue-200 to-pink-200 min-h-screen">
        {/* Section for title, description and image */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-10 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 transition-transform duration-300 ease-in-out transform hover:scale-105">
          <div>
            <h1 className="text-4xl font-bold text-purple-800 mb-4">{data.title}</h1>
            <p className="text-lg text-gray-700">{data.description}</p>
          </div>
          <div className="text-center">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-48 object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:grid-rows-6">
          {/* Key Features Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-10 row-span-2">
            <h2 className="text-3xl font-semibold text-blue-600 mb-6 flex items-center">
              <GiMilkCarton className="text-blue-500 mr-2" /> Key Features
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-lg">
              {data.details.keyFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                >
                  <GiFertilizerBag className="text-green-500 mr-4" />
                  <span className="text-gray-800">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-br from-yellow-300 via-red-200 to-pink-300 p-8 rounded-lg shadow-lg mb-10">
            <h2 className="text-3xl font-semibold text-pink-700 mb-6 flex items-center">
              <GiCow className="text-pink-600 mr-2" /> Benefits
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-lg">
              {data.details.benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                >
                  <GiCow className="text-yellow-600 mr-4" />
                  <span className="text-gray-900">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Audience Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-10 row-span-2">
            <h2 className="text-3xl font-semibold text-green-600 mb-6 flex items-center">
              <FaUserFriends className="text-green-500 mr-2" /> Target Audience
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-lg">
              {data.details.targetAudience.map((audience, index) => (
                <li
                  key={index}
                  className="flex items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                >
                  <FaUserFriends className="text-green-600 mr-4" />
                  <span className="text-gray-800">{audience}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing and Availability Section */}
          <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-8 rounded-lg shadow-lg mb-10">
            <h2 className="text-3xl font-semibold text-blue-700 mb-6 flex items-center">
              <FaMoneyBillWave className="text-blue-500 mr-2" /> Pricing & Availability
            </h2>
            <p className="text-lg text-gray-800">
              <strong>Pricing:</strong> {data.details.pricing}
            </p>
            <p className="text-lg text-gray-800">
              <strong>Availability:</strong> {data.details.availability}
            </p>
          </div>

          {/* Support Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-10 col-span-2">
            <h2 className="text-3xl font-semibold text-blue-600 mb-6 flex items-center">
              <GiHelp className="text-blue-500 mr-2" /> Support
            </h2>
            <p className="text-lg text-gray-800">{data.details.support}</p>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate(-1)}
            label={"Back to Offers"}
          />
        </div>
      </div>
    </div>
  );
};

export default WeOfferSingle;
