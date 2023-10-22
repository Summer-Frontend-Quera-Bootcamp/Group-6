// import React, { createContext, useState } from "react";
// import cardFakeData from "@components/dashboard/GroupColumn";

// interface Card {
//   id: number;
//   listName: string;
//   description: string;
//   imageUrl?: string;
//   tags: string[];
//   cardStatus: string;
// }

// interface CardStatusContextProps {
//   cardStatus: Card[];
//   markCardAsDone: (cardId: number) => void;
// }

// // Create the context
// export const CardStatusContext = createContext<CardStatusContextProps | null>(
//   null
// );

// // Create the provider component
// export const CardStatusProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [cardStatus, setCardStatus] = useState<Card[]>(() => cardFakeData);

//   // Function to update the card status to "done"
//   const markCardAsDone = (cardId: number) => {
//     setCardStatus((prevStatus) =>
//       prevStatus.map((card) =>
//         card.id === cardId ? { ...card, cardStatus: "done" } : card
//       )
//     );
//   };

//   return (
//     <CardStatusContext.Provider value={{ cardStatus, markCardAsDone }}>
//       {children}
//     </CardStatusContext.Provider>
//   );
// };
