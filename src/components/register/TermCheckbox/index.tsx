import React, { useState, useRef } from "react";
import CheckBox from "@/components/common/CheckBox";
import useClickOutside from "@/hooks/useClickOutside";

interface ITermCheckboxProps {
    acceptedTerms: boolean;
    setAcceptedTerms: React.Dispatch<React.SetStateAction<boolean>>;
}

const TermCheckbox: React.FC<ITermCheckboxProps> = ({
    acceptedTerms,
    setAcceptedTerms,
}) => {
    const [showModal, setShowModal] = useState(false);
    const modal = useRef(null);
    useClickOutside([modal], () => setShowModal(false));
    return (
        <>
            {showModal && (
                <div
                    className="modal flex flex-col bg-white shadow-newTask  rounded-lg absolute z-50 w-[800px] p-m items-center gap-l"
                    style={{
                        backdropFilter: "blur(20px)",
                    }}
                >
                    <h2
                        className="text-[32px] text-center text-black"
                        dir="rtl"
                    >
                        قوانین و مقررات
                    </h2>
                    <p
                        className="self-stretch text-[16px] leading-[24px] text-right"
                        dir="rtl"
                    >
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و
                        برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
                        هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت
                        و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
                        متخصصان را می طلبد.
                    </p>
                    <ul
                        className="flex flex-col list-disc text-right gap-xs p-s"
                        dir="rtl"
                    >
                        <li>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها
                            و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
                            لازم است،
                        </li>
                        <li>
                            و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
                            متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
                            زیادی در شصت و سه درصد گذشته حال و آینده،
                        </li>
                        <li>
                            شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم
                            افزارها شناخت بیشتری را برای طراحان رایانه ای علی
                            الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی
                            ایجاد کرد،
                        </li>
                        <li>
                            در این صورت می توان امید داشت که تمام و دشواری موجود
                            در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                            زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و
                        </li>
                        <li>
                            جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا
                            مورد استفاده قرار گیرد.
                        </li>
                    </ul>
                </div>
            )}
            <div className="flex gap-2 ml-auto">
                <div className="cursor-pointer">
                    <CheckBox
                        acceptedTerms={acceptedTerms}
                        labelText=".قوانین و مقررات را می‌پذیرم"
                        onChange={() => {
                            setAcceptedTerms((pervState) => !pervState);
                        }}
                        onClick={() => setShowModal(true)}
                    />
                </div>
            </div>
        </>
    );
};

export default TermCheckbox;
