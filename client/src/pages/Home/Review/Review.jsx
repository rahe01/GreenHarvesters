import { useState, useEffect } from "react";

const testimonials = [
  {
    title: "Efficient Harvesting Tools",
    text: "The range of harvesting tools provided has significantly improved our efficiency. These tools are durable, easy to use, and have made a remarkable difference in our crop yield.",
    name: "James T.",
    occupation: "Farmer",
    image: "https://i.ibb.co/k44nGbT/Ellipse-10.png",
    rating: "https://i.ibb.co/p3hLCwM/Frame-10.png",
  },
  {
    title: "Sustainable Farming Practices",
    text: "Adopting sustainable farming practices from this platform has revolutionized our approach. Our soil health has improved, and we're seeing better crop outcomes with less environmental impact.",
    name: "Sarah W.",
    occupation: "Agricultural Consultant",
    image: "https://i.ibb.co/FDdpCvR/Ellipse-10-1.png",
    rating: "https://i.ibb.co/gjCGF3Y/Frame-10-1.png",
  },
  {
    title: "Organic Farming Support",
    text: "The organic farming techniques we learned here have enabled us to produce healthier crops. The guidance and resources provided were invaluable to our farm's transition to organic practices.",
    name: "Michael B.",
    occupation: "Organic Farmer",
    image: "https://i.ibb.co/pbkfwkv/Ellipse-10-2.png",
    rating: "https://i.ibb.co/p3hLCwM/Frame-10.png",
  },
  // Add more testimonials as needed
];

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let slideInterval;

    if (!isHovered) {
      slideInterval = setInterval(() => {
        setCurrentSlide((prev) =>
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
      }, 4000); // Change slide every 4 seconds
    }

    return () => clearInterval(slideInterval);
  }, [isHovered]);

  return (
   <div className="bg-[url(./WeOffer/banner.png)] bg-no-repeat">
     <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative space-y-4 my-20 container mx-auto"
    >
      <h3 className=" font-2nd text-green-500 text-center text-4xl pt-2">
        Testimonials
        </h3>
      
      <h1 className="text-4xl font-semibold text-center">What Our Farmers Say</h1>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${
              (currentSlide * 100) / testimonials.length
            }%)`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="h-60 rounded-3xl flex-shrink-0 w-full md:w-1/3 p-5 m-2 "
            >
              <h1 className="font-semibold text-xl">{testimonial.title}</h1>
              <p>{testimonial.text}</p>
              <div className="flex items-center gap-4 mt-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p>
                    <strong>{testimonial.name},</strong>{" "}
                    {testimonial.occupation}
                  </p>
                  <img src={testimonial.rating} alt="rating" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              currentSlide === index ? "bg-[#FFC637]" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
   </div>
  );
};

export default Testimonial;
