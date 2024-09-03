const Faq = () => {
  return (
    <div className="relative ">
      {/* Background Image taking 1/4 width */}
      <div
        className="absolute top-0 left-0 h-full w-1/4 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('https://iili.io/dOsCcB9.png')`,
          backgroundAttachment: "fixed",
        }}
      ></div>

      {/* Content taking 3/4 width */}
      <div className=" bg-white p-48 flex items-center justify-center">
      <div>  <img src="https://iili.io/dOsTHgt.png" alt="Header" className="mb-6" /></div>

   <div>
   <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            
          </div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            Click to open this one and close others
          </div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            Click to open this one and close others
          </div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
   </div>
      </div>
    </div>
  );
};

export default Faq;
