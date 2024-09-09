import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="px-4 py-6 mt-10 color2b divide-y  relative bottom-0 left-0">
        <div className="container flex flex-col justify-between mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <div className="lg:w-1/3 flex flex-col items-center">
            <Link to="/">
              <img
                src="https://iili.io/d8h31KF.png"
                className="h-32 w-auto object-cover  transition-transform transform hover:scale-105"
                alt="Logo"
              />
            </Link>
            <p className="text-sm  text-center">
              Welcome to GreenHarvest - Your gateway to comprehensive
              agricultural solutions. We offer a range of services including
              crop management, weather monitoring, market prices, and financial
              services to help farmers thrive. Our platform provides real-time
              updates and educational resources to support sustainable farming
              practices and maximize productivity.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 lg:w-2/3 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold uppercase ">Products</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/crop-management"
                    className="hover:text-green-400 transition-colors"
                  >
                    Crop Management
                  </Link>
                </li>
                <li>
                  <Link
                    to="/weather-monitoring"
                    className="hover:text-green-400 transition-colors"
                  >
                    Weather Monitoring
                  </Link>
                </li>
                <li>
                  <Link
                    to="/market-prices"
                    className="hover:text-green-400 transition-colors"
                  >
                    Market Prices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/financial-services"
                    className="hover:text-green-400 transition-colors"
                  >
                    Financial Services
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold uppercase ">Company</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/about-us"
                    className="hover:text-green-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="hover:text-green-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="hover:text-green-400 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="hover:text-green-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className="hover:text-green-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold uppercase ">Developers</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/api"
                    className="hover:text-green-400 transition-colors"
                  >
                    Public API
                  </Link>
                </li>
                <li>
                  <Link
                    to="/documentation"
                    className="hover:text-green-400 transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/guides"
                    className="hover:text-green-400 transition-colors"
                  >
                    Guides
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="text-lg font-semibold uppercase ">
                Social Media
              </div>
              <div className="flex space-x-4">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  title="Facebook"
                  className="text-blue-600 hover:text-blue-400 transition-colors"
                >
                  <FaFacebookF className="w-6 h-6" />
                </a>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  title="Twitter"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  title="Instagram"
                  className="text-pink-500 hover:text-pink-400 transition-colors"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="py-6 border-t border-gray-300 text-center ">
        <span>
          &copy; {new Date().getFullYear()} GreenHarvest. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
