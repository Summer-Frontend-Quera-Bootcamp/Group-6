import DetailsForm from "@/components/profile/DetailsForm";

const ProfileDetails = () => {
    return (
        <div className="flex flex-col gap-l items-end">
            <p className="text-[31px] font-[700]">اطلاعات فردی</p>
            <DetailsForm />
        </div>
    );
};

export default ProfileDetails;
