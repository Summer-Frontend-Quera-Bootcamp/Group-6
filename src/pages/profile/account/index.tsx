import AccountForm from "@/components/profile/AccountForm";

const ProfileAccount = () => {
    return (
        <div className="flex flex-col gap-l items-end">
            <p className="text-[31px] font-[700]">اطلاعات حساب</p>
            <AccountForm />
        </div>
    );
};

export default ProfileAccount;
