const Title = ({ title }) => {
    return (
      <div className="relative w-full h-64 flex items-center justify-center bg-cover bg-center" 
        style={{ backgroundImage: "url('https://iili.io/dS6TnKN.png')" }}>
        
        {/* Additional image on top, set to full width */}
        <img
          src="https://iili.io/dS674Kx.png"
          alt="Overlay Image"
          className="absolute top-0 w-full h-16 object-cover"
        />
  
        {/* Centered Title */}
        <h1 className="text-white text-4xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded-lg">
          {title}
        </h1>
      </div>
    );
  };
  
  export default Title;
  