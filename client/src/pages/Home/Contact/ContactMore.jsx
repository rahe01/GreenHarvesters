import { FaPhoneAlt, FaEnvelope, FaHeadset } from "react-icons/fa";

const ContactMore = () => {
  return (
    <div className="container mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Call Us Section */}
      <div
        className="card shadow-xl color2b transform transition-transform hover:scale-105 hover:shadow-2xl duration-300"
        data-aos="fade-right"
        data-duration="1000"
      >
        <div className="card-body flex justify-center items-center">
          <FaPhoneAlt className="text-5xl color1t transition-transform duration-300 hover:rotate-12" />
          <div className="ml-4">
            <h2 className="card-title">Call Us</h2>
            <p className="text-start">
              Get in touch with our support team via phone for instant assistance.
            </p>
            <p className="font-semibold">+1 234 567 8900</p>
          </div>
        </div>
      </div>

      {/* Email Us Section */}
      <div
        className="card shadow-xl color1b transform transition-transform hover:scale-105 hover:shadow-2xl duration-300"
        data-aos="fade-down"
        data-duration="1000"
      >
        <div className="card-body flex justify-center items-center">
          <FaEnvelope className="text-5xl text-yellow-200 transition-transform duration-300 hover:rotate-12" />
          <div className="ml-4">
            <h2 className="card-title">Email Us</h2>
            <p className="text-start">
              Send us an email with your questions or inquiries, and we’ll respond promptly.
            </p>
            <p className="font-semibold">support@agrisolutions.com</p>
          </div>
        </div>
      </div>

      {/* Live Support Section */}
      <div
        className="card shadow-xl bg-yellow-200 transform transition-transform hover:scale-105 hover:shadow-2xl duration-300"
        data-aos="fade-left"
        data-duration="1000"
      >
        <div className="card-body flex justify-center items-center">
          <FaHeadset className="text-5xl text-green-400 transition-transform duration-300 hover:rotate-12" />
          <div className="ml-4">
            <h2 className="card-title">Live Support</h2>
            <p className="text-start">
              Chat with our live support agents for real-time help and guidance.
            </p>
            <p className="font-semibold">Available 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMore;
