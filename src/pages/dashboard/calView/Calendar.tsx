// import { Calendar } from "react-multi-date-picker";
// import Persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";
// import { useState } from "react";
// import { AddTask } from "./AddTask";
import "./styles.css";

function FullCalendar() {
    // const [showModal, setshowModal] = useState(false);
    // const [selectedDate, setselectedDate] = useState<string>();

    // const HandleDate = (date: any) => {
    //     const selected_date = `${date.day}${date.month.name}`;
    //     setselectedDate(selected_date);
    //     setshowModal(true);
    // };
    return (
        <div className="flex flex-col">
            <h1>Calendar View</h1>
            {/* {showModal && selectedDate && <AddTask theDate={selectedDate} />} */}
            {/* <Calendar
                weekDays={[
                    "شنبه",
                    "یکشنبه",
                    "دوشنبه",
                    "سه شنبه",
                    "چهارشنبه ",
                    "پنج شنبه",
                    "جمعه",
                ]}
                onFocusedDateChange={HandleDate}
                calendar={Persian}
                locale={persian_fa}
            /> */}
        </div>
    );
}

export default FullCalendar;
