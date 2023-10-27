import { AppContext } from "@/context/store";
import React, { useContext, useState } from "react";
import SideHeader from "./SideHeader";
import { SpaceItem } from "./SpaceItem";
import UserDetail from "./UserDetail";

const SideBar: React.FC<{
    setShowSpaceModal?: React.Dispatch<React.SetStateAction<boolean>>;
    setShowProjectModal?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowSpaceModal, setShowProjectModal }) => {
    const { state } = useContext(AppContext);

    const [selected, setSelected] = useState<number | undefined>(1);

    return (
        <>
            <div className="flex flex-col items-start justify-between pr-[50px] pl-4 pt-[40px] border-l-2 w-[340px] min-w-[300px] h-[100vh] bg-inherit">
                <div className="flex flex-col gap-s">
                    <SideHeader setShowSpaceModal={setShowSpaceModal} />

                    {state.user.workspaces.length !== 0 &&
                        state.user.workspaces?.map((space) => (
                            <SpaceItem
                                space={space}
                                selected={selected}
                                setSelected={setSelected}
                                setShowProjectModal={setShowProjectModal!}
                                key={space.id}
                            />
                        ))}
                </div>
                <UserDetail />
            </div>
        </>
    );
};
export default SideBar;
