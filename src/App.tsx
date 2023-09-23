import Login from "./features/login";
import { Route, Routes } from "react-router-dom";
import Register from "./features/register";
import Forgot from "./features/forgot";
import ResetPassword from "./features/reset-password";

const App = () => {
    return (
        <div className="flex flex-col h-[100vh] bg-blue-secondary">
            <div className="flex flex-grow items-center justify-center z-10">
                <Routes>
                    TODO <Route path="/" element={<h1>Main Page</h1>} />
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
