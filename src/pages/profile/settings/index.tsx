import SettingsForm from "@/components/profile/SettingsForm";

const ProfileSettings = () => {
    return (
        <div className="flex flex-col gap-l items-end">
            <p className="text-[31px] font-[700]">تنظیمات</p>
            <SettingsForm />
        </div>
    );
};

export default ProfileSettings;
