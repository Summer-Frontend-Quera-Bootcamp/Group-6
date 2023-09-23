import logo from "../../../assets/images/logo.svg";

interface INavbarProps {
  text?: string;
  btnText?: string;
}

const Navbar: React.FC<INavbarProps> = ({ text, btnText }) => {
  return (
    <div className="z-[1000] top-0 left-0 ">
      <nav className="flex items-center mt-[60px] mx-[80px]">
        <button
          className="bg-brand-primary text-white rounded-[6px] hover:cursor-pointer px-[30px] py-[6px]"
          value={btnText}
          aria-label={btnText}
        >
          {btnText}
        </button>
        <span className="mr-auto ml-2">{text}</span>

        <img src={logo} alt="logo" />
      </nav>
    </div>
  );
};

export default Navbar;
