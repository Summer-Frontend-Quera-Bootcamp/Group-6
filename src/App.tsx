import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./features/login";
import Register from "./features/register";
import Forgot from "./features/forgot";
import ResetPassword from "./features/reset-password";

const App = () => {
    const userPath = useLocation().pathname;
    const isLoginPage = userPath === "/login";

    const statusText = isLoginPage
        ? "ثبت‌نام نکرده‌ای؟"
        : "قبلا ثبت‌نام کرده‌ای؟";
    const buttonText = isLoginPage ? "ثبت نام" : "ورود";

    return (
        <div className="flex flex-col h-[100vh]">
            <Navbar statusText={statusText} buttonText={buttonText} />
            <div className="flex flex-grow items-center justify-center z-10">
                <Routes>
                    /*TODO add homepage */
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot" element={<Forgot />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
