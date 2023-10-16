import Plus from "@assets/icons/Plus.svg";

const WorkSpace = () => {
  return (
    <div className="mx-l mt-xl w-full" dir="rtl">
      <div className="first-project">
        <h2 dir="rtl" className="text-heading-s mt-l font-black">
          درس مدیریت پروژه
        </h2>
        <button className="text-body-m  radius-s mt-m rounded-2xl text-white w-[200px] bg-gradient-to-tr from-green-secondary via-green-primary to-green-primary h-20">
          پروژه اول
        </button>
        <hr className="mt-l" />
      </div>
      <div className="second-project">
        <h2 dir="rtl" className="text-heading-s mt-l font-black">
          کارهای شخصی
        </h2>
        <button className="text-body-m  radius-s mt-m rounded-2xl text-white w-[200px] bg-gradient-to-tr from-amber-200 via-amber-400 to-amber-400 h-20">
          پروژه اول
        </button>
        <hr className="mt-l" />
      </div>

      <div className="third-project">
        <h2 dir="rtl" className="text-heading-s mt-l h-20 font-black">
          درس کامپایلر{" "}
        </h2>
        <div className="text-body-m  radius-s mt-m rounded-2xl w-[200px]  text-white  h-20 bg-gradient-to-bl from-red-primary via-red-primary to-red-secondary">
          <button className=" bg-white text-red-primary  my-[6px] mx-[7px] w-[187px] h-[67px] rounded-xl relative pr-[10px]">
            ساختن پروژه جدید {""}
            <img
              src={Plus}
              alt="add"
              className="w-[15px] absolute top-[27px] right-[12px] text-red-primary"
            />
          </button>
        </div>
        <hr className="mt-l" />
      </div>

      <div className="third-project">
        <h2 dir="rtl" className="text-heading-s mt-l font-black">
          درس کامپایلر{" "}
        </h2>
        <button className="text-body-m  radius-s mt-m rounded-2xl text-white w-[200px] bg-gradient-to-tr from-blue-secondary to-blue-primary h-20">
          پروژه اول
        </button>
        <hr className="mt-l" />
      </div>
    </div>
  );
};

export default WorkSpace;
// bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300
// background: linear-gradient(249.83deg, #FAB005 0%, rgba(250, 176, 5, 0.5) 100%);
