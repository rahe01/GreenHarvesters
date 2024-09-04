import { useState, useEffect } from "react";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    // Fetch the FAQ data from the public directory
    fetch("/faq.json")
      .then((response) => response.json())
      .then((data) => setFaqs(data))
      .catch((error) => console.error("Error fetching FAQ data:", error));
  }, []);

  return (
    <div className="bg-[url('https://iili.io/dkTOxoB.png')] bg-no-repeat">
      <div className="flex flex-col md:flex-row container mx-auto">
        {/* Left Image - Hidden on Mobile, Fixed Size and Animation */}
        <div className="hidden md:flex flex-1 items-center justify-center overflow-hidden">
          <img
            src="https://iili.io/dkTFLCv.png"
            alt="Farming Image"
            className="h-80 w-80 object-cover rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* FAQ Section - Full Width on Mobile */}
        <section className="w-full flex-1 dark:bg-gray-100 dark:text-gray-800">
          <div className="container flex flex-col justify-center px-4 py-8 mx-auto">
            <h2 className="text-2xl font-semibold sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 mb-8 dark:text-gray-600">
              Here are some common questions and answers about our agricultural and corporate services.
            </p>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="w-full border rounded-lg transition duration-500 ease-in-out transform hover:scale-105"
                >
                  <summary className="px-4 font-bold py-6 focus:outline-none focus-visible:ring-violet-600">
                    {faq.question}
                  </summary>
                  <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Faq;
