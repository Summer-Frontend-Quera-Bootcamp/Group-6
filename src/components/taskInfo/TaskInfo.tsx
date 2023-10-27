import Bookmark from "@/assets/icons/tag.svg";
import Plusgreen from "@/assets/icons/Add.svg";
import Comment from "@/assets/icons/comment.svg";
import Xbtn from "@/assets/icons/Close.svg";
import { useContext } from "react";
import { AppContext } from "@/context/store";
import FlagIcon from "../newTask/Flags/FlagIcon";
import { Input } from "../common";

const TaskInfo = ({ onClose }: any) => {
    const { state } = useContext(AppContext);
    return (
        <div className="modal flex justify-center items-start  text-[#1E1E1E] modal w-[1352px] h-[596px] bg-white pt-[90px] pr-[40px] rounded-3xl shadow-2xl relative z-[1000]">
            <button onClick={() => onClose(false)}>
                <img
                    src={Xbtn}
                    alt=""
                    className="w-[24px] h-[24px] absolute top-[36px] left-[1292px]"
                />
            </button>
            <div className="w-1/2">
                <div className="header border-b-2 pb-[28px] border-[#F4F4F4] ">
                    <div className="top">
                        <div className="icons flex items-center gap-[40px]">
                            <button className="w-[111px] h-[30px] bg-[#F84747] rounded text-white">
                                Open
                            </button>
                            <img
                                src={state.user.thumbnail}
                                alt="add-member"
                                className="w-[45px] h-[45px] fill-white	 rounded-[50%] p-[5px]   "
                            />
                            <FlagIcon priority={1} />
                        </div>
                        <div className="share"></div>
                    </div>
                </div>
                <div className="sort flex mt-[34px]">
                    <img
                        src={Bookmark}
                        alt="bookmark"
                        className="w-[34px] h-[34px] p-[5px] border border-dashed border-[#c1c1c1] rounded-[50%]"
                    />
                </div>
                <div className="task">
                    <h2 className="text-[24px] font-extrabold mt-[15px]	">
                        عنوان تسک
                    </h2>
                    <p className="w-[617px] border-[1px] border-[#F4F4F4] p-[12px] rounded-xl mt-[15px]  ">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و
                        برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
                        هدف بهبود ابزارهای کاربردی می باشد.
                    </p>
                </div>
                <div className="add-attachment mt-[18px] flex">
                    <a className="text-[#208d8e]  flex" href="#">
                        <img
                            src={Plusgreen}
                            alt="plus-btn"
                            className="w-[24px] h-[24px] mx-[10px]"
                        />
                        اضافه کردن پیوست{" "}
                    </a>
                </div>
            </div>
            <div className="w-1/2 border-r-2 h-full border-[#F4F4F4] relative">
                <div className="header border-b-2  flex gap-[20px] pb-[10px] pr-[10px] border-[#F4F4F4]">
                    <div className="date flex flex-col">
                        <span className="text-[#BBBBBB] mb-[10px]">
                            ساخته شده در
                        </span>
                        <span>1 اردیبهشت 1402</span>
                    </div>
                    <div className="deadline date flex flex-col">
                        <span className="text-[#BBBBBB] mb-[10px]">ددلاین</span>
                        <span>پس فردا</span>
                    </div>
                </div>
                <div className="comments relative flex p-[10px] gap-[10px] mt-[10px]">
                    <img
                        src={state.user.thumbnail}
                        alt="profile-photo"
                        className="w-[34px] h-[34px] rounded-[50%]"
                    />
                    <div className="comment-box border-[1px] border-[#F4F4F4] p-[12px] rounded-xl">
                        <div className="header flex justify-between">
                            <h4 className="text-[#aaaaaa] text-[12px]">
                                <span className="text-[#208d8e] text-[16px] font-extrabold ml-[4px]">
                                    شما
                                </span>
                                کامنت گذاشتید
                            </h4>
                            <span className="text-[#aaaaaa] text-[12px]">
                                12 تیر
                            </span>
                        </div>
                        <p>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها
                            و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
                            لازم است
                        </p>
                    </div>
                </div>
                <div className="flex gap-xs w-full items-center justify-between comment-box absolute bottom-[30px]  ">
                    <Input
                        classNames="mt-[15px] pr-[15px] w-[600px] outline-none"
                        defaultValue="کامنت"
                    />
                    <button className="flex justify-between height-[67px] border-t-[1px] border-[#F4F4F4] ">
                        <img
                            src={Comment}
                            alt="comment-icon"
                            className="w-[24px] h-[24px] mt-[15px] ml-[15px] "
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskInfo;
