const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className=" bg-slate-950 w-full">
      <div className="flex justify-center">&copy; {currentYear}</div>
    </div>
  );
};

export default Footer;
