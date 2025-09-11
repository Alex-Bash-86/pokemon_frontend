const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className=" bg-slate-950 w-full flex justify-center items-center p-4 text-center text-xl mx-auto ">
      <div className="">
        Made with ❤️ by Arnaud, Alexander and Dmytro &copy; {currentYear}
      </div>
    </div>
  );
};

export default Footer;
