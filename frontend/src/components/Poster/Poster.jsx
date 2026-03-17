const Banner = ({  backgroundImage }) => {
    return (
      <div
        className="md:mt-20 w-full min-h-[23vh] sm: mt-12 md:min-h-[70vh] flex flex-col items-center justify-center text-white text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className=" bg-opacity-50 p-4 md:p-6 rounded-lg w-[90%] md:w-auto">
          
        </div>
      </div>
    );
  };
  
  export default Banner;
  