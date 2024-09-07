import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Map from "./Map";

export default function ContactSection() {
  return (
    <div className="relative">
      <Map />
      <div className="container mx-auto flex justify-center items-center px-6 md:px-12">
        <div className="block rounded-lg bg-white bg-opacity-80 px-6 py-12 shadow-md md:py-16 md:px-12 -mt-[100px] backdrop-blur-lg border border-gray-300">
          <div className="flex flex-wrap">
            {/* Form Section */}
            <section className="py-6 bg-gray-50 dark:text-gray-900">
              <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
                <div className="py-6 md:py-0 md:px-6">
                  <h1 className="text-4xl font-bold color1t">Contact Our Agri-Experts</h1>
                  <p className="pt-2 pb-4 ">Fill in the form to ask about our agricultural services and support.</p>
                  <div className="space-y-4">
                    <p className="flex items-center transition-transform transform hover:scale-105">
                      <FaMapMarkerAlt className="w-5 h-5 mr-2 sm:mr-6 color1t" />
                      <span>Greenfields, 1234 Farming Avenue, Agriville</span>
                    </p>
                    <p className="flex items-center transition-transform transform hover:scale-105">
                      <FaPhoneAlt className="w-5 h-5 mr-2 sm:mr-6 color1t" />
                      <span>+1 234 567 8900</span>
                    </p>
                    <p className="flex items-center transition-transform transform hover:scale-105">
                      <FaEnvelope className="w-5 h-5 mr-2 sm:mr-6 color1t" />
                      <span>info@agrisolutions.com</span>
                    </p>
                  </div>
                </div>
                <form noValidate="" className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
                  <label className="block">
                    <span className="mb-1 ">Full Name</span>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-green-500 focus:ring-opacity-75 bg-white"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 ">Email Address</span>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-green-500 focus:ring-opacity-75 bg-white"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 ">Your Message</span>
                    <textarea
                      placeholder="Ask about our farming solutions, crop management, or soil health advice..."
                      rows="5"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-green-500 focus:ring-opacity-75 bg-white"
                    />
                  </label>
                  <button
                    className="px-6 py-2 font-semibold btn btn-ghost text-white color1b rounded-md shadow-lg hover:color2b transition-all transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-64 h-64 bg-green-200 rounded-full opacity-30 blur-3xl -top-20 left-10 transform rotate-45"></div>
        <div className="w-32 h-32 bg-yellow-200 rounded-full opacity-30 blur-2xl top-40 right-10 transform rotate-12"></div>
      </div>
    </div>
  );
}
