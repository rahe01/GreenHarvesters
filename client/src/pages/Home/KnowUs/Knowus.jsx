import Button from "../../../components/Shared/Button/Button";

const Knowus = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center p-8"
      style={{ backgroundImage: `url('/KnowUs/bg1.png')` }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8">
        <div className="text-black max-w-3xl text-center lg:text-left lg:w-1/2 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 font-2nd text-amber-400 transition-transform duration-300 ease-in-out transform hover:scale-105">
            Get to Know Us
          </h1>
          <p className="text-3xl font-extrabold mb-4 transition-opacity duration-300 ease-in-out opacity-0 animate-opacity">
            Leader in Agriculture Market
          </p>
          <p className="text-lg mb-8 transition-opacity duration-300 ease-in-out opacity-0 animate-opacity">
            At Green Harvest, we are dedicated to revolutionizing the
            agricultural sector. With years of expertise and a commitment to
            innovation, we provide cutting-edge solutions that drive progress
            and sustainability in farming. Our mission is to empower farmers
            with the tools and knowledge they need to succeed, ensuring a better
            future for agriculture and the communities it supports.
          </p>

          <div className="mb-4 flex animate-fade-in">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2 font-2nd text-green-500 transition-transform duration-300 ease-in-out transform hover:scale-105">
                Modern Agriculture Types
              </h1>
              <p className="text-lg">
                From advanced crop management systems to real-time weather
                monitoring, our range of services is designed to address the
                diverse needs of modern agriculture. Explore our solutions and
                discover how we can help you achieve your agricultural goals.
              </p>
            </div>
            <div className="flex-1 hidden lg:block">
              {/* Video element below the first image */}
              <iframe
                className="w-full h-72 transition-transform duration-300 ease-in-out transform hover:scale-105"
                src="https://www.youtube.com/embed/SNKWRB1-5pA?si=wH1B_cYhn7RLJxaf"
                title="YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>

          <Button label={"Discover More"} className="transition-transform duration-300 ease-in-out transform hover:scale-110" />
        </div>

        <div className="lg:w-1/2 hidden lg:block animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <img
              className="w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105"
              src="/KnowUs/img3.png"
              alt="Image 1"
            />
            <img
              className="w-full transition-transform duration-300 ease-in-out transform hover:scale-105"
              src="/KnowUs/img2.png"
              alt="Image 2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Knowus;
