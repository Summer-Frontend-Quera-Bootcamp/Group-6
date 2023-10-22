import React, { useState, useEffect } from "react";
import GroupColumn from "@components/dashboard/GroupColumn";
import * as Icon from "@assets/icons/icons";
import { fetchBoards } from "@/services/boards";
import useQueryParams from "@/utils/useQueryParams";

export interface IGroup {
  id: number;
  isArchive: boolean;
  name: string;
  order: number;
  tasks: [];
  tasksCount: number;
  borderColor: string;
}

// const groups = [
//   {
//     title: "Open",
//     borderColor: "#FD7E14",
//     status: "open",
//   },
//   {
//     title: "In Progress",
//     borderColor: "#4C6EF5",
//     status: "in progress",
//   },
//   {
//     title: "Pending",
//     borderColor: "#FAB005",
//     status: "pending",
//   },
//   {
//     title: "To Do",
//     borderColor: "#FD7E14",
//     status: "todo",
//   },
//   {
//     title: "Done",
//     borderColor: "#40C057",
//     status: "done",
//   },
// ];

const ColView: React.FC = () => {
  ///////
  const { space, project } = useQueryParams();
  const [columnGroups, setColumnGroups] = useState<IGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(space, project);
  const fetchData = async () => {
    try {
      const boards = await fetchBoards(space, project);
      setColumnGroups(boards.boards);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [space, project]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const boards = await fetchBoards(space, project);
  //     console.log(boards.boards);
  //     setColumnGroups(boards.boards);
  //     console.log(columnGroups);
  //   };

  //   fetchData();
  // }, []);
  //////////

  const handleCreateColumnGroup = () => {
    const newGroup: IGroup = {
      id: Math.random() * 50 + 1,
      isArchive: false,
      name: "new",
      order: 1,
      tasks: [],
      tasksCount: 0,
      borderColor: "#ccc",
    };
    setColumnGroups([...columnGroups, newGroup]);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading Data</p>
      ) : columnGroups.length === 0 ? (
        <p>No tasks to show</p>
      ) : (
        <>
          {columnGroups.map((group) => (
            <GroupColumn key={group.name} group={group} />
          ))}

          {/* Creates new GroupColumn */}
          <button
            className="min-w-[258px] flex items-center gap-2 self-start border-t-1 rounded-[16px] shadow-md shadow-gray-200 py-2 px-3 m-2"
            onClick={handleCreateColumnGroup}
          >
            <img src={Icon.Plus} alt="icon" />
            ساختن برد جدید
          </button>
        </>
      )}
    </>
  );
};

export default ColView;
