import { Carousel } from "@material-tailwind/react";
import Button from './../../../components/Shared/Button/Button';

export function Banner() {
  return (
    <Carousel
      className="rounded-xl relative h-[60vh] md:h-[80vh]"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {/* Slide 1 */}
      <div className="relative h-full w-full">
        <img
          src="../../../../public/banner1.jpg"
          alt="Green Harvester 1"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-center">
          <h1 className="text-5xl font-bold text-white">Sustainable Farming</h1>
          <p className="text-2xl text-white mt-4 max-w-2xl">
            Revolutionizing agriculture with our advanced Green Harvesters.
            Embrace a greener future with innovative farming techniques.
          </p>
          <div className="mt-6 flex items-center justify-evenly  space-x-4">
            <Button label="LearnMore" color="color1" />
            <Button label="ContactUs" color="color2" />
          </div>
        </div>
      </div>

      {/* Slide 2 */}
      <div className="relative h-full w-full">
        <img
          src="../../../../public/banner2.jpg"
          alt="Green Harvester 2"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-center">
          <h1 className="text-5xl font-bold text-white">Efficiency at Its Best</h1>
          <p className="text-2xl text-white mt-4 max-w-2xl">
            Maximize your yield with our state-of-the-art harvesters.
            Experience unparalleled efficiency in every harvest.
          </p>
          <div className="mt-6 flex items-center justify-evenly  space-x-4">
            <Button label="LearnMore" color="color1" />
            <Button label="ContactUs" color="color2" />
          </div>
        </div>
      </div>

      {/* Slide 3 */}
      <div className="relative h-full w-full">
        <img
          src="../../../../public/banner3.jpg"
          alt="Green Harvester 3"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-center">
          <h1 className="text-5xl font-bold text-white">Innovation in Agriculture</h1>
          <p className="text-2xl text-white mt-4 max-w-2xl">
            Experience the future of farming with our cutting-edge technology.
            Stay ahead with innovations that transform agriculture.
          </p>
          <div className="mt-6 flex items-center justify-evenly  space-x-4">
            <Button label="LearnMore" color="color1" />
            <Button label="ContactUs" color="color2" />
          </div>
        </div>
      </div>
    </Carousel>
  );
}
