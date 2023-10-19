import { useContext, useState } from "react";
import { toast } from "react-toastify";
import ColorSelector from "@/components/common/ColorSelector";
import { ToggleTheme, SubmitBtn } from "@/components/common";
import { AppContext } from "@/context/store";
import { UpdateTheme } from "@/context/theme/theme.action";
import { UseChangeTheme } from "@/services/Settings/mutations/useThemeMutation";
import { IThemeData } from "@/types/api.types";
import { FormEvent } from "react";

const SettingsForm = () => {
    const { state, dispatch } = useContext(AppContext);
    const themeMutation = UseChangeTheme();
    const [tempColor, setTempColor] = useState<PaletteColorType>(state.theme);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const creds: IThemeData = {
            theme: tempColor,
        };
        toast.loading("در حال تغییر رنگ ها...");
        themeMutation.mutate(creds, {
            onSuccess: () => {
                dispatch(UpdateTheme(tempColor));
                toast.dismiss();
                toast.success("با موفقیت ویرایش شد.");
            },
            onError: (error) => {
                toast.dismiss();
                toast.error(
                    String([...Object.values(error.response.data).flat()])
                );
            },
        });
    };

    const handleColorChange = (newColor: PaletteColorType) => {
        setTempColor(newColor);
    };

    return (
        <form className="flex flex-col items-end gap-m" onSubmit={handleSubmit}>
            <div className="flex flex-col items-end gap-xs">
                <p>انتخاب تم</p>
                <ColorSelector
                    colorPalette={tempColor}
                    setColorPalette={handleColorChange}
                    handleChange={setTempColor}
                />
            </div>
            <ToggleTheme />
            <SubmitBtn
                value="ثبت تغییرات"
                className="w-[354px] font-bold text-[14px]"
                theme={tempColor}
            />
        </form>
    );
};

export default SettingsForm;
